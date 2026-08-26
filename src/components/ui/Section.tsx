"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  background?: "none" | "gradient" | "grid" | "mesh";
  divider?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, background = "none", divider = false, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative py-20 md:py-28 overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background effects */}
        {background === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-elevated/20 to-bg pointer-events-none" />
        )}
        {background === "grid" && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
            backgroundImage: `linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        )}
        {background === "mesh" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-elevated/20 to-bg pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.01]" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(129,140,248,0.6) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }} />
          </>
        )}

        {/* Section divider — animated gradient */}
        {divider && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl h-px bg-gradient-to-r from-transparent via-border-bright to-transparent" />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";
export { Section };