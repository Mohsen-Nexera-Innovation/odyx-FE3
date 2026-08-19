/**
 * Read NEXT_PUBLIC_* into module constants so Turbopack/Next always inlines them
 * (runtime process.env polyfill can be empty in some client chunks).
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function getApiBaseUrl(): string {
  return (API_URL ?? '').trim().replace(/\/$/, '');
}

/**
 * Server Components must not call the public API hostname from inside Docker
 * (hairpin NAT to the VPS public IP often fails). Prefer INTERNAL_API_URL
 * (e.g. http://api:4000 on the compose network). Never use this for browser
 * or media URLs — those need NEXT_PUBLIC_API_URL.
 */
export function getServerApiBaseUrl(): string {
  const internal = (process.env.INTERNAL_API_URL ?? '').trim().replace(/\/$/, '');
  return internal || getApiBaseUrl();
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
