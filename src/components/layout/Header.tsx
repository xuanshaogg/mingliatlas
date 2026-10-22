import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { SITE } from "@/lib/constants";
import MobileNav from "./MobileNav";
import PrimaryNavigation from "./PrimaryNavigation";

export default function Header() {
  return (
    <header className="text-ink-950 border-ink-200 bg-paper/95 supports-[backdrop-filter]:bg-paper/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/logo-icon.svg"
            alt=""
            width={32}
            height={32}
            priority
            loading="eager"
            className="h-8 w-8"
          />
          <span className="font-display text-[1.375rem] leading-none font-medium tracking-[-0.01em] sm:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <PrimaryNavigation />

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href="/search"
            className="text-ink-700 hover:bg-paper-100 hover:text-brand-primary inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="xl:hidden">
          <MobileNav triggerLabel="Open navigation">
            <Menu className="text-ink-800 h-5 w-5" aria-hidden="true" />
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
