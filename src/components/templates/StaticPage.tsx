import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";
import { buildBreadcrumbListSchema, JsonLd } from "@/lib/seo/jsonLd";

export interface StaticPageSection {
  id?: string;
  heading: string;
  content: ReactNode;
}

interface StaticPageProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
  sections?: StaticPageSection[];
  cta?: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
}

export default function StaticPage({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  sections = [],
  cta,
}: StaticPageProps) {
  return (
    <article className="atlas-knowledge-shell bg-paper dark:bg-ink-950">
      <JsonLd data={buildBreadcrumbListSchema(breadcrumbs)} />
      <header className="border-ink-200 border-b px-5 pt-6 pb-10 sm:px-8 sm:pb-14 lg:px-10 dark:border-white/10">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />
          <p className="atlas-eyebrow mt-10 sm:mt-12">{eyebrow}</p>
          <h1 className="atlas-page-title mt-5 max-w-4xl">{title}</h1>
          <p className="atlas-page-intro mt-5 max-w-3xl">{description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        {children ? <div className="space-y-8">{children}</div> : null}
        {sections.length ? (
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading} id={section.id} className="scroll-mt-4">
                <h2 className="atlas-section-title">{section.heading}</h2>
                <div className="atlas-prose mt-4 max-w-[46rem] space-y-4">{section.content}</div>
              </section>
            ))}
          </div>
        ) : null}
        {cta ? (
          <section className="border-ink-200 mt-14 rounded-xl border bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <h2 className="atlas-section-title">{cta.title}</h2>
            <p className="text-ink-700 dark:text-ink-200 mt-3 max-w-2xl text-base leading-7">
              {cta.description}
            </p>
            <Link href={cta.href} className="atlas-button-primary mt-5">
              {cta.label}
            </Link>
          </section>
        ) : null}
      </div>
    </article>
  );
}
