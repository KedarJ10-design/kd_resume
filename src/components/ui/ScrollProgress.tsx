"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let sectionOffsets: { id: string, top: number }[] = [];
    
    // Cache the absolute positions of all sections once
    const updateOffsets = () => {
      sectionOffsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.getBoundingClientRect().top + window.scrollY : 0
        };
      });
    };

    updateOffsets();
    window.addEventListener("resize", updateOffsets, { passive: true });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollPercent(Math.round(progress * 100));

          // Calculate active section based on cached offsets
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          let currentSection = sections[0].id;
          
          for (let i = sectionOffsets.length - 1; i >= 0; i--) {
            if (scrollPosition >= sectionOffsets[i].top) {
              currentSection = sectionOffsets[i].id;
              break;
            }
          }
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial call to set active section
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  const activeIndex = sections.findIndex(s => s.id === activeSection);
  const activeLabel = sections[activeIndex]?.label ?? "";

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--color-accent), var(--color-warm), var(--color-secondary))",
        }}
      />
      
      {/* Section indicator pill — visible after scrolling past hero */}
      <motion.div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[99] hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card/80 backdrop-blur-xl border border-border/40 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: scrollPercent > 5 ? 1 : 0,
          y: scrollPercent > 5 ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: scrollPercent > 5 ? "auto" : "none" }}
      >
        {/* Section dots */}
        <div className="flex items-center gap-1.5">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => {
                const el = document.getElementById(section.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative p-1.5"
              aria-label={`Go to ${section.label}`}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-accent scale-125"
                    : i < activeIndex
                    ? "bg-accent/40"
                    : "bg-border-hover"
                }`}
                whileHover={{ scale: 1.5 }}
              />
              {/* Tooltip on hover */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium text-text bg-bg-card border border-border/40 shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {section.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Divider */}
        <div className="w-px h-4 bg-border/50" />
        
        {/* Current section label */}
        <div className="w-20 flex justify-start">
          <motion.span
            key={activeLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-text-muted tracking-wide"
          >
            {activeLabel}
          </motion.span>
        </div>
        
        {/* Percentage */}
        <span className="text-[10px] font-mono text-text-dim tabular-nums">
          {scrollPercent}%
        </span>
      </motion.div>
    </>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <motion.button
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-bg-card/80 backdrop-blur-xl border border-border/50 text-text-muted hover:text-accent hover:border-accent/50 transition-all duration-300 cursor-pointer shadow-lg"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}