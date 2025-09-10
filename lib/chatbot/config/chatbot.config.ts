/**
 * Chatbot configuration settings
 */
export const CHATBOT_CONFIG = {
  // UI Configuration
  ui: {
    position: 'bottom-right' as const,
    theme: 'auto' as const,
    animations: true,
    showTimestamps: true,
    maxMessagesDisplay: 50,
  },

  // AI Configuration
  ai: {
    provider: 'openai' as const,
    model: 'gpt-3.5-turbo',
    maxTokens: 500,
    temperature: 0.7,
    enableFallback: true,
  },

  // Conversation Configuration
  conversation: {
    maxContextLength: 10,
    enablePersistence: true,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    enableTypingIndicator: true,
  },

  // Security Configuration
  security: {
    maxMessageLength: 1000,
    rateLimitPerMinute: 20,
    enableInputSanitization: true,
    allowedDomains: [], // Empty means all domains allowed
  },

  // Feature Flags
  features: {
    enableAI: true,
    enableSearch: true,
    enableAnalytics: false,
    enableFeedback: true,
  },
} as const;

/**
 * Default welcome message
 */
export const WELCOME_MESSAGE = "Hi! I'm Mohd Uwaish's AI assistant. I can help you learn about his background, skills, experience, and projects. What would you like to know?";

/**
 * Fallback responses when AI is unavailable
 */
export const FALLBACK_RESPONSES = {
  greeting: "Hello! I'm here to help you learn about Mohd Uwaish. Feel free to ask about his skills, experience, or projects!",
  skills: "Mohd Uwaish has expertise in various technologies. You can find detailed information about his skills in the portfolio.",
  experience: "You can learn about Mohd Uwaish's work experience and achievements throughout his career.",
  projects: "Mohd Uwaish has worked on several interesting projects. Check out the projects section for more details.",
  contact: "You can reach out to Mohd Uwaish through the contact information provided in the portfolio.",
  unknown: "I'm not sure I understand. Could you please rephrase your question or ask about his skills, experience, or projects?",
} as const;