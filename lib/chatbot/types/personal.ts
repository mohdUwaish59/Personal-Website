/**
 * Personal information interface
 */
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  availability: string;
  bio: string;
  interests: string[];
}

/**
 * Skill interface with categorization and proficiency
 */
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'rag' | 'other';
  level: number; // 1-100
  description?: string;
}

/**
 * Work experience interface
 */
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

/**
 * Project interface
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

/**
 * Education interface
 */
export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  achievements?: string[];
}