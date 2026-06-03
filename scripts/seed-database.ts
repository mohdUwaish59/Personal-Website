import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import models
const HeroSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitle: String,
  description: String,
  typingTexts: [String],
  githubUrl: String,
  linkedinUrl: String,
  email: String,
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  availability: String,
  title: String,
  description: [String],
  profileImage: String,
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tags: [String],
  liveUrl: String,
  githubUrl: String,
  order: Number,
  featured: Boolean,
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  category: String,
  icon: String,
  order: Number,
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  period: String,
  description: String,
  achievements: [String],
  skills: [String],
  logo: String,
  order: Number,
}, { timestamps: true });

const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
const About = mongoose.models.About || mongoose.model('About', AboutSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

// Seed data
const heroData = {
  name: "Mohd Uwaish",
  title: "Full Stack AI Engineer & Data Scientist",
  subtitle: "Full Stack AI Engineer & Data Scientist",
  description: "I specialize in developing Machine Learning systems, fullstack web applications, RAG systems and leveraging data science to solve real-world problems. Currently pursuing my MSc in Applied Computer Science with a specialization in Data Science at Georg-August-Universität Göttingen.",
  typingTexts: [
    "Full Stack Developer",
    "Natural Language Processing",
    "Machine Learning",
    "Deep Learning",
    "ML Ops"
  ],
  githubUrl: "https://github.com/mohdUwaish59",
  linkedinUrl: "https://linkedin.com/in/muwaish5",
  email: "mohd.uwaish@stud.uni-goettingen.de"
};

const aboutData = {
  name: "Mohd Uwaish",
  email: "mohd.uwaish@stud.uni-goettingen.de",
  location: "Germany",
  availability: "Open to opportunities",
  title: "Full Stack AI Engineer & Data Scientist",
  description: [
    "I am a Master's student in Applied Computer Science with a specialization in Data Science at Georg-August-Universität Göttingen. I have experience in full-stack development, data science, and machine learning, working on innovative solutions across multiple domains.",
    "My expertise includes technologies like Python, JavaScript, Django, Flask, React, and Next.js. I am passionate about Natural Langauage processing, Deep Learning, RAG Systems, building scalable web applications, developing data-driven insights, and deploying machine learning models for real-world applications.",
    "In my free time, I enjoy exploring new technologies, working on open-source projects, and engaging with the developer community."
  ],
  profileImage: "assets/profile.png"
};

const projectsData = [
  {
    title: "FairSample",
    description: "Research-driven Python package addressing class overlap in software defect prediction. Features 14+ overlap-handling techniques, 40+ complexity metrics, and a novel multi-dimensional audit framework for evaluating structural changes in imbalanced datasets.",
    image: "/project/fairsample.png",
    tags: ["Python", "Machine Learning", "Research", "scikit-learn", "PyPI"],
    liveUrl: "https://pypi.org/project/fairsample/",
    githubUrl: "https://github.com/mohdUwaish59/FairSample",
    order: 1,
    featured: true
  },
  {
    title: "ZeroDesk AI Chatbot",
    description: "A full stack Retrieval-Augmented Generation (RAG)-based system chatbot that act as a 0th level support agent for IT helpdesk using NextJS, FastAPI, and Docker.",
    image: "/project/zerodesk.png",
    tags: ["NextJS", "fastapi", "RAG", "Docker", "Natural Language Processing"],
    liveUrl: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
    githubUrl: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
    order: 2,
    featured: true
  },
  {
    title: "geoRAG",
    description: "A Retrieval-Augmented Generation (RAG)-based system designed to extract information from georock database for geochemistry research papers efficiently using hybrid retrieval techniques.",
    image: "/project/geoRAG.jpg",
    tags: ["Retrieval-Augmented Generation", "VectorRAG", "GraphRAG", "LLMs", "Machine Learning"],
    liveUrl: "https://georag-app.streamlit.app/",
    githubUrl: "https://github.com/mohdUwaish59/geoRAG",
    order: 3,
    featured: true
  },
  {
    title: "Browser Extension for Image Sensitivity Prediction",
    description: "A ReactJS-based browser extension that predicts image sensitivity for Facebook, Twitter, and Instagram using a trained deep learning model deployed via Flask API.",
    image: "/project/meeting.png",
    tags: ["React", "Flask", "Machine Learning", "REST API", "Computer Vision"],
    liveUrl: "https://github.com/ayangupta9/RASP_twitter",
    githubUrl: "https://github.com/ayangupta9/RASP_twitter",
    order: 4,
    featured: false
  },
  {
    title: "Meeting Summarization Testbench",
    description: "An NLP evaluation tool for analyzing meeting summarization models using Hugging Face and various NLP metrics.",
    image: "/project/meeting.png",
    tags: ["Python", "Hugging Face", "Django", "REST API", "NLP"],
    liveUrl: "https://github.com/gipplab/MeetingSum_Testbench",
    githubUrl: "https://github.com/gipplab/MeetingSum_Testbench",
    order: 5,
    featured: false
  },
  {
    title: "Social WordSmith",
    description: "A Whatsapp and Telegram chat analysis tool that provides message statistics, word clouds, emoji usage, and activity insights for WhatsApp and Telegram chats.",
    image: "/project/whatsapp.png",
    tags: ["Streamlit", "Pandas", "Plotly", "Seaborn", "Data Analysis"],
    liveUrl: "https://mohduwaish59-whatsappwordsmith-app-fywxax.streamlit.app/",
    githubUrl: "https://github.com/mohdUwaish59",
    order: 6,
    featured: false
  }
];

const skillsData = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", icon: "Layout", order: 1 },
  { name: "JavaScript", level: 95, category: "frontend", icon: "Code", order: 2 },
  { name: "TypeScript", level: 90, category: "frontend", icon: "Code", order: 3 },
  { name: "React", level: 95, category: "frontend", icon: "Code", order: 4 },
  { name: "Next.js", level: 90, category: "frontend", icon: "Server", order: 5 },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "Layout", order: 6 },
  { name: "Framer Motion", level: 85, category: "frontend", icon: "Smartphone", order: 7 },
  
  // Backend
  { name: "Node.js", level: 90, category: "backend", icon: "Server", order: 1 },
  { name: "Express", level: 85, category: "backend", icon: "Server", order: 2 },
  { name: "Python", level: 80, category: "backend", icon: "Code", order: 3 },
  { name: "Django", level: 75, category: "backend", icon: "Server", order: 4 },
  { name: "GraphQL", level: 85, category: "backend", icon: "Database", order: 5 },
  { name: "REST API", level: 95, category: "backend", icon: "Server", order: 6 },
  
  // Database
  { name: "MongoDB", level: 90, category: "database", icon: "Database", order: 1 },
  { name: "PostgreSQL", level: 85, category: "database", icon: "Database", order: 2 },
  { name: "MySQL", level: 80, category: "database", icon: "Database", order: 3 },
  { name: "ChromaDB", level: 80, category: "database", icon: "Database", order: 4 },
  { name: "Pinecone", level: 80, category: "database", icon: "Database", order: 5 },
  
  // RAG
  { name: "LangChain", level: 88, category: "rag", icon: "Brain", order: 1 },
  { name: "LangGraph", level: 85, category: "rag", icon: "Brain", order: 2 },
  { name: "LlamaIndex", level: 75, category: "rag", icon: "Brain", order: 3 },
  { name: "RAGAS", level: 80, category: "rag", icon: "Box", order: 4 },
  { name: "Vector Databases", level: 85, category: "rag", icon: "Database", order: 5 },
  { name: "Semantic Search", level: 90, category: "rag", icon: "Search", order: 6 },
  { name: "LLM Integration", level: 85, category: "rag", icon: "Brain", order: 7 },
  { name: "Prompt Engineering", level: 92, category: "rag", icon: "Code", order: 8 },
  { name: "Document Processing", level: 80, category: "rag", icon: "Server", order: 9 },
  
  // Other
  { name: "Git/GitHub", level: 95, category: "other", icon: "Code", order: 1 },
  { name: "Docker", level: 80, category: "other", icon: "Settings", order: 2 },
  { name: "AWS", level: 75, category: "other", icon: "Server", order: 3 },
  { name: "CI/CD", level: 80, category: "other", icon: "Settings", order: 4 },
  { name: "Testing", level: 85, category: "other", icon: "Code", order: 5 },
  { name: "Tableau", level: 85, category: "other", icon: "ChartNoAxesCombined", order: 6 },
];

const experiencesData = [
  {
    title: "Research Assistant - Deep Learning and Natural Language Processing",
    company: "Fraunhofer-Einrichtung für Energieinfrastrukturen und Geotechnologien IEG",
    location: "Bochum, Germany",
    period: "Sep 2025 - Present",
    description: "AI for Energy and Electricity demand prediction - Researching News and public sentiment analysis for predicting energy consumption patterns using deep learning techniques.",
    achievements: [
      "Conduct Literature research on state-of-the-art techniques for sentiment analysis and energy consumption prediction."
    ],
    skills: ["Deep Learning", "NLP", "Sentiment Analysis", "Literature Research", "Technical Documentation", "Code Review", "CI/CD", "Docker", "ddev", "Git", "GitLab"],
    logo: "/company_logos/fraunhofer.jpg",
    order: 1
  },
  {
    title: "Student Assistant - Department of Economics",
    company: "Georg-August-Universität Göttingen",
    location: "Göttingen, Germany",
    period: "Feb 2024 - Present",
    description: "Developing user-friendly economics experiments using frontend technologies and django-based oTree framework.",
    achievements: [
      "Developing user friendly economics experiments using the frontend technologies and django based oTree framework",
      "Implementing chat and video communication features to enhance facilitating participant interaction, experimental realism and data collection",
      "Conducting data analysis for the experiments, employing statistical methods and visualization techniques to derive insights"
    ],
    skills: ["Django", "oTree", "Frontend Technologies", "Data Analysis", "Statistical Methods", "Visualization"],
    logo: "/company_logos/goe.png",
    order: 2
  },
  {
    title: "Midi Job - Software Development",
    company: "Niedersächsische Akademie der Wissenschaften zu Göttingen",
    location: "Göttingen, Germany",
    period: "Jun 2025 - Aug 2025",
    description: "Supporting the development and maintenance of academic web portals using Next.js, assisting with code implementation, documentation, and testing.",
    achievements: [
      "Improved the user Interface of central logging web application of adw.",
      "Implemented pagination and dynamic items rendering on a page to improve performance and reduce load times.",
      "Implemented the scheduler to delete logs older than 30 days from the database."
    ],
    skills: ["Javascript", "sqlite", "Code Review", "CI/CD", "Docker", "Git", "GitLab"],
    logo: "/company_logos/adw.png",
    order: 3
  },
  {
    title: "Working Student - Software Development",
    company: "Niedersächsische Staats- und Universitätsbibliothek Göttingen",
    location: "Göttingen, Germany",
    period: "Sep 2024 - Jul 2025",
    description: "Supported the development and maintenance of academic web portals using Next.js, assisting with code implementation, documentation, and testing.",
    achievements: [
      "Developed and maintained 5+ reusable UI components for the digital library web portal using Next.js, improving code consistency and reusability.",
      "Assisted in writing technical documentation for 80% of newly implemented features, reducing onboarding time for new team members by 25%.",
      "Reviewed and tested approximately 5-7 pull requests per week, helping maintain code quality and reduce production bugs.",
      "Contributed to CI/CD improvements by automating 2+ small tasks, reducing deployment overhead by 15%.",
      "Helped implement bilingual (German/English) content management features for 100+ scholarly articles, improving accessibility for international users.",
      "Set up and maintained local development environments using Docker and ddev, reducing setup time for new contributors by 40%."
    ],
    skills: ["Next.js", "Technical Documentation", "Code Review", "CI/CD", "Docker", "ddev", "Git", "GitLab"],
    logo: "/company_logos/sub.jpg",
    order: 4
  },
  {
    title: "Software Engineer",
    company: "Tata Consultancy Services Private Limited",
    location: "New Delhi, India",
    period: "Sep 2021 - Apr 2023",
    description: "Developed full-stack solutions for the PENALTY module of the Income Tax Business Application (ITBA).",
    achievements: [
      "Developed full-stack solutions for the PENALTY module of the Income Tax Business Application (ITBA) using HTML, CSS, JavaScript, Java, PL/SQL, and Oracle Database, resulting in a 20% increase in user engagement and a 15% reduction in processing time for tax filings",
      "Implemented complex business logic and dynamic functionalities in the back-end by writing optimized Java code integrated with Oracle database",
      "Designed and executed database queries, PL/SQL procedures, triggers, and functions, optimizing data models and achieving an 18% reduction in database response time to enhance UI responsiveness",
      "Leveraged Agile methodologies to iteratively develop and deploy functionalities, resulting in 9 successful change requests and 3 new functionalities released in a fast-paced environment, consistently aligned with evolving user requirements"
    ],
    skills: ["HTML", "CSS", "JavaScript", "Java", "PL/SQL", "Oracle Database", "Agile"],
    logo: "/company_logos/tcs.png",
    order: 5
  }
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});

    // Seed Hero
    console.log('📝 Seeding Hero data...');
    await Hero.create(heroData);

    // Seed About
    console.log('📝 Seeding About data...');
    await About.create(aboutData);

    // Seed Projects
    console.log('📝 Seeding Projects data...');
    await Project.insertMany(projectsData);

    // Seed Skills
    console.log('📝 Seeding Skills data...');
    await Skill.insertMany(skillsData);

    // Seed Experiences
    console.log('📝 Seeding Experiences data...');
    await Experience.insertMany(experiencesData);

    console.log('✅ Database seeded successfully!');
    console.log(`
    📊 Summary:
    - Hero: 1 document
    - About: 1 document
    - Projects: ${projectsData.length} documents
    - Skills: ${skillsData.length} documents
    - Experiences: ${experiencesData.length} documents
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
