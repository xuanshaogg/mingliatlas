# Operations

The public contact and subscription forms store records in Supabase. When Resend is configured, subscriptions use a seven-day signed confirmation link, confirmed subscribers receive a welcome email, and contact messages notify the configured editorial inbox. Database writes remain the source of truth if email delivery is unavailable.

Run a privacy-safe operational summary from the site root:

```bash
pnpm ops:report
pnpm ops:report -- 30
```

The report includes active and unsubscribed subscriber counts, recent subscription count, open contact count, and timestamps/statuses for the five newest contact messages. It never prints email addresses or message bodies.

The public subscription lifecycle includes a self-service unsubscribe page at `/unsubscribe`. Re-subscribing the same address clears `unsubscribedAt`.

Required production variables for delivery:

```text
RESEND_API_KEY
EMAIL_FROM
CONTACT_NOTIFICATION_EMAIL
SUBSCRIPTION_TOKEN_SECRET
```
