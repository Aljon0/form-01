import SneakerVisual from "@/components/product/SneakerVisual";
import StoryChapter from "@/components/sections/StoryChapter";
import { colorwaySection } from "@/data/campaign";
import { colorways } from "@/data/colorways";
import { chapters } from "@/data/product";

/**
 * Static view of all three colorways.
 * Below lg it becomes a touch-friendly swipe row (keyboard-scrollable too).
 * Scroll sync and click-to-select come in later phases.
 */
export default function ColorwayReveal() {
  const chapter = chapters.find((c) => c.id === "colorways")!;
  return (
    <StoryChapter
      chapter={chapter}
      title={colorwaySection.title}
      intro={colorwaySection.intro}
      tone="concrete"
    >
      <ul
        role="region"
        aria-label="Colorways, scroll sideways to see all three"
        tabIndex={0}
        className="-mx-spacing-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-spacing-gutter pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {colorways.map((c) => (
          <li
            key={c.id}
            className="flex w-[85%] shrink-0 snap-center flex-col gap-4 sm:w-[60%] lg:w-auto lg:shrink"
          >
            <SneakerVisual image={c.image} sizes="(min-width: 1024px) 33vw, 85vw" />
            <div className="flex flex-col gap-1 border-t border-ink/30 pt-4">
              <h3 className="font-display text-4xl font-extrabold">{c.name}</h3>
              <p className="label">{c.tagline}</p>
              <p>{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </StoryChapter>
  );
}