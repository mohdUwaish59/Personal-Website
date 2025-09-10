import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessageHandler } from '../services/message-handler';
import { Message, Intent } from '../types';

// Mock the KnowledgeBase and ResponseGenerator
vi.mock('../services/knowledge-base', () => ({
  KnowledgeBase: vi.fn().mockImplementation(() => ({
    getPersonalInfo: vi.fn().mockReturnValue({ name: 'Test User' }),
    getSkills: vi.fn().mockReturnValue([]),
    getExperience: vi.fn().mockReturnValue([]),
    getProjects: vi.fn().mockReturnValue([]),
    searchContent: vi.fn().mockReturnValue([])
  }))
}));

vi.mock('../services/response-generator', () => ({
  ResponseGenerator: vi.fn().mockImplementation(() => ({
    generateResponse: vi.fn().mockResolvedValue('Test response')
  }))
}));

describe('MessageHandler', () => {
  let messageHandler: MessageHandler;

  beforeEach(() => {
    messageHandler = new MessageHandler();
  });

  describe('processMessage', () => {
    it('should process a valid message and return bot response', async () => {
      const userMessage = 'Hello, tell me about your skills';
      
      const botResponse = await messageHandler.processMessage(userMessage);
      
      expect(botResponse).toBeDefined();
      expect(botResponse.sender).toBe('bot');
      expect(botResponse.content).toBeTruthy();
      expect(botResponse.timestamp).toBeInstanceOf(Date);
      expect(botResponse.id).toBeTruthy();
    });

    it('should reject messages that are too long', async () => {
      const longMessage = 'a'.repeat(501);
      
      await expect(messageHandler.processMessage(longMessage)).rejects.toThrow('Invalid message content');
    });

    it('should reject empty messages', async () => {
      await expect(messageHandler.processMessage('')).rejects.toThrow('Invalid message content');
    });

    it('should sanitize HTML content', async () => {
      const htmlMessage = '<div>Hello <b>world</b></div>';
      
      const botResponse = await messageHandler.processMessage(htmlMessage);
      
      // The message should be processed (sanitized) and not rejected
      expect(botResponse).toBeDefined();
      expect(botResponse.sender).toBe('bot');
    });

    it('should reject messages with dangerous patterns', async () => {
      const dangerousMessage = '<script>alert("test")</script>';
      
      await expect(messageHandler.processMessage(dangerousMessage)).rejects.toThrow('Invalid message content');
    });
  });

  describe('sanitizeInput', () => {
    it('should escape dangerous characters and remove HTML tags', () => {
      const handler = messageHandler as any;
      const input = '<div>Hello <b>world</b></div>';
      const result = handler.sanitizeInput(input);
      
      expect(result).toBe('Hello world');
    });

    it('should escape dangerous characters', () => {
      const handler = messageHandler as any;
      const input = 'Hello & "world"';
      const result = handler.sanitizeInput(input);
      
      expect(result).toBe('Hello &amp; &quot;world&quot;');
    });

    it('should normalize whitespace', () => {
      const handler = messageHandler as any;
      const input = '  Hello    world  ';
      const result = handler.sanitizeInput(input);
      
      expect(result).toBe('Hello world');
    });
  });

  // Intent extraction is now handled by ResponseGenerator, not MessageHandler

  describe('context management', () => {
    it('should maintain conversation context', async () => {
      await messageHandler.processMessage('Hello');
      await messageHandler.processMessage('Tell me about your skills');
      
      const context = messageHandler.getContext();
      
      expect(context.messages).toHaveLength(4); // 2 user + 2 bot messages
      expect(context.messages[0].sender).toBe('user');
      expect(context.messages[1].sender).toBe('bot');
    });

    it('should limit message history', async () => {
      // Create a new handler to avoid rate limiting issues
      const testHandler = new MessageHandler();
      
      // Add many messages to test limit
      for (let i = 0; i < 25; i++) {
        await testHandler.processMessage(`Message ${i}`, `client-${i}`);
      }
      
      const context = testHandler.getContext();
      
      expect(context.messages.length).toBeLessThanOrEqual(20);
    });

    it('should reset context', () => {
      messageHandler.resetContext();
      
      const context = messageHandler.getContext();
      
      expect(context.messages).toHaveLength(0);
      expect(context.currentTopic).toBeUndefined();
      expect(context.userIntent).toBeUndefined();
    });
  });

  describe('message ID generation', () => {
    it('should generate unique message IDs', () => {
      const handler = messageHandler as any;
      const id1 = handler.generateMessageId();
      const id2 = handler.generateMessageId();
      
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^msg_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^msg_\d+_[a-z0-9]+$/);
    });
  });

  describe('rate limiting', () => {
    it('should allow messages under rate limit', async () => {
      const clientId = 'test-client';
      
      // Should allow first message
      const response = await messageHandler.processMessage('Hello', clientId);
      expect(response).toBeDefined();
    });

    it('should reject messages over rate limit', async () => {
      const clientId = 'test-client-2';
      const handler = messageHandler as any;
      
      // Simulate hitting rate limit
      const requests = Array(11).fill(Date.now());
      handler.rateLimitMap.set(clientId, requests);
      
      await expect(messageHandler.processMessage('Hello', clientId))
        .rejects.toThrow('Rate limit exceeded');
    });

    it('should provide rate limit status', () => {
      const clientId = 'test-client-3';
      const status = messageHandler.getRateLimitStatus(clientId);
      
      expect(status).toHaveProperty('remaining');
      expect(status).toHaveProperty('resetTime');
      expect(typeof status.remaining).toBe('number');
      expect(typeof status.resetTime).toBe('number');
    });

    it('should clear rate limit', () => {
      const clientId = 'test-client-4';
      messageHandler.clearRateLimit(clientId);
      
      const status = messageHandler.getRateLimitStatus(clientId);
      expect(status.remaining).toBe(10); // Max requests
    });
  });

  // Topic extraction is now handled by ResponseGenerator, not MessageHandler
});