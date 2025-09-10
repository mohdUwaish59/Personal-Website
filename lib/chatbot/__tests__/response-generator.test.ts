import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResponseGenerator } from '../services/response-generator';
import { KnowledgeBase } from '../services/knowledge-base';
import { AIService } from '../services/ai-service';
import { ConversationContext } from '../types';

// Mock the KnowledgeBase and AIService
vi.mock('../services/knowledge-base');
vi.mock('../services/ai-service');

describe('ResponseGenerator', () => {
  let responseGenerator: ResponseGenerator;
  let mockKnowledgeBase: vi.Mocked<KnowledgeBase>;
  let mockAIService: vi.Mocked<AIService>;

  beforeEach(() => {
    mockKnowledgeBase = new KnowledgeBase() as vi.Mocked<KnowledgeBase>;
    
    // Mock AI service to be unavailable so tests use structured responses
    vi.mocked(AIService).mockImplementation(() => ({
      isAIAvailable: vi.fn().mockReturnValue(false),
      generateResponse: vi.fn().mockResolvedValue('AI response'),
      getStatus: vi.fn().mockReturnValue({ available: false, model: 'gpt-3.5-turbo', provider: 'openai' }),
      testConnection: vi.fn().mockResolvedValue(false)
    } as any));
    
    responseGenerator = new ResponseGenerator(mockKnowledgeBase);

    // Setup default mock responses
    mockKnowledgeBase.getPersonalInfo.mockReturnValue({
      name: 'Mohd Uwaish',
      title: 'Software Developer',
      email: 'test@example.com',
      location: 'Test City',
      availability: 'Available for opportunities',
      bio: 'Passionate software developer',
      interests: ['coding', 'AI', 'web development'],
      education: {
        degree: 'Bachelor of Technology',
        specialization: 'Computer Science',
        university: 'Test University',
        location: 'Test City',
        status: 'Currently pursuing'
      },
      socialLinks: {
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
        email: 'test@example.com'
      }
    });

    mockKnowledgeBase.getSkills.mockReturnValue([
      { name: 'React', category: 'frontend', level: 90, description: 'Frontend framework' },
      { name: 'Node.js', category: 'backend', level: 85, description: 'Backend runtime' }
    ]);

    mockKnowledgeBase.getTopSkills.mockReturnValue([
      { name: 'React', category: 'frontend', level: 90 },
      { name: 'Node.js', category: 'backend', level: 85 }
    ]);

    mockKnowledgeBase.getSummaryStats.mockReturnValue({
      totalSkills: 10,
      totalExperience: 3,
      totalProjects: 5,
      skillCategories: ['frontend', 'backend'],
      averageSkillLevel: 85,
      topSkillCategories: { frontend: 5, backend: 3 }
    });

    mockKnowledgeBase.getEducation.mockReturnValue({
      degree: 'Bachelor of Technology',
      specialization: 'Computer Science',
      university: 'Test University',
      location: 'Test City',
      status: 'Currently pursuing'
    });
  });

  describe('generateResponse', () => {
    it('should generate greeting response', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'greeting'
      };

      const response = await responseGenerator.generateResponse('Hello', context);

      expect(response).toContain('Mohd Uwaish');
      expect(response.length).toBeGreaterThan(10);
    });

    it('should generate skills response', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'skills'
      };

      const response = await responseGenerator.generateResponse('What are your skills?', context);

      expect(response).toBeTruthy();
      expect(mockKnowledgeBase.getTopSkills).toHaveBeenCalled();
    });

    it('should generate experience response', async () => {
      mockKnowledgeBase.getExperience.mockReturnValue([
        {
          id: 1,
          title: 'Software Developer',
          company: 'Test Company',
          location: 'Test City',
          period: '2023 - Present',
          description: 'Working on web applications',
          achievements: ['Built scalable apps'],
          skills: ['React', 'Node.js']
        }
      ]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'experience'
      };

      const response = await responseGenerator.generateResponse('Tell me about your experience', context);

      expect(response).toBeTruthy();
      expect(mockKnowledgeBase.getExperience).toHaveBeenCalled();
    });

    it('should generate projects response', async () => {
      mockKnowledgeBase.getProjects.mockReturnValue([
        {
          id: 1,
          title: 'Test Project',
          description: 'A test project',
          tags: ['React', 'Node.js'],
          liveUrl: 'https://test.com',
          githubUrl: 'https://github.com/test/project'
        }
      ]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'projects'
      };

      const response = await responseGenerator.generateResponse('Show me your projects', context);

      expect(response).toBeTruthy();
      expect(mockKnowledgeBase.getProjects).toHaveBeenCalled();
    });

    it('should generate education response', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'education'
      };

      const response = await responseGenerator.generateResponse('What is your education?', context);

      expect(response).toContain('Bachelor of Technology');
      expect(response).toContain('Computer Science');
      expect(mockKnowledgeBase.getEducation).toHaveBeenCalled();
    });

    it('should generate contact response', async () => {
      mockKnowledgeBase.getContactInfo.mockReturnValue({
        name: 'Mohd Uwaish',
        email: 'test@example.com',
        location: 'Test City',
        socialLinks: {
          github: 'https://github.com/test',
          linkedin: 'https://linkedin.com/in/test',
          email: 'test@example.com'
        }
      });

      const context: ConversationContext = {
        messages: [],
        userIntent: 'contact'
      };

      const response = await responseGenerator.generateResponse('How can I contact you?', context);

      expect(response).toContain('test@example.com');
      expect(mockKnowledgeBase.getContactInfo).toHaveBeenCalled();
    });

    it('should generate personal response', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'personal'
      };

      const response = await responseGenerator.generateResponse('Tell me about yourself', context);

      expect(response).toContain('Mohd Uwaish');
      expect(response).toContain('Software Developer');
    });

    it('should handle unknown intent', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'unknown'
      };

      const response = await responseGenerator.generateResponse('random message', context);

      expect(response).toContain('not sure I understand');
    });

    it('should handle errors gracefully', async () => {
      mockKnowledgeBase.getPersonalInfo.mockImplementation(() => {
        throw new Error('Test error');
      });

      const context: ConversationContext = {
        messages: [],
        userIntent: 'greeting'
      };

      const response = await responseGenerator.generateResponse('Hello', context);

      expect(response).toContain('encountered an issue');
    });
  });

  describe('specific skill queries', () => {
    it('should respond to specific technology mentions', async () => {
      mockKnowledgeBase.getSkills.mockReturnValue([
        { name: 'React', category: 'frontend', level: 90, description: 'Frontend framework' }
      ]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'skills'
      };

      const response = await responseGenerator.generateResponse('Do you know React?', context);

      expect(response).toContain('React');
      expect(response).toContain('90%');
    });

    it('should respond to frontend skill queries', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'skills'
      };

      const response = await responseGenerator.generateResponse('What frontend skills do you have?', context);

      expect(response).toContain('frontend');
      expect(mockKnowledgeBase.getSkills).toHaveBeenCalledWith('frontend');
    });

    it('should respond to backend skill queries', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'skills'
      };

      const response = await responseGenerator.generateResponse('Tell me about your backend skills', context);

      expect(response).toContain('backend');
      expect(mockKnowledgeBase.getSkills).toHaveBeenCalledWith('backend');
    });
  });

  describe('search functionality', () => {
    it('should use search for general queries', async () => {
      mockKnowledgeBase.searchContent.mockReturnValue([
        {
          type: 'skill',
          data: { name: 'React', level: 90, category: 'frontend' },
          relevanceScore: 5,
          matchedFields: ['name']
        }
      ]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'general'
      };

      // Use a truly general query that won't be classified as skills
      const response = await responseGenerator.generateResponse('What do you think about software development?', context);

      expect(response).toBeTruthy();
      expect(mockKnowledgeBase.searchContent).toHaveBeenCalledWith('What do you think about software development?');
    });

    it('should handle empty search results', async () => {
      mockKnowledgeBase.searchContent.mockReturnValue([]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'general'
      };

      const response = await responseGenerator.generateResponse('xyz random text', context);

      // With empty search results, it should fall back to unknown response
      expect(response).toContain('not sure I understand');
    });
  });

  describe('follow-up questions', () => {
    it('should generate follow-up responses when context exists', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'general',
        lastAskedAbout: 'skills' as any,
        currentTopic: 'skills-react'
      };

      const response = await responseGenerator.generateResponse('Tell me more about that', context);
      expect(response).toBeTruthy();
      expect(response.length).toBeGreaterThan(50);
    });

    it('should generate follow-up response for skills', async () => {
      const context: ConversationContext = {
        messages: [],
        userIntent: 'general',
        lastAskedAbout: 'skills',
        currentTopic: 'skills-react'
      };

      const response = await responseGenerator.generateResponse('Tell me more about React', context);
      
      expect(response).toBeTruthy();
      expect(response.length).toBeGreaterThan(50);
    });

    it('should generate follow-up response for experience', async () => {
      // Mock search to return experience-related results
      mockKnowledgeBase.searchContent.mockReturnValue([
        {
          type: 'experience',
          data: { company: 'Test Company', description: 'Worked on challenging projects' },
          relevanceScore: 0.8,
          matchedFields: ['description']
        }
      ]);

      const context: ConversationContext = {
        messages: [],
        userIntent: 'general',
        lastAskedAbout: 'experience',
        currentTopic: 'experience-current'
      };

      const response = await responseGenerator.generateResponse('What about the challenges?', context);
      
      expect(response).toBeTruthy();
      expect(response).toContain('Test Company');
    });

    it('should generate follow-up response for projects', async () => {
      // Mock searchContent to avoid the error
      mockKnowledgeBase.searchContent.mockReturnValue([]);
      
      const context: ConversationContext = {
        messages: [],
        userIntent: 'general',
        lastAskedAbout: 'projects',
        currentTopic: 'projects-web'
      };

      const response = await responseGenerator.generateResponse('What technologies did you use?', context);
      
      expect(response).toBeTruthy();
      expect(response.length).toBeGreaterThan(30);
    });
  });
});