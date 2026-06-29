"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  max?: number;
};

/**
 * Card with a pointer-following white spotlight (via CSS vars consumed by the
 * .spotlight-card class) and an optional 3D tilt. Both are pure transform/opacity
 * work and disabled under prefers-reduced-motion.
 */
export function MotionCard({
  children,
  className,
  tilt = true,
  glow = true,
  max = 7,
}: MotionCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18, mass: 0.4 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    if (glow) {
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    }
    if (tilt) {
      rotateY.set((px - 0.5) * 2 * max);
      rotateX.set(-(py - 0.5) * 2 * max);
    }
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (reduceMotion) {
    return <div className={cn(glow && "spotlight-card", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        tilt
          ? { rotateX: springX, rotateY: springY, transformPerspective: 900 }
          : undefined
      }
      className={cn(glow && "spotlight-card", "will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
