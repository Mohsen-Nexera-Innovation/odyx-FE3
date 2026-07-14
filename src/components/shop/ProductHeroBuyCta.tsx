'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Arrow, PageActions } from '@/components/PageHero';
import { addItem } from '@/lib/cart-store';
import { formatMoney, getProductById } from '@/content/shop';

export default function ProductHeroBuyCta({
  shopProductId,
  workflowHref,
  accent = 'sky',
}: {
  shopProductId: string;
  workflowHref: string;
  accent?: 'sky' | 'teal' | 'orange';
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const product = getProductById(shopProductId);
  if (!product) return null;

  const primaryClass = accent === 'orange' ? 'btn btn-sign' : 'btn';
  const ghostClass =
    accent === 'orange' ? 'btn btn-ghost prod-print-hero__ghost' : 'btn btn-ghost';

  function onBuyNow() {
    addItem(shopProductId, 1);
    router.push('/checkout');
  }

  function onAdd() {
    addItem(shopProductId, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <PageActions>
      <button type="button" className={primaryClass} onClick={onBuyNow}>
        Buy now — {formatMoney(product.price)} <Arrow />
      </button>
      <button type="button" className={ghostClass} onClick={onAdd}>
        {added ? 'Added to cart' : 'Add to cart'}
      </button>
      <Link className={ghostClass} href={workflowHref}>
        Workflow step <Arrow />
      </Link>
      <Link className={ghostClass} href="/support">
        Request a Demo
      </Link>
    </PageActions>
  );
}
