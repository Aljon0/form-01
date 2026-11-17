"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useColorwaySelection } from "@/components/product/ColorwayProvider";
import { colorways } from "@/data/colorways";
import type { ColorwayId } from "@/types";
import { cn } from "@/lib/utils";

const FADE_MS = 700;

interface ColorwayCrossfadeProps {
  sizes?: string;
}

/**
 * Stacks the three matched renders in one frame and crossfades to the selected one.
 * The new render fades in on top while the old one stays fully opaque beneath it,
 * so there is never a dip or a flash of the background.
 */
export default function ColorwayCrossfade({
  sizes = "(min-width: 1024px) 64vw, 100vw",
}: ColorwayCrossfadeProps) {
  const { selectedId } = useColorwaySelection();
  const [shown, setShown] = useState<{ current: ColorwayId; previous: ColorwayId | null }>({
    current: selectedId,
    previous: null,
  });

  // Adjust state while rendering (React-approved pattern) when the selection changes.
  if (shown.current !== selectedId) {
    setShown({ current: selectedId, previous: shown.current });
  }

  useEffect(() => {
    if (!shown.previous) return;
    const timer = window.setTimeout(
      () => setShown((s) => ({ ...s, previous: null })),
      FADE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [shown]);

  return (
    <>
      {colorways.map((c) => {
        const isCurrent = c.id === shown.current;
        const isPrevious = c.id === shown.previous;
        return (
          <Image
            key={c.id}
            src={c.image.src}
            alt={isCurrent ? c.image.alt : ""}
            width={c.image.width}
            height={c.image.height}
            sizes={sizes}
            className={cn(
              "absolute inset-0 h-full w-full",
              isCurrent &&
                "z-20 opacity-100 transition-opacity duration-700 ease-out motion-reduce:transition-none",
              isPrevious && "z-10 opacity-100",
              !isCurrent && !isPrevious && "opacity-0",
            )}
          />
        );
      })}
    </>
  );
}