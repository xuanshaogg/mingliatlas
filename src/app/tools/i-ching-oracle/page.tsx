import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import IChingOracle from "@/components/tools/IChingOracle";
import { SITE } from "@/lib/constants";
import { buildBreadcrumbListSchema, buildWebApplicationSchema, JsonLd } from "@/lib/seo/jsonLd";
import { buildShareCardUrl } from "@/lib/share-card";

const shareCardImage = buildShareCardUrl({
  baseUrl: SITE.url,
  tool: "i-ching",
  params: {
    hex: 1,
  },
});

export const metadata: Metadata = {
  title: "Free I Ching Oracle",
  description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
  alternates: {
    canonical: "/tools/i-ching-oracle",
  },
  openGraph: {
    title: "Free I Ching Oracle",
    description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
    url: "/tools/i-ching-oracle",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free I Ching Oracle",
    description: "Cast a browser-based I Ching hexagram with changing lines and reflective guidance.",
    images: [shareCardImage],
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "I Ching Oracle", href: "/tools/i-ching-oracle" },
];

const softwareSchema = buildWebApplicationSchema({
  name: "Free I Ching Oracle",
  url: `${SITE.url}/tools/i-ching-oracle`,
  description: "A browser-based I Ching oracle for six-line hexagram casting and reflective interpretation.",
  featureList: ["six-line casting", "changing lines", "primary hexagram", "relating hexagram"],
});

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
