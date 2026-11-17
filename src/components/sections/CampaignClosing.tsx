import ColorwaySelector from "@/components/product/ColorwaySelector";
import ColorwayVisual from "@/components/product/ColorwayVisual";
import { SelectedColorwayInfo, SelectedColorwayName } from "@/components/product/SelectedColorway";
import { closing } from "@/data/campaign";
import { product } from "@/data/product";

export default function CampaignClosing() {
  return (
    <section
      id="final"
      aria-labelledby="final-title"
      className="scroll-mt-16 bg-chalk py-section"
    >
      <div className="container-campaign flex flex-col items-center gap-10 text-center">
        <p data-reveal className="label flex gap-3 text-muted">
          <span className="text-accent">06</span>
          <span>
            {product.brand} / <SelectedColorwayName />
          </span>
        </p>
        <h2
          data-reveal
          id="final-title"
          className="max-w-4xl text-balance font-display text-headline font-extrabold"
        >
          {closing.statement}
        </h2>
        <ColorwayVisual
          reveal
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="max-w-5xl"
        />
        <div data-reveal className="flex flex-col items-center gap-5">
          <SelectedColorwayInfo />
          <ColorwaySelector />
        </div>
        <a
          data-reveal
          href={closing.cta.href}
          className="label inline-flex items-center bg-ink px-8 py-5 text-chalk transition duration-200 hover:bg-accent hover:text-ink active:scale-[0.97]"
        >
          {closing.cta.label}
        </a>
      </div>
    </section>
  );
}