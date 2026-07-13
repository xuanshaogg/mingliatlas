"use client";

import { useEffect, useRef } from "react";
import {
  trackAnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "@/lib/analytics/track";

interface AnalyticsEventProps {
  eventName: AnalyticsEventName;
  properties?: AnalyticsEventProperties;
}

export default function AnalyticsEvent({ eventName, properties }: AnalyticsEventProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackAnalyticsEvent(eventName, properties);
  }, [eventName, properties]);

  return null;
}
