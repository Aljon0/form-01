import { navItems, product } from "@/data/product";

/** Placeholder destinations. Swap the hrefs when real profiles/repo exist. */
const socials = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X", href: "#" },
] as const;

const projectLinks = [
  { label: "GitHub repository", href: "#" },
  { label: "Live demo", href: "#" },
] as const;

export default function CampaignFooter() {
  return (
    <footer className="bg-ink text-chalk">
      <div className="container-campaign flex flex-col gap-16 py-16 md:py-24">
        <p className="font-display text-display font-extrabold uppercase text-chalk">
          {product.brand}
        </p>

        <div className="grid gap-12 border-t border-warm-gray pt-8 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label="Footer">
            <h2 className="label mb-4 text-concrete">Navigate</h2>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label mb-4 text-concrete">Follow</h2>
            <ul className="flex flex-col gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label mb-4 text-concrete">Project</h2>
            <ul className="flex flex-col gap-2">
              {projectLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="label text-concrete">
          © 2026 {product.brand}. A fictional brand created for portfolio demonstration.
        </p>
      </div>
    </footer>
  );
}