import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <section aria-labelledby="related-links-heading" className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary dark:text-gold-300">
            Further Reading
          </p>
          <h2 id="related-links-heading" className="mt-2 font-display text-4xl tracking-tight text-ink-950 dark:text-paper">
            Related guides
          </h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group border-t border-ink-200 bg-white px-1 py-5 transition hover:border-brand-primary dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-lg font-semibold leading-7 text-ink-950 dark:text-paper">{link.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{link.description}</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-primary dark:text-gold-300">
              Read guide
              <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
