import { Message, Intent } from './message';

/**
 * Conversation context interface for maintaining chat state
 */
export interface ConversationContext {
  messages: Message[];
  currentTopic?: string;
  userIntent?: Intent;
  lastAskedAbout?: string;
}

/**
 * Chat widget state interface
 */
export interface ChatWidgetState {
  isOpen: boolean;
  isLoading: boolean;
  hasUnreadMessages: boolean;
}

/**
 * Response generation options
 */
export interface ResponseOptions {
  useAI: boolean;
  maxTokens?: number;
  temperature?: number;
  includeContext: boolean;
}