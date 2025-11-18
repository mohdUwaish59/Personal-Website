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
    detail: "Reserachng on class overlapping problem in classification task in machine learning, Implementing the benchmark system to investigate the multiple data-level handling techniques.",
    title: "Class Overlapping benchmark",
    link: "https://github.com/mohdUwaish59/Investigating-Techniques-for-Class-Overlapping-problem/tree/main",
    type: "company" as const,
    logo: "/company_logos/goe.png",
    organization: "TCS",
  },
  {
    detail: "A proxy server facilitating gender based group making participants, redirecting the group from Prolific platform to Otree experiment and redirect each group back to Prolific from experiemnt ensuring smooth Experience.",
    title: "oTree Proxy Server",
    link: "https://github.com/mohdUwaish59/dfg-project-proxy-server",
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
