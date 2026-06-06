"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Sparkles, BookOpen, Trophy, Award } from "lucide-react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";
import TalkingAvatar from "./TalkingAvatar";

const stats = [
  { icon: Trophy, value: "300+", label: "DSA Solved" },
  { icon: BookOpen, value: "9.0", label: "JNTU CGPA" },
  { icon: Award, value: "ECET 8th", label: "State Rank" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("mission");
  
  // 3D tilt coordinates state for the Profile Card
  const [profileTilt, setProfileTilt] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  // 3D tilt coordinates state for the Bio Pane
  const [bioTilt, setBioTilt] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  });

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 28; // tilt range
    const rotateX = -normalizedY * 28;

    setProfileTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleProfileMouseLeave = () => {
    setProfileTilt({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
    });
  };

  const handleBioMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 18;
    const rotateX = -normalizedY * 18;

    setBioTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    });
  };

  const handleBioMouseLeave = () => {
    setBioTilt({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          title="About Companion & Profile"
          subtitle="Interact with the console workspace to inspect background logs, core goals, and stats"
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Column 1: The 3D Interactive Profile Terminal Card (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center w-full z-20">
            <div
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={{ transform: profileTilt.transform }}
              className="relative w-full max-w-sm rounded-[2.5rem] bg-[#0c0c1b]/60 border border-white/10 backdrop-blur-xl p-6 shadow-2xl transition-all duration-200 ease-out cursor-pointer overflow-hidden group"
            >
              {/* Radial reflection glare overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity"
                style={{
                  background: `radial-gradient(circle 200px at ${profileTilt.glareX}% ${profileTilt.glareY}%, rgba(56, 189, 248, 0.4), transparent)`,
                }}
              />

              {/* The embedded TalkingAvatar component (Pixar avatar with active speech) */}
              <div className="relative z-10 w-full">
                <TalkingAvatar />
              </div>

              {/* Parallax Floating Tags */}
              <div 
                className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-accent-magenta text-foreground uppercase shadow-md transition-transform duration-300 group-hover:translate-z-10 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ transform: "translateZ(30px)" }}
              >
                AI MODEL READY
              </div>
            </div>
          </div>

          {/* Column 2: The Interactive Bio Console (lg:col-span-7) */}
          <div className="lg:col-span-7 w-full z-20">
            <div
              onMouseMove={handleBioMouseMove}
              onMouseLeave={handleBioMouseLeave}
              style={{ transform: bioTilt.transform }}
              className="w-full rounded-[2.5rem] bg-[#0c0c1b]/45 border border-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl transition-all duration-200 ease-out cursor-pointer relative overflow-hidden"
            >
              {/* Dynamic glowing panel borders */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent-cyan via-accent-violet to-transparent opacity-30" />
              
              {/* Navigation Tabs */}
              <div className="flex gap-4 border-b border-white/5 pb-4 mb-6 flex-wrap">
                {["mission", "background", "metrics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-accent-cyan/15 to-accent-violet/15 text-accent-cyan border border-accent-cyan/30"
                        : "text-muted hover:text-foreground border border-transparent"
                    }`}
                  >
                    {`[ ${tab} ]`}
                  </button>
                ))}
              </div>

              {/* Tab Contents with Framer Motion transitions */}
              <div className="min-h-[160px] flex items-center">
                <AnimatePresence mode="wait">
                  {activeTab === "mission" && (
                    <motion.div
                      key="mission"
                      initial={{ opacity: 0, x: -15, rotateY: -10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: 15, rotateY: 10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4 text-left"
                    >
                      <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                        <Sparkles size={18} className="text-accent-cyan animate-pulse" />
                        AI &amp; Automation Mission
                      </h3>
                      <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-light font-sans">
                        My primary directive is architecting the future by bridging the gap between cutting-edge neural models and secure, scalable production code.
                      </p>
                      <p className="text-muted text-sm leading-relaxed font-light">
                        I focus on implementing Retrieval-Augmented Generation (RAG) networks, predictive model backends, and full-stack environments that automate complex logic workflows.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "background" && (
                    <motion.div
                      key="background"
                      initial={{ opacity: 0, x: -15, rotateY: -10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: 15, rotateY: 10 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4 text-left"
                    >
                      <h3 className="text-xl font-extrabold text-foreground">
                        Academic Log File
                      </h3>
                      <p className="text-foreground/80 text-base leading-relaxed font-light">
                        Pursuing a Bachelor of Technology in Computer Science Engineering (AI &amp; ML) at JNTU Hyderabad, following a Diploma in AI &amp; ML with a CGPA of 9.66.
                      </p>
                      <p className="text-muted text-sm leading-relaxed font-light">
                        Deeply committed to self-learning, having completed various specialized certifications spanning deep neural networks, REST web services, databases, and container tools.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "metrics" && (
                    <motion.div
                      key="metrics"
                      initial={{ opacity: 0, x: -15, rotateY: -10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: 15, rotateY: 10 }}
                      transition={{ duration: 0.4 }}
                      className="w-full space-y-4"
                    >
                      <h3 className="text-xl font-extrabold text-foreground text-left">
                        Core System Metrics
                      </h3>
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="glass p-4 rounded-xl text-center border-white/5 hover:border-accent-cyan/20 transition-colors duration-300"
                          >
                            <stat.icon size={18} className="text-accent-violet mx-auto mb-2" />
                            <span className="text-xl md:text-2xl font-black gradient-text">
                              {stat.value}
                            </span>
                            <p className="text-[9px] font-mono text-muted uppercase mt-1">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Chips */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/5">
                <div className="glass-sm flex items-center gap-2 px-4 py-2 text-xs text-muted">
                  <MapPin size={13} className="text-accent-cyan" />
                  <span>{profile.location}</span>
                </div>
                <div className="glass-sm flex items-center gap-2 px-4 py-2 text-xs text-muted">
                  <Mail size={13} className="text-accent-cyan" />
                  <span>{profile.email}</span>
                </div>
                <div className="glass-sm flex items-center gap-2 px-4 py-2 text-xs text-muted">
                  <Phone size={13} className="text-accent-cyan" />
                  <span>{profile.phone}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}