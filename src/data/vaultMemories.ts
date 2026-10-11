/**
 * STAGE 5 — DIGITAL VAULT: memory gallery content
 * -----------------------------------------------------------------------
 * These are placeholder entries for layout/demo purposes only. The images
 * are the project's existing placeholder art — NOT real photos — and the
 * captions are generic labels, NOT real memories. Do not treat any of
 * this as genuine personal history.
 *
 * To add real memories:
 * 1. Drop real photos into `/public/images/vault/...` (jpg/png/webp).
 * 2. Set `src` to the new path and `width`/`height` to the photo's real
 *    intrinsic pixel dimensions (needed for correct aspect ratio in the
 *    layered gallery — do not force a crop that fights the source photo).
 * 3. Replace `caption` with the real moment being honoured, or omit it
 *    entirely if there's no caption for that memory.
 */

export interface VaultMemory {
  /** Stable unique id — used as the React key and animation target id. */
  id: string;
  /** Path to the photo under /public, e.g. '/images/vault/trip.jpg'. */
  src: string;
  /** Alt text — required, describes the image for screen readers. */
  alt: string;
  /** Intrinsic pixel width of the source image (for aspect-ratio sizing). */
  width: number;
  /** Intrinsic pixel height of the source image (for aspect-ratio sizing). */
  height: number;
  /** Optional caption shown in the larger viewing panel. */
  caption?: string;
}

export const VAULT_MEMORIES: VaultMemory[] = [
  {
    id: "memory-01",
    src: "/images/vault/memory-1.svg",
    alt: "Placeholder memory frame 01 — replace with a real photo",
    width: 800,
    height: 600,
    caption: "Sample caption — replace with a real memory.",
  },
  {
    id: "memory-02",
    src: "/images/vault/memory-2.svg",
    alt: "Placeholder memory frame 02 — replace with a real photo",
    width: 600,
    height: 800,
    caption: "Sample caption — replace with a real memory.",
  },
  {
    id: "memory-03",
    src: "/images/vault/memory-3.svg",
    alt: "Placeholder memory frame 03 — replace with a real photo",
    width: 800,
    height: 600,
  },
  {
    id: "memory-04",
    src: "/images/vault/memory-4.svg",
    alt: "Placeholder memory frame 04 — replace with a real photo",
    width: 600,
    height: 800,
    caption: "Sample caption — replace with a real memory.",
  },
  {
    id: "memory-05",
    src: "/images/vault/memory-5.svg",
    alt: "Placeholder memory frame 05 — replace with a real photo",
    width: 800,
    height: 800,
  },
  {
    id: "memory-06",
    src: "/images/vault/memory-6.svg",
    alt: "Placeholder memory frame 06 — replace with a real photo",
    width: 800,
    height: 600,
    caption: "Sample caption — replace with a real memory.",
  },
];
