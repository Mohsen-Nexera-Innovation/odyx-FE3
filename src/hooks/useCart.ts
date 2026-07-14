'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  cartCount,
  getResolvedCart,
  type CartLineResolved,
} from '@/lib/cart-store';

export function useCart() {
  const [lines, setLines] = useState<CartLineResolved[]>([]);
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    setLines(getResolvedCart());
    setCount(cartCount());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener('odyx-cart-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('odyx-cart-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  return { lines, count, refresh };
}
