import { NextResponse } from 'next/server';

// Fallback data in case MongoDB is not set up yet
const fallbackHeroData = {
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

export async function GET() {
  try {
    // Try to fetch from MongoDB
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/hero`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
    
    // If MongoDB fails, return fallback data
    return NextResponse.json(fallbackHeroData);
  } catch (error) {
    // Return fallback data on error
    return NextResponse.json(fallbackHeroData);
  }
}
