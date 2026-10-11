"use client";

import { useState } from "react";
import BackgroundMusic from "@/components/BackgroundMusic";
import IntroSequence from "@/components/IntroSequence";
import HeroSection from "@/components/HeroSection";
import WishesSection from "@/components/WishesSection";
import VaultSection from "@/components/VaultSection";

export default function Home() {
  const [currentStage, setCurrentStage] = useState<"intro" | "hero">("intro");

  return (
    <main className="w-screen overflow-x-hidden bg-[#101113]">
      {/* Plays /audio/birthday-song.mp3 — put your song in public/audio/ */}
      <BackgroundMusic />
      {currentStage === "intro" ? (
        <IntroSequence onComplete={() => setCurrentStage("hero")} />
      ) : (
        <>
          <HeroSection />
          {/* STAGE 4 — WISHES: natural scroll continuation from the hero. */}
          <WishesSection />
          {/* STAGE 5 — DIGITAL VAULT: natural scroll continuation from WISHES. */}
          <VaultSection />
        </>
      )}
    </main>
  );
}
