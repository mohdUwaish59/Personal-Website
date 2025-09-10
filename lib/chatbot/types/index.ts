// Core message interface for chat functionality
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date | string; // Can be Date object or ISO string from API
  type?: 'text' | 'typing';
}

// Personal information interface
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  bio: string;
  interests: string[];
  education: {
    degree: string;
    specialization: string;
    university: string;
    location: string;
    status: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

// Skill interface with categories and proficiency levels
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'rag' | 'other';
  level: number; // 1-100
  description?: string;
}

// Work experience interface
export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

// Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  category?: string;
  technologies?: string[];
  highlights?: string[];
}

// Conversation context for maintaining chat state
export interface ConversationContext {
  messages: Message[];
  currentTopic?: string;
  userIntent?: Intent;
  lastAskedAbout?: string;
}

// Intent recognition for user queries
export type Intent = 
  | 'greeting'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'contact'
  | 'personal'
  | 'general'
  | 'unknown';

// Search result interface for knowledge base queries
export interface SearchResult {
  type: 'personal' | 'skill' | 'experience' | 'project';
  data: any;
  relevanceScore: number;
  matchedFields: string[];
}

// Knowledge base interface
export interface KnowledgeBaseData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}