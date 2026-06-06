"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { profile } from "@/lib/data";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("./ParticleBackground"),
  { ssr: false }
);

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
      if (displayText.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [displayText, isDeleting, wordIndex, words, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return displayText;
}

const socialLinks = [
  { icon: FaGithub, href: profile.github, label: "GitHub" },
  { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FaYoutube, href: profile.youtube, label: "YouTube" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  const typedRole = useTypingEffect(profile.roles, 80, 40, 2200);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-accent-cyan font-mono text-sm md:text-base tracking-widest uppercase mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="gradient-text animate-gradient">{profile.name}</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="h-10 md:h-12 flex items-center justify-center mb-8"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80">
            {typedRole}
          </span>
          <span className="ml-0.5 w-0.5 h-7 md:h-8 bg-accent-cyan animate-blink" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-muted text-base md:text-lg leading-relaxed mb-10"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet text-background font-semibold text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-accent-violet/20 cursor-pointer"
          >
            View Projects
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-accent-cyan/40 hover:bg-accent-cyan/5"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-3 rounded-full border border-border text-muted transition-all hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/5 hover:-translate-y-1"
            >
              <s.icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-float cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}