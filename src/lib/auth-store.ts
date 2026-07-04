/**
 * Client-side auth with dummy user database (localStorage).
 * Replace with real API in production.
 */

import type { UserRole } from '@/content/auth';
import { AUTH_STORAGE_KEY } from '@/content/auth';

export const USERS_DB_KEY = 'odyx_users_db';

export type StoredUser = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  org?: string;
  country?: string;
  createdAt: string;
};

export type AccountSession = {
  email: string;
  name: string;
  role: UserRole;
  org?: string;
  country?: string;
};

export const DEMO_ACCOUNTS: readonly { email: string; password: string; hint: string }[] = [
  { email: 'dentist@demo.com', password: 'demo12345', hint: 'Dentist — full inbox with design ready' },
  { email: 'lab@demo.com', password: 'demo12345', hint: 'Lab — batch production threads' },
];

const SEED_USERS: StoredUser[] = [
  {
    email: 'dentist@demo.com',
    password: 'demo12345',
    name: 'Dr. Sarah Chen',
    role: 'dentist',
    org: 'Smile Clinic Cairo',
    country: 'Egypt',
    createdAt: new Date('2025-01-15').toISOString(),
  },
  {
    email: 'lab@demo.com',
    password: 'demo12345',
    name: 'Ahmed Hassan',
    role: 'lab',
    org: 'Nile Dental Lab',
    country: 'Egypt',
    createdAt: new Date('2025-02-01').toISOString(),
  },
];

export function notifyAuthChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('odyx-auth-change'));
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
    role: user.role,
    org: user.org,
    country: user.country,
  };
}

export function readSession(): AccountSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as AccountSession & { role?: UserRole };
    if (!data.role || data.role === 'guest') {
      if (data.role === 'guest') {
        return { email: '', name: data.name || 'Guest', role: 'guest' };
      }
      return null;
    }
    return {
      email: data.email,
      name: data.name,
      role: data.role,
      org: data.org,
      country: data.country,
    };
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
    return { ok: false, error: 'No account found for this email. Register or use a demo account.' };
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
  role: UserRole;
  org?: string;
  country?: string;
};

export type RegisterResult =
  | { ok: true; session: AccountSession }
  | { ok: false; error: string };

export function register(input: RegisterInput): RegisterResult {
  if (input.role === 'guest') {
    return { ok: false, error: 'Choose Dentist or Lab to access the design inbox.' };
  }
  initAuthStore();
  const email = input.email.trim().toLowerCase();
  if (findUser(email)) {
    return { ok: false, error: 'An account with this email already exists. Sign in instead.' };
  }
  if (input.password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' };
  }

  const user: StoredUser = {
    email: input.email.trim(),
    password: input.password,
    name: input.name.trim(),
    role: input.role,
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
  writeSession({ email: '', name: 'Guest', role: 'guest' });
}

export function logout() {
  clearSession();
}
