import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { CurrencyProvider } from "@/components/site/currency-provider";
import { LanguageProvider } from "@/components/site/language-provider";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SpotlightCursor } from "@/components/site/spotlight-cursor";
import { ToastProvider } from "@/components/site/toast";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "17Lud Studio - Bots Discord custom",
    template: "%s | 17Lud Studio",
  },
  description:
    "Portfolio personnel de 17Lud, createur de bots Discord custom pour moderation, tickets, logs, IA, automatisation, RP, esport et communautes.",
  keywords: [
    "17Lud Studio",
    "17lud",
    "bot Discord custom",
    "createur de bots Discord",
    "developpeur Discord",
    "bot moderation Discord",
    "bot esport Discord",
    "automatisation Discord",
    "QUP Mana",
    "QUP Hubs",
    "QUP Mans",
    "QUP Core",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "17Lud Studio - Bots Discord custom",
    description:
      "Des systemes Discord sur mesure pour automatiser, moderer et faire evoluer ton serveur.",
    url: SITE_URL,
    siteName: "17Lud Studio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "17Lud Studio - Bots Discord custom",
    description:
      "Des systemes Discord sur mesure pour automatiser, moderer et faire evoluer ton serveur.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "17Lud Studio",
  description:
    "Createur de bots Discord custom : moderation, tickets, logs, IA, automatisation, RP, esport et communautes.",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  areaServed: "Worldwide",
  serviceType: "Discord bot development",
  knowsAbout: [
    "Discord bots",
    "Discord.js",
    "Moderation",
    "Automation",
    "Esport",
    "Roleplay",
  ],
  founder: { "@type": "Person", name: "17Lud" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <CurrencyProvider>
            <ScrollProgress />
            <SpotlightCursor />
            <ToastProvider>{children}</ToastProvider>
          </CurrencyProvider>
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
