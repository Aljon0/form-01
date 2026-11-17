export type ColorwayId = "stone" | "volt" | "earth";

export interface ColorwaySwatch {
  /** Dominant upper color. */
  primary: string;
  /** Secondary / midsole tone. */
  secondary: string;
  /** Small detail color (eyelets, heel tab, lining). */
  accent: string;
}

export interface ProductImage {
  /** Path under /public, e.g. "/images/product/stone/side.webp". */
  src: string;
  alt: string;
  /** Intrinsic pixel size. Used to reserve space and prevent layout shift. */
  width: number;
  height: number;
}

export type DetailId = "upper" | "lining" | "midsole" | "outsole";

export interface DetailImage extends ProductImage {
  id: DetailId;
  label: string;
  /** Short technical description (fictional design-concept copy). */
  description: string;
}

export interface Colorway {
  id: ColorwayId;
  name: string;
  tagline: string;
  description: string;
  /** UI swatch values (used for buttons and fallbacks). */
  swatch: ColorwaySwatch;
  /** Matched side-profile render, transparent background. */
  image: ProductImage;
}

export type ChapterId =
  | "reveal"
  | "silhouette"
  | "materials"
  | "colorways"
  | "performance"
  | "final";

export interface Chapter {
  id: ChapterId;
  /** Short label for navigation. */
  label: string;
  /** Chapter number shown in technical labels, e.g. "01". */
  index: string;
}

export interface Product {
  brand: string;
  model: string;
  headline: string;
  summary: string;
}

export interface NavItem {
  label: string;
  href: string;
}


/** A short titled note: used for silhouette callouts and product specs. */
export interface FeatureNote {
    id: string;
    label: string;
    text: string;
  }