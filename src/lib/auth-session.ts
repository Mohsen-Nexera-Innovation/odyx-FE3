/**
 * Client-side session cache (JWT user profile mirrored from Nest /auth/me).
 */

import {
  AUTH_STORAGE_KEY,
  clientTypeToRegisterRole,
  type AccountType,
  type ClientType,
  type StaffRank,
  type UserRole,
} from '@/content/auth';

export type AccountSession = {
  email: string;
  name: string;
  accountType: AccountType | 'GUEST';
  staffRank?: StaffRank | null;
  clientType?: ClientType | null;
  permissions: string[];
  roleId?: string | null;
  roleName?: string | null;
  phone?: string;
  org?: string;
  country?: string;
  /** UI compatibility: dentist | lab | guest | admin */
  role: UserRole;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: import('@/content/auth').RegisterRole;
  org?: string;
  country?: string;
};

export type UpdateProfileInput = {
  name: string;
  phone?: string;
  org?: string;
  country?: string;
};

export type LoginResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string };

export type RegisterResult =
  | { ok: true; email: string; verificationRequired: true }
  | { ok: false; error: string };

export type UpdateProfileResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string };

export type OkResult = { ok: true } | { ok: false; error: string };

export function notifyAuthChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('odyx-auth-change'));
}

function deriveRole(session: {
  accountType: AccountType | 'GUEST';
  staffRank?: StaffRank | null;
  clientType?: ClientType | null;
}): UserRole {
  if (session.accountType === 'GUEST') return 'guest';
  if (session.accountType === 'STAFF') return 'admin';
  return clientTypeToRegisterRole(session.clientType);
}

export function readSession(): AccountSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<AccountSession> & {
      role?: UserRole;
    };

    if (data.accountType === 'GUEST' || data.role === 'guest') {
      return {
        email: '',
        name: data.name || 'Guest',
        accountType: 'GUEST',
        permissions: [],
        role: 'guest',
      };
    }

    if (data.accountType === 'STAFF' || data.accountType === 'CLIENT') {
      return {
        email: data.email || '',
        name: data.name || '',
        accountType: data.accountType,
        staffRank: data.staffRank,
        clientType: data.clientType,
        permissions: data.permissions ?? [],
        roleId: data.roleId,
        roleName: data.roleName,
        phone: data.phone,
        org: data.org,
        country: data.country,
        role: deriveRole({
          accountType: data.accountType,
          staffRank: data.staffRank,
          clientType: data.clientType,
        }),
      };
    }

    if (data.role === 'admin') {
      return {
        email: data.email || '',
        name: data.name || '',
        accountType: 'STAFF',
        staffRank: 'OWNER',
        permissions: ['*'],
        org: data.org,
        country: data.country,
        role: 'admin',
      };
    }
    if (data.role === 'dentist' || data.role === 'lab') {
      return {
        email: data.email || '',
        name: data.name || '',
        accountType: 'CLIENT',
        clientType: data.role === 'lab' ? 'LAB' : 'DENTIST',
        permissions: [],
        org: data.org,
        country: data.country,
        role: data.role,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function writeSession(session: AccountSession) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ ...session, loggedInAt: new Date().toISOString() }),
  );
  notifyAuthChange();
}

export function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthChange();
}
