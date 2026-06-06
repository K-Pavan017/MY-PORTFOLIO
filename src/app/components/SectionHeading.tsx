"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta" />
    </motion.div>
  );
}
