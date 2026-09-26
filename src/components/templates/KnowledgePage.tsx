import type { ReactNode } from "react";
import Link from "next/link";
import ArticleByline from "@/components/shared/ArticleByline";
import TopicPathway from "@/components/shared/TopicPathway";
import { topicPathways } from "@/lib/content/topicPathways";
import ArticleNavigation from "@/components/shared/ArticleNavigation";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";
import DirectAnswer from "@/components/shared/DirectAnswer";
import ExpertQuote, { type Quote } from "@/components/shared/ExpertQuote";
import FAQSection, { type FAQ } from "@/components/shared/FAQSection";
import InfoCard, { type Statistic } from "@/components/shared/InfoCard";
import NewsletterSignup from "@/components/subscriptions/NewsletterSignup";
import RelatedContent from "@/components/shared/RelatedContent";
import TrackedContentLinks from "@/components/analytics/TrackedContentLinks";
import TrackedCTABanner from "@/components/analytics/TrackedCTABanner";
import type { RelatedLink } from "@/components/shared/RelatedLinks";
import type { ContentLinkTracking } from "@/lib/analytics/content-path";
import { resolveCitationUrls } from "@/lib/content/citations";
import { uniqueContentLinks } from "@/lib/content/urls";
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
  tracking?: ContentLinkTracking;
}

export interface KnowledgePageSchemaInput {
  headline: string;
  description: string;
  url: string;
  alternateName?: string | string[];
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
  nextSteps?: RelatedLink[];
  nextStepsTracking?: ContentLinkTracking;
  schema: KnowledgePageSchemaInput;
  breadcrumbs: Crumb[];
  citations: Citation[];
  stats: Statistic[];
  cta: KnowledgePageCta;
  ogImage?: string;
}

function SectionBlock({
  section,
  level = 2,
  id,
}: {
  section: Section;
  level?: 2 | 3;
  id?: string;
}) {
  const HeadingTag = `h${level}` as "h2" | "h3";

  return (
    <section id={id} className={level === 2 ? "mt-12 scroll-mt-4 first:mt-0 sm:mt-14" : "mt-8"}>
      <HeadingTag
        className={
          level === 2
            ? "atlas-section-title"
            : "text-ink-950 dark:text-paper text-xl leading-snug sm:text-2xl"
        }
      >
        {section.heading}
      </HeadingTag>
      <div className="text-ink-700 dark:text-ink-200 mt-4 space-y-5 text-base leading-8">
        {section.content}
      </div>
      {section.stats?.length ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {section.stats.map((stat, statIndex) => (
            <div
              key={`${section.heading}-${stat.value}-${stat.label}-${statIndex}`}
              className="bg-paper-100 rounded-xl p-5 dark:bg-white/5"
            >
              <p className="text-brand-primary dark:text-gold-300 text-2xl font-semibold">
                {stat.value}
              </p>
              <p className="text-ink-900 dark:text-paper mt-1 text-sm font-semibold">
                {stat.label}
              </p>
              {stat.description ? (
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
                  {stat.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
      {section.quotes?.map((quote, quoteIndex) => (
        <div key={`${section.heading}-${quote.author}-${quoteIndex}`} className="mt-6">
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
  nextSteps,
  nextStepsTracking,
  schema,
  breadcrumbs,
  citations,
  stats,
  cta,
  ogImage,
}: KnowledgePageProps) {
  const resolvedCitations = resolveCitationUrls(citations);
  const currentPath = new URL(schema.url).pathname;
  const resolvedRelatedLinks = uniqueContentLinks(relatedLinks, currentPath);
  const pathway = topicPathways[currentPath];
  const pageSections: Section[] = pathway
    ? [{ heading: pathway.heading, content: <TopicPathway pathway={pathway} /> }, ...sections]
    : sections;
  const navigationItems = [
    ...pageSections.map((section, index) => ({
      id: `article-section-${index + 1}`,
      label: section.heading,
    })),
    ...(faqs.length ? [{ id: "faq-section-heading", label: "Common questions" }] : []),
  ];
  const visibleNextSteps = nextSteps
    ? uniqueContentLinks(nextSteps, currentPath)
    : resolvedRelatedLinks;
  const schemaMentionLinks = nextSteps ? visibleNextSteps.slice(0, 3) : resolvedRelatedLinks;
  const articleSchema =
    schema.jsonLd ??
    buildArticleDefinedTermSchema({
      headline: schema.headline,
      description: schema.description,
      url: schema.url,
      entityName,
      entityType,
      alternateName: schema.alternateName,
      datePublished: schema.datePublished,
      dateModified: schema.dateModified,
      image: schema.image ?? ogImage,
      citations: resolvedCitations,
      mentions: schemaMentionLinks.map((link) => ({
        name: link.title,
        url: link.href,
      })),
    });

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          ...(faqs.length ? [buildFAQPageSchema(faqs)] : []),
          buildBreadcrumbListSchema(breadcrumbs),
        ]}
      />
      <article className="atlas-knowledge-shell bg-paper dark:bg-ink-950">
        <header id="article-top" className="pt-6 pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-16">
              <div className="max-w-3xl">
                <p className="atlas-eyebrow">
                  {entityType === "DefinedTerm"
                    ? "Concept guide"
                    : ["Article", "BlogPosting"].includes(entityType)
                      ? "Knowledge guide"
                      : entityType}
                </p>
                <h1 className="atlas-page-title mt-5 max-w-4xl">{title}</h1>
                {subtitle ? <p className="atlas-page-intro mt-5 max-w-3xl">{subtitle}</p> : null}
                <ArticleByline
                  published={schema.datePublished}
                  modified={schema.dateModified}
                  hasSources={resolvedCitations.length > 0}
                />
                <div className="mt-6 sm:mt-8">
                  <DirectAnswer answer={directAnswer} />
                </div>
              </div>
              <InfoCard stats={stats} />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-4 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:px-10">
          <div className="max-w-3xl min-w-0">
            <ArticleNavigation key={`${schema.url}-mobile`} items={navigationItems} mobile />
            <div className="mt-8 lg:mt-0">
              {pageSections.map((section, sectionIndex) => (
                <SectionBlock
                  key={`${section.heading}-${sectionIndex}`}
                  section={section}
                  id={`article-section-${sectionIndex + 1}`}
                />
              ))}
            </div>
            <FAQSection faqs={faqs} />
            {nextStepsTracking ? (
              <TrackedContentLinks
                links={visibleNextSteps.slice(0, 3)}
                tracking={nextStepsTracking}
              />
            ) : (
              <RelatedContent links={resolvedRelatedLinks} />
            )}
            {cta.tracking ? <TrackedCTABanner {...cta} /> : <CTABanner {...cta} />}
            <NewsletterSignup />
            <p className="text-ink-500 dark:text-ink-400 mt-8 text-sm leading-6">
              For entertainment and self-reflection purposes.
            </p>
          </div>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:self-start">
            <ArticleNavigation key={schema.url} items={navigationItems} />
            <div id="article-sources" className="atlas-surface scroll-mt-4 p-5">
              <h2 className="text-ink-900 dark:text-paper text-sm font-semibold">Sources</h2>
              <ul className="text-ink-600 dark:text-ink-300 mt-4 space-y-3 text-sm leading-6">
                {resolvedCitations.map((citation) => (
                  <li key={`${citation.label}-${citation.source}`}>
                    {citation.url ? (
                      <a
                        href={citation.url}
                        className="text-brand-primary decoration-brand-primary/30 hover:decoration-brand-primary dark:text-gold-300 font-medium underline transition"
                      >
                        {citation.label}
                      </a>
                    ) : (
                      <span className="text-ink-900 dark:text-paper font-medium">
                        {citation.label}
                      </span>
                    )}
                    <span className="block">{citation.source}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about#editorial-standards"
                className="text-brand-primary dark:text-gold-300 mt-4 inline-flex text-xs font-medium underline"
              >
                Editorial standards and corrections
              </Link>
            </div>
            <div className="bg-paper-100 text-ink-700 dark:bg-gold-500/10 dark:text-ink-200 rounded-2xl p-5 text-sm leading-6">
              <p className="text-ink-950 dark:text-paper font-semibold">About {SITE.name}</p>
              <p className="mt-2">
                We translate classical Chinese metaphysics into clear, modern guidance for
                structured self-knowledge.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
