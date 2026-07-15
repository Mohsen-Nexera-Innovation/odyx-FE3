/**
 * Auth facade: demo localStorage store vs Nest API, switched by isApiMode().
 * UI should import from here — not from auth-store or api/auth directly.
 */

import { ApiError } from '@/lib/api/client';
import {
  loginApi,
  logoutApi,
  meApi,
  registerApi,
  toSession,
} from '@/lib/api/auth';
import { clearTokens, hasTokens, setTokens } from '@/lib/auth-tokens';
import { isApiMode } from '@/lib/config';
import {
  DEMO_ACCOUNTS,
  clearSession,
  initAuthStore as initDemoAuthStore,
  login as demoLogin,
  loginAsGuest as demoLoginAsGuest,
  logout as demoLogout,
  notifyAuthChange,
  readSession as demoReadSession,
  register as demoRegister,
  writeSession,
  type AccountSession,
  type LoginResult,
  type RegisterInput,
  type RegisterResult,
} from '@/lib/auth-store';

export type { AccountSession, LoginResult, RegisterInput, RegisterResult };
export { DEMO_ACCOUNTS, notifyAuthChange, writeSession };

export function initAuthStore() {
  if (!isApiMode()) initDemoAuthStore();
}

export function readSession(): AccountSession | null {
  const session = demoReadSession();
  if (!session) return null;
  if (isApiMode() && session.role !== 'guest' && !hasTokens()) {
    return null;
  }
  return session;
}

function apiErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError && err.message) return err.message;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

async function applyApiAuth(response: {
  user: Parameters<typeof toSession>[0];
  accessToken: string;
  refreshToken: string;
}): Promise<AccountSession> {
  setTokens(response.accessToken, response.refreshToken);
  const session = toSession(response.user);
  writeSession(session);
  return session;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  if (!isApiMode()) {
    return demoLogin(email, password);
  }

  try {
    const data = await loginApi(email, password);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Sign in failed.') };
  }
}

export async function register(input: RegisterInput): Promise<RegisterResult> {
  if (!isApiMode()) {
    return demoRegister(input);
  }

  try {
    const data = await registerApi(input);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Registration failed.') };
  }
}

/** Guest stays client-only in both modes (API rejects guest register). */
export function loginAsGuest() {
  if (isApiMode()) clearTokens();
  demoLoginAsGuest();
}

export async function logout(): Promise<void> {
  if (!isApiMode()) {
    demoLogout();
    return;
  }

  try {
    await logoutApi();
  } catch {
    // Stateless JWT — still clear locally if network fails.
  }
  clearTokens();
  clearSession();
}

/** Best-effort session hydrate from /auth/me (API mode). */
export async function syncSessionFromApi(): Promise<AccountSession | null> {
  if (!isApiMode() || !hasTokens()) return readSession();
  try {
    const user = await meApi();
    const session = toSession(user);
    writeSession(session);
    return session;
  } catch {
    clearTokens();
    clearSession();
    return null;
  }
}
