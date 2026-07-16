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

export function logoutApi() {
  return apiFetch<{ ok: boolean }>('/auth/logout', {
    method: 'POST',
    auth: true,
    skipRefresh: true,
  });
}
