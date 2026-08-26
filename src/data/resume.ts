export const resumeData = {
  name: "Kedar Jadhav",
  title: "Full Stack Developer · AI & 3D Web",
  tagline: "I build things that live on the internet — from AI-powered platforms to immersive 3D experiences.",
  location: "Pune, India",
  email: "jadhavkedar55@gmail.com",
  phone: "+91-7020059280",
  linkedin: "https://linkedin.com/in/kedar-jadhav",
  github: "https://github.com/KedarJ10-design",
  twitter: "",
  resumePdf: "/MARK_V_v2.pdf",

  summary: "Full Stack Developer with a track record of shipping scalable applications. Developed a multi-platform AI travel application and enterprise backend modules serving 800+ users, leveraging relational data modeling and REST APIs.",

  roles: ["Full Stack Developer", "AI Engineer", "3D Web Creator", "Freelance Developer"],

  stats: [
    { label: "Projects Delivered", value: "5+", numericValue: 5 },
    { label: "Users Impacted", value: "800+", numericValue: 800 },
    { label: "Major Projects", value: "3", numericValue: 3 },
    { label: "Years Experience", value: "2+", numericValue: 2 },
  ],

  currentlyExploring: [
    "System Design Patterns",
    "Advanced Three.js Shaders",
    "LLM Fine-tuning",
    "Kubernetes & DevOps",
    "Rust for WebAssembly",
  ],

  experience: [
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Pune, India",
      period: "Mar 2025 – Present",
      highlights: [
        "Delivered 5 client websites end-to-end: 3 business websites with HTML, CSS, React and 2 immersive 3D web platforms with MERN, WebGL, Three.js, Spline 3D",
        "Tracked performance via Google Analytics, achieving 35% increase in average user engagement across delivered sites",
      ],
      technologies: ["React", "MERN", "WebGL", "Three.js", "Spline 3D", "Google Analytics"],
    },
    {
      role: "Software Development Intern",
      company: "Automatic Infotech",
      location: "Pune, India",
      period: "Jun 2024 – Feb 2025",
      highlights: [
        "Contributed to a self-paced employee training platform on Moodle LMS, customized with HTML, CSS, and JavaScript, replacing a costly third-party tool",
        "Built the certificate generation module and employee ID management system, alongside platform features supporting lectures, quizzes, and assessments",
        "Drove adoption to ~70% of the company (~800 employees), enabling staff to upskill and earn certificates and badges",
        "Integrated Antigravity, Gemini CLI, and Claude Code into daily development workflow to accelerate coding and debugging cycles",
      ],
      technologies: ["Moodle", "HTML", "CSS", "JavaScript", "Antigravity", "Gemini CLI", "Claude Code"],
    },
  ],

  projects: [
    {
      name: "Mahayatri",
      tagline: "AI-Powered Travel & Local Guide Platform",
      period: "Oct 2025 – Present",
      description: "A comprehensive travel platform with AI itinerary planning, local guide bookings, vendor listings, and emergency SOS features.",
      highlights: [
        "Designed a 12-table relational data model supporting tourist profiles, local-guide bookings, vendor listings, and itinerary data",
        "Built initial web app with TypeScript and Firebase, then rebuilt backend with Supabase, React, and Node.js for improved scalability",
        "Integrated Gemini API for prompt-engineered AI itinerary planner, Razorpay for payments, Google Maps for SOS feature (live location sharing, emergency alerts, nearest-help lookup)",
        "Extended to a 62MB Flutter mobile app with full feature parity, maintaining ~500ms average API response time",
        "Co-authored research paper accepted at DY Patil College Conference 2026",
      ],
      technologies: ["TypeScript", "React", "Node.js", "Supabase", "Firebase", "Flutter", "Gemini API", "Razorpay", "Google Maps", "Antigravity"],
      links: {
        github: "https://github.com/KedarJ10-design/mahayatri",
        live: "",
        paper: "",
      },
      accentColor: "#6366f1",
      featured: true,
    },
    {
      name: "Urban Carbon Footprint Mapping",
      tagline: "Automation Tool · Solo Project",
      period: "Mar 2026 – Apr 2026",
      description: "Python-based web tool automating ward-level carbon footprint calculations from a research paper, replacing manual per-plot formula process.",
      highlights: [
        "Built interactive map-click interface using government data sources",
        "Cut calculation time by ~5 minutes per location compared to manual method",
        "Automated complex formula pipeline from published research",
      ],
      technologies: ["Python", "Web Scraping", "Data Visualization", "Government APIs"],
      links: {
        github: "https://github.com/KedarJ10-design/carbon-footprint",
      },
      accentColor: "#10b981",
      featured: false,
    },
    {
      name: "AI Handwritten Notes Summarizer",
      tagline: "GenAI Hackathon · Solo · 11th / 58 Teams",
      period: "Feb 2026",
      description: "Local pipeline converting handwritten notes to text using Tesseract OCR, then summarizing with local LLaMA/Qwen model using RAG.",
      highlights: [
        "Achieved ~85% OCR accuracy on handwritten notes",
        "Fully local inference with LLaMA/Qwen models via RAG",
        "Placed 11th out of 58 teams in 6-hour GenAI hackathon",
      ],
      technologies: ["Python", "Tesseract OCR", "LLaMA", "Qwen", "RAG", "Local LLMs"],
      links: {
        github: "https://github.com/KedarJ10-design/notes-summarizer",
      },
      accentColor: "#f59e0b",
      featured: false,
    },
  ],

  skills: {
    languages: ["Java", "Python", "C++", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
    frameworks: ["React", "Node.js", "Flutter", "WebGL", "Three.js", "Spline 3D"],
    backend: ["Firebase", "Supabase", "MySQL", "Relational Data Modeling", "Database Design & Management"],
    ai: ["Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "OCR (Tesseract)", "Vector Databases"],
    api: ["REST APIs", "3rd-Party Integrations", "Object-Oriented Programming", "Agile & Scrum", "Debugging", "System Design"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Antigravity", "Claude Code", "Gemini CLI"],
  },

  leadership: [
    {
      role: "Secretary",
      organization: "ISTE (APCOER)",
      location: "Pune, India",
      period: "Jun 2024 – Jun 2025",
      highlights: [
        "Led cross-functional team to execute 5+ large-scale technical events",
        "Increased participation by 30% through resource delegation and targeted promotional strategies",
      ],
    },
    {
      role: "Editor",
      organization: "ISTE (APCOER)",
      location: "Pune, India",
      period: "Jun 2023 – Jun 2024",
      highlights: [
        "Designed visual graphics, posters, and isometric UI/UX components under tight deadlines",
        "Supported institutional technical campaigns",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Anantrao Pawar College of Engineering and Research",
      location: "Pune, India",
      period: "Expected 2026",
      gpa: "7.31/10 CGPA",
      gpaValue: 7.31,
      gpaMax: 10,
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Muktangan English School & Jr. College",
      location: "Pune, India",
      period: "Jun 2020 – May 2022",
    },
  ],

  certifications: [
    { name: "Cybersecurity & Web Deployment", issuer: "Eduskills / Palo Alto Networks" },
    { name: "AI-ML Foundations", issuer: "Google" },
  ],

  languages: [
    { name: "English", level: "Fluent", proficiency: 90 },
    { name: "Hindi", level: "Native", proficiency: 100 },
    { name: "Marathi", level: "Native", proficiency: 100 },
    { name: "German", level: "B1 – Intermediate", proficiency: 50 },
  ],

  writing: [
    {
      title: "Mahayatri – A Travel Guide Application",
      venue: "DY Patil College Conference 2026",
      date: "2026",
      type: "Conference Paper",
      link: "",
    },
  ],
};