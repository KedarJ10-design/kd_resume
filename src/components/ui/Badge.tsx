"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "skill" | "muted" | "outline";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "accent", size = "md", ...props }, ref) => {
    const variants = {
      accent: "bg-accent/10 text-accent font-semibold tracking-wide border border-accent/20",
      skill: "bg-bg-elevated text-text-muted border border-border/80 hover:border-accent/40 hover:text-accent hover:-translate-y-0.5 transition-all duration-300 shadow-sm",
      muted: "bg-bg-elevated/60 text-text-dim border border-border/60",
      outline: "bg-transparent text-text-muted border border-border hover:border-accent/50 transition-colors",
    };

    const sizes = {
      sm: "text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full",
      md: "text-xs px-3 py-1.5 rounded-full",
      lg: "text-sm px-4 py-2 rounded-full",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-normal text-center break-words",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
export { Badge };