"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function AnimatedSection({
  id,
  className,
  children,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={cn("relative scroll-reveal-3d", className)}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 48, filter: "blur(10px)" }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "center top" }}
    >
      {children}
    </motion.section>
  );
}
