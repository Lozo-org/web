"use client";

import { useEffect } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

export function ViewTransitions() {
  useEffect(() => {
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!link || link.hash.length <= 1 || event.defaultPrevented) return;
      const target = document.querySelector(link.hash);
      if (!target) return;

      event.preventDefault();

      const update = () => {
        history.pushState(null, "", link.hash);
        target.scrollIntoView({
          behavior: reduceMotion.matches ? "auto" : "smooth",
          block: "start",
        });
      };

      if (doc.startViewTransition && !reduceMotion.matches) {
        doc.startViewTransition(update);
        return;
      }

      update();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
