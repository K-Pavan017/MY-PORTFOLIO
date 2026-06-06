"use client";

import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { profile } from "@/lib/data";

const socials = [
  { icon: FaGithub, href: profile.github, label: "GitHub" },
  { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FaYoutube, href: profile.youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-semibold">
            <span className="gradient-text">&lt;</span>
            <span className="text-foreground">{profile.name.split(" ")[1] || profile.name}</span>
            <span className="gradient-text"> /&gt;</span>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 rounded-lg text-muted hover:text-accent-cyan transition-colors"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted flex items-center gap-1">
            &copy; {new Date().getFullYear()} {profile.name}. Built with{" "}
            <Heart size={12} className="text-accent-magenta inline" fill="currentColor" /> and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}