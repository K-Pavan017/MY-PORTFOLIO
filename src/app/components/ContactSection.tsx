"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

const contactInfo = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: "Location", value: profile.location, href: "#" },
];

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: profile.github, color: "hover:text-foreground hover:border-foreground/30" },
  { icon: FaLinkedin, label: "LinkedIn", href: profile.linkedin, color: "hover:text-accent-blue hover:border-accent-blue/30" },
  { icon: FaYoutube, label: "YouTube", href: profile.youtube, color: "hover:text-red-400 hover:border-red-400/30" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function ContactInfoCard({ href, children }: { href: string; children: React.ReactNode }) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 16; // tilt range Y
    const rotateX = -normalizedY * 16; // tilt range X

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
    <a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: tiltStyle.transform }}
      className="glass flex items-center gap-4 p-5 transition-all duration-200 ease-out cursor-pointer relative overflow-hidden group hover:border-accent-cyan/30 hover:shadow-xl hover:shadow-accent-cyan/5 w-full"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle 180px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(56, 189, 248, 0.35), transparent)`,
        }}
      />
      <div className="relative z-10 flex items-center gap-4 w-full">
        {children}
      </div>
    </a>
  );
}

function ContactFormCard({ children, action, method }: { children: React.ReactNode; action: string; method: string }) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const rotateY = normalizedX * 10; // slightly smaller tilt range
    const rotateX = -normalizedY * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
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
    <form
      action={action}
      method={method}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: tiltStyle.transform }}
      className="glass p-6 space-y-4 transition-all duration-200 ease-out relative overflow-hidden group hover:border-accent-violet/30 hover:shadow-xl hover:shadow-accent-violet/5"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity"
        style={{
          background: `radial-gradient(circle 240px at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(124, 58, 237, 0.3), transparent)`,
        }}
      />
      <div className="relative z-10 w-full space-y-4">
        {children}
      </div>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Let's connect!"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            {contactInfo.map((item) => (
              <ContactInfoCard key={item.label} href={item.href}>
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 group-hover:bg-accent-cyan/15 transition-colors">
                  <item.icon size={20} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                </div>
              </ContactInfoCard>
            ))}

            <div className="pt-4">
              <p className="text-sm text-muted mb-4 font-mono">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-3.5 rounded-xl border border-border bg-white/[0.02] text-muted transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 ${s.color}`}
                  >
                    <s.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContactFormCard
              action={`mailto:${profile.email}`}
              method="GET"
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs text-muted uppercase tracking-wider mb-2 font-mono">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-xs text-muted uppercase tracking-wider mb-2 font-mono">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs text-muted uppercase tracking-wider mb-2 font-mono">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="body"
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet text-background font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer shadow-lg shadow-accent-violet/25"
              >
                <Send size={16} />
                Send Message
              </button>
            </ContactFormCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}