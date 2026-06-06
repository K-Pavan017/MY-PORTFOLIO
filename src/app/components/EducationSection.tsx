"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education } from "@/lib/data";

const timelineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function EducationCard({ children }: { children: React.ReactNode }) {
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

    const rotateY = normalizedX * 18; // tilt range Y
    const rotateX = -normalizedY * 18; // tilt range X

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
      className="glass p-6 transition-all duration-200 ease-out cursor-pointer relative overflow-hidden group hover:border-accent-cyan/30 hover:shadow-xl hover:shadow-accent-cyan/5"
    >
      {/* Glare spotlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-25 transition-opacity"
        style={{
          background: `radial-gradient(circle 180px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(56, 189, 248, 0.35), transparent)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Education"
          subtitle="My academic journey in Computer Science and AI"
        />

        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-magenta opacity-30" />

          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              variants={itemVariants}
              className="relative pl-16 md:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-6 top-1.5 w-4 h-4 rounded-full border-2 border-accent-cyan bg-background shadow-[0_0_12px_rgba(6,214,160,0.3)] z-10" />

              <EducationCard>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
                    <GraduationCap size={18} className="text-accent-cyan" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-violet/15 text-accent-violet border border-accent-violet/25">
                    {edu.score}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  {edu.degree}
                </h3>
                <p className="text-accent-cyan text-sm font-medium mb-3">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-muted" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-muted" />
                    {edu.location}
                  </span>
                </div>
              </EducationCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}