import { cn } from "@/lib/utils";

/**
 * Logomark — inline SVG so it stays crisp, themeable and uses the site font
 * (inline SVG <text> inherits the document's CSS, unlike a standalone .svg).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16161b" />
          <stop offset="1" stopColor="#050507" />
        </linearGradient>
        <linearGradient id="logo-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#d8d8dc" />
          <stop offset="1" stopColor="#8c8c94" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill="url(#logo-bg)"
        stroke="#ffffff"
        strokeOpacity="0.22"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="15.5"
        ry="6.4"
        stroke="url(#logo-chrome)"
        strokeOpacity="0.4"
        strokeWidth="1"
        transform="rotate(-28 20 20)"
      />
      <circle cx="31.4" cy="11.6" r="1.7" fill="#ffffff" />
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.4"
        fill="url(#logo-chrome)"
      >
        17L
      </text>
    </svg>
  );
}

/** Wordmark — two-tone "17Lud Studio" using the display font. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold leading-none", className)}>
      <span className="text-white">17Lud</span>{" "}
      <span className="text-zinc-400">Studio</span>
    </span>
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]" />
      <Wordmark className="text-base" />
    </span>
  );
}
