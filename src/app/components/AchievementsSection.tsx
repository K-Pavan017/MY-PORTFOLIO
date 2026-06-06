"use client";

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
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
              className="glass flex items-start gap-4 p-5 glow-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-accent-magenta/10 border border-accent-magenta/20 shrink-0 mt-0.5">
                <Award size={18} className="text-accent-magenta" />
              </div>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}