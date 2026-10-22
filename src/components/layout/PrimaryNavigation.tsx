"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/constants";

export default function PrimaryNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation" className="hidden h-full items-stretch gap-1 xl:flex">
      {primaryNavigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.description}
            aria-current={active ? (pathname === item.href ? "page" : "true") : undefined}
            className={`inline-flex items-center border-b-2 px-3 pt-0.5 text-sm font-semibold transition-colors duration-200 ${active ? "border-brand-primary text-ink-950" : "text-ink-700 hover:text-ink-950 hover:border-ink-300 border-transparent"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
