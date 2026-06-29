"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/site-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { useCurrency } from "./currency-provider";

export const PREFILL_CONTACT = "prefill-contact";

export type PrefillDetail = { message: string; serverType: string };

export function Configurator() {
  const { lang } = useLanguage();
  const { currency } = useCurrency();
  const c = siteContent[lang];
  const cfg = c.configurator;

  const [type, setType] = useState(cfg.types[0] ?? "");
  const [features, setFeatures] = useState<string[]>([]);

  const tierIndex =
    features.length >= 5 ? 2 : features.length >= 2 ? 1 : features.length >= 1 ? 0 : -1;
  const tier = tierIndex >= 0 ? c.pricing.tiers[tierIndex] : null;

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    );
  }

  function requestQuote() {
    const message = [
      cfg.prefillIntro,
      `- ${cfg.typeLabel} : ${type}`,
      `- ${cfg.featuresLabel} : ${features.join(", ") || "—"}`,
      tier ? `- ${cfg.recommendedLabel} : ${tier.name}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.dispatchEvent(
      new CustomEvent<PrefillDetail>(PREFILL_CONTACT, {
        detail: { message, serverType: type },
      }),
    );
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", "#contact");
  }

  return (
    <div className="glass-panel mt-12 grid gap-6 rounded-2xl p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid content-start gap-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {cfg.typeLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {cfg.types.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                aria-pressed={type === item}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition duration-200",
                  type === item
                    ? "border-white bg-white text-zinc-950"
                    : "border-white/12 bg-white/[0.04] text-zinc-300 hover:border-white/30",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {cfg.featuresLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {cfg.features.map((item) => {
              const selected = features.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleFeature(item)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition duration-200",
                    selected
                      ? "border-white/60 bg-white/[0.12] text-white"
                      : "border-white/12 bg-white/[0.04] text-zinc-300 hover:border-white/30",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-white/10 bg-black/30 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {cfg.recommendedLabel}
          </p>
          {tier ? (
            <>
              <p className="mt-3 font-display text-2xl font-semibold text-white">{tier.name}</p>
              <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-white">
                {tier.price[currency]}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{tier.tagline}</p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-6 text-zinc-500">{cfg.emptyHint}</p>
          )}
        </div>
        <button
          type="button"
          onClick={requestQuote}
          disabled={!tier}
          className={cn(buttonVariants({ variant: "primary" }), "w-full")}
        >
          {cfg.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
