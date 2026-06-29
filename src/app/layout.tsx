import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CurrencyProvider } from "@/components/site/currency-provider";
import { LanguageProvider } from "@/components/site/language-provider";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SpotlightCursor } from "@/components/site/spotlight-cursor";
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
  metadataBase: new URL("https://17lud.studio"),
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
  openGraph: {
    title: "17Lud Studio - Bots Discord custom",
    description:
      "Des systemes Discord sur mesure pour automatiser, moderer et faire evoluer ton serveur.",
    images: ["/images/qup-bots-hero-dashboard.png"],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <LanguageProvider>
          <CurrencyProvider>
            <ScrollProgress />
            <SpotlightCursor />
            {children}
          </CurrencyProvider>
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
