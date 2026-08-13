"use client";

import { useCallback, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEventName, AnalyticsEventProperties } from "@/lib/analytics/track";

export type CalculatorToolName = "bazi" | "i-ching" | "zodiac";

type TrackEvent = (
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties,
) => void;

export interface ToolFunnelTracker {
  markStarted(): void;
  markCompleted(): void;
}

export interface ToolFunnelState {
  hasStarted: boolean;
  hasCompleted: boolean;
}

type PersistState = (state: ToolFunnelState) => void;

const STORAGE_PREFIX = "mingliatlas:tool-funnel:v1";

function storageKey(toolName: CalculatorToolName): string {
  const path = typeof window === "undefined" ? "" : window.location.pathname;
  return `${STORAGE_PREFIX}:${toolName}:${path}`;
}

function readStoredState(toolName: CalculatorToolName): ToolFunnelState | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const value = window.sessionStorage.getItem(storageKey(toolName));
    if (!value) return undefined;

    const state = JSON.parse(value) as Partial<ToolFunnelState>;
    return {
      hasStarted: state.hasStarted === true,
      hasCompleted: state.hasCompleted === true,
    };
  } catch {
    return undefined;
  }
}

function persistStoredState(toolName: CalculatorToolName, state: ToolFunnelState): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(storageKey(toolName), JSON.stringify(state));
  } catch {
    // Measurement should not affect tool use when browser storage is unavailable.
  }
}

/**
 * Keeps the acquisition funnel to one start and one first successful result
 * per tool/page view. Later successful calculations stay useful operational
 * telemetry, but are intentionally recorded separately so they cannot make a
 * completion rate exceed 100%.
 */
export function createToolFunnelTracker(
  toolName: CalculatorToolName,
  trackEvent: TrackEvent,
  initialState?: ToolFunnelState,
  persistState?: PersistState,
): ToolFunnelTracker {
  let hasStarted = initialState?.hasStarted === true;
  let hasCompleted = initialState?.hasCompleted === true;

  function saveState(): void {
    persistState?.({ hasStarted, hasCompleted });
  }

  function markStarted(): void {
    if (hasStarted) return;

    hasStarted = true;
    saveState();
    trackEvent("calculator_started", { tool_name: toolName });
  }

  function markCompleted(): void {
    // Supports intentional default-value submissions while preserving the
    // invariant that every first completion belongs to one started session.
    markStarted();

    if (hasCompleted) {
      trackEvent("calculator_recalculated", { tool_name: toolName });
      return;
    }

    hasCompleted = true;
    saveState();
    trackEvent("calculator_completed", { tool_name: toolName });
  }

  return { markStarted, markCompleted };
}

export function useToolFunnelTracker(toolName: CalculatorToolName): ToolFunnelTracker {
  const trackerRef = useRef<ToolFunnelTracker | null>(null);

  const getTracker = useCallback((): ToolFunnelTracker => {
    if (trackerRef.current === null) {
      trackerRef.current = createToolFunnelTracker(
        toolName,
        trackEvent,
        readStoredState(toolName),
        (state) => persistStoredState(toolName, state),
      );
    }

    return trackerRef.current;
  }, [toolName]);

  const markStarted = useCallback(() => {
    getTracker().markStarted();
  }, [getTracker]);

  const markCompleted = useCallback(() => {
    getTracker().markCompleted();
  }, [getTracker]);

  return { markStarted, markCompleted };
}
