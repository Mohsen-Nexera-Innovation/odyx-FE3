'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAuthShellPath } from '@/content/auth';
import { useAuthSession } from '@/hooks/useAuthSession';
import { logout, type AccountSession } from '@/lib/auth';
import { cn } from '@/lib/cn';
import { NAV_AUTH, NAV_AUTH_MOBILE, NAV_AUTH_TOOLS } from './headerChrome';

function isSignedIn(session: AccountSession | null): session is AccountSession {
  return Boolean(session && session.accountType !== 'GUEST' && session.role !== 'guest');
}

function loginHref(pathname: string | null) {
  if (!pathname || pathname === '/' || isAuthShellPath(pathname)) return '/login';
  return `/login?next=${encodeURIComponent(pathname)}`;
}

export default function NavAuth({
  placement,
  onNavigate,
}: {
  placement: 'tools' | 'mobile';
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready, refresh } = useAuthSession();
  const [busy, setBusy] = useState(false);
  const place = placement === 'tools' ? NAV_AUTH_TOOLS : NAV_AUTH_MOBILE;

  if (!ready) {
    return (
      <span className={cn(NAV_AUTH, place, 'invisible pointer-events-none')} aria-hidden>
        Login
      </span>
    );
  }

  if (isSignedIn(session)) {
    return (
      <button
        type="button"
        className={cn(NAV_AUTH, place)}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await logout();
            refresh();
            onNavigate?.();
            router.push('/');
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? '…' : 'Logout'}
      </button>
    );
  }

  return (
    <Link className={cn(NAV_AUTH, place)} href={loginHref(pathname)} onClick={onNavigate}>
      Login
    </Link>
  );
}
