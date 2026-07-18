'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import { DESIGN_SERVICES } from '@/content/design-services';
import { formatMoney, type ShopProduct } from '@/content/shop';
import { addItemAsync, fetchShopProducts } from '@/lib/commerce';
import { isApiMode } from '@/lib/config';
import { readSession } from '@/lib/auth';

function ProductCard({
  p,
  index,
  addedId,
  onAdd,
  onBuyNow,
}: {
  p: ShopProduct;
  index: number;
  addedId: string | null;
  onAdd: (id: string) => void;
  onBuyNow: (id: string) => void;
}) {
  const added = addedId === p.id;

  return (
    <article className="store-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="store-media">
        <img src={p.image} alt="" />
        <div className="store-media-scrim" aria-hidden />
        <span className="store-badge">Design service</span>
        <span className="store-price-pill">{formatMoney(p.price)}</span>
      </div>

      <div className="store-body">
        <div className="store-card-top">
          <h3>{p.name}</h3>
          <p className="store-price-lg">{formatMoney(p.price)}</p>
        </div>

        <p className="store-desc">{p.desc}</p>

        {p.highlights?.length ? (
          <ul className="store-chips">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div className="store-meta">
          {p.unit ? <span>{p.unit}</span> : null}
        </div>

        <div className="store-actions">
          <button type="button" className="btn btn-sm" onClick={() => onAdd(p.id)}>
            {added ? 'Added' : 'Add to cart'}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onBuyNow(p.id)}>
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function DesignServicesPage() {
  const router = useRouter();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [products, setProducts] = useState<ShopProduct[]>(DESIGN_SERVICES);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchShopProducts('design')
      .then((list) => {
        if (!cancelled) setProducts(list.length ? list : DESIGN_SERVICES);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setProducts(DESIGN_SERVICES);
          setError(err instanceof Error ? err.message : 'Could not load design services');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onAdd(productId: string) {
    if (isApiMode() && !readSession()) {
      router.push('/login');
      return;
    }
    try {
      await addItemAsync(productId, 1);
      setAddedId(productId);
      window.setTimeout(() => setAddedId((cur) => (cur === productId ? null : cur)), 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add to cart');
    }
  }

  async function onBuyNow(productId: string) {
    if (isApiMode() && !readSession()) {
      router.push('/login');
      return;
    }
    try {
      await addItemAsync(productId, 1);
      try {
        sessionStorage.setItem('odyx_checkout_from', 'design');
      } catch {
        /* ignore */
      }
      router.push('/checkout');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add to cart');
    }
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design services', href: '/design-services' },
        ]}
        title="Design as a service"
        lead="Buy a design case, pay online, then upload your scan in the inbox — we deliver the STL digitally."
        action={
          <PageActions>
            <Link className="btn" href="/cart">
              View cart <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/inbox">
              Open inbox <Arrow />
            </Link>
          </PageActions>
        }
      />

      <section className="sec store-sec">
        <div className="wrap">
          <div className="store-toolbar">
            <div className="store-toolbar-copy">
              <p className="store-toolbar-kicker">Catalog</p>
              <h2 className="store-toolbar-title">Design services</h2>
              <p className="store-toolbar-meta">
                {products.length} service{products.length === 1 ? '' : 's'}
                <span aria-hidden>·</span>
                Digital delivery · Online payment · No shipping
              </p>
            </div>
          </div>

          {error ? <p className="store-empty">{error}</p> : null}

          {products.length === 0 && !error ? (
            <p className="store-empty">No design services available.</p>
          ) : (
            <div className={`store-grid${products.length < 3 ? ' store-grid--sparse' : ''}`}>
              {products.map((p, i) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  index={i}
                  addedId={addedId}
                  onAdd={onAdd}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
