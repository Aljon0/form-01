"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultColorwayId } from "@/data/colorways";
import type { ColorwayId } from "@/types";

interface ColorwaySelection {
  selectedId: ColorwayId;
  select: (id: ColorwayId) => void;
}

const ColorwayContext = createContext<ColorwaySelection | null>(null);

/** Shares the visitor's chosen colorway between the pinned story and the static sections. */
export function ColorwayProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<ColorwayId>(defaultColorwayId);
  const value = useMemo(() => ({ selectedId, select: setSelectedId }), [selectedId]);
  return <ColorwayContext.Provider value={value}>{children}</ColorwayContext.Provider>;
}

export function useColorwaySelection(): ColorwaySelection {
  const value = useContext(ColorwayContext);
  if (!value) throw new Error("useColorwaySelection must be used inside <ColorwayProvider>");
  return value;
}