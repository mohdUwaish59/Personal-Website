"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface SkillCardProps {
  name: string;
  level: number;
  icon?: React.ReactNode;
  delay?: number;
}

export function SkillCard({ name, level, icon, delay = 0 }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay 
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: `${level}%`,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: delay + 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay + 0.1
      }
    },
    hover: {
      rotate: 5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {icon && (
              <motion.div 
                className="mr-3 text-primary"
                variants={iconVariants}
              >
                {icon}
              </motion.div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{name}</h3>
                <motion.span 
                  className="text-muted-foreground"
                  animate={{ 
                    scale: isHovered ? 1.1 : 1,
                    color: isHovered ? "var(--primary)" : "var(--muted-foreground)"
                  }}
                >
                  {level}%
                </motion.span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  variants={progressVariants}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}