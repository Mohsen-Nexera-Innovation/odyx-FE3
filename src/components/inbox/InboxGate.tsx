'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';

export default function InboxGate({ children }: { children: React.ReactNode }) {
  const { session, ready } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (ready && !session) router.replace('/login?next=/inbox');
  }, [ready, session, router]);

  if (!ready) {
    return (
      <div className="mail-loading">
        <span className="mail-loading-dot" aria-hidden />
        Loading inbox…
      </div>
    );
  }

  if (!session) return null;
  return <>{children}</>;
}
