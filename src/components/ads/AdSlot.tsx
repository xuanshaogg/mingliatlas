const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

// Named placements so each slot can be mapped to its own AdSense unit.
const slotIds = {
  "article-inline": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_INLINE?.trim(),
  "article-end": process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END?.trim(),
} as const;

export type AdPlacement = keyof typeof slotIds;

/**
 * Reserved, policy-conscious ad placement between article sections.
 *
 * Renders nothing until a publisher ID and slot ID are configured, so there is
 * no empty box, script, or layout shift today. Enabling it also requires the
 * AdSense loader, a consent management platform for EEA/UK visitors, and CSP
 * allowances; see docs/ui-redesign-2026-10-21.md.
 */
export default function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = slotIds[placement];
  if (!adClient || !slot) return null;

  return (
    <div className="atlas-ad-slot" data-ad-placement={placement}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 250 }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
