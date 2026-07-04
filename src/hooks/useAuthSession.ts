'use client';

import { useCallback, useEffect, useState } from 'react';
import { AUTH_STORAGE_KEY } from '@/content/auth';
import { readSession, type AccountSession } from '@/lib/auth-store';

export function useAuthSession() {
  const [session, setSession] = useState<AccountSession | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY || e.key === null) refresh();
    };
    const onAuthChange = () => refresh();
    window.addEventListener('storage', onStorage);
    window.addEventListener('odyx-auth-change', onAuthChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('odyx-auth-change', onAuthChange);
    };
  }, [refresh]);

  return { session, ready, refresh };
}
