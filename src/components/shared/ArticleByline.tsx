import Link from "next/link";
import { AUTHOR } from "@/lib/constants";

function displayDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export default function ArticleByline({
  published,
  modified,
  hasSources,
}: {
  published?: string;
  modified?: string;
  hasSources: boolean;
}) {
  const publicationDate = displayDate(published);
  const updateDate = modified !== published ? displayDate(modified) : null;
  return (
    <div className="text-ink-600 dark:text-ink-300 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-6">
      <span>
        By{" "}
        <Link
          href="/about#editorial-team"
          rel="author"
          className="decoration-ink-300 font-semibold underline"
        >
          {AUTHOR.name}
        </Link>
      </span>
      {publicationDate ? (
        <span>
          Published <time dateTime={published}>{publicationDate}</time>
        </span>
      ) : null}
      {updateDate ? (
        <span>
          Updated <time dateTime={modified}>{updateDate}</time>
        </span>
      ) : null}
      {hasSources ? (
        <a href="#article-sources" className="decoration-ink-300 font-medium underline">
          Sources
        </a>
      ) : null}
    </div>
  );
}
