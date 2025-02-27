"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Layout, Server, BrainCircuit, Cloud, PackageSearch } from "lucide-react";

const frontendSkills = [
  { name: "HTML/CSS", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Streamlit", level: 75 },
  { name: "Tailwind CSS", level: 85 },
];

const fullStack = [
  { name: "Python", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "Express.js", level: 85 },
  { name: "PL/SQL", level: 85 },
  { name: "GraphQL", level: 80 },
  { name: "REST API", level: 95 },
  { name: "Django", level: 75 },
  { name: "HTML/CSS", level: 90 },
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Streamlit", level: 75 },
  { name: "Tailwind CSS", level: 85 },
];
const aiMlSkills = [
  { name: "PyTorch", level: 80 },
  { name: "Scikit-Learn", level: 85 },
  { name: "Keras", level: 75 },
  { name: "Pandas", level: 80 },
  { name: "Numpy", level: 75 },
  { name: "Tableau", level: 70 },
  { name: "HuggingFace", level: 75 },
  { name: "NLP", level: 75 },
  { name: "Machine Learning", level: 80 },
  { name: "Deep Learning", level: 75 },

];

const ragSkills = [
  { name: "Langchain", level: 80 },
  { name: "LangGraph", level: 85 },
  { name: "LlamaIndex", level: 75 },
  { name: "RAGAS", level: 80 },
  { name: "Numpy", level: 75 },
  { name: "Tableau", level: 70 },
  { name: "HuggingFace", level: 75 },
];

const databaseSkills = [
  { name: "MySQL", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "ChromaDB", level: 80 },
  { name: "Pinecone", level: 80 },
];

const otherSkills = [
  { name: "Git/GitHub", level: 95 },
  { name: "Docker", level: 85 },
  { name: "Kubernetes", level: 80 },
  { name: "AWS", level: 75 },
  { name: "Heroku", level: 75 },
  { name: "CI/CD Pipelines", level: 80 },
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I have worked with a variety of technologies and tools throughout my academic and professional career.
            Here is a breakdown of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="backend" className="flex items-center gap-2">
              <Server className="h-4 w-4" /> Full Stack
            </TabsTrigger>
            <TabsTrigger value="ai-ml" className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" /> Machine Learning
            </TabsTrigger>
            <TabsTrigger value="rag" className="flex items-center gap-2">
              <PackageSearch className="h-4 w-4" /> RAG Systems
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" /> Database
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" /> Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="backend">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {fullStack.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-ml">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {aiMlSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                    </motion.div>
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
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                    </motion.div>
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
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                    </motion.div>
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
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
