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
          <p className="atlas-eyebrow">Further Reading</p>
          <h2 id="related-links-heading" className="atlas-section-title mt-4">
            Related guides
          </h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="atlas-surface group hover:border-brand-200 p-5 transition-colors duration-200 sm:p-6"
          >
            <h3 className="text-ink-950 dark:text-paper text-lg leading-7 font-semibold">
              {link.title}
            </h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
              {link.description}
            </p>
            <span className="text-brand-primary dark:text-gold-300 mt-4 inline-flex items-center text-sm font-semibold">
              Read guide
              <ArrowRight
                className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
