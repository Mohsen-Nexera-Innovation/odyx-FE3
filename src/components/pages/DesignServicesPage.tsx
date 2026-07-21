'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import { DESIGN_SERVICES } from '@/content/design-services';
import { formatMoney, type ShopProduct } from '@/content/shop';
import { fetchShopProducts } from '@/lib/commerce';

function ProductCard({
  p,
  index,
}: {
  p: ShopProduct;
  index: number;
}) {
  const slug = p.slug ?? p.id;
  const href = `/design-services/request?service=${encodeURIComponent(slug)}`;

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
          <Link className="btn btn-sm" href={href}>
            Request design
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function DesignServicesPage() {
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

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design services', href: '/design-services' },
        ]}
        eyebrow="Services"
        title="Design as a service"
        lead="Choose a service, add the patient and scan, checkout, then track the case in your inbox."
        action={
          <PageActions>
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
              <p className="store-toolbar-kicker">Step 1</p>
              <h2 className="store-toolbar-title">Choose a design service</h2>
              <p className="store-toolbar-meta">
                {products.length} service{products.length === 1 ? '' : 's'}
                <span aria-hidden>·</span>
                Then patient → checkout → inbox scan
              </p>
            </div>
          </div>

          {error ? <p className="store-empty">{error}</p> : null}

          {products.length === 0 && !error ? (
            <p className="store-empty">No design services available.</p>
          ) : (
            <div className={`store-grid${products.length < 3 ? ' store-grid--sparse' : ''}`}>
              {products.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
