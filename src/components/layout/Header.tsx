import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { primaryNavigation, SITE } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-paper/90 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label={`${SITE.name} home`}>
          <span className="flex items-center gap-2 sm:hidden">
            <Image src="/logo-icon.svg" alt="" width={40} height={40} priority className="h-10 w-10 flex-none" />
            <span className="font-serif text-xl font-bold leading-none text-ink-950 dark:text-paper">
              {SITE.name}
            </span>
          </span>
          <Image
            src="/logo.svg"
            alt=""
            width={420}
            height={56}
            priority
            className="hidden h-10 w-auto transition-transform group-hover:scale-[1.02] dark:hidden sm:block"
          />
          <Image
            src="/logo-white.svg"
            alt=""
            width={420}
            height={56}
            priority
            className="hidden h-10 w-auto transition-transform group-hover:scale-[1.02] dark:sm:block"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-primary dark:text-ink-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
              {item.description ? (
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden w-64 -translate-x-1/2 rounded-2xl border border-ink-200 bg-white p-3 text-xs font-normal leading-5 text-ink-600 opacity-0 shadow-xl transition group-hover:block group-hover:opacity-100 dark:border-white/10 dark:bg-ink-900 dark:text-ink-200">
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition hover:border-brand-gold hover:text-brand-primary dark:border-white/10 dark:text-ink-200 dark:hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileNav triggerLabel="Open navigation">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
