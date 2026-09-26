"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ChevronRight, Search, X } from "lucide-react";
import { primaryNavigation, SITE } from "@/lib/constants";

interface MobileNavProps {
  children: ReactNode;
  triggerLabel: string;
}

export default function MobileNav({ children, triggerLabel }: MobileNavProps) {
  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  const close = (): void => setOpen(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const drawer = drawerRef.current;
      const focusable = drawer?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();

      const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          setOpen(false);
          return;
        }
        if (event.key !== "Tab" || !focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      const desktop = window.matchMedia("(min-width: 1280px)");
      const handleBreakpoint = () => {
        if (desktop.matches) setOpen(false);
      };
      desktop.addEventListener("change", handleBreakpoint);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        desktop.removeEventListener("change", handleBreakpoint);
        document.body.style.overflow = previousOverflow;
      };
    }

    if (wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="text-ink-800 hover:text-brand-primary bg-paper-100 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[60] xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-nav-title"
            >
              <button
                type="button"
                className="bg-ink-950/50 absolute inset-0 backdrop-blur-sm"
                aria-label="Close navigation overlay"
                tabIndex={-1}
                onClick={close}
              />
              <aside
                ref={drawerRef}
                className="animate-in bg-paper slide-in-from-left dark:bg-ink-950 absolute top-3 bottom-3 left-3 z-10 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-y-auto rounded-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl duration-200"
              >
                <div className="border-ink-200 flex items-center justify-between border-b pb-4 dark:border-white/10">
                  <Link
                    id="mobile-nav-title"
                    href="/"
                    onClick={close}
                    className="text-ink-950 dark:text-paper font-semibold"
                  >
                    {SITE.name}
                  </Link>
                  <button
                    type="button"
                    onClick={close}
                    className="border-ink-200 text-ink-700 dark:text-ink-200 inline-flex h-11 w-11 items-center justify-center rounded-full border dark:border-white/10"
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
                      aria-current={
                        pathname === item.href
                          ? "page"
                          : pathname.startsWith(`${item.href}/`)
                            ? "true"
                            : undefined
                      }
                      className={`flex min-h-12 items-center justify-between rounded-lg px-3 py-3 text-left transition hover:bg-white dark:hover:bg-white/10 ${pathname === item.href || pathname.startsWith(`${item.href}/`) ? "bg-white shadow-sm dark:bg-white/10" : ""}`}
                    >
                      <span>
                        <span className="text-ink-950 dark:text-paper block text-sm font-semibold">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="text-ink-600 dark:text-ink-300 mt-1 block text-xs leading-5">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      <ChevronRight className="text-brand-gold h-4 w-4" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>

                <div className="border-ink-200 mt-5 border-t pt-4 dark:border-white/10">
                  <Link
                    href="/search"
                    onClick={close}
                    className="text-ink-800 dark:text-paper flex min-h-12 items-center gap-3 rounded-lg bg-white px-3 py-3 text-sm font-medium shadow-sm dark:bg-white/10"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" />
                    Search the knowledge base
                  </Link>
                </div>
              </aside>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
