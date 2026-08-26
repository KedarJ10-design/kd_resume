"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../../data/resume";
import {
  Search, ArrowRight, Download, Github, Linkedin, Mail,
  Sun, Moon, User, Briefcase, FolderOpen, Code,
  Award, GraduationCap, FileText, Phone, X,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    setIsOpen(false);
    setSearch("");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.classList.add("theme-transitioning");
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
    setTimeout(() => document.body.classList.remove("theme-transitioning"), 500);
    setIsOpen(false);
    setSearch("");
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-about", label: "Go to About", category: "Navigate", icon: <User size={16} />, action: () => scrollToSection("about"), keywords: ["about", "bio", "intro"] },
    { id: "nav-experience", label: "Go to Experience", category: "Navigate", icon: <Briefcase size={16} />, action: () => scrollToSection("experience"), keywords: ["work", "job", "intern"] },
    { id: "nav-projects", label: "Go to Projects", category: "Navigate", icon: <FolderOpen size={16} />, action: () => scrollToSection("projects"), keywords: ["projects", "portfolio", "work"] },
    { id: "nav-skills", label: "Go to Skills", category: "Navigate", icon: <Code size={16} />, action: () => scrollToSection("skills"), keywords: ["skills", "tech", "stack"] },
    { id: "nav-leadership", label: "Go to Leadership", category: "Navigate", icon: <Award size={16} />, action: () => scrollToSection("leadership"), keywords: ["leadership", "iste"] },
    { id: "nav-education", label: "Go to Education", category: "Navigate", icon: <GraduationCap size={16} />, action: () => scrollToSection("education"), keywords: ["education", "college", "degree"] },
    { id: "nav-writing", label: "Go to Publications", category: "Navigate", icon: <FileText size={16} />, action: () => scrollToSection("writing"), keywords: ["writing", "paper", "publication"] },
    { id: "nav-contact", label: "Go to Contact", category: "Navigate", icon: <Phone size={16} />, action: () => scrollToSection("contact"), keywords: ["contact", "email", "reach"] },
    // Actions
    { id: "act-resume", label: "Download Resume", category: "Actions", icon: <Download size={16} />, action: () => { setIsOpen(false); const a = document.createElement("a"); a.href = resumeData.resumePdf; a.download = "Kedar_Jadhav_Resume.pdf"; a.click(); }, keywords: ["resume", "cv", "download", "pdf"] },
    { id: "act-github", label: "Open GitHub", category: "Actions", icon: <Github size={16} />, action: () => { setIsOpen(false); window.open(resumeData.github, "_blank"); }, keywords: ["github", "code", "repo"] },
    { id: "act-linkedin", label: "Open LinkedIn", category: "Actions", icon: <Linkedin size={16} />, action: () => { setIsOpen(false); window.open(resumeData.linkedin, "_blank"); }, keywords: ["linkedin", "profile", "connect"] },
    { id: "act-email", label: "Send Email", category: "Actions", icon: <Mail size={16} />, action: () => { setIsOpen(false); window.location.href = `mailto:${resumeData.email}`; }, keywords: ["email", "mail", "contact"] },
    // Theme
    { id: "act-theme", label: "Toggle Dark/Light Theme", category: "Theme", icon: <Sun size={16} />, action: toggleTheme, keywords: ["theme", "dark", "light", "mode", "toggle"] },
  ];

  const filtered = search.trim() === ""
    ? commands
    : commands.filter((cmd) => {
        const q = search.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.category.toLowerCase().includes(q) ||
          cmd.keywords?.some((k) => k.includes(q))
        );
      });

  // Group by category
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Flatten for keyboard navigation
  const flatItems = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatItems[selectedIndex]) {
      e.preventDefault();
      flatItems[selectedIndex].action();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selected) {
        selected.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg/60 backdrop-blur-md z-[100]"
            onClick={() => { setIsOpen(false); setSearch(""); }}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-xl z-[101] bg-bg-card border border-border/60 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
              <Search size={18} className="text-text-dim shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-text text-sm placeholder:text-text-dim outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-text-dim bg-bg-elevated rounded border border-border/60">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
              {flatItems.length === 0 ? (
                <div className="px-5 py-8 text-center text-text-dim text-sm">
                  No results found for &ldquo;{search}&rdquo;
                </div>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-text-dim">
                      {category}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatItems.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          data-index={globalIndex}
                          onClick={item.action}
                          className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors cursor-pointer ${
                            globalIndex === selectedIndex
                              ? "bg-accent/10 text-accent"
                              : "text-text-muted hover:bg-bg-elevated/60 hover:text-text"
                          }`}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <span className="shrink-0 opacity-70">{item.icon}</span>
                          <span className="flex-1 text-left font-medium">{item.label}</span>
                          {globalIndex === selectedIndex && (
                            <ArrowRight size={14} className="text-accent/60 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 text-[10px] text-text-dim">
              <span>Navigate with <kbd className="font-mono mx-0.5">↑↓</kbd> • Select with <kbd className="font-mono mx-0.5">↵</kbd></span>
              <span className="hidden sm:inline">Powered by ⌘K</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
