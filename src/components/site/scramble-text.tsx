"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*/";

/** Briefly scrambles then settles the text when it scrolls into view. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let raf = 0;
    let frame = 0;
    const settleAt = text.length + 12;
    const tick = () => {
      frame += 1;
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (frame > i * 1.4 + 8) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(out);
      if (frame < settleAt) raf = window.requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [inView, reduceMotion, text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
