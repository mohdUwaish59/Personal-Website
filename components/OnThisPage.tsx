"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heading {
  text: string;
  id: string;
  level: number;
}

const OnThisPage = ({ htmlContent }: { htmlContent: string }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!htmlContent) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    // Get both h2 and h3 elements
    const h2Elements = tempDiv.querySelectorAll("h2");
    //const h3Elements = tempDiv.querySelectorAll("h3");
    
    const allHeadings: Heading[] = [];
    
    // Combine h2 and h3 in document order
    const allElements = tempDiv.querySelectorAll("h2");
    Array.from(allElements).forEach((element) => {
      allHeadings.push({
        text: element.textContent || "",
        id: element.id || "",
        level: element.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(allHeadings);
  }, [htmlContent]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update active state immediately
      setActiveId(id);
    }
  };

  return (
    <div className="w-full max-w-xs sticky top-24 self-start bg-card border border-border p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-foreground">On This Page</h2>
      <ul className="text-sm space-y-1 border-l-2 border-border pl-3">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;
          
          return (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={isH3 ? "ml-3" : ""}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`block py-1.5 px-2 -ml-2 rounded transition-all duration-200 ${
                  isActive
                    ? "text-[#39b6a6] font-semibold bg-[#39b6a6]/10 border-l-2 border-[#39b6a6] -ml-[10px] pl-[10px]"
                    : "text-muted-foreground hover:text-[#39b6a6] hover:bg-muted/50"
                } ${isH3 ? "text-xs" : ""}`}
              >
                {heading.text}
              </a>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default OnThisPage;
