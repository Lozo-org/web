"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogoMark, Wordmark } from "./logo";

export function IntroPreloader() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    // Mount-time trigger for the one-shot intro reveal.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    const id = window.setTimeout(() => setShow(false), 1500);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#020204]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoMark className="h-10 w-10" />
            <Wordmark className="text-xl" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
