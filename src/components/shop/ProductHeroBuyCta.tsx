'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Arrow, PageActions } from '@/components/PageHero';
import { formatMoney, getProductById, type ShopProduct } from '@/content/shop';
import { readSession } from '@/lib/auth';
import {
  addItemAsync,
  fetchShopProducts,
  resolveCartProductId,
} from '@/lib/commerce';
import { isApiMode } from '@/lib/config';

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
      };
      const slug = slugMap[shopProductId] ?? shopProductId;
      setProduct(list.find((p) => p.slug === slug || p.id === shopProductId) ?? null);
    });
  }, [shopProductId]);

  if (!product) return null;

  const primaryClass = accent === 'orange' ? 'btn btn-sign' : 'btn';
  const ghostClass =
    accent === 'orange' ? 'btn btn-ghost prod-print-hero__ghost' : 'btn btn-ghost';

  async function ensureAdd() {
    if (isApiMode() && !readSession()) {
      router.push('/login');
      return false;
    }
    const id = (await resolveCartProductId(shopProductId)) ?? product!.id;
    await addItemAsync(id, 1);
    return true;
  }

  async function onBuyNow() {
    if (!(await ensureAdd())) return;
    router.push('/checkout');
  }

  async function onAdd() {
    if (!(await ensureAdd())) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <PageActions>
      <button type="button" className={primaryClass} onClick={() => void onBuyNow()}>
        Buy now — {formatMoney(product.price)} <Arrow />
      </button>
      <button type="button" className={ghostClass} onClick={() => void onAdd()}>
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
