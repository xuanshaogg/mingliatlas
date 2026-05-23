# Eastern Blueprint Brand Guide

Eastern Blueprint is a provisional brand name for the Chinese metaphysics site. Replace it once the final brand and domain are confirmed.

## Positioning

Tagline: “Where Eastern Wisdom Meets Modern Logic”

The brand acts as a cultural translator: warm, precise, and accessible for Western readers without mystifying or flattening Chinese metaphysics.

## Logo variants

All current logo files are SVG assets in `public/`.

| Asset | Use |
| --- | --- |
| `public/logo.svg` | Primary horizontal logo for light backgrounds and headers. |
| `public/logo-icon.svg` | Square icon for favicon/social avatars/watermarks where a compact mark is needed. |
| `public/logo-vertical.svg` | Stacked logo for footer, end cards, and layouts with more vertical space. |
| `public/logo-white.svg` | Horizontal logo for dark backgrounds. |

Logo concept: a Tai Chi-inspired circle with five gold element points, expressing classical balance, cyclic systems, and the Five Elements (Wu Xing). Keep clear space around the mark equal to at least half the icon width. Do not distort, recolor outside the approved palette, add shadows, or place the light logo on low-contrast backgrounds.

## Colors

Tokens live in `src/app/globals.css` using Tailwind v4 `@theme`. Do not create `tailwind.config.ts` unless a future Tailwind integration requires legacy config.

### Brand red

Primary use: logo, CTAs, important links, and strong brand surfaces.

- `brand-50` `#FDF8F6`
- `brand-100` `#F9E8E4`
- `brand-200` `#F0C5BC`
- `brand-300` `#E4A194`
- `brand-400` `#D87D6C`
- `brand-500` `#C95A44`
- `brand-600` `#A8402E`
- `brand-700` / `brand-primary` `#8B0000`
- `brand-800` `#6B0000`
- `brand-900` `#4A0000`

### Gold accent

Primary use: accents, dividers, focus rings, premium details, and dark-background highlights.

- `gold-400` `#D4B460`
- `gold-500` / `brand-gold` `#C9A84C`
- `gold-600` `#B89335`

### Paper neutrals

Primary use: warm page backgrounds and card surfaces.

- `paper-50` / `paper` `#FDFBF7`
- `paper-100` `#F5F0E5`
- `paper-200` `#EBE0CC`

### Ink neutrals

Primary use: body text, headings, borders, and dark mode surfaces.

- `ink-700` `#3A3A50`
- `ink-800` `#2A2A40`
- `ink-900` `#1A1A2E`

## Typography

- Body: Inter, then system UI fallback.
- Headings: Cormorant Garamond, then Georgia fallback.
- Display/Hero: Playfair Display, then Georgia fallback.
- Code/technical: Geist Mono, then monospace fallback.

Fonts are loaded in `src/app/layout.tsx` through `next/font/google` and mapped into Tailwind v4 tokens in `src/app/globals.css`.

## Voice

Use warm authority: clear, calm, and knowledgeable without sounding mystical. Explain classical systems through patterns, cycles, and cultural context.

Preferred language:

- Life Blueprint
- Energy Analysis
- Self-Knowledge
- Personality Decoding
- Ancient Wisdom
- This pattern suggests
- According to classical texts

Forbidden or discouraged language:

- Fortune Telling / Fortune Teller
- Superstition / Superstitious
- Magic / Magical
- Psychic / Clairvoyant
- Predict / Prediction when stated absolutely
- Guarantee
- Cursed / Hexed
- Lucky / Unlucky when oversimplified

Use “auspicious,” “favorable,” “challenging,” “suggest,” “indicate,” and “reveal patterns” instead of deterministic claims.

## Component visual rules

- Cards: warm white surfaces, subtle borders, `rounded-card`, and soft shadows.
- Primary buttons: brand red fill with white text.
- Secondary buttons: bordered, warm neutral background, brand red hover state.
- Links: brand red with underline offset; increase contrast or weight on hover.
- Dividers: gold gradient lines for editorial or section emphasis.
- Quotes: left gold rule with warm paper background.

## Replacement steps after final brand/domain confirmation

1. Update `SITE.name`, `SITE.url`, and metadata strings in `src/lib/constants.ts` and `src/app/layout.tsx` as needed.
2. Replace logo text in all `public/logo*.svg` assets or export final designer-provided SVGs with the same filenames.
3. Confirm whether `src/app/favicon.ico` should remain or be regenerated from `public/logo-icon.svg` for the final brand.
4. Search for “Eastern Blueprint” and replace with the final brand name across app copy and docs.
5. Update Open Graph and Twitter image assets if final brand visuals change.
6. Re-run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.

Final brand name and domain selection remain external user/business decisions.
