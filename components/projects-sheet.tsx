"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FolderGit2, 
  ExternalLink, 
  Github,
  Star,
  GitFork,
  Code2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  stars?: number;
  forks?: number;
  link?: string;
  githubLink?: string;
  status?: "active" | "completed" | "in-progress";
}

const projects: Project[] = [
  {
    id: 1,
    title: "ZeroDesk AI Chatbot",
    description: "RAG-based chatbot for IT helpdesk support using NextJS, FastAPI, and Docker.",
    tags: ["NextJS", "FastAPI", "RAG", "Docker", "NLP"],
    stars: 15,
    forks: 3,
    status: "completed",
    githubLink: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
  },
  {
    id: 2,
    title: "geoRAG",
    description: "RAG system for extracting information from georock database using hybrid retrieval.",
    tags: ["RAG", "VectorRAG", "GraphRAG", "LLMs", "ML"],
    stars: 8,
    forks: 2,
    status: "active",
    link: "https://georag-app.streamlit.app/",
    githubLink: "https://github.com/mohdUwaish59/geoRAG",
  },
  {
    id: 3,
    title: "Image Sensitivity Predictor",
    description: "Browser extension for predicting image sensitivity on social media platforms.",
    tags: ["React", "Flask", "ML", "Computer Vision"],
    stars: 12,
    forks: 4,
    status: "completed",
    githubLink: "https://github.com/ayangupta9/RASP_twitter",
  },
  {
    id: 4,
    title: "Meeting Summarization Testbench",
    description: "NLP evaluation tool for analyzing meeting summarization models.",
    tags: ["Python", "Hugging Face", "Django", "NLP"],
    stars: 6,
    forks: 1,
    status: "completed",
    githubLink: "https://github.com/gipplab/MeetingSum_Testbench",
  },
  {
    id: 5,
    title: "Social WordSmith",
    description: "WhatsApp and Telegram chat analysis tool with statistics and visualizations.",
    tags: ["Streamlit", "Pandas", "Plotly", "Data Analysis"],
    stars: 20,
    forks: 5,
    status: "active",
    link: "https://mohduwaish59-whatsappwordsmith-app-fywxax.streamlit.app/",
  },
  {
    id: 6,
    title: "Web-Scout",
    description: "Dynamic web scraping tool using Django and Scrapy with data visualization.",
    tags: ["Django", "Scrapy", "MongoDB", "Plotly"],
    stars: 10,
    forks: 3,
    status: "completed",
    githubLink: "https://github.com/mohdUwaish59/Web-Scout",
  },
  {
    id: 7,
    title: "amotogs.com",
    description: "E-commerce webapp for kids fashion in Indian market using Next.JS and Supabase.",
    tags: ["NextJS", "Supabase", "E-commerce", "React"],
    status: "in-progress",
    link: "https://amotogs.vercel.app/",
  },
  {
    id: 8,
    title: "Class Overlapping Benchmark",
    description: "Research on class overlapping problem in ML classification tasks.",
    tags: ["Machine Learning", "Research", "Python", "Data Science"],
    status: "in-progress",
    githubLink: "https://github.com/mohdUwaish59/Investigating-Techniques-for-Class-Overlapping-problem",
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/30",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-progress": "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
};

const statusLabels = {
  active: "Active",
  completed: "Completed",
  "in-progress": "In Progress",
};

export function ProjectsSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Persistent on right side */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="btn-teal shadow-2xl hover:shadow-[#39b6a6]/50 transition-all duration-300 rounded-full h-14 w-14 p-0 group"
              aria-label="View Projects"
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FolderGit2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </motion.div>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-[#39b6a6]" />
                <span className="split-color-text">My Projects</span>
              </SheetTitle>
              <SheetDescription>
                Explore my portfolio of projects across AI, web development, and data science.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="p-4 rounded-lg border-2 border-border hover:border-[#39b6a6] transition-all duration-300 bg-card hover:shadow-lg hover:shadow-[#39b6a6]/10">
                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute -top-2 -right-2">
                        <Badge
                          variant="outline"
                          className={`${statusColors[project.status]} text-xs`}
                        >
                          {statusLabels[project.status]}
                        </Badge>
                      </div>
                    )}

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#39b6a6] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="badge-teal text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats & Links */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {project.stars !== undefined && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks !== undefined && (
                          <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.githubLink && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:text-[#39b6a6]"
                            asChild
                          >
                            <Link
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {project.link && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:text-[#39b6a6]"
                            asChild
                          >
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code2 className="h-4 w-4 text-[#39b6a6]" />
                <span>
                  Want to see more? Check out my{" "}
                  <Link
                    href="https://github.com/mohdUwaish59"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39b6a6] hover:underline font-medium"
                  >
                    GitHub profile
                  </Link>
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      {/* Tooltip hint (optional) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 2 }}
            className="fixed right-24 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="bg-[#39b6a6] text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
              View Projects
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="border-8 border-transparent border-l-[#39b6a6]"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
