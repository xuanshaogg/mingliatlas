import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import BaziCalculator from "@/components/tools/BaziCalculator";
import { SITE } from "@/lib/constants";
import { buildBreadcrumbListSchema, JsonLd, type JsonLdNode } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Free Bazi Calculator: Four Pillars Chart",
  description:
    "Calculate a deterministic Bazi Four Pillars chart with Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance.",
  alternates: {
    canonical: "/tools/bazi-calculator",
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Free Bazi Calculator", href: "/tools/bazi-calculator" },
];

const softwareSchema: JsonLdNode = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Bazi Calculator",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: `${SITE.url}/tools/bazi-calculator`,
  description:
    "A browser-based Bazi calculator for Four Pillars, Day Master, Ten Gods, hidden stems, and Five Element balance.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
};

export default function BaziCalculatorPage() {
  return (
    <>
      <JsonLd data={[softwareSchema, buildBreadcrumbListSchema(breadcrumbs)]} />
      <main className="bg-paper px-4 py-10 dark:bg-ink-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbs} />
          <header className="mt-10 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
              Tools
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl">
              Free Bazi Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Generate a deterministic Four Pillars chart from a birth date and time. The calculator returns the
              Day Master, Ten Gods, hidden stems, lunar date, and Five Element balance without storing birth data.
            </p>
          </header>
          <div className="mt-10">
            <BaziCalculator />
          </div>
        </div>
      </main>
    </>
  );
}
