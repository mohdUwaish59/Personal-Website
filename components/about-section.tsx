"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const handleDownloadResume = async () => {
    try {
      const response = await fetch("/api/resume");
  
      if (!response.ok) {
        throw new Error("Failed to download resume");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume_Mohd_Uwaish.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 border-2 border-primary rounded-lg transform translate-x-4 translate-y-4"></div>
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <Image
                  src="assets/profile.png"
                  alt="MohammadUwaish"
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Full Stack AI Engineer & Data Scientist
            </h3>
            <p className="text-muted-foreground mb-6">
            I am a Master's student in Applied Computer Science with a specialization in Data Science at Georg-August-Universität Göttingen. 
            I have experience in full-stack development, data science, and machine learning, working on innovative solutions across multiple domains.
            </p>
            <p className="text-muted-foreground mb-6">
            My expertise includes technologies like Python, JavaScript, Django, Flask, React, and Next.js. I am passionate about Natural Langauage processing, Deep Learning, RAG Systems, building scalable web applications, 
            developing data-driven insights, and deploying machine learning models for real-world applications.
            </p>
            <p className="text-muted-foreground mb-8">
            In my free time, I enjoy exploring new technologies, working on open-source projects, and engaging with the developer community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Name:</h4>
                <p className="text-muted-foreground">Mohd Uwaish</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email:</h4>
                <p className="text-muted-foreground break-words">mohd.uwaish@stud.uni-goettingen.de</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location:</h4>
                <p className="text-muted-foreground">Göttingen, Germany</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Availability:</h4>
                <p className="text-muted-foreground">Open to opportunities</p>
              </div>
            </div>

            <Button size="lg" onClick={handleDownloadResume}>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}