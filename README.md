# mingliatlas

English-language Chinese metaphysics reference site and deterministic tool suite for Bazi, Ziwei Doushu, I Ching, Feng Shui, and the Chinese Zodiac.

- Production: <https://mingliatlas.com>
- Framework: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Data: Supabase PostgreSQL through Prisma 7
- Email: Resend transactional email
- Hosting: Vercel
- Package manager: pnpm 11

The complete architecture, current indexing policy, delivery history, production state, verification results, and maintenance workflow are recorded in [docs/PROJECT-ARCHITECTURE-AND-DELIVERY-2026-07-13.md](docs/PROJECT-ARCHITECTURE-AND-DELIVERY-2026-07-13.md).

Operational and deployment references:

- [docs/OPERATIONS.md](docs/OPERATIONS.md)
- [docs/deployment.md](docs/deployment.md)
- [docs/analytics.md](docs/analytics.md)

## Local development

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Only database-backed routes require `DATABASE_URL`. Never commit `.env.local`, API keys, database credentials, or signed subscription links.

## Required checks

```bash
pnpm test -- --run
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm audit:links
```

After starting the production build locally, run:

```bash
AUDIT_BASE_URL=http://localhost:3000 pnpm audit:local
```

The AI interpretation endpoint is intentionally disabled in production. The three core tools remain fully functional because their results are calculated locally with deterministic code.
