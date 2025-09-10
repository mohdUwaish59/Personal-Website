import { KnowledgeBase } from '../services/knowledge-base';

/**
 * Demo script showing how to use the KnowledgeBase service
 * This can be used for testing and understanding the API
 */
export function runKnowledgeBaseDemo() {
  const kb = new KnowledgeBase();

  console.log('=== Knowledge Base Demo ===\n');

  // Get personal information
  console.log('1. Personal Information:');
  const personalInfo = kb.getPersonalInfo();
  console.log(`Name: ${personalInfo.name}`);
  console.log(`Title: ${personalInfo.title}`);
  console.log(`Location: ${personalInfo.location}`);
  console.log(`Email: ${personalInfo.email}\n`);

  // Get skills by category
  console.log('2. Frontend Skills:');
  const frontendSkills = kb.getSkills('frontend');
  frontendSkills.forEach(skill => {
    console.log(`- ${skill.name}: ${skill.level}%`);
  });
  console.log();

  // Get top skills
  console.log('3. Top 5 Skills:');
  const topSkills = kb.getTopSkills(5);
  topSkills.forEach((skill, index) => {
    console.log(`${index + 1}. ${skill.name}: ${skill.level}%`);
  });
  console.log();

  // Get current experience
  console.log('4. Current Experience:');
  const currentExp = kb.getCurrentExperience();
  currentExp.forEach(exp => {
    console.log(`- ${exp.title} at ${exp.company}`);
    console.log(`  Period: ${exp.period}`);
  });
  console.log();

  // Get projects by technology
  console.log('5. React Projects:');
  const reactProjects = kb.getProjectsByTechnology('React');
  reactProjects.forEach(project => {
    console.log(`- ${project.title}: ${project.description.substring(0, 100)}...`);
  });
  console.log();

  // Search functionality
  console.log('6. Search Results for "RAG":');
  const searchResults = kb.searchContent('RAG');
  searchResults.slice(0, 3).forEach(result => {
    console.log(`- Type: ${result.type}, Score: ${result.relevanceScore}`);
    if (result.type === 'skill') {
      console.log(`  Skill: ${result.data.name}`);
    } else if (result.type === 'project') {
      console.log(`  Project: ${result.data.title}`);
    }
  });
  console.log();

  // Summary statistics
  console.log('7. Summary Statistics:');
  const stats = kb.getSummaryStats();
  console.log(`Total Skills: ${stats.totalSkills}`);
  console.log(`Total Experience: ${stats.totalExperience}`);
  console.log(`Total Projects: ${stats.totalProjects}`);
  console.log(`Average Skill Level: ${stats.averageSkillLevel}%`);
  console.log(`Skill Categories: ${stats.skillCategories.join(', ')}`);
  console.log();

  console.log('=== Demo Complete ===');
}

// Uncomment to run the demo
// runKnowledgeBaseDemo();