"use client";

import { useRef, type ReactNode } from "react";
import { ColorwayProvider } from "@/components/product/ColorwayProvider";
import { useCampaignMotion } from "@/hooks/useCampaignMotion";

/** Client wrapper that owns the animation scope and shared colorway state. Children stay server components. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useCampaignMotion(ref);
  return (
    <main id="main" ref={ref}>
      <ColorwayProvider>{children}</ColorwayProvider>
    </main>
  );
}