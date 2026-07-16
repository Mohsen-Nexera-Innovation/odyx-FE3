import type { AccountSession } from '@/lib/auth-store';

export function hasPermission(
  session: AccountSession | null | undefined,
  code: string,
): boolean {
  if (!session) return false;
  if (session.accountType !== 'STAFF' && session.role !== 'admin') return false;
  if (
    session.staffRank === 'OWNER' ||
    session.staffRank === 'SUPER_ADMIN' ||
    session.permissions?.includes('*')
  ) {
    return true;
  }
  return Boolean(session.permissions?.includes(code));
}

export function isStaff(session: AccountSession | null | undefined): boolean {
  return session?.accountType === 'STAFF' || session?.role === 'admin';
}

export function isClient(session: AccountSession | null | undefined): boolean {
  return session?.accountType === 'CLIENT';
}

export function isGuest(session: AccountSession | null | undefined): boolean {
  return session?.accountType === 'GUEST' || session?.role === 'guest';
}
