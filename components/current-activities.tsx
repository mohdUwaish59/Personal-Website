"use client";

import * as React from "react";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function CurrentWork() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">What I am doing currently!</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl max-h-[50vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-foreground">Current Work</DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              Here's a quick overview of what I'm currently working on.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Development Projects */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Development
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-foreground">
                    BioBrain - NEET RAG Web App
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A web application that helps NEET aspirants by generating mock tests,
                    recommending related questions, and providing contextual answers using RAG-based
                    AI pipelines. Built with Next.js, LangChain, and GPT-4.
                  </p>
                  <div className="text-xs text-blue-600 space-x-4">
                    <Link href="https://github.com/mohdUwaish59/BioBrain" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                    <Link href="https://biobrain-demo.vercel.app" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-foreground">
                    Full-stack Portfolio Website
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A personal portfolio website where I showcase my projects, skills, and research
                    work. Built with React, Next.js, and Tailwind CSS, with plans to integrate a blog
                    and more interactive features.
                  </p>
                  <div className="text-xs text-blue-600 space-x-4">
                    <Link href="https://github.com/mohdUwaish59/Personal-Website" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                    <Link href="https://www.mohammaduwaish.com/" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Projects */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Research
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-foreground">
                    Jailbreaking LLMs (Agents Jailbreaking Agents)
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I am exploring whether LLM agents can jailbreak others through multi-turn
                    persuasive dialogues. We simulate attacker (PERSUADER) and victim (PERSUADEE)
                    models, evaluate jailbreak success using Llama-Guard and GPT-4o, and apply safety
                    benchmarks like JailbreakBench. The work contributes to understanding alignment
                    vulnerabilities in multi-agent LLM systems.
                  </p>
                  <div className="text-xs text-blue-600 space-x-4">
                    <Link href="https://github.com/mohdUwaish59/Agents-Jailbreaking-Agents" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                    <Link href="https://github.com/mohdUwaish59/Agents-Jailbreaking-Agents" target="_blank" rel="noopener noreferrer">
                      Report
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-foreground">
                    Architecture Investigation of Medical LLMs (Me-LLaMA)
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I am investigating the architecture and design of Me-LLaMA, a family of
                    domain-specific medical large language models. Me-LLaMA builds on LLaMA2
                    (13B/70B) through extensive continual pre-training and instruction tuning using
                    biomedical literature and real-world clinical notes (129B tokens and 214K
                    instructions). My work focuses on analyzing architectural trade-offs between general
                    and domain-specific adaptation, instruction tuning strategies, and evaluating
                    zero-shot vs. supervised learning performance across 12 biomedical NLP tasks. The
                    study also explores Me-LLaMA’s clinical reasoning capabilities, model scalability,
                    and its efficiency compared to commercial models like ChatGPT and GPT-4.
                  </p>
                  <div className="text-xs text-blue-600 space-x-4">
                    <Link href="" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                    <Link href="" target="_blank" rel="noopener noreferrer">
                      Report
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="mt-6">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
