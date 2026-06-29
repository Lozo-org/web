import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark, Wordmark } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="premium-grid flex min-h-screen flex-col items-center justify-center bg-[#020204] px-6 text-center text-white">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="17Lud Studio - Accueil"
      >
        <LogoMark className="h-10 w-10" />
        <Wordmark className="text-lg" />
      </Link>

      <p className="mt-10 font-mono text-sm uppercase tracking-[0.4em] text-zinc-500">
        Erreur 404
      </p>
      <h1 className="text-premium mt-4 font-display text-5xl font-semibold sm:text-7xl">
        Page introuvable
      </h1>
      <p className="mt-5 max-w-md text-base leading-7 text-zinc-300">
        Cette page n&apos;existe pas ou a été déplacée. Reviens à l&apos;accueil pour
        explorer mes bots Discord.
      </p>

      <Link href="/" className={`${buttonVariants({ variant: "primary", size: "lg" })} mt-9`}>
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
