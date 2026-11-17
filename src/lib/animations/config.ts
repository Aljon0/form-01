/** Shared motion constants so every animation feels like the same campaign. */
export const EASE = {
    out: "power3.out",
    inOut: "power3.inOut",
  } as const;
  
  export const DURATION = {
    fast: 0.6,
    base: 0.9,
    slow: 1.4,
  } as const;
  
  /** Media conditions used with gsap.matchMedia(). */
  export const MEDIA = {
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1024px)",
  } as const;

  
/** Pinned story geometry. The timeline is STORY.units long; each unit = vhPerUnit of scroll. */
export const STORY = {
  units: 15,
  vhPerUnit: 50,
  headerHeight: 64,
} as const;

/** Stage background per chapter (matches the Tailwind palette tokens). */
export const STAGE_COLORS = {
  chalk: "#F3F1EC",
  concrete: "#B8B7B2",
  ink: "#171717",
} as const;