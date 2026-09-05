"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { AnimatedCounter, Typewriter, ScrollIndicator, TextReveal } from "../ui/Animations";
import { resumeData } from "../../data/resume";
import { Badge } from "../ui/Badge";
import { CodeSnippet } from "../ui/CodeSnippet";

const Hero3D = dynamic(() => import("../three/Hero3D").then(mod => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-bg" />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: 3D background scrolls at 0.5x speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Content fades & moves up as user scrolls past
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Parallax 3D background */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: bgY }}>
        <Hero3D />
      </motion.div>

      {/* Floating code snippet — desktop only */}
      <CodeSnippet />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 pointer-events-auto"
          >
            <Badge variant="outline" size="md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 inline-block animate-pulse" />
              Available for new opportunities
            </Badge>
          </motion.div>

          {/* Name - Editorial Typography with TextReveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h1 className="text-editorial-display text-text">
              <TextReveal text={resumeData.name} delay={0.3} staggerDelay={0.08} />
              <span className="text-warm">.</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-editorial-h3 text-text-muted mb-8 h-10 italic"
          >
            <Typewriter
              words={resumeData.roles}
              className="font-serif"
              typingSpeed={70}
              deletingSpeed={40}
              pauseTime={3000}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-editorial-body max-w-2xl mb-12"
          >
            {resumeData.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-16 pointer-events-auto"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group w-full sm:w-auto"
            >
              Selected Work
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group"
              onClick={() => {
                const link = document.createElement("a");
                link.href = resumeData.resumePdf;
                link.download = "Kedar_Jadhav_Resume.pdf";
                link.click();
              }}
            >
              <Download size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download Résumé
            </Button>
          </motion.div>

          {/* Animated stat counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-wrap gap-8 md:gap-16 pointer-events-auto border-t border-border/60 pt-8"
          >
            {resumeData.stats.map((stat, i) => (
              <div key={stat.label} className="group">
                <div className="text-3xl md:text-4xl font-serif text-text mb-1 flex items-baseline">
                  <span>{stat.value}</span>
                </div>
                <div className="text-xs font-sans text-text-dim uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Social links — floating side nav on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6 hidden lg:flex z-20"
      >
        <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-x-1" aria-label="GitHub">
          <Github size={22} strokeWidth={1.5} />
        </a>
        <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-x-1" aria-label="LinkedIn">
          <Linkedin size={22} strokeWidth={1.5} />
        </a>
        <a href={`mailto:${resumeData.email}`} className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-x-1" aria-label="Email">
          <Mail size={22} strokeWidth={1.5} />
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <ScrollIndicator targetId="about" />
      </motion.div>
    </section>
  );
}