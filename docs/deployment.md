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

After real Supabase credentials are available:

```bash
cp .env.example .env.local
# Fill DATABASE_URL and public Supabase variables
pnpm prisma migrate dev
pnpm prisma generate
```

For production, run migrations in a controlled release step before or during deployment, not from every CI pull request.

## Current Blockers

- Vercel project cannot be created locally without the target GitHub repository and Vercel account connection.
- Production/preview environment variables need real Supabase and domain values.
- Domain and brand name are still pending project-level decisions.
