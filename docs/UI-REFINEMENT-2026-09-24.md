# UI refinement — 24 September 2026

This pass builds on the existing UI work in the local `main` checkout.

## Changes

- Shared surfaces, buttons, form controls, quieter borders, and consistent rounded corners.
- Tool directory cards explain the use case and required inputs, with separate tool and learning links.
- Desktop and mobile navigation show the current section. The mobile drawer releases its scroll lock when the viewport expands to desktop size.
- Knowledge and blog articles have a desktop section index and collapsible mobile contents, native section links, current-section indication, and a return-to-top link.
- Search matches multiple words in any order, handles punctuation and accented romanization, ranks title matches first, and displays query-aware topic counts. Query and topic are represented in the URL; browser history restores the selected topic. Results load in groups of 12, with keyboard focus moved to the first newly revealed result.
- Bazi identifies results from previous inputs and prompts recalculation. Element bars use distinct colors and represent the actual percentages, including zero. Bazi and I Ching result regions have explicit accessible names and direct links back to edit the inputs.
- I Ching labels the initial sample, offers editable starting prompts, rejects empty questions, displays the question used for a reading, and focuses the new result.
- Zodiac comparison supports swapping the selected signs and jumping directly to the result.
- Sharing provides copy feedback, a selectable link when clipboard access fails, actual image downloads, and recovery feedback for failed downloads. The Bazi share description states which birth details are included in the link.

## Verification

| Area | Checks | Result |
| --- | --- | --- |
| Search | Relevance, multiple terms, punctuation, accents, Chinese text, stable source data | 5 new unit cases passed |
| Tools | Existing Bazi reading path, I Ching, zodiac, and share-card cases | 15 existing cases passed |
| SEO and analytics | GEO audit, indexing policy, tool funnel, content path | 39 existing cases passed |
| Static checks | TypeScript, ESLint, whitespace errors | Passed |
| Production | Next.js production build | Passed; 261 static pages generated |
| Search in browser | Category counts, URL state, Back restoration, empty state, reset, loading more and focus | Passed |
| Edge cases | 160-character unbroken search input; empty I Ching input; denied clipboard; failed image request | Passed after fixing narrow-screen search overflow |
| Tool interactions | Bazi calculate/edit/update/reset; oracle cast/reset; sign swap/result focus; PNG download | Passed |
| Reading | Desktop and mobile section links, current section, mobile contents closing after navigation | Passed |
| Navigation | Focus loop, scroll lock, restoration when resizing from tablet to desktop | Passed |
| Layout | 320px route sweep; 390px tool results; 768px tool directory; 1440px desktop | No horizontal page overflow on checked routes |

The narrow-screen route sweep covered `/`, `/tools`, `/search`, all three tool detail pages, `/blog`, `/bazi/five-elements`, and `/contact`. Representative templates and flows were checked; each individual content page was not visually reviewed. Contact and newsletter forms were not submitted.

Routes, editorial content, canonical metadata, structured-data builders, and the underlying Bazi, I Ching, and zodiac calculation libraries retain their existing behavior.
