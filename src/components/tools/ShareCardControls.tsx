"use client";

import { useId, useMemo, useState } from "react";
import { Check, Copy, Download, LoaderCircle, Share2 } from "lucide-react";
import { buildShareCardUrl, type ShareTool } from "@/lib/share-card-url";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/constants";

interface ShareCardControlsProps {
  tool: ShareTool;
  params: Record<string, string | number | boolean | null | undefined>;
  label: string;
}

export default function ShareCardControls({ tool, params, label }: ShareCardControlsProps) {
  const [feedback, setFeedback] = useState({ url: "", kind: "", message: "" });
  const [downloading, setDownloading] = useState(false);
  const inputId = useId();
  const shareCardUrl = useMemo(
    () => buildShareCardUrl({ baseUrl: SITE.url, tool, params }),
    [params, tool]
  );
  const currentFeedback = feedback.url === shareCardUrl ? feedback : null;
  const card = new URL(shareCardUrl);
  const localCardUrl = card.pathname + card.search;

  async function copyShareCardUrl(): Promise<void> {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(shareCardUrl);
      setFeedback({
        url: shareCardUrl,
        kind: "copy",
        message: "Card link copied. You can paste it wherever you want to share.",
      });
      trackEvent("share_card_clicked", { tool_name: tool, action: "copy" });
    } catch {
      setFeedback({
        url: shareCardUrl,
        kind: "copy-error",
        message: "Automatic copying is unavailable. Select and copy the link below.",
      });
    }
  }

  async function downloadCard(): Promise<void> {
    setDownloading(true);
    setFeedback({ url: shareCardUrl, kind: "", message: "" });
    try {
      const response = await fetch(localCardUrl, { signal: AbortSignal.timeout(15000) });
      if (!response.ok || !response.headers.get("content-type")?.startsWith("image/"))
        throw new Error("Card unavailable");
      const blobUrl = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = label + ".png";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      setFeedback({
        url: shareCardUrl,
        kind: "download",
        message: "Your image is ready. Check your browser downloads.",
      });
      trackEvent("share_card_clicked", { tool_name: tool, action: "download" });
    } catch {
      setFeedback({
        url: shareCardUrl,
        kind: "error",
        message: "The image could not be downloaded. Try again or use Preview to open the card.",
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="border-ink-200 bg-paper-50 dark:bg-ink-950/50 rounded-2xl border p-4 sm:p-5 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-md">
          <p className="text-ink-950 dark:text-paper flex items-center gap-2 text-sm font-semibold">
            <Share2 className="text-brand-primary h-4 w-4" aria-hidden="true" /> Keep or share this
            result
          </p>
          <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs leading-5">
            {tool === "bazi"
              ? "The card link includes the birth date, time, and calculation settings used for this chart."
              : tool === "i-ching"
                ? "Only the hexagram and changing lines are shared. Your question stays private."
                : "The card contains the two selected signs and their compatibility result."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={localCardUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("share_card_clicked", { tool_name: tool, action: "preview" })}
            className="atlas-button-secondary"
          >
            Preview<span className="sr-only"> share card in a new tab</span>
          </a>
          <button type="button" onClick={copyShareCardUrl} className="atlas-button-secondary">
            {currentFeedback?.kind === "copy" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {currentFeedback?.kind === "copy" ? "Copied" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={downloadCard}
            disabled={downloading}
            className="atlas-button-primary"
          >
            {downloading ? (
              <LoaderCircle
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            {downloading ? "Preparing…" : "Save image"}
          </button>
        </div>
      </div>
      <p
        role="status"
        className={
          currentFeedback?.message
            ? "text-ink-600 dark:text-ink-300 mt-3 text-xs leading-5"
            : "sr-only"
        }
      >
        {currentFeedback?.message ?? ""}
      </p>
      {currentFeedback?.kind === "copy-error" ? (
        <div className="mt-3">
          <label htmlFor={inputId} className="text-ink-600 dark:text-ink-300 text-xs font-medium">
            Share card link
          </label>
          <input
            id={inputId}
            readOnly
            value={shareCardUrl}
            onFocus={(event) => event.currentTarget.select()}
            className="atlas-input mt-2 h-11"
          />
        </div>
      ) : null}
    </div>
  );
}
