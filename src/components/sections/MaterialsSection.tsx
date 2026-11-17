import Image from "next/image";
import StoryChapter from "@/components/sections/StoryChapter";
import { materials } from "@/data/campaign";
import { details } from "@/data/details";
import { chapters } from "@/data/product";

export default function MaterialsSection() {
  const chapter = chapters.find((c) => c.id === "materials")!;
  return (
    <StoryChapter chapter={chapter} title={materials.title} intro={materials.intro}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
        {details.map((d) => (
          <li key={d.id} className="flex flex-col gap-4">
            <Image
              src={d.src}
              data-reveal="image"
              alt={d.alt}
              width={d.width}
              height={d.height}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="h-auto w-full"
            />
            <div data-reveal className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold md:text-2xl">{d.label}</h3>
              <p className="text-muted">{d.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </StoryChapter>
  );
}