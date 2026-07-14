'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addItem } from '@/lib/cart-store';
import { formatMoney, getProductById } from '@/content/shop';

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
  const product = getProductById(shopProductId);
  if (!product) return null;

  const primaryClass = accent === 'orange' ? 'btn btn-sign btn-sm' : 'btn btn-sm';

  function onAdd() {
    addItem(shopProductId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function onBuyNow() {
    addItem(shopProductId, 1);
    router.push('/checkout');
  }

  return (
    <div className="prod-buy-actions">
      <p className="prod-buy-price">{formatMoney(product.price)}</p>
      <div className="prod-buy-btns">
        <button type="button" className={primaryClass} onClick={onAdd}>
          {added ? 'Added' : 'Add to cart'}
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onBuyNow}>
          Buy now <Arrow />
        </button>
      </div>
    </div>
  );
}
