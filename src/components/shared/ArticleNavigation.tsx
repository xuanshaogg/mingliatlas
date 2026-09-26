"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronDown, List } from "lucide-react";

interface ArticleNavigationProps {
  items: Array<{ id: string; label: string }>;
  mobile?: boolean;
}

export default function ArticleNavigation({ items, mobile = false }: ArticleNavigationProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const links = (
    <ol className="space-y-1">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            onClick={() => {
              setActive(item.id);
              if (detailsRef.current) detailsRef.current.open = false;
            }}
            className={`flex min-h-11 items-start gap-3 rounded-lg px-3 py-2.5 text-sm leading-5 transition ${active === item.id ? "bg-brand-50 text-brand-primary dark:bg-gold-500/10 dark:text-gold-300 font-semibold" : "text-ink-600 hover:bg-paper-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/5"}`}
          >
            <span className="mt-0.5 text-[0.65rem] tabular-nums opacity-60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  if (mobile)
    return (
      <nav aria-label="On this page" className="atlas-surface lg:hidden">
        <details ref={detailsRef} className="group">
          <summary className="text-ink-900 dark:text-paper flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <List className="text-brand-primary h-4 w-4" aria-hidden="true" /> On this page
            <span className="text-ink-500 ml-auto text-xs font-normal">
              {items.length} sections
            </span>
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="border-ink-100 border-t p-2 dark:border-white/10">{links}</div>
        </details>
      </nav>
    );

  return (
    <nav aria-label="On this page" className="atlas-surface hidden p-4 lg:block">
      <h2 className="text-ink-900 dark:text-paper flex items-center gap-2 px-3 pb-3 text-sm font-semibold">
        <List className="h-4 w-4" aria-hidden="true" /> On this page
      </h2>
      <div className="max-h-[45vh] overflow-y-auto">{links}</div>
      <a
        href="#article-top"
        className="border-ink-100 text-ink-500 hover:text-brand-primary mt-3 flex min-h-10 items-center gap-2 border-t px-3 pt-3 text-xs font-medium dark:border-white/10"
      >
        <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> Back to top
      </a>
    </nav>
  );
}
