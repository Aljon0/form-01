import type { ReactNode } from "react";
import type { Chapter } from "@/types";
import { cn } from "@/lib/utils";

type Tone = "light" | "concrete" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-chalk text-ink",
  concrete: "bg-concrete text-ink",
  dark: "bg-ink text-chalk",
};

interface StoryChapterProps {
  chapter: Chapter;
  title: string;
  intro?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

/** Shared chapter wrapper: id for navigation, numbered label, title and intro. */
export default function StoryChapter({
  chapter,
  title,
  intro,
  tone = "light",
  children,
  className,
}: StoryChapterProps) {
  const headingId = `${chapter.id}-title`;
  return (
    <section
      id={chapter.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-16 py-section", tones[tone], className)}
    >
      <div className="container-campaign flex flex-col gap-12 md:gap-16">
        <header className="flex flex-col gap-4">
          <p className="label flex gap-3 border-t border-current/30 pt-4">
            <span className="text-accent">{chapter.index}</span>
            <span>{chapter.label}</span>
          </p>
          <h2 id={headingId} className="max-w-4xl font-display text-headline font-extrabold">
            {title}
          </h2>
          {intro ? <p className="max-w-xl opacity-80">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}