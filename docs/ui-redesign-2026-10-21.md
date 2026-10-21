# UI redesign — 2026-10-21

Editorial redesign of the shared design system and launch-critical templates. Built from production `main` 338bc9f.

## What changed

- **Type:** Newsreader (via `next/font`) for headings and display text; Manrope stays for UI and body copy. There are 2 font preloads in total.
- **Tokens (`src/app/globals.css`):** warmer paper neutrals, corner radii capped at 12px, flat bordered surfaces instead of shadows, square buttons (8px radius). `.atlas-eyebrow` is now a small-caps label rather than a pill. New `.atlas-prose` rules handle article rhythm, links, lists and tables. New `.atlas-ad-slot` reserves space for ads.
- **Chrome:** a full-width sticky header with a hairline border and an underline for the active nav item, a flat mobile drawer, and a full-bleed footer with a dynamic copyright year.
- **KnowledgePage (all hubs, guides, zodiac, hexagram and blog pages):** a ruled header with Quick Facts as a side column, a Direct Answer with an accent rule, ruled sections, a line-style table of contents and sources list, FAQ questions rendered as `<h3>` inside `<summary>`, and flat related cards.
- **Pages:** home (topic-first hero with the free-tools list, plus ruled lists instead of nested cards), blog index (category rail and two-column list), tools index, StaticPage (about and legal pages), and the subscribe and contact success pages.

Unchanged: URLs, redirects, titles, meta descriptions, canonicals, robots directives, sitemap (41 URLs), llms.txt, JSON-LD types, analytics events, form actions, tool algorithms, and the content files under `src/content/**`.

## Ads (reserved, not enabled)

`src/components/ads/AdSlot.tsx` has two placements in `KnowledgePage`:

- `article-inline`: after the second section, only on pages with more than 3 sections.
- `article-end`: after the last section, before the FAQ.

Each slot renders nothing until `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_INLINE` / `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END` are set. Before setting them:

1. Replace the placeholder in `public/ads.txt` with the real publisher line.
2. Add a Google-certified CMP for EEA/UK/CH visitors, and load `adsbygoogle.js` only after consent.
3. Extend the CSP in `next.config.ts` (`script-src`, `img-src`, `frame-src`, `connect-src`) for the AdSense and DoubleClick domains.
4. Fill in the owner fields still missing from Terms and Privacy: legal entity, contact email, governing law and retention periods.

## Rollback

Promote the previous production deployment in Vercel, or revert the merge commit on `main`.
