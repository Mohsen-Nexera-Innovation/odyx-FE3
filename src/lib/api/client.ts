import { getApiBaseUrl } from '@/lib/config';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '@/lib/auth-tokens';
import { clearSession } from '@/lib/auth-session';

export class ApiError extends Error {
  status: number;
  missing?: string[];

  constructor(message: string, status: number, missing?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.missing = missing;
  }
}

type ApiFetchOptions = RequestInit & {
  /** Attach Bearer access token */
  auth?: boolean;
  /** Skip one-shot refresh-on-401 (used by refresh itself) */
  skipRefresh?: boolean;
};

function nestMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback;
  const msg = (body as { message?: unknown }).message;
  if (typeof msg === 'string' && msg.trim()) return msg;
  if (Array.isArray(msg) && msg.length > 0) {
    return msg.map(String).join(' ');
  }
  return fallback;
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function tryRefreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const base = getApiBaseUrl();
  if (!base) return false;

  const res = await fetch(`${base}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await parseJson(res);
  if (!res.ok) {
    clearTokens();
    clearSession();
    return false;
  }

  const payload = data as {
    accessToken?: string;
    refreshToken?: string;
  };
  if (!payload.accessToken || !payload.refreshToken) {
    clearTokens();
    clearSession();
    return false;
  }

  setTokens(payload.accessToken, payload.refreshToken);
  return true;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new ApiError('API URL is not configured.', 0);
  }

  const { auth, skipRefresh, headers: initHeaders, ...rest } = options;
  const headers = new Headers(initHeaders);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  const isFormData = typeof FormData !== 'undefined' && rest.body instanceof FormData;
  if (rest.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (auth) {
    const token = getAccessToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;
  let res = await fetch(url, { ...rest, headers });

  if (res.status === 401 && auth && !skipRefresh) {
    const refreshed = await tryRefreshAccessToken();
    if (refreshed) {
      const retryHeaders = new Headers(initHeaders);
      if (!retryHeaders.has('Accept')) retryHeaders.set('Accept', 'application/json');
      if (rest.body && !isFormData && !retryHeaders.has('Content-Type')) {
        retryHeaders.set('Content-Type', 'application/json');
      }
      const next = getAccessToken();
      if (next) retryHeaders.set('Authorization', `Bearer ${next}`);
      res = await fetch(url, { ...rest, headers: retryHeaders });
    }
  }

  const data = await parseJson(res);
  if (!res.ok) {
    const missingRaw =
      data && typeof data === 'object' ? (data as { missing?: unknown }).missing : undefined;
    const missing = Array.isArray(missingRaw) ? missingRaw.map(String) : undefined;
    throw new ApiError(nestMessage(data, res.statusText || 'Request failed'), res.status, missing);
  }

  return data as T;
}
