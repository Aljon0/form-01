import type { ReactNode } from "react";
import { SHADOW } from "@/data/assets";
import { cn } from "@/lib/utils";

interface SneakerFrameProps {
  children: ReactNode;
  className?: string;
  /** Fade up when scrolled into view. */
  reveal?: boolean;
}

/**
 * Shared frame for sneaker renders: crops the empty margin of the canvas,
 * scales the shoe up on small screens and draws the soft contact shadow.
 * Children (images) should be absolutely positioned to fill the render canvas.
 */
export default function SneakerFrame({ children, className, reveal = false }: SneakerFrameProps) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn("relative w-full aspect-2/1 overflow-hidden md:aspect-8/3", className)}
    >
      <div className="absolute left-1/2 top-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 md:w-full">
        <div
          aria-hidden="true"
          className="absolute rounded-full bg-ink/30 blur-xl"
          style={{
            left: `${SHADOW.left}%`,
            right: `${SHADOW.right}%`,
            top: `${SHADOW.top}%`,
            height: `${SHADOW.height}%`,
          }}
        />
        <div className="relative aspect-12/7 w-full">{children}</div>
      </div>
    </div>
  );
}