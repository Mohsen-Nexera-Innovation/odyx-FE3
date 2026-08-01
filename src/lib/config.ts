/**
 * Read NEXT_PUBLIC_* into module constants so Turbopack/Next always inlines them
 * (runtime process.env polyfill can be empty in some client chunks).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function getApiBaseUrl(): string {
  return (API_URL ?? '').trim().replace(/\/$/, '');
}

export function getGoogleClientId(): string {
  return (GOOGLE_CLIENT_ID ?? '')
    .trim()
    .replace(/^["']|["']$/g, '');
}

/** Google button when a Web client ID is configured. */
export function isGoogleSignInEnabled(): boolean {
  return Boolean(getApiBaseUrl()) && Boolean(getGoogleClientId());
}
