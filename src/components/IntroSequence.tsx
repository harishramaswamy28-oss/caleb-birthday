"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_PHOTOS } from "@/data/introPhotos";

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);

  // Respect prefers-reduced-motion: skip straight to title
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) return;
    if (titleRef.current) titleRef.current.style.opacity = "1";
    if (titleInnerRef.current) titleInnerRef.current.style.opacity = "1";
    if (onComplete) onComplete();
  }, [onComplete]);


  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) return;
      }

      // Premium cinematic photo sequence
      // ~0.8s per photo total, continuous overlap, zero static hold
      const enter = 0.42;
      const exit = 0.38;
      const overlap = "-=0.32";

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Initial states: hide everything cleanly
      photoRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.92, willChange: "transform, opacity" });
      });
      gsap.set(titleRef.current, { opacity: 0 });
      gsap.set(titleInnerRef.current, { opacity: 0, y: 18, scale: 0.96 });

      INTRO_PHOTOS.forEach((_, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        const pos = i === 0 ? 0 : overlap;
        tl.to(el, { opacity: 1, scale: 1, duration: enter, ease: "power2.out" }, pos)
          .to(el, { opacity: 0, scale: 0.88, duration: exit, ease: "power2.in" });
      });

      // Title reveal: final photo dissolves naturally into the black-chrome title scene
      tl.to(titleRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.12")
        .to(titleInnerRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .to({}, { duration: 4 }) // Hold completed title visible for ~4 seconds
        .to(titleInnerRef.current, { opacity: 0, scale: 0.98, y: -10, duration: 0.8, ease: "power2.inOut" })
        .to(titleRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.6");
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 45%, #222327 0%, #101113 65%), linear-gradient(175deg, #1C1D20 0%, #0E0F11 50%, #161719 100%)",
      }}
    >
      {/* Layered graphite and silver ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Broad central silver-grey ambient light */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "10%",
            width: "80%",
            height: "55%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(198,201,208,0.055) 0%, transparent 70%)",
            animation: "drift-up 18s ease-in-out infinite",
          }}
        />
        {/* Soft top-left reflection */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-8%",
            width: "55%",
            height: "55%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,201,208,0.04) 0%, transparent 68%)",
            animation: "drift-up 14s ease-in-out infinite reverse",
          }}
        />
        {/* Bottom-right cool graphite reflection */}
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-8%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(117,119,128,0.06) 0%, transparent 70%)",
            animation: "drift-up 20s ease-in-out infinite",
            animationDelay: "-7s",
          }}
        />
      </div>

      {/* Deep vignette for cinematic edge darkness */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.95), inset 0 0 200px rgba(0,0,0,0.6)",
        }}
      />

      {/* 7 Full-viewport immersive photos */}
      {INTRO_PHOTOS.map((photo, i) => (
        <div
          key={photo.id}
          ref={(el) => { photoRefs.current[i] = el; }}
          className="absolute inset-0 z-20 overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i < 3}
              sizes="100vw"
              className="object-cover"
            />
            {/* Subtle graphite gradient to preserve contrast and depth */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(10,11,13,0.5) 0%, transparent 25%), linear-gradient(to top, rgba(10,11,13,0.6) 0%, transparent 30%)",
              }}
            />
          </div>


          <div className="absolute top-7 left-7 z-30 font-mono text-[10px] tracking-[0.32em] uppercase text-[rgba(198,201,208,0.55)]">
            {photo.label}
          </div>


          <div className="absolute bottom-7 right-7 z-30 font-mono text-[10px] tracking-[0.32em] uppercase text-[rgba(198,201,208,0.55)]">
            {String(i + 1).padStart(2, "0")} / {String(INTRO_PHOTOS.length).padStart(2, "0")}
          </div>
        </div>
      ))}

      {/* Black-chrome Title Scene */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-50 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 90% 65% at 50% 48%, #232528 0%, #101113 60%), linear-gradient(170deg, #1A1B1E 0%, #0E0F11 50%, #151618 100%)",
        }}
      >
        {/* Ambient light sweeps and silver reflections */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-1">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: "linear-gradient(to bottom, rgba(245,246,248,0.045) 0%, transparent 100%)",
              animation: "silver-pulse 7s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "25%",
              background: "linear-gradient(to top, rgba(198,201,208,0.03) 0%, transparent 100%)",
              animation: "silver-pulse 10s ease-in-out infinite reverse",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "-20%",
              width: "40%",
              background: "linear-gradient(to right, transparent 0%, rgba(245,246,248,0.03) 50%, transparent 100%)",
              transform: "skewX(-15deg)",
              animation: "streak-slide 8s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
          />
        </div>

        {/* Cinematic vignette for title scene */}
        <div
          className="pointer-events-none absolute inset-0 z-2"
          style={{
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.85), inset 0 0 300px rgba(0,0,0,0.4)",
          }}
        />


        <div
          ref={titleInnerRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10"
        >
          {/* Refined sharp silver accent rule */}
          <div
            style={{
              width: "clamp(60px, 8vw, 120px)",
              height: "1px",
              marginBottom: "clamp(20px, 3vh, 36px)",
              background: "linear-gradient(to right, transparent, rgba(198,201,208,0.8), transparent)",
            }}
          />

          <span
            style={{
              fontSize: "clamp(9px, 1.1vw, 12px)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              color: "rgba(198,201,208,0.45)",
              marginBottom: "clamp(16px, 2.5vh, 28px)",
              display: "block",
            }}
          >
            A Cinematic Tribute
          </span>


          <h1
            className="text-chrome"
            style={{
              fontSize: "clamp(2.2rem, 7.5vw, 6.5rem)",
              fontWeight: 900,
              letterSpacing: "0.06em",
              lineHeight: 1.1,
              maxWidth: "900px",
              filter: "drop-shadow(0 2px 24px rgba(198,201,208,0.18))",
            }}
          >
            HAPPY BIRTHDAY
            <br />
            CALEB
          </h1>


          <div
            style={{
              width: "clamp(60px, 8vw, 120px)",
              height: "1px",
              marginTop: "clamp(20px, 3vh, 36px)",
              background: "linear-gradient(to right, transparent, rgba(198,201,208,0.8), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
