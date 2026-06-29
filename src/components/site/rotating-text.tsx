"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  words: string[];
  interval?: number;
  className?: string;
};

export function RotatingText({
  words,
  interval = 2200,
  className,
}: RotatingTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  const word = words[index % words.length] ?? words[0] ?? "";

  if (reduceMotion) {
    return <span className={className}>{word}</span>;
  }

  return (
    <span className="relative inline-grid align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={{ y: "0.65em", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.65em", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn("col-start-1 row-start-1 whitespace-nowrap", className)}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
