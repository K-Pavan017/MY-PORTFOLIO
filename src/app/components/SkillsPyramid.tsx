"use client";

import { useState } from "react";
import { motion as m } from "framer-motion";
import { Brain, Cpu, Terminal, Database, Cloud, Layout } from "lucide-react";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiHuggingface,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiTailwindcss,
  SiSqlalchemy,
  SiFlask,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

interface SkillNode {
  name: string;
  icon: any;
  color: string;
  category: string;
}

// 6-row triangle structure: Row 1 (1 item), Row 2 (2 items), Row 3 (3 items), etc.
const pyramidRows: SkillNode[][] = [
  // Row 1: Core AI Language
  [
    { name: "Python", icon: SiPython, color: "text-[#3776AB] hover:shadow-[#3776AB]/30", category: "Language" },
  ],
  // Row 2: Deep Learning Engines
  [
    { name: "TensorFlow", icon: SiTensorflow, color: "text-[#FF6F00] hover:shadow-[#FF6F00]/30", category: "AI/ML" },
    { name: "PyTorch", icon: SiPytorch, color: "text-[#EE4C2C] hover:shadow-[#EE4C2C]/30", category: "AI/ML" },
  ],
  // Row 3: Generative AI & Integration
  [
    { name: "FastAPI", icon: SiFastapi, color: "text-[#009688] hover:shadow-[#009688]/30", category: "Backend" },
    { name: "Hugging Face", icon: SiHuggingface, color: "text-[#FFD21E] hover:shadow-[#FFD21E]/30", category: "AI/ML" },
    { name: "Flask", icon: SiFlask, color: "text-[#ffffff] hover:shadow-white/30", category: "Backend" },
  ],
  // Row 4: Core Program Systems
  [
    { name: "Java", icon: FaJava, color: "text-[#007396] hover:shadow-[#007396]/30", category: "Language" },
    { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6] hover:shadow-[#3178C6]/30", category: "Language" },
    { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E] hover:shadow-[#F7DF1E]/30", category: "Language" },
    { name: "SQLAlchemy", icon: SiSqlalchemy, color: "text-[#D7191C] hover:shadow-[#D7191C]/30", category: "Backend" },
  ],
  // Row 5: Web & Interface
  [
    { name: "React", icon: SiReact, color: "text-[#61DAFB] hover:shadow-[#61DAFB]/30", category: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-[#ffffff] hover:shadow-white/30", category: "Frontend" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933] hover:shadow-[#339933]/30", category: "Backend" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "text-[#06B6D4] hover:shadow-[#06B6D4]/30", category: "Frontend" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1] hover:shadow-[#4169E1]/30", category: "Database" },
  ],
  // Row 6: Infrastructure & Containers
  [
    { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248] hover:shadow-[#47A248]/30", category: "Database" },
    { name: "Redis", icon: SiRedis, color: "text-[#DC382D] hover:shadow-[#DC382D]/30", category: "Database" },
    { name: "Docker", icon: SiDocker, color: "text-[#2496ED] hover:shadow-[#2496ED]/30", category: "DevOps" },
    { name: "AWS", icon: FaAws, color: "text-[#FF9900] hover:shadow-[#FF9900]/30", category: "DevOps" },
    { name: "LangChain", icon: Brain, color: "text-[#06d6a0] hover:shadow-[#06d6a0]/30", category: "AI/ML" },
    { name: "Azure", icon: Cloud, color: "text-[#0089D6] hover:shadow-[#0089D6]/30", category: "DevOps" },
  ],
];

export default function SkillsPyramid() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  return (
    <div className="w-full py-8 flex flex-col items-center justify-center relative select-none">
      
      {/* Dynamic Skill Inspector panel above pyramid */}
      <div className="h-16 mb-8 flex flex-col items-center justify-center text-center">
        {hoveredSkill ? (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25 uppercase">
              {hoveredSkill.category}
            </span>
            <h4 className="text-lg font-extrabold text-foreground tracking-wide uppercase">
              {hoveredSkill.name}
            </h4>
          </m.div>
        ) : (
          <m.div className="text-muted/65 text-xs font-mono tracking-widest uppercase">
            Hover Node to Inspect Tech Specs
          </m.div>
        )}
      </div>

      {/* The Pyramid / Triangle Grid Container */}
      <div className="flex flex-col gap-4 items-center relative z-10">
        
        {/* Subtle background linking guidelines lines */}
        <div className="absolute top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-violet to-transparent opacity-20 pointer-events-none" />

        {pyramidRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 sm:gap-6 justify-center items-center">
            {row.map((skill) => {
              const Icon = skill.icon;
              return (
                <m.div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.25, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 450, damping: 18 }}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl glass border border-white/10 flex items-center justify-center cursor-pointer group shadow-lg transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-2xl`}
                >
                  <Icon 
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${skill.color}`} 
                  />

                  {/* Tiny indicator badge for category on corner */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-violet border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </m.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Radial backlight glow under the triangle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-violet/5 blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
