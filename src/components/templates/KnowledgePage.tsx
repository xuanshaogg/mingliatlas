import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";
import DirectAnswer from "@/components/shared/DirectAnswer";
import ExpertQuote, { type Quote } from "@/components/shared/ExpertQuote";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import InfoCard, { type Statistic } from "@/components/shared/InfoCard";
import RelatedContent from "@/components/shared/RelatedContent";
import type { RelatedLink } from "@/components/shared/RelatedLinks";
import { SITE } from "@/lib/constants";
import {
  buildArticleDefinedTermSchema,
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  JsonLd,
  type JsonLdNode,
} from "@/lib/seo/jsonLd";

export interface Citation {
  label: string;
  source: string;
  url?: string;
}

export interface Section {
  heading: string;
  content: ReactNode;
  subsections?: Section[];
  stats?: Statistic[];
  quotes?: Quote[];
}

export interface KnowledgePageCta {
  title: string;
  description: string;
  href: string;
  label: string;
}

export interface KnowledgePageSchemaInput {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  jsonLd?: JsonLdNode;
}

export interface KnowledgePageProps {
  entityName: string;
  entityType: string;
  title: string;
  subtitle?: string;
  directAnswer: string;
  sections: Section[];
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
  schema: KnowledgePageSchemaInput;
  breadcrumbs: Crumb[];
  citations: Citation[];
  stats: Statistic[];
  cta: KnowledgePageCta;
  ogImage?: string;
}

function SectionBlock({ section, level = 2 }: { section: Section; level?: 2 | 3 }) {
  const HeadingTag = `h${level}` as "h2" | "h3";

  return (
    <section className={level === 2 ? "mt-12 scroll-mt-24" : "mt-8"}>
      <HeadingTag
        className={
          level === 2
            ? "text-3xl font-semibold tracking-tight text-ink-950 dark:text-paper"
            : "text-2xl font-semibold tracking-tight text-ink-950 dark:text-paper"
        }
      >
        {section.heading}
      </HeadingTag>
      <div className="mt-4 space-y-5 text-base leading-8 text-ink-700 dark:text-ink-200">{section.content}</div>
      {section.stats?.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {section.stats.map((stat) => (
            <div key={`${section.heading}-${stat.value}-${stat.label}`} className="rounded-lg border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-2xl font-semibold text-brand-primary dark:text-gold-300">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-ink-900 dark:text-paper">{stat.label}</p>
              {stat.description ? <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{stat.description}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
      {section.quotes?.map((quote) => (
        <div key={`${quote.author}-${quote.text}`} className="mt-6">
          <ExpertQuote quote={quote} />
        </div>
      ))}
      {section.subsections?.map((subsection) => (
        <SectionBlock key={subsection.heading} section={subsection} level={3} />
      ))}
    </section>
  );
}

export default function KnowledgePage({
  entityName,
  entityType,
  title,
  subtitle,
  directAnswer,
  sections,
  faqs,
  relatedLinks,
  schema,
  breadcrumbs,
  citations,
  stats,
  cta,
  ogImage,
}: KnowledgePageProps) {
  const articleSchema = schema.jsonLd ??
    buildArticleDefinedTermSchema({
      headline: schema.headline,
      description: schema.description,
      url: schema.url,
      entityName,
      entityType,
      datePublished: schema.datePublished,
      dateModified: schema.dateModified,
      image: schema.image ?? ogImage,
      citations,
      mentions: relatedLinks.map((link) => ({
        name: link.title,
        url: link.href,
      })),
    });

  return (
    <>
      <JsonLd data={[articleSchema, buildFAQPageSchema(faqs), buildBreadcrumbListSchema(breadcrumbs)]} />
      <article className="bg-paper dark:bg-ink-950">
        <header className="border-b border-ink-200 bg-[linear-gradient(135deg,#fdfbf7_0%,#f7efe3_55%,#fff_100%)] px-4 py-10 dark:border-white/10 dark:bg-[linear-gradient(135deg,#10101f_0%,#1a1a2e_70%,#111110_100%)] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary dark:text-gold-300">
                  {entityType}
                </p>
                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-950 dark:text-paper sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                {subtitle ? <p className="mt-5 text-xl leading-8 text-ink-600 dark:text-ink-300">{subtitle}</p> : null}
                <div className="mt-8">
                  <DirectAnswer answer={directAnswer} />
                </div>
              </div>
              <InfoCard stats={stats} />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
          <div>
            {sections.map((section) => (
              <SectionBlock key={section.heading} section={section} />
            ))}
            <FAQSection faqs={faqs} />
            <RelatedContent links={relatedLinks} />
            <CTABanner {...cta} />
            <p className="mt-8 text-sm leading-6 text-ink-500 dark:text-ink-400">
              For entertainment and self-reflection purposes.
            </p>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
                Sources
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                {citations.map((citation) => (
                  <li key={`${citation.label}-${citation.source}`}>
                    {citation.url ? (
                      <a href={citation.url} className="font-medium text-brand-primary underline decoration-brand-primary/30 transition hover:decoration-brand-primary dark:text-gold-300">
                        {citation.label}
                      </a>
                    ) : (
                      <span className="font-medium text-ink-900 dark:text-paper">{citation.label}</span>
                    )}
                    <span className="block">{citation.source}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-gold-300/70 bg-gold-50 p-5 text-sm leading-6 text-ink-700 dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-ink-200">
              <p className="font-semibold text-ink-950 dark:text-paper">About {SITE.name}</p>
              <p className="mt-2">We translate classical Chinese metaphysics into clear, modern guidance for structured self-knowledge.</p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
