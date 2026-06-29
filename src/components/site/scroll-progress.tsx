"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(90deg,rgba(255,255,255,0.35),#ffffff_55%,rgba(255,255,255,0.35))]"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
