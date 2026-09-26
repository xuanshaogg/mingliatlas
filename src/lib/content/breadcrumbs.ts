export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Hub pages sometimes supply both the topic and "Overview" at the same URL.
// Keep the topic label, and use the same trail in visible HTML and JSON-LD.
export function normalizeBreadcrumbs<T extends BreadcrumbItem>(items: readonly T[]): T[] {
  return items.filter((item, index) => {
    if (index === 0) return true;
    const path = item.href.replace(/\/$/, "") || "/";
    const previousPath = items[index - 1].href.replace(/\/$/, "") || "/";
    return path !== previousPath;
  });
}
