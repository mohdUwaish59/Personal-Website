import { describe, it, expect, beforeEach } from 'vitest';
import { KnowledgeBase } from '../services/knowledge-base';
import { PersonalInfo, Skill, Experience, Project } from '../types';

describe('KnowledgeBase', () => {
  let knowledgeBase: KnowledgeBase;

  beforeEach(() => {
    knowledgeBase = new KnowledgeBase();
  });

  describe('getPersonalInfo', () => {
    it('should return personal information', () => {
      const personalInfo = knowledgeBase.getPersonalInfo();
      
      expect(personalInfo).toBeDefined();
      expect(personalInfo.name).toBe('Mohd Uwaish');
      expect(personalInfo.title).toBe('Full Stack AI Engineer & Data Scientist');
      expect(personalInfo.email).toBe('mohd.uwaish@stud.uni-goettingen.de');
      expect(personalInfo.location).toBe('Göttingen, Germany');
      expect(personalInfo.availability).toBe('Open to opportunities');
      expect(personalInfo.bio).toContain('Master\'s student');
      expect(Array.isArray(personalInfo.interests)).toBe(true);
      expect(personalInfo.interests.length).toBeGreaterThan(0);
    });

    it('should include education information', () => {
      const personalInfo = knowledgeBase.getPersonalInfo();
      
      expect(personalInfo.education).toBeDefined();
      expect(personalInfo.education.degree).toBe('MSc in Applied Computer Science');
      expect(personalInfo.education.specialization).toBe('Data Science');
      expect(personalInfo.education.university).toBe('Georg-August-Universität Göttingen');
    });

    it('should include social links', () => {
      const personalInfo = knowledgeBase.getPersonalInfo();
      
      expect(personalInfo.socialLinks).toBeDefined();
      expect(personalInfo.socialLinks.github).toContain('github.com');
      expect(personalInfo.socialLinks.linkedin).toContain('linkedin.com');
      expect(personalInfo.socialLinks.email).toBe(personalInfo.email);
    });
  });

  describe('getSkills', () => {
    it('should return all skills when no category is specified', () => {
      const skills = knowledgeBase.getSkills();
      
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
      
      // Check that skills have required properties
      skills.forEach(skill => {
        expect(skill.name).toBeDefined();
        expect(skill.category).toBeDefined();
        expect(typeof skill.level).toBe('number');
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      });
    });

    it('should filter skills by category', () => {
      const frontendSkills = knowledgeBase.getSkills('frontend');
      const backendSkills = knowledgeBase.getSkills('backend');
      const ragSkills = knowledgeBase.getSkills('rag');
      
      expect(frontendSkills.every(skill => skill.category === 'frontend')).toBe(true);
      expect(backendSkills.every(skill => skill.category === 'backend')).toBe(true);
      expect(ragSkills.every(skill => skill.category === 'rag')).toBe(true);
      
      expect(frontendSkills.length).toBeGreaterThan(0);
      expect(backendSkills.length).toBeGreaterThan(0);
      expect(ragSkills.length).toBeGreaterThan(0);
    });

    it('should include expected frontend skills', () => {
      const frontendSkills = knowledgeBase.getSkills('frontend');
      const skillNames = frontendSkills.map(skill => skill.name);
      
      expect(skillNames).toContain('React');
      expect(skillNames).toContain('Next.js');
      expect(skillNames).toContain('TypeScript');
      expect(skillNames).toContain('JavaScript');
    });

    it('should include expected RAG skills', () => {
      const ragSkills = knowledgeBase.getSkills('rag');
      const skillNames = ragSkills.map(skill => skill.name);
      
      expect(skillNames).toContain('LangChain');
      expect(skillNames).toContain('Prompt Engineering');
      expect(skillNames).toContain('Semantic Search');
    });
  });

  describe('getSkillsByLevel', () => {
    it('should filter skills by level range', () => {
      const highLevelSkills = knowledgeBase.getSkillsByLevel(90, 100);
      const midLevelSkills = knowledgeBase.getSkillsByLevel(70, 89);
      
      expect(highLevelSkills.every(skill => skill.level >= 90 && skill.level <= 100)).toBe(true);
      expect(midLevelSkills.every(skill => skill.level >= 70 && skill.level <= 89)).toBe(true);
      
      expect(highLevelSkills.length).toBeGreaterThan(0);
    });

    it('should return all skills when no parameters provided', () => {
      const allSkills = knowledgeBase.getSkills();
      const skillsByLevel = knowledgeBase.getSkillsByLevel();
      
      expect(skillsByLevel.length).toBe(allSkills.length);
    });
  });

  describe('getTopSkills', () => {
    it('should return top skills sorted by level', () => {
      const topSkills = knowledgeBase.getTopSkills(5);
      
      expect(topSkills.length).toBeLessThanOrEqual(5);
      
      // Check that skills are sorted by level (descending)
      for (let i = 1; i < topSkills.length; i++) {
        expect(topSkills[i].level).toBeLessThanOrEqual(topSkills[i - 1].level);
      }
    });

    it('should return default number of skills when no limit specified', () => {
      const topSkills = knowledgeBase.getTopSkills();
      
      expect(topSkills.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getExperience', () => {
    it('should return all work experience', () => {
      const experience = knowledgeBase.getExperience();
      
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThan(0);
      
      // Check required properties
      experience.forEach(exp => {
        expect(exp.id).toBeDefined();
        expect(exp.title).toBeDefined();
        expect(exp.company).toBeDefined();
        expect(exp.location).toBeDefined();
        expect(exp.period).toBeDefined();
        expect(exp.description).toBeDefined();
        expect(Array.isArray(exp.achievements)).toBe(true);
        expect(Array.isArray(exp.skills)).toBe(true);
      });
    });

    it('should include expected companies', () => {
      const experience = knowledgeBase.getExperience();
      const companies = experience.map(exp => exp.company);
      
      expect(companies).toContain('Niedersächsische Staats- und Universitätsbibliothek Göttingen');
      expect(companies).toContain('Georg-August-Universität Göttingen');
      expect(companies).toContain('Tata Consultancy Services Private Limited');
    });
  });

  describe('getCurrentExperience', () => {
    it('should return current/ongoing experience', () => {
      const currentExp = knowledgeBase.getCurrentExperience();
      
      expect(Array.isArray(currentExp)).toBe(true);
      expect(currentExp.length).toBeGreaterThan(0);
      
      // All current experience should have "Present" in the period
      currentExp.forEach(exp => {
        expect(exp.period.toLowerCase()).toContain('present');
      });
    });
  });

  describe('getExperienceByCompany', () => {
    it('should filter experience by company name', () => {
      const uniExp = knowledgeBase.getExperienceByCompany('Universität');
      const tcsExp = knowledgeBase.getExperienceByCompany('Tata');
      
      expect(uniExp.length).toBeGreaterThan(0);
      expect(tcsExp.length).toBeGreaterThan(0);
      
      uniExp.forEach(exp => {
        expect(exp.company.toLowerCase()).toContain('universität');
      });
      
      tcsExp.forEach(exp => {
        expect(exp.company.toLowerCase()).toContain('tata');
      });
    });
  });

  describe('getProjects', () => {
    it('should return all projects', () => {
      const projects = knowledgeBase.getProjects();
      
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
      
      // Check required properties
      projects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(Array.isArray(project.tags)).toBe(true);
      });
    });

    it('should include expected projects', () => {
      const projects = knowledgeBase.getProjects();
      const projectTitles = projects.map(project => project.title);
      
      expect(projectTitles).toContain('geoRAG');
      expect(projectTitles).toContain('Social WordSmith');
      expect(projectTitles).toContain('Digital Danke Schön');
    });
  });

  describe('getProjectsByCategory', () => {
    it('should filter projects by category', () => {
      const ragProjects = knowledgeBase.getProjectsByCategory('RAG');
      const mlProjects = knowledgeBase.getProjectsByCategory('Machine Learning');
      
      expect(ragProjects.length).toBeGreaterThan(0);
      expect(mlProjects.length).toBeGreaterThan(0);
    });
  });

  describe('getProjectsByTechnology', () => {
    it('should filter projects by technology', () => {
      const reactProjects = knowledgeBase.getProjectsByTechnology('React');
      const pythonProjects = knowledgeBase.getProjectsByTechnology('Python');
      const djangoProjects = knowledgeBase.getProjectsByTechnology('Django');
      
      expect(reactProjects.length).toBeGreaterThan(0);
      expect(pythonProjects.length).toBeGreaterThan(0);
      expect(djangoProjects.length).toBeGreaterThan(0);
    });
  });

  describe('getEducation', () => {
    it('should return education information', () => {
      const education = knowledgeBase.getEducation();
      
      expect(education).toBeDefined();
      expect(education.degree).toBe('MSc in Applied Computer Science');
      expect(education.specialization).toBe('Data Science');
      expect(education.university).toBe('Georg-August-Universität Göttingen');
      expect(education.location).toBe('Göttingen, Germany');
      expect(education.status).toBe('Currently pursuing');
    });
  });

  describe('getContactInfo', () => {
    it('should return contact information', () => {
      const contactInfo = knowledgeBase.getContactInfo();
      
      expect(contactInfo.name).toBe('Mohd Uwaish');
      expect(contactInfo.email).toBe('mohd.uwaish@stud.uni-goettingen.de');
      expect(contactInfo.location).toBe('Göttingen, Germany');
      expect(contactInfo.socialLinks).toBeDefined();
      expect(contactInfo.socialLinks.github).toContain('github.com');
      expect(contactInfo.socialLinks.linkedin).toContain('linkedin.com');
    });
  });

  describe('searchContent', () => {
    it('should search across all data types', () => {
      const results = knowledgeBase.searchContent('React');
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      
      // Should find React in skills and projects
      const types = results.map(result => result.type);
      expect(types).toContain('skill');
      expect(types).toContain('project');
      
      // Check result structure
      results.forEach(result => {
        expect(result.type).toBeDefined();
        expect(result.data).toBeDefined();
        expect(typeof result.relevanceScore).toBe('number');
        expect(Array.isArray(result.matchedFields)).toBe(true);
      });
    });

    it('should return results sorted by relevance', () => {
      const results = knowledgeBase.searchContent('Python');
      
      if (results.length > 1) {
        for (let i = 1; i < results.length; i++) {
          expect(results[i].relevanceScore).toBeLessThanOrEqual(results[i - 1].relevanceScore);
        }
      }
    });

    it('should return empty array for non-existent terms', () => {
      const results = knowledgeBase.searchContent('nonexistentterm12345');
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });

  describe('searchSkills', () => {
    it('should search skills by name', () => {
      const reactSkills = knowledgeBase.searchSkills('React');
      const jsSkills = knowledgeBase.searchSkills('JavaScript');
      
      expect(reactSkills.length).toBeGreaterThan(0);
      expect(jsSkills.length).toBeGreaterThan(0);
      
      // Check that at least one skill contains "react" in name or description
      const hasReactSkill = reactSkills.some(skill => 
        skill.name.toLowerCase().includes('react') || 
        skill.description?.toLowerCase().includes('react')
      );
      expect(hasReactSkill).toBe(true);
    });

    it('should search skills by category', () => {
      const frontendSkills = knowledgeBase.searchSkills('frontend');
      
      expect(frontendSkills.length).toBeGreaterThan(0);
      frontendSkills.forEach(skill => {
        expect(skill.category).toBe('frontend');
      });
    });
  });

  describe('getRelatedSkills', () => {
    it('should find related skills for a technology', () => {
      const reactSkills = knowledgeBase.getRelatedSkills('React');
      const pythonSkills = knowledgeBase.getRelatedSkills('Python');
      
      expect(reactSkills.length).toBeGreaterThan(0);
      expect(pythonSkills.length).toBeGreaterThan(0);
    });
  });

  describe('getSummaryStats', () => {
    it('should return summary statistics', () => {
      const stats = knowledgeBase.getSummaryStats();
      
      expect(typeof stats.totalSkills).toBe('number');
      expect(typeof stats.totalExperience).toBe('number');
      expect(typeof stats.totalProjects).toBe('number');
      expect(typeof stats.averageSkillLevel).toBe('number');
      expect(Array.isArray(stats.skillCategories)).toBe(true);
      expect(typeof stats.topSkillCategories).toBe('object');
      
      expect(stats.totalSkills).toBeGreaterThan(0);
      expect(stats.totalExperience).toBeGreaterThan(0);
      expect(stats.totalProjects).toBeGreaterThan(0);
      expect(stats.averageSkillLevel).toBeGreaterThan(0);
      expect(stats.averageSkillLevel).toBeLessThanOrEqual(100);
      
      // Check that all expected categories are present
      expect(stats.skillCategories).toContain('frontend');
      expect(stats.skillCategories).toContain('backend');
      expect(stats.skillCategories).toContain('rag');
      expect(stats.skillCategories).toContain('database');
      expect(stats.skillCategories).toContain('other');
    });
  });

  describe('getAllData', () => {
    it('should return all knowledge base data', () => {
      const allData = knowledgeBase.getAllData();
      
      expect(allData.personalInfo).toBeDefined();
      expect(Array.isArray(allData.skills)).toBe(true);
      expect(Array.isArray(allData.experience)).toBe(true);
      expect(Array.isArray(allData.projects)).toBe(true);
      
      expect(allData.skills.length).toBeGreaterThan(0);
      expect(allData.experience.length).toBeGreaterThan(0);
      expect(allData.projects.length).toBeGreaterThan(0);
    });
  });
});