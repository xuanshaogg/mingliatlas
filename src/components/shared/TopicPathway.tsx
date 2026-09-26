import Link from "next/link";
import type { TopicPathway as TopicPathwayData } from "@/lib/content/topicPathways";

export default function TopicPathway({ pathway }: { pathway: TopicPathwayData }) {
  return (
    <>
      <p>{pathway.introduction}</p>
      <ol className="grid gap-3 sm:grid-cols-2">
        {pathway.links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="atlas-surface hover:border-brand-200 flex h-full gap-3 p-4 transition-colors"
            >
              <span
                aria-hidden="true"
                className="text-brand-primary dark:text-gold-300 pt-0.5 text-xs tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="text-ink-950 dark:text-paper block text-base leading-6 font-semibold">
                  {link.title}
                </span>
                <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-6">
                  {link.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
