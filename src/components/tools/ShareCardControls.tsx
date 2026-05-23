"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Share2 } from "lucide-react";
import { buildShareCardUrl, type ShareTool } from "@/lib/share-card";
import { SITE } from "@/lib/constants";

interface ShareCardControlsProps {
  tool: ShareTool;
  params: Record<string, string | number | boolean | null | undefined>;
  label: string;
}

export default function ShareCardControls({ tool, params, label }: ShareCardControlsProps) {
  const [copied, setCopied] = useState(false);
  const shareCardUrl = useMemo(() => buildShareCardUrl({ baseUrl: SITE.url, tool, params }), [params, tool]);

  async function copyShareCardUrl(): Promise<void> {
    await navigator.clipboard.writeText(shareCardUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-paper-100 p-4 dark:border-white/10 dark:bg-ink-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-950 dark:text-paper">Share this result</p>
          <p className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-400">
            Privacy-safe card generated only from URL parameters.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={shareCardUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink-200 px-4 text-sm font-semibold text-ink-800 transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:text-ink-200 dark:hover:border-gold-300 dark:hover:text-gold-200"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Preview
          </a>
          <button
            type="button"
            onClick={copyShareCardUrl}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink-200 px-4 text-sm font-semibold text-ink-800 transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:text-ink-200 dark:hover:border-gold-300 dark:hover:text-gold-200"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            {copied ? "Copied" : "Copy"}
          </button>
          <a
            href={shareCardUrl}
            download={`${label}.png`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-primary px-4 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-gold-400 dark:text-ink-950 dark:hover:bg-gold-300"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
