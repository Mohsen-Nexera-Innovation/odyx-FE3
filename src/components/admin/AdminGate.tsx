'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { isStaff } from '@/lib/permissions';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace('/login?next=/admin');
      return;
    }
    if (!isStaff(session)) {
      router.replace('/inbox');
    }
  }, [ready, session, router]);

  if (!ready) {
    return (
      <div className="admin-gate">
        <p className="admin-muted">Loading…</p>
      </div>
    );
  }

  if (!session || !isStaff(session)) {
    return (
      <div className="admin-gate">
        <p className="admin-muted">Staff access required.</p>
        <Link href="/login" className="btn btn-sm" style={{ marginTop: '1rem' }}>
          Sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
