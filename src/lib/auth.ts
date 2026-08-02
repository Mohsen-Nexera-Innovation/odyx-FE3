/**
 * Auth facade — Nest API with client session cache.
 * UI should import from here — not from auth-session or api/auth directly.
 */

import { ApiError } from '@/lib/api/client';
import {
  acceptInviteApi,
  changePasswordApi,
  forgotPasswordApi,
  loginApi,
  loginWithGoogleApi,
  logoutApi,
  meApi,
  registerApi,
  resendVerificationApi,
  resetPasswordApi,
  toSession,
  updateProfileApi,
  verifyEmailApi,
  type GoogleAuthInput,
} from '@/lib/api/auth';
import { clearTokens, hasTokens, setTokens } from '@/lib/auth-tokens';
import { getApiBaseUrl } from '@/lib/config';
import {
  clearSession,
  notifyAuthChange,
  readSession as readCachedSession,
  writeSession,
  type AccountSession,
  type LoginResult,
  type OkResult,
  type RegisterInput,
  type RegisterResult,
  type UpdateProfileInput,
  type UpdateProfileResult,
} from '@/lib/auth-session';

export type SocialProvider = 'google' | 'linkedin';

export type {
  AccountSession,
  LoginResult,
  OkResult,
  RegisterInput,
  RegisterResult,
  UpdateProfileInput,
  UpdateProfileResult,
};
export { notifyAuthChange, writeSession };
export { hasPermission, isStaff, isClient, isGuest } from '@/lib/permissions';

export type GoogleAuthResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string; needsRegistration?: boolean };

export function readSession(): AccountSession | null {
  const session = readCachedSession();
  if (!session) return null;
  if (
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
  try {
    const data = await loginApi(email, password);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Sign in failed.') };
  }
}

export async function loginWithGoogle(
  input: GoogleAuthInput,
): Promise<GoogleAuthResult> {
  try {
    const data = await loginWithGoogleApi(input);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    const message = apiErrorMessage(err, 'Google sign-in failed.');
    const needsRegistration =
      err instanceof ApiError &&
      err.status === 400 &&
      /complete registration/i.test(message);
    return { ok: false, error: message, needsRegistration };
  }
}

/** LinkedIn OAuth redirect via Nest (`GET /auth/linkedin`). */
export function startLinkedInSignIn(): 'redirect' {
  window.location.assign(`${getApiBaseUrl()}/auth/linkedin`);
  return 'redirect';
}

export async function register(input: RegisterInput): Promise<RegisterResult> {
  try {
    const data = await registerApi(input);
    return {
      ok: true,
      email: data.email,
      verificationRequired: true,
    };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Registration failed.') };
  }
}

export async function verifyEmail(token: string): Promise<LoginResult> {
  try {
    const data = await verifyEmailApi(token);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return {
      ok: false,
      error: apiErrorMessage(err, 'Could not verify email.'),
    };
  }
}

export async function resendVerification(email: string): Promise<OkResult> {
  try {
    await resendVerificationApi(email.trim().toLowerCase());
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: apiErrorMessage(err, 'Could not resend verification email.'),
    };
  }
}

export async function acceptInvite(input: {
  token: string;
  name: string;
  password: string;
}): Promise<LoginResult> {
  try {
    const data = await acceptInviteApi(input);
    const session = await applyApiAuth(data);
    return { ok: true, session };
  } catch (err) {
    return { ok: false, error: apiErrorMessage(err, 'Invite accept failed.') };
  }
}

export async function logout(): Promise<void> {
  try {
    await logoutApi();
  } catch {
    // Stateless JWT — still clear locally if network fails.
  }
  clearTokens();
  clearSession();
}

/** Best-effort session hydrate from /auth/me. */
export async function syncSessionFromApi(): Promise<AccountSession | null> {
  if (!hasTokens()) return readSession();
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
