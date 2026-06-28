import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Bot,
  BrainCircuit,
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  MessageSquareText,
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
import { ContactActions } from "@/components/site/contact-actions";
import { HeroScene } from "@/components/site/hero-scene";
import { ViewTransitions } from "@/components/site/view-transitions";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  admin: ServerCog,
  ai: BrainCircuit,
  bot: Bot,
  community: MessageSquareText,
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020204] text-white">
      <ViewTransitions />
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhySection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/78 backdrop-blur-xl">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-5">
        <a
          href="#accueil"
          className="flex min-h-11 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`${siteContent.brand.name} - Accueil`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white bg-white font-mono text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.18)]">
            {siteContent.brand.shortName}
          </span>
          <span className="font-display text-base font-semibold text-white">
            {siteContent.brand.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {siteContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition duration-200 ease-out hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className={cn(buttonVariants({ variant: "primary" }), "hidden md:inline-flex")}
        >
          Me contacter
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <details className="group relative md:hidden">
          <summary className="flex min-h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Ouvrir le menu</span>
          </summary>
          <div className="glass-panel absolute right-0 mt-3 grid w-56 gap-1 rounded-lg p-2">
            {siteContent.nav.map((item) => (
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
              Demander un bot
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}

function Hero() {
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
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-zinc-100 backdrop-blur-xl sm:mb-6 sm:text-sm">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            {siteContent.brand.role}
          </div>
          <p className="mb-3 font-mono text-sm text-zinc-300">
            {siteContent.brand.name}
          </p>
          <h1 className="text-premium font-display text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
            Je crée des bots Discord sur mesure, modernes et puissants.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:mt-6 sm:text-xl sm:leading-8">
            Développement de bots Discord personnalisés pour communautés,
            serveurs RP, projets esport, entreprises et créateurs.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projets" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Voir mes projets
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Me contacter
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {siteContent.stats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-lg p-4">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <AnimatedSection id="a-propos" className="py-20 sm:py-28">
      <div className="section-shell scene-depth grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeading
          eyebrow={siteContent.about.eyebrow}
          title={siteContent.about.title}
          description={siteContent.about.description}
          align="left"
        />

        <div className="grid gap-4">
          <div className="glass-panel rounded-lg p-5 sm:p-6">
            <Terminal className="h-6 w-6 text-white" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">
              Une approche de développeur, pas de template.
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Le but n&apos;est pas seulement d&apos;ajouter des commandes. Je construis
              une logique de serveur : permissions, modération, automatisations,
              expérience admin et parcours membre.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {siteContent.about.principles.map((principle, index) => (
              <div
                key={principle}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
              >
                <span className="font-mono text-sm text-zinc-400">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm leading-6 text-zinc-200">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ServicesSection() {
  return (
    <AnimatedSection id="services" className="premium-grid py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Ce que je peux créer"
          title="Des systèmes Discord custom pour ton serveur, pas des fonctions posées au hasard."
          description="Chaque carte peut devenir un module indépendant ou une partie d'un bot complet selon ton besoin."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.services.map((service) => {
            const Icon = iconMap[service.icon] ?? WandSparkles;
            return (
              <article
                key={service.title}
                className="depth-card rounded-lg border border-white/10 bg-white/[0.045] p-5 transition duration-200 ease-out hover:border-white/35 hover:bg-white/[0.075]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProjectsSection() {
  return (
    <AnimatedSection id="projets" className="bg-[#050509] py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Mes projets / exemples de bots"
          title="QUP est un exemple de mon travail, pas l'identité du site."
          description="Ces bots montrent les types de systèmes que je peux concevoir : modération, communauté, esport, annonces, maintenance et outils admin."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {siteContent.projects.map((project) => {
            const Icon = iconMap[project.icon] ?? Bot;
            return (
              <article
                key={project.id}
                className="group flex min-h-full flex-col rounded-lg border border-white/10 bg-white/[0.045] p-5 transition duration-200 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Exemple
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
                  aria-label={`Parler d'un projet comme ${project.name}`}
                >
                  Créer un bot similaire
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function WhySection() {
  return (
    <AnimatedSection className="py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Pourquoi travailler avec moi ?"
          title="Du code propre, une UX Discord claire et une vision long terme."
          description="Je pense le bot comme un vrai outil de serveur : simple pour les admins, fluide pour les membres, assez solide pour évoluer."
          align="left"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {siteContent.reasons.map((reason, index) => (
            <div
              key={reason}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black font-mono text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-sm leading-6 text-zinc-200">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProcessSection() {
  return (
    <AnimatedSection id="processus" className="bg-[#050509] py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Processus"
          title="Une méthode simple pour passer d'une idée à un bot utilisable."
          description="Le cadrage reste direct : on clarifie le besoin, on construit, on teste, puis on ajuste."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {siteContent.process.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-lg border border-white/10 bg-white/[0.045] p-5"
            >
              <div className="mb-7 flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white text-black font-mono text-sm font-semibold">
                {index + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactSection() {
  return (
    <AnimatedSection id="contact" className="premium-grid py-20 sm:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Tu veux un bot Discord custom ?"
            description="Ajoute-moi sur Discord ou envoie-moi un email avec ton idée, ton type de serveur et les fonctionnalités que tu veux."
            align="left"
          />
          <div className="mt-8 grid gap-4">
            <ContactLine icon={MessageCircle} label="Discord" value={siteContent.brand.discord} />
            <ContactLine icon={Mail} label="Email" value={siteContent.brand.email} />
            <ContactLine
              icon={BadgeCheck}
              label="Réponse attendue"
              value="Idée, type de serveur, fonctionnalités, budget"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="glass-panel rounded-lg p-5 sm:p-6">
            <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">
              Discord direct
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Le plus simple pour parler rapidement du serveur, des modules et
              des priorités.
            </p>
            <p className="mt-5 rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white">
              {siteContent.brand.discord}
            </p>
            <ContactActions
              discord={siteContent.brand.discord}
              mailto={siteContent.brand.mailto}
              mode="discord"
            />
          </article>

          <article className="glass-panel rounded-lg p-5 sm:p-6">
            <AtSign className="h-7 w-7 text-white" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">
              Email projet
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Parfait si tu veux envoyer une demande plus structurée avec ton
              idée, ton budget et ton délai.
            </p>
            <p className="mt-5 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white">
              {siteContent.brand.email}
            </p>
            <ContactActions
              discord={siteContent.brand.discord}
              mailto={siteContent.brand.mailto}
              mode="email"
            />
          </article>
        </div>
      </div>

      <div className="section-shell mt-16">
        <div className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(94,106,210,0.12),rgba(255,255,255,0.04))] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-zinc-300">
                Prochain système Discord
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-4xl">
                Envoie-moi ton idée, je regarde comment la transformer en bot concret.
              </h2>
            </div>
            <a href={siteContent.brand.mailto} className={buttonVariants({ variant: "primary", size: "lg" })}>
              Envoyer un email
              <Send className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020204] py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            {siteContent.brand.name}
          </p>
          <p className="mt-2 text-sm text-zinc-400">{siteContent.brand.tagline}</p>
          <p className="mt-2 text-sm text-zinc-400">
            Discord : {siteContent.brand.discord} · Email : {siteContent.brand.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {siteContent.nav.map((item) => (
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
          © {new Date().getFullYear()} {siteContent.brand.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
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
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-semibold uppercase text-zinc-300">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg">
        {description}
      </p>
    </div>
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
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
