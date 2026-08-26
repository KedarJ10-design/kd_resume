"use client";

import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { resumeData } from "../../data/resume";
import { Code, Server, Brain, Globe, Wrench, Terminal } from "lucide-react";

const skillCategories = [
  { key: "languages", label: "Languages", icon: Code, color: "var(--color-accent)" },
  { key: "frameworks", label: "Frameworks & 3D", icon: Globe, color: "var(--color-secondary)" },
  { key: "backend", label: "Backend & DB", icon: Server, color: "var(--color-warm)" },
  { key: "ai", label: "AI & Data", icon: Brain, color: "#6366f1" },
  { key: "api", label: "API & Practices", icon: Wrench, color: "#10b981" },
  { key: "tools", label: "Dev & AI Tools", icon: Terminal, color: "#f59e0b" },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState("languages");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeCategory = skillCategories.find(c => c.key === activeTab)!;
  const activeSkills = resumeData.skills[activeTab as keyof typeof resumeData.skills] as string[];
  
  // Which projects use the hovered skill
  const matchingProjects = hoveredSkill
    ? resumeData.projects.filter(p =>
        p.technologies.some(t => t.toLowerCase().includes(hoveredSkill.toLowerCase()))
      ).map(p => p.name)
    : [];

  return (
    <Section id="skills" background="none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Competencies</Badge>
        <h2 className="text-editorial-h2 text-text mb-4">
          Tech Stack
        </h2>
        <p className="text-editorial-body max-w-2xl mx-auto">
          Proficient across the full stack with specialization in AI integration and 3D web technologies.
        </p>
      </motion.div>

      {/* ─── Tabbed Interface (Miller's Law: show ≤7 items at a time) ─── */}
      <LayoutGroup>
        {/* Tab bar */}
        <div className="relative mb-12 -mx-6 px-6 md:mx-0 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar justify-start md:justify-center gap-2 pb-4 md:pb-0"
          >
            {skillCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveTab(category.key)}
                className={`snap-start relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === category.key
                    ? "text-text"
                    : "text-text-muted hover:text-text hover:bg-bg-elevated/50"
                }`}
              >
              {activeTab === category.key && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 rounded-xl bg-accent/10 border border-accent/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <category.icon size={16} className="relative z-10" strokeWidth={1.5} />
              <span className="relative z-10 hidden sm:inline">{category.label}</span>
            </button>
          ))}
        </motion.div>
        </div>

        {/* Active tab content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard padding="lg" className="text-center">
                {/* Category header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-accent-dim" style={{ color: activeCategory.color }}>
                    <activeCategory.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-editorial-h3 text-text">{activeCategory.label}</h3>
                </div>

                {/* Skills as interactive badges */}
                <div className="flex flex-wrap justify-center gap-3">
                  {activeSkills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <Badge
                        variant="muted"
                        size="md"
                        className={`cursor-default transition-all duration-300 text-sm ${
                          hoveredSkill === skill
                            ? "ring-2 ring-accent/50 bg-accent-dim text-accent scale-105"
                            : "hover:bg-bg-elevated"
                        }`}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Skill context — shows which projects use it */}
                <AnimatePresence>
                  {hoveredSkill && matchingProjects.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-border/40"
                    >
                      <p className="text-xs text-text-dim uppercase tracking-widest mb-2">Used in</p>
                      <p className="text-sm font-medium text-text-muted">
                        {matchingProjects.join(" · ")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Skill count */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <span className="text-xs text-text-dim">
                    {activeSkills.length} skills in this category
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {/* ─── Compact full overview grid (secondary, below tabs) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-16"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.key}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <SpotlightCard
              padding="md"
              className={`cursor-pointer transition-all duration-300 ${
                activeTab === category.key ? "ring-1 ring-accent/30" : ""
              }`}
              onClick={() => {
                setActiveTab(category.key);
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-text-muted shrink-0" style={{ color: activeTab === category.key ? activeCategory.color : undefined }}>
                  <category.icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-text">
                  {category.label}
                </h3>
                <span className="ml-auto text-[10px] text-text-dim font-mono">
                  {(resumeData.skills[category.key as keyof typeof resumeData.skills] as string[]).length}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(resumeData.skills[category.key as keyof typeof resumeData.skills] as string[]).map((skill) => (
                  <Badge
                    key={skill}
                    variant="muted"
                    size="sm"
                    className="text-[10px]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}