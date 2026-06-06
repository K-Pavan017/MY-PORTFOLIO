"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { achievements } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AchievementCard({ children }: { children: React.ReactNode }) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 14; // tilt range Y
    const rotateX = -normalizedY * 14; // tilt range X

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: tiltStyle.transform }}
      className="glass p-5 transition-all duration-200 ease-out cursor-pointer relative overflow-hidden group hover:border-accent-magenta/30 hover:shadow-xl hover:shadow-accent-magenta/5 w-full"
    >
      {/* Glare spotlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle 200px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(224, 64, 251, 0.3), transparent)`,
        }}
      />
      <div className="relative z-10 flex items-start gap-4 w-full">
        {children}
      </div>
    </div>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and certifications along the way"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="w-full"
            >
              <AchievementCard>
                <div className="p-2 rounded-lg bg-accent-magenta/10 border border-accent-magenta/20 shrink-0 mt-0.5">
                  <Award size={18} className="text-accent-magenta" />
                </div>
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                  {item}
                </p>
              </AchievementCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}