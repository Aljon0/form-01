import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CampaignFooter from "@/components/layout/CampaignFooter";
import CampaignHeader from "@/components/layout/CampaignHeader";

// Self-hosted variable fonts (npm: @fontsource-variable/*). No network fetch at build/dev time.
const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORM / 01 — Made for the miles ahead",
  description:
    "FORM / 01 is an original fictional performance sneaker brand. A scroll-driven campaign experience built with Next.js, TypeScript and GSAP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-chalk"
        >
          Skip to content
        </a>
        <CampaignHeader />
        {children}
        <CampaignFooter />
      </body>
    </html>
  );
}