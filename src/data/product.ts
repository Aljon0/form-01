import type { Chapter, NavItem, Product } from "@/types";

export const product: Product = {
  brand: "FORM / 01",
  model: "Meridian",
  headline: "Made for the miles ahead.",
  summary:
    "An original performance sneaker concept. One silhouette, three colorways, built around a single idea: move.",
};

/** Chapter order matches the master timeline labels used in Phase 6. */
export const chapters: readonly Chapter[] = [
  { id: "reveal", label: "Reveal", index: "01" },
  { id: "silhouette", label: "Silhouette", index: "02" },
  { id: "materials", label: "Materials", index: "03" },
  { id: "colorways", label: "Colorways", index: "04" },
  { id: "performance", label: "Built to Move", index: "05" },
  { id: "final", label: "Explore", index: "06" },
] as const;

export const navItems: readonly NavItem[] = chapters.map((c) => ({
  label: c.label,
  href: `#${c.id}`,
}));