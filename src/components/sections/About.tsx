"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { Ticker } from "../ui/Animations";
import { resumeData } from "../../data/resume";
import { Code, Brain, Globe, Sparkles } from "lucide-react";

export function About() {
  const focusAreas = [
    { icon: Code, title: "Full Stack Development", desc: "Building scalable web applications with React, Node.js, and modern tooling" },
    { icon: Brain, title: "AI & Machine Learning", desc: "Integrating LLMs, RAG pipelines, and local inference into production apps" },
    { icon: Globe, title: "3D Web & Graphics", desc: "Creating immersive experiences with Three.js, WebGL, and Spline" },
    { icon: Sparkles, title: "Developer Experience", desc: "Optimizing workflows with AI-assisted coding tools and automation" },
  ];

  return (
    <Section id="about" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">About</Badge>
        <h2 className="text-editorial-h2 text-text mb-6">
          Building at the intersection of
          <br className="hidden md:block" />
          <span className="italic text-text-muted"> AI, Web & 3D</span>
        </h2>
        <p className="text-editorial-body leading-relaxed max-w-3xl mx-auto">
          {resumeData.summary}
        </p>
      </motion.div>

      {/* Focus areas */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-2 gap-6"
      >
        {focusAreas.map((area, i) => (
          <SpotlightCard key={area.title} padding="lg">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-full border border-border/60 bg-bg text-text-muted shrink-0">
                <area.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-editorial-h3 text-text mb-2 text-lg">{area.title}</h3>
                <p className="text-editorial-body text-sm">{area.desc}</p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </motion.div>

      {/* Currently exploring ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-20 pt-10 border-t border-border/40"
      >
        <div className="flex items-center gap-4 mb-6 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-warm inline-block" />
          <span className="text-xs font-sans text-text-muted uppercase tracking-widest">Currently exploring</span>
          <span className="w-1.5 h-1.5 rounded-full bg-warm inline-block" />
        </div>
        <div className="py-4">
          <Ticker items={resumeData.currentlyExploring} speed={30} />
        </div>
      </motion.div>
    </Section>
  );
}