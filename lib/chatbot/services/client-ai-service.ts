import { Message, ConversationContext } from '../types';

/**
 * Client-side AI service for communicating with the chatbot API
 */
export class ClientAIService {
  private baseUrl: string;
  private clientId: string;

  constructor() {
    this.baseUrl = '/api/chatbot';
    this.clientId = this.generateClientId();
  }

  /**
   * Send message to chatbot API and get response
   */
  async sendMessage(message: string): Promise<{ message: Message; context: ConversationContext }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          clientId: this.clientId
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          throw new Error('Too many messages. Please wait before sending another.');
        } else if (response.status === 400) {
          throw new Error(errorData.error || 'Invalid message');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(errorData.error || 'Failed to send message');
        }
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process message');
      }

      // Convert timestamp strings back to Date objects for consistency
      const responseMessage = {
        ...data.message,
        timestamp: new Date(data.message.timestamp)
      };

      const responseContext = {
        ...data.context,
        messages: data.context.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      };

      return {
        message: responseMessage,
        context: responseContext
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  /**
   * Get chatbot service status
   */
  async getStatus(): Promise<{
    ai: { available: boolean; model: string; provider: string };
    rateLimits: { maxRequestsPerMinute: number; windowMs: number };
  }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to get status');
      }

      const data = await response.json();
      return data.status;
    } catch (error) {
      console.error('Failed to get chatbot status:', error);
      throw error;
    }
  }

  /**
   * Test connection to chatbot API
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getStatus();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate unique client ID for rate limiting
   */
  private generateClientId(): string {
    // Try to get existing client ID from sessionStorage
    if (typeof window !== 'undefined') {
      const existingId = sessionStorage.getItem('chatbot-client-id');
      if (existingId) {
        return existingId;
      }
    }

    // Generate new client ID
    const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Store in sessionStorage if available
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatbot-client-id', clientId);
    }

    return clientId;
  }

  /**
   * Get current client ID
   */
  getClientId(): string {
    return this.clientId;
  }

  /**
   * Reset client ID (useful for testing or new sessions)
   */
  resetClientId(): void {
    this.clientId = this.generateClientId();
  }
}