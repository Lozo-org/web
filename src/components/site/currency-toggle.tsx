"use client";

import { CircleDollarSign } from "lucide-react";
import { CURRENCIES, type Currency } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useCurrency } from "./currency-provider";

const LABELS: Record<Currency, string> = {
  cad: "CAD",
  eur: "EUR",
  usd: "USD",
};

export function CurrencyToggle({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      role="group"
      aria-label="Devise / Currency"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.06] p-1 backdrop-blur-xl",
        className,
      )}
    >
      <CircleDollarSign
        className="ml-1 h-3.5 w-3.5 text-zinc-400"
        aria-hidden="true"
      />
      {CURRENCIES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setCurrency(code)}
          aria-pressed={currency === code}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            currency === code
              ? "bg-white text-zinc-950 shadow-[0_0_18px_rgba(255,255,255,0.22)]"
              : "text-zinc-400 hover:text-zinc-200",
          )}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
