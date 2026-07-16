/**
 * Demo-mode auth (localStorage user DB).
 * UI must use `@/lib/auth` facade — do not import login/register/logout from here.
 */

import {
  AUTH_STORAGE_KEY,
  clientTypeToRegisterRole,
  type AccountType,
  type ClientType,
  type RegisterRole,
  type StaffRank,
  type UserRole,
} from '@/content/auth';

export const USERS_DB_KEY = 'odyx_users_db';

export type StoredUser = {
  email: string;
  password: string;
  name: string;
  accountType: AccountType;
  staffRank?: StaffRank | null;
  clientType?: ClientType | null;
  permissions: string[];
  org?: string;
  country?: string;
  createdAt: string;
};

export type AccountSession = {
  email: string;
  name: string;
  accountType: AccountType | 'GUEST';
  staffRank?: StaffRank | null;
  clientType?: ClientType | null;
  permissions: string[];
  roleId?: string | null;
  roleName?: string | null;
  org?: string;
  country?: string;
  /** UI compatibility: dentist | lab | guest | admin */
  role: UserRole;
};

export const DEMO_ACCOUNTS: readonly { email: string; password: string; hint: string }[] = [
  { email: 'dentist@demo.com', password: 'demo12345', hint: 'Dentist client — inbox' },
  { email: 'lab@demo.com', password: 'demo12345', hint: 'Lab client — production threads' },
  { email: 'admin@odyx.com', password: 'demo12345', hint: 'Owner — full admin access' },
];

const SEED_USERS: StoredUser[] = [
  {
    email: 'dentist@demo.com',
    password: 'demo12345',
    name: 'Dr. Sarah Chen',
    accountType: 'CLIENT',
    clientType: 'DENTIST',
    permissions: [],
    org: 'Smile Clinic Cairo',
    country: 'Egypt',
    createdAt: new Date('2025-01-15').toISOString(),
  },
  {
    email: 'lab@demo.com',
    password: 'demo12345',
    name: 'Ahmed Hassan',
    accountType: 'CLIENT',
    clientType: 'LAB',
    permissions: [],
    org: 'Nile Dental Lab',
    country: 'Egypt',
    createdAt: new Date('2025-02-01').toISOString(),
  },
  {
    email: 'admin@odyx.com',
    password: 'demo12345',
    name: 'ODYX Owner',
    accountType: 'STAFF',
    staffRank: 'OWNER',
    permissions: ['*'],
    org: 'ODYX',
    country: 'Egypt',
    createdAt: new Date('2025-01-01').toISOString(),
  },
];

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

function readUsersDb(): StoredUser[] {
  if (typeof window === 'undefined') return [...SEED_USERS];
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsersDb(users: StoredUser[]) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

/** Ensure built-in demo accounts exist in the users database. */
export function initAuthStore() {
  if (typeof window === 'undefined') return;
  const existing = readUsersDb();
  const emails = new Set(existing.map((u) => u.email.toLowerCase()));
  const merged = [...existing];
  for (const seed of SEED_USERS) {
    if (!emails.has(seed.email.toLowerCase())) merged.push(seed);
  }
  writeUsersDb(merged);
}

function findUser(email: string): StoredUser | undefined {
  initAuthStore();
  const key = email.trim().toLowerCase();
  return readUsersDb().find((u) => u.email.toLowerCase() === key);
}

function toSession(user: StoredUser): AccountSession {
  return {
    email: user.email,
    name: user.name,
    accountType: user.accountType,
    staffRank: user.staffRank,
    clientType: user.clientType,
    permissions: user.permissions,
    org: user.org,
    country: user.country,
    role: deriveRole(user),
  };
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
        org: data.org,
        country: data.country,
        role: deriveRole({
          accountType: data.accountType,
          staffRank: data.staffRank,
          clientType: data.clientType,
        }),
      };
    }

    // Legacy sessions with only role
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

export type LoginResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string };

export function login(email: string, password: string): LoginResult {
  initAuthStore();
  const user = findUser(email);
  if (!user) {
    return {
      ok: false,
      error: 'No account found for this email. Register or use a demo account.',
    };
  }
  if (user.password !== password) {
    return { ok: false, error: 'Incorrect password.' };
  }
  const session = toSession(user);
  writeSession(session);
  return { ok: true, session };
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: RegisterRole;
  org?: string;
  country?: string;
};

export type RegisterResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string };

export function register(input: RegisterInput): RegisterResult {
  if (input.role === 'guest') {
    return {
      ok: false,
      error: 'Choose Dentist or Lab to access the design inbox.',
    };
  }
  initAuthStore();
  const email = input.email.trim().toLowerCase();
  if (findUser(email)) {
    return {
      ok: false,
      error: 'An account with this email already exists. Sign in instead.',
    };
  }
  if (input.password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' };
  }

  const clientType: ClientType = input.role === 'lab' ? 'LAB' : 'DENTIST';
  const user: StoredUser = {
    email: input.email.trim(),
    password: input.password,
    name: input.name.trim(),
    accountType: 'CLIENT',
    clientType,
    permissions: [],
    org: input.org?.trim(),
    country: input.country?.trim(),
    createdAt: new Date().toISOString(),
  };

  const users = readUsersDb();
  users.push(user);
  writeUsersDb(users);

  const session = toSession(user);
  writeSession(session);
  return { ok: true, session };
}

export function loginAsGuest() {
  writeSession({
    email: '',
    name: 'Guest',
    accountType: 'GUEST',
    permissions: [],
    role: 'guest',
  });
}

export function logout() {
  clearSession();
}
