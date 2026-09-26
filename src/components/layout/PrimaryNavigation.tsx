"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/constants";

export default function PrimaryNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary navigation"
      className="bg-paper-50 hidden items-center gap-0.5 rounded-full p-1 xl:flex"
    >
      {primaryNavigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.description}
            aria-current={active ? (pathname === item.href ? "page" : "true") : undefined}
            className={`rounded-full px-3.5 py-2.5 text-[0.8125rem] font-semibold transition-colors duration-200 ${active ? "bg-brand-50 text-brand-primary" : "text-ink-600 hover:text-ink-950 hover:bg-white"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
