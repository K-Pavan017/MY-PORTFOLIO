"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Code2, Sparkles, Folder, Terminal as TerminalIcon, Cpu, Database, Server } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/data";

// Dynamically import 3D Laptop viewer to prevent server-side rendering errors
const ProjectViewer3D = dynamic(() => import("./ProjectViewer3D"), { ssr: false });

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

const projectColors: Record<string, string> = {
  rentspace: "#e040fb",     // Magenta
  stockwave: "#06d6a0",     // Emerald/Green
  "youtube-agent": "#7c3aed", // Violet/Purple
  "rag-assistant": "#38bdf8", // Blue/Cyan
};

// Real specifications of each project
const projectSpecs: Record<string, { db: string; api: string; core: string }> = {
  rentspace: {
    db: "Firebase Firestore",
    api: "WebSockets / Express",
    core: "React / Node.js"
  },
  stockwave: {
    db: "PostgreSQL / Redis",
    api: "Flask REST API",
    core: "XGBoost / RandomForest"
  },
  "youtube-agent": {
    db: "Local File Storage",
    api: "n8n Workflow Engine",
    core: "MoviePy / Edge-TTS"
  },
  "rag-assistant": {
    db: "ChromaDB / MongoDB",
    api: "FastAPI Endpoints",
    core: "LangChain / OpenAI"
  }
};

// Custom variants for staggered entry of elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.6, 0.3, 1] as const } 
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  features: string[];
  category: string;
}

// Wrapper component for 3D Tilt interactivity on each project card
function ProjectCard({ 
  project, 
  onClick, 
  cardVariants,
  isActive,
  activeColor,
  onHover
}: { 
  project: Project; 
  onClick: () => void; 
  cardVariants: any;
  isActive: boolean;
  activeColor: string;
  onHover: () => void;
}) {
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

    const rotateY = normalizedX * 20; // tilt range Y
    const rotateX = -normalizedY * 20; // tilt range X

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
    <motion.article
      variants={cardVariants}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHover}
      style={{ 
        transform: tiltStyle.transform,
        borderColor: isActive ? activeColor : "rgba(255, 255, 255, 0.08)",
        boxShadow: isActive ? `0 0 25px ${activeColor}15` : "none"
      }}
      onClick={onClick}
      className="glass border overflow-hidden cursor-pointer group relative transition-all duration-300 ease-out"
    >
      {/* Glare spotlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle 200px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, ${activeColor}, transparent)`,
        }}
      />

      {/* Image Cover Container */}
      <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-surface-light">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/40 to-white/5 opacity-85" />
        
        {/* Glowing category badge */}
        <div className="absolute top-4 left-4">
          <span 
            style={{ 
              color: activeColor, 
              borderColor: `${activeColor}30`, 
              boxShadow: `0 0 10px ${activeColor}20` 
            }}
            className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono tracking-wider uppercase bg-surface/90 border backdrop-blur-md"
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6 space-y-3">
        <div className="space-y-1">
          <h3 
            style={{ color: isActive ? activeColor : "white" }}
            className="text-lg font-bold transition-colors duration-300"
          >
            {project.title}
          </h3>
        </div>

        <p className="text-muted text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Primary Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[9px] font-semibold font-mono bg-white/5 text-muted border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span 
              style={{ color: activeColor, backgroundColor: `${activeColor}08`, borderColor: `${activeColor}15` }}
              className="px-2 py-0.5 rounded-full text-[9px] font-semibold font-mono border"
            >
              +{project.tags.length - 4} More
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span 
            style={{ color: activeColor }}
            className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1"
          >
            View Details &amp; Spec
            <Folder size={11} />
          </span>

          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border text-muted hover:text-foreground hover:bg-white/5 transition-colors"
              title="View Codebase"
            >
              <FaGithub size={14} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: `${activeColor}15`, 
                  color: activeColor, 
                  borderColor: `${activeColor}25` 
                }}
                className="p-2 rounded-full border hover:brightness-125 transition-all"
                title="View Deployment"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // State for hovered active project for 3D viewer
  const [activeProjectId, setActiveProjectId] = useState("rentspace");

  // 3D tilt coordinates state for the Left Dashboard Console
  const [consoleTilt, setConsoleTilt] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  const activeColor = projectColors[activeProjectId] || "#7c3aed";
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const activeSpec = projectSpecs[activeProjectId] || { db: "N/A", api: "N/A", core: "N/A" };

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Sync active project if filter results don't contain it
  useEffect(() => {
    if (filtered.length > 0 && !filtered.some((p) => p.id === activeProjectId)) {
      setActiveProjectId(filtered[0].id);
    }
  }, [activeFilter, filtered, activeProjectId]);

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 12; // tilt Y
    const rotateX = -normalizedY * 12; // tilt X

    setConsoleTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleConsoleMouseLeave = () => {
    setConsoleTilt({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
    });
  };

  return (
    <section id="projects" className="section-padding relative">
      {/* Decorative gradient backing glows */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          title="Featured Projects"
          subtitle="Real-world interactive platforms and intelligent AI agents I have designed and built"
        />

        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer border ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-accent-cyan to-accent-violet border-transparent text-background shadow-lg shadow-accent-violet/25 scale-105"
                  : "glass-sm border-white/5 text-muted hover:text-foreground hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dual-Pane Layout: Left Holographic Console, Right Cards Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* LEFT COLUMN: 3D Holographic System Control Console (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 z-20 space-y-6">
            <div
              onMouseMove={handleConsoleMouseMove}
              onMouseLeave={handleConsoleMouseLeave}
              style={{ 
                transform: consoleTilt.transform,
                borderColor: `${activeColor}20`,
                boxShadow: `0 15px 35px -5px ${activeColor}08`
              }}
              className="relative w-full rounded-[2.5rem] bg-[#0c0c1b]/60 border backdrop-blur-xl p-5 shadow-2xl transition-all duration-200 ease-out cursor-pointer overflow-hidden group"
            >
              {/* Radial reflection glare overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  background: `radial-gradient(circle 220px at ${consoleTilt.glareX}% ${consoleTilt.glareY}%, ${activeColor}, transparent)`,
                }}
              />

              {/* 3D Hologram Laptop Viewport */}
              <ProjectViewer3D activeProjectId={activeProjectId} />

              {/* Live Info details */}
              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Active Spec</span>
                    <h3 className="text-lg font-black text-foreground">{activeProject.title}</h3>
                  </div>
                  <span 
                    style={{ color: activeColor, borderColor: `${activeColor}30`, backgroundColor: `${activeColor}08` }}
                    className="px-2.5 py-0.5 rounded border text-[9px] font-mono font-bold uppercase tracking-wider"
                  >
                    {activeProject.category}
                  </span>
                </div>

                {/* Real Architectural Specs Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#05050f]/60 border border-white/5 p-2 rounded-lg text-center">
                    <Database size={12} className="mx-auto mb-1 opacity-60" style={{ color: activeColor }} />
                    <span className="text-[8px] font-mono text-muted block uppercase">Database</span>
                    <span className="text-[10px] font-mono font-semibold text-foreground truncate block">{activeSpec.db}</span>
                  </div>
                  <div className="bg-[#05050f]/60 border border-white/5 p-2 rounded-lg text-center">
                    <Server size={12} className="mx-auto mb-1 opacity-60" style={{ color: activeColor }} />
                    <span className="text-[8px] font-mono text-muted block uppercase">Interface / API</span>
                    <span className="text-[10px] font-mono font-semibold text-foreground truncate block">{activeSpec.api}</span>
                  </div>
                  <div className="bg-[#05050f]/60 border border-white/5 p-2 rounded-lg text-center">
                    <Cpu size={12} className="mx-auto mb-1 opacity-60" style={{ color: activeColor }} />
                    <span className="text-[8px] font-mono text-muted block uppercase">Core Library</span>
                    <span className="text-[10px] font-mono font-semibold text-foreground truncate block">{activeSpec.core}</span>
                  </div>
                </div>

                {/* Real Specifications & Features List Console */}
                <div className="bg-[#05050e]/95 border border-white/10 rounded-xl p-3 font-mono text-[9px] leading-relaxed text-left text-foreground/90 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] opacity-20" />
                  <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-2 text-muted">
                    <TerminalIcon size={10} style={{ color: activeColor }} />
                    <span className="uppercase text-[8px] font-semibold tracking-wider">Functional Architecture Features</span>
                  </div>
                  <div className="space-y-1.5 min-h-[90px] flex flex-col justify-start">
                    {activeProject.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-1.5 items-start">
                        <span style={{ color: activeColor }} className="font-bold shrink-0">&gt;</span>
                        <span className="text-foreground/90 leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Bento Projects Grid */}
          <div className="lg:col-span-7">
            <motion.div 
              layout 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    cardVariants={cardVariants}
                    isActive={activeProjectId === project.id}
                    activeColor={projectColors[project.id] || "#7c3aed"}
                    onHover={() => setActiveProjectId(project.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Premium Detailed Spec Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-4 md:inset-x-auto md:inset-y-12 md:max-w-3xl md:mx-auto z-50 glass border border-white/10 overflow-y-auto shadow-2xl rounded-3xl"
            >
              <div className="relative">
                {/* Header banner image cover inside modal */}
                <div className="relative w-full h-56 md:h-72">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  
                  {/* Close floating button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full glass border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-4 left-6 md:left-8">
                    <span 
                      style={{ 
                        backgroundColor: projectColors[selectedProject.id] || "#7c3aed", 
                        boxShadow: `0 0 12px ${projectColors[selectedProject.id] || "#7c3aed"}40` 
                      }}
                      className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono tracking-wider uppercase text-background"
                    >
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  {/* Specifications & Overview */}
                  <div className="space-y-3">
                    <h4 
                      style={{ color: projectColors[selectedProject.id] || "#7c3aed" }}
                      className="text-xs font-semibold tracking-wider font-mono uppercase"
                    >
                      Architecture &amp; Overview
                    </h4>
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-4">
                    <h4 
                      style={{ color: projectColors[selectedProject.id] || "#7c3aed" }}
                      className="text-xs font-semibold tracking-wider font-mono uppercase"
                    >
                      Core Functional Architecture
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {selectedProject.features.map((f, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs md:text-sm text-muted">
                          <Sparkles size={14} className="mt-1 shrink-0" style={{ color: projectColors[selectedProject.id] || "#7c3aed" }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack specifications */}
                  <div className="space-y-3">
                    <h4 
                      style={{ color: projectColors[selectedProject.id] || "#7c3aed" }}
                      className="text-xs font-semibold tracking-wider font-mono uppercase"
                    >
                      Technology Stack Details
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="skill-tag text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links / action block */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
                    >
                      <FaGithub size={16} />
                      Analyze Source Code
                    </a>
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          backgroundImage: `linear-gradient(135deg, ${projectColors[selectedProject.id] || "#7c3aed"}, #ffffff20)`,
                          color: "black" 
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] hover:brightness-110"
                      >
                        <ExternalLink size={16} />
                        Explore Live Deployment
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}