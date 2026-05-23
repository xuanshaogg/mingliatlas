import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import ZodiacCompatibilityCalculator from "@/components/tools/ZodiacCompatibilityCalculator";
import { SITE } from "@/lib/constants";
import { buildBreadcrumbListSchema, buildWebApplicationSchema, JsonLd } from "@/lib/seo/jsonLd";
import { buildShareCardUrl } from "@/lib/share-card";

const shareCardImage = buildShareCardUrl({
  baseUrl: SITE.url,
  tool: "zodiac",
  params: {
    a: "rat",
    b: "ox",
  },
});

export const metadata: Metadata = {
  title: "Chinese Zodiac Compatibility Calculator",
  description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
  alternates: {
    canonical: "/tools/zodiac-compatibility",
  },
  openGraph: {
    title: "Chinese Zodiac Compatibility Calculator",
    description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
    url: "/tools/zodiac-compatibility",
    images: [shareCardImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Zodiac Compatibility Calculator",
    description: "Compare two Chinese zodiac signs with harmony pairs, triads, clashes, strengths, and watchouts.",
    images: [shareCardImage],
  },
};

const breadcrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Zodiac Compatibility", href: "/tools/zodiac-compatibility" },
];

const softwareSchema = buildWebApplicationSchema({
  name: "Chinese Zodiac Compatibility Calculator",
  url: `${SITE.url}/tools/zodiac-compatibility`,
  description: "A browser-based Chinese zodiac compatibility calculator for harmony, triad, and clash patterns.",
  featureList: ["Liu He harmony pairs", "three-harmony groups", "clash patterns", "strengths", "watchouts"],
});

export default function ZodiacCompatibilityPage() {
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
              Chinese Zodiac Compatibility Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-600 dark:text-ink-300">
              Compare two zodiac signs through Liu He harmony pairs, three-harmony groups, and clash patterns. Use
              the result as a conversation aid, not a fixed relationship verdict.
            </p>
          </header>
          <div className="mt-10">
            <ZodiacCompatibilityCalculator />
          </div>
        </div>
      </main>
    </>
  );
}
