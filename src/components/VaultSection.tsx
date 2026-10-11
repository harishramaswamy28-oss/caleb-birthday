"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VAULT_MEMORIES, type VaultMemory } from "@/data/vaultMemories";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * STAGE 5 — DIGITAL VAULT
 * Natural scroll continuation from WISHES. A heavy metallic vault door
 * sits centred on a darker graphite backdrop; its locking wheel is a real
 * button (keyboard accessible). Activating it plays a single GSAP
 * timeline — wheel spin, bolt retraction, door swing, light spill — that
 * reveals the memory gallery already mounted inside the circular chamber,
 * then a closing "HAPPY BIRTHDAY CALEB" message. Purely visual: no
 * password, no real security system.
 *
 * REPLACE-ME: edit src/data/vaultMemories.ts to swap in real photos.
 */

const BOLT_COUNT = 10;
const BOLT_RADIUS = 41; // % of door container

/** Percentage layout inside the circular chamber (left/top/width of the opening). */
const LAYER_LAYOUT = [
  { x: 16, y: 18, w: 36, rotate: -3.2, z: 3 },
  { x: 50, y: 14, w: 32, rotate: 2.4, z: 4 },
  { x: 10, y: 46, w: 34, rotate: -1.6, z: 2 },
  { x: 46, y: 42, w: 38, rotate: 2.8, z: 5 },
  { x: 28, y: 12, w: 26, rotate: 1.1, z: 1 },
  { x: 30, y: 60, w: 30, rotate: -2.4, z: 6 },
];

export default function VaultSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const doorPerspectiveRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLButtonElement>(null);
  const lightSpillRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const boltRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const frameTriggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const finaleRef = useRef<HTMLDivElement>(null);

  const backdropRef = useRef<HTMLDivElement>(null);
  const viewerCardRef = useRef<HTMLDivElement>(null);
  const viewerCloseRef = useRef<HTMLButtonElement>(null);

  const [vaultOpened, setVaultOpened] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const isAnimating = useRef(false);
  const viewerAnimating = useRef(false);
  const reduceMotionRef = useRef(false);
  const lastFrameTriggerRef = useRef<HTMLButtonElement | null>(null);
  const unlockTlRef = useRef<gsap.core.Timeline | null>(null);

  const openMemory: VaultMemory | null =
    viewerIndex !== null ? VAULT_MEMORIES[viewerIndex] : null;

  // ─── Entrance + idle state ──────────────────────────────────────────
  useGSAP(
    () => {
      reduceMotionRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(viewerCardRef.current, { opacity: 0, y: 28, scale: 0.95 });
      gsap.set(lightSpillRef.current, { opacity: 0, scale: 0.4 });

      // Bolts start fully seated (visible, undisturbed).
      boltRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scaleY: 1, opacity: 1 });
      });

      // Gallery stays mounted behind the door; only the finale waits until open.
      gsap.set(finaleRef.current, { opacity: 0, y: 20 });

      if (reduceMotionRef.current) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 });
        gsap.set(doorPerspectiveRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(doorPerspectiveRef.current, { opacity: 0, y: 36, scale: 0.94 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1.0 }).to(
        doorPerspectiveRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.1 },
        "-=0.5"
      );

      // useGSAP auto-reverts tweens/ScrollTriggers in this scope on unmount.
    },
    { scope: sectionRef }
  );

  // ─── Unlock + open sequence ─────────────────────────────────────────
  function handleUnlock() {
    if (isAnimating.current || vaultOpened) return;
    isAnimating.current = true;

    const bolts = boltRefs.current.filter(Boolean) as HTMLSpanElement[];

    const finishOpen = () => {
      setVaultOpened(true);
      isAnimating.current = false;

      const firstFrame = VAULT_MEMORIES[0]
        ? frameTriggerRefs.current.get(VAULT_MEMORIES[0].id)
        : null;

      if (reduceMotionRef.current) {
        gsap.set(finaleRef.current, { opacity: 1, y: 0 });
        window.setTimeout(() => firstFrame?.focus(), 0);
        return;
      }

      gsap.to(finaleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => firstFrame?.focus(),
      });
    };

    if (reduceMotionRef.current) {
      gsap.set(wheelRef.current, { rotate: 1080 });
      bolts.forEach((b) => gsap.set(b, { scaleY: 0.15, opacity: 0.4 }));
      gsap.set(doorRef.current, { rotateY: -100 });
      gsap.set(lightSpillRef.current, { opacity: 0.6, scale: 1.3 });
      finishOpen();
      return;
    }

    unlockTlRef.current?.kill();
    const tl = gsap.timeline({ onComplete: finishOpen });
    unlockTlRef.current = tl;

    // Heavy mechanical wheel spin.
    tl.to(wheelRef.current, {
      rotate: 1080,
      duration: 1.3,
      ease: "power3.inOut",
    });

    // Bolts retract into the door, staggered, overlapping the end of the spin.
    tl.to(
      bolts,
      {
        scaleY: 0.15,
        opacity: 0.4,
        duration: 0.45,
        ease: "power3.in",
        stagger: 0.04,
      },
      "-=0.55"
    );

    // Light spills out as the heavy door swings open on its hinge.
    tl.to(
      lightSpillRef.current,
      { opacity: 0.6, scale: 1.3, duration: 1.1, ease: "power2.out" },
      "-=0.3"
    );
    tl.to(
      doorRef.current,
      { rotateY: -100, duration: 1.4, ease: "power4.inOut" },
      "-=1.0"
    );
  }

  function handleWheelKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleUnlock();
    }
  }

  // ─── Memory viewer ───────────────────────────────────────────────────
  function openViewer(index: number, triggerEl: HTMLButtonElement) {
    if (viewerAnimating.current || viewerIndex !== null) return;
    viewerAnimating.current = true;
    lastFrameTriggerRef.current = triggerEl;
    setViewerIndex(index);

    const backdrop = backdropRef.current;
    const card = viewerCardRef.current;

    if (reduceMotionRef.current) {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      viewerAnimating.current = false;
      viewerCloseRef.current?.focus();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        viewerAnimating.current = false;
        viewerCloseRef.current?.focus();
      },
    });
    tl.to(backdrop, { opacity: 1, duration: 0.3 });
    tl.fromTo(
      card,
      { opacity: 0, y: 28, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45 },
      "-=0.1"
    );
  }

  function closeViewer() {
    if (viewerAnimating.current || viewerIndex === null) return;
    viewerAnimating.current = true;
    const backdrop = backdropRef.current;
    const card = viewerCardRef.current;

    const finish = () => {
      setViewerIndex(null);
      viewerAnimating.current = false;
      lastFrameTriggerRef.current?.focus();
      lastFrameTriggerRef.current = null;
    };

    if (reduceMotionRef.current) {
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(card, { opacity: 0, y: 28, scale: 0.95 });
      finish();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish });
    tl.to(card, { opacity: 0, y: 20, scale: 0.96, duration: 0.25 });
    tl.to(backdrop, { opacity: 0, duration: 0.25 }, "-=0.15");
  }

  function showPrev() {
    if (viewerIndex === null) return;
    setViewerIndex((viewerIndex - 1 + VAULT_MEMORIES.length) % VAULT_MEMORIES.length);
  }
  function showNext() {
    if (viewerIndex === null) return;
    setViewerIndex((viewerIndex + 1) % VAULT_MEMORIES.length);
  }

  useEffect(() => {
    return () => {
      unlockTlRef.current?.kill();
      unlockTlRef.current = null;
    };
  }, []);

  // Escape closes, arrow keys navigate — only while the viewer is open.
  useEffect(() => {
    if (viewerIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerIndex]);

  const bolts = Array.from({ length: BOLT_COUNT }, (_, i) => {
    const angle = (360 / BOLT_COUNT) * i;
    const rad = (angle * Math.PI) / 180;
    const left = 50 + BOLT_RADIUS * Math.cos(rad);
    const top = 50 + BOLT_RADIUS * Math.sin(rad);
    return { angle, left, top };
  });

  return (
    <section
      ref={sectionRef}
      id="vault"
      className="relative w-full min-h-[100vh] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20 py-20 lg:py-28 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(ellipse 85% 55% at 50% 10%, #16171A 0%, #0D0E10 70%), linear-gradient(180deg, #0D0E10 0%, #101113 100%)",
      }}
    >
      {/* Restrained ambient silver lighting, consistent with earlier stages */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "4%",
            left: "26%",
            width: "48vw",
            height: "50vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(198,201,208,0.05) 0%, transparent 70%)",
            animation: "silver-pulse 15s ease-in-out infinite",
          }}
        />
      </div>

      <h2
        ref={headingRef}
        className="text-chrome relative z-10 text-center"
        style={{
          fontSize: "clamp(2rem, 5.5vw, 4rem)",
          fontWeight: 900,
          letterSpacing: "0.16em",
          marginBottom: "clamp(2.5rem, 7vh, 4.5rem)",
        }}
      >
        DIGITAL VAULT
      </h2>

      {/* ─── Vault assembly: chamber + gallery + hinged door share one box ─── */}
      <div ref={doorPerspectiveRef} className="vault-door-perspective relative z-10">
        <div className="vault-chamber">
          <div className="vault-chamber-glow" aria-hidden="true" />
          <div
            ref={galleryWrapperRef}
            className={`vault-gallery-wrapper ${
              vaultOpened ? "vault-gallery-wrapper--open" : ""
            }`}
            aria-hidden={!vaultOpened}
          >
            <ul className="vault-frame-list">
              {VAULT_MEMORIES.map((memory, i) => {
                const layer = LAYER_LAYOUT[i % LAYER_LAYOUT.length];
                // 23 photos share 6 collage slots: fan out repeats with a small
                // deterministic offset so stacked frames stay clickable instead
                // of sitting pixel-exact on top of each other. Later repeats
                // sit slightly higher in z-order within their own slot.
                const cycle = Math.floor(i / LAYER_LAYOUT.length);
                const jitterX = cycle === 0 ? 0 : ((i * 7) % 5) - 2;
                const jitterY = cycle === 0 ? 0 : ((i * 11) % 5) - 2;
                return (
                  <li
                    key={memory.id}
                    className="vault-frame-item"
                    style={
                      {
                        "--frame-x": `${layer.x + jitterX}%`,
                        "--frame-y": `${layer.y + jitterY}%`,
                        "--frame-w": `${layer.w}%`,
                        "--frame-rotate": `${layer.rotate}deg`,
                        "--frame-z": layer.z + cycle,
                      } as React.CSSProperties
                    }
                  >
                    <div className="vault-frame-entrance">
                      <button
                        type="button"
                        ref={(el) => {
                          if (el) frameTriggerRefs.current.set(memory.id, el);
                        }}
                        onClick={(e) => openViewer(i, e.currentTarget)}
                        disabled={!vaultOpened}
                        tabIndex={vaultOpened ? 0 : -1}
                        aria-haspopup="dialog"
                        aria-label={`Open memory ${i + 1} of ${VAULT_MEMORIES.length}`}
                        className="vault-frame-btn"
                      >
                        <div
                          className="vault-frame-photo"
                          style={{ aspectRatio: `${memory.width} / ${memory.height}` }}
                        >
                          <Image
                            src={memory.src}
                            alt={memory.alt}
                            fill
                            sizes="(max-width: 640px) 28vw, 150px"
                            className="object-cover"
                          />
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          ref={doorRef}
          className={`vault-door ${vaultOpened ? "vault-door--open" : ""}`}
        >
          <div className="vault-door-ring-outer" aria-hidden="true" />
          <div className="vault-door-ring-mid" aria-hidden="true" />
          <div className="vault-door-highlight" aria-hidden="true" />

          {bolts.map((bolt, i) => (
            <span
              key={i}
              className="vault-bolt"
              aria-hidden="true"
              style={
                {
                  left: `${bolt.left}%`,
                  top: `${bolt.top}%`,
                  "--bolt-angle": `${bolt.angle}deg`,
                } as React.CSSProperties
              }
            >
              <span
                className="vault-bolt-head"
                ref={(el) => {
                  boltRefs.current[i] = el;
                }}
              />
            </span>
          ))}

          <div className="vault-wheel-housing" aria-hidden="true">
            <button
              type="button"
              ref={wheelRef}
              onClick={handleUnlock}
              onKeyDown={handleWheelKeyDown}
              disabled={vaultOpened}
              className="vault-wheel"
              aria-label={
                vaultOpened
                  ? "Vault unlocked"
                  : "Unlock the digital vault and reveal the memory gallery"
              }
              aria-pressed={vaultOpened}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="vault-wheel-spoke"
                  aria-hidden="true"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
              <span className="vault-wheel-hub" aria-hidden="true" />
            </button>
          </div>

          <div ref={lightSpillRef} className="vault-light-spill" aria-hidden="true" />
        </div>

        <span ref={captionRef} className="vault-wheel-caption" aria-hidden="true">
          {vaultOpened ? "Vault Open" : "Rotate To Unlock"}
        </span>
      </div>

      {/* ─── Finale ─── */}
      <div
        ref={finaleRef}
        className="vault-finale relative z-10 text-center mt-12 sm:mt-16"
        aria-hidden={!vaultOpened}
      >
        <div className="vault-finale-sweep" aria-hidden="true" />
        <h2
          className="text-chrome"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 5.4rem)",
            fontWeight: 900,
            letterSpacing: "0.06em",
            lineHeight: 1.15,
          }}
        >
          HAPPY BIRTHDAY
          <br />
          CALEB
        </h2>
      </div>

      {/* ─── Memory viewer overlay (always mounted, GSAP-driven) ─── */}
      <div
        className="vault-viewer-backdrop fixed inset-0 z-40"
        ref={backdropRef}
        style={{ opacity: 0, pointerEvents: viewerIndex !== null ? "auto" : "none" }}
        onClick={closeViewer}
        aria-hidden="true"
      />
      <div
        className="vault-viewer-card fixed z-50 left-1/2 top-1/2"
        ref={viewerCardRef}
        role="dialog"
        aria-modal="true"
        aria-label={openMemory ? "Memory viewer" : "Memory"}
        style={{
          opacity: 0,
          pointerEvents: viewerIndex !== null ? "auto" : "none",
          visibility: viewerIndex !== null ? "visible" : "hidden",
        }}
      >
        <button
          type="button"
          ref={viewerCloseRef}
          onClick={closeViewer}
          className="vault-viewer-close"
          aria-label="Close memory viewer"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {openMemory && (
          <>
            <div
              className="vault-viewer-photo-wrap"
              style={{ aspectRatio: `${openMemory.width} / ${openMemory.height}` }}
            >
              <Image
                src={openMemory.src}
                alt={openMemory.alt}
                fill
                sizes="(max-width: 640px) 90vw, 600px"
                className="object-cover"
              />
            </div>
            {openMemory.caption && (
              <p className="vault-viewer-caption">{openMemory.caption}</p>
            )}

            {VAULT_MEMORIES.length > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={showPrev}
                  className="vault-viewer-nav"
                  aria-label="Previous memory"
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(198,201,208,0.5)]">
                  {(viewerIndex ?? 0) + 1} / {VAULT_MEMORIES.length}
                </span>
                <button
                  type="button"
                  onClick={showNext}
                  className="vault-viewer-nav"
                  aria-label="Next memory"
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
