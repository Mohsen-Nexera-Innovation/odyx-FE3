'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';

export default function InboxGate({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace('/login?next=/inbox');
      return;
    }
    if (session.accountType === 'STAFF') {
      router.replace('/admin/chat');
    }
  }, [ready, session, router]);

  if (!ready) {
    return (
      <div className="mail-loading">
        <span className="mail-loading-dot" aria-hidden />
        Loading inbox…
      </div>
    );
  }

  if (!session || session.accountType === 'STAFF') return null;
  return <>{children}</>;
}
