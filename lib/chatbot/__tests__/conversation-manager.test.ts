import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConversationManager } from '../services/conversation-manager';
import { ConversationContext, Message } from '../types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ConversationManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('saveContext', () => {
    it('should save context to localStorage', () => {
      const context: ConversationContext = {
        messages: [],
        currentTopic: 'skills',
        userIntent: 'skills',
        lastAskedAbout: 'React'
      };

      ConversationManager.saveContext(context);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'chatbot_conversation',
        expect.stringContaining('"currentTopic":"skills"')
      );
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const context: ConversationContext = {
        messages: [],
      };

      // Should not throw
      expect(() => ConversationManager.saveContext(context)).not.toThrow();
    });
  });

  describe('loadContext', () => {
    it('should load context from localStorage', () => {
      const savedContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Hello',
            sender: 'user',
            timestamp: '2023-01-01T00:00:00.000Z',
            type: 'text'
          }
        ],
        currentTopic: 'skills',
        userIntent: 'skills',
        lastAskedAbout: 'React',
        lastActivity: Date.now()
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedContext));

      const result = ConversationManager.loadContext();

      expect(result).toBeDefined();
      expect(result?.currentTopic).toBe('skills');
      expect(result?.messages).toHaveLength(1);
      expect(result?.messages[0].timestamp).toBeInstanceOf(Date);
    });

    it('should return null if no saved context', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = ConversationManager.loadContext();

      expect(result).toBeNull();
    });

    it('should return null if context is expired', () => {
      const expiredContext = {
        messages: [],
        lastActivity: Date.now() - (31 * 60 * 1000) // 31 minutes ago
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(expiredContext));

      const result = ConversationManager.loadContext();

      expect(result).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('chatbot_conversation');
    });

    it('should handle JSON parse errors', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = ConversationManager.loadContext();

      expect(result).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('chatbot_conversation');
    });
  });

  describe('clearContext', () => {
    it('should remove context from localStorage', () => {
      ConversationManager.clearContext();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('chatbot_conversation');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      // Should not throw
      expect(() => ConversationManager.clearContext()).not.toThrow();
    });
  });

  describe('addMessageToContext', () => {
    it('should add message to context', () => {
      const context: ConversationContext = {
        messages: []
      };

      const message: Message = {
        id: 'msg1',
        content: 'Hello',
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      const result = ConversationManager.addMessageToContext(context, message);

      expect(result.messages).toHaveLength(1);
      expect(result.messages[0]).toBe(message);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should limit message history', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 60; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const newMessage: Message = {
        id: 'new_msg',
        content: 'New message',
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      const result = ConversationManager.addMessageToContext(context, newMessage);

      expect(result.messages.length).toBeLessThanOrEqual(50);
      expect(result.messages[result.messages.length - 1]).toBe(newMessage);
    });
  });

  describe('updateContext', () => {
    it('should update context properties', () => {
      const context: ConversationContext = {
        messages: [],
        currentTopic: 'old_topic'
      };

      const updates = {
        currentTopic: 'new_topic',
        userIntent: 'skills' as const
      };

      const result = ConversationManager.updateContext(context, updates);

      expect(result.currentTopic).toBe('new_topic');
      expect(result.userIntent).toBe('skills');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('getConversationSummary', () => {
    it('should extract topics from recent messages', () => {
      const messages: Message[] = [
        {
          id: 'msg1',
          content: 'Tell me about your skills',
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        },
        {
          id: 'msg2',
          content: 'What projects have you worked on?',
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        }
      ];

      const context: ConversationContext = { messages };
      const summary = ConversationManager.getConversationSummary(context);

      expect(summary).toContain('skills');
      expect(summary).toContain('projects');
    });

    it('should return general conversation for no specific topics', () => {
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Hello there',
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      };

      const summary = ConversationManager.getConversationSummary(context);

      expect(summary).toBe('general conversation');
    });
  });

  describe('shouldResetContext', () => {
    it('should reset if too many messages', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 80; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const shouldReset = ConversationManager.shouldResetContext(context);

      expect(shouldReset).toBe(true);
    });

    it('should reset if last message is too old', () => {
      const oldDate = new Date(Date.now() - (31 * 60 * 1000)); // 31 minutes ago
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Old message',
            sender: 'user',
            timestamp: oldDate,
            type: 'text'
          }
        ]
      };

      const shouldReset = ConversationManager.shouldResetContext(context);

      expect(shouldReset).toBe(true);
    });

    it('should not reset for normal conversation', () => {
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Recent message',
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      };

      const shouldReset = ConversationManager.shouldResetContext(context);

      expect(shouldReset).toBe(false);
    });
  });

  describe('createFreshContext', () => {
    it('should create empty context', () => {
      const context = ConversationManager.createFreshContext();

      expect(context.messages).toHaveLength(0);
      expect(context.currentTopic).toBeUndefined();
      expect(context.userIntent).toBeUndefined();
      expect(context.lastAskedAbout).toBeUndefined();
    });
  });

  describe('getConversationStats', () => {
    it('should calculate conversation statistics', () => {
      const messages: Message[] = [
        {
          id: 'msg1',
          content: 'User message 1',
          sender: 'user',
          timestamp: new Date('2023-01-01T10:00:00Z'),
          type: 'text'
        },
        {
          id: 'msg2',
          content: 'Bot response 1',
          sender: 'bot',
          timestamp: new Date('2023-01-01T10:01:00Z'),
          type: 'text'
        },
        {
          id: 'msg3',
          content: 'User message 2',
          sender: 'user',
          timestamp: new Date('2023-01-01T10:02:00Z'),
          type: 'text'
        }
      ];

      const context: ConversationContext = { messages };
      const stats = ConversationManager.getConversationStats(context);

      expect(stats.totalMessages).toBe(3);
      expect(stats.userMessages).toBe(2);
      expect(stats.botMessages).toBe(1);
      expect(stats.conversationStarted).toEqual(new Date('2023-01-01T10:00:00Z'));
      expect(stats.lastActivity).toEqual(new Date('2023-01-01T10:02:00Z'));
    });
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      // Reset the mock to not throw errors
      localStorageMock.setItem.mockImplementation(() => {});
      localStorageMock.removeItem.mockImplementation(() => {});
      
      const result = ConversationManager.isStorageAvailable();
      expect(result).toBe(true);
    });

    it('should return false when localStorage throws error', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage not available');
      });

      const result = ConversationManager.isStorageAvailable();
      expect(result).toBe(false);
    });
  });

  describe('getContextualInfo', () => {
    it('should extract contextual information from conversation', () => {
      const messages: Message[] = [
        {
          id: 'msg1',
          content: 'Tell me about your React skills',
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        },
        {
          id: 'msg2',
          content: 'I have extensive React experience...',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        },
        {
          id: 'msg3',
          content: 'Tell me more about your JavaScript experience',
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        }
      ];

      const context: ConversationContext = { messages };
      const contextualInfo = ConversationManager.getContextualInfo(context);

      expect(contextualInfo.recentTopics).toContain('skills');
      expect(contextualInfo.mentionedItems).toContain('react');
      expect(contextualInfo.mentionedItems).toContain('javascript');
      expect(contextualInfo.lastUserQuestion).toBe('Tell me more about your JavaScript experience');
      expect(contextualInfo.conversationFlow).toBe('follow-up');
    });

    it('should handle empty conversation', () => {
      const context: ConversationContext = { messages: [] };
      const contextualInfo = ConversationManager.getContextualInfo(context);

      expect(contextualInfo.recentTopics).toHaveLength(0);
      expect(contextualInfo.mentionedItems).toHaveLength(0);
      expect(contextualInfo.lastUserQuestion).toBeNull();
      expect(contextualInfo.conversationFlow).toBe('initial');
    });
  });

  describe('trimContextGracefully', () => {
    beforeEach(() => {
      // Reset localStorage mock for these tests
      localStorageMock.setItem.mockImplementation(() => {});
    });

    it('should trim context when exceeding limits', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 60; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: i % 2 === 0 ? 'user' : 'bot',
          timestamp: new Date(Date.now() + i * 1000),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const trimmedContext = ConversationManager.trimContextGracefully(context);

      expect(trimmedContext.messages.length).toBeLessThan(messages.length);
      expect(trimmedContext.messages[0]).toBe(messages[0]); // First message preserved
      expect(trimmedContext.messages.some(msg => msg.content.includes('Previous conversation summary'))).toBe(true);
    });

    it('should not trim context if within limits', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 10; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const result = ConversationManager.trimContextGracefully(context);

      expect(result).toBe(context); // Should return same context
    });
  });

  describe('handleContextLimits', () => {
    beforeEach(() => {
      // Reset localStorage mock for these tests
      localStorageMock.setItem.mockImplementation(() => {});
    });

    it('should reset context if too old', () => {
      const oldDate = new Date(Date.now() - (31 * 60 * 1000));
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Old message',
            sender: 'user',
            timestamp: oldDate,
            type: 'text'
          }
        ]
      };

      const result = ConversationManager.handleContextLimits(context);

      expect(result.messages).toHaveLength(0);
    });

    it('should trim context if too large', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 60; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const result = ConversationManager.handleContextLimits(context);

      expect(result.messages.length).toBeLessThan(messages.length);
    });
  });

  describe('startNewSession', () => {
    beforeEach(() => {
      // Reset localStorage mock for these tests
      localStorageMock.setItem.mockImplementation(() => {});
    });

    it('should create new session with welcome message', () => {
      const context = ConversationManager.startNewSession();

      expect(context.messages).toHaveLength(1);
      expect(context.messages[0].sender).toBe('bot');
      expect(context.messages[0].content).toContain('Hi! I\'m Mohd Uwaish');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  describe('isNewSession', () => {
    it('should return true for null context', () => {
      const result = ConversationManager.isNewSession(null);
      expect(result).toBe(true);
    });

    it('should return true for empty context', () => {
      const context: ConversationContext = { messages: [] };
      const result = ConversationManager.isNewSession(context);
      expect(result).toBe(true);
    });

    it('should return true for old conversation', () => {
      const oldDate = new Date(Date.now() - (31 * 60 * 1000));
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Old message',
            sender: 'user',
            timestamp: oldDate,
            type: 'text'
          }
        ]
      };

      const result = ConversationManager.isNewSession(context);
      expect(result).toBe(true);
    });

    it('should return false for recent conversation', () => {
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Recent message',
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      };

      const result = ConversationManager.isNewSession(context);
      expect(result).toBe(false);
    });
  });

  describe('resumeOrStartConversation', () => {
    beforeEach(() => {
      // Reset localStorage mock for these tests
      localStorageMock.setItem.mockImplementation(() => {});
      localStorageMock.removeItem.mockImplementation(() => {});
    });

    it('should start new session if no storage available', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage not available');
      });

      const context = ConversationManager.resumeOrStartConversation();

      expect(context.messages).toHaveLength(1);
      expect(context.messages[0].content).toContain('Hi! I\'m Mohd Uwaish');
    });

    it('should start new session if saved context is old', () => {
      const oldContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Old message',
            sender: 'user',
            timestamp: new Date(Date.now() - (31 * 60 * 1000)).toISOString(),
            type: 'text'
          }
        ],
        lastActivity: Date.now() - (31 * 60 * 1000)
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(oldContext));
      // Reset the mock to allow setItem calls
      localStorageMock.setItem.mockImplementation(() => {});

      const context = ConversationManager.resumeOrStartConversation();

      expect(context.messages).toHaveLength(1);
      expect(context.messages[0].content).toContain('Hi! I\'m Mohd Uwaish');
      // The clearContext is called internally by isNewSession logic
    });

    it('should resume existing conversation if recent', () => {
      const recentContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Recent message',
            sender: 'user',
            timestamp: new Date().toISOString(),
            type: 'text'
          }
        ],
        lastActivity: Date.now()
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(recentContext));
      // Reset the mock to allow setItem calls
      localStorageMock.setItem.mockImplementation(() => {});

      const context = ConversationManager.resumeOrStartConversation();

      expect(context.messages).toHaveLength(1);
      expect(context.messages[0].content).toBe('Recent message');
    });
  });

  describe('getConversationHealth', () => {
    it('should return healthy status for normal conversation', () => {
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Recent message',
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
          }
        ]
      };

      const health = ConversationManager.getConversationHealth(context);

      expect(health.status).toBe('healthy');
      expect(health.messageCount).toBe(1);
      expect(health.recommendation).toContain('smoothly');
    });

    it('should return approaching_limit for long conversation', () => {
      const messages: Message[] = [];
      for (let i = 0; i < 45; i++) {
        messages.push({
          id: `msg${i}`,
          content: `Message ${i}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'text'
        });
      }

      const context: ConversationContext = { messages };
      const health = ConversationManager.getConversationHealth(context);

      expect(health.status).toBe('approaching_limit');
      expect(health.recommendation).toContain('long');
    });

    it('should return needs_reset for very old conversation', () => {
      const oldDate = new Date(Date.now() - (31 * 60 * 1000));
      const context: ConversationContext = {
        messages: [
          {
            id: 'msg1',
            content: 'Old message',
            sender: 'user',
            timestamp: oldDate,
            type: 'text'
          }
        ]
      };

      const health = ConversationManager.getConversationHealth(context);

      expect(health.status).toBe('needs_reset');
      expect(health.recommendation).toContain('reset');
    });
  });
});