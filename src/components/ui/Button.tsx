"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", leftIcon, rightIcon, children, ...props }, ref) => {
    const variants = {
      primary: "bg-accent hover:bg-accent-strong text-white font-medium shadow-tactile hover:shadow-tactile-hover hover:-translate-y-0.5",
      outline: "bg-bg-card border border-border/80 shadow-sm text-text hover:border-accent/40 hover:text-accent font-medium hover:-translate-y-0.5 hover:shadow-tactile",
      ghost: "bg-transparent text-text-muted hover:text-text hover:bg-bg-elevated/60 font-medium",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-full gap-1.5",
      md: "h-11 px-6 text-sm rounded-full gap-2",
      lg: "h-14 px-8 text-base rounded-full gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] whitespace-nowrap cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };