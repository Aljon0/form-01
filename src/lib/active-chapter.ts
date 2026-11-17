import { chapters } from "@/data/product";
import type { ChapterId } from "@/types";

/**
 * Tiny external store for "which chapter is on screen".
 * Updated by ScrollTrigger (pinned story) or IntersectionObserver (static
 * sections) and read by the header. It only notifies when the chapter
 * actually changes, so scrolling never triggers per-tick React renders.
 */
let active: ChapterId = "reveal";
const listeners = new Set<() => void>();

export const isChapterId = (value: string): value is ChapterId =>
  chapters.some((c) => c.id === value);

export const getActiveChapter = (): ChapterId => active;
export const getServerActiveChapter = (): ChapterId => "reveal";

export function setActiveChapter(id: ChapterId): void {
  if (id === active) return;
  active = id;
  listeners.forEach((listener) => listener());
}

export function subscribeActiveChapter(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}