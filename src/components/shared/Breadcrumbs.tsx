import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-600 dark:text-ink-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden="true" /> : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-ink-900 dark:text-paper">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 transition hover:text-brand-primary dark:hover:text-gold-300"
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
