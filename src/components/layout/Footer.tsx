import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import TrackedForm from "@/components/analytics/TrackedForm";
import { footerNavigation, primaryNavigation, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-paper mt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-10">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
            <Image src="/logo-icon.svg" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-2xl font-medium">{SITE.name}</span>
          </Link>
          <p className="text-ink-300 mt-5 max-w-sm text-sm leading-6">
            Clear guides and tools for exploring Bazi, Ziwei Doushu, I Ching, Feng Shui, and the
            Chinese Zodiac without mysticism or fear-based claims.
          </p>
        </div>

        <div>
          <h2 className="text-gold-300 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
            Explore
          </h2>
          <ul className="text-ink-300 mt-4 space-y-3 text-sm">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-gold-300 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
            Company
          </h2>
          <ul className="text-ink-300 mt-4 space-y-3 text-sm">
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
          <h2 className="text-gold-300 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
            Newsletter
          </h2>
          <p className="text-ink-300 mt-4 text-sm leading-6">
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
              <input
                id="footer-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
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
              className="placeholder:text-ink-400 ring-gold-400 min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-base text-white transition outline-none focus:ring-2"
            />
            <button
              type="submit"
              className="bg-gold-400 text-ink-950 hover:bg-gold-300 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition"
              aria-label="Subscribe"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </button>
          </TrackedForm>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 lg:px-10">
        <div className="text-ink-400 mx-auto flex max-w-7xl flex-col gap-3 text-xs leading-5 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. For entertainment and self-reflection
            purposes.
          </p>
          <p>
            Chinese metaphysics content is educational and does not replace professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
