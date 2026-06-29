"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Reveals text word-by-word on scroll (one accessible label, animated spans hidden from SR). */
export function SplitText({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            variants={wordVariant}
            className="inline-block will-change-transform"
            aria-hidden="true"
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}
