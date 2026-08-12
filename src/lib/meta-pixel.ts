/**
 * Meta Pixel helpers. ID is inlined at module scope so Turbopack always
 * embeds it in client chunks (same pattern as `src/lib/config.ts`).
 */
const PIXEL_ID = (
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '2177177202826511'
).trim();

export function getMetaPixelId(): string {
  return PIXEL_ID;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

export function trackMetaLead(): void {
  trackMeta('Lead');
}

export function trackMetaPurchaseOnce(
  orderId: string,
  value: number,
  currency = 'EGP',
): void {
  if (typeof window === 'undefined') return;
  const key = `odyx-meta-purchase:${orderId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch {
    /* private mode — still send once this load */
  }
  trackMeta('Purchase', { value, currency });
}
