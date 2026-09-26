# Typography and interface redesign — 24 September 2026

This pass responds to the request for smoother typography and a redesigned site-wide visual framework. It builds on the existing local UI work.

## Design system

- Manrope replaces the mixed Inter, Cormorant and Playfair families. Headings and interface text now share one variable font; Chinese text retains system fallbacks and data can still use Geist Mono. Next.js serves the font files locally.
- Warm white and pale sage surfaces, green-gray text, muted terracotta actions, and restrained gold accents.
- Shared page titles, section titles, introductions and eyebrow labels define the type hierarchy. Main title sizes scale from 32 to 56 px; article text keeps generous line spacing.
- Cards use soft 24 px corners and faint borders. Primary and secondary actions use pill shapes, and inputs share a consistent focus treatment.
- A floating navigation bar, current-section pills, a rounded mobile drawer, a matching footer, and a keyboard skip link provide a consistent site shell.
- Reduced-motion preferences suppress the decorative movement and control transitions.

## Applied to

- Home: new hero composition, direct tool entry cards, separated knowledge cards and quieter article listings. The decorative hero artwork is omitted on narrow phones so actions appear earlier.
- Knowledge and static templates: aligned header/body columns, consistent reading widths, softer facts and quotations, and matching contents, FAQ, related links and calls to action.
- Tool directory and all three calculator/oracle interfaces: coherent titles, fields, result surfaces and sharing controls.
- Search, blog, contact, subscription, unsubscribe, confirmation, sitemap and error pages.

Editorial content, tool calculations, URL structure, canonical metadata and structured-data generation are retained. The visible schema term “DefinedTerm” is presented as “Concept guide”; the schema value itself is unchanged.

## Preview and build

- `pnpm build` completed, including TypeScript compilation and generation of 261 static pages.
- Browser render inspection covered the home page, tools, Bazi article, Bazi form, zodiac results, mobile drawer and search. Views included 320, 390, 768 and 1440 px widths.
- The production page reports Manrope as its heading font. Representative screenshots show the final typography and layouts; they do not constitute a functional regression suite.
- This pass did not run automated tests or submit contact/subscription forms. Earlier test results are recorded separately in `UI-REFINEMENT-2026-09-24.md`.
- Local production preview: `http://127.0.0.1:3000/`. Changes have not been deployed.

Screenshot files are in the local Codex artifact directory `ui-redesign`:
`home-desktop.png`, `home-mobile.png`, `tools-desktop.png`, and `article-desktop.png`.
