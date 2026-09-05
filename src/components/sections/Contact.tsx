"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "../ui/Section";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { resumeData } from "../../data/resume";
import { Mail, MapPin, Phone, Github, Linkedin, ArrowUpRight, Copy, Check, Download, Sparkles } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { icon: Github, label: "GitHub", href: resumeData.github, value: "KedarJ10-design" },
    { icon: Linkedin, label: "LinkedIn", href: resumeData.linkedin, value: "kedarjadhav10" },
    { icon: Mail, label: "Email", href: `mailto:${resumeData.email}`, value: resumeData.email },
    { icon: Phone, label: "Phone", href: `tel:${resumeData.phone}`, value: resumeData.phone },
  ];

  return (
    <Section id="contact" background="none">
      {/* ─── Big editorial heading (Peak-End Rule: make the ending memorable) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <Badge variant="outline" className="tracking-widest text-[10px] uppercase">
            <Sparkles size={12} className="mr-1.5" />
            Let&apos;s Connect
          </Badge>
        </motion.div>
        
        <h2 className="text-editorial-display text-text mb-6 max-w-4xl mx-auto">
          Let&apos;s Build Something
          <span className="gradient-text-hero"> Extraordinary</span>
          <span className="text-warm">.</span>
        </h2>
        
        <p className="text-editorial-body max-w-2xl mx-auto text-lg">
          I&apos;m always open to discussing new opportunities, interesting projects, or partnerships.
          Got an idea? Let&apos;s make it real.
        </p>
      </motion.div>

      {/* ─── Main CTA card with glassmorphism ─── */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="gradient-border-animated">
            <SpotlightCard className="text-center !rounded-[1rem]" padding="lg">
              <div className="py-4">
                <h3 className="text-editorial-h3 text-text mb-2 text-2xl">
                  Drop me a message
                </h3>
                <p className="text-sm text-text-dim mb-8">
                  Fastest response via email — I usually reply within 24 hours
                </p>

                <button
                  onClick={copyEmail}
                  className="group flex items-center gap-3 mx-auto text-lg text-text hover:text-accent transition-colors cursor-pointer mb-6 px-6 py-3 rounded-xl hover:bg-accent-dim"
                >
                  <span className="font-mono text-text-muted group-hover:text-accent transition-colors">{resumeData.email}</span>
                  <motion.span whileTap={{ scale: 0.8 }}>
                    {copied ? <Check size={18} className="text-secondary" /> : <Copy size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
                  </motion.span>
                </button>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-secondary text-xs font-medium uppercase tracking-widest mb-4"
                  >
                    ✓ Copied to clipboard
                  </motion.p>
                )}

                <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-border/40">
                  <Button
                    size="lg"
                    onClick={() => window.open(`mailto:${resumeData.email}`, "_blank")}
                    className="min-h-[48px]"
                  >
                    <Mail size={18} />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-h-[48px]"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = resumeData.resumePdf;
                      link.download = "Kedar_Jadhav_Resume.pdf";
                      link.click();
                    }}
                  >
                    <Download size={18} />
                    Resume
                  </Button>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </motion.div>

        {/* ─── Social links grid ─── */}
        <div className="grid grid-cols-2 gap-4">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="block group h-full">
                <SpotlightCard className="h-full" padding="sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent-dim text-text-muted group-hover:text-accent transition-colors duration-300">
                      <link.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text mb-0.5">{link.label}</p>
                      <p className="text-xs text-text-muted truncate">{link.value}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-border group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                  </div>
                </SpotlightCard>
              </a>
            </motion.div>
          ))}
        </div>

        {/* ─── Location badge ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mt-8 text-text-dim"
        >
          <MapPin size={14} />
          <span className="text-xs font-medium uppercase tracking-widest">{resumeData.location}</span>
        </motion.div>
      </div>
    </Section>
  );
}