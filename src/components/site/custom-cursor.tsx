"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE = "a,button,[role=button],input,select,textarea,summary,[data-cursor]";

/** Additive ring that trails the cursor and grows over interactive elements (desktop only). */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    if (!ring) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    function onMove(event: PointerEvent) {
      tx = event.clientX;
      ty = event.clientY;
      visible = true;
      const target = event.target as Element | null;
      targetScale = target?.closest?.(INTERACTIVE) ? 1.9 : 1;
    }
    function onLeave() {
      visible = false;
    }

    function loop() {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      scale += (targetScale - scale) * 0.2;
      ring!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      ring!.style.opacity = visible ? "1" : "0";
      raf = window.requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={ringRef} aria-hidden="true" className="custom-cursor" />;
}
