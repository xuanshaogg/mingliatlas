import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title: string;
  description: string;
  href: string;
  label: string;
}

export default function CTABanner({ title, description, href, label }: CTABannerProps) {
  return (
    <section className="mt-16 bg-brand-primary p-6 text-white sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-200">Next Step</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-base leading-7 text-brand-50">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:bg-gold-100"
        >
          {label}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
