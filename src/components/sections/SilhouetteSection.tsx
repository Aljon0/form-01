import ProductDetailCallout from "@/components/product/ProductDetailCallout";
import SneakerVisual from "@/components/product/SneakerVisual";
import StoryChapter from "@/components/sections/StoryChapter";
import { silhouette } from "@/data/campaign";
import { defaultColorwayId, getColorway } from "@/data/colorways";
import { chapters } from "@/data/product";

export default function SilhouetteSection() {
  const chapter = chapters.find((c) => c.id === "silhouette")!;
  const image = getColorway(defaultColorwayId).image;
  return (
    <StoryChapter chapter={chapter} title={silhouette.title} intro={silhouette.intro}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          {silhouette.notes.map((note, i) => (
            <ProductDetailCallout key={note.id} note={note} index={i} />
          ))}
        </div>
        <SneakerVisual image={image} sizes="(min-width: 1024px) 58vw, 100vw" />
      </div>
    </StoryChapter>
  );
}