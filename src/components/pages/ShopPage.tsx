'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import {
  FREE_SHIPPING_THRESHOLD,
  SHOP_CATEGORIES,
  SHOP_CATEGORY_LABEL,
  SHOP_PRODUCTS,
  formatMoney,
  type ShopCategory,
  type ShopProduct,
} from '@/content/shop';
import { addItem } from '@/lib/cart-store';

function isCategory(v: string | null): v is ShopCategory {
  return v === 'printer' || v === 'curing' || v === 'scanner';
}

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
        {p.href ? (
          <Link href={p.href} className="store-media-link" tabIndex={-1} aria-hidden>
            <img src={p.image} alt="" />
          </Link>
        ) : (
          <img src={p.image} alt="" />
        )}
        <div className="store-media-scrim" aria-hidden />
        <span className="store-badge">{SHOP_CATEGORY_LABEL[p.category]}</span>
        <span className="store-price-pill">{formatMoney(p.price)}</span>
      </div>

      <div className="store-body">
        <div className="store-card-top">
          <h3>
            {p.href ? (
              <Link href={p.href} className="store-title-link">
                {p.name}
              </Link>
            ) : (
              p.name
            )}
          </h3>
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
          {p.href ? (
            <Link href={p.href} className="store-specs-link">
              Specs <Arrow />
            </Link>
          ) : null}
        </div>

        <div className="store-actions">
          <button type="button" className="btn store-btn-buy" onClick={() => onBuyNow(p.id)}>
            Buy now <Arrow />
          </button>
          <button
            type="button"
            className={`btn btn-ghost store-btn-cart${added ? ' is-added' : ''}`}
            onClick={() => onAdd(p.id)}
          >
            {added ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');
  const filter: ShopCategory | 'all' = isCategory(catParam) ? catParam : 'all';
  const [addedId, setAddedId] = useState<string | null>(null);

  const products = useMemo(() => {
    if (filter === 'all') return SHOP_PRODUCTS;
    return SHOP_PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  const filterLabel =
    filter === 'all' ? 'All products' : SHOP_CATEGORY_LABEL[filter];

  function onAdd(productId: string) {
    addItem(productId, 1);
    setAddedId(productId);
    window.setTimeout(() => setAddedId((cur) => (cur === productId ? null : cur)), 1600);
  }

  function onBuyNow(productId: string) {
    addItem(productId, 1);
    router.push('/checkout');
  }

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Store', href: '/shop' },
        ]}
        title="ODYX Store"
        lead="Purchase ODYX P1-26, ODYX Cure, and ODYX-S1 — clinic-ready hardware with fast checkout."
        action={
          <PageActions>
            <Link className="btn" href="/cart">
              View cart <Arrow />
            </Link>
          </PageActions>
        }
      />

      <section className="sec store-sec">
        <div className="wrap">
          <div className="store-toolbar">
            <div className="store-toolbar-copy">
              <p className="store-toolbar-kicker">Catalog</p>
              <h2 className="store-toolbar-title">{filterLabel}</h2>
              <p className="store-toolbar-meta">
                {products.length} product{products.length === 1 ? '' : 's'}
                <span aria-hidden>·</span>
                Free shipping from {formatMoney(FREE_SHIPPING_THRESHOLD)}
              </p>
            </div>

            <div className="store-tabs" role="tablist" aria-label="Product categories">
              {SHOP_CATEGORIES.map((c) => {
                const href = c.id === 'all' ? '/shop' : `/shop?cat=${c.id}`;
                const selected = filter === c.id;
                return (
                  <Link
                    key={c.id}
                    href={href}
                    scroll={false}
                    replace
                    role="tab"
                    aria-selected={selected}
                    className={`store-tab${selected ? ' on' : ''}`}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {products.length === 0 ? (
            <p className="store-empty">No products in this category.</p>
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
