import Image from "next/image";
import ColorwayCrossfade from "@/components/product/ColorwayCrossfade";
import { SHADOW } from "@/data/assets";
import { colorways } from "@/data/colorways";
import { cn } from "@/lib/utils";

/**
 * The one hero sneaker for the pinned stage: all three colorway renders
 * stacked in the same frame, so the master timeline can crossfade between
 * them with identical camera angle and position.
 * On top sits an overlay (data-pick) that follows the visitor's selected
 * colorway. The timeline only reveals it during the final chapter, so the
 * scroll-driven colorway chapter is never affected by selection.
 */
export default function StageSneaker() {
  return (
    <div className="relative aspect-12/7 w-full">
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
      {colorways.map((c, i) => (
        <Image
          key={c.id}
          data-layer={c.id}
          src={c.image.src}
          // Only the first layer is described; the others are the same shoe in another colorway.
          alt={i === 0 ? c.image.alt : ""}
          width={c.image.width}
          height={c.image.height}
          sizes="(min-width: 1024px) 64vw, 100vw"
          className={cn("absolute inset-0 h-full w-full", i > 0 && "opacity-0")}
        />
      ))}
      <div data-pick aria-hidden="true" className="absolute inset-0 opacity-0">
        <ColorwayCrossfade />
      </div>
    </div>
  );
}