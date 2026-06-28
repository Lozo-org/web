"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactActionsProps = {
  discord: string;
  mailto: string;
  mode: "discord" | "email";
};

export function ContactActions({ discord, mailto, mode }: ContactActionsProps) {
  const [copied, setCopied] = useState(false);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(discord);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  if (mode === "email") {
    return (
      <div className="mt-5 grid gap-3">
        <a href={mailto} className={buttonVariants({ variant: "primary" })}>
          Envoyer un email
          <Mail className="h-4 w-4" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={copyDiscord}
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        >
          {copied ? "Discord copié" : "Copier mon Discord"}
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-3">
      <button
        type="button"
        onClick={copyDiscord}
        className={cn(buttonVariants({ variant: "primary" }), "w-full")}
      >
        {copied ? "Discord copié" : "Copier mon Discord"}
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <a
        href="https://discord.com/app"
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ variant: "secondary" })}
      >
        Ajouter sur Discord
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
