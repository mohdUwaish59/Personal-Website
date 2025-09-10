import { Message, ConversationContext } from '../types';

/**
 * ConversationManager handles conversation context, history persistence, and session management
 */
export class ConversationManager {
  private static readonly STORAGE_KEY = 'chatbot_conversation';
  private static readonly MAX_MESSAGES = 50;
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  /**
   * Save conversation context to localStorage
   */
  static saveContext(context: ConversationContext): void {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    try {
      const contextWithTimestamp = {
        ...context,
        lastActivity: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contextWithTimestamp));
    } catch (error) {
      console.warn('Failed to save conversation context:', error);
    }
  }

  /**
   * Load conversation context from localStorage
   */
  static loadContext(): ConversationContext | null {
    if (typeof window === 'undefined') return null; // Skip on server-side
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);

      // Check if session has expired
      if (parsed.lastActivity && Date.now() - parsed.lastActivity > this.SESSION_TIMEOUT) {
        this.clearContext();
        return null;
      }

      // Convert timestamp strings back to Date objects
      const messages = parsed.messages?.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) || [];

      return {
        messages,
        currentTopic: parsed.currentTopic,
        userIntent: parsed.userIntent,
        lastAskedAbout: parsed.lastAskedAbout
      };
    } catch (error) {
      console.warn('Failed to load conversation context:', error);
      this.clearContext();
      return null;
    }
  }

  /**
   * Clear conversation context from localStorage
   */
  static clearContext(): void {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear conversation context:', error);
    }
  }

  /**
   * Add message to context and manage history limits
   */
  static addMessageToContext(context: ConversationContext, message: Message): ConversationContext {
    const updatedMessages = [...context.messages, message];

    // Keep only the most recent messages to prevent memory issues
    const trimmedMessages = updatedMessages.length > this.MAX_MESSAGES
      ? updatedMessages.slice(-this.MAX_MESSAGES)
      : updatedMessages;

    const updatedContext = {
      ...context,
      messages: trimmedMessages
    };

    // Save to localStorage
    this.saveContext(updatedContext);

    return updatedContext;
  }

  /**
   * Update conversation context with new properties
   */
  static updateContext(context: ConversationContext, updates: Partial<ConversationContext>): ConversationContext {
    const updatedContext = {
      ...context,
      ...updates
    };

    // Save to localStorage
    this.saveContext(updatedContext);

    return updatedContext;
  }

  /**
   * Get conversation summary for context
   */
  static getConversationSummary(context: ConversationContext): string {
    const recentMessages = context.messages.slice(-6); // Last 6 messages
    const topics = new Set<string>();
    const keyPoints: string[] = [];

    recentMessages.forEach(msg => {
      if (msg.sender === 'user') {
        const msgLower = msg.content.toLowerCase();

        // Extract topics from user messages
        if (msgLower.includes('skill') || msgLower.includes('technology')) {
          topics.add('skills');
        }
        if (msgLower.includes('experience') || msgLower.includes('work')) {
          topics.add('experience');
        }
        if (msgLower.includes('project')) {
          topics.add('projects');
        }
        if (msgLower.includes('education') || msgLower.includes('study')) {
          topics.add('education');
        }
        if (msgLower.includes('contact') || msgLower.includes('hire')) {
          topics.add('contact');
        }

        // Extract key points for context continuity
        if (msgLower.includes('tell me more') || msgLower.includes('elaborate')) {
          keyPoints.push('User requested more details');
        }
        if (msgLower.includes('what about') || msgLower.includes('how about')) {
          keyPoints.push('User asking follow-up questions');
        }
      }
    });

    const topicsStr = Array.from(topics).join(', ') || 'general conversation';
    const contextStr = keyPoints.length > 0 ? ` (${keyPoints.join(', ')})` : '';

    return topicsStr + contextStr;
  }

  /**
   * Get contextual information for AI responses
   */
  static getContextualInfo(context: ConversationContext): {
    recentTopics: string[];
    lastUserQuestion: string | null;
    conversationFlow: string;
    mentionedItems: string[];
  } {
    const recentMessages = context.messages.slice(-8);
    const topics: string[] = [];
    const mentionedItems: string[] = [];
    let lastUserQuestion: string | null = null;

    recentMessages.forEach(msg => {
      if (msg.sender === 'user') {
        lastUserQuestion = msg.content;
        const msgLower = msg.content.toLowerCase();

        // Track topics
        if (msgLower.includes('skill') || msgLower.includes('technology')) {
          topics.push('skills');
        }
        if (msgLower.includes('experience') || msgLower.includes('work')) {
          topics.push('experience');
        }
        if (msgLower.includes('project')) {
          topics.push('projects');
        }

        // Track specific mentions
        const skillMentions = msgLower.match(/\b(react|javascript|python|node|typescript|next\.?js|tailwind|mongodb|postgresql)\b/g);
        if (skillMentions) {
          mentionedItems.push(...skillMentions);
        }
      }
    });

    // Determine conversation flow
    let conversationFlow = 'initial';
    if (recentMessages.length > 2) {
      const hasFollowUp = recentMessages.some(msg =>
        msg.sender === 'user' &&
        (msg.content.toLowerCase().includes('tell me more') ||
          msg.content.toLowerCase().includes('what about') ||
          msg.content.toLowerCase().includes('how about'))
      );
      conversationFlow = hasFollowUp ? 'follow-up' : 'ongoing';
    }

    return {
      recentTopics: [...new Set(topics)],
      lastUserQuestion,
      conversationFlow,
      mentionedItems: [...new Set(mentionedItems)]
    };
  }

  /**
   * Check if conversation needs context reset
   */
  static shouldResetContext(context: ConversationContext): boolean {
    // Reset if too many messages
    if (context.messages.length > this.MAX_MESSAGES * 1.5) {
      return true;
    }

    // Reset if last message is too old
    const lastMessage = context.messages[context.messages.length - 1];
    if (lastMessage) {
      const timestamp = lastMessage.timestamp instanceof Date
        ? lastMessage.timestamp
        : new Date(lastMessage.timestamp);
      if (Date.now() - timestamp.getTime() > this.SESSION_TIMEOUT) {
        return true;
      }
    }

    return false;
  }

  /**
   * Gracefully trim conversation context when approaching limits
   */
  static trimContextGracefully(context: ConversationContext): ConversationContext {
    if (context.messages.length <= this.MAX_MESSAGES) {
      return context;
    }

    // Keep the first message (usually greeting) and recent messages
    const firstMessage = context.messages[0];
    const recentMessages = context.messages.slice(-this.MAX_MESSAGES + 5);

    // Create a summary of the trimmed conversation
    const trimmedMessages = context.messages.slice(1, -this.MAX_MESSAGES + 5);
    const summaryContent = this.createConversationSummary(trimmedMessages);

    const summaryMessage: Message = {
      id: `summary_${Date.now()}`,
      content: `[Previous conversation summary: ${summaryContent}]`,
      sender: 'bot',
      timestamp: new Date(recentMessages[0]?.timestamp || Date.now()),
      type: 'text'
    };

    const trimmedContext = {
      ...context,
      messages: [firstMessage, summaryMessage, ...recentMessages]
    };

    // Save the trimmed context
    this.saveContext(trimmedContext);

    return trimmedContext;
  }

  /**
   * Create a summary of conversation messages
   */
  private static createConversationSummary(messages: Message[]): string {
    const topics = new Set<string>();
    const keyInteractions: string[] = [];

    messages.forEach(msg => {
      if (msg.sender === 'user') {
        const msgLower = msg.content.toLowerCase();

        // Track topics discussed
        if (msgLower.includes('skill')) topics.add('skills');
        if (msgLower.includes('experience') || msgLower.includes('work')) topics.add('experience');
        if (msgLower.includes('project')) topics.add('projects');
        if (msgLower.includes('education')) topics.add('education');
        if (msgLower.includes('contact')) topics.add('contact');

        // Track key interactions
        if (msgLower.includes('tell me about')) {
          keyInteractions.push('asked for details');
        }
        if (msgLower.includes('what') || msgLower.includes('how')) {
          keyInteractions.push('asked questions');
        }
      }
    });

    const topicsStr = Array.from(topics).join(', ');
    const interactionsStr = keyInteractions.length > 0 ? ` User ${keyInteractions.join(' and ')}.` : '';

    return `Discussed ${topicsStr || 'general topics'}.${interactionsStr}`;
  }

  /**
   * Handle context limits by trimming or resetting as needed
   */
  static handleContextLimits(context: ConversationContext): ConversationContext {
    if (this.shouldResetContext(context)) {
      // If context is too old or too large, create fresh context
      return this.createFreshContext();
    } else if (context.messages.length > this.MAX_MESSAGES) {
      // If approaching limits, trim gracefully
      return this.trimContextGracefully(context);
    }

    return context;
  }

  /**
   * Create a fresh conversation context
   */
  static createFreshContext(): ConversationContext {
    return {
      messages: [],
      currentTopic: undefined,
      userIntent: undefined,
      lastAskedAbout: undefined
    };
  }

  /**
   * Get conversation statistics
   */
  static getConversationStats(context: ConversationContext) {
    const userMessages = context.messages.filter(msg => msg.sender === 'user');
    const botMessages = context.messages.filter(msg => msg.sender === 'bot');

    return {
      totalMessages: context.messages.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      conversationStarted: context.messages.length > 0 ? context.messages[0].timestamp : null,
      lastActivity: context.messages.length > 0 ? context.messages[context.messages.length - 1].timestamp : null
    };
  }

  /**
   * Export conversation for debugging or analysis
   */
  static exportConversation(context: ConversationContext): string {
    const stats = this.getConversationStats(context);
    const summary = this.getConversationSummary(context);

    return JSON.stringify({
      stats,
      summary,
      messages: context.messages,
      context: {
        currentTopic: context.currentTopic,
        userIntent: context.userIntent,
        lastAskedAbout: context.lastAskedAbout
      }
    }, null, 2);
  }

  /**
   * Check if localStorage is available
   */
  static isStorageAvailable(): boolean {
    if (typeof window === 'undefined') return false; // Not available on server-side
    
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Start a new conversation session
   */
  static startNewSession(): ConversationContext {
    const freshContext = this.createFreshContext();

    // Add welcome message
    const welcomeMessage: Message = {
      id: `welcome_${Date.now()}`,
      content: "Hi! I'm Mohd Uwaish. I'm here to answer any questions about my skills, experience, or projects. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    const contextWithWelcome = this.addMessageToContext(freshContext, welcomeMessage);
    return contextWithWelcome;
  }

  /**
   * Check if this is a new session (no recent activity)
   */
  static isNewSession(context: ConversationContext | null): boolean {
    if (!context || context.messages.length === 0) {
      return true;
    }

    const lastMessage = context.messages[context.messages.length - 1];
    const timeSinceLastMessage = Date.now() - new Date(lastMessage.timestamp).getTime();

    // Consider it a new session if more than 30 minutes have passed
    return timeSinceLastMessage > this.SESSION_TIMEOUT;
  }

  /**
   * Resume or start conversation based on stored context
   */
  static resumeOrStartConversation(): ConversationContext {
    if (!this.isStorageAvailable()) {
      return this.startNewSession();
    }

    const savedContext = this.loadContext();

    if (this.isNewSession(savedContext)) {
      // Clear old context and start fresh
      this.clearContext();
      return this.startNewSession();
    }

    // Resume existing conversation
    return savedContext || this.startNewSession();
  }

  /**
   * Get conversation age in minutes
   */
  static getConversationAge(context: ConversationContext): number {
    if (context.messages.length === 0) return 0;

    const firstMessage = context.messages[0];
    const ageMs = Date.now() - new Date(firstMessage.timestamp).getTime();
    return Math.floor(ageMs / (1000 * 60)); // Convert to minutes
  }

  /**
   * Check if conversation is getting long and needs attention
   */
  static isConversationLong(context: ConversationContext): boolean {
    return context.messages.length > this.MAX_MESSAGES * 0.8; // 80% of max
  }

  /**
   * Get conversation health status
   */
  static getConversationHealth(context: ConversationContext): {
    status: 'healthy' | 'approaching_limit' | 'needs_reset';
    messageCount: number;
    ageMinutes: number;
    recommendation: string;
  } {
    const messageCount = context.messages.length;
    const ageMinutes = this.getConversationAge(context);

    let status: 'healthy' | 'approaching_limit' | 'needs_reset' = 'healthy';
    let recommendation = 'Conversation is running smoothly.';

    if (this.shouldResetContext(context)) {
      status = 'needs_reset';
      recommendation = 'Conversation should be reset due to age or size.';
    } else if (this.isConversationLong(context)) {
      status = 'approaching_limit';
      recommendation = 'Conversation is getting long. Consider summarizing or trimming.';
    }

    return {
      status,
      messageCount,
      ageMinutes,
      recommendation
    };
  }
}