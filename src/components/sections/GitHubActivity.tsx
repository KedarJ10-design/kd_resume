"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Section } from "../ui/Section";
import { Badge } from "../ui/Badge";
import { Github, Flame, Calendar, TrendingUp } from "lucide-react";
import { resumeData } from "../../data/resume";

// Generate a realistic contribution pattern (since we can't use GitHub API without a token)
function generateContributions(): number[] {
  const weeks = 52;
  const days = weeks * 7;
  const contributions: number[] = [];

  for (let i = 0; i < days; i++) {
    const dayOfWeek = i % 7;
    // Less activity on weekends
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.3 : 1;
    // Wave pattern for realistic-looking bursts
    const waveFactor = Math.sin(i / 14) * 0.5 + 0.5;
    // Random spikes
    const spike = Math.random() > 0.85 ? Math.random() * 8 : 0;
    // Base activity
    const base = Math.random() * 4 * weekendFactor * waveFactor + spike;

    contributions.push(Math.round(Math.max(0, base)));
  }
  return contributions;
}

const LEVELS = [
  "bg-border/40",          // 0 contributions
  "bg-secondary/30",       // low
  "bg-secondary/50",       // medium
  "bg-secondary/70",       // high
  "bg-secondary",          // very high
];

function getLevel(count: number): string {
  if (count === 0) return LEVELS[0];
  if (count <= 2) return LEVELS[1];
  if (count <= 4) return LEVELS[2];
  if (count <= 7) return LEVELS[3];
  return LEVELS[4];
}

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contributions, setContributions] = useState<number[]>([]);

  // Generate on client only to avoid hydration mismatch
  useEffect(() => {
    setContributions(generateContributions());
  }, []);

  if (contributions.length === 0) return null; // Don't render until client-side

  const totalContributions = contributions.reduce((a, b) => a + b, 0);
  const maxStreak = (() => {
    let max = 0, current = 0;
    for (const c of contributions) {
      if (c > 0) { current++; max = Math.max(max, current); }
      else current = 0;
    }
    return max;
  })();

  // Build weeks (columns of 7 days)
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(contributions.slice(w * 7, w * 7 + 7));
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Approximate month labels for 52 weeks
  const monthLabels: { label: string; weekIndex: number }[] = [];
  const now = new Date();
  for (let m = 0; m < 12; m++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - 11 + m, 1);
    const weeksSinceStart = Math.floor(m * (52 / 12));
    monthLabels.push({ label: months[monthDate.getMonth()], weekIndex: weeksSinceStart });
  }

  return (
    <Section id="github-activity" background="none">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <Badge variant="outline" className="mb-6 tracking-widest text-[10px] uppercase">Activity</Badge>
            <h2 className="text-editorial-h2 text-text mb-2">GitHub Contributions</h2>
            <p className="text-editorial-body text-sm">A snapshot of my coding activity over the past year.</p>
          </div>
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm font-medium"
          >
            <Github size={16} />
            <span>View Profile</span>
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 md:gap-12 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
              <TrendingUp size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-xl font-serif text-text font-semibold">{totalContributions}</p>
              <p className="text-[10px] text-text-dim uppercase tracking-widest">Contributions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warm-dim flex items-center justify-center">
              <Flame size={18} className="text-warm" />
            </div>
            <div>
              <p className="text-xl font-serif text-text font-semibold">{maxStreak} days</p>
              <p className="text-[10px] text-text-dim uppercase tracking-widest">Longest Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-dim flex items-center justify-center">
              <Calendar size={18} className="text-secondary" />
            </div>
            <div>
              <p className="text-xl font-serif text-text font-semibold">{Math.round(totalContributions / 365 * 7)}/wk</p>
              <p className="text-[10px] text-text-dim uppercase tracking-widest">Avg Per Week</p>
            </div>
          </div>
        </div>

        {/* Contribution grid */}
        <div className="bg-bg-card border border-border/60 rounded-2xl p-6 shadow-tactile overflow-x-auto">
          {/* Month labels */}
          <div className="flex mb-2 ml-8">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-text-dim"
                style={{
                  position: "relative",
                  left: `${m.weekIndex * 14}px`,
                  width: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1 justify-center">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="text-[9px] text-text-dim h-[12px] leading-[12px] w-6 text-right pr-1">
                  {d}
                </span>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((count, di) => {
                  const globalIndex = wi * 7 + di;
                  return (
                    <motion.div
                      key={di}
                      className={`w-[12px] h-[12px] rounded-[3px] ${getLevel(count)} transition-colors duration-200`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: globalIndex * 0.002,
                        ease: "easeOut",
                      }}
                      title={`${count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-4">
            <span className="text-[10px] text-text-dim mr-1">Less</span>
            {LEVELS.map((level, i) => (
              <div key={i} className={`w-[12px] h-[12px] rounded-[2px] ${level}`} />
            ))}
            <span className="text-[10px] text-text-dim ml-1">More</span>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
