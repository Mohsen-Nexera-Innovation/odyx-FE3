'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import PageHero, { Arrow, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import {
  PRODUCTS,
  PRODUCT_CATEGORY_ORDER,
  groupProductsByCategory,
  type ProductContent,
} from '@/content/products';

function ProductCard({ p }: { p: ProductContent }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className={`prod-card${p.accent === 'teal' ? ' teal' : ''}`}
    >
      <div className="prod-card-img">
        <img src={p.img} alt={p.name} loading="lazy" />
      </div>
      <div className="prod-card-body">
        <span className="prod-cat">{p.category}</span>
        <h3>{p.name}</h3>
        <p>{p.tagline}</p>
        <span className="more">
          View specs &amp; downloads <Arrow />
        </span>
      </div>
    </Link>
  );
}

export default function ProductsOverviewPage() {
  const [filter, setFilter] = useState<string>('all');
  const categories = useMemo(
    () => [
      { id: 'all', label: 'All' },
      ...PRODUCT_CATEGORY_ORDER.filter((c) => PRODUCTS.some((p) => p.category === c)).map(
        (c) => ({ id: c, label: c }),
      ),
    ],
    [],
  );

  const filtered = useMemo(() => {
    if (filter === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  const groups = useMemo(() => groupProductsByCategory(filtered), [filtered]);

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
        ]}
        title="The ODYX product ecosystem"
        lead="Printer, Curing Machine, Scanner, and the rest of the ODYX lineup — grouped by product family."
        action={
          <Link className="btn" href="/workflows">
            See the workflow <Arrow />
          </Link>
        }
      />

      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Product families" />

          <div className="store-tabs prod-family-tabs" role="tablist" aria-label="Product categories">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter === c.id}
                className={`store-tab${filter === c.id ? ' on' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {filter === 'all' ? (
            <div className="store-groups">
              {groups.map((g) => (
                <div key={g.category} className="store-group">
                  <div className="store-group-head">
                    <h2>{g.category}</h2>
                    <button
                      type="button"
                      className="store-group-link"
                      onClick={() => setFilter(g.category)}
                    >
                      View only
                    </button>
                  </div>
                  <div className="prod-grid">
                    {g.items.map((p) => (
                      <ProductCard key={p.slug} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="prod-grid">
              {filtered.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PageCta
        title="Not sure where to start?"
        desc="Tell us your role and we will recommend the right ODYX setup."
      />
    </>
  );
}
