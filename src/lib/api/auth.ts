import type { UserRole } from '@/content/auth';
import { apiFetch } from '@/lib/api/client';
import type { AccountSession, RegisterInput } from '@/lib/auth-store';

export type ApiPublicUser = {
  email: string;
  name: string;
  role: UserRole;
  org?: string;
  country?: string;
};

export type AuthTokensResponse = {
  user: ApiPublicUser;
  accessToken: string;
  refreshToken: string;
};

export function toSession(user: ApiPublicUser): AccountSession {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    org: user.org,
    country: user.country,
  };
}

export function loginApi(email: string, password: string) {
  return apiFetch<AuthTokensResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerApi(input: RegisterInput) {
  return apiFetch<AuthTokensResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
      org: input.org || undefined,
      country: input.country || undefined,
    }),
  });
}

export function refreshApi(refreshToken: string) {
  return apiFetch<AuthTokensResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    skipRefresh: true,
  });
}

export function meApi() {
  return apiFetch<ApiPublicUser>('/auth/me', { auth: true });
}

export function logoutApi() {
  return apiFetch<{ ok: boolean }>('/auth/logout', {
    method: 'POST',
    auth: true,
    skipRefresh: true,
  });
}
