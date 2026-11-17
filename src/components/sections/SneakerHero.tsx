import SneakerVisual from "@/components/product/SneakerVisual";
import { colorways, defaultColorwayId, getColorway } from "@/data/colorways";
import { product } from "@/data/product";

export default function SneakerHero() {
  const hero = getColorway(defaultColorwayId);
  return (
    <section
      id="reveal"
      aria-labelledby="reveal-title"
      className="scroll-mt-16 bg-chalk pt-12 md:pt-20"
    >
      <div className="container-campaign flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p data-hero="eyebrow" className="label flex gap-3 text-muted">
            <span className="text-accent">01</span>
            <span>
              {product.brand} / {product.model}
            </span>
          </p>
          <h1
            id="reveal-title"
            data-hero="headline"
            className="max-w-5xl font-display text-display font-extrabold uppercase"
          >
            {product.headline}
          </h1>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p data-hero="text" className="max-w-md text-muted">
              {product.summary}
            </p>
            <a
              data-hero="text"
              href="#colorways"
              className="label inline-flex w-fit items-center border border-ink px-6 py-4 transition-colors duration-200 hover:bg-ink hover:text-chalk"
            >
              View {colorways.length} colorways
            </a>
          </div>
        </div>
        <div data-hero="visual">
          <SneakerVisual
            image={hero.image}
            preload
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="mx-auto max-w-6xl"
          />
        </div>
      </div>
    </section>
  );
}