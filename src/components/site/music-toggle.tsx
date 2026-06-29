"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Background music toggle. Off by default (browsers block autoplay).
 * Drop a royalty-free loop at public/audio/ambient.mp3 to enable it.
 */
export function MusicToggle({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.25;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" src="/audio/ambient.mp3" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Couper la musique" : "Activer la musique"}
        aria-pressed={playing}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-zinc-300 transition duration-200 hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          className,
        )}
      >
        {playing ? (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
