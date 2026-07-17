'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatMoney, getProductById, type ShopProduct } from '@/content/shop';
import { readSession } from '@/lib/auth';
import {
  addItemAsync,
  fetchShopProducts,
  resolveCartProductId,
} from '@/lib/commerce';
import { isApiMode } from '@/lib/config';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ProductBuyActions({
  shopProductId,
  accent = 'sky',
}: {
  shopProductId: string;
  accent?: 'sky' | 'teal' | 'orange';
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<ShopProduct | null>(
    () => getProductById(shopProductId) ?? null,
  );

  useEffect(() => {
    if (!isApiMode()) return;
    void fetchShopProducts().then((list) => {
      const slugMap: Record<string, string> = {
        'printer-p1-26': 'odyx-p1-26',
        'curing-odyx-cure': 'odyx-cure',
        'scanner-s1': 'odyx-s1',
        'resin-odyx': 'odyx-resin',
      };
      const slug = slugMap[shopProductId] ?? shopProductId;
      setProduct(list.find((p) => p.slug === slug || p.id === shopProductId) ?? null);
    });
  }, [shopProductId]);

  if (!product) return null;

  const primaryClass = accent === 'orange' ? 'btn btn-sign btn-sm' : 'btn btn-sm';

  async function ensureAdd() {
    if (isApiMode() && !readSession()) {
      router.push('/login');
      return false;
    }
    const id = (await resolveCartProductId(shopProductId)) ?? product!.id;
    await addItemAsync(id, 1);
    return true;
  }

  async function onAdd() {
    try {
      if (!(await ensureAdd())) return;
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1600);
    } catch {
      /* ignore */
    }
  }

  async function onBuyNow() {
    try {
      if (!(await ensureAdd())) return;
      router.push('/checkout');
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="prod-buy-actions">
      <p className="prod-buy-price">{formatMoney(product.price)}</p>
      <div className="prod-buy-btns">
        <button type="button" className={primaryClass} onClick={() => void onAdd()}>
          {added ? 'Added' : 'Add to cart'}
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => void onBuyNow()}>
          Buy now <Arrow />
        </button>
      </div>
    </div>
  );
}
