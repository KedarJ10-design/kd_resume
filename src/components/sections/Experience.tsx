"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { resumeData } from "../../data/resume";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  
  // Smooth spring animation for the timeline drawing
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="experience" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Experience</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Professional Journey
        </h2>
        <p className="text-editorial-body max-w-2xl">
          From enterprise development to freelance consulting, building expertise across the stack.
        </p>
      </motion.div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative max-w-3xl">
        {/* Static background timeline line */}
        <div className="absolute left-[31px] top-4 bottom-4 w-px bg-border/30" />
        
        {/* Animated fill line — draws as you scroll */}
        <motion.div
          className="absolute left-[31px] top-4 bottom-4 w-px origin-top"
          style={{
            scaleY: lineScaleY,
            background: "linear-gradient(180deg, var(--color-accent), var(--color-secondary))",
          }}
        />

        <div className="space-y-12">
          {resumeData.experience.map((exp, i) => (
            <TimelineCard key={`${exp.company}-${exp.role}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineCard({ exp, index }: { exp: typeof resumeData.experience[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isCurrent = exp.period.includes("Present");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-[72px] md:pl-24"
    >
      {/* Timeline dot — animated pulse for current role */}
      <div className="absolute left-6 top-8 -translate-x-1/2">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-500 ${
            isCurrent
              ? "bg-accent/20 border-accent shadow-[0_0_8px_rgba(79,70,229,0.4)]"
              : "bg-bg border-border"
          }`}
        />
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>

      <SpotlightCard className="relative group" padding="md">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-editorial-h3 text-text mb-1">
              {exp.role}
            </h3>
            <div className="text-sm font-sans text-text-muted tracking-wide uppercase">
              {exp.company} &mdash; {exp.location}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full border ${
            isCurrent 
              ? "text-accent bg-accent-dim border-accent/20" 
              : "text-text-dim bg-bg-elevated border-border/50"
          }`}>
            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
            {exp.period}
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-3 mb-6">
          {exp.highlights.map((highlight, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 + j * 0.1 + 0.3 }}
              className="flex items-start gap-3 text-text-muted"
            >
              <span className="text-warm mt-1 opacity-70">✦</span>
              <span className="font-sans leading-relaxed text-sm">{highlight}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
          {exp.technologies.map((tech) => (
            <Badge key={tech} variant="skill" size="sm">{tech}</Badge>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}