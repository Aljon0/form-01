import StageSneaker from "@/components/story/StageSneaker";
import {
  ColorwayPanel,
  FinalPanel,
  MaterialsPanel,
  PerformancePanel,
  RevealPanel,
  SilhouettePanel,
} from "@/components/story/StoryPanels";
import { STORY } from "@/lib/animations/config";

/**
 * Desktop pinned sneaker story. Markup only: all motion lives in
 * lib/animations/sneaker-timeline.ts and pinned-story.ts.
 * The tall track provides the scroll distance; the stage sticks inside it.
 * Hidden by CSS unless JS + motion are available (see globals.css), where the
 * static sections are shown instead.
 */
export default function PinnedSneakerStory() {
  return (
    <div data-story className="story-pinned">
      <a
        href="#after-story"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-chalk"
      >
        Skip scroll story
      </a>
      <div
        data-story-track
        className="relative"
        style={{ height: `${STORY.units * STORY.vhPerUnit + 100}vh` }}
      >
        <div data-stage className="sticky top-16 h-[calc(100dvh-4rem)] overflow-hidden bg-chalk">
          <div data-sneaker className="absolute left-1/2 top-1/2 w-[min(64vw,1000px)]">
            <div data-hero="visual">
              <StageSneaker />
            </div>
          </div>
          <RevealPanel />
          <SilhouettePanel />
          <MaterialsPanel />
          <ColorwayPanel />
          <PerformancePanel />
          <FinalPanel />
        </div>
      </div>
      <div id="after-story" />
    </div>
  );
}