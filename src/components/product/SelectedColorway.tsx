"use client";

import { useColorwaySelection } from "@/components/product/ColorwayProvider";
import { getColorway } from "@/data/colorways";

/** Inline name of the selected colorway, e.g. for "FORM / 01 / STONE". */
export function SelectedColorwayName() {
  const { selectedId } = useColorwaySelection();
  return <span>{getColorway(selectedId).name}</span>;
}

/** Name and short description of the selected colorway, announced politely to screen readers. */
export function SelectedColorwayInfo() {
  const { selectedId } = useColorwaySelection();
  const colorway = getColorway(selectedId);
  return (
    <div aria-live="polite" className="min-h-14">
      <div key={colorway.id} className="colorway-fade flex flex-col items-center gap-1">
        <p className="font-display text-2xl font-extrabold">{colorway.name}</p>
        <p>{colorway.description}</p>
      </div>
    </div>
  );
}