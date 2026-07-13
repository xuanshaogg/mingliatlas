import TrackedForm from "@/components/analytics/TrackedForm";

export default function NewsletterSignup() {
  return (
    <section className="mt-12 border-y border-ink-200 py-8 dark:border-white/10" aria-labelledby="newsletter-signup-title">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-primary dark:text-gold-300">
            Monthly reading note
          </p>
          <h2 id="newsletter-signup-title" className="mt-2 text-2xl font-semibold text-ink-950 dark:text-paper">
            Learn one practical method at a time
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">
            Receive one source-backed lesson, one worked example, and the latest free tool update each month.
          </p>
        </div>
        <TrackedForm
          className="flex flex-col gap-3 sm:flex-row"
          action="/api/subscribe"
          method="post"
          eventName="subscribe_requested"
          properties={{ source: "knowledge_page" }}
        >
          <input type="hidden" name="source" value="knowledge_page" />
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="knowledge-newsletter-website">Website</label>
            <input id="knowledge-newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label htmlFor="knowledge-newsletter-email" className="sr-only">Email address</label>
          <input
            id="knowledge-newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-md border border-ink-200 bg-white px-4 py-3 text-sm text-ink-950 outline-none focus:border-brand-primary dark:border-white/10 dark:bg-white/5 dark:text-paper"
          />
          <button type="submit" className="shrink-0 rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Send monthly note
          </button>
        </TrackedForm>
      </div>
    </section>
  );
}
