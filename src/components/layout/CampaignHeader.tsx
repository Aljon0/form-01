"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { navItems, product } from "@/data/product";
import {
  getActiveChapter,
  getServerActiveChapter,
  subscribeActiveChapter,
} from "@/lib/active-chapter";

/**
 * Minimal campaign header. Solid chalk background keeps contrast
 * consistent over every section. Below lg it uses a simple disclosure menu.
 * The link for the chapter currently on screen is marked with aria-current.
 */
export default function CampaignHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = useSyncExternalStore(
    subscribeActiveChapter,
    getActiveChapter,
    getServerActiveChapter,
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const current = (href: string) => (href === `#${active}` ? "location" : undefined);

  return (
    <header className="sticky top-0 z-40 border-b border-concrete bg-chalk">
      <div className="container-campaign flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-extrabold uppercase tracking-tight whitespace-nowrap"
          aria-label={`${product.brand} home`}
        >
          {product.brand}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current(item.href)}
                  className="label relative whitespace-nowrap py-2 text-muted transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 aria-[current=location]:text-ink aria-[current=location]:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="label -mr-2 px-2 py-3 lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-concrete bg-chalk lg:hidden"
      >
        <ul className="container-campaign flex flex-col py-2">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-concrete last:border-b-0">
              <a
                href={item.href}
                aria-current={current(item.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl font-bold aria-[current=location]:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}