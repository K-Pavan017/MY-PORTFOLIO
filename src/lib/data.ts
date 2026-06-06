import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Cpu,
  Brain,
  Cloud,
  Terminal,
} from "lucide-react";

export const profile = {
  name: "K. Pavan",
  title: "AI Engineer & Full Stack Developer",
  roles: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Java Developer",
  ],
  summary:
    "AI Engineer and Full Stack Developer with hands-on experience in building end-to-end applications and AI-powered solutions using Machine Learning, Deep Learning, and LLMs, including automation workflows, and strong problem-solving skills and the ability to develop real-world scalable solutions.",
  email: "24015a6601@jntuhceh.ac.in",
  phone: "+91-7993242204",
  location: "Hyderabad, Telangana",
  github: "https://github.com/K-Pavan017",
  linkedin: "https://linkedin.com/in/pavan-k",
  youtube: "https://www.youtube.com/@yt_agent_017",
};

export const education = [
  {
    institution: "Jawaharlal Nehru Technological University Hyderabad",
    degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering (AI & ML)",
    period: "2024 – 2027",
    location: "Hyderabad",
    score: "CGPA: 9.0",
  },
  {
    institution: "Government Institute of Electronics",
    degree: "Diploma in Artificial Intelligence and Machine Learning",
    period: "2021 – 2024",
    location: "Hyderabad",
    score: "CGPA: 9.66",
  },
];

export const skills = [
  {
    category: "Programming Languages",
    icon: Terminal,
    items: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frontend Technologies",
    icon: Layout,
    items: ["ReactJS", "NextJS", "TailwindCSS", "Framer Motion", "Three.js"],
  },
  {
    category: "Backend Technologies",
    icon: Server,
    items: ["NodeJS", "ExpressJS", "REST APIs", "WebSockets", "Flask", "FastAPI"],
  },
  {
    category: "AI / ML & Data Science",
    icon: Brain,
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "LLMs",
      "RAG",
      "LangChain",
      "Hugging Face",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Databases & Caching",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Redis", "ChromaDB", "SQLAlchemy"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["Azure", "AWS", "Docker", "GitHub Actions", "CI/CD", "n8n"],
  },
];

export const projects = [
  {
    id: "rentspace",
    title: "RentSpace – Peer to Peer Rental Platform",
    description: "A modern, premium real estate rental platform inspired by Housing.com. Developed and deployed a full-stack peer-to-peer rental platform with secure authentication, real-time communication, location-based asset discovery, and cloud-hosted frontend architecture.",
    image: "/projects/rentspace.png", 
    tags: ["React", "Node.js", "Firebase", "Express", "WebSockets", "TailwindCSS"],
    github: "https://github.com/K-Pavan017/RENTSPACE", 
    live: "https://rentspace-rentals.vercel.app/home",
    features: [
      "Property Listing & Location Selection via GPS",
      "Image Upload to Firebase Storage",
      "Advanced Sorting and Location Filtering",
      "Real-time database and cloud storage",
    ],
    category: "Full Stack",
  },
  {
    id: "stockwave",
    title: "StockWave – AI Stock Prediction",
    description: "An AI-powered stock forecasting platform using XGBoost and RandomForest models with scalable REST APIs, PostgreSQL, Redis caching, and interactive analytics dashboards.",
    image: "/projects/stockwave.png",
    tags: ["Python", "Flask", "React", "PostgreSQL", "Redis", "XGBoost", "RandomForest", "yfinance"],
    github: "https://github.com/K-Pavan017/stockwave-3", 
    live: "https://stockwave-3.vercel.app/",
    features: [
      "Live stock data fetching from Yahoo Finance",
      "Historical data visualization with interactive charts",
      "AI predictions for short-term forecasts",
      "Redis-backed rate limiter and response cache",
    ],
    category: "AI/ML",
  },
  {
    id: "youtube-agent",
    title: "AI-Powered YouTube Content Automation Agent",
    description: "An AI-powered YouTube automation pipeline to automatically generate videos, synthesize voiceovers, render/edit content, and upload videos to YouTube with automated workflows.",
    image: "/projects/yt-agent.png",
    tags: ["Docker", "n8n", "Pollinations.AI", "MoviePy", "Edge-TTS", "Flask", "Python"],
    github: "https://github.com/K-Pavan017/YOUTUBE-AGENT", 
    live: "https://www.youtube.com/@yt_agent_017",
    features: [
      "End-to-end automation from story generation to YouTube upload",
      "Dynamic image generation with Flux models",
      "High-quality speech synthesis using Edge-TTS",
      "Video compositing with MoviePy",
    ],
    category: "AI/ML",
  },
  {
    id: "rag-assistant",
    title: "Enterprise RAG Assistant",
    description: "A Retrieval-Augmented Generation (RAG) agent serving as a company assistant, built with modern AI integration.",
    image: "/projects/rag-assistant.png",
    tags: ["OpenAI", "ChromaDB", "MongoDB", "React", "FastAPI"],
    github: "https://github.com/K-Pavan017/RAG-ASSISTANT",
    live: "",
    features: [
      "Semantic search and context retrieval",
      "Integration with vector databases",
      "Fast API backend",
    ],
    category: "AI/ML",
  },
];

export const achievements = [
  "Secured 8th Rank in ECET (CSE) at the state level.",
  "Solved 300+ DSA problems in LeetCode and HackerRank.",
  "Completed certifications in Full Stack Web Development, Python, Machine Learning, and Data Science from Udemy.",
  "Completed German Language A1 and A2 certification from Ramakrishna Math Institution of languages.",
];
