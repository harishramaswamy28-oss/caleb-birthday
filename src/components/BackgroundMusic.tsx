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
  const [isMuted, setIsMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [missingFile, setMissingFile] = useState(false);
  // Mirror of isMuted for use inside tryPlay without re-subscribing listeners.
  const mutedRef = useRef(false);

  const setMutedState = useCallback((muted: boolean) => {
    mutedRef.current = muted;
    setIsMuted(muted);
    const el = audioRef.current;
    if (el && el.muted !== muted) el.muted = muted;
  }, []);

  const tryPlay = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.volume = volume;
      // Apply the user's mute choice BEFORE play so autoplay/unlock
      // never blasts sound after they muted (mobile-safe).
      el.muted = mutedRef.current;
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

  // Keep volume in sync if the prop changes (never touch `muted` here).
  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
  }, [volume]);

  // Re-assert mute on track change so a new src can't start unmuted.
  useEffect(() => {
    const el = audioRef.current;
    if (el) el.muted = mutedRef.current;
  }, [src]);

  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    // Mute/unmute WITHOUT pausing: playback position is preserved.
    const nextMuted = el ? !el.muted : !mutedRef.current;
    mutedRef.current = nextMuted;
    setIsMuted(nextMuted);
    if (el) {
      el.muted = nextMuted;
      if (!el.paused) setIsPlaying(true);
    }
  }, []);

  const startPlayback = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      await tryPlay();
    }
    // If already playing but muted, unmute in place (position preserved).
    else if (el.muted) {
      setMutedState(false);
    }
  }, [tryPlay, setMutedState]);

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
        onVolumeChange={(e) => {
          // Icon/label always mirror the element's real muted flag,
          // even if mute changes outside this button (e.g. mobile OS).
          mutedRef.current = e.currentTarget.muted;
          setIsMuted(e.currentTarget.muted);
        }}
        onError={() => {
          // Helpful hint in devtools when the MP3 hasn't been added yet.
          console.warn(
            `[BackgroundMusic] Could not load "${src}". Add your song at "public${src}" (e.g. public/audio/birthday-song.mp3) and refresh.`
          );
          setMissingFile(true);
        }}
      />

      {/* Floating mute toggle — playback keeps running; only `muted` flips */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute birthday music" : "Mute birthday music"}
        aria-pressed={isMuted}
        title={isMuted ? "Unmute music" : "Mute music"}
        className="fixed bottom-5 right-5 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(198,201,208,0.35)] bg-[rgba(16,17,19,0.75)] text-lg text-[#F5F6F8] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-[rgba(198,201,208,0.2)]"
      >
        <span aria-hidden="true">{isMuted ? "🔇" : "🔊"}</span>
      </button>

      {/* Gentle nudge while the browser is still blocking sound */}
      {needsGesture && !isPlaying && (
        <button
          type="button"
          onClick={startPlayback}
          className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[rgba(198,201,208,0.35)] bg-[rgba(16,17,19,0.85)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#F5F6F8] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-[rgba(198,201,208,0.2)]"
        >
          ♪ Tap for sound
        </button>
      )}
    </>
  );
}
