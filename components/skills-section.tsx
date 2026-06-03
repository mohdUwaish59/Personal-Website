"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Layout, Server, Settings, Brain, Search, Box, ChartNoAxesCombined, MessageSquare } from "lucide-react";
import { SkillCard } from "@/components/skill-card";
import { AnimatedText } from "@/components/animated-text";

const languageSkills = [
  { name: "Python", level: 95, icon: <Code className="h-5 w-5" /> },
  { name: "C", level: 75, icon: <Code className="h-5 w-5" /> },
  { name: "JavaScript", level: 90, icon: <Code className="h-5 w-5" /> },
  { name: "SQL", level: 90, icon: <Database className="h-5 w-5" /> },
  { name: "PL/SQL", level: 85, icon: <Database className="h-5 w-5" /> },
];

const machineLearningSkills = [
  { name: "Scikit-Learn", level: 90, icon: <Brain className="h-5 w-5" /> },
  { name: "PyTorch", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "TensorFlow", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "XGBoost", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "Neural Networks", level: 90, icon: <Brain className="h-5 w-5" /> },
  { name: "Transformers", level: 88, icon: <Brain className="h-5 w-5" /> },
];

const nlpSkills = [
  { name: "NLTK", level: 85, icon: <MessageSquare className="h-5 w-5" /> },
  { name: "SpaCy", level: 85, icon: <MessageSquare className="h-5 w-5" /> },
  { name: "Word2Vec", level: 80, icon: <MessageSquare className="h-5 w-5" /> },
  { name: "HuggingFace", level: 90, icon: <Brain className="h-5 w-5" /> },
  { name: "Prompt Engineering", level: 92, icon: <Code className="h-5 w-5" /> },
  { name: "Fine-Tuning", level: 88, icon: <Settings className="h-5 w-5" /> },
];

const ragSkills = [
  { name: "LangChain", level: 90, icon: <Brain className="h-5 w-5" /> },
  { name: "LangGraph", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "LlamaIndex", level: 85, icon: <Brain className="h-5 w-5" /> },
  { name: "RAGAS", level: 80, icon: <Box className="h-5 w-5" /> },
  { name: "Retrieval-Augmented Generation", level: 90, icon: <Search className="h-5 w-5" /> },
];

const dataVisualizationSkills = [
  { name: "NumPy", level: 90, icon: <Database className="h-5 w-5" /> },
  { name: "Pandas", level: 95, icon: <Database className="h-5 w-5" /> },
  { name: "Plotly", level: 85, icon: <ChartNoAxesCombined className="h-5 w-5" /> },
  { name: "Matplotlib", level: 85, icon: <ChartNoAxesCombined className="h-5 w-5" /> },
  { name: "Seaborn", level: 85, icon: <ChartNoAxesCombined className="h-5 w-5" /> },
  { name: "Tableau", level: 80, icon: <ChartNoAxesCombined className="h-5 w-5" /> },
];

const databaseSkills = [
  { name: "MySQL", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "MongoDB", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "SQL Server", level: 85, icon: <Database className="h-5 w-5" /> },
  { name: "ChromaDB", level: 80, icon: <Database className="h-5 w-5" /> },
  { name: "Pinecone", level: 80, icon: <Database className="h-5 w-5" /> },
];

const webFrameworkSkills = [
  { name: "Django", level: 85, icon: <Server className="h-5 w-5" /> },
  { name: "Flask", level: 85, icon: <Server className="h-5 w-5" /> },
  { name: "Streamlit", level: 85, icon: <Layout className="h-5 w-5" /> },
  { name: "FastAPI", level: 90, icon: <Server className="h-5 w-5" /> },
  { name: "React", level: 80, icon: <Code className="h-5 w-5" /> },
  { name: "Next.js", level: 80, icon: <Server className="h-5 w-5" /> },
];

const devopsSkills = [
  { name: "Git", level: 95, icon: <Code className="h-5 w-5" /> },
  { name: "GitLab", level: 85, icon: <Code className="h-5 w-5" /> },
  { name: "GitHub", level: 90, icon: <Code className="h-5 w-5" /> },
  { name: "Docker", level: 85, icon: <Settings className="h-5 w-5" /> },
  { name: "AWS", level: 80, icon: <Server className="h-5 w-5" /> },
  { name: "GCP", level: 80, icon: <Server className="h-5 w-5" /> },
  { name: "CI/CD", level: 85, icon: <Settings className="h-5 w-5" /> },
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

        <Tabs defaultValue="languages" className="max-w-4xl mx-auto">
          {/* Desktop: Two rows with 4 tabs each */}
          <div className="hidden md:block mb-8 space-y-2">
            {/* First row - 4 tabs */}
            <TabsList className="w-full flex justify-center gap-2">
              <TabsTrigger value="languages" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Code className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Languages</span>
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Brain className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Machine Learning</span>
              </TabsTrigger>
              <TabsTrigger value="nlp" className="flex-1 flex items-center justify-center gap-2 px-3">
                <MessageSquare className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">NLP</span>
              </TabsTrigger>
              <TabsTrigger value="rag" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Search className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">RAG Systems</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Second row - 4 tabs */}
            <TabsList className="w-full flex justify-center gap-2">
              <TabsTrigger value="dataViz" className="flex-1 flex items-center justify-center gap-2 px-3">
                <ChartNoAxesCombined className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Data Visualization</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Database className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Database</span>
              </TabsTrigger>
              <TabsTrigger value="webFrameworks" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Server className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Web Frameworks</span>
              </TabsTrigger>
              <TabsTrigger value="devops" className="flex-1 flex items-center justify-center gap-2 px-3">
                <Settings className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">DevOps</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Mobile: Two rows with 4 tabs each */}
          <div className="md:hidden mb-8 space-y-2">
            {/* First row - 4 tabs */}
            <TabsList className="w-full flex justify-center gap-1">
              <TabsTrigger value="languages" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Code className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">Lang</span>
              </TabsTrigger>
              <TabsTrigger value="ml" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Brain className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">ML</span>
              </TabsTrigger>
              <TabsTrigger value="nlp" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <MessageSquare className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">NLP</span>
              </TabsTrigger>
              <TabsTrigger value="rag" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Search className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">RAG</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Second row - 4 tabs */}
            <TabsList className="w-full flex justify-center gap-1">
              <TabsTrigger value="dataViz" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <ChartNoAxesCombined className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">Viz</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Database className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">DB</span>
              </TabsTrigger>
              <TabsTrigger value="webFrameworks" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Server className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">Web</span>
              </TabsTrigger>
              <TabsTrigger value="devops" className="flex-1 flex items-center justify-center gap-1 px-1 text-xs">
                <Settings className="h-3 w-3 flex-shrink-0" /> 
                <span className="truncate">DevOps</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="languages">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {languageSkills.map((skill, index) => (
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

          <TabsContent value="ml">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {machineLearningSkills.map((skill, index) => (
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

          <TabsContent value="nlp">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {nlpSkills.map((skill, index) => (
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

          <TabsContent value="dataViz">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {dataVisualizationSkills.map((skill, index) => (
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

          <TabsContent value="webFrameworks">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {webFrameworkSkills.map((skill, index) => (
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

          <TabsContent value="devops">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {devopsSkills.map((skill, index) => (
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
         {/* 
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
        </motion.div> */}
      </div>
    </section>
  );
}