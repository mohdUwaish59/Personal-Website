import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MessageHandler } from '../services/message-handler';

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

describe('Chatbot Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});
  });

  it('should handle a complete conversation flow', async () => {
    const messageHandler = new MessageHandler();

    // Check initial welcome message exists
    const initialContext = messageHandler.getContext();
    expect(initialContext.messages.length).toBe(1); // Welcome message
    expect(initialContext.messages[0].sender).toBe('bot');
    expect(initialContext.messages[0].content).toContain('Hi! I\'m Mohd Uwaish');

    // Test greeting
    const greetingResponse = await messageHandler.processMessage('Hello');
    expect(greetingResponse.sender).toBe('bot');
    expect(greetingResponse.content).toBeTruthy();
    expect(greetingResponse.content.toLowerCase()).toContain('mohd uwaish');

    // Test skills question
    const skillsResponse = await messageHandler.processMessage('What are your skills?');
    expect(skillsResponse.sender).toBe('bot');
    expect(skillsResponse.content).toBeTruthy();

    // Test experience question
    const experienceResponse = await messageHandler.processMessage('Tell me about your experience');
    expect(experienceResponse.sender).toBe('bot');
    expect(experienceResponse.content).toBeTruthy();

    // Test projects question
    const projectsResponse = await messageHandler.processMessage('Show me your projects');
    expect(projectsResponse.sender).toBe('bot');
    expect(projectsResponse.content).toBeTruthy();

    // Verify conversation context is maintained
    const context = messageHandler.getContext();
    expect(context.messages.length).toBe(9); // 1 welcome + 4 user + 4 bot messages
  });

  it('should handle input validation correctly', async () => {
    const messageHandler = new MessageHandler();

    // Test empty message
    await expect(messageHandler.processMessage('')).rejects.toThrow('Invalid message content');

    // Test too long message
    const longMessage = 'a'.repeat(501);
    await expect(messageHandler.processMessage(longMessage)).rejects.toThrow('Invalid message content');

    // Test dangerous script
    await expect(messageHandler.processMessage('<script>alert("xss")</script>')).rejects.toThrow('Invalid message content');
  });

  it('should sanitize HTML input properly', async () => {
    const messageHandler = new MessageHandler();

    // Test HTML sanitization
    const response = await messageHandler.processMessage('<div>Hello <b>world</b></div>');
    expect(response.sender).toBe('bot');
    expect(response.content).toBeTruthy();
  });

  it('should maintain conversation context across multiple messages', async () => {
    const messageHandler = new MessageHandler();
    
    // Reset context to ensure clean state
    messageHandler.resetContext();

    await messageHandler.processMessage('Hello');
    await messageHandler.processMessage('What are your skills?');
    await messageHandler.processMessage('Tell me about React');

    const context = messageHandler.getContext();
    expect(context.messages.length).toBe(7); // 1 welcome + 3 user + 3 bot messages
    
    // Check that messages are in correct order (starting after welcome message)
    expect(context.messages[0].sender).toBe('bot'); // Welcome message
    expect(context.messages[1].sender).toBe('user');
    expect(context.messages[2].sender).toBe('bot');
    expect(context.messages[3].sender).toBe('user');
    expect(context.messages[4].sender).toBe('bot');
  });
});