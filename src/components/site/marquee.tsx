"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function Track({ items, ariaHidden }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden ? "true" : undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10">
          <span className="font-mono text-sm uppercase tracking-[0.18em] text-zinc-400">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-10 gap-y-3", className)}>
        <Track items={items} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        <Track items={items} />
      </div>
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        <Track items={items} ariaHidden />
      </div>
    </div>
  );
}
