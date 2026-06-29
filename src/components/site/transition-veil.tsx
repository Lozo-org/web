"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCurrency } from "./currency-provider";
import { useLanguage } from "./language-provider";

/** Quick blur veil when the language or currency changes, masking the content swap. */
export function TransitionVeil() {
  const { lang } = useLanguage();
  const { currency } = useCurrency();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (reduceMotion) return;
    // Trigger the transition veil in response to a locale / currency change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    const id = window.setTimeout(() => setActive(false), 380);
    return () => window.clearTimeout(id);
  }, [lang, currency, reduceMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[45] bg-black/35 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.19, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
