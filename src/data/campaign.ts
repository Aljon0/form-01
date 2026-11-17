import type { FeatureNote } from "@/types";

export const silhouette = {
  title: "One line, front to back.",
  intro:
    "A low, continuous profile that sits close to the ground. Every curve is there to keep the eye moving forward.",
  notes: [
    {
      id: "upper",
      label: "Upper shape",
      text: "A sock-like collar flows into a clean, uninterrupted vamp.",
    },
    {
      id: "overlay",
      label: "Stitched overlay",
      text: "A single structured panel wraps the forefoot and anchors the lacing.",
    },
    {
      id: "midsole",
      label: "Midsole profile",
      text: "A sculpted heel-to-toe curve designed to look like motion at rest.",
    },
  ] satisfies FeatureNote[],
};

export const materials = {
  title: "Quiet materials. Considered finish.",
  intro: "Four layers, each chosen for how it looks and feels up close.",
};

export const colorwaySection = {
  title: "Three tones. One form.",
  intro:
    "The same silhouette in three original colorways: STONE, VOLT and EARTH.",
};

export const performance = {
  title: "Built to move.",
  intro:
    "Design-concept specifications. FORM / 01 is a fictional brand and these are not measured performance claims.",
  specs: [
    { id: "light", label: "Lightweight construction", text: "A minimal, single-layer upper concept." },
    { id: "cushion", label: "Responsive cushioning", text: "A sculpted foam midsole concept." },
    { id: "outsole", label: "Durable outsole", text: "A dense rubber outsole concept." },
    { id: "upper", label: "Breathable upper", text: "An open engineered-mesh concept." },
    { id: "form", label: "Performance silhouette", text: "A low, forward-leaning profile." },
  ] satisfies FeatureNote[],
};

export const closing = {
  statement: "Move forward. Stay in form.",
  cta: { label: "Explore FORM / 01", href: "#colorways" },
};