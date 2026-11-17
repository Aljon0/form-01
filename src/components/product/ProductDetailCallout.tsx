import type { FeatureNote } from "@/types";

interface ProductDetailCalloutProps {
  note: FeatureNote;
  index: number;
}

export default function ProductDetailCallout({ note, index }: ProductDetailCalloutProps) {
  return (
    <div className="flex gap-4 border-t border-current/30 pt-4">
      <span className="label text-accent">{String(index + 1).padStart(2, "0")}</span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl font-bold">{note.label}</h3>
        <p className="opacity-80">{note.text}</p>
      </div>
    </div>
  );
}