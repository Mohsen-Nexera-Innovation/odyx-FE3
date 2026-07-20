'use client';

import Link from 'next/link';
import { Arrow } from '@/components/PageHero';
import { PRODUCTS, type ProductContent } from '@/content/products';

/** Scan → Design → Print → Cure → Materials */
const WORKFLOW_ORDER = [
  'intraoral-scanner',
  'design',
  '3d-printers',
  'curing-machines',
  'Resin',
] as const;

/** Transparent PNGs for the light products overview (studio bg removed). */
const CUTOUTS: Partial<Record<(typeof WORKFLOW_ORDER)[number], string>> = {
  'intraoral-scanner': '/img/cutouts/feat-scanner-cutout.png',
  design: '/img/cutouts/feat-design-cutout.png',
  '3d-printers': '/img/cutouts/feat-printer-cutout.png',
  'curing-machines': '/img/cutouts/feat-curing-cutout.png',
  Resin: '/img/cutouts/feat-resin-cutout.png',
};

const LINEUP = WORKFLOW_ORDER.map((slug) =>
  PRODUCTS.find((p) => p.slug === slug),
).filter((p): p is ProductContent => Boolean(p));

function Spotlight({
  product,
  index,
}: {
  product: ProductContent;
  index: number;
}) {
  const flip = index % 2 === 1;
  const cutout = CUTOUTS[product.slug as (typeof WORKFLOW_ORDER)[number]];
  const img = cutout ?? product.heroImg ?? product.img;
  const isCutout = img.endsWith('.png');

  return (
    <section
      className={`prod-ov-spot${flip ? ' prod-ov-spot--flip' : ''}${
        product.accent === 'teal' ? ' prod-ov-spot--teal' : ''
      }`}
      id={`spot-${product.slug}`}
    >
      <div className="wrap prod-ov-spot__inner">
        <div className="prod-ov-spot__media">
          <img
            src={img}
            alt={product.name}
            className={isCutout ? 'prod-ov-spot__cutout' : 'prod-ov-spot__photo'}
            loading="lazy"
          />
        </div>
        <div className="prod-ov-spot__copy">
          <p className="prod-ov-spot__name">{product.name}</p>
          <h2>{product.tagline.replace(/\.$/, '')}</h2>
          <p className="prod-ov-spot__body">{product.overview}</p>
          <div className="prod-ov-spot__actions">
            <Link className="btn" href={`/products/${product.slug}`}>
              Explore {product.name} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductsOverviewPage() {
  return (
    <div className="prod-ov">
      <div className="prod-ov-spots">
        {LINEUP.map((p, i) => (
          <Spotlight key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
