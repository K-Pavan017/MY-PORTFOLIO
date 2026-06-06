"use client";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
              <a
                key={item.label}
                href={item.href}
                className="glass flex items-center gap-4 p-5 group glow-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 group-hover:bg-accent-cyan/15 transition-colors">
                  <item.icon size={20} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="pt-4">
              <p className="text-sm text-muted mb-4">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-3.5 rounded-xl border border-border text-muted transition-all hover:-translate-y-1 ${s.color}`}
                  >
                    <s.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form
              action={`mailto:${profile.email}`}
              method="GET"
              className="glass p-6 space-y-4"
            >
              <div>
                <label htmlFor="contact-name" className="block text-xs text-muted uppercase tracking-wider mb-2">
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
                <label htmlFor="contact-subject" className="block text-xs text-muted uppercase tracking-wider mb-2">
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
                <label htmlFor="contact-message" className="block text-xs text-muted uppercase tracking-wider mb-2">
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
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet text-background font-semibold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}