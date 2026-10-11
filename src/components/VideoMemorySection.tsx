"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_SRC = "/videos/caleb-friend-video.mp4";

/**
 * STAGE 6 — VIDEO MEMORY
 * A dedicated birthday-video section after the Digital Vault. Native HTML
 * video with controls (play/pause, seek/progress, volume, fullscreen) —
 * deliberately NO autoplay so visitors press Play themselves. Styled in the
 * Black Chrome & Silver theme with a subtle metallic frame.
 */
export default function VideoMemorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([headingRef.current, frameRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(frameRef.current, { opacity: 0, y: 40, scale: 0.98 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1.0 }).to(
        frameRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.1 },
        "-=0.55"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="A special birthday video for Caleb"
      className="relative w-full overflow-hidden flex flex-col items-center px-6 sm:px-10 py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 30%, #1A1C20 0%, #101113 70%), linear-gradient(180deg, #101113 0%, #141518 100%)",
      }}
    >
      {/* Ambient silver glow — same palette as the vault */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "50%",
            width: "70vw",
            height: "50vh",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(198,201,208,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Heading */}
      <div ref={headingRef} className="relative z-10 text-center max-w-3xl">
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
          Video Memory
        </span>
        <h2
          className="text-chrome"
          style={{
            fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            lineHeight: 1.15,
            filter: "drop-shadow(0 2px 24px rgba(198,201,208,0.16))",
          }}
        >
          A Special Video
          <br />
          for Caleb
        </h2>
        <div
          style={{
            width: "clamp(50px, 6vw, 90px)",
            height: "1px",
            margin: "clamp(18px, 2.6vh, 30px) auto 0",
            background:
              "linear-gradient(to right, transparent, rgba(198,201,208,0.7), transparent)",
          }}
        />
        <p
          className="mt-5 text-[clamp(0.9rem,1.8vw,1.05rem)] leading-relaxed"
          style={{ color: "rgba(245,246,248,0.65)", fontWeight: 300 }}
        >
          Press play and turn the sound on — a birthday message made just for you.
        </p>
      </div>

      {/* Metallic-framed responsive player */}
      <div ref={frameRef} className="relative z-10 w-full flex justify-center mt-10 sm:mt-12">
        <div
          className="w-full"
          style={{
            maxWidth: "880px",
            padding: "clamp(8px, 1.5vw, 14px)",
            borderRadius: "12px",
            background: "linear-gradient(160deg, #2A2D33 0%, #141518 40%, #1E2024 100%)",
            border: "1px solid rgba(198,201,208,0.28)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,246,248,0.12), 0 0 0 1px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              borderRadius: "7px",
              overflow: "hidden",
              background: "#000",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6)",
            }}
          >
            <video
              src={VIDEO_SRC}
              controls
              preload="metadata"
              playsInline
              disablePictureInPicture={false}
              aria-label="Birthday video for Caleb from a friend"
              className="block w-full h-auto"
              style={{ maxHeight: "75vh", background: "#000" }}
            >
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
