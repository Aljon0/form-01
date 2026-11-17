"use client";

import ColorwayCrossfade from "@/components/product/ColorwayCrossfade";
import SneakerFrame from "@/components/product/SneakerFrame";

interface ColorwayVisualProps {
  sizes?: string;
  className?: string;
  reveal?: boolean;
}

/** Sneaker frame that follows the visitor's selected colorway. */
export default function ColorwayVisual({ sizes, className, reveal }: ColorwayVisualProps) {
  return (
    <SneakerFrame className={className} reveal={reveal}>
      <ColorwayCrossfade sizes={sizes} />
    </SneakerFrame>
  );
}