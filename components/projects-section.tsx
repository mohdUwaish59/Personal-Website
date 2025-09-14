"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "ZeroDesk AI Chatbot",
    description: "A full stack Retrieval-Augmented Generation (RAG)-based system chatbot that act as a 0th level support agent for IT helpdesk using NextJS, FastAPI, and Docker.",
    image: "/project/zerodesk.png",
    tags: ["NextJS", "fastapi", "RAG", "Docker", "Natural Language Processing"],
    liveUrl: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
    githubUrl: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
  },
  {
    id: 2,
    title: "geoRAG",
    description: "A Retrieval-Augmented Generation (RAG)-based system designed to extract information from georock database for geochemistry research papers efficiently using hybrid retrieval techniques.",
    image: "/project/geoRAG.jpg",
    tags: ["Retrieval-Augmented Generation", "VectorRAG", "GraphRAG", "LLMs", "Machine Learning"],
    liveUrl: "https://georag-app.streamlit.app/",
    githubUrl: "https://github.com/mohdUwaish59/geoRAG",
  },
  {
    id: 3,
    title: "Browser Extension for Image Sensitivity Prediction",
    description: "A ReactJS-based browser extension that predicts image sensitivity for Facebook, Twitter, and Instagram using a trained deep learning model deployed via Flask API.",
    image: "/project/meeting.png",
    tags: ["React", "Flask", "Machine Learning", "REST API", "Computer Vision"],
    liveUrl: "https://github.com/ayangupta9/RASP_twitter",
    githubUrl: "https://github.com/ayangupta9/RASP_twitter",
  },
  {
    id: 4,
    title: "Meeting Summarization Testbench",
    description: "An NLP evaluation tool for analyzing meeting summarization models using Hugging Face and various NLP metrics.",
    image: "/project/meeting.png",
    tags: ["Python", "Hugging Face", "Django", "REST API", "NLP"],
    liveUrl: "https://github.com/gipplab/MeetingSum_Testbench",
    githubUrl: "https://github.com/gipplab/MeetingSum_Testbench",
  },
  {
    id: 5,
    title: "Social WordSmith",
    description: "A Whatsapp and Telegram chat analysis tool that provides message statistics, word clouds, emoji usage, and activity insights for WhatsApp and Telegram chats.",
    image: "/project/whatsapp.png",
    tags: ["Streamlit", "Pandas", "Plotly", "Seaborn", "Data Analysis"],
    liveUrl: "https://mohduwaish59-whatsappwordsmith-app-fywxax.streamlit.app/",
    githubUrl: "https://github.com/mohdUwaish59",
  },
  {
    id: 6,
    title: "Web-Scout",
    description: "A dynamic web scraping tool using Django and Scrapy, allowing users to extract and visualize data from websites.",
    image: "/project/web1.png",
    tags: ["Django", "Scrapy", "MongoDB", "Plotly", "Pandas"],
    liveUrl: "https://github.com/mohdUwaish59/Web-Scout",
    githubUrl: "https://github.com/mohdUwaish59/Web-Scout",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my latest projects. These include NLP applications, chat analysis tools, web scraping platforms, AI-driven recommendation systems, and a machine-learning-based browser extension.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/mohdUwaish59" target="_blank" rel="noopener noreferrer">
              View More on GitHub
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
