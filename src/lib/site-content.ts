// Contenu du site, bilingue FR / EN.
// Tout texte visible passe par ici pour que le bouton de traduction couvre tout le site.
// Pour changer les tarifs ou la devise : section `pricing.tiers` ci-dessous.

export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

// Valeurs partagées entre les deux langues (évite la duplication / le décalage).
const DISCORD = "17lud";
const EMAIL = "ludofootball@icloud.com";
const NAME = "17Lud Studio";
const SHORT = "17L";

function buildMailto(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type NavItem = { label: string; href: string };
export type Stat = { label: string; value: string };
export type ServiceItem = { title: string; icon: string; description: string };
export type ProjectItem = {
  id: string;
  name: string;
  type: string;
  icon: string;
  description: string;
  features: string[];
};
export type PriceTier = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  icon: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  cta: string;
};
export type ProcessStep = { title: string; text: string };

export type FormContent = {
  name: string;
  contact: string;
  contactHint: string;
  serverType: string;
  serverTypeOptions: string[];
  budget: string;
  budgetOptions: string[];
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorText: string;
  fallbackEmail: string;
  fallbackDiscord: string;
  required: string;
};

export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    role: string;
    discord: string;
    email: string;
    mailto: string;
  };
  ui: {
    skipToContent: string;
    contactCta: string;
    requestBot: string;
    openMenu: string;
    switchLanguage: string;
    backToTop: string;
  };
  nav: NavItem[];
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
  };
  stats: Stat[];
  about: {
    eyebrow: string;
    title: string;
    description: string;
    principles: string[];
    cardTitle: string;
    cardText: string;
    profileName: string;
    profileRole: string;
    profileAlt: string;
    profileTags: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    exampleBadge: string;
    cta: string;
    items: ProjectItem[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    mostPopular: string;
    tiers: PriceTier[];
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    discordLabel: string;
    emailLabel: string;
    expectLabel: string;
    expectValue: string;
    discordCardTitle: string;
    discordCardText: string;
    emailCardTitle: string;
    emailCardText: string;
    formTitle: string;
    formDescription: string;
    form: FormContent;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerCta: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

const fr: SiteContent = {
  brand: {
    name: NAME,
    shortName: SHORT,
    tagline: "Créateur de bots Discord custom",
    role: "Développeur de systèmes Discord",
    discord: DISCORD,
    email: EMAIL,
    mailto: buildMailto(
      "Demande de bot Discord custom",
      "Salut 17Lud,\n\nType de serveur : \nFonctionnalités souhaitées : \nBudget approximatif : \nDélai souhaité : \n",
    ),
  },
  ui: {
    skipToContent: "Aller au contenu",
    contactCta: "Me contacter",
    requestBot: "Demander un bot",
    openMenu: "Ouvrir le menu",
    switchLanguage: "Passer en anglais",
    backToTop: "Revenir en haut",
  },
  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#a-propos" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projets" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Processus", href: "#processus" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Développeur de systèmes Discord",
    title: "Je crée des bots Discord sur mesure, modernes et puissants.",
    description:
      "Développement de bots Discord personnalisés pour communautés, serveurs RP, projets esport, entreprises et créateurs.",
    primaryCta: "Voir mes projets",
    secondaryCta: "Me contacter",
    scroll: "Défiler",
  },
  stats: [
    { label: "Identité", value: "Portfolio perso" },
    { label: "Spécialité", value: "Bots Discord" },
    { label: "Approche", value: "Sur mesure" },
  ],
  about: {
    eyebrow: "À propos",
    title:
      "Je transforme les besoins d'un serveur en systèmes Discord clairs, stables et utiles.",
    description:
      "Je crée des bots Discord personnalisés pour aider les serveurs à mieux se gérer, s'automatiser et offrir une meilleure expérience aux membres. Modération, tickets, logs, esport, RP, communautés ou outils avec IA : chaque projet est pensé autour de ton serveur, de ton équipe et de tes vrais usages.",
    principles: [
      "Interfaces Discord modernes avec slash commands, boutons et menus.",
      "Architecture propre pour faire évoluer le bot sans repartir de zéro.",
      "Expérience admin simple, directe et lisible pour les membres.",
    ],
    cardTitle: "Une approche de développeur, pas de template.",
    cardText:
      "Le but n'est pas seulement d'ajouter des commandes. Je construis une logique de serveur : permissions, modération, automatisations, expérience admin et parcours membre.",
    profileName: "17Lud",
    profileRole: "Créateur de bots Discord",
    profileAlt: "Portrait de 17Lud, créateur de bots Discord",
    profileTags: ["Discord.js", "Node.js", "UI/UX Discord"],
  },
  services: {
    eyebrow: "Ce que je peux créer",
    title:
      "Des systèmes Discord custom pour ton serveur, pas des fonctions posées au hasard.",
    description:
      "Chaque carte peut devenir un module indépendant ou une partie d'un bot complet selon ton besoin.",
    items: [
      {
        title: "Bot Discord custom",
        icon: "bot",
        description:
          "Un bot conçu autour de ton serveur, de tes rôles, de tes permissions et de tes workflows.",
      },
      {
        title: "Bot de modération",
        icon: "shield",
        description:
          "Warns, timeout, kick, ban, historiques, notes staff et actions propres.",
      },
      {
        title: "Bot de tickets",
        icon: "ticket",
        description:
          "Support, candidatures, commandes, signalements ou demandes privées.",
      },
      {
        title: "Bot de logs",
        icon: "logs",
        description:
          "Suivi clair des actions importantes avec salons dédiés et lecture rapide.",
      },
      {
        title: "Bot communautaire",
        icon: "community",
        description:
          "Animations, interactions, mini-jeux, événements et outils d'engagement.",
      },
      {
        title: "Bot esport",
        icon: "trophy",
        description:
          "Organisation de matchs, files, équipes automatiques, scores et classements.",
      },
      {
        title: "6 mans / 4 mans / 2 mans",
        icon: "swords",
        description:
          "Système compétitif pour Rocket League et autres communautés gaming.",
      },
      {
        title: "Bot RP",
        icon: "mask",
        description:
          "Outils pour scènes RP, rôles, dossiers, validations et automatisations serveur.",
      },
      {
        title: "Bot avec IA",
        icon: "ai",
        description:
          "Assistants, modération assistée, génération de réponses et outils intelligents.",
      },
      {
        title: "Système d'administration",
        icon: "admin",
        description:
          "Panels, boutons, menus et contrôles propres pour gérer le bot sans friction.",
      },
      {
        title: "Automatisation serveur",
        icon: "workflow",
        description:
          "Rôles, annonces, alertes, synchronisations, routines et workflows Discord.",
      },
      {
        title: "Amélioration de bot existant",
        icon: "spark",
        description:
          "Refonte de commandes, UX Discord plus propre, correction et stabilisation.",
      },
      {
        title: "Maintenance de bot",
        icon: "maintenance",
        description:
          "Suivi, corrections, mises à jour et évolution progressive du projet.",
      },
    ],
  },
  projects: {
    eyebrow: "Mes projets / exemples de bots",
    title: "QUP est un exemple de mon travail, pas l'identité du site.",
    description:
      "Ces bots montrent les types de systèmes que je peux concevoir : modération, communauté, esport, annonces, maintenance et outils admin.",
    exampleBadge: "Exemple",
    cta: "Créer un bot similaire",
    items: [
      {
        id: "mana",
        name: "QUP MANA",
        type: "Gestion, modération et automatisation",
        icon: "shield",
        description:
          "Bot principal de gestion, modération et automatisation Discord.",
        features: [
          "Warn",
          "Timeout",
          "Kick",
          "Ban",
          "Logs",
          "AutoMod",
          "Commandes slash",
          "Traduction",
          "Interface admin",
          "Boutons et menus Discord",
        ],
      },
      {
        id: "commu",
        name: "QUP Commu",
        type: "Communautaire",
        icon: "community",
        description: "Bot orienté animation, interaction et vie de communauté.",
        features: [
          "Animation",
          "Interactions",
          "Mini-jeux",
          "Prédictions",
          "Étiquettes",
          "Événements communautaires",
        ],
      },
      {
        id: "mans",
        name: "QUP MANS",
        type: "Compétitif",
        icon: "trophy",
        description: "Bot compétitif pour organiser des matchs esport facilement.",
        features: [
          "6 mans",
          "4 mans",
          "2 mans",
          "Files d'attente",
          "Équipes automatiques",
          "Classement",
          "Matchs esport",
        ],
      },
      {
        id: "core",
        name: "QUP CORE",
        type: "Suivi et communication",
        icon: "core",
        description:
          "Bot central pour suivre les annonces, statuts et informations importantes.",
        features: [
          "Annonces de développement",
          "Changelogs",
          "Statuts",
          "Maintenance",
          "Informations importantes",
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Des offres claires, du module simple au système complet.",
    description:
      "Chaque projet est unique : ces tarifs servent de repère. Le prix final dépend des modules, de la complexité et du délai.",
    note: "Tarifs indicatifs · Devis gratuit · Paiement après validation du cahier des charges.",
    mostPopular: "Le plus demandé",
    tiers: [
      {
        id: "essentiel",
        name: "Essentiel",
        tagline: "Un module Discord propre et solide.",
        price: "49 €",
        priceNote: "à partir de · projet unique",
        icon: "spark",
        features: [
          "1 module au choix (modération, tickets, logs…)",
          "Slash commands, boutons et menus",
          "Mise en place et aide au déploiement",
          "Documentation simple d'utilisation",
          "7 jours d'ajustements inclus",
        ],
        cta: "Choisir Essentiel",
      },
      {
        id: "sur-mesure",
        name: "Sur Mesure",
        tagline: "Un bot complet pensé autour de ton serveur.",
        price: "149 €",
        priceNote: "à partir de · projet unique",
        icon: "bot",
        featured: true,
        badge: "Le plus demandé",
        features: [
          "Plusieurs modules combinés",
          "Interface admin (boutons + menus)",
          "Base de données et logs",
          "Automatisations serveur",
          "30 jours de support",
          "Révisions incluses",
        ],
        cta: "Choisir Sur Mesure",
      },
      {
        id: "studio",
        name: "Studio",
        tagline: "Système avancé, IA et évolutif.",
        price: "Sur devis",
        priceNote: "projet long terme",
        icon: "ai",
        features: [
          "Architecture évolutive multi-modules",
          "IA et automatisations avancées",
          "Dashboard / outils d'administration",
          "Intégrations externes (API, sites…)",
          "Maintenance prioritaire",
          "Accompagnement long terme",
        ],
        cta: "Demander un devis",
      },
    ],
  },
  why: {
    eyebrow: "Pourquoi travailler avec moi ?",
    title: "Du code propre, une UX Discord claire et une vision long terme.",
    description:
      "Je pense le bot comme un vrai outil de serveur : simple pour les admins, fluide pour les membres, assez solide pour évoluer.",
    items: [
      "Bots faits sur mesure selon les besoins réels du serveur.",
      "Design moderne avec commandes slash, boutons et menus Discord.",
      "Systèmes utiles, stables et simples à utiliser.",
      "Adaptation aux serveurs RP, esport, communautaires et professionnels.",
      "Possibilité d'ajouter de l'IA, des automatisations et des outils avancés.",
      "Interface claire pour les admins et expérience fluide pour les membres.",
      "Code évolutif pour ajouter de nouvelles fonctionnalités plus tard.",
      "Communication directe pour cadrer le projet sans lourdeur inutile.",
    ],
  },
  process: {
    eyebrow: "Processus",
    title: "Une méthode simple pour passer d'une idée à un bot utilisable.",
    description:
      "Le cadrage reste direct : on clarifie le besoin, on construit, on teste, puis on ajuste.",
    steps: [
      {
        title: "Idée",
        text: "Tu m'expliques ton idée, ton serveur et ce que tu veux automatiser.",
      },
      {
        title: "Besoins",
        text: "Je regarde les rôles, les salons, les usages et les priorités.",
      },
      {
        title: "Structure",
        text: "Je propose une structure de bot claire avant de développer.",
      },
      {
        title: "Développement",
        text: "Le bot est codé avec des commandes, contrôles et modules propres.",
      },
      {
        title: "Tests",
        text: "Les workflows principaux sont vérifiés avant livraison.",
      },
      {
        title: "Livraison",
        text: "Le bot est ajusté selon tes retours puis peut évoluer ensuite.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tu veux un bot Discord custom ?",
    description:
      "Remplis le formulaire ou ajoute-moi sur Discord avec ton idée, ton type de serveur et les fonctionnalités que tu veux.",
    discordLabel: "Discord",
    emailLabel: "Email",
    expectLabel: "Réponse attendue",
    expectValue: "Idée, type de serveur, fonctionnalités, budget",
    discordCardTitle: "Discord direct",
    discordCardText:
      "Le plus simple pour parler rapidement du serveur, des modules et des priorités.",
    emailCardTitle: "Email projet",
    emailCardText:
      "Parfait si tu veux envoyer une demande plus structurée avec ton idée, ton budget et ton délai.",
    formTitle: "Décris ton projet",
    formDescription:
      "Remplis ce formulaire : ta demande m'arrive directement par email. Réponse sous 24-48h en général.",
    form: {
      name: "Ton nom / pseudo",
      contact: "Discord ou email pour te répondre",
      contactHint: "Pour que je puisse te recontacter.",
      serverType: "Type de serveur",
      serverTypeOptions: [
        "Communauté",
        "Esport / Gaming",
        "RP",
        "Entreprise / Pro",
        "Autre",
      ],
      budget: "Budget approximatif",
      budgetOptions: [
        "Moins de 50 €",
        "50 – 150 €",
        "150 – 400 €",
        "400 € et +",
        "À discuter",
      ],
      message: "Décris ton projet",
      messagePlaceholder:
        "Type de serveur, fonctionnalités voulues, délai souhaité…",
      submit: "Envoyer ma demande",
      submitting: "Envoi en cours…",
      successTitle: "Demande envoyée",
      successText:
        "Merci ! Ta demande m'est bien parvenue, je reviens vers toi très vite (souvent sous 24-48h).",
      errorTitle: "Envoi impossible pour le moment",
      errorText:
        "Le formulaire n'a pas pu envoyer l'email. Tu peux me contacter directement ci-dessous :",
      fallbackEmail: "M'écrire par email",
      fallbackDiscord: "Copier mon Discord",
      required: "Ce champ est requis",
    },
    bannerEyebrow: "Prochain système Discord",
    bannerTitle:
      "Envoie-moi ton idée, je regarde comment la transformer en bot concret.",
    bannerCta: "Envoyer un email",
  },
  footer: {
    tagline: "Créateur de bots Discord custom",
    rights: "Tous droits réservés.",
  },
};

const en: SiteContent = {
  brand: {
    name: NAME,
    shortName: SHORT,
    tagline: "Custom Discord bot developer",
    role: "Discord systems developer",
    discord: DISCORD,
    email: EMAIL,
    mailto: buildMailto(
      "Custom Discord bot request",
      "Hi 17Lud,\n\nServer type: \nDesired features: \nApprox. budget: \nTimeline: \n",
    ),
  },
  ui: {
    skipToContent: "Skip to content",
    contactCta: "Contact me",
    requestBot: "Request a bot",
    openMenu: "Open menu",
    switchLanguage: "Switch to French",
    backToTop: "Back to top",
  },
  nav: [
    { label: "Home", href: "#accueil" },
    { label: "About", href: "#a-propos" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projets" },
    { label: "Pricing", href: "#tarifs" },
    { label: "Process", href: "#processus" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Discord systems developer",
    title: "I build custom Discord bots — modern, clean and powerful.",
    description:
      "Custom Discord bot development for communities, RP servers, esport projects, businesses and creators.",
    primaryCta: "View my projects",
    secondaryCta: "Contact me",
    scroll: "Scroll",
  },
  stats: [
    { label: "Identity", value: "Personal portfolio" },
    { label: "Focus", value: "Discord bots" },
    { label: "Approach", value: "Fully custom" },
  ],
  about: {
    eyebrow: "About",
    title:
      "I turn a server's needs into clear, stable and genuinely useful Discord systems.",
    description:
      "I build custom Discord bots to help servers manage themselves, automate, and offer a better experience to their members. Moderation, tickets, logs, esport, RP, communities or AI tools: every project is designed around your server, your team and your real use cases.",
    principles: [
      "Modern Discord interfaces with slash commands, buttons and menus.",
      "Clean architecture so the bot can grow without starting over.",
      "A simple, direct admin experience and a clear member journey.",
    ],
    cardTitle: "A developer's approach, not a template.",
    cardText:
      "The goal isn't just to add commands. I build real server logic: permissions, moderation, automations, admin experience and the member journey.",
    profileName: "17Lud",
    profileRole: "Custom Discord bot creator",
    profileAlt: "Portrait of 17Lud, Discord bot creator",
    profileTags: ["Discord.js", "Node.js", "Discord UI/UX"],
  },
  services: {
    eyebrow: "What I can build",
    title: "Custom Discord systems for your server, not features thrown together.",
    description:
      "Each card can become a standalone module or part of a full bot, depending on what you need.",
    items: [
      {
        title: "Custom Discord bot",
        icon: "bot",
        description:
          "A bot designed around your server, your roles, your permissions and your workflows.",
      },
      {
        title: "Moderation bot",
        icon: "shield",
        description:
          "Warns, timeout, kick, ban, history, staff notes and clean actions.",
      },
      {
        title: "Ticket bot",
        icon: "ticket",
        description: "Support, applications, orders, reports or private requests.",
      },
      {
        title: "Logging bot",
        icon: "logs",
        description:
          "Clear tracking of important actions with dedicated channels and quick reading.",
      },
      {
        title: "Community bot",
        icon: "community",
        description:
          "Animations, interactions, mini-games, events and engagement tools.",
      },
      {
        title: "Esport bot",
        icon: "trophy",
        description:
          "Match organisation, queues, automatic teams, scores and leaderboards.",
      },
      {
        title: "6 mans / 4 mans / 2 mans",
        icon: "swords",
        description:
          "Competitive system for Rocket League and other gaming communities.",
      },
      {
        title: "RP bot",
        icon: "mask",
        description:
          "Tools for RP scenes, roles, records, validations and server automations.",
      },
      {
        title: "AI-powered bot",
        icon: "ai",
        description:
          "Assistants, assisted moderation, response generation and smart tools.",
      },
      {
        title: "Admin system",
        icon: "admin",
        description:
          "Panels, buttons, menus and clean controls to manage the bot without friction.",
      },
      {
        title: "Server automation",
        icon: "workflow",
        description:
          "Roles, announcements, alerts, syncs, routines and Discord workflows.",
      },
      {
        title: "Existing bot upgrade",
        icon: "spark",
        description:
          "Command rework, cleaner Discord UX, fixes and stabilisation.",
      },
      {
        title: "Bot maintenance",
        icon: "maintenance",
        description:
          "Monitoring, fixes, updates and gradual evolution of the project.",
      },
    ],
  },
  projects: {
    eyebrow: "My projects / bot examples",
    title: "QUP is an example of my work, not the identity of this site.",
    description:
      "These bots show the kinds of systems I can design: moderation, community, esport, announcements, maintenance and admin tools.",
    exampleBadge: "Example",
    cta: "Build a similar bot",
    items: [
      {
        id: "mana",
        name: "QUP MANA",
        type: "Management, moderation and automation",
        icon: "shield",
        description:
          "Main bot for Discord management, moderation and automation.",
        features: [
          "Warn",
          "Timeout",
          "Kick",
          "Ban",
          "Logs",
          "AutoMod",
          "Slash commands",
          "Translation",
          "Admin interface",
          "Discord buttons and menus",
        ],
      },
      {
        id: "commu",
        name: "QUP Commu",
        type: "Community",
        icon: "community",
        description: "Bot focused on animation, interaction and community life.",
        features: [
          "Animation",
          "Interactions",
          "Mini-games",
          "Predictions",
          "Labels",
          "Community events",
        ],
      },
      {
        id: "mans",
        name: "QUP MANS",
        type: "Competitive",
        icon: "trophy",
        description: "Competitive bot to organise esport matches easily.",
        features: [
          "6 mans",
          "4 mans",
          "2 mans",
          "Queues",
          "Automatic teams",
          "Leaderboard",
          "Esport matches",
        ],
      },
      {
        id: "core",
        name: "QUP CORE",
        type: "Tracking and communication",
        icon: "core",
        description:
          "Central bot to track announcements, statuses and important information.",
        features: [
          "Development announcements",
          "Changelogs",
          "Statuses",
          "Maintenance",
          "Important information",
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear offers, from a single module to a full system.",
    description:
      "Every project is unique: these prices are a baseline. The final price depends on the modules, complexity and timeline.",
    note: "Indicative pricing · Free quote · Payment after the spec is agreed.",
    mostPopular: "Most popular",
    tiers: [
      {
        id: "essentiel",
        name: "Essential",
        tagline: "One clean, solid Discord module.",
        price: "€49",
        priceNote: "from · one-off project",
        icon: "spark",
        features: [
          "1 module of your choice (moderation, tickets, logs…)",
          "Slash commands, buttons and menus",
          "Setup and deployment help",
          "Simple usage documentation",
          "7 days of adjustments included",
        ],
        cta: "Choose Essential",
      },
      {
        id: "sur-mesure",
        name: "Custom",
        tagline: "A complete bot built around your server.",
        price: "€149",
        priceNote: "from · one-off project",
        icon: "bot",
        featured: true,
        badge: "Most popular",
        features: [
          "Multiple combined modules",
          "Admin interface (buttons + menus)",
          "Database and logs",
          "Server automations",
          "30 days of support",
          "Revisions included",
        ],
        cta: "Choose Custom",
      },
      {
        id: "studio",
        name: "Studio",
        tagline: "Advanced, AI-driven and scalable.",
        price: "On quote",
        priceNote: "long-term project",
        icon: "ai",
        features: [
          "Scalable multi-module architecture",
          "Advanced AI and automations",
          "Dashboard / admin tools",
          "External integrations (APIs, sites…)",
          "Priority maintenance",
          "Long-term support",
        ],
        cta: "Request a quote",
      },
    ],
  },
  why: {
    eyebrow: "Why work with me?",
    title: "Clean code, a clear Discord UX and a long-term vision.",
    description:
      "I treat the bot as a real server tool: simple for admins, smooth for members, solid enough to grow.",
    items: [
      "Bots built to match the server's real needs.",
      "Modern design with slash commands, buttons and Discord menus.",
      "Useful, stable systems that are simple to use.",
      "Fits RP, esport, community and professional servers.",
      "Option to add AI, automations and advanced tools.",
      "A clear interface for admins and a smooth experience for members.",
      "Scalable code to add new features later.",
      "Direct communication to scope the project without overhead.",
    ],
  },
  process: {
    eyebrow: "Process",
    title: "A simple method to go from an idea to a usable bot.",
    description:
      "The scoping stays direct: we clarify the need, build, test, then adjust.",
    steps: [
      {
        title: "Idea",
        text: "You explain your idea, your server and what you want to automate.",
      },
      {
        title: "Needs",
        text: "I review the roles, channels, use cases and priorities.",
      },
      {
        title: "Structure",
        text: "I propose a clear bot structure before development.",
      },
      {
        title: "Development",
        text: "The bot is coded with clean commands, controls and modules.",
      },
      {
        title: "Testing",
        text: "The main workflows are verified before delivery.",
      },
      {
        title: "Delivery",
        text: "The bot is adjusted to your feedback and can keep evolving.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Want a custom Discord bot?",
    description:
      "Fill in the form or add me on Discord with your idea, your server type and the features you want.",
    discordLabel: "Discord",
    emailLabel: "Email",
    expectLabel: "What to send",
    expectValue: "Idea, server type, features, budget",
    discordCardTitle: "Discord direct",
    discordCardText:
      "The easiest way to quickly talk about the server, the modules and the priorities.",
    emailCardTitle: "Project email",
    emailCardText:
      "Perfect if you want to send a more structured request with your idea, budget and timeline.",
    formTitle: "Describe your project",
    formDescription:
      "Fill in this form: your request reaches me directly by email. Usually answered within 24-48h.",
    form: {
      name: "Your name / username",
      contact: "Discord or email to reach you",
      contactHint: "So I can get back to you.",
      serverType: "Server type",
      serverTypeOptions: ["Community", "Esport / Gaming", "RP", "Business / Pro", "Other"],
      budget: "Approx. budget",
      budgetOptions: [
        "Under €50",
        "€50 – 150",
        "€150 – 400",
        "€400 and up",
        "Let's discuss",
      ],
      message: "Describe your project",
      messagePlaceholder: "Server type, features you want, desired timeline…",
      submit: "Send my request",
      submitting: "Sending…",
      successTitle: "Request sent",
      successText:
        "Thanks! Your request reached me, I'll get back to you very soon (often within 24-48h).",
      errorTitle: "Couldn't send right now",
      errorText:
        "The form couldn't send the email. You can reach me directly below:",
      fallbackEmail: "Email me",
      fallbackDiscord: "Copy my Discord",
      required: "This field is required",
    },
    bannerEyebrow: "Your next Discord system",
    bannerTitle: "Send me your idea — I'll look at how to turn it into a real bot.",
    bannerCta: "Send an email",
  },
  footer: {
    tagline: "Custom Discord bot developer",
    rights: "All rights reserved.",
  },
};

export const siteContent: Record<Locale, SiteContent> = { fr, en };
