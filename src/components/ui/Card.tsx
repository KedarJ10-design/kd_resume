"use client";

import { forwardRef, HTMLAttributes, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, 
  "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onDragEnter" | "onDragLeave" | "onDrop" |
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" |
  "onTransitionStart" | "onTransitionEnd" |
  "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" |
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel" | "onPointerOver" | "onPointerOut" | "onPointerEnter" | "onPointerLeave" |
  "onWheel" | "onScroll"
>;

export interface CardProps extends NativeDivProps {
  variant?: "default" | "elevated" | "bordered" | "glass" | "glass-strong" | "gradient-border";
  hover?: boolean | "lift" | "glow" | "tilt";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = false, 
    padding = "md",
    interactive = false,
    onClick,
    children, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const variants = {
      default: "bg-bg-card border border-border",
      elevated: "bg-bg-card shadow-xl shadow-black/30 border border-border-hover",
      bordered: "bg-transparent border-2 border-border hover:border-border-hover",
      glass: "bg-bg-card/60 backdrop-blur-xl border border-border/50",
      "glass-strong": "bg-bg-card/80 backdrop-blur-2xl border border-border/60",
      "gradient-border": "relative bg-bg-card border border-transparent",
    };
    
    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const hoverStyles = {
      lift: "transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10",
      glow: "transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)] hover:border-accent/30",
      tilt: "transition-transform duration-300 ease-out",
      default: "transition-all duration-300 hover:border-border-hover hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1",
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const gradientBorderStyle = variant === "gradient-border" ? {
      background: "linear-gradient(var(--color-bg-card), var(--color-bg-card)) padding-box, linear-gradient(135deg, var(--color-accent), var(--color-secondary), var(--color-warm)) border-box",
      border: "1px solid transparent",
    } : {};

    const tiltStyle = hover === "tilt" && isHovered ? {
      transform: `perspective(1000px) rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg) scale3d(1.02, 1.02, 1.02)`,
    } : isHovered && hover === "lift" ? {
      transform: "translateY(-8px) scale(1.01)",
    } : isHovered && hover === "glow" ? {
      transform: "translateY(-4px) scale(1.005)",
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variants[variant],
          paddings[padding],
          hover && hoverStyles[typeof hover === "string" ? hover : "default"],
          interactive && "cursor-pointer",
          className
        )}
        style={{ ...gradientBorderStyle, ...tiltStyle }}
        onMouseEnter={() => { setIsHovered(true); }}
        onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        whileTap={interactive ? { scale: 0.99 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...props}
      >
        {variant === "gradient-border" && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-secondary), var(--color-warm))",
              filter: "blur(20px)",
              zIndex: -1,
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export { Card };