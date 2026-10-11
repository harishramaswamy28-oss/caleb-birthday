"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WISHES, type Wish } from "@/data/wishes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * STAGE 4 — WISHES
 * A vertically scrollable collection of silver/pearl envelopes inside its
 * own max-height scroll container. Each closed envelope carries the
 * wisher's name on a small metal label; clicking one opens its flap and
 * reveals a centered, readable letter (name heading, photo, message).
 * Only one envelope may be open at a time; a backdrop click, the close
 * button, or Escape returns to the collection.
 *
 * All content comes from src/data/wishes.ts — append entries there to
 * extend the collection; no component changes are required.
 */
export default function WishesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const letterCardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const flapRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const peekRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [openWishId, setOpenWishId] = useState<string | null>(null);
  const [displayedWish, setDisplayedWish] = useState<Wish | null>(null);
  const isAnimating = useRef(false);
  const reduceMotionRef = useRef(false);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useGSAP(
    () => {
      reduceMotionRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Initial hidden state for the overlay — stays mounted but inert.
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(letterCardRef.current, { opacity: 0, y: 28, scale: 0.95 });

      if (reduceMotionRef.current) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 });
        gsap.set(rowRef.current?.children ?? [], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(rowRef.current?.children ?? [], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1.0 }).to(
        rowRef.current?.children ?? [],
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
        "-=0.5"
      );

      // useGSAP auto-reverts tweens/ScrollTriggers in this scope on unmount.
    },
    { scope: sectionRef }
  );

  function handleOpen(wish: Wish, triggerEl: HTMLButtonElement) {
    if (isAnimating.current || openWishId) return;
    isAnimating.current = true;
    lastTriggerRef.current = triggerEl;
    setDisplayedWish(wish);
    setOpenWishId(wish.id);

    const flap = flapRefs.current.get(wish.id) ?? null;
    const peek = peekRefs.current.get(wish.id) ?? null;
    const backdrop = backdropRef.current;
    const card = letterCardRef.current;

    if (reduceMotionRef.current) {
      gsap.set(flap, { rotateX: -158 });
      gsap.set(peek, { y: -16, opacity: 1 });
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      isAnimating.current = false;
      closeButtonRef.current?.focus();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        isAnimating.current = false;
        closeButtonRef.current?.focus();
      },
    });

    if (flap) tl.to(flap, { rotateX: -158, duration: 0.5, ease: "power2.inOut" });
    if (peek) tl.to(peek, { y: -16, opacity: 1, duration: 0.4 }, "-=0.25");
    tl.to(backdrop, { opacity: 1, duration: 0.35 }, "-=0.15");
    tl.fromTo(
      card,
      { opacity: 0, y: 28, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5 },
      "-=0.1"
    );
  }

  function handleClose() {
    if (isAnimating.current || !openWishId) return;
    isAnimating.current = true;
    const id = openWishId;
    const flap = flapRefs.current.get(id) ?? null;
    const peek = peekRefs.current.get(id) ?? null;
    const backdrop = backdropRef.current;
    const card = letterCardRef.current;

    const finish = () => {
      setOpenWishId(null);
      setDisplayedWish(null);
      isAnimating.current = false;
      lastTriggerRef.current?.focus();
      lastTriggerRef.current = null;
    };

    if (reduceMotionRef.current) {
      gsap.set(flap, { rotateX: 0 });
      gsap.set(peek, { y: 0, opacity: 0 });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(card, { opacity: 0, y: 28, scale: 0.95 });
      finish();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: finish,
    });

    tl.to(card, { opacity: 0, y: 20, scale: 0.96, duration: 0.3 });
    tl.to(backdrop, { opacity: 0, duration: 0.3 }, "-=0.15");
    if (flap) tl.to(flap, { rotateX: 0, duration: 0.4 }, "-=0.2");
    if (peek) tl.to(peek, { y: 0, opacity: 0, duration: 0.3 }, "-=0.3");
  }

  // Escape key closes the open wish.
  useEffect(() => {
    if (!openWishId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openWishId]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20 py-20 lg:py-28 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(ellipse 85% 60% at 50% 0%, #1A1C20 0%, #101113 68%), linear-gradient(180deg, #101113 0%, #16171A 100%)",
      }}
    >
      {/* Ambient glow, consistent with earlier stages */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "30%",
            width: "50vw",
            height: "60vh",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(198,201,208,0.06) 0%, transparent 70%)",
            animation: "silver-pulse 13s ease-in-out infinite",
          }}
        />
      </div>

      <h2
        ref={headingRef}
        className="text-chrome relative z-10 text-center"
        style={{
          fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
          fontWeight: 900,
          letterSpacing: "0.14em",
          marginBottom: "clamp(3rem, 8vh, 5.5rem)",
        }}
      >
        WISHES
      </h2>

      {/* Envelope collection — a single centered vertical column inside
          its own scroll container, so any number of wishes can be added
          to the data file without the page becoming awkward to traverse. */}
      <ul
        ref={rowRef}
        className={`wish-row wish-arc relative z-10 w-full max-w-md ${
          openWishId ? "wish-row--locked" : ""
        }`}
      >
        {WISHES.map((wish, i) => {
          const isOpen = openWishId === wish.id;
          const locked = Boolean(openWishId) && !isOpen;

          return (
            <li
              key={wish.id}
              className={`wish-item ${isOpen ? "wish-item--open" : ""}`}
              style={
                {
                  "--float-delay": `${i * 0.45}s`,
                } as React.CSSProperties
              }
            >
              {/* Float wrapper is isolated from the item's positional
                  transform, so idle drift and any list-level transforms
                  never fight over the same `transform` property. */}
              <div className="wish-item-float">
                <button
                  type="button"
                  ref={(el) => {
                    if (el) triggerRefs.current.set(wish.id, el);
                  }}
                  onClick={(e) => handleOpen(wish, e.currentTarget)}
                  disabled={locked}
                  tabIndex={locked ? -1 : 0}
                  aria-haspopup="dialog"
                  aria-expanded={isOpen}
                  aria-label={`Open wish ${i + 1} of ${WISHES.length}, from ${wish.from}`}
                  className={`wish-envelope ${locked ? "wish-envelope--locked" : ""}`}
                >
                  <span className="wish-envelope-back" aria-hidden="true" />
                  <span className="wish-envelope-sheen" aria-hidden="true" />
                  <span
                    className="wish-letter-peek"
                    aria-hidden="true"
                    ref={(el) => {
                      if (el) peekRefs.current.set(wish.id, el);
                    }}
                  />
                  <span className="wish-envelope-pocket" aria-hidden="true" />
                  <span
                    className="wish-envelope-flap"
                    aria-hidden="true"
                    ref={(el) => {
                      if (el) flapRefs.current.set(wish.id, el);
                    }}
                  />
                  <span className="wish-envelope-seal" aria-hidden="true" />
                  {/* Wisher's name label — visible on the closed front so
                      Caleb knows who sent the wish before opening it. The
                      accessible name for the button carries the same text. */}
                  <span className="wish-envelope-name" aria-hidden="true">
                    <span>{wish.from}</span>
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Opened wish — message panel overlay (always mounted, GSAP-driven) */}
      <div
        className="wish-overlay-backdrop fixed inset-0 z-40"
        ref={backdropRef}
        style={{ opacity: 0, pointerEvents: openWishId ? "auto" : "none" }}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="wish-letter-card fixed z-50 left-1/2 top-1/2"
        ref={letterCardRef}
        role="dialog"
        aria-modal="true"
        aria-label={displayedWish ? `Wish from ${displayedWish.from}` : "Wish"}
        style={{
          opacity: 0,
          pointerEvents: openWishId ? "auto" : "none",
          visibility: openWishId ? "visible" : "hidden",
        }}
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={handleClose}
          className="wish-close-btn"
          aria-label="Close wish"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {displayedWish && (
          <div className="wish-letter-content">
            {/* Wisher's name — heading above their message + photo. */}
            <h3 className="wish-from">{displayedWish.from}</h3>
            {displayedWish.photoSrc && (
              <div
                className="wish-photo-wrap"
                // Wish photos vary in shape — size the box from the real file
                // dimensions when known so nothing is cropped or letterboxed.
                style={
                  displayedWish.photoWidth && displayedWish.photoHeight
                    ? {
                        aspectRatio: `${displayedWish.photoWidth} / ${displayedWish.photoHeight}`,
                      }
                    : undefined
                }
              >
                <Image
                  key={`${displayedWish.photoSrc}-${displayedWish.photoWidth}x${displayedWish.photoHeight}`}
                  src={displayedWish.photoSrc}
                  alt={displayedWish.photoAlt ?? ""}
                  fill
                  sizes="(max-width: 640px) 90vw, 400px"
                  className="object-contain"
                />
              </div>
            )}
            <p className="wish-message">{displayedWish.message}</p>
          </div>
        )}
      </div>
    </section>
  );
}
