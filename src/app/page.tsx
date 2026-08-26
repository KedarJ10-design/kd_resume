"use client";

import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Experience } from "../components/sections/Experience";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";
import { Leadership } from "../components/sections/Leadership";
import { Education } from "../components/sections/Education";
import { Writing } from "../components/sections/Writing";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { ScrollProgress, ScrollToTop } from "../components/ui/ScrollProgress";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { CommandPalette } from "../components/ui/CommandPalette";
import { EasterEgg } from "../components/ui/EasterEgg";
import { GitHubActivity } from "../components/sections/GitHubActivity";
import { MobileDock } from "../components/ui/MobileDock";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resume";
import { Menu, X } from "lucide-react";

const sections = ["about", "experience", "projects", "skills", "leadership", "education", "writing", "contact"];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let sectionOffsets: { id: string, top: number }[] = [];
    
    // Cache the absolute positions of all sections once, instead of reading DOM on every scroll
    const updateOffsets = () => {
      sectionOffsets = ["hero", ...sections].map(id => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.getBoundingClientRect().top + window.scrollY : 0
        };
      });
    };

    // Calculate on mount and when window resizes
    updateOffsets();
    window.addEventListener("resize", updateOffsets, { passive: true });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);

          if (scrollY > lastScrollY && scrollY > 100) {
            setNavVisible(false);
          } else {
            setNavVisible(true);
          }
          setLastScrollY(scrollY);

          // Calculate active section based on cached offsets
          const scrollPosition = scrollY + window.innerHeight / 3;
          let currentSection = "hero";
          
          for (let i = sectionOffsets.length - 1; i >= 0; i--) {
            if (scrollPosition >= sectionOffsets[i].top) {
              currentSection = sectionOffsets[i].id;
              break;
            }
          }
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOffsets);
    };
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <CommandPalette />
      <EasterEgg />

      {/* Desktop Navigation */}
      <AnimatePresence mode="wait">
        {navVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
              isScrolled ? "bg-bg/80 backdrop-blur-2xl border-b border-border/30 shadow-xl shadow-black/20" : "bg-transparent"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
              <div className="flex items-center justify-between h-16 md:h-18">
                {/* Logo */}
                <motion.a
                  href="#hero"
                  className="text-lg md:text-xl font-bold group"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="gradient-text-hero">{resumeData.name.split(" ")[0]}</span>
                  <span className="text-text-muted font-normal ml-1 text-sm hidden sm:inline">/ portfolio</span>
                </motion.a>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-0.5">
                  {sections.map((section) => (
                    <motion.a
                      key={section}
                      href={`#${section}`}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === section
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:text-text hover:bg-bg-elevated/50"
                      }`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.a>
                  ))}
                  <div className="w-px h-5 bg-border/50 mx-1" />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <MobileDock mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-card/95 backdrop-blur-2xl border-t border-border/50 rounded-t-3xl shadow-2xl shadow-black/40 max-h-[70vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-border-hover rounded-full mx-auto mt-3 mb-6" />
              <div className="px-6 pb-8 space-y-1">
                {sections.map((section, i) => (
                  <motion.a
                    key={section}
                    href={`#${section}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                      activeSection === section
                        ? "bg-accent/10 text-accent"
                        : "text-text-muted hover:text-text hover:bg-bg-elevated/50"
                    }`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                  >
                    <span className={`w-2 h-2 rounded-full ${activeSection === section ? "bg-accent" : "bg-border-hover"}`} />
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Skills />
        <Leadership />
        <Education />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}