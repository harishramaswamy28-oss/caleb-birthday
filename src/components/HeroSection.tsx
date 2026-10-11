"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO_CONFIG } from "@/data/heroConfig";

/**
 * STAGE 3 — Cinematic Hero Section
 * Entrance picks up immediately where Stage 2's title reveal fades out.
 * Portrait dissolves into the graphite background via a CSS mask while
 * the title slides in elegantly from the right.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Respect prefers-reduced-motion: present the hero immediately, no animation.
      if (reduceMotion) {
        gsap.set(
          [
            portraitWrapperRef.current,
            portraitImageRef.current,
            textContentRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      gsap.set(portraitWrapperRef.current, { opacity: 0, x: -40 });
      gsap.set(portraitImageRef.current, { opacity: 0, scale: 1.08 });
      gsap.set(textContentRef.current, { opacity: 0, x: 56 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(portraitWrapperRef.current, { opacity: 1, x: 0, duration: 1.3 })
        .to(portraitImageRef.current, { opacity: 1, scale: 1, duration: 1.5 }, "<0.1")
        .to(textContentRef.current, { opacity: 1, x: 0, duration: 1.1 }, "-=1.0")
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

      // useGSAP auto-reverts this scope's tweens/timelines on unmount —
      // no manual timeline leaks between stage transitions or re-mounts.
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-between select-none px-6 sm:px-10 md:px-14 lg:px-20 py-14 lg:py-0 gap-10 lg:gap-6"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 40%, #1A1C20 0%, #101113 70%), linear-gradient(180deg, #18191C 0%, #101113 100%)",
      }}
    >
      {/* Ambient graphite + silver light layers — same palette as Stage 1 & 2 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "-15%",
            left: "20%",
            width: "60vw",
            height: "130vh",
            background:
              "linear-gradient(125deg, transparent 20%, rgba(245,246,248,0.04) 45%, rgba(198,201,208,0.06) 50%, rgba(245,246,248,0.04) 55%, transparent 80%)",
            transform: "rotate(-12deg)",
            filter: "blur(50px)",
            animation: "drift-up 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "5%",
            width: "55vw",
            height: "60vh",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(198,201,208,0.05) 0%, rgba(53,56,62,0.02) 55%, transparent 72%)",
            animation: "silver-pulse 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: "45vw",
            height: "45vh",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(117,119,128,0.06) 0%, transparent 70%)",
            animation: "drift-up 19s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Cinematic vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          boxShadow: "inset 0 0 110px rgba(0,0,0,0.9), inset 0 0 260px rgba(0,0,0,0.55)",
        }}
      />

      {/* Portrait — LEFT on desktop (~44% width), stacked on TOP on mobile */}
      <div
        ref={portraitWrapperRef}
        className="relative z-20 w-full max-w-[420px] lg:max-w-none lg:w-[44%] h-[42vh] sm:h-[48vh] lg:h-[72vh] flex-shrink-0"
      >
        <div ref={portraitImageRef} className="relative w-full h-full">
          {/* Soft ambient halo behind the portrait for metallic depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 42%, rgba(198,201,208,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          {/*
            REPLACE-ME: swap HERO_CONFIG.portraitSrc in src/data/heroConfig.ts
            with Caleb's real photo (e.g. '/images/caleb.jpg') when available.
            This is the single source of truth for the hero portrait.
          */}
          <Image
            src={HERO_CONFIG.portraitSrc}
            alt={HERO_CONFIG.altText}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 44vw"
            className="object-cover object-top relative"
            style={{
              maskImage:
                "radial-gradient(ellipse 72% 88% at 42% 46%, black 48%, rgba(0,0,0,0.7) 68%, transparent 94%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 88% at 42% 46%, black 48%, rgba(0,0,0,0.7) 68%, transparent 94%)",
            }}
          />
        </div>
      </div>

      {/* Title — RIGHT on desktop, BELOW portrait on mobile */}
      <div
        ref={textContentRef}
        className="relative z-20 flex-1 flex flex-col items-center lg:items-end text-center lg:text-right max-w-full lg:max-w-[640px]"
      >
        <span
          style={{
            fontSize: "clamp(9px, 1.1vw, 12px)",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "rgba(198,201,208,0.45)",
            marginBottom: "clamp(14px, 2.2vh, 24px)",
            display: "block",
          }}
        >
          {HERO_CONFIG.chapterTag}
        </span>

        <h1
          className="text-chrome"
          style={{
            fontSize: "clamp(2rem, 6.2vw, 5.2rem)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            lineHeight: 1.12,
            maxWidth: "100%",
            filter: "drop-shadow(0 2px 24px rgba(198,201,208,0.16))",
          }}
        >
          {HERO_CONFIG.titleLine1}
          <br />
          {HERO_CONFIG.titleLine2}
        </h1>

        <div
          style={{
            width: "clamp(50px, 6vw, 90px)",
            height: "1px",
            marginTop: "clamp(18px, 2.6vh, 30px)",
            background:
              "linear-gradient(to right, transparent, rgba(198,201,208,0.7), transparent)",
          }}
        />
      </div>

      {/* Scroll indicator — hints at the upcoming WISHES section */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[rgba(198,201,208,0.45)]">
          Scroll
        </span>
        <div className="w-[20px] h-[32px] rounded-full border border-[rgba(198,201,208,0.3)] flex items-start justify-center pt-1.5">
          <span className="w-[3px] h-[6px] rounded-full bg-[rgba(198,201,208,0.75)] animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
