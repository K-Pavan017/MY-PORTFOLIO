"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import SkillsPyramid from "./SkillsPyramid";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      {/* Ambient glowing backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative text-center">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="An interactive pyramid mapping my technical capabilities from core AI foundations downwards"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-center mt-6"
        >
          <SkillsPyramid />
        </motion.div>
      </div>
    </section>
  );
}