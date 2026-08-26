"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { resumeData } from "../../data/resume";
import { GraduationCap, Award, Globe2 } from "lucide-react";

export function Education() {
  return (
    <Section id="education" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Background</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Education & Credentials
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Degrees */}
        {resumeData.education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard padding="lg">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-editorial-h3 text-text mb-2">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-sans text-text-muted tracking-wide uppercase mb-6">
                    {edu.institution} &mdash; {edu.location}
                  </div>
                  
                  <div className="inline-flex items-center gap-2 text-text-dim text-xs font-medium uppercase tracking-wider bg-bg-elevated px-3 py-1 rounded-full border border-border/50">
                    {edu.period}
                  </div>

                  {edu.gpaValue && (
                    <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border/60">
                      {/* Minimal GPA ring */}
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-border)" strokeWidth="2" />
                          <motion.circle
                            cx="24" cy="24" r="20"
                            fill="none"
                            stroke="var(--color-text)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={125.7}
                            initial={{ strokeDashoffset: 125.7 }}
                            whileInView={{ strokeDashoffset: 125.7 * (1 - edu.gpaValue / edu.gpaMax) }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-text font-serif">{edu.gpaValue}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{edu.gpa}</p>
                        <p className="text-xs text-text-muted">Cumulative GPA</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <Award size={20} className="text-text-muted" strokeWidth={1.5} />
                <h3 className="text-editorial-h3 text-text text-lg">Certifications</h3>
              </div>
              <div className="space-y-4">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3">
                    <span className="text-warm mt-1 opacity-70 text-xs">✦</span>
                    <div>
                      <p className="text-sm font-medium text-text">{cert.name}</p>
                      <p className="text-xs text-text-muted">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <Globe2 size={20} className="text-text-muted" strokeWidth={1.5} />
                <h3 className="text-editorial-h3 text-text text-lg">Languages</h3>
              </div>
              <div className="space-y-5">
                {resumeData.languages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-text">{lang.name}</span>
                      <span className="text-xs font-sans text-text-muted tracking-wide uppercase">{lang.level}</span>
                    </div>
                    <div className="h-px bg-border/60 w-full overflow-hidden">
                      <motion.div
                        className="h-full bg-text"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${lang.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}