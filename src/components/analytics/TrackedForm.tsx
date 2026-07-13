"use client";

import type { FormHTMLAttributes, ReactNode } from "react";
import {
  trackAnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "@/lib/analytics/track";

interface TrackedFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  eventName: AnalyticsEventName;
  properties?: AnalyticsEventProperties;
}

export default function TrackedForm({
  children,
  eventName,
  properties,
  ...formProps
}: TrackedFormProps) {
  return (
    <form {...formProps} onSubmit={() => trackAnalyticsEvent(eventName, properties)}>
      {children}
    </form>
  );
}
