/**
 * Read NEXT_PUBLIC_* into module constants so Turbopack/Next always inlines them
 * (runtime process.env polyfill can be empty in some client chunks).
 */
const USE_API = process.env.NEXT_PUBLIC_USE_API;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/** True when FE should call Nest instead of localStorage demo stores. */
export function isApiMode(): boolean {
  return USE_API === 'true' && Boolean(API_URL?.trim());
}

export function getApiBaseUrl(): string {
  return (API_URL ?? '').trim().replace(/\/$/, '');
}

export function getGoogleClientId(): string {
  return (GOOGLE_CLIENT_ID ?? '')
    .trim()
    .replace(/^["']|["']$/g, '');
}

/** Google button only in API mode when a Web client ID is configured. */
export function isGoogleSignInEnabled(): boolean {
  return isApiMode() && Boolean(getGoogleClientId());
}
