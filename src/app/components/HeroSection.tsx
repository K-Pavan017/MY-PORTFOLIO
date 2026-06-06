"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { profile } from "@/lib/data";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("./ParticleBackground"),
  { ssr: false }
);

const ComputersCanvas = dynamic(
  () => import("./ComputersCanvas"),
  { ssr: false }
);

const socialLinks = [
  { icon: FaGithub, href: profile.github, label: "GitHub" },
  { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FaYoutube, href: profile.youtube, label: "YouTube" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12"
    >
      <ParticleBackground />

      {/* Structural background grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-15 z-0">
        <div className="border-r border-white/5 h-full w-full" />
        <div className="border-r border-white/5 h-full w-full" />
        <div className="border-r border-white/5 h-full w-full" />
        <div className="h-full w-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-grow flex flex-col justify-center"
      >
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Side: Tall Vertical Track Dot Line Indicator and Headline Text */}
          <div className="lg:col-span-8 flex gap-5 items-start">
            
            {/* The Blinking Track Indicator Column */}
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-accent-violet shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
              <div className="w-1 sm:h-80 h-48 bg-gradient-to-b from-accent-violet to-transparent opacity-60" />
            </div>

            {/* Typography content */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
                  Hi, I&apos;m <span className="gradient-text animate-gradient">{profile.name}</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 font-sans font-light max-w-2xl leading-relaxed">
                  I build intelligent AI agents, forecasting models, scalable backend systems, and responsive full-stack solutions.
                </p>
              </motion.div>

              {/* Tagline block */}
              <motion.p
                variants={itemVariants}
                className="text-xs uppercase tracking-widest font-mono text-accent-cyan"
              >
                &ldquo;Code is poetry. AI is the canvas.&rdquo;
              </motion.p>

              {/* Action and social bar */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet text-background font-semibold text-xs uppercase tracking-wider transition-transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer shadow-lg shadow-accent-violet/25"
                >
                  View My Work
                  <ArrowUpRight size={14} />
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-border text-foreground font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-accent-cyan/40 hover:bg-accent-cyan/5"
                >
                  <Download size={14} />
                  Resume
                </a>
                <div className="flex gap-2 pl-2 border-l border-white/10 ml-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-transparent text-muted hover:text-accent-cyan hover:border-accent-cyan/20 transition-all"
                      title={s.label}
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3D Workstation viewport at the bottom/center */}
        <motion.div
          variants={itemVariants}
          className="w-full mt-4 lg:-mt-8 flex justify-center z-10"
        >
          <ComputersCanvas />
        </motion.div>
      </motion.div>

      {/* Down chevron */}
      <div className="w-full flex justify-center">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-muted animate-float cursor-pointer z-10"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </motion.button>
      </div>
    </section>
  );
}