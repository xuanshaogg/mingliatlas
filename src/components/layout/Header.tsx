import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { SITE } from "@/lib/constants";
import MobileNav from "./MobileNav";
import PrimaryNavigation from "./PrimaryNavigation";

export default function Header() {
  return (
    <header className="text-ink-950 sticky top-0 z-50 px-3 py-3 sm:px-6">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 rounded-full border border-white/80 bg-white/90 px-4 shadow-[0_8px_32px_-20px_rgb(29_40_30_/_0.25)] backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/logo-icon.svg"
            alt=""
            width={36}
            height={36}
            priority
            loading="eager"
            className="h-9 w-9"
          />
          <span className="text-xl font-bold tracking-[-0.045em] sm:text-2xl">{SITE.name}</span>
        </Link>

        <PrimaryNavigation />

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href="/search"
            className="bg-paper-100 text-ink-700 hover:bg-brand-50 hover:text-brand-primary inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
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
