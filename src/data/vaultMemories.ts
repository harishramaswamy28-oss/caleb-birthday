/**
 * STAGE 5 — DIGITAL VAULT: memory gallery content
 * -----------------------------------------------------------------------
 * 23 group photos in exact numerical order (1..23), stored at
 * /public/images/vault/<n>.jpeg. Width/height are the real intrinsic
 * pixel dimensions of each file (verified on disk).
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
    src: "/images/vault/1.jpeg",
    alt: "Group photo 1 — Caleb's birthday celebration",
    width: 1032,
    height: 774,
  },
  {
    id: "memory-02",
    src: "/images/vault/2.jpeg",
    alt: "Group photo 2 — Caleb's birthday celebration",
    width: 1040,
    height: 780,
  },
  {
    id: "memory-03",
    src: "/images/vault/3.jpeg",
    alt: "Group photo 3 — Caleb's birthday celebration",
    width: 1280,
    height: 960,
  },
  {
    id: "memory-04",
    src: "/images/vault/4.jpeg",
    alt: "Group photo 4 — Caleb's birthday celebration",
    width: 1280,
    height: 960,
  },
  {
    id: "memory-05",
    src: "/images/vault/5.jpeg",
    alt: "Group photo 5 — Caleb's birthday celebration",
    width: 1280,
    height: 720,
  },
  {
    id: "memory-06",
    src: "/images/vault/6.jpeg",
    alt: "Group photo 6 — Caleb's birthday celebration",
    width: 1280,
    height: 720,
  },
  {
    id: "memory-07",
    src: "/images/vault/7.jpeg",
    alt: "Group photo 7 — Caleb's birthday celebration",
    width: 1152,
    height: 648,
  },
  {
    id: "memory-08",
    src: "/images/vault/8.jpeg",
    alt: "Group photo 8 — Caleb's birthday celebration",
    width: 1280,
    height: 720,
  },
  {
    id: "memory-09",
    src: "/images/vault/9.jpeg",
    alt: "Group photo 9 — Caleb's birthday celebration",
    width: 1152,
    height: 864,
  },
  {
    id: "memory-10",
    src: "/images/vault/10.jpeg",
    alt: "Group photo 10 — Caleb's birthday celebration",
    width: 1024,
    height: 768,
  },
  {
    id: "memory-11",
    src: "/images/vault/11.jpeg",
    alt: "Group photo 11 — Caleb's birthday celebration",
    width: 1024,
    height: 768,
  },
  {
    id: "memory-12",
    src: "/images/vault/12.jpeg",
    alt: "Group photo 12 — Caleb's birthday celebration",
    width: 1024,
    height: 768,
  },
  {
    id: "memory-13",
    src: "/images/vault/13.jpeg",
    alt: "Group photo 13 — Caleb's birthday celebration",
    width: 1032,
    height: 581,
  },
  {
    id: "memory-14",
    src: "/images/vault/14.jpeg",
    alt: "Group photo 14 — Caleb's birthday celebration",
    width: 706,
    height: 538,
  },
  {
    id: "memory-15",
    src: "/images/vault/15.jpeg",
    alt: "Group photo 15 — Caleb's birthday celebration",
    width: 720,
    height: 534,
  },
  {
    id: "memory-16",
    src: "/images/vault/16.jpeg",
    alt: "Group photo 16 — Caleb's birthday celebration",
    width: 1599,
    height: 1410,
  },
  {
    id: "memory-17",
    src: "/images/vault/17.jpeg",
    alt: "Group photo 17 — Caleb's birthday celebration",
    width: 1280,
    height: 720,
  },
  {
    id: "memory-18",
    src: "/images/vault/18.jpeg",
    alt: "Group photo 18 — Caleb's birthday celebration",
    width: 1280,
    height: 960,
  },
  {
    id: "memory-19",
    src: "/images/vault/19.jpeg",
    alt: "Group photo 19 — Caleb's birthday celebration",
    width: 1280,
    height: 959,
  },
  {
    id: "memory-20",
    src: "/images/vault/20.jpeg",
    alt: "Group photo 20 — Caleb's birthday celebration",
    width: 1600,
    height: 1200,
  },
  {
    id: "memory-21",
    src: "/images/vault/21.jpeg",
    alt: "Group photo 21 — Caleb's birthday celebration",
    width: 1600,
    height: 1200,
  },
  {
    id: "memory-22",
    src: "/images/vault/22.jpeg",
    alt: "Group photo 22 — Caleb's birthday celebration",
    width: 1600,
    height: 1200,
  },
  {
    id: "memory-23",
    src: "/images/vault/23.jpeg",
    alt: "Group photo 23 — Caleb's birthday celebration",
    width: 1600,
    height: 1200,
  },
];
