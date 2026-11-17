import { useEffect, type RefObject } from "react";
import { MEDIA } from "@/lib/animations/config";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { createHeroEntrance } from "@/lib/animations/hero";
import { observeStaticChapters } from "@/lib/animations/scrollspy";
import { setupPinnedStory } from "@/lib/animations/pinned-story";
import { setupScrollReveals } from "@/lib/animations/reveal";

/**
 * Sets up all campaign animations inside gsap.matchMedia():
 * - reduced motion: nothing runs, static sections stay fully visible
 * - desktop (lg+): hero entrance + the pinned sneaker story
 * - smaller screens: hero entrance + scroll reveals on the static sections
 * Cleanup reverts every tween and ScrollTrigger created here.
 */
export function useCampaignMotion(scopeRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    registerGsap();
    const html = document.documentElement;

    const mm = gsap.matchMedia(scope);
    mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (context) => {
      if (!context.conditions?.motion) {
        delete html.dataset.motion;
        return observeStaticChapters(scope);
      }
      html.dataset.motion = "on";
      const isDesktop = Boolean(context.conditions.desktop);
      createHeroEntrance(scope, isDesktop);
      if (isDesktop) return setupPinnedStory(scope);
      setupScrollReveals(scope, false);
      return observeStaticChapters(scope);
    });

    // Re-measure once fonts and images have settled.
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [scopeRef]);
}