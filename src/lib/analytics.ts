const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

export function trackPageView(path: string) {
  if (!GA_ID) return;
  gtag('event', 'page_view', {
    page_path: path,
    send_to: GA_ID,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID) return;
  gtag('event', name, params);
}

// Pre-built event helpers for key conversion actions
export const analytics = {
  bookCallClick: (source: string) =>
    trackEvent('book_call_click', { source }),

  calendlyOpen: (source: string) =>
    trackEvent('calendly_open', { source }),

  freeAuditClick: (source: string) =>
    trackEvent('free_audit_click', { source }),

  formSubmit: () =>
    trackEvent('form_submit', { form_name: 'contact' }),

  pricingView: (tier: string) =>
    trackEvent('pricing_tier_view', { tier }),
};
