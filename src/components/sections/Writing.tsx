"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { resumeData } from "../../data/resume";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function Writing() {
  return (
    <Section id="writing" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Writing</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Publications & Research
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-6">
        {resumeData.writing.map((paper, i) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard padding="lg">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="p-3 rounded-full border border-border/60 bg-bg text-text-muted shrink-0 hidden md:block">
                  <BookOpen size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <Badge variant="muted" size="sm" className="mb-4 text-[10px] uppercase tracking-wider">{paper.type}</Badge>
                  <h3 className="text-editorial-h3 text-text mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm font-sans text-text-muted tracking-wide uppercase mb-6">
                    {paper.venue} &mdash; {paper.date}
                  </p>
                  
                  {paper.link && (
                    <div className="pt-6 border-t border-border/60">
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-xs font-medium uppercase tracking-wider"
                      >
                        <span>Read Publication</span>
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}