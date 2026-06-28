export const siteContent = {
  brand: {
    name: "17Lud Studio",
    shortName: "17L",
    tagline: "Créateur de bots Discord custom",
    role: "Discord bot systems developer",
    discord: "17lud",
    email: "ludofootball@icloud.com",
    mailto:
      "mailto:ludofootball@icloud.com?subject=Demande%20de%20bot%20Discord%20custom&body=Salut%2017Lud%2C%0A%0AType%20de%20serveur%20%3A%20%0AFonctionnalites%20souhaitees%20%3A%20%0ABudget%20approximatif%20%3A%20%0ADelai%20souhaite%20%3A%20%0A",
  },
  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#a-propos" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projets" },
    { label: "Processus", href: "#processus" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    { label: "Identité", value: "Portfolio perso" },
    { label: "Spécialité", value: "Bots Discord" },
    { label: "Approche", value: "Sur mesure" },
  ],
  about: {
    eyebrow: "À propos",
    title: "Je transforme les besoins d'un serveur en systèmes Discord clairs, stables et utiles.",
    description:
      "Je crée des bots Discord personnalisés pour aider les serveurs à mieux se gérer, s'automatiser et offrir une meilleure expérience aux membres. Modération, tickets, logs, esport, RP, communautés ou outils avec IA : chaque projet est pensé autour de ton serveur, de ton équipe et de tes vrais usages.",
    principles: [
      "Interfaces Discord modernes avec slash commands, boutons et menus.",
      "Architecture propre pour faire évoluer le bot sans repartir de zéro.",
      "Expérience admin simple, directe et lisible pour les membres.",
    ],
  },
  // Modifie cette liste pour ajuster les services que tu proposes.
  services: [
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
        "Assistants, moderation assistee, generation de reponses et outils intelligents.",
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
  // Les projets QUP restent ici comme exemples, pas comme identite principale.
  projects: [
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
      description:
        "Bot oriente animation, interaction et vie de communaute.",
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
      description:
        "Bot compétitif pour organiser des matchs esport facilement.",
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
        "Annonces de developpement",
        "Changelogs",
        "Statuts",
        "Maintenance",
        "Informations importantes",
      ],
    },
  ],
  reasons: [
    "Bots faits sur mesure selon les besoins réels du serveur.",
    "Design moderne avec commandes slash, boutons et menus Discord.",
    "Systèmes utiles, stables et simples à utiliser.",
    "Adaptation aux serveurs RP, esport, communautaires et professionnels.",
    "Possibilité d'ajouter de l'IA, des automatisations et des outils avancés.",
    "Interface claire pour les admins et expérience fluide pour les membres.",
    "Code évolutif pour ajouter de nouvelles fonctionnalités plus tard.",
    "Communication directe pour cadrer le projet sans lourdeur inutile.",
  ],
  process: [
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
};
