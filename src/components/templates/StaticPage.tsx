import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/shared/Breadcrumbs";

export interface StaticPageSection {
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
      <header className="border-b border-ink-200 bg-paper-100 px-4 py-10 dark:border-white/10 dark:bg-ink-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary dark:text-gold-300">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance font-display text-5xl tracking-tight text-ink-950 dark:text-paper sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-600 dark:text-ink-300">
            {description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {children ? <div className="space-y-8">{children}</div> : null}
        {sections.length ? (
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-3xl tracking-tight text-ink-950 dark:text-paper">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-ink-700 dark:text-ink-200">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        ) : null}
        {cta ? (
          <section className="mt-14 border-l-2 border-brand-primary bg-paper-100 p-6 dark:border-gold-300 dark:bg-gold-500/10">
            <h2 className="font-display text-3xl tracking-tight text-ink-950 dark:text-paper">{cta.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink-700 dark:text-ink-200">{cta.description}</p>
            <Link
              href={cta.href}
              className="mt-5 inline-flex bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {cta.label}
            </Link>
          </section>
        ) : null}
      </div>
    </article>
  );
}
