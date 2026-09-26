import TrackedForm from "@/components/analytics/TrackedForm";

export default function NewsletterSignup() {
  return (
    <section
      className="bg-paper-100 mt-12 rounded-2xl p-5 sm:p-7 dark:bg-white/5"
      aria-labelledby="newsletter-signup-title"
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] xl:items-end">
        <div>
          <p className="text-brand-primary dark:text-gold-300 text-sm font-semibold">
            Monthly reading note
          </p>
          <h2
            id="newsletter-signup-title"
            className="text-ink-950 dark:text-paper mt-2 text-2xl font-semibold"
          >
            Learn one practical method at a time
          </h2>
          <p className="text-ink-600 dark:text-ink-300 mt-3 max-w-2xl text-sm leading-6">
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
            className="border-ink-200 text-ink-950 focus:border-brand-primary dark:text-paper min-h-12 min-w-0 flex-1 rounded-lg border bg-white px-4 py-3 text-base outline-none dark:border-white/10 dark:bg-white/5"
          />
          <button type="submit" className="atlas-button-primary shrink-0">
            Send monthly note
          </button>
        </TrackedForm>
      </div>
    </section>
  );
}
