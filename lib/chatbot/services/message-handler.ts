import { Message, Intent, ConversationContext } from '../types';
import { KnowledgeBase } from './knowledge-base';
import { ResponseGenerator } from './response-generator';
import { ConversationManager } from './conversation-manager';

/**
 * MessageHandler service for processing user input and managing conversation flow
 */
export class MessageHandler {
  private knowledgeBase: KnowledgeBase;
  private responseGenerator: ResponseGenerator;
  private context: ConversationContext;
  private rateLimitMap: Map<string, number[]> = new Map();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 messages per minute

  constructor() {
    this.knowledgeBase = new KnowledgeBase();
    this.responseGenerator = new ResponseGenerator(this.knowledgeBase);
    this.context = ConversationManager.resumeOrStartConversation();
  }

  /**
   * Process user message and generate response
   */
  async processMessage(userMessage: string, clientId: string = 'default'): Promise<Message> {
    // Check rate limiting
    if (!this.checkRateLimit(clientId)) {
      throw new Error('Rate limit exceeded. Please wait before sending another message.');
    }

    // Validate input BEFORE sanitization to catch dangerous patterns
    if (!this.validateMessage(userMessage)) {
      throw new Error('Invalid message content');
    }

    // Sanitize input after validation
    const sanitizedMessage = this.sanitizeInput(userMessage);

    // Create user message object
    const userMessageObj: Message = {
      id: this.generateMessageId(),
      content: sanitizedMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Add to conversation context
    this.addMessageToContext(userMessageObj);

    // Generate response using AI and structured data
    const responseContent = await this.responseGenerator.generateResponse(
      sanitizedMessage,
      this.context
    );

    // Create bot response message
    const botMessage: Message = {
      id: this.generateMessageId(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    // Add bot response to context
    this.addMessageToContext(botMessage);

    return botMessage;
  }

  /**
   * Validate message content
   */
  private validateMessage(message: string): boolean {
    // Check message length
    if (message.length === 0 || message.length > 500) {
      return false;
    }

    // Check for potentially harmful content patterns (before sanitization)
    const harmfulPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi
    ];

    // If the original message contains harmful patterns, reject it
    if (harmfulPatterns.some(pattern => pattern.test(message))) {
      return false;
    }

    return true;
  }

  /**
   * Sanitize user input to prevent XSS and other security issues
   */
  private sanitizeInput(input: string): string {
    // First escape HTML entities to prevent XSS
    let sanitized = input.replace(/[<>'"&]/g, (match) => {
      const entityMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entityMap[match] || match;
    });
    
    // Remove HTML tags (after escaping to be safe)
    sanitized = sanitized.replace(/&lt;[^&]*&gt;/g, '');

    // Trim whitespace and normalize spaces
    sanitized = sanitized.trim().replace(/\s+/g, ' ');

    return sanitized;
  }



  /**
   * Add message to conversation context with proper management
   */
  private addMessageToContext(message: Message): void {
    // Use ConversationManager for proper context handling
    this.context = ConversationManager.addMessageToContext(this.context, message);
    
    // Handle context limits gracefully
    this.context = ConversationManager.handleContextLimits(this.context);
  }

  /**
   * Update conversation context with persistence
   */
  private updateContext(updates: Partial<ConversationContext>): void {
    this.context = ConversationManager.updateContext(this.context, updates);
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get current conversation context
   */
  getContext(): ConversationContext {
    return { ...this.context };
  }

  /**
   * Reset conversation context and start new session
   */
  resetContext(): void {
    ConversationManager.clearContext();
    this.context = ConversationManager.startNewSession();
  }

  /**
   * Get conversation history
   */
  getMessageHistory(): Message[] {
    return [...this.context.messages];
  }

  /**
   * Set conversation context (useful for restoring from storage)
   */
  setContext(context: ConversationContext): void {
    this.context = ConversationManager.handleContextLimits(context);
    ConversationManager.saveContext(this.context);
  }

  /**
   * Get conversation health and management info
   */
  getConversationHealth() {
    return ConversationManager.getConversationHealth(this.context);
  }

  /**
   * Check if conversation needs attention
   */
  needsContextManagement(): boolean {
    const health = this.getConversationHealth();
    return health.status !== 'healthy';
  }

  /**
   * Get contextual information for better responses
   */
  getContextualInfo() {
    return ConversationManager.getContextualInfo(this.context);
  }

  /**
   * Check rate limiting for a client
   */
  private checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const clientRequests = this.rateLimitMap.get(clientId) || [];
    
    // Remove old requests outside the window
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.RATE_LIMIT_WINDOW
    );
    
    // Check if under limit
    if (validRequests.length >= this.RATE_LIMIT_MAX_REQUESTS) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.rateLimitMap.set(clientId, validRequests);
    
    return true;
  }



  /**
   * Get rate limit status for a client
   */
  getRateLimitStatus(clientId: string = 'default'): { remaining: number; resetTime: number } {
    const now = Date.now();
    const clientRequests = this.rateLimitMap.get(clientId) || [];
    
    // Remove old requests outside the window
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.RATE_LIMIT_WINDOW
    );
    
    const remaining = Math.max(0, this.RATE_LIMIT_MAX_REQUESTS - validRequests.length);
    const oldestRequest = validRequests[0];
    const resetTime = oldestRequest ? oldestRequest + this.RATE_LIMIT_WINDOW : now;
    
    return { remaining, resetTime };
  }

  /**
   * Clear rate limit for a client (useful for testing or admin override)
   */
  clearRateLimit(clientId: string): void {
    this.rateLimitMap.delete(clientId);
  }

  /**
   * Get AI service status
   */
  getAIStatus(): { available: boolean; model: string; provider: string } {
    return this.responseGenerator.getAIStatus();
  }

  /**
   * Test AI service connection
   */
  async testAIConnection(): Promise<boolean> {
    return this.responseGenerator.testAIConnection();
  }
}