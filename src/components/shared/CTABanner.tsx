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
    <section className="bg-ink-900 mt-14 rounded-3xl p-6 text-white sm:p-8 lg:p-10">
      <div className="flex flex-col items-start gap-6">
        <div className="max-w-2xl">
          <p className="text-paper-200 text-sm font-medium">Next step</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          <p className="text-paper-200 mt-4 text-base leading-8">{description}</p>
        </div>
        <Link
          href={href}
          className="text-ink-900 hover:bg-paper-200 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          {label}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
