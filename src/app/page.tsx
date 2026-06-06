import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#04040a] text-foreground overflow-x-hidden">
      {/* Dynamic scanline overlay for futuristic monitor look */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] opacity-40" />

      {/* Cybernetic header grid line */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/35 to-transparent z-40" />

      {/* Navigation */}
      <Navbar />

      {/* Main Console Frame Wrapper */}
      <main className="flex flex-col w-full relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-24 py-16">
        
        {/* The sections wrapped in cyber dashboard glass cards */}
        <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Neon terminal corner marks */}
          <div className="absolute top-4 left-4 text-accent-cyan font-mono text-[9px] opacity-40">SYS.INIT.OK // 200</div>
          <div className="absolute top-4 right-4 text-accent-violet font-mono text-[9px] opacity-40">PORTFOLIO_OS // V1.0</div>
          <div className="absolute bottom-4 left-4 text-accent-magenta font-mono text-[9px] opacity-40">GRID_ALIGN_ACTIVE</div>
          <div className="absolute bottom-4 right-4 text-muted font-mono text-[9px] opacity-25">K.P_SYS</div>
          
          <HeroSection />
        </div>

        <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2.5rem] p-1 md:p-3 overflow-hidden shadow-2xl">
          <div className="absolute top-6 left-6 w-3 h-[1px] bg-accent-cyan" />
          <div className="absolute top-6 left-6 h-3 w-[1px] bg-accent-cyan" />
          <div className="absolute bottom-6 right-6 w-3 h-[1px] bg-accent-violet" />
          <div className="absolute bottom-6 right-6 h-3 w-[1px] bg-accent-violet" />
          <AboutSection />
        </div>

        <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2.5rem] p-1 md:p-3 overflow-hidden shadow-2xl">
          <div className="absolute top-6 right-6 w-3 h-[1px] bg-accent-cyan" />
          <div className="absolute top-6 right-6 h-3 w-[1px] bg-accent-cyan" />
          <div className="absolute bottom-6 left-6 w-3 h-[1px] bg-accent-violet" />
          <div className="absolute bottom-6 left-6 h-3 w-[1px] bg-accent-violet" />
          <SkillsSection />
        </div>

        <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2.5rem] p-1 md:p-3 overflow-hidden shadow-2xl">
          <div className="absolute top-6 left-6 w-3 h-[1px] bg-accent-magenta" />
          <div className="absolute top-6 left-6 h-3 w-[1px] bg-accent-magenta" />
          <div className="absolute bottom-6 right-6 w-3 h-[1px] bg-accent-cyan" />
          <div className="absolute bottom-6 right-6 h-3 w-[1px] bg-accent-cyan" />
          <ProjectsSection />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2rem] p-2 overflow-hidden shadow-2xl">
            <EducationSection />
          </div>
          <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2rem] p-2 overflow-hidden shadow-2xl">
            <AchievementsSection />
          </div>
        </div>

        <div className="relative border border-white/5 bg-[#070710]/40 backdrop-blur-md rounded-[2.5rem] p-1 md:p-3 overflow-hidden shadow-2xl">
          <div className="absolute top-6 left-6 w-3 h-[1px] bg-accent-cyan" />
          <div className="absolute top-6 left-6 h-3 w-[1px] bg-accent-cyan" />
          <div className="absolute bottom-6 right-6 w-3 h-[1px] bg-accent-violet" />
          <div className="absolute bottom-6 right-6 h-3 w-[1px] bg-accent-violet" />
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Futuristic Floating System Status Diagnostics Indicator */}
      <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-3 glass-sm border-white/10 px-4 py-2.5 rounded-full text-[10px] font-mono font-medium text-muted">
        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
        <span>SYS.OK // SECURE</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] ml-2" />
        <span>R3F_READY</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] ml-2" />
        <span>AI_SYNTH_ACTIVE</span>
      </div>
    </div>
  );
}