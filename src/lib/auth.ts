/**
 * Auth facade: demo localStorage store vs Nest API, switched by isApiMode().
 * UI should import from here — not from auth-store or api/auth directly.
 */

import { ApiError } from '@/lib/api/client';
import {
  acceptInviteApi,
  changePasswordApi,
  forgotPasswordApi,
  loginApi,
  logoutApi,
  meApi,
  registerApi,
  resetPasswordApi,
  toSession,
  updateProfileApi,
} from '@/lib/api/auth';
import { clearTokens, hasTokens, setTokens } from '@/lib/auth-tokens';
import { isApiMode } from '@/lib/config';
import {
  DEMO_ACCOUNTS,
  changePassword as demoChangePassword,
  clearSession,
  forgotPassword as demoForgotPassword,
  initAuthStore as initDemoAuthStore,
  login as demoLogin,
  loginAsGuest as demoLoginAsGuest,
  logout as demoLogout,
  notifyAuthChange,
  readSession as demoReadSession,
  register as demoRegister,
  resetPassword as demoResetPassword,
  updateProfile as demoUpdateProfile,
  writeSession,
  type AccountSession,
  type LoginResult,
  type OkResult,
  type RegisterInput,
  type RegisterResult,
  type UpdateProfileInput,
  type UpdateProfileResult,
} from '@/lib/auth-store';

export type {
  AccountSession,
  LoginResult,
  OkResult,
  RegisterInput,
  RegisterResult,
  UpdateProfileInput,
  UpdateProfileResult,
};
export { DEMO_ACCOUNTS, notifyAuthChange, writeSession };
export { hasPermission, isStaff, isClient, isGuest } from '@/lib/permissions';

export function initAuthStore() {
  if (!isApiMode()) initDemoAuthStore();
}

export function readSession(): AccountSession | null {
  const session = demoReadSession();
  if (!session) return null;
  if (
    isApiMode() &&
    session.accountType !== 'GUEST' &&
    session.role !== 'guest' &&
    !hasTokens()
  ) {
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

export async function acceptInvite(input: {
  token: string;
  name: string;
  password: string;
}): Promise<LoginResult> {
  if (!isApiMode()) {
    return { ok: false, error: 'Staff invites require API mode.' };
  }
  try {
    const data = await acceptInviteApi(input);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Invite accept failed.') };
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

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<UpdateProfileResult> {
  if (!isApiMode()) {
    return demoUpdateProfile(input);
  }

  try {
    const user = await updateProfileApi(input);
    const session = toSession(user);
    writeSession(session);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Could not update profile.') };
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<OkResult> {
  if (!isApiMode()) {
    return demoChangePassword(currentPassword, newPassword);
  }

  try {
    await changePasswordApi(currentPassword, newPassword);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: apiErrorMessage(err, 'Could not change password.'),
    };
  }
}

export async function forgotPassword(email: string): Promise<OkResult> {
  if (!isApiMode()) {
    return demoForgotPassword(email);
  }

  try {
    await forgotPasswordApi(email.trim().toLowerCase());
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: apiErrorMessage(err, 'Could not send reset email.'),
    };
  }
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<OkResult> {
  if (!isApiMode()) {
    return demoResetPassword(token, newPassword);
  }

  try {
    await resetPasswordApi(token, newPassword);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: apiErrorMessage(err, 'Could not reset password.'),
    };
  }
}
