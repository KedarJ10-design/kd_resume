"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { resumeData } from "../../data/resume";
import { Github, ExternalLink, Globe, ArrowUpRight, FileText, Layers, Sparkles } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";

export function Projects() {
  const featuredProject = resumeData.projects.find(p => p.featured);
  const otherProjects = resumeData.projects.filter(p => !p.featured);

  return (
    <Section id="projects" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Selected Works</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Featured Projects
        </h2>
        <p className="text-editorial-body max-w-2xl">
          A selection of robust systems, AI research, and scalable applications built with modern stacks.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* ─── Featured Project — Von Restorff Effect: visually isolated ─── */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            {/* Animated gradient border for visual isolation */}
            <div className="gradient-border-animated">
              <SpotlightCard className="relative overflow-hidden group !rounded-[1rem]" padding="none">
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Visual placeholder with enhanced styling */}
                  <div className="lg:w-2/5 bg-bg-elevated flex items-center justify-center p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-tactile opacity-60" />
                    {/* Animated glow */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${featuredProject.accentColor}40, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="p-4 rounded-2xl bg-bg-card/60 backdrop-blur-sm border border-border/30">
                        <Layers size={40} className="text-accent" strokeWidth={1} />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        <Sparkles size={10} className="mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col bg-bg-card">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-editorial-h3 text-text mb-2 text-2xl lg:text-3xl">
                          {featuredProject.name}
                        </h3>
                        <p className="text-sm font-sans text-text-muted tracking-wide uppercase">
                          {featuredProject.tagline} &mdash; {featuredProject.period}
                        </p>
                      </div>
                    </div>

                    <p className="text-editorial-body mb-8 text-base">
                      {featuredProject.description}
                    </p>

                    <ul className="space-y-3 mb-10 flex-1">
                      {featuredProject.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.5 }}
                          className="flex items-start gap-3 text-text-muted"
                        >
                          <span className="text-warm mt-1 opacity-70">✦</span>
                          <span className="font-sans leading-relaxed">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.technologies.map((tech) => (
                        <Badge key={tech} variant="skill" size="sm">{tech}</Badge>
                      ))}
                    </div>

                    <div className="flex gap-6 pt-6 border-t border-border/40 mt-auto">
                      {featuredProject.links.github && (
                        <a href={featuredProject.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider">
                          <Github size={16} strokeWidth={1.5} />
                          <span>Source</span>
                        </a>
                      )}
                      {featuredProject.links.paper && (
                        <a href={featuredProject.links.paper} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider">
                          <FileText size={16} strokeWidth={1.5} />
                          <span>Paper</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        )}

        {/* ─── Other projects — grid cards ─── */}
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="relative h-full">
            <SpotlightCard className="h-full flex flex-col group overflow-hidden" padding="none">
              <div className="h-48 bg-bg-elevated flex items-center justify-center border-b border-border/40 group-hover:border-warm/50 transition-all duration-700 relative overflow-hidden group-hover:scale-[1.02]">
                 <div className="absolute inset-0 bg-grid-tactile opacity-30" />
                 {/* Warm color glow (Orange in light, Purple in dark) */}
                 <div
                   className="absolute inset-0 opacity-10 dark:opacity-20 group-hover:opacity-40 dark:group-hover:opacity-50 transition-opacity duration-500"
                   style={{
                     background: `radial-gradient(circle at 50% 50%, var(--color-warm), transparent 70%)`,
                   }}
                 />
                 <Globe size={32} className="text-text-muted relative z-10" strokeWidth={1} />
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-1 bg-bg-card">
                <h3 className="text-editorial-h3 text-text mb-2">
                  {project.name}
                </h3>
                <p className="text-xs font-sans text-text-muted tracking-wide uppercase mb-4">
                  {project.tagline} &mdash; {project.period}
                </p>
                
                <p className="text-editorial-body text-sm mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="skill" size="sm" className="text-[10px]">{tech}</Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="muted" size="sm" className="text-[10px]">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-border/40">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-xs font-medium uppercase tracking-wider">
                      <Github size={14} strokeWidth={1.5} />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 flex justify-center"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open(resumeData.github, "_blank")}
          className="min-h-[48px]"
        >
          View GitHub Archive
          <ArrowUpRight size={16} className="ml-2" />
        </Button>
      </motion.div>
    </Section>
  );
}