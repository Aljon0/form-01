import Image from "next/image";
import type { ReactNode } from "react";
import ProductDetailCallout from "@/components/product/ProductDetailCallout";
import { closing, colorwaySection, materials, performance, silhouette } from "@/data/campaign";
import ColorwaySelector from "@/components/product/ColorwaySelector";
import { SelectedColorwayInfo, SelectedColorwayName } from "@/components/product/SelectedColorway";
import { colorways } from "@/data/colorways";
import { details } from "@/data/details";
import { chapters, product } from "@/data/product";
import type { ChapterId } from "@/types";
import { cn } from "@/lib/utils";

interface PanelProps {
  id: ChapterId;
  /** Light text for dark stage backgrounds. */
  light?: boolean;
  /** Only the Reveal panel is visible before the timeline starts. */
  initiallyVisible?: boolean;
  className?: string;
  children: ReactNode;
}

/** Shared panel shell. Panels fade with opacity only, so screen readers can still reach every chapter. */
function Panel({ id, light, initiallyVisible, className, children }: PanelProps) {
  return (
    <section
      data-panel={id}
      aria-labelledby={`story-${id}-title`}
      className={cn(
        "pointer-events-none absolute inset-0 z-10",
        light ? "text-chalk" : "text-ink",
        !initiallyVisible && "opacity-0",
      )}
    >
      <div className={cn("container-campaign flex h-full flex-col", className)}>{children}</div>
    </section>
  );
}

function ChapterLabel({ id }: { id: ChapterId }) {
  const chapter = chapters.find((c) => c.id === id)!;
  return (
    <p className="label flex gap-3">
      <span className="text-accent">{chapter.index}</span>
      <span>{chapter.label}</span>
    </p>
  );
}

export function RevealPanel() {
  return (
    <Panel id="reveal" initiallyVisible className="justify-start gap-5 pt-[5vh]">
      <p data-hero="eyebrow" className="label flex gap-3 text-muted">
        <span className="text-accent">01</span>
        <span>
          {product.brand} / {product.model}
        </span>
      </p>
      <h1
        id="story-reveal-title"
        data-hero="headline"
        className="max-w-5xl font-display text-display font-extrabold uppercase"
      >
        {product.headline}
      </h1>
      <div className="flex items-end justify-between gap-6">
        <p data-hero="text" className="max-w-md text-muted">
          {product.summary}
        </p>
        <div data-hero="text">
          <a
            data-cta
            href="#colorways"
            className="label pointer-events-auto inline-flex items-center border border-ink px-6 py-4 transition-colors duration-200 hover:bg-ink hover:text-chalk"
          >
            View {colorways.length} colorways
          </a>
        </div>
      </div>
    </Panel>
  );
}

export function SilhouettePanel() {
  return (
    <Panel id="silhouette" className="justify-center">
      <div className="ml-auto flex w-[38%] flex-col gap-6">
        <div data-item className="flex flex-col gap-4">
          <ChapterLabel id="silhouette" />
          <h2 id="story-silhouette-title" className="font-display text-subheadline font-extrabold">
            {silhouette.title}
          </h2>
          <p className="opacity-80">{silhouette.intro}</p>
        </div>
        {silhouette.notes.map((note, i) => (
          <div key={note.id} data-item>
            <ProductDetailCallout note={note} index={i} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function MaterialsPanel() {
  return (
    <Panel id="materials" className="justify-center">
      <div className="ml-auto flex w-[40%] flex-col gap-6">
        <div data-item className="flex flex-col gap-4">
          <ChapterLabel id="materials" />
          <h2 id="story-materials-title" className="font-display text-subheadline font-extrabold">
            {materials.title}
          </h2>
          <p className="opacity-80">{materials.intro}</p>
        </div>
        <div data-item className="relative h-88">
          {details.map((d) => (
            <div key={d.id} data-detail={d.id} className="absolute inset-0 flex flex-col gap-3 opacity-0">
              <Image
                src={d.src}
                alt={d.alt}
                width={d.width}
                height={d.height}
                sizes="40vw"
                className="aspect-video w-full object-cover"
              />
              <h3 className="font-display text-2xl font-bold">{d.label}</h3>
              <p className="opacity-80">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export function ColorwayPanel() {
  return (
    <Panel id="colorways" className="justify-between pb-[5vh] pt-[4vh]">
      <div data-item className="flex flex-col gap-3">
        <ChapterLabel id="colorways" />
        <h2 id="story-colorways-title" className="font-display text-headline font-extrabold">
          {colorwaySection.title}
        </h2>
      </div>
      <div data-item className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-32 w-full max-w-xl">
          {colorways.map((c, i) => (
            <div
              key={c.id}
              data-cw={c.id}
              className={cn("absolute inset-0 flex flex-col items-center gap-1", i > 0 && "opacity-0")}
            >
              <p className="font-display text-5xl font-extrabold">{c.name}</p>
              <p className="label">{c.tagline}</p>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
        <ul className="flex gap-6" aria-label="Colorways">
          {colorways.map((c) => (
            <li key={c.id} data-cw-dot={c.id} className="label border-t-2 border-current pt-2">
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function PerformancePanel() {
  return (
    <Panel id="performance" light className="justify-center">
      <div className="flex w-[44%] flex-col gap-5">
        <div data-item className="flex flex-col gap-3">
          <ChapterLabel id="performance" />
          <h2 id="story-performance-title" className="font-display text-subheadline font-extrabold">
            {performance.title}
          </h2>
          <p className="text-concrete">{performance.intro}</p>
        </div>
        <ol className="flex flex-col">
          {performance.specs.map((s, i) => (
            <li key={s.id} data-item className="flex items-baseline gap-4 border-t border-warm-gray py-3">
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col">
                <h3 className="font-display text-xl font-bold">{s.label}</h3>
                <p className="text-concrete">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}

export function FinalPanel() {
  return (
    <Panel id="final" className="items-center justify-between py-[5vh] text-center">
      <div data-item className="flex flex-col items-center gap-4">
        <p className="label flex gap-3 text-muted">
          <span className="text-accent">06</span>
          <span>
            {product.brand} / <SelectedColorwayName />
          </span>
        </p>
        <h2
          id="story-final-title"
          className="max-w-4xl text-balance font-display text-headline font-extrabold"
        >
          {closing.statement}
        </h2>
      </div>
      <div data-item className="flex flex-col items-center gap-4">
        <SelectedColorwayInfo />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* data-cta: the timeline hides these (visibility) until the final chapter. */}
          <div data-cta>
            <ColorwaySelector />
          </div>
          <a
            data-cta
            href={closing.cta.href}
            className="label pointer-events-auto inline-flex min-h-11 items-center bg-ink px-8 py-3 text-chalk transition duration-200 hover:bg-accent hover:text-ink active:scale-[0.97]"
          >
            {closing.cta.label}
          </a>
        </div>
      </div>
    </Panel>
  );
}