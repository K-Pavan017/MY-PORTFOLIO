"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Code2, Trophy, BookOpen } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

const stats = [
  { icon: Code2, value: "4+", label: "Projects Built" },
  { icon: Trophy, value: "300+", label: "DSA Problems" },
  { icon: BookOpen, value: "9.0", label: "Current CGPA" },
];

const contactChips = [
  { icon: MapPin, text: profile.location },
  { icon: Mail, text: profile.email },
  { icon: Phone, text: profile.phone },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about building intelligent, scalable solutions"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-10 items-start"
        >
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
              {profile.summary}
            </p>
            <p className="text-muted text-base leading-relaxed">
              Currently pursuing my B.Tech in Computer Science Engineering (AI &amp; ML) at JNTU
              Hyderabad, I thrive on building real-world applications that bridge the gap between
              cutting-edge AI research and production-grade software.
            </p>

            {/* Contact Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              {contactChips.map((chip) => (
                <div
                  key={chip.text}
                  className="glass-sm flex items-center gap-2 px-4 py-2.5 text-sm text-muted"
                >
                  <chip.icon size={15} className="text-accent-cyan shrink-0" />
                  <span>{chip.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass flex flex-col items-center justify-center p-6 text-center glow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon size={24} className="text-accent-violet mb-3" />
                <span className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-muted leading-tight">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}