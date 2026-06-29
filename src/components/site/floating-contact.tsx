"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Copy, FileText, Mail, MessageCircle, X } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { useToast } from "./toast";

export function FloatingContact() {
  const { lang } = useLanguage();
  const c = siteContent[lang];
  const reduceMotion = useReducedMotion();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(c.brand.discord);
      toast(`${c.brand.discord} ✓`);
    } catch {
      // ignore clipboard failures
    }
    setOpen(false);
  }

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3",
        !visible && "pointer-events-none",
      )}
    >
      <AnimatePresence>
        {open && visible && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-panel grid w-64 gap-1 rounded-2xl p-2"
          >
            <button
              type="button"
              onClick={copyDiscord}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 transition duration-200 hover:bg-white/[0.08]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{c.brand.discord}</span>
              <Copy className="ml-auto h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
            </button>
            <a
              href={c.brand.mailto}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-200 transition duration-200 hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {c.contact.emailCardTitle}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-200 transition duration-200 hover:bg-white/[0.08]"
            >
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              {c.contact.formTitle}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={c.ui.contactCta}
        aria-expanded={open}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white text-zinc-950 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
