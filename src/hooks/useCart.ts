'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  cartCountAsync,
  getResolvedCartAsync,
} from '@/lib/commerce';
import type { CartLineResolved } from '@/lib/cart-store';

export function useCart() {
  const [lines, setLines] = useState<CartLineResolved[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [nextLines, nextCount] = await Promise.all([
        getResolvedCartAsync(),
        cartCountAsync(),
      ]);
      setLines(nextLines);
      setCount(nextCount);
    } catch {
      setLines([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => {
      void refresh();
    };
    window.addEventListener('odyx-cart-change', onChange);
    window.addEventListener('storage', onChange);
    window.addEventListener('odyx-auth-change', onChange);
    return () => {
      window.removeEventListener('odyx-cart-change', onChange);
      window.removeEventListener('storage', onChange);
      window.removeEventListener('odyx-auth-change', onChange);
    };
  }, [refresh]);

  return { lines, count, loading, refresh };
}
