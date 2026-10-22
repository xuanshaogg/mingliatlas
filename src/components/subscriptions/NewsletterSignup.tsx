import TrackedForm from "@/components/analytics/TrackedForm";

export default function NewsletterSignup() {
  return (
    <section
      className="border-ink-200 mt-12 rounded-xl border bg-white p-5 sm:p-7 dark:border-white/10 dark:bg-white/5"
      aria-labelledby="newsletter-signup-title"
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] xl:items-end">
        <div>
          <p className="text-brand-700 dark:text-gold-300 text-xs font-semibold tracking-[0.14em] uppercase">
            Monthly reading note
          </p>
          <h2
            id="newsletter-signup-title"
            className="text-ink-950 dark:text-paper mt-2 text-[1.625rem] leading-tight"
          >
            Learn one practical method at a time
          </h2>
          <p className="text-ink-700 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-6">
            Receive one source-backed lesson, one worked example, and the latest free tool update
            each month.
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
            <input
              id="knowledge-newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label htmlFor="knowledge-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="knowledge-newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="border-ink-200 text-ink-950 focus:border-brand-primary dark:text-paper bg-paper-50 min-h-12 min-w-0 flex-1 rounded-lg border px-4 py-3 text-base outline-none dark:border-white/10 dark:bg-white/5"
          />
          <button type="submit" className="atlas-button-primary shrink-0">
            Send monthly note
          </button>
        </TrackedForm>
      </div>
    </section>
  );
}
