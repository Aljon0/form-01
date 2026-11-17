import { DURATION, EASE } from "@/lib/animations/config";
import { gsap } from "@/lib/animations/gsap";

/**
 * Hero entrance. Markup opts in with data-hero="eyebrow | headline | text | visual".
 * Call inside gsap.matchMedia() so it is reverted automatically.
 */
export function createHeroEntrance(scope: Element, isDesktop: boolean): gsap.core.Timeline {
  const pick = (name: string) =>
    gsap.utils.toArray<HTMLElement>(`[data-hero="${name}"]`, scope);
  const shift = isDesktop ? 28 : 18;

  const tl = gsap.timeline({ defaults: { ease: EASE.out } });
  tl.addLabel("copy")
    .fromTo(
      pick("eyebrow"),
      { opacity: 0, y: shift / 2 },
      { opacity: 1, y: 0, duration: DURATION.fast },
      "copy",
    )
    .fromTo(
      pick("headline"),
      { opacity: 0, y: shift * 1.5 },
      { opacity: 1, y: 0, duration: DURATION.base },
      "copy+=0.1",
    )
    .fromTo(
      pick("text"),
      { opacity: 0, y: shift },
      { opacity: 1, y: 0, duration: DURATION.base, stagger: 0.12 },
      "copy+=0.35",
    )
    .addLabel("sneaker", "copy+=0.5")
    .fromTo(
      pick("visual"),
      { opacity: 0, y: shift * 2, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: DURATION.slow },
      "sneaker",
    );
  return tl;
}