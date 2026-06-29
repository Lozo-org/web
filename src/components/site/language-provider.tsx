"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site-content";

type LanguageContextValue = {
  lang: Locale;
  setLang: (next: Locale) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "17lud-lang";

// Treat the saved preference as an external store so the language is read with
// useSyncExternalStore — SSR renders DEFAULT_LOCALE, the client reconciles to the
// stored / detected value without a hydration mismatch, and tabs stay in sync.
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
    const navLang = window.navigator.language?.toLowerCase() ?? "";
    if (navLang.startsWith("en")) return "en";
  } catch {
    // Ignore storage / navigator access failures.
  }
  return DEFAULT_LOCALE;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function writeLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage failures (private mode, etc.).
  }
  emitChange();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLocale, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Locale) => {
    writeLocale(next);
  }, []);

  const toggle = useCallback(() => {
    writeLocale(readLocale() === "fr" ? "en" : "fr");
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
