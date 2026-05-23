import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import IChingOracle from "@/components/tools/IChingOracle";
import { SITE } from "@/lib/constants";
import { buildBreadcrumbListSchema, JsonLd, type JsonLdNode } from "@/lib/seo/jsonLd";

export const metadata: Metadata = {
  title: "Free I Ching Oracle",
  description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
  alternates: {
    canonical: "/tools/i-ching-oracle",
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "I Ching Oracle", href: "/tools/i-ching-oracle" },
];

const softwareSchema: JsonLdNode = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free I Ching Oracle",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: `${SITE.url}/tools/i-ching-oracle`,
  description: "A browser-based I Ching oracle for six-line hexagram casting and reflective interpretation.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function IChingOraclePage() {
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
              Free I Ching Oracle
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Cast a six-line hexagram locally in your browser. The result shows the primary hexagram, changing
              lines, and relating hexagram when change is present.
            </p>
          </header>
          <div className="mt-10">
            <IChingOracle />
          </div>
        </div>
      </main>
    </>
  );
}
