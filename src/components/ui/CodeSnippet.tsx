"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const codeLines = [
  { text: "// mahayatri — AI Travel Platform", type: "comment" },
  { text: "", type: "blank" },
  { text: "async function generateItinerary(", type: "keyword" },
  { text: "  destination: string,", type: "param" },
  { text: "  days: number,", type: "param" },
  { text: "  preferences: TravelPrefs", type: "param" },
  { text: ") {", type: "keyword" },
  { text: '  const prompt = buildPrompt(', type: "normal" },
  { text: "    destination, days, preferences", type: "normal" },
  { text: "  );", type: "normal" },
  { text: "", type: "blank" },
  { text: "  const response = await gemini.generate({", type: "normal" },
  { text: '    model: "gemini-pro",', type: "string" },
  { text: "    prompt,", type: "normal" },
  { text: "    temperature: 0.7,", type: "number" },
  { text: "  });", type: "normal" },
  { text: "", type: "blank" },
  { text: "  return parseItinerary(response);", type: "normal" },
  { text: "}", type: "keyword" },
];

const typeColors: Record<string, string> = {
  comment: "text-text-dim italic",
  keyword: "text-accent",
  param: "text-warm",
  string: "text-secondary",
  number: "text-secondary",
  normal: "text-text-muted",
  blank: "",
};

export function CodeSnippet() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let line = 0;
    const interval = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= codeLines.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-[380px]"
    >
      <div className="relative bg-bg-card/70 backdrop-blur-xl border border-border/40 rounded-2xl shadow-tactile overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-warm/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          </div>
          <span className="text-[10px] text-text-dim font-mono ml-2">itinerary.ts</span>
        </div>

        {/* Code content */}
        <div className="px-4 py-4 font-mono text-[11px] leading-[1.8] overflow-hidden">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className={`whitespace-pre ${typeColors[line.type] || "text-text-muted"}`}
              initial={{ opacity: 0, x: 10 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <span className="text-text-dim/40 mr-3 select-none inline-block w-4 text-right">
                {line.type !== "blank" ? i + 1 : ""}
              </span>
              {line.text || "\u00A0"}
            </motion.div>
          ))}

          {/* Blinking cursor */}
          {visibleLines >= codeLines.length && (
            <motion.span
              className="inline-block w-[2px] h-[14px] bg-accent ml-7"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
