# Deployment Guide

This project targets Vercel + Supabase for the Chinese Metaphysics GEO site.

## Runtime

- Framework: Next.js 16 App Router
- Package manager: pnpm
- Node.js: 22.x
- Build command: `pnpm build`
- Install command: `pnpm install --frozen-lockfile`
- Output directory: `.next`

Node.js 22 is used because the current local OpenClaw runtime and Next.js 16 stack are already validated on Node 22.

## Vercel Setup Checklist

1. Create a GitHub repository and push `chinese-metaphysics-site`.
2. Import the GitHub repository in Vercel.
3. Use these settings:
   - Framework Preset: Next.js
   - Production Branch: `main`
   - Install Command: `pnpm install --frozen-lockfile`
   - Build Command: `pnpm build`
   - Output Directory: `.next`
4. Enable Preview Deployments for pull requests.
5. Enable deployment comments on pull requests.
6. Choose the Serverless Function region close to the Supabase project region.
7. Bind the production domain after the brand/domain decision is finalized.

## Current Production Deployment

- GitHub repository: `https://github.com/xuanshaogg/mingliatlas`
- Vercel project: `mingliatlascom/mingliatlas`
- Vercel production deployment: `dpl_B86YpJaW1chms9oYghkymeJ7UQH4`
- Production URL: `https://mingliatlas.com`
- WWW URL: `https://www.mingliatlas.com`
- Vercel fallback URL: `https://mingliatlas.vercel.app`
- Cloudflare DNS:
  - `A @ 76.76.21.21`
  - `CNAME www cname.vercel-dns.com`
  - Both records were left as DNS only for Vercel validation.

## Environment Variables

Configure the same variable names in Vercel Production and Preview environments. Use different Supabase projects or database branches for Preview if possible.

### Required

```bash
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
```

### Future / Optional

```bash
OPENAI_API_KEY=
```

## GitHub Secrets / Variables

GitHub Actions expects:

### Secrets

- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Variables

- `NEXT_PUBLIC_SITE_URL`

The current CI only validates/generates Prisma and builds the app. It does not run database migrations.

## Database Migration Flow

Local and production use the same variable names. Store real values in `.env.local` and Vercel environment variables; keep `.env` as a non-production placeholder.

```bash
cp .env.example .env.local
# Fill DATABASE_URL and public Supabase variables.
pnpm exec prisma migrate status
pnpm exec prisma migrate deploy
pnpm exec prisma generate
```

For production, run migrations in a controlled release step before or during deployment, not from every CI pull request. If the remote `public` schema already contains unrelated tables, apply the initial SQL once and baseline with `pnpm exec prisma migrate resolve --applied <migration_name>`.

### Current Production Database Status

- Supabase project `fuiuwcsvztafedmszkyr` is linked locally via Supabase CLI.
- Vercel Production has `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL`.
- The initial Prisma schema was applied to Supabase on 2026-05-24 and `pnpm exec prisma migrate status` reports the database schema is up to date.
- Runtime `DATABASE_URL` uses a dedicated `mingliatlas_app` Postgres role through Supabase pooler, not the Supabase owner password.

## Current Blockers

- Preview environment variables and PR preview deployment comments still need GitHub/Vercel integration verification.
- AI interpretation now has a production DeepSeek provider. RAG/source-corpus retrieval is still pending.
