"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Layout, Server, Settings, Smartphone, Brain, Search, Box, ChartNoAxesCombined } from "lucide-react";
import { SkillCard } from "@/components/skill-card";
import { AnimatedText } from "@/components/animated-text";

const frontendSkills = [
  { name: "HTML/CSS", level: 95, icon: <Layout className="h-5 w-5" /> },
  { name: "JavaScript", level: 95, icon: <Code className="h-5 w-5" /> },
  { name: "TypeScript", level: 90, icon: <Code className="h-5 w-5" /> },
  { name: "React", level: 95, icon: <Code className="h-5 w-5" /> },
  { name: "Next.js", level: 90, icon: <Server className="h-5 w-5" /> },
  { name: "Tailwind CSS", level: 90, icon: <Layout className="h-5 w-5" /> },
  { name: "Framer Motion", level: 85, icon: <Smartphone className="h-5 w-5" /> },
];

const backendSkills = [
  { name: "Node.js", level: 90, icon: <Server className="h-5 w-5" /> },
  { name: "Express", level: 85, icon: <Server className="h-5 w-5" /> },
  { name: "Python", level: 80, icon: <Code className="h-5 w-5" /> },
  { name: "Django", level: 75, icon: <Server className="h-5 w-5" /> },
  { name: "GraphQL", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "REST API", level: 95, icon: <Server className="h-5 w-5" /> },
];

const databaseSkills = [
  { name: "MongoDB", level: 90, icon: <Database className="h-5 w-5" /> },
  { name: "PostgreSQL", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "MySQL", level: 80, icon: <Database className="h-5 w-5" /> },
  { name: "ChromaDB", level: 80, icon: <Database className="h-5 w-5" /> },
  { name: "Pinecone", level: 80, icon: <Database className="h-5 w-5" /> },
];

const ragSkills = [
  { name: "LangChain", level: 88, icon: <Brain className="h-5 w-5" /> },
  { name: "LangGraph", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "LlamaIndex", level: 75, icon: <Brain className="h-5 w-5" /> },
  { name: "RAGAS", level: 80, icon: <Box className="h-5 w-5" /> },
  { name: "Vector Databases", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "Semantic Search", level: 90, icon: <Search className="h-5 w-5" /> },
  { name: "LLM Integration", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "Prompt Engineering", level: 92, icon: <Code className="h-5 w-5" /> },
  { name: "Document Processing", level: 80, icon: <Server className="h-5 w-5" /> },
];

const otherSkills = [
  { name: "Git/GitHub", level: 95, icon: <Code className="h-5 w-5" /> },
  { name: "Docker", level: 80, icon: <Settings className="h-5 w-5" /> },
  { name: "AWS", level: 75, icon: <Server className="h-5 w-5" /> },
  { name: "CI/CD", level: 80, icon: <Settings className="h-5 w-5" /> },
  { name: "Testing", level: 85, icon: <Code className="h-5 w-5" /> },
  { name: "Tableau", level: 85, icon: <ChartNoAxesCombined className="h-5 w-5" /> },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <AnimatedText 
            text="I've worked with a variety of technologies and tools throughout my career. Here's a breakdown of my technical skills and proficiency levels."
            className="text-muted-foreground max-w-2xl mx-auto"
            delay={0.2}
          />
        </motion.div>

        <Tabs defaultValue="frontend" className="max-w-4xl mx-auto">
          {/* Desktop: Single row with all 5 tabs */}
          <TabsList className="hidden md:flex w-full justify-center gap-2 mb-8">
            <TabsTrigger value="frontend" className="flex items-center gap-2 px-3">
              <Layout className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">Frontend</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className="flex items-center gap-2 px-3">
              <Server className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">Backend</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2 px-3">
              <Database className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">Database</span>
            </TabsTrigger>
            <TabsTrigger value="rag" className="flex items-center gap-2 px-3">
              <Brain className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">RAG Systems</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2 px-3">
              <Settings className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">Other</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Mobile: Two rows with 2 tabs in first row and 3 tabs in second row */}
          <div className="md:hidden mb-8 space-y-4">
            {/* First row with 2 tabs */}
            <TabsList className="w-full flex justify-center gap-4">
              <TabsTrigger value="frontend" className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-2 py-2">
                <Layout className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Frontend</span>
              </TabsTrigger>
              <TabsTrigger value="backend" className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-2 py-2">
                <Server className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Backend</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Second row with 3 tabs */}
            <TabsList className="w-full flex justify-center gap-2">
              <TabsTrigger value="database" className="flex-1 max-w-[150px] flex items-center justify-center gap-1 px-1 py-2">
                <Database className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Database</span>
              </TabsTrigger>
              <TabsTrigger value="rag" className="flex-1 max-w-[150px] flex items-center justify-center gap-1 px-1 py-2">
                <Brain className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">RAG Systems</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex-1 max-w-[150px] flex items-center justify-center gap-1 px-1 py-2">
                <Settings className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Other</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {frontendSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {backendSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {databaseSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rag">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {ragSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="other">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {otherSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      icon={skill.icon}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <Card className="text-center py-6">
            <CardContent className="pt-0 flex flex-col items-center">
              <Code className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-1">20+</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </CardContent>
          </Card>
          
          <Card className="text-center py-6">
            <CardContent className="pt-0 flex flex-col items-center">
              <Layout className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-1">7+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </CardContent>
          </Card>
          
          <Card className="text-center py-6">
            <CardContent className="pt-0 flex flex-col items-center">
              <Smartphone className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-1">15+</h3>
              <p className="text-muted-foreground">Happy Clients</p>
            </CardContent>
          </Card>
          
          <Card className="text-center py-6">
            <CardContent className="pt-0 flex flex-col items-center">
              <Server className="h-10 w-10 mb-4 text-primary" />
              <h3 className="font-bold text-lg mb-1">500+</h3>
              <p className="text-muted-foreground">Cups of Coffee</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}