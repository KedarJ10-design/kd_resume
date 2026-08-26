"use client";

import { motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

interface MobileDockProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function MobileDock({ mobileMenuOpen, setMobileMenuOpen }: MobileDockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show dock when user scrolls past 100px
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible || mobileMenuOpen ? 0 : 100, opacity: visible || mobileMenuOpen ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden flex items-center gap-1.5 p-1.5 rounded-full bg-bg-card/75 backdrop-blur-3xl border border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/5"
      style={{ pointerEvents: visible || mobileMenuOpen ? "auto" : "none" }}
    >
      {/* Scroll to Top */}
      <button
        onClick={() => {
          setMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="p-3 rounded-full text-text-muted hover:text-accent hover:bg-bg-elevated/50 transition-all active:scale-95"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} strokeWidth={2} />
      </button>

      <div className="w-px h-6 bg-border/50 mx-1" />

      {/* Theme Toggle Wrapper */}
      <div className="rounded-full text-text-muted hover:text-text hover:bg-bg-elevated/50 transition-all">
        <ThemeToggle />
      </div>

      <div className="w-px h-6 bg-border/50 mx-1" />

      {/* Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`p-3 rounded-full transition-all active:scale-95 ${
          mobileMenuOpen ? "bg-accent/10 text-accent" : "text-text-muted hover:text-text hover:bg-bg-elevated/50"
        }`}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
      </button>
    </motion.div>
  );
}
