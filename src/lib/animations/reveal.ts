import { DURATION, EASE } from "@/lib/animations/config";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

/**
 * Scroll reveals. Markup opts in with data-reveal (fade up) or
 * data-reveal="image" (wipe on desktop, fade on mobile).
 * Elements that enter together are staggered via ScrollTrigger.batch.
 * Call inside gsap.matchMedia() so triggers are cleaned up automatically.
 */
export function setupScrollReveals(scope: Element, isDesktop: boolean): void {
  const distance = isDesktop ? 40 : 20;

  const items = gsap.utils.toArray<HTMLElement>(
    '[data-reveal]:not([data-reveal="image"])',
    scope,
  );
  const images = gsap.utils.toArray<HTMLElement>('[data-reveal="image"]', scope);

  const imageHidden: gsap.TweenVars = isDesktop
    ? { clipPath: "inset(0% 0% 100% 0%)" }
    : { opacity: 0, y: distance };
  const imageShown: gsap.TweenVars = isDesktop
    ? { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.inOut }
    : { opacity: 1, y: 0, duration: DURATION.base, ease: EASE.out };

  gsap.set(items, { opacity: 0, y: distance });
  gsap.set(images, imageHidden);

  // end: "max" keeps the trigger live so items above the viewport on a
  // mid-page reload still reveal instead of staying hidden.
  const common = { start: "top 88%", end: "max", once: true } as const;

  ScrollTrigger.batch(items, {
    ...common,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.out,
        stagger: 0.1,
        overwrite: true,
      }),
  });

  ScrollTrigger.batch(images, {
    ...common,
    onEnter: (batch) =>
      gsap.to(batch, { ...imageShown, stagger: 0.12, overwrite: true }),
  });
}