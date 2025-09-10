/**
 * Message interface for chat conversations
 */
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'typing';
}

/**
 * Intent types for message classification
 */
export type Intent = 
  | 'greeting'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'contact'
  | 'personal'
  | 'unknown';

/**
 * Search result interface for knowledge base queries
 */
export interface SearchResult {
  type: 'skill' | 'experience' | 'project' | 'education' | 'personal';
  content: any;
  relevance: number;
}