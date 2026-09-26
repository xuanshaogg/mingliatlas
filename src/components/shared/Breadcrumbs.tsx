import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { normalizeBreadcrumbs } from "@/lib/content/breadcrumbs";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = normalizeBreadcrumbs(items);
  return (
    <nav aria-label="Breadcrumb" className="text-ink-600 dark:text-ink-300 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <ChevronRight className="text-ink-400 h-3.5 w-3.5" aria-hidden="true" />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-ink-900 dark:text-paper font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-primary dark:hover:text-gold-300 inline-flex items-center gap-1 transition"
                >
                  {index === 0 ? <Home className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
