"use client";

import { useRef, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  // spotlightColor is kept for backward compatibility with imports but unused in the tactile theme
  spotlightColor?: string; 
}

export function SpotlightCard({ 
  className, 
  children, 
  padding = "md",
  spotlightColor,
  ...props 
}: SpotlightCardProps) {
  const paddings = {
    none: "",
    sm: "p-4 md:p-5",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  return (
    <div
      className={cn(
        "group relative h-full rounded-[2rem] bg-bg-card border border-border/80",
        "shadow-tactile hover:shadow-tactile-hover hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "overflow-hidden",
        paddings[padding],
        className
      )}
      {...props}
    >
      {/* Soft inner glow on top edge to simulate physical lighting */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
