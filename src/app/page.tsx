"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUp,
  AtSign,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Command,
  Mail,
  Menu,
  MessageCircle,
  RadioTower,
  ScrollText,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Swords,
  Terminal,
  Ticket,
  Trophy,
  UserRound,
  WandSparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { AnimatedSection } from "@/components/site/animated-section";
import { CommandPalette, OPEN_COMMAND_PALETTE } from "@/components/site/command-palette";
import { Configurator } from "@/components/site/configurator";
import { ContactForm } from "@/components/site/contact-form";
import { CountUp } from "@/components/site/count-up";
import { Faq } from "@/components/site/faq";
import { FloatingContact } from "@/components/site/floating-contact";
import { HeroScene } from "@/components/site/hero-scene";
import { MotionCard } from "@/components/site/interactive-card";
import { Magnetic } from "@/components/site/magnetic";
import { Marquee } from "@/components/site/marquee";
import { MusicToggle } from "@/components/site/music-toggle";
import { Object3D } from "@/components/site/object-3d";
import { RotatingText } from "@/components/site/rotating-text";
import { ScrambleText } from "@/components/site/scramble-text";
import { SplitText } from "@/components/site/split-text";
import { CurrencyToggle } from "@/components/site/currency-toggle";
import { useCurrency } from "@/components/site/currency-provider";
import { LanguageToggle } from "@/components/site/language-toggle";
import { useLanguage } from "@/components/site/language-provider";
import { LogoMark, Wordmark } from "@/components/site/logo";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/reveal";
import { ViewTransitions } from "@/components/site/view-transitions";
import { buttonVariants } from "@/components/ui/button";
import { siteContent, type Locale, type SiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  admin: ServerCog,
  ai: BrainCircuit,
  bot: Bot,
  community: MessageCircle,
  core: RadioTower,
  logs: ScrollText,
  maintenance: Wrench,
  mask: UserRound,
  shield: ShieldCheck,
  spark: Sparkles,
  swords: Swords,
  ticket: Ticket,
  trophy: Trophy,
  workflow: Workflow,
};

// Section ids are language-independent (only nav labels are translated).
const SECTION_IDS = [
  "accueil",
  "a-propos",
  "services",
  "projets",
  "tarifs",
  "processus",
  "faq",
  "contact",
];

function useActiveSection() {
  const [active, setActive] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Home() {
  const { lang } = useLanguage();
  const c = siteContent[lang];
  const active = useActiveSection();

  return (
    <main className="min-h-screen bg-[#020204] text-white">
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        {c.ui.skipToContent}
      </a>
      <ViewTransitions />
      <Navbar c={c} active={active} />
      <Hero c={c} />
      <MetricsBand c={c} />
      <AboutSection c={c} />
      <ServicesSection c={c} />
      <MarqueeBand c={c} />
      <ProjectsSection c={c} />
      <ShowcaseSection lang={lang} />
      <PricingSection c={c} />
      <ConfiguratorSection c={c} />
      <WhySection c={c} />
      <ProcessSection c={c} />
      <FaqSection c={c} />
      <ContactSection c={c} />
      <Footer c={c} />
      <BackToTop label={c.ui.backToTop} />
      <FloatingContact />
      <CommandPalette />
    </main>
  );
}

function Navbar({ c, active }: { c: SiteContent; active: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/78 backdrop-blur-xl">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a
          href="#accueil"
          className="flex min-h-11 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`${c.brand.name} - ${c.nav[0].label}`}
        >
          <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]" />
          <Wordmark className="text-base" />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {c.nav.map((item) => {
            const isActive = `#${active}` === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  isActive
                    ? "text-white"
                    : "text-zinc-300 hover:bg-white/[0.07] hover:text-white",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE))}
            aria-label="Recherche rapide (Ctrl/Cmd + K)"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 text-xs font-medium text-zinc-400 transition duration-200 hover:border-white/30 hover:text-white lg:inline-flex"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />K
          </button>
          <MusicToggle />
          <LanguageToggle />
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "primary" }), "hidden lg:inline-flex")}
          >
            {c.ui.contactCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <details className="group relative lg:hidden">
            <summary className="flex min-h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{c.ui.openMenu}</span>
            </summary>
            <div className="glass-panel absolute right-0 mt-3 grid w-56 gap-1 rounded-lg p-2">
              {c.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition duration-200 hover:bg-white/[0.08]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "primary" }), "mt-1 w-full")}
              >
                {c.ui.requestBot}
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}

function Hero({ c }: { c: SiteContent }) {
  return (
    <section
      id="accueil"
      className="hero-cinema relative isolate min-h-[94svh] overflow-hidden bg-black"
    >
      <Image
        src="/images/qup-bots-hero-dashboard.png"
        alt="Dashboard Discord moderne avec commandes slash, logs et statistiques"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-32 grayscale contrast-125"
      />
      <HeroScene />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.92)_42%,rgba(0,0,0,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.36)_56%,#020204_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div className="section-shell relative z-10 flex min-h-[94svh] flex-col justify-end pb-10 pt-28 sm:pb-14 lg:pb-16">
        <StaggerGroup className="max-w-4xl" amount={0.1} stagger={0.09}>
          <StaggerItem>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-zinc-100 backdrop-blur-xl sm:mb-6 sm:text-sm">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              {c.hero.badge}
            </div>
          </StaggerItem>
          <StaggerItem>
            <p className="mb-3 font-mono text-sm text-zinc-300">{c.brand.name}</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-4xl font-semibold leading-[1.12] sm:text-6xl lg:text-7xl">
              <SplitText text={c.hero.titleLead} className="text-white" />{" "}
              <RotatingText words={c.hero.rotating} className="text-premium" />
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:mt-6 sm:text-xl sm:leading-8">
              {c.hero.description}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <a href="#projets" className={buttonVariants({ variant: "primary", size: "lg" })}>
                  {c.hero.primaryCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                  {c.hero.secondaryCta}
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {c.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.1 + index * 0.08}>
              <div className="glass-panel rounded-lg p-4">
                <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-1 text-zinc-400">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
          {c.hero.scroll}
        </span>
        <ChevronDown className="h-4 w-4 animate-float-slow" aria-hidden="true" />
      </div>
    </section>
  );
}

function MetricsBand({ c }: { c: SiteContent }) {
  return (
    <section className="border-y border-white/10 bg-[#040407] py-10">
      <StaggerGroup className="section-shell grid grid-cols-2 gap-6 sm:grid-cols-4">
        {c.metrics.map((metric) => (
          <StaggerItem key={metric.label} className="text-center">
            <p className="font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl">
              <CountUp value={metric.value} suffix={metric.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-zinc-400 sm:text-sm">
              {metric.label}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

function MarqueeBand({ c }: { c: SiteContent }) {
  return (
    <section className="border-b border-white/10 bg-black py-6" aria-label="Technologies">
      <Marquee items={c.marquee} />
    </section>
  );
}

function FaqSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="faq" className="py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.faq.eyebrow}
          title={c.faq.title}
          description={c.faq.description}
        />
        <Faq items={c.faq.items} />
      </div>
    </AnimatedSection>
  );
}

function ConfiguratorSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="configurateur" className="glow-soft py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.configurator.eyebrow}
          title={c.configurator.title}
          description={c.configurator.description}
        />
        <Configurator />
      </div>
    </AnimatedSection>
  );
}

function ShowcaseSection({ lang }: { lang: Locale }) {
  const isFr = lang === "fr";
  return (
    <AnimatedSection className="bg-[#040407] py-20 sm:py-28">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase text-zinc-300">
            {isFr ? "Savoir-faire" : "Craft"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-5xl">
            {isFr
              ? "Des systèmes pensés comme de vrais produits."
              : "Systems built like real products."}
          </h2>
          <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg">
            {isFr
              ? "Architecture propre, interfaces soignées, détails maîtrisés — jusqu'au moindre bouton Discord."
              : "Clean architecture, polished interfaces, every detail handled — down to the last Discord button."}
          </p>
          <p className="mt-4 font-mono text-sm text-zinc-500">
            {isFr ? "↔ Glisse l'objet pour le faire tourner." : "↔ Drag the object to rotate it."}
          </p>
        </Reveal>
        <Reveal>
          <div className="aspect-square w-full sm:aspect-[4/3]">
            <Object3D className="h-full w-full" />
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}

function AboutSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="a-propos" className="py-20 sm:py-28">
      <div className="section-shell scene-depth grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-24">
          <div
            className="profile-portrait aspect-square w-full rounded-2xl border border-white/12"
            style={{ backgroundImage: "url('/images/profile.jpg')" }}
            role="img"
            aria-label={c.about.profileAlt}
          >
            <div className="flex h-full flex-col justify-end p-4">
              <div className="glass-panel flex items-center justify-between gap-3 rounded-lg p-4">
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    {c.about.profileName}
                  </p>
                  <p className="text-xs text-zinc-400">{c.about.profileRole}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-white">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.about.profileTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow={c.about.eyebrow}
            title={c.about.title}
            description={c.about.description}
            align="left"
          />
          <div className="mt-8 grid gap-4">
            <Reveal>
              <div className="glass-panel rounded-lg p-5 sm:p-6">
                <Terminal className="h-6 w-6 text-white" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {c.about.cardTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{c.about.cardText}</p>
              </div>
            </Reveal>
            <StaggerGroup className="grid gap-3 sm:grid-cols-3">
              {c.about.principles.map((principle, index) => (
                <StaggerItem key={principle}>
                  <div className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-4">
                    <span className="font-mono text-sm text-zinc-400">0{index + 1}</span>
                    <p className="mt-3 text-sm leading-6 text-zinc-200">{principle}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ServicesSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="services" className="premium-grid py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.services.eyebrow}
          title={c.services.title}
          description={c.services.description}
        />

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.services.items.map((service) => {
            const Icon = iconMap[service.icon] ?? WandSparkles;
            return (
              <StaggerItem key={service.title} className="h-full">
                <MotionCard className="h-full rounded-lg border border-white/10 p-5 transition-colors duration-200 hover:border-white/40">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {service.description}
                  </p>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </AnimatedSection>
  );
}

function ProjectsSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="projets" className="bg-[#050509] py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.projects.eyebrow}
          title={c.projects.title}
          description={c.projects.description}
        />

        <StaggerGroup className="mt-12 grid gap-4 lg:grid-cols-4">
          {c.projects.items.map((project) => {
            const Icon = iconMap[project.icon] ?? Bot;
            return (
              <StaggerItem key={project.id} className="h-full">
                <MotionCard className="flex h-full min-h-full flex-col rounded-lg border border-white/10 p-5 transition-colors duration-200 hover:border-white/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      {c.projects.exampleBadge}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase text-zinc-500">
                    {project.type}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs text-zinc-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-200 transition duration-200 hover:text-white"
                    aria-label={`${c.projects.cta} — ${project.name}`}
                  >
                    {c.projects.cta}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </MotionCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </AnimatedSection>
  );
}

function PricingSection({ c }: { c: SiteContent }) {
  const { currency } = useCurrency();
  return (
    <AnimatedSection id="tarifs" className="glow-soft py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.pricing.eyebrow}
          title={c.pricing.title}
          description={c.pricing.description}
        />

        <div className="mt-7 flex justify-center">
          <CurrencyToggle />
        </div>

        <StaggerGroup className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {c.pricing.tiers.map((tier) => {
            const Icon = iconMap[tier.icon] ?? WandSparkles;
            return (
              <StaggerItem key={tier.id} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-6 transition duration-200 ease-out sm:p-7",
                    tier.featured
                      ? "price-featured lg:-translate-y-2"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.06]",
                  )}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950 shadow-[0_0_24px_rgba(255,255,255,0.25)]">
                      {tier.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {tier.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{tier.tagline}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-4xl font-semibold text-white">
                      {tier.price[currency]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                    {tier.priceNote}
                  </p>

                  <ul className="mt-6 grid gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-zinc-200">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-zinc-950">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        <span className="leading-6">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={cn(
                      buttonVariants({ variant: tier.featured ? "primary" : "secondary" }),
                      "mt-8 w-full",
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <p className="mt-8 text-center text-sm text-zinc-500">{c.pricing.note}</p>
      </div>
    </AnimatedSection>
  );
}

function WhySection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection className="py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow={c.why.eyebrow}
          title={c.why.title}
          description={c.why.description}
          align="left"
        />

        <StaggerGroup className="grid gap-3 sm:grid-cols-2">
          {c.why.items.map((reason, index) => (
            <StaggerItem key={reason} className="h-full">
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white font-mono text-sm font-semibold text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-6 text-zinc-200">{reason}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </AnimatedSection>
  );
}

function ProcessSection({ c }: { c: SiteContent }) {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatedSection id="processus" className="bg-[#050509] py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.process.eyebrow}
          title={c.process.title}
          description={c.process.description}
        />

        <div className="relative mt-12">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-[42px] hidden h-px origin-left bg-gradient-to-r from-white/5 via-white/40 to-white/5 lg:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <StaggerGroup className="grid gap-4 lg:grid-cols-6">
            {c.process.steps.map((step, index) => (
              <StaggerItem key={step.title} className="h-full">
                <article className="relative h-full rounded-lg border border-white/10 bg-white/[0.045] p-5">
                  <div className="mb-7 flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white font-mono text-sm font-semibold text-black">
                    {index + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{step.text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactSection({ c }: { c: SiteContent }) {
  return (
    <AnimatedSection id="contact" className="premium-grid py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={c.contact.eyebrow}
          title={c.contact.title}
          description={c.contact.description}
          align="left"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="grid gap-4">
            <ContactLine icon={MessageCircle} label={c.contact.discordLabel} value={c.brand.discord} />
            <ContactLine icon={Mail} label={c.contact.emailLabel} value={c.brand.email} />
            <ContactLine
              icon={BadgeCheck}
              label={c.contact.expectLabel}
              value={c.contact.expectValue}
            />

            <article className="glass-panel rounded-lg p-5 sm:p-6">
              <AtSign className="h-7 w-7 text-white" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {c.contact.emailCardTitle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {c.contact.emailCardText}
              </p>
              <a
                href={c.brand.mailto}
                className={cn(buttonVariants({ variant: "secondary" }), "mt-5 w-full")}
              >
                {c.contact.bannerCta}
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </div>
        </div>
      </div>

      <div className="section-shell mt-16">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(94,106,210,0.12),rgba(255,255,255,0.04))] p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase text-zinc-300">
                  {c.contact.bannerEyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-4xl">
                  {c.contact.bannerTitle}
                </h2>
              </div>
              <a href={c.brand.mailto} className={buttonVariants({ variant: "primary", size: "lg" })}>
                {c.contact.bannerCta}
                <Send className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}

function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="border-t border-white/10 bg-[#020204] py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9 shrink-0" />
            <Wordmark className="text-xl" />
          </div>
          <p className="mt-3 text-sm text-zinc-400">{c.footer.tagline}</p>
          <p className="mt-2 text-sm text-zinc-400">
            {c.contact.discordLabel} : {c.brand.discord} · {c.contact.emailLabel} :{" "}
            {c.brand.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {c.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-zinc-400 transition duration-200 hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {c.brand.name}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}

function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
      }
      aria-label={label}
      title={label}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-xl transition hover:border-white/40 hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </motion.button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-semibold uppercase text-zinc-300">
        <ScrambleText text={eyebrow} />
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-5xl">
        <SplitText text={title} />
      </h2>
      <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg">{description}</p>
    </Reveal>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="truncate font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
