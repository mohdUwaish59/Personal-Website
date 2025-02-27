"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

// Experience data from your resume
const experiences = [
    {
        id: 1,
        title: "Student Assistant - Software Developer",
        company: "Niedersächsische Staats- und Universitätsbibliothek Göttingen",
        location: "Göttingen, Germany",
        period: "Sep 2024 - Present",
        description: "Supporting the development and maintenance of academic web portals using Next.js, assisting with code implementation, documentation, and testing.",
        achievements: [
          "Developed and maintained 5+ reusable UI components for the digital library web portal using Next.js, improving code consistency and reusability.",
          "Assisted in writing technical documentation for 80% of newly implemented features, reducing onboarding time for new team members by 25%.",
          "Reviewed and tested approximately 5-7 pull requests per week, helping maintain code quality and reduce production bugs.",
          "Contributed to CI/CD improvements by automating 2+ small tasks, reducing deployment overhead by 15%.",
          "Helped implement bilingual (German/English) content management features for 100+ scholarly articles, improving accessibility for international users.",
          "Set up and maintained local development environments using Docker and ddev, reducing setup time for new contributors by 40%."
        ],
        skills: ["Next.js", "Technical Documentation", "Code Review", "CI/CD", "Docker", "ddev", "Git", "GitLab"]
    },
    
  {
    id: 2,
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
    skills: ["Django", "oTree", "Frontend Technologies", "Data Analysis", "Statistical Methods", "Visualization"]
  },
  {
    id: 3,
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
    skills: ["HTML", "CSS", "JavaScript", "Java", "PL/SQL", "Oracle Database", "Agile"]
  }
];

const WorkExperience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            My professional journey and the valuable experience I've gained throughout my career.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Timeline>
            {experiences.map((experience, index) => (
              <Timeline.Item key={experience.id} active={index === 0}>
                <Timeline.Point icon={<Briefcase className="h-4 w-4" />} />
                <Timeline.Content>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{experience.title}</h3>
                            <p className="text-primary font-medium">{experience.company}</p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {experience.period}
                            </Badge>
                            <Badge variant="outline" className="ml-2 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {experience.location}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{experience.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Achievements:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;