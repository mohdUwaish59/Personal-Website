import { Intent, ConversationContext } from '../types';
import { KnowledgeBase } from './knowledge-base';
import { AIService } from './ai-service';
import { ConversationManager } from './conversation-manager';
import { CHATBOT_CONFIG } from '../config/chatbot.config';

/**
 * ResponseGenerator service for creating contextual responses using AI and structured data
 */
export class ResponseGenerator {
  private knowledgeBase: KnowledgeBase;
  private aiService: AIService;

  constructor(knowledgeBase: KnowledgeBase) {
    this.knowledgeBase = knowledgeBase;
    this.aiService = new AIService();
  }

  /**
   * Generate response based on user message and conversation context
   */
  async generateResponse(userMessage: string, context: ConversationContext): Promise<string> {
    const intent = this.extractIntent(userMessage);

    try {
      // Get contextual information for better responses
      const contextualInfo = ConversationManager.getContextualInfo(context);

      // Update context with current intent
      const updatedContext = {
        ...context,
        userIntent: intent,
        currentTopic: this.extractTopic(userMessage, intent),
        lastAskedAbout: intent !== 'greeting' && intent !== 'unknown' ? intent : context.lastAskedAbout
      };

      // Check if this is a context-aware follow-up
      const isContextAware = this.isContextAwareQuestion(userMessage, contextualInfo);

      // Try AI-powered response first if available
      if (this.aiService.isAIAvailable() && CHATBOT_CONFIG.features.enableAI) {
        try {
          const knowledgeBaseData = {
            personalInfo: this.knowledgeBase.getPersonalInfo(),
            skills: this.knowledgeBase.getSkills(),
            experience: this.knowledgeBase.getExperience(),
            projects: this.knowledgeBase.getProjects()
          };

          // Generate AI response
          const aiResponse = await this.aiService.generateResponse(
            userMessage,
            updatedContext,
            knowledgeBaseData,
            intent
          );

          return aiResponse;
        } catch (aiError) {
          console.warn('AI service failed, falling back to structured responses:', aiError);
          // Fall through to structured response generation
        }
      }

      // Fallback to structured responses with context awareness
      return this.generateStructuredResponse(userMessage, updatedContext, intent, contextualInfo);
    } catch (error) {
      console.error('Error generating response:', error);
      return this.generateErrorResponse();
    }
  }

  /**
   * Generate structured response using knowledge base (fallback method)
   */
  private generateStructuredResponse(userMessage: string, context: ConversationContext, intent: Intent, contextualInfo?: any): string {
    // Check for context-aware responses first
    if (contextualInfo && this.isContextAwareQuestion(userMessage, contextualInfo)) {
      return this.generateContextAwareResponse(userMessage, context, contextualInfo);
    }

    // Check for follow-up questions based on context
    if (this.isFollowUpQuestion(userMessage, context)) {
      return this.generateFollowUpResponse(userMessage, context);
    }

    switch (intent) {
      case 'greeting':
        return this.generateGreetingResponse();

      case 'skills':
        return this.generateSkillsResponse(userMessage);

      case 'experience':
        return this.generateExperienceResponse(userMessage);

      case 'projects':
        return this.generateProjectsResponse(userMessage);

      case 'education':
        return this.generateEducationResponse();

      case 'contact':
        return this.generateContactResponse();

      case 'personal':
        return this.generatePersonalResponse();

      case 'general':
        return this.generateGeneralResponse(userMessage);

      default:
        return this.generateUnknownResponse(userMessage);
    }
  }

  /**
   * Generate greeting response
   */
  private generateGreetingResponse(): string {
    const personalInfo = this.knowledgeBase.getPersonalInfo();
    const greetings = [
      `Hi there! I'm ${personalInfo.name}, ${personalInfo.title}. How can I help you today?`,
      `Hello! I'm ${personalInfo.name}. Feel free to ask me about my skills, experience, or projects!`,
      `Hey! Nice to meet you. I'm ${personalInfo.name}, and I'd love to tell you about my work in software development.`,
      `Hi! I'm ${personalInfo.name}. What would you like to know about my background or experience?`
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  /**
   * Generate skills-related response
   */
  private generateSkillsResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();

    // Check for specific technology mentions
    const skills = this.knowledgeBase.getSkills();
    const mentionedSkills = skills.filter(skill =>
      messageLower.includes(skill.name.toLowerCase())
    );

    if (mentionedSkills.length > 0) {
      const skill = mentionedSkills[0];
      return `Yes, I'm proficient in ${skill.name}! I have a ${skill.level}% proficiency level in this technology. ${skill.description ? skill.description : ''} Would you like to know about other skills in the ${skill.category} category?`;
    }

    // Check for category mentions
    if (messageLower.includes('frontend') || messageLower.includes('front-end')) {
      const frontendSkills = this.knowledgeBase.getSkills('frontend');
      const skillNames = frontendSkills.map(s => s.name).join(', ');
      return `I have strong frontend development skills! My main frontend technologies include: ${skillNames}. I particularly enjoy working with modern frameworks and creating responsive user interfaces.`;
    }

    if (messageLower.includes('backend') || messageLower.includes('back-end')) {
      const backendSkills = this.knowledgeBase.getSkills('backend');
      const skillNames = backendSkills.map(s => s.name).join(', ');
      return `I'm experienced in backend development with technologies like: ${skillNames}. I enjoy building scalable APIs and working with databases.`;
    }

    if (messageLower.includes('database')) {
      const dbSkills = this.knowledgeBase.getSkills('database');
      const skillNames = dbSkills.map(s => s.name).join(', ');
      return `I work with various database technologies including: ${skillNames}. I have experience with both SQL and NoSQL databases.`;
    }

    // General skills overview
    const topSkills = this.knowledgeBase.getTopSkills(8);
    const skillNames = topSkills.map(s => s.name).join(', ');
    const stats = this.knowledgeBase.getSummaryStats();

    return `I have expertise in ${stats.totalSkills} different technologies! My top skills include: ${skillNames}. I'm particularly strong in ${stats.skillCategories.join(', ')} development. What specific technology would you like to know more about?`;
  }

  /**
   * Generate experience-related response
   */
  private generateExperienceResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();
    const experiences = this.knowledgeBase.getExperience();

    // Check for specific company mentions
    const mentionedCompanies = experiences.filter(exp =>
      messageLower.includes(exp.company.toLowerCase())
    );

    if (mentionedCompanies.length > 0) {
      const exp = mentionedCompanies[0];
      return `Yes, I worked at ${exp.company} as ${exp.title} (${exp.period}). ${exp.description} Some key achievements include: ${exp.achievements.slice(0, 2).join(', ')}. I used technologies like ${exp.skills.slice(0, 4).join(', ')}.`;
    }

    // Check for current/recent work
    if (messageLower.includes('current') || messageLower.includes('recent') || messageLower.includes('now')) {
      const currentExp = this.knowledgeBase.getCurrentExperience();
      if (currentExp.length > 0) {
        const exp = currentExp[0];
        return `Currently, I'm working as ${exp.title} at ${exp.company}. ${exp.description} I'm focusing on ${exp.skills.slice(0, 3).join(', ')} and have achieved ${exp.achievements[0]}.`;
      }
    }

    // General experience overview
    const totalYears = this.calculateTotalExperience(experiences);
    const companies = experiences.map(exp => exp.company).join(', ');

    return `I have ${totalYears} years of professional experience in software development. I've worked at companies including ${companies}. My experience spans full-stack development, with a focus on modern web technologies and scalable applications. Would you like to know more about any specific role?`;
  }

  /**
   * Generate projects-related response
   */
  private generateProjectsResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();
    const projects = this.knowledgeBase.getProjects();

    // Check for specific technology mentions in projects
    const techKeywords = ['react', 'next', 'node', 'python', 'javascript', 'typescript', 'ai', 'ml'];
    const mentionedTech = techKeywords.find(tech => messageLower.includes(tech));

    if (mentionedTech) {
      const relatedProjects = this.knowledgeBase.getProjectsByTechnology(mentionedTech);
      if (relatedProjects.length > 0) {
        const project = relatedProjects[0];
        return `I've built several projects using ${mentionedTech}! One notable project is "${project.title}" - ${project.description}. ${project.highlights ? project.highlights[0] : ''} You can check it out${project.liveUrl ? ' live' : ''}${project.githubUrl ? ' on GitHub' : ''}.`;
      }
    }

    // Check for project categories
    if (messageLower.includes('web') || messageLower.includes('website')) {
      const webProjects = this.knowledgeBase.getProjectsByCategory('web');
      if (webProjects.length > 0) {
        const projectNames = webProjects.slice(0, 3).map(p => p.title).join(', ');
        return `I've developed several web applications including: ${projectNames}. These projects showcase my skills in modern web development, responsive design, and user experience. Which project would you like to know more about?`;
      }
    }

    // General projects overview
    const featuredProjects = projects.slice(0, 3);
    const projectList = featuredProjects.map(p => `"${p.title}"`).join(', ');

    return `I've worked on ${projects.length} projects that demonstrate my technical skills! Some highlights include: ${projectList}. These projects span web development, AI/ML, and full-stack applications. Each project taught me something new and helped me grow as a developer. What type of project interests you most?`;
  }

  /**
   * Generate education-related response
   */
  private generateEducationResponse(): string {
    const education = this.knowledgeBase.getEducation();

    return `I'm pursuing my ${education.degree} in ${education.specialization} at ${education.university}, ${education.location}. Currently ${education.status}. My studies have given me a strong foundation in computer science principles, algorithms, and software engineering practices.`;
  }

  /**
   * Generate contact-related response
   */
  private generateContactResponse(): string {
    const contact = this.knowledgeBase.getContactInfo();
    const personalInfo = this.knowledgeBase.getPersonalInfo();

    return `I'm ${personalInfo.availability} and would love to connect! You can reach me at ${contact.email}. I'm based in ${contact.location}. You can also find me on GitHub (${contact.socialLinks.github}) or LinkedIn (${contact.socialLinks.linkedin}). Feel free to reach out for collaboration opportunities or just to chat about technology!`;
  }

  /**
   * Generate personal info response
   */
  private generatePersonalResponse(): string {
    const personalInfo = this.knowledgeBase.getPersonalInfo();

    return `I'm ${personalInfo.name}, a ${personalInfo.title} based in ${personalInfo.location}. ${personalInfo.bio} I'm passionate about ${personalInfo.interests.slice(0, 3).join(', ')} and always excited to work on challenging projects that make a difference. What would you like to know more about?`;
  }

  /**
   * Generate general response using search
   */
  private generateGeneralResponse(userMessage: string): string {
    const searchResults = this.knowledgeBase.searchContent(userMessage);

    if (searchResults.length > 0) {
      const topResult = searchResults[0];

      switch (topResult.type) {
        case 'skill':
          return `I found information about ${topResult.data.name}! I have ${topResult.data.level}% proficiency in this ${topResult.data.category} technology. ${topResult.data.description || 'It\'s one of my key skills.'}`;

        case 'experience':
          return `That relates to my experience at ${topResult.data.company}! I worked as ${topResult.data.title} where ${topResult.data.description}`;

        case 'project':
          return `I have a project related to that: "${topResult.data.title}" - ${topResult.data.description}`;

        case 'personal':
          return `That's about me! ${this.knowledgeBase.getPersonalInfo().bio}`;

        default:
          return this.generateUnknownResponse(userMessage);
      }
    }

    return this.generateUnknownResponse(userMessage);
  }

  /**
   * Generate response for unknown intents
   */
  private generateUnknownResponse(userMessage: string): string {
    const suggestions = [
      "I'd be happy to tell you about my skills, experience, or projects!",
      "You can ask me about my technical expertise, work background, or recent projects.",
      "Feel free to ask about my programming skills, professional experience, or portfolio projects.",
      "I can share information about my education, technical skills, or career journey."
    ];

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    return `I'm not sure I understand that question completely, but ${suggestion} What would you like to know?`;
  }

  /**
   * Generate error response
   */
  private generateErrorResponse(): string {
    return "I'm sorry, I encountered an issue processing your message. Could you please try asking again? I'm here to help with questions about my skills, experience, and projects!";
  }

  /**
   * Calculate total years of experience
   */
  private calculateTotalExperience(experiences: any[]): string {
    // This is a simplified calculation - in a real implementation,
    // you'd parse the period strings and calculate actual years
    const totalRoles = experiences.length;
    const estimatedYears = Math.max(2, totalRoles * 1.5); // Rough estimate

    return estimatedYears.toString();
  }

  /**
   * Check if the current message is a follow-up question
   */
  private isFollowUpQuestion(userMessage: string, context: ConversationContext): boolean {
    const messageLower = userMessage.toLowerCase();

    // Check for follow-up indicators
    const followUpIndicators = [
      'tell me more', 'more about', 'what about', 'how about', 'and what',
      'also', 'additionally', 'furthermore', 'can you explain', 'elaborate',
      'details', 'specific', 'which one', 'what else'
    ];

    const hasFollowUpIndicator = followUpIndicators.some(indicator =>
      messageLower.includes(indicator)
    );

    // Check if there's recent context to follow up on
    const hasRecentContext = Boolean(context.lastAskedAbout && context.currentTopic);

    return hasFollowUpIndicator && hasRecentContext;
  }

  /**
   * Generate response for follow-up questions
   */
  private generateFollowUpResponse(userMessage: string, context: ConversationContext): string {
    const messageLower = userMessage.toLowerCase();
    const lastTopic = context.lastAskedAbout;
    const currentTopic = context.currentTopic;

    switch (lastTopic) {
      case 'skills':
        if (messageLower.includes('experience') || messageLower.includes('used')) {
          return this.generateSkillExperienceResponse(currentTopic);
        }
        if (messageLower.includes('project') || messageLower.includes('built')) {
          return this.generateSkillProjectResponse(currentTopic);
        }
        return this.generateExtendedSkillsResponse(currentTopic);

      case 'experience':
        if (messageLower.includes('skill') || messageLower.includes('technology')) {
          return this.generateExperienceSkillsResponse(currentTopic);
        }
        if (messageLower.includes('challenge') || messageLower.includes('difficult')) {
          return this.generateExperienceChallengesResponse();
        }
        return this.generateExtendedExperienceResponse(currentTopic);

      case 'projects':
        if (messageLower.includes('technology') || messageLower.includes('built')) {
          return this.generateProjectTechResponse(currentTopic);
        }
        if (messageLower.includes('challenge') || messageLower.includes('learn')) {
          return this.generateProjectLearningsResponse();
        }
        return this.generateExtendedProjectsResponse(currentTopic);

      default:
        return this.generateGeneralFollowUpResponse(userMessage);
    }
  }

  /**
   * Generate extended skills response based on context
   */
  private generateExtendedSkillsResponse(topic?: string): string {
    if (topic?.includes('react')) {
      return "I've been working with React for several years and have built multiple production applications. I'm particularly experienced with React Hooks, Context API, and modern patterns like custom hooks. I also work with Next.js for full-stack applications and have experience with state management libraries like Redux and Zustand.";
    }

    if (topic?.includes('backend')) {
      return "On the backend, I work primarily with Node.js and Express, but I'm also comfortable with Python frameworks like FastAPI. I have experience with both SQL databases (PostgreSQL, MySQL) and NoSQL (MongoDB). I'm familiar with microservices architecture and have worked with Docker for containerization.";
    }

    return "I'm always learning new technologies and staying up-to-date with industry trends. I particularly enjoy working with modern JavaScript/TypeScript, cloud technologies, and exploring AI/ML integration in web applications. What specific area would you like to know more about?";
  }

  /**
   * Generate skill experience response
   */
  private generateSkillExperienceResponse(topic?: string): string {
    return "I've gained most of my experience through hands-on projects and professional work. I believe in learning by building real applications and solving actual problems. Each project has taught me something new and helped me deepen my understanding of the technologies I use.";
  }

  /**
   * Generate skill project response
   */
  private generateSkillProjectResponse(topic?: string): string {
    const projects = this.knowledgeBase.getProjects();
    if (projects.length > 0) {
      const project = projects[0];
      return `I've used these skills in projects like "${project.title}" where I ${project.description}. This project really helped me understand how to apply these technologies in real-world scenarios.`;
    }
    return "I've applied these skills in various projects, from web applications to AI-powered tools. Each project has been a learning opportunity to deepen my technical expertise.";
  }

  /**
   * Generate extended experience response
   */
  private generateExtendedExperienceResponse(topic?: string): string {
    if (topic?.includes('current')) {
      return "In my current role, I focus on building scalable web applications and working with modern development practices. I enjoy collaborating with teams and contributing to the full development lifecycle from planning to deployment.";
    }

    return "Throughout my career, I've focused on continuous learning and taking on challenging projects. I believe in writing clean, maintainable code and following best practices. I also enjoy mentoring others and sharing knowledge with the development community.";
  }

  /**
   * Generate experience skills response
   */
  private generateExperienceSkillsResponse(topic?: string): string {
    return "In my professional experience, I've primarily worked with modern web technologies like React, Node.js, and TypeScript. I've also gained experience with cloud platforms, databases, and DevOps practices. Each role has expanded my technical toolkit and problem-solving abilities.";
  }

  /**
   * Generate experience challenges response
   */
  private generateExperienceChallengesResponse(): string {
    return "Some of the most rewarding challenges I've faced include optimizing application performance, implementing complex user interfaces, and integrating multiple systems. I enjoy tackling problems that require both technical skills and creative thinking. These experiences have made me a more well-rounded developer.";
  }

  /**
   * Generate extended projects response
   */
  private generateExtendedProjectsResponse(topic?: string): string {
    if (topic?.includes('web')) {
      return "My web projects focus on creating responsive, user-friendly applications with modern technologies. I pay attention to both functionality and user experience, ensuring the applications are not only technically sound but also enjoyable to use.";
    }

    if (topic?.includes('ai')) {
      return "My AI/ML projects explore the intersection of traditional web development and artificial intelligence. I'm particularly interested in how AI can enhance user experiences and solve real-world problems through web applications.";
    }

    return "Each project I work on teaches me something new and helps me grow as a developer. I choose projects that challenge me and allow me to explore new technologies or solve interesting problems.";
  }

  /**
   * Generate project tech response
   */
  private generateProjectTechResponse(topic?: string): string {
    return "I choose technologies based on the project requirements and goals. I like to balance using proven, reliable technologies with exploring newer tools that can add value. This approach helps me deliver solid results while continuing to learn and grow.";
  }

  /**
   * Generate project learnings response
   */
  private generateProjectLearningsResponse(): string {
    return "Every project teaches me something new, whether it's a technical skill, a better way to solve problems, or insights about user needs. I particularly value projects that push me out of my comfort zone and require me to learn new technologies or approaches.";
  }

  /**
   * Generate general follow-up response
   */
  private generateGeneralFollowUpResponse(userMessage: string): string {
    return "I'd be happy to elaborate! Could you be more specific about what aspect you'd like to know more about? I can share more details about my technical skills, project experiences, or career journey.";
  }

  /**
   * Extract intent from user message
   */
  private extractIntent(message: string): Intent {
    const messageLower = message.toLowerCase();

    // Greeting patterns (most specific first)
    if (/^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)/i.test(messageLower)) {
      return 'greeting';
    }

    // Personal info patterns (very specific to avoid false matches)
    if (/(tell me about yourself|who are you|your background|your bio|about you\b|yourself)/i.test(messageLower)) {
      return 'personal';
    }

    // Skills-related patterns
    if (/(skill|technology|tech|programming|language|framework|tool|expertise|proficient|know)/i.test(messageLower)) {
      return 'skills';
    }

    // Experience-related patterns
    if (/(experience|work|job|career|position|role|company|employer|worked)/i.test(messageLower)) {
      return 'experience';
    }

    // Project-related patterns (be more specific to avoid matching "problem")
    if (/(project|portfolio|built|created|developed|app|application|website|github)/i.test(messageLower)) {
      return 'projects';
    }

    // Education-related patterns
    if (/(education|degree|university|college|study|studied|graduate|qualification)/i.test(messageLower)) {
      return 'education';
    }

    // Contact-related patterns
    if (/(contact|email|phone|reach|hire|available|availability|location|where)/i.test(messageLower)) {
      return 'contact';
    }

    // General questions (catch-all for questions)
    if (/\?/.test(message) || /(what|how|when|where|why|can you|do you|are you)/i.test(messageLower)) {
      return 'general';
    }

    return 'unknown';
  }

  /**
   * Extract topic from user message for better context tracking
   */
  private extractTopic(message: string, intent: Intent): string | undefined {
    const messageLower = message.toLowerCase();

    switch (intent) {
      case 'skills':
        // Try to extract specific technology mentioned
        const techKeywords = ['react', 'node', 'javascript', 'typescript', 'python', 'java', 'css', 'html', 'sql', 'next', 'express', 'mongodb', 'postgresql'];
        const mentionedTech = techKeywords.find(tech => messageLower.includes(tech));
        return mentionedTech ? `skills-${mentionedTech}` : 'skills-general';

      case 'experience':
        // Try to extract company or role mentioned
        if (messageLower.includes('current') || messageLower.includes('recent')) {
          return 'experience-current';
        }
        return 'experience-general';

      case 'projects':
        // Try to extract project type
        if (messageLower.includes('web')) return 'projects-web';
        if (messageLower.includes('ai') || messageLower.includes('ml')) return 'projects-ai';
        return 'projects-general';

      case 'education':
        return 'education';

      case 'contact':
        return 'contact';

      case 'personal':
        return 'personal';

      default:
        return undefined;
    }
  }

  /**
   * Get AI service status
   */
  getAIStatus(): { available: boolean; model: string; provider: string } {
    return this.aiService.getStatus();
  }

  /**
   * Test AI service connection
   */
  async testAIConnection(): Promise<boolean> {
    return this.aiService.testConnection();
  }

  /**
   * Check if the question is context-aware (references previous conversation)
   */
  private isContextAwareQuestion(userMessage: string, contextualInfo: any): boolean {
    const messageLower = userMessage.toLowerCase();

    // Check for reference words that indicate context awareness
    const contextReferences = [
      'that', 'those', 'it', 'them', 'this', 'these',
      'you mentioned', 'you said', 'earlier', 'before',
      'the one', 'which one', 'what about that',
      'more about', 'tell me more'
    ];

    const hasContextReference = contextReferences.some(ref => messageLower.includes(ref));

    // Check if there are recent topics to reference
    const hasRecentTopics = contextualInfo.recentTopics && contextualInfo.recentTopics.length > 0;

    // Check if conversation flow indicates follow-up
    const isFollowUpFlow = contextualInfo.conversationFlow === 'follow-up';

    return hasContextReference && (hasRecentTopics || isFollowUpFlow);
  }

  /**
   * Generate context-aware response that references previous conversation
   */
  private generateContextAwareResponse(userMessage: string, context: ConversationContext, contextualInfo: any): string {
    const messageLower = userMessage.toLowerCase();
    const recentTopics = contextualInfo.recentTopics || [];
    const mentionedItems = contextualInfo.mentionedItems || [];
    const lastUserQuestion = contextualInfo.lastUserQuestion;

    // Handle references to previously mentioned skills
    if (recentTopics.includes('skills') && mentionedItems.length > 0) {
      if (messageLower.includes('that') || messageLower.includes('it')) {
        const lastMentioned = mentionedItems[mentionedItems.length - 1];
        return this.generateSkillContextResponse(lastMentioned, userMessage);
      }
    }

    // Handle references to experience discussion
    if (recentTopics.includes('experience')) {
      if (messageLower.includes('that role') || messageLower.includes('that job')) {
        return this.generateExperienceContextResponse(userMessage);
      }
    }

    // Handle references to projects
    if (recentTopics.includes('projects')) {
      if (messageLower.includes('that project') || messageLower.includes('it')) {
        return this.generateProjectContextResponse(userMessage);
      }
    }

    // Handle general "tell me more" requests
    if (messageLower.includes('tell me more') || messageLower.includes('more about')) {
      return this.generateMoreInfoResponse(recentTopics, lastUserQuestion);
    }

    // Handle "what about" questions
    if (messageLower.includes('what about') || messageLower.includes('how about')) {
      return this.generateWhatAboutResponse(userMessage, recentTopics);
    }

    // Fallback to regular response generation
    return this.generateGeneralResponse(userMessage);
  }

  /**
   * Generate skill context response
   */
  private generateSkillContextResponse(skillName: string, userMessage: string): string {
    const skills = this.knowledgeBase.getSkills();
    const skill = skills.find(s => s.name.toLowerCase().includes(skillName.toLowerCase()));

    if (skill) {
      const messageLower = userMessage.toLowerCase();

      if (messageLower.includes('experience') || messageLower.includes('used')) {
        return `I've been using ${skill.name} extensively in my projects and professional work. With ${skill.level}% proficiency, I've applied it in various contexts from building user interfaces to developing full-stack applications. It's become one of my go-to technologies for ${skill.category} development.`;
      }

      if (messageLower.includes('project') || messageLower.includes('built')) {
        const relatedProjects = this.knowledgeBase.getProjectsByTechnology(skillName);
        if (relatedProjects.length > 0) {
          const project = relatedProjects[0];
          return `Yes! I used ${skill.name} in "${project.title}" where ${project.description}. It was perfect for this project because of its ${skill.category} capabilities.`;
        }
        return `I've used ${skill.name} in several projects. It's particularly useful for ${skill.category} development and has helped me build robust, scalable applications.`;
      }

      return `${skill.name} is definitely one of my stronger skills! I have ${skill.level}% proficiency and really enjoy working with it. ${skill.description || 'It\'s a versatile technology that I use regularly.'}`;
    }

    return `I'd be happy to tell you more about that technology! What specific aspect would you like to know about?`;
  }

  /**
   * Generate experience context response
   */
  private generateExperienceContextResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();
    const experiences = this.knowledgeBase.getExperience();

    if (experiences.length > 0) {
      const recentExp = experiences[0]; // Assuming first is most recent

      if (messageLower.includes('challenge') || messageLower.includes('difficult')) {
        return `One of the biggest challenges in that role was ${recentExp.achievements[0] || 'implementing complex features while maintaining code quality'}. It really pushed me to grow both technically and professionally, and I learned a lot about problem-solving and collaboration.`;
      }

      if (messageLower.includes('skill') || messageLower.includes('learn')) {
        return `In that position, I primarily worked with ${recentExp.skills.slice(0, 4).join(', ')}. It was a great opportunity to deepen my expertise in these technologies and learn how to apply them in a production environment.`;
      }

      return `That role was really formative for me. ${recentExp.description} I particularly enjoyed ${recentExp.achievements[0] || 'working on challenging technical problems'} and collaborating with a talented team.`;
    }

    return `I'd be happy to share more details about my work experience! What specific aspect interests you most?`;
  }

  /**
   * Generate project context response
   */
  private generateProjectContextResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();
    const projects = this.knowledgeBase.getProjects();

    if (projects.length > 0) {
      const project = projects[0]; // Most recent or featured project

      if (messageLower.includes('technology') || messageLower.includes('built') || messageLower.includes('how')) {
        return `I built that project using ${project.tags.slice(0, 4).join(', ')}. ${project.highlights ? project.highlights[0] : 'It was a great learning experience and really helped me understand how to integrate different technologies effectively.'}`;
      }

      if (messageLower.includes('challenge') || messageLower.includes('difficult')) {
        return `The most challenging part of that project was probably ${project.highlights ? project.highlights[1] || 'integrating all the different components' : 'ensuring everything worked smoothly together'}. But overcoming those challenges taught me a lot about software architecture and problem-solving.`;
      }

      return `That project was really exciting to work on! ${project.description} ${project.highlights ? project.highlights[0] : 'It showcased several of my key skills and was a great portfolio piece.'}`;
    }

    return `I'd love to tell you more about my projects! Which aspect would you like to know more about?`;
  }

  /**
   * Generate "more info" response based on recent topics
   */
  private generateMoreInfoResponse(recentTopics: string[], lastUserQuestion: string | null): string {
    if (recentTopics.includes('skills')) {
      return `I'd be happy to elaborate on my technical skills! I'm particularly passionate about modern web development and enjoy staying up-to-date with the latest technologies. I believe in continuous learning and regularly work on personal projects to explore new tools and frameworks. What specific area would you like me to dive deeper into?`;
    }

    if (recentTopics.includes('experience')) {
      return `My professional journey has been focused on building scalable web applications and working with cross-functional teams. I've learned that good software development is not just about writing code, but also about understanding user needs, collaborating effectively, and maintaining high-quality standards. I'm always looking for opportunities to take on new challenges and grow as a developer.`;
    }

    if (recentTopics.includes('projects')) {
      return `Each project I work on teaches me something new and helps me grow as a developer. I try to choose projects that challenge me technically while also solving real problems. I particularly enjoy projects that let me explore the intersection of different technologies or apply new concepts I've been learning. Would you like to know about the technical details or the problem-solving approach?`;
    }

    return `I'd be happy to provide more details! Could you be more specific about what aspect you'd like me to elaborate on? I can share more about my technical background, project experiences, or career journey.`;
  }

  /**
   * Generate "what about" response
   */
  private generateWhatAboutResponse(userMessage: string, recentTopics: string[]): string {
    const messageLower = userMessage.toLowerCase();

    // Try to extract what they're asking about
    if (messageLower.includes('backend') && recentTopics.includes('skills')) {
      return this.generateSkillsResponse('backend development');
    }

    if (messageLower.includes('frontend') && recentTopics.includes('skills')) {
      return this.generateSkillsResponse('frontend development');
    }

    if (messageLower.includes('other projects') || (messageLower.includes('project') && recentTopics.includes('projects'))) {
      const projects = this.knowledgeBase.getProjects();
      if (projects.length > 1) {
        const otherProject = projects[1];
        return `Another project I'm proud of is "${otherProject.title}" - ${otherProject.description}. This one showcased different skills and technologies: ${otherProject.tags.slice(0, 3).join(', ')}.`;
      }
    }

    return `That's a great question! Could you be more specific about what aspect you'd like to know about? I'm happy to discuss any part of my background or experience in more detail.`;
  }
}