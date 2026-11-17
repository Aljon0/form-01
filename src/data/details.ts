import { DETAIL_HEIGHT, DETAIL_WIDTH } from "@/data/assets";
import type { DetailImage } from "@/types";

/** Close-up crops of the STONE colorway for the Materials chapter. Fictional design-concept copy. */
export const details: readonly DetailImage[] = [
  {
    id: "upper",
    label: "Upper",
    description: "Engineered mesh with a structured overlay at the forefoot.",
    src: "/images/details/upper.webp",
    alt: "Close-up of the engineered mesh upper and stitched overlay",
    width: DETAIL_WIDTH,
    height: DETAIL_HEIGHT,
  },
  {
    id: "lining",
    label: "Lining",
    description: "Soft, breathable textile lining around the collar and tongue.",
    src: "/images/details/lining.webp",
    alt: "Close-up of the textile lining at the collar",
    width: DETAIL_WIDTH,
    height: DETAIL_HEIGHT,
  },
  {
    id: "midsole",
    label: "Midsole",
    description: "A sculpted foam midsole shaped for a smooth, rolling stride.",
    src: "/images/details/midsole.webp",
    alt: "Close-up of the sculpted foam midsole",
    width: DETAIL_WIDTH,
    height: DETAIL_HEIGHT,
  },
  {
    id: "outsole",
    label: "Outsole",
    description: "Dense rubber outsole with a segmented tread pattern.",
    src: "/images/details/outsole.webp",
    alt: "Close-up of the rubber outsole tread",
    width: DETAIL_WIDTH,
    height: DETAIL_HEIGHT,
  },
] as const;