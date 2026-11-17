import { STAGE_COLORS, STORY } from "@/lib/animations/config";
import { gsap } from "@/lib/animations/gsap";
import type { ColorwayId, DetailId, ChapterId } from "@/types";


/** Which chapter is "current" at timeline position t (used by the nav highlight). */
/** Which chapter is "current" at timeline position t (used by the nav highlight). */
export function chapterAtTime(t: number): ChapterId {
  const T = STORY_TIMES;
  if (t < T.silhouette - 0.5) return "reveal";
  if (t < T.materials - 0.5) return "silhouette";
  if (t < T.stone - 0.4) return "materials";
  if (t < T.performance - 0.4) return "colorways";
  if (t < T.final - 0.5) return "performance";
  return "final";
}
/**
 * Master timeline labels, in timeline units. Each label is the moment a
 * chapter is fully settled on screen; its transition happens just before it.
 */
export const STORY_TIMES = {
  reveal: 0,
  silhouette: 2,
  materials: 4,
  lining: 4.8,
  midsole: 5.6,
  outsole: 6.4,
  stone: 8,
  volt: 9.4,
  earth: 10.8,
  performance: 12.4,
  final: 14.4,
} as const;

export type StoryLabel = keyof typeof STORY_TIMES;



/** Nav hash -> timeline label. "colorways" lands on the first colorway. */
export const STORY_ANCHORS: Record<string, StoryLabel> = {
  reveal: "reveal",
  silhouette: "silhouette",
  materials: "materials",
  colorways: "stone",
  performance: "performance",
  final: "final",
};

/** Sneaker pose per chapter. x/y in viewport units. */
const POSE = {
  reveal: { x: 0, y: "14vh", scale: 1 },
  silhouette: { x: "-20vw", y: "6vh", scale: 1.08 },
  materials: { x: "-25vw", y: "-4vh", scale: 0.8 },
  colorways: { x: 0, y: "-8vh", scale: 1.12 },
  performance: { x: "20vw", y: "4vh", scale: 1 },
  final: { x: 0, y: "4vh", scale: 1.05 },
} as const;

/**
 * Builds the single master timeline for the pinned sneaker story.
 * The returned timeline is paused and meant to be driven by a scrubbed ScrollTrigger.
 * Markup opts in with data-stage, data-sneaker, data-panel, data-item, data-cta,
 * data-layer, data-detail, data-cw and data-cw-dot.
 */
export function buildSneakerTimeline(root: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
  const stage = root.querySelector<HTMLElement>("[data-stage]");
  if (!stage) return tl;

  const T = STORY_TIMES;
  const q = gsap.utils.selector(root);
  const pick = q("[data-pick]");
  const sneaker = q("[data-sneaker]");
  const panel = (id: string) => q(`[data-panel="${id}"]`);
  const items = (id: string) => q(`[data-panel="${id}"] [data-item]`);
  const cta = (id: string) => q(`[data-panel="${id}"] [data-cta]`);
  const layer = (id: ColorwayId) => q(`[data-layer="${id}"]`);
  const copy = (id: ColorwayId) => q(`[data-cw="${id}"]`);
  const dot = (id: ColorwayId) => q(`[data-cw-dot="${id}"]`);
  const detail = (id: DetailId) => q(`[data-detail="${id}"]`);

  Object.entries(T).forEach(([name, time]) => tl.addLabel(name, time));

  // ---- Initial state: the Reveal chapter ----
  gsap.set(stage, { backgroundColor: STAGE_COLORS.chalk });
  gsap.set(sneaker, { xPercent: -50, yPercent: -50, ...POSE.reveal });
  gsap.set(cta("final"), { autoAlpha: 0 });
  gsap.set([...dot("volt"), ...dot("earth")], { opacity: 0.35 });

  // ---- Reusable chapter transitions ----
  const panelIn = (id: string, at: number) => {
    tl.fromTo(panel(id), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, at);
    tl.fromTo(
      items(id),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
      at,
    );
  };
  const panelOut = (id: string, at: number) => {
    tl.to(panel(id), { opacity: 0, duration: 0.4, ease: "power1.in" }, at);
    tl.to(items(id), { y: -24, duration: 0.4, ease: "power1.in" }, at);
  };
  const moveSneaker = (pose: (typeof POSE)[keyof typeof POSE], at: number, duration: number) =>
    tl.to(sneaker, { ...pose, duration }, at);
  const fadeStage = (color: string, at: number, duration: number) =>
    tl.to(stage, { backgroundColor: color, duration }, at);

  // ---- 1. Reveal -> Silhouette ----
  panelOut("reveal", T.silhouette - 1.0);
  tl.set(cta("reveal"), { autoAlpha: 0 }, T.silhouette - 0.6);
  moveSneaker(POSE.silhouette, T.silhouette - 1.0, 1.0);
  panelIn("silhouette", T.silhouette - 0.6);

  // ---- 2. Silhouette -> Materials (close-up cards swap in sequence) ----
  panelOut("silhouette", T.materials - 1.0);
  moveSneaker(POSE.materials, T.materials - 1.0, 1.0);
  panelIn("materials", T.materials - 0.6);
  tl.fromTo(
    detail("upper"),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    T.materials - 0.5,
  );
  const swapDetail = (from: DetailId, to: DetailId, at: number) => {
    tl.to(detail(from), { opacity: 0, y: -20, duration: 0.4 }, at - 0.4);
    tl.fromTo(
      detail(to),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      at - 0.3,
    );
  };
  swapDetail("upper", "lining", T.lining);
  swapDetail("lining", "midsole", T.midsole);
  swapDetail("midsole", "outsole", T.outsole);

  // ---- 3. Materials -> Colorways (STONE) ----
  panelOut("materials", T.outsole + 0.6);
  moveSneaker(POSE.colorways, T.stone - 0.8, 0.8);
  fadeStage(STAGE_COLORS.concrete, T.stone - 0.8, 0.8);
  panelIn("colorways", T.stone - 0.5);

  // ---- 4. Colorway changes: new render fades in on top, old one drops out hidden ----
  const swapColorway = (from: ColorwayId, to: ColorwayId, at: number) => {
    const start = at - 0.8;
    tl.fromTo(layer(to), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "none" }, start);
    tl.set(layer(from), { opacity: 0 }, at);
    tl.to(copy(from), { opacity: 0, y: -16, duration: 0.4 }, start + 0.1);
    tl.fromTo(copy(to), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, start + 0.3);
    tl.to(dot(from), { opacity: 0.35, duration: 0.3 }, start + 0.1);
    tl.to(dot(to), { opacity: 1, duration: 0.3 }, start + 0.1);
  };
  swapColorway("stone", "volt", T.volt);
  swapColorway("volt", "earth", T.earth);

  // ---- 5. Colorways -> Performance (back to STONE for contrast on dark) ----
  const toPerf = T.performance - 0.8;
  panelOut("colorways", toPerf);
  tl.set(layer("volt"), { opacity: 0 }, toPerf);
  tl.set(layer("stone"), { opacity: 1 }, toPerf);
  tl.to(layer("earth"), { opacity: 0, duration: 0.8, ease: "none" }, toPerf);
  moveSneaker(POSE.performance, toPerf, 0.8);
  fadeStage(STAGE_COLORS.ink, toPerf, 0.8);
  panelIn("performance", T.performance - 0.7);

  // ---- 6. Performance -> Final ----
  panelOut("performance", T.final - 1.0);
  moveSneaker(POSE.final, T.final - 1.0, 1.0);
  fadeStage(STAGE_COLORS.chalk, T.final - 1.0, 1.0);
  panelIn("final", T.final - 0.6);
  tl.fromTo(pick, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none" }, T.final - 0.8);

  // Pad to the full story length so scroll distance matches STORY.units.
  tl.set({}, {}, STORY.units);
  return tl;
}
