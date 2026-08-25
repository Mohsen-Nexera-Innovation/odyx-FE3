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

function resolveUrl(path: string, base: string) {
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}

function buildHeaders(options: ApiFetchOptions, jsonAccept: boolean): Headers {
  const { auth, headers: initHeaders, ...rest } = options;
  const headers = new Headers(initHeaders);
  if (jsonAccept && !headers.has('Accept')) headers.set('Accept', 'application/json');
  const isFormData = typeof FormData !== 'undefined' && rest.body instanceof FormData;
  if (rest.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (auth) {
    const token = getAccessToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

async function requestWithAuth(
  path: string,
  options: ApiFetchOptions = {},
  jsonAccept = true,
): Promise<Response> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new ApiError('API URL is not configured.', 0);
  }

  const { skipRefresh, auth, headers: _headers, ...rest } = options;
  const url = resolveUrl(path, base);
  let res = await fetch(url, { ...rest, headers: buildHeaders(options, jsonAccept) });

  if (res.status === 401 && auth && !skipRefresh) {
    const refreshed = await tryRefreshAccessToken();
    if (refreshed) {
      res = await fetch(url, { ...rest, headers: buildHeaders(options, jsonAccept) });
    }
  }

  return res;
}

function throwIfNotOk(res: Response, data: unknown): void {
  if (res.ok) return;
  const missingRaw =
    data && typeof data === 'object' ? (data as { missing?: unknown }).missing : undefined;
  const missing = Array.isArray(missingRaw) ? missingRaw.map(String) : undefined;
  throw new ApiError(nestMessage(data, res.statusText || 'Request failed'), res.status, missing);
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const res = await requestWithAuth(path, options, true);
  const data = await parseJson(res);
  throwIfNotOk(res, data);
  return data as T;
}

function filenameFromDisposition(header: string | null, fallback: string): string {
  if (!header) return fallback;
  const star = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1]);
    } catch {
      return star[1];
    }
  }
  const quoted = /filename="([^"]+)"/i.exec(header);
  if (quoted?.[1]) {
    try {
      return decodeURIComponent(quoted[1]);
    } catch {
      return quoted[1];
    }
  }
  const plain = /filename=([^;]+)/i.exec(header);
  return plain?.[1]?.trim() || fallback;
}

export async function apiFetchBlob(
  path: string,
  options: ApiFetchOptions = {},
): Promise<{ blob: Blob; filename: string }> {
  const res = await requestWithAuth(path, options, false);
  if (!res.ok) {
    const data = await parseJson(res);
    throwIfNotOk(res, data);
  }
  const blob = await res.blob();
  const filename = filenameFromDisposition(
    res.headers.get('Content-Disposition'),
    'download',
  );
  return { blob, filename };
}
