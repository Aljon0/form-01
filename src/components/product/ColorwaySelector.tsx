"use client";

import { useRef, type KeyboardEvent } from "react";
import { useColorwaySelection } from "@/components/product/ColorwayProvider";
import { colorways } from "@/data/colorways";
import { cn } from "@/lib/utils";

interface ColorwaySelectorProps {
  label?: string;
  className?: string;
}

/**
 * Radio-group colorway picker. Works with touch, mouse and keyboard
 * (arrow keys, Home and End move the selection). Selection is shown by
 * name and a filled button, never by color alone.
 */
export default function ColorwaySelector({
  label = "Choose a colorway",
  className,
}: ColorwaySelectorProps) {
  const { selectedId, select } = useColorwaySelection();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = colorways.findIndex((c) => c.id === selectedId);
    let next = index;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % colorways.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + colorways.length) % colorways.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = colorways.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(colorways[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn("pointer-events-auto flex flex-wrap justify-center gap-2", className)}
    >
      {colorways.map((c, i) => {
        const checked = c.id === selectedId;
        return (
          <button
            key={c.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => select(c.id)}
            className={cn(
              "label inline-flex min-h-11 items-center gap-3 border border-ink px-5 py-3 transition duration-200 active:scale-[0.97]",
              checked ? "bg-ink text-chalk" : "text-ink hover:bg-ink/10",
            )}
          >
            <span
              aria-hidden="true"
              className="size-3 rounded-full border border-current/50"
              style={{ background: c.swatch.primary }}
            />
            {c.name}
          </button>
        );
      })}
    </div>
  );
}