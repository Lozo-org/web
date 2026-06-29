"use client";

import { Languages } from "lucide-react";
import { siteContent, type Locale } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";

const ORDER: Locale[] = ["fr", "en"];

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, toggle } = useLanguage();
  const label = siteContent[lang].ui.switchLanguage;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "group inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.06] p-1 backdrop-blur-xl transition duration-200 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <Languages
        className="ml-1 h-3.5 w-3.5 text-zinc-400 transition group-hover:text-white"
        aria-hidden="true"
      />
      {ORDER.map((code) => (
        <span
          key={code}
          onClick={(event) => {
            event.stopPropagation();
            setLang(code);
          }}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition duration-200",
            lang === code
              ? "bg-white text-zinc-950 shadow-[0_0_18px_rgba(255,255,255,0.22)]"
              : "text-zinc-400 group-hover:text-zinc-200",
          )}
        >
          {code}
        </span>
      ))}
    </button>
  );
}
