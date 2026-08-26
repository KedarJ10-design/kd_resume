"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { resumeData } from "../../data/resume";

export function Leadership() {
  return (
    <Section id="leadership" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Community</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Leadership & Initiative
        </h2>
        <p className="text-editorial-body max-w-2xl mx-auto">
          Driving community impact through technical leadership and creative direction.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border" />

          <div className="space-y-12">
            {resumeData.leadership.map((role, i) => (
              <motion.div
                key={`${role.organization}-${role.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 md:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 -translate-x-1/2">
                  <div className="w-3.5 h-3.5 rounded-full border-2 bg-bg border-border" />
                </div>

                <SpotlightCard padding="md">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-editorial-h3 text-text mb-1">
                        {role.role}
                      </h3>
                      <div className="text-sm font-sans text-text-muted tracking-wide uppercase">
                        {role.organization} &mdash; {role.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-text-dim text-xs font-medium uppercase tracking-wider bg-bg-elevated px-3 py-1 rounded-full border border-border/50">
                      {role.period}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {role.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-text-muted"
                      >
                        <span className="text-secondary mt-1 opacity-70">✦</span>
                        <span className="font-sans leading-relaxed text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}