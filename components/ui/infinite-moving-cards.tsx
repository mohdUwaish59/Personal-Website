"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, User, GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper function to get project type styling and icon
const getProjectTypeConfig = (type: "personal" | "university" | "company") => {
  switch (type) {
    case "personal":
      return {
        icon: User,
        label: "Personal",
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      };
    case "university":
      return {
        icon: GraduationCap,
        label: "University",
        className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
      };
    case "company":
      return {
        icon: Building2,
        label: "Company",
        className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      };
  }
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    detail: string;
    title: string;
    link: string;
    type: "personal" | "university" | "company";
    logo: string | null;
    organization: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            key={item.detail}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-gray-100 flex-1 pr-3">
                  {item.title}
                </h3>
                {item.logo ? (
                  <div className="relative h-6 w-6 flex-shrink-0">
                    <Image
                      src={item.logo}
                      alt={item.organization}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  (() => {
                    const config = getProjectTypeConfig(item.type);
                    const IconComponent = config.icon;
                    return <IconComponent className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />;
                  })()
                )}
              </div>
              <div className="relative z-20 mt-4">
                <p className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400 mb-4">
                  {item.detail}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border-neutral-300 dark:border-neutral-600"
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <Github className="h-3 w-3" />
                      View Code
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
