import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="atlas-eyebrow">Mingli Atlas</p>
      <h1 className="font-display text-brand-800 mt-4 text-7xl font-semibold">404</h1>
      <p className="text-ink-600 mt-4 text-xl">Page not found</p>
      <Link href="/" className="atlas-button-primary mt-8">
        Return Home
      </Link>
    </section>
  );
}
