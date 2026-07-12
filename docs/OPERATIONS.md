# Operations

The public contact and subscription forms store records in Supabase. They do not claim to send email when no transactional email provider is configured.

Run a privacy-safe operational summary from the site root:

```bash
pnpm ops:report
pnpm ops:report -- 30
```

The report includes active and unsubscribed subscriber counts, recent subscription count, open contact count, and timestamps/statuses for the five newest contact messages. It never prints email addresses or message bodies.

The public subscription lifecycle includes a self-service unsubscribe page at `/unsubscribe`. Re-subscribing the same address clears `unsubscribedAt`.
