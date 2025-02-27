"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Database, Layout, Server, Settings, Smartphone } from "lucide-react";

const frontendSkills = [
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Framer Motion", level: 85 },
];

const backendSkills = [
  { name: "Node.js", level: 90 },
  { name: "Express", level: 85 },
  { name: "Python", level: 80 },
  { name: "Django", level: 75 },
  { name: "GraphQL", level: 85 },
  { name: "REST API", level: 95 },
];

const databaseSkills = [
  { name: "MongoDB", level: 90 },
  { name: "PostgreSQL", level: 85 },
  { name: "MySQL", level: 80 },
  { name: "Firebase", level: 85 },
  { name: "Supabase", level: 80 },
];

const otherSkills = [
  { name: "Git/GitHub", level: 95 },
  { name: "Docker", level: 80 },
  { name: "AWS", level: 75 },
  { name: "CI/CD", level: 80 },
  { name: "Testing", level: 85 },
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
            I have worked with a variety of technologies and tools throughout my career.
            Here is a breakdown of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="frontend" className="flex items-center gap-2">
              <Layout className="h-4 w-4" /> Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="flex items-center gap-2">
              <Server className="h-4 w-4" /> Backend
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" /> Database
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {frontendSkills.map((skill, index) => (
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

          <TabsContent value="backend">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {backendSkills.map((skill, index) => (
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