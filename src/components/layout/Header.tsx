import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { primaryNavigation, SITE } from "@/lib/constants";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/80 bg-paper/95 text-ink-950 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center" aria-label={`${SITE.name} home`}>
          <Image
            src="/logo.svg"
            alt=""
            width={420}
            height={56}
            priority
            loading="eager"
            className="h-9 w-auto transition-transform group-hover:scale-[1.02] sm:h-10"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-3 py-2 text-sm font-medium text-ink-700 transition hover:text-brand-primary"
            >
              {item.label}
              <span className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-brand-primary transition-transform group-hover:scale-x-100" />
              {item.description ? (
                <span className="pointer-events-none absolute left-1/2 top-full mt-4 hidden w-64 -translate-x-1/2 border border-ink-200 bg-white p-3 text-xs font-normal leading-5 text-ink-600 opacity-0 shadow-xl transition group-hover:block group-hover:opacity-100">
                  {item.description}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center border border-ink-300 text-ink-700 transition hover:border-brand-primary hover:text-brand-primary"
            aria-label="Search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="lg:hidden">
          <MobileNav triggerLabel="Open navigation">
            <Menu className="h-5 w-5 text-ink-800" aria-hidden="true" />
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
