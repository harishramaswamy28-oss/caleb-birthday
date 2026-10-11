"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  src?: string;
  volume?: number;
}

/**
 * BackgroundMusic — site-wide autoplay music player.
 *
 * Browsers block audible autoplay until the user interacts with the page,
 * so this component:
 *  1. Tries `audio.play()` immediately on mount (works if the browser allows it,
 *     or if the user has already interacted / whitelisted the site).
 *  2. Otherwise waits for the first tap/click/keypress and starts music then.
 *  3. Shows a floating sound toggle + a "Tap for sound" pill while blocked.
 *
 * Usage: drop your song at `public/audio/birthday-song.mp3`, then render
 * `<BackgroundMusic />` once at the top level (e.g. in `src/app/page.tsx`).
 */
export default function BackgroundMusic({
  src = "/audio/birthday-song.mpeg",
  volume = 0.7,
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [missingFile, setMissingFile] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.volume = volume;
      await el.play();
      setIsPlaying(true);
      setNeedsGesture(false);
    } catch {
      // Autoplay blocked — wait for a user gesture.
      setIsPlaying(false);
      setNeedsGesture(true);
    }
  }, [volume]);

  useEffect(() => {
    tryPlay();

    // First interaction unlocks audio on Chrome/Safari/mobile.
    const unlock = () => {
      tryPlay();
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("touchstart", unlock);
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [tryPlay]);

  const toggle = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      await tryPlay();
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [tryPlay]);

  if (missingFile) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setNeedsGesture(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          // Helpful hint in devtools when the MP3 hasn't been added yet.
          console.warn(
            `[BackgroundMusic] Could not load "${src}". Add your song at "public${src}" (e.g. public/audio/birthday-song.mp3) and refresh.`
          );
          setMissingFile(true);
        }}
      />

      {/* Floating sound toggle — always visible so visitors can mute */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Mute birthday music" : "Play birthday music"}
        title={isPlaying ? "Mute music" : "Play music"}
        className="fixed bottom-5 right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(198,201,208,0.35)] bg-[rgba(16,17,19,0.75)] text-lg text-[#F5F6F8] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-[rgba(198,201,208,0.2)]"
      >
        <span aria-hidden="true">{isPlaying ? "🔊" : "🔇"}</span>
      </button>

      {/* Gentle nudge while the browser is still blocking sound */}
      {needsGesture && !isPlaying && (
        <button
          type="button"
          onClick={tryPlay}
          className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[rgba(198,201,208,0.35)] bg-[rgba(16,17,19,0.85)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#F5F6F8] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-[rgba(198,201,208,0.2)]"
        >
          ♪ Tap for sound
        </button>
      )}
    </>
  );
}
