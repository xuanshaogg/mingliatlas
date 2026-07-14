import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import TrackedForm from "@/components/analytics/TrackedForm";
import { footerNavigation, primaryNavigation, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-950 text-paper dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
            <Image
              src="/logo-white.svg"
              alt=""
              width={420}
              height={56}
              className="h-12 w-auto max-w-full"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink-300">
            Clear guides and tools for exploring Bazi, Ziwei Doushu, I Ching,
            Feng Shui, and the Chinese Zodiac without mysticism or fear-based claims.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            {primaryNavigation.slice(0, 7).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Company</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                {item.href.endsWith(".xml") ? (
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">Newsletter</h2>
          <p className="mt-4 text-sm leading-6 text-ink-300">
            Get practical explainers on Chinese metaphysics, seasonal cycles, and new free tools.
          </p>
          <TrackedForm
            className="mt-5 flex gap-2"
            action="/api/subscribe"
            method="post"
            eventName="subscribe_requested"
            properties={{ source: "footer" }}
          >
            <input type="hidden" name="source" value="footer" />
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="footer-website">Website</label>
              <input id="footer-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            className="min-w-0 flex-1 border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-ink-400 outline-none ring-gold-400 transition focus:ring-2"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center bg-gold-400 text-ink-950 transition hover:bg-gold-300"
              aria-label="Subscribe"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </button>
          </TrackedForm>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs leading-5 text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {SITE.name}. For entertainment and self-reflection purposes.</p>
          <p>Chinese metaphysics content is educational and does not replace professional advice.</p>
        </div>
      </div>
    </footer>
  );
}
