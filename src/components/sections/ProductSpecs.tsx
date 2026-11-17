import SneakerVisual from "@/components/product/SneakerVisual";
import StoryChapter from "@/components/sections/StoryChapter";
import { performance } from "@/data/campaign";
import { defaultColorwayId, getColorway } from "@/data/colorways";
import { chapters } from "@/data/product";

export default function ProductSpecs() {
  const chapter = chapters.find((c) => c.id === "performance")!;
  const image = getColorway(defaultColorwayId).image;
  return (
    <StoryChapter
      chapter={chapter}
      title={performance.title}
      intro={performance.intro}
      tone="dark"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ol className="order-last flex flex-col lg:order-first">
          {performance.specs.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              className="flex items-baseline gap-4 border-t border-warm-gray py-5"
            >
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-2xl font-bold">{s.label}</h3>
                <p className="text-concrete">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <SneakerVisual reveal image={image} sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    </StoryChapter>
  );
}