import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-brand-800">404</h1>
      <p className="mt-4 text-xl text-ink-600">Page not found</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-brand-800 px-6 py-3 text-white transition hover:bg-brand-700"
      >
        Return Home
      </Link>
    </main>
  );
}
