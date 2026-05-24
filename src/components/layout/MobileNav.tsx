"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { primaryNavigation, SITE } from "@/lib/constants";

interface MobileNavProps {
  children: ReactNode;
  triggerLabel: string;
}

export default function MobileNav({ children, triggerLabel }: MobileNavProps) {
  const [open, setOpen] = useState<boolean>(false);

  const close = (): void => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-800 transition hover:border-brand-gold hover:text-brand-primary dark:border-white/10 dark:text-paper"
        aria-label={triggerLabel}
        aria-expanded={open}
      >
        {children}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
            aria-label="Close navigation overlay"
            onClick={close}
          />
          <aside className="absolute left-0 top-0 z-10 flex h-dvh w-[86vw] max-w-sm animate-in flex-col overflow-y-auto bg-paper p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl slide-in-from-left duration-200 dark:bg-ink-950">
            <div className="flex items-center justify-between border-b border-ink-200 pb-4 dark:border-white/10">
              <Link href="/" onClick={close} className="font-semibold text-ink-950 dark:text-paper">
                {SITE.name}
              </Link>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 dark:border-white/10 dark:text-ink-200"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-5 flex flex-col gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-left transition hover:bg-white dark:hover:bg-white/10"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink-950 dark:text-paper">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="mt-1 block text-xs leading-5 text-ink-600 dark:text-ink-300">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  <ChevronRight className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 border-t border-ink-200 pt-4 dark:border-white/10">
              <Link
                href="/search"
                onClick={close}
                className="flex items-center gap-3 rounded-lg bg-white px-3 py-3 text-sm font-medium text-ink-800 shadow-sm dark:bg-white/10 dark:text-paper"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search the knowledge base
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
