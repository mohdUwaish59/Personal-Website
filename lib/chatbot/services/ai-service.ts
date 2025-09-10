import OpenAI from 'openai';
import { ConversationContext, Intent, KnowledgeBaseData } from '../types';
import { CHATBOT_CONFIG, FALLBACK_RESPONSES } from '../config/chatbot.config';

/**
 * AI Service for handling OpenAI API integration
 */
export class AIService {
  private openai: OpenAI | null = null;
  private isAvailable: boolean = false;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (apiKey && CHATBOT_CONFIG.features.enableAI) {
      this.openai = new OpenAI({
        apiKey: apiKey
      });
      this.isAvailable = true;
    } else {
      console.warn('OpenAI API key not found. AI features will be disabled.');
      this.isAvailable = false;
    }
  }

  /**
   * Generate AI response using OpenAI API
   */
  async generateResponse(
    userMessage: string,
    context: ConversationContext,
    knowledgeBase: KnowledgeBaseData,
    intent: Intent
  ): Promise<string> {
    if (!this.isAvailable) {
      return this.getFallbackResponse(intent);
    }

    try {
      const systemPrompt = this.buildSystemPrompt(knowledgeBase, intent);
      const conversationHistory = this.buildConversationHistory(context);
      
      const response = await this.callOpenAI(systemPrompt, conversationHistory, userMessage);
      
      if (!response || response.trim().length === 0) {
        throw new Error('Empty response from AI service');
      }
      
      return response;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (CHATBOT_CONFIG.ai.enableFallback) {
        return this.getFallbackResponse(intent);
      }
      
      throw error;
    }
  }

  /**
   * Call OpenAI API with proper error handling
   */
  private async callOpenAI(
    systemPrompt: string,
    conversationHistory: string,
    userMessage: string
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt
      }
    ];

    // Add conversation history if available
    if (conversationHistory.trim()) {
      messages.push({
        role: 'user',
        content: conversationHistory
      });
    }

    // Add current user message
    messages.push({
      role: 'user',
      content: userMessage
    });

    try {
      const completion = await this.openai.chat.completions.create({
        model: CHATBOT_CONFIG.ai.model,
        messages,
        max_tokens: CHATBOT_CONFIG.ai.maxTokens,
        temperature: CHATBOT_CONFIG.ai.temperature,
        stream: false
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response content from OpenAI API');
      }

      return response.trim();
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) {
          throw new Error('Invalid OpenAI API key');
        } else if (error.status === 429) {
          throw new Error('OpenAI API rate limit exceeded');
        } else if (error.status && error.status >= 500) {
          throw new Error('OpenAI API server error');
        } else {
          throw new Error(`OpenAI API error: ${error.message}`);
        }
      }
      throw error;
    }
  }

  /**
   * Build system prompt based on knowledge base and intent
   */
  private buildSystemPrompt(knowledgeBase: KnowledgeBaseData, intent: Intent): string {
    const { personalInfo, skills, experience, projects } = knowledgeBase;
    
    const basePrompt = `You are Mohd Uwaish's AI assistant representing him on his portfolio website. You should respond as if you ARE Mohd Uwaish, using first person ("I", "my", "me").

PERSONALITY & TONE:
- Be friendly, professional, and enthusiastic about technology
- Show passion for software development and learning
- Be conversational but informative
- Keep responses concise but helpful (2-4 sentences typically)
- Use a confident but humble tone

PERSONAL INFORMATION:
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Bio: ${personalInfo.bio}
Availability: ${personalInfo.availability}
Interests: ${personalInfo.interests.join(', ')}

EDUCATION:
${personalInfo.education.degree} in ${personalInfo.education.specialization}
${personalInfo.education.university}, ${personalInfo.education.location}
Status: ${personalInfo.education.status}

CONTACT:
Email: ${personalInfo.email}
GitHub: ${personalInfo.socialLinks.github}
LinkedIn: ${personalInfo.socialLinks.linkedin}`;

    // Add intent-specific context
    switch (intent) {
      case 'skills':
        const skillsByCategory = this.groupSkillsByCategory(skills);
        return `${basePrompt}

SKILLS (respond about these when asked about technical skills):
${Object.entries(skillsByCategory).map(([category, categorySkills]) => 
  `${category.toUpperCase()}: ${categorySkills.map(s => `${s.name} (${s.level}%)`).join(', ')}`
).join('\n')}

Focus on discussing specific technologies, proficiency levels, and how you use them in projects.`;

      case 'experience':
        return `${basePrompt}

WORK EXPERIENCE:
${experience.map(exp => 
  `${exp.title} at ${exp.company} (${exp.period})
  - ${exp.description}
  - Key achievements: ${exp.achievements.slice(0, 2).join(', ')}
  - Technologies: ${exp.skills.join(', ')}`
).join('\n\n')}

Focus on specific roles, responsibilities, achievements, and technologies used.`;

      case 'projects':
        return `${basePrompt}

PROJECTS:
${projects.map(project => 
  `${project.title}: ${project.description}
  - Technologies: ${project.tags.join(', ')}
  ${project.highlights ? `- Highlights: ${project.highlights.join(', ')}` : ''}
  ${project.liveUrl ? `- Live: ${project.liveUrl}` : ''}
  ${project.githubUrl ? `- GitHub: ${project.githubUrl}` : ''}`
).join('\n\n')}

Focus on project details, technologies used, challenges solved, and outcomes.`;

      case 'education':
        return `${basePrompt}

Focus on educational background, relevant coursework, and how it relates to software development.`;

      case 'contact':
        return `${basePrompt}

Focus on availability, preferred contact methods, and collaboration opportunities.`;

      case 'personal':
        return `${basePrompt}

Focus on background, interests, career journey, and what drives you as a developer.`;

      default:
        return `${basePrompt}

Provide helpful information based on the user's question, drawing from skills, experience, projects, or personal background as relevant.`;
    }
  }

  /**
   * Build conversation history for context
   */
  private buildConversationHistory(context: ConversationContext): string {
    if (!context.messages || context.messages.length === 0) {
      return '';
    }

    // Get last few messages for context (limit to prevent token overflow)
    const recentMessages = context.messages.slice(-6);
    
    return recentMessages
      .filter(msg => msg.type !== 'typing')
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  /**
   * Group skills by category for better organization
   */
  private groupSkillsByCategory(skills: any[]): Record<string, any[]> {
    return skills.reduce((acc, skill) => {
      const category = skill.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }

  /**
   * Get fallback response when AI is unavailable
   */
  private getFallbackResponse(intent: Intent): string {
    switch (intent) {
      case 'greeting':
        return FALLBACK_RESPONSES.greeting;
      case 'skills':
        return FALLBACK_RESPONSES.skills;
      case 'experience':
        return FALLBACK_RESPONSES.experience;
      case 'projects':
        return FALLBACK_RESPONSES.projects;
      case 'contact':
        return FALLBACK_RESPONSES.contact;
      default:
        return FALLBACK_RESPONSES.unknown;
    }
  }

  /**
   * Check if AI service is available
   */
  isAIAvailable(): boolean {
    return this.isAvailable;
  }

  /**
   * Test AI service connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.isAvailable || !this.openai) {
      return false;
    }

    try {
      await this.openai.models.list();
      return true;
    } catch (error) {
      console.error('AI Service connection test failed:', error);
      return false;
    }
  }

  /**
   * Get AI service status
   */
  getStatus(): { available: boolean; model: string; provider: string } {
    return {
      available: this.isAvailable,
      model: CHATBOT_CONFIG.ai.model,
      provider: CHATBOT_CONFIG.ai.provider
    };
  }
}