"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <section className="py-20 bg-white dark:bg-black dark:bg-grid-white/[0.05] relative overflow-hidden">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            What am I doing currently?
          </h2>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          </div>
        </div>
      </div>

      {/* Scrolling Cards */}
      <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
        />
      </div>
    </section>
  );
}

const testimonials = [
  {
    detail: "An e-commerce webapp in Next.JS and Supabase to sell kids fashion cloths in Indian Market",
    title: "amotogs.com",
    link: "https://amotogs.vercel.app/",
    type: "company" as const,
    logo: "/project/amotogs.png",
    organization: "TCS",
  },
  {
    detail: "A RAG powered AI chatbot full stack web application that acts as a 0th level support for the company. It is capable of handling various queries and providing accurate and helpful responses.",
    title: "ZeroDesk AI chatbot",
    link: "https://github.com/mohdUwaish59/ZeroDesk-AI-Chatbot",
    type: "company" as const,
    logo: "/favicon/favicon.png",
    organization: "TCS",
  },
  {
    detail: "A multi-agent setup where the first agent is responsible for jailbreaking the second agent and another LLM acts as a judge to analyze the communication and decide whether the jailbreak is successful or not.",
    title: "Agents Jailbreaking Agents",
    link: "https://github.com/mohdUwaish59/Agents-Jailbreaking-Agents",
    type: "university" as const,
    logo: "/company_logos/goe.png",
    organization: "University of Göttingen",
  },
  {
    detail: "Building model to predict electricity price and demand using Time-series data and Sentiment Score of new articles and social media discussion.",
    title: "Research Assistant work",
    link: "https://www.ieg.fraunhofer.de/de/projekte/nGEL.html",
    type: "university" as const,
    logo: "/company_logos/fraunhofer.jpg",
    organization: "Fraunhofer",
  },

];
