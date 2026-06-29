"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";

type PaletteCommand = { id: string; label: string; hint: string; run: () => void };

export const OPEN_COMMAND_PALETTE = "open-command-palette";

export function CommandPalette() {
  const { lang, toggle: toggleLang } = useLanguage();
  const c = siteContent[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<PaletteCommand[]>(() => {
    const goTo = (href: string) => () => {
      setOpen(false);
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    };
    const navCommands = c.nav.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      hint: "Section",
      run: goTo(item.href),
    }));
    return [
      ...navCommands,
      {
        id: "lang",
        label: c.ui.switchLanguage,
        hint: "FR / EN",
        run: () => {
          setOpen(false);
          toggleLang();
        },
      },
      {
        id: "discord",
        label: `${c.contact.discordLabel} · ${c.brand.discord}`,
        hint: "Copier",
        run: () => {
          setOpen(false);
          navigator.clipboard?.writeText(c.brand.discord).catch(() => {});
        },
      },
      {
        id: "email",
        label: c.contact.emailCardTitle,
        hint: "Email",
        run: () => {
          setOpen(false);
          window.location.href = c.brand.mailto;
        },
      },
    ];
  }, [c, toggleLang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setActive(0);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
      setQuery("");
      setActive(0);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  function onInputKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      filtered[active]?.run();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative z-10 w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder={`${c.ui.contactCta}, ${c.nav[2]?.label ?? "Services"}…`}
                className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-zinc-500"
              />
              <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-zinc-500">—</li>
              )}
              {filtered.map((cmd, index) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={cmd.run}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                      index === active ? "bg-white/[0.1] text-white" : "text-zinc-300",
                    )}
                  >
                    <span className="truncate">{cmd.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">{cmd.hint}</span>
                      {index === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
