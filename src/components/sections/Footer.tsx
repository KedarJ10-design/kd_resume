"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "../../data/resume";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative py-16 md:py-24 border-t border-border/40 bg-bg texture-grain overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center text-center">
          {/* Memorable sign-off (Peak-End Rule) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <p className="text-editorial-body text-sm mb-2">
              Designed & built with
            </p>
            <div className="flex items-center justify-center gap-1.5 text-text-dim">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart size={14} className="text-warm fill-warm" />
              </motion.span>
              <span className="text-xs font-medium">
                and a lot of caffeine
              </span>
            </div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-10"
          >
            {[
              { icon: Github, href: resumeData.github, label: "GitHub" },
              { icon: Linkedin, href: resumeData.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${resumeData.email}`, label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-3 rounded-xl text-text-muted hover:text-accent hover:bg-accent-dim transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
          
          {/* Copyright & credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-text-dim text-xs uppercase tracking-widest font-sans">
              &copy; {currentYear} {resumeData.name}
            </p>
            <p className="text-text-dim/60 text-[10px] uppercase tracking-widest">
              Next.js · Three.js · Framer Motion
            </p>
          </motion.div>

          {/* Back to top button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-10 flex items-center gap-2 text-text-dim hover:text-accent transition-colors cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={14} />
            </motion.div>
            <span className="text-xs font-medium uppercase tracking-widest">Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}