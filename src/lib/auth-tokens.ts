/** JWT tokens for API mode only. Demo mode never writes these. */

const ACCESS_KEY = 'odyx_access_token';
const REFRESH_KEY = 'odyx_refresh_token';

function notifyTokenChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('odyx-auth-change'));
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  // Don't notify here — login/register calls writeSession which already notifies.
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  notifyTokenChange();
}

export function hasTokens(): boolean {
  return Boolean(getAccessToken() && getRefreshToken());
}
