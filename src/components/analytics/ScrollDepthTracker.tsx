"use client";

import { useEffect, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics/track";

export default function ScrollDepthTracker() {
  const trackedRef = useRef(false);

  useEffect((): (() => void) => {
    function handleScroll(): void {
      if (trackedRef.current) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

      if (scrollDepth >= 0.75) {
        trackedRef.current = true;
        trackAnalyticsEvent("page_scroll_75", { path: window.location.pathname });
        window.removeEventListener("scroll", handleScroll);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
