"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_CURRENCY, type Currency } from "@/lib/site-content";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (next: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "17lud-currency";

// External store, same pattern as the language provider: SSR uses the default,
// the client reconciles to the saved / auto-detected currency.
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

function isCurrency(value: string | null): value is Currency {
  return value === "eur" || value === "usd" || value === "cad";
}

function detectCurrency(): Currency {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) return stored;

    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const regions = langs.map((lang) => lang.split("-")[1]?.toUpperCase());
    if (regions.includes("CA")) return "cad";
    if (regions.includes("US")) return "usd";

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz === "America/Toronto" || tz === "America/Montreal") return "cad";
    if (tz.startsWith("America/")) return "usd";
  } catch {
    // Ignore storage / navigator access failures.
  }
  return DEFAULT_CURRENCY;
}

function getServerSnapshot(): Currency {
  return DEFAULT_CURRENCY;
}

function writeCurrency(next: Currency) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage failures (private mode, etc.).
  }
  emitChange();
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(
    subscribe,
    detectCurrency,
    getServerSnapshot,
  );

  const setCurrency = useCallback((next: Currency) => {
    writeCurrency(next);
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
