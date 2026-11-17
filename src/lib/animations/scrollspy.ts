import { isChapterId, setActiveChapter } from "@/lib/active-chapter";

/**
 * Tracks which static section is in the middle of the viewport.
 * Used on mobile, tablet and reduced motion (the pinned story reports its own chapter).
 */
export function observeStaticChapters(scope: Element): () => void {
  const sections = Array.from(scope.querySelectorAll<HTMLElement>(".story-static section[id]"));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && isChapterId(entry.target.id)) {
          setActiveChapter(entry.target.id);
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}