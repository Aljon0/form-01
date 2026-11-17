import { setActiveChapter } from "@/lib/active-chapter";
import { STORY } from "@/lib/animations/config";
import { ScrollTrigger } from "@/lib/animations/gsap";
import {
  buildSneakerTimeline,
  chapterAtTime,
  STORY_ANCHORS,
  STORY_TIMES,
} from "@/lib/animations/sneaker-timeline";

/**
 * Pins the sneaker stage (CSS sticky inside a tall track) and scrubs the master
 * timeline with scroll. Also makes in-page #links land on the right chapter.
 * Call inside gsap.matchMedia(); returns a cleanup for the non-GSAP parts.
 */
export function setupPinnedStory(scope: Element): () => void {
  const root = scope.querySelector<HTMLElement>("[data-story]");
  const track = root?.querySelector<HTMLElement>("[data-story-track]");
  if (!root || !track) return () => {};

  const timeline = buildSneakerTimeline(root);
  const trigger = ScrollTrigger.create({
    trigger: track,
    start: `top top+=${STORY.headerHeight}`,
    end: "bottom bottom",
    scrub: 0.6,
    animation: timeline,
    invalidateOnRefresh: true,
    onUpdate: (self) => setActiveChapter(chapterAtTime(self.progress * STORY.units)),
  });

  const html = document.documentElement;
  html.dataset.storyReady = "on";

  const yForChapter = (id: string): number | null => {
    const label = STORY_ANCHORS[id];
    if (!label) return null;
    const progress = STORY_TIMES[label] / STORY.units;
    return trigger.start + progress * (trigger.end - trigger.start);
  };

  const isVisible = () => root.getClientRects().length > 0;

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (!(event.target instanceof Element) || !isVisible()) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const y = yForChapter(link.hash.slice(1));
    if (y === null) return;
    event.preventDefault();
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  document.addEventListener("click", onClick);

  // Deep link on first load, e.g. /#performance
  const initial = yForChapter(window.location.hash.slice(1));
  if (initial !== null) {
    ScrollTrigger.refresh();
    const y = yForChapter(window.location.hash.slice(1));
    if (y !== null) window.scrollTo({ top: y, behavior: "instant" });
  }

  return () => {
    document.removeEventListener("click", onClick);
    delete html.dataset.storyReady;
  };
}