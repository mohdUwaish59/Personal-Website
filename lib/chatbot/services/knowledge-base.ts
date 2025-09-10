import { 
  PersonalInfo, 
  Skill, 
  Experience, 
  Project, 
  SearchResult, 
  KnowledgeBaseData 
} from '../types';

// Import the JSON data
import personalInfoData from '../data/personal-info.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

/**
 * KnowledgeBase service class for managing and retrieving structured data
 * about Mohd Uwaish's portfolio information
 */
export class KnowledgeBase {
  private data: KnowledgeBaseData;

  constructor() {
    this.data = {
      personalInfo: personalInfoData as PersonalInfo,
      skills: skillsData as Skill[],
      experience: experienceData as Experience[],
      projects: projectsData as Project[]
    };
  }

  /**
   * Get personal information
   */
  getPersonalInfo(): PersonalInfo {
    return this.data.personalInfo;
  }

  /**
   * Get all skills or filter by category
   */
  getSkills(category?: Skill['category']): Skill[] {
    if (category) {
      return this.data.skills.filter(skill => skill.category === category);
    }
    return this.data.skills;
  }

  /**
   * Get skills by proficiency level
   */
  getSkillsByLevel(minLevel: number = 0, maxLevel: number = 100): Skill[] {
    return this.data.skills.filter(
      skill => skill.level >= minLevel && skill.level <= maxLevel
    );
  }

  /**
   * Get top skills by proficiency level
   */
  getTopSkills(limit: number = 10): Skill[] {
    return this.data.skills
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  }

  /**
   * Get work experience
   */
  getExperience(): Experience[] {
    return this.data.experience;
  }

  /**
   * Get experience by company or title
   */
  getExperienceByCompany(company: string): Experience[] {
    return this.data.experience.filter(
      exp => exp.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  /**
   * Get current/most recent experience
   */
  getCurrentExperience(): Experience[] {
    return this.data.experience.filter(
      exp => exp.period.toLowerCase().includes('present')
    );
  }

  /**
   * Get all projects
   */
  getProjects(): Project[] {
    return this.data.projects;
  }

  /**
   * Get projects by category or technology
   */
  getProjectsByCategory(category: string): Project[] {
    return this.data.projects.filter(
      project => project.category?.toLowerCase().includes(category.toLowerCase()) ||
                 project.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    );
  }

  /**
   * Get projects by technology used
   */
  getProjectsByTechnology(technology: string): Project[] {
    const techLower = technology.toLowerCase();
    return this.data.projects.filter(
      project => 
        project.technologies?.some(tech => tech.toLowerCase().includes(techLower)) ||
        project.tags.some(tag => tag.toLowerCase().includes(techLower))
    );
  }

  /**
   * Get education information
   */
  getEducation() {
    return this.data.personalInfo.education;
  }

  /**
   * Get contact information
   */
  getContactInfo() {
    const { name, email, location, socialLinks } = this.data.personalInfo;
    return {
      name,
      email,
      location,
      socialLinks
    };
  }

  /**
   * Search across all data types
   */
  searchContent(query: string): SearchResult[] {
    const results: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    // Search in personal info
    const personalInfo = this.data.personalInfo;
    const personalMatches = this.searchInObject(personalInfo, queryLower);
    if (personalMatches.length > 0) {
      results.push({
        type: 'personal',
        data: personalInfo,
        relevanceScore: this.calculateRelevanceScore(personalMatches, queryLower),
        matchedFields: personalMatches
      });
    }

    // Search in skills
    this.data.skills.forEach(skill => {
      const skillMatches = this.searchInObject(skill, queryLower);
      if (skillMatches.length > 0) {
        results.push({
          type: 'skill',
          data: skill,
          relevanceScore: this.calculateRelevanceScore(skillMatches, queryLower),
          matchedFields: skillMatches
        });
      }
    });

    // Search in experience
    this.data.experience.forEach(exp => {
      const expMatches = this.searchInObject(exp, queryLower);
      if (expMatches.length > 0) {
        results.push({
          type: 'experience',
          data: exp,
          relevanceScore: this.calculateRelevanceScore(expMatches, queryLower),
          matchedFields: expMatches
        });
      }
    });

    // Search in projects
    this.data.projects.forEach(project => {
      const projectMatches = this.searchInObject(project, queryLower);
      if (projectMatches.length > 0) {
        results.push({
          type: 'project',
          data: project,
          relevanceScore: this.calculateRelevanceScore(projectMatches, queryLower),
          matchedFields: projectMatches
        });
      }
    });

    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Search for specific skills by name or description
   */
  searchSkills(query: string): Skill[] {
    const queryLower = query.toLowerCase();
    return this.data.skills.filter(skill =>
      skill.name.toLowerCase().includes(queryLower) ||
      skill.description?.toLowerCase().includes(queryLower) ||
      skill.category.toLowerCase().includes(queryLower)
    );
  }

  /**
   * Get skills related to a specific technology or domain
   */
  getRelatedSkills(technology: string): Skill[] {
    const techLower = technology.toLowerCase();
    return this.data.skills.filter(skill =>
      skill.name.toLowerCase().includes(techLower) ||
      skill.description?.toLowerCase().includes(techLower)
    );
  }

  /**
   * Get summary statistics
   */
  getSummaryStats() {
    return {
      totalSkills: this.data.skills.length,
      totalExperience: this.data.experience.length,
      totalProjects: this.data.projects.length,
      skillCategories: [...new Set(this.data.skills.map(s => s.category))],
      averageSkillLevel: Math.round(
        this.data.skills.reduce((sum, skill) => sum + skill.level, 0) / this.data.skills.length
      ),
      topSkillCategories: this.getSkillCategoryCounts()
    };
  }

  /**
   * Private helper method to search within an object
   */
  private searchInObject(obj: any, query: string): string[] {
    const matches: string[] = [];
    
    const searchRecursive = (item: any, path: string = '') => {
      if (typeof item === 'string') {
        if (item.toLowerCase().includes(query)) {
          matches.push(path || 'content');
        }
      } else if (Array.isArray(item)) {
        item.forEach((arrayItem, index) => {
          searchRecursive(arrayItem, `${path}[${index}]`);
        });
      } else if (typeof item === 'object' && item !== null) {
        Object.entries(item).forEach(([key, value]) => {
          const newPath = path ? `${path}.${key}` : key;
          searchRecursive(value, newPath);
        });
      }
    };

    searchRecursive(obj);
    return matches;
  }

  /**
   * Calculate relevance score based on matches and query
   */
  private calculateRelevanceScore(matches: string[], query: string): number {
    let score = matches.length;
    
    // Boost score for exact matches in important fields
    matches.forEach(match => {
      if (match.includes('name') || match.includes('title')) {
        score += 2;
      }
      if (match.includes('description') || match.includes('bio')) {
        score += 1;
      }
    });

    return score;
  }

  /**
   * Get skill category counts
   */
  private getSkillCategoryCounts() {
    const counts: Record<string, number> = {};
    this.data.skills.forEach(skill => {
      counts[skill.category] = (counts[skill.category] || 0) + 1;
    });
    return counts;
  }

  /**
   * Get all available data (useful for debugging or full context)
   */
  getAllData(): KnowledgeBaseData {
    return this.data;
  }
}