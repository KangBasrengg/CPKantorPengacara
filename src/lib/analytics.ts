/**
 * Analytics helper supporting GA4 / Plausible via environment variables.
 * Disabled by default if env variables are empty.
 */

type AnalyticsEvent = "click_whatsapp" | "click_phone" | "submit_contact_form";

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, unknown>
) {
  // If no analytics configured, no-op
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (gaId && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, properties);
  }

  if (
    plausibleDomain &&
    typeof (window as unknown as { plausible?: (name: string, opts?: { props?: Record<string, unknown> }) => void }).plausible === "function"
  ) {
    (window as unknown as { plausible: (name: string, opts?: { props?: Record<string, unknown> }) => void }).plausible(
      eventName,
      { props: properties }
    );
  }
}
