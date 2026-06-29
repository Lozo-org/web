"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Subtle white glow that follows the cursor across the whole page (monochrome). */
export function SpotlightCursor() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    function onMove(event: PointerEvent) {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        el!.style.setProperty("--cx", `${event.clientX}px`);
        el!.style.setProperty("--cy", `${event.clientY}px`);
        raf = 0;
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={ref} aria-hidden="true" className="cursor-spotlight" />;
}
