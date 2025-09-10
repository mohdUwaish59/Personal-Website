/**
 * Demonstration of enhanced conversation flow and context management
 * This file shows how the chatbot now handles:
 * 1. Conversation history persistence
 * 2. Context-aware responses
 * 3. Graceful context limits handling
 * 4. Session management
 */

import { ConversationManager } from '../services/conversation-manager';
import { MessageHandler } from '../services/message-handler';
import { Message } from '../types';

// Demo function to show conversation flow features
export async function demonstrateConversationFlow() {
  console.log('=== Conversation Flow and Context Management Demo ===\n');

  // 1. Session Management Demo
  console.log('1. Session Management:');
  console.log('Creating new session...');
  const newSession = ConversationManager.startNewSession();
  console.log(`New session created with ${newSession.messages.length} message(s)`);
  console.log(`Welcome message: "${newSession.messages[0].content}"\n`);

  // 2. Context Persistence Demo
  console.log('2. Context Persistence:');
  const messageHandler = new MessageHandler();
  
  // Simulate a conversation
  console.log('User: "Hello, tell me about your React skills"');
  const response1 = await messageHandler.processMessage('Hello, tell me about your React skills');
  console.log(`Bot: "${response1.content.substring(0, 100)}..."\n`);

  console.log('User: "Tell me more about that"');
  const response2 = await messageHandler.processMessage('Tell me more about that');
  console.log(`Bot: "${response2.content.substring(0, 100)}..."\n`);

  // 3. Context Information Demo
  console.log('3. Contextual Information:');
  const contextualInfo = ConversationManager.getContextualInfo(messageHandler.getContext());
  console.log('Recent topics:', contextualInfo.recentTopics);
  console.log('Mentioned items:', contextualInfo.mentionedItems);
  console.log('Conversation flow:', contextualInfo.conversationFlow);
  console.log('Last user question:', contextualInfo.lastUserQuestion?.substring(0, 50) + '...\n');

  // 4. Conversation Health Demo
  console.log('4. Conversation Health:');
  const health = ConversationManager.getConversationHealth(messageHandler.getContext());
  console.log('Status:', health.status);
  console.log('Message count:', health.messageCount);
  console.log('Age (minutes):', health.ageMinutes);
  console.log('Recommendation:', health.recommendation, '\n');

  // 5. Context Limits Demo
  console.log('5. Context Limits Handling:');
  
  // Simulate a long conversation
  const longConversationContext = ConversationManager.createFreshContext();
  
  // Add many messages to simulate a long conversation
  for (let i = 0; i < 55; i++) {
    const message: Message = {
      id: `msg_${i}`,
      content: `Message ${i}`,
      sender: i % 2 === 0 ? 'user' : 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    ConversationManager.addMessageToContext(longConversationContext, message);
  }

  console.log(`Created conversation with ${longConversationContext.messages.length} messages`);
  
  const healthBeforeTrim = ConversationManager.getConversationHealth(longConversationContext);
  console.log('Health before handling limits:', healthBeforeTrim.status);
  
  const trimmedContext = ConversationManager.handleContextLimits(longConversationContext);
  console.log(`After handling limits: ${trimmedContext.messages.length} messages`);
  
  const healthAfterTrim = ConversationManager.getConversationHealth(trimmedContext);
  console.log('Health after handling limits:', healthAfterTrim.status, '\n');

  // 6. Session Detection Demo
  console.log('6. Session Detection:');
  
  // Test new session detection
  const isNewSession1 = ConversationManager.isNewSession(null);
  console.log('Null context is new session:', isNewSession1);
  
  const recentContext = ConversationManager.createFreshContext();
  const recentMessage: Message = {
    id: 'recent_msg',
    content: 'Recent message',
    sender: 'user',
    timestamp: new Date(),
    type: 'text'
  };
  ConversationManager.addMessageToContext(recentContext, recentMessage);
  
  const isNewSession2 = ConversationManager.isNewSession(recentContext);
  console.log('Recent context is new session:', isNewSession2);
  
  // Test old session detection
  const oldContext = ConversationManager.createFreshContext();
  const oldMessage: Message = {
    id: 'old_msg',
    content: 'Old message',
    sender: 'user',
    timestamp: new Date(Date.now() - (31 * 60 * 1000)), // 31 minutes ago
    type: 'text'
  };
  ConversationManager.addMessageToContext(oldContext, oldMessage);
  
  const isNewSession3 = ConversationManager.isNewSession(oldContext);
  console.log('Old context is new session:', isNewSession3, '\n');

  // 7. Storage Demo
  console.log('7. Storage Management:');
  console.log('Storage available:', ConversationManager.isStorageAvailable());
  
  const testContext = ConversationManager.createFreshContext();
  const testMessage: Message = {
    id: 'test_msg',
    content: 'Test message for storage',
    sender: 'user',
    timestamp: new Date(),
    type: 'text'
  };
  ConversationManager.addMessageToContext(testContext, testMessage);
  
  console.log('Context saved to storage');
  
  const loadedContext = ConversationManager.loadContext();
  console.log('Context loaded from storage:', loadedContext ? 'Success' : 'Failed');
  console.log('Loaded message count:', loadedContext?.messages.length || 0, '\n');

  console.log('=== Demo Complete ===');
}

// Export stats function for analysis
export function getConversationStats(messageHandler: MessageHandler) {
  const context = messageHandler.getContext();
  const stats = ConversationManager.getConversationStats(context);
  const health = ConversationManager.getConversationHealth(context);
  const contextualInfo = ConversationManager.getContextualInfo(context);
  
  return {
    stats,
    health,
    contextualInfo,
    summary: ConversationManager.getConversationSummary(context)
  };
}

// Export function to test context-aware responses
export async function testContextAwareResponses() {
  console.log('=== Context-Aware Responses Demo ===\n');
  
  const messageHandler = new MessageHandler();
  messageHandler.resetContext(); // Start fresh
  
  console.log('Starting conversation about skills...');
  const response1 = await messageHandler.processMessage('Tell me about your React skills');
  console.log(`Bot: "${response1.content.substring(0, 100)}..."\n`);
  
  console.log('Asking follow-up question with context reference...');
  const response2 = await messageHandler.processMessage('Tell me more about that');
  console.log(`Bot: "${response2.content.substring(0, 100)}..."\n`);
  
  console.log('Asking about projects using context...');
  const response3 = await messageHandler.processMessage('What projects have you built with it?');
  console.log(`Bot: "${response3.content.substring(0, 100)}..."\n`);
  
  console.log('Final context analysis:');
  const finalStats = getConversationStats(messageHandler);
  console.log('Topics discussed:', finalStats.contextualInfo.recentTopics);
  console.log('Items mentioned:', finalStats.contextualInfo.mentionedItems);
  console.log('Conversation flow:', finalStats.contextualInfo.conversationFlow);
  
  console.log('\n=== Context-Aware Demo Complete ===');
}

// Run demos if this file is executed directly
if (require.main === module) {
  demonstrateConversationFlow()
    .then(() => testContextAwareResponses())
    .catch(console.error);
}