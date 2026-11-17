import Image from "next/image";
import SneakerFrame from "@/components/product/SneakerFrame";
import type { ProductImage } from "@/types";

interface SneakerVisualProps {
  image: ProductImage;
  /** Preload for the above-the-fold hero image only. */
  preload?: boolean;
  sizes?: string;
  className?: string;
  /** Fade up when scrolled into view (Phase 5). */
  reveal?: boolean;
}

/** A single fixed sneaker render inside the shared frame. */
export default function SneakerVisual({
  image,
  preload = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
  reveal = false,
}: SneakerVisualProps) {
  return (
    <SneakerFrame className={className} reveal={reveal}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={preload}
        className="absolute inset-0 h-full w-full"
      />
    </SneakerFrame>
  );
}