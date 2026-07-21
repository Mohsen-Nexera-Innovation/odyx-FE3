import {
  clientTypeToRegisterRole,
  registerRoleToClientType,
  type AccountType,
  type ClientType,
  type StaffRank,
} from '@/content/auth';
import { apiFetch } from '@/lib/api/client';
import type { AccountSession, RegisterInput } from '@/lib/auth-store';

export type ApiPublicUser = {
  id?: string;
  email: string;
  name: string;
  accountType: AccountType;
  staffRank?: StaffRank | null;
  clientType?: ClientType | null;
  status: string;
  roleId?: string | null;
  roleName?: string | null;
  permissions: string[];
  org?: string;
  country?: string;
  phone?: string;
};

export type UpdateProfileInput = {
  name: string;
  phone?: string;
  org?: string;
  country?: string;
};

export type AuthTokensResponse = {
  user: ApiPublicUser;
  accessToken: string;
  refreshToken: string;
};

export function toSession(user: ApiPublicUser): AccountSession {
  const accountType = user.accountType;
  const role =
    accountType === 'STAFF'
      ? ('admin' as const)
      : clientTypeToRegisterRole(user.clientType);

  return {
    email: user.email,
    name: user.name,
    accountType,
    staffRank: user.staffRank,
    clientType: user.clientType,
    permissions: user.permissions ?? [],
    roleId: user.roleId,
    roleName: user.roleName,
    phone: user.phone,
    org: user.org,
    country: user.country,
    role,
  };
}

export function loginApi(email: string, password: string) {
  return apiFetch<AuthTokensResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export type GoogleAuthInput = {
  idToken: string;
  clientType?: ClientType;
  org?: string;
  country?: string;
  phone?: string;
  password?: string;
};

export function loginWithGoogleApi(input: GoogleAuthInput) {
  return apiFetch<AuthTokensResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      idToken: input.idToken,
      clientType: input.clientType,
      org: input.org || undefined,
      country: input.country || undefined,
      phone: input.phone || undefined,
      password: input.password || undefined,
    }),
  });
}

export function registerApi(input: RegisterInput) {
  const clientType = registerRoleToClientType(input.role);
  if (!clientType) {
    return Promise.reject(new Error('Choose Dentist or Lab to register.'));
  }
  return apiFetch<AuthTokensResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      password: input.password,
      clientType,
      org: input.org || undefined,
      country: input.country || undefined,
    }),
  });
}

export function acceptInviteApi(input: {
  token: string;
  name: string;
  password: string;
}) {
  return apiFetch<AuthTokensResponse>('/auth/accept-invite', {
    method: 'POST',
    body: JSON.stringify(input),
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

export function updateProfileApi(input: UpdateProfileInput) {
  return apiFetch<ApiPublicUser>('/auth/me', {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({
      name: input.name,
      phone: input.phone || undefined,
      org: input.org || undefined,
      country: input.country || undefined,
    }),
  });
}

export function changePasswordApi(currentPassword: string, newPassword: string) {
  return apiFetch<{ ok: boolean }>('/auth/change-password', {
    method: 'POST',
    auth: true,
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export function forgotPasswordApi(email: string) {
  return apiFetch<{ ok: boolean }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPasswordApi(token: string, newPassword: string) {
  return apiFetch<{ ok: boolean }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

export function logoutApi() {
  return apiFetch<{ ok: boolean }>('/auth/logout', {
    method: 'POST',
    auth: true,
    skipRefresh: true,
  });
}
