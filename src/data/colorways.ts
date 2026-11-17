import { RENDER_HEIGHT, RENDER_WIDTH } from "@/data/assets";
import type { Colorway, ColorwayId } from "@/types";

export const colorways: readonly Colorway[] = [
  {
    id: "stone",
    name: "STONE",
    tagline: "Quiet. Composed.",
    description: "Chalk, gray and off-white. A calm, neutral baseline.",
    swatch: { primary: "#E4E1D8", secondary: "#B8B7B2", accent: "#F3F1EC" },
    image: {
      src: "/images/product/stone/side.webp",
      alt: "FORM / 01 Meridian sneaker in STONE, side profile",
      width: RENDER_WIDTH,
      height: RENDER_HEIGHT,
    },
  },
  {
    id: "volt",
    name: "VOLT",
    tagline: "Charged. Precise.",
    description: "Charcoal with a restrained electric accent.",
    swatch: { primary: "#2B2D2F", secondary: "#4A4D50", accent: "#D6F23A" },
    image: {
      src: "/images/product/volt/side.webp",
      alt: "FORM / 01 Meridian sneaker in VOLT, side profile",
      width: RENDER_WIDTH,
      height: RENDER_HEIGHT,
    },
  },
  {
    id: "earth",
    name: "EARTH",
    tagline: "Grounded. Warm.",
    description: "Muted brown and warm neutral tones.",
    swatch: { primary: "#6B5744", secondary: "#A38F78", accent: "#D8CBB8" },
    image: {
      src: "/images/product/earth/side.webp",
      alt: "FORM / 01 Meridian sneaker in EARTH, side profile",
      width: RENDER_WIDTH,
      height: RENDER_HEIGHT,
    },
  },
] as const;

export const defaultColorwayId: ColorwayId = "stone";

export function getColorway(id: ColorwayId): Colorway {
  const match = colorways.find((c) => c.id === id);
  if (!match) throw new Error(`Unknown colorway: ${id}`);
  return match;
}