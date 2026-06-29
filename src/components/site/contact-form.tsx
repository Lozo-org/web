"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-zinc-500 focus:border-white/45 focus:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white/70";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-400";

export function ContactForm() {
  const { lang } = useLanguage();
  const content = siteContent[lang];
  const { form } = content.contact;
  const { brand } = content;
  const reduceMotion = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(brand.discord);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      serverType: String(formData.get("serverType") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
      locale: lang,
    };

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel flex min-h-[420px] flex-col items-center justify-center rounded-lg p-8 text-center"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white text-zinc-950">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">
          {form.successTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">
          {form.successText}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonVariants({ variant: "secondary" }), "mt-7")}
        >
          {brand.name}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel rounded-lg p-5 sm:p-7"
      noValidate
    >
      <h3 className="font-display text-2xl font-semibold text-white">
        {content.contact.formTitle}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {content.contact.formDescription}
      </p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className={labelClass}>
              {form.name}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="cf-contact" className={labelClass}>
              {form.contact}
            </label>
            <input
              id="cf-contact"
              name="contact"
              type="text"
              required
              placeholder={form.contactHint}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-server" className={labelClass}>
              {form.serverType}
            </label>
            <select
              id="cf-server"
              name="serverType"
              defaultValue={form.serverTypeOptions[0]}
              className={cn(fieldClass, "appearance-none")}
            >
              {form.serverTypeOptions.map((option) => (
                <option key={option} value={option} className="bg-zinc-950">
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cf-budget" className={labelClass}>
              {form.budget}
            </label>
            <select
              id="cf-budget"
              name="budget"
              defaultValue={form.budgetOptions[form.budgetOptions.length - 1]}
              className={cn(fieldClass, "appearance-none")}
            >
              {form.budgetOptions.map((option) => (
                <option key={option} value={option} className="bg-zinc-950">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" className={labelClass}>
            {form.message}
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            placeholder={form.messagePlaceholder}
            className={cn(fieldClass, "resize-y")}
          />
        </div>

        {/* Honeypot: hidden from humans, catches naive bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-white/15 bg-white/[0.05] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {form.errorTitle}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {form.errorText}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a href={brand.mailto} className={buttonVariants({ variant: "primary" })}>
                    {form.fallbackEmail}
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={copyDiscord}
                    className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
                  >
                    {copied ? `${brand.discord} ✓` : form.fallbackDiscord}
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
        >
          {status === "submitting" ? (
            <>
              {form.submitting}
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              {form.submit}
              <Send className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
