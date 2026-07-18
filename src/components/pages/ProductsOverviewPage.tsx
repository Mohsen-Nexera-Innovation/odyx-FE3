'use client';

import Link from 'next/link';
import { Arrow } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import { PRODUCTS, type ProductContent } from '@/content/products';

const FLAGSHIP =
  PRODUCTS.find((p) => p.slug === '3d-printers') ?? PRODUCTS[0];

/** Flagship lives in the hero; spotlights cover the rest of the lineup. */
const SPOTLIGHT_ORDER = [
  'intraoral-scanner',
  'design',
  'curing-machines',
  'staining-glazing',
  'Resin',
] as const;

const SPOTLIGHTS = SPOTLIGHT_ORDER.map((slug) =>
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
  const img = product.heroImg ?? product.img;
  const isCutout = img.endsWith('.png');

  return (
    <section
      className={`prod-ov-spot${flip ? ' prod-ov-spot--flip' : ''}${
        product.accent === 'teal' ? ' prod-ov-spot--teal' : ''
      }`}
      id={`spot-${product.slug}`}
    >
      <div className="prod-ov-spot__media reveal" aria-hidden="true">
        <img
          src={img}
          alt=""
          className={isCutout ? 'prod-ov-spot__cutout' : 'prod-ov-spot__photo'}
          loading="lazy"
        />
      </div>
      <div className="prod-ov-spot__copy reveal">
        <span className="prod-ov-spot__cat">{product.category}</span>
        <h2>{product.name}</h2>
        <p className="prod-ov-spot__lead">{product.tagline}</p>
        <p className="prod-ov-spot__body">{product.overview}</p>
        <ul className="prod-ov-spot__chips">
          {product.benefits.slice(0, 4).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <Link className="btn" href={`/products/${product.slug}`}>
          Explore {product.name} <Arrow />
        </Link>
      </div>
    </section>
  );
}

export default function ProductsOverviewPage() {
  return (
    <div className="prod-ov">
      <section
        className="prod-ov-hero"
        id={`spot-${FLAGSHIP.slug}`}
        aria-labelledby="prod-ov-hero-title"
      >
        <div className="prod-ov-hero__bg" aria-hidden />
        <div className="prod-ov-hero__glow" aria-hidden />
        <div className="wrap prod-ov-hero__wrap">
          <div className="prod-ov-hero__copy">
            <img
              src="/brand/odyx-digital-printing-mark-light.png"
              alt="ODYX"
              className="prod-ov-hero__brand"
            />
            <p className="prod-ov-hero__eyebrow">{FLAGSHIP.name}</p>
            <h1 id="prod-ov-hero-title">The dental production workhorse</h1>
            <p className="prod-ov-hero__lead">
              Maximize chairside and lab throughput with validated print
              profiles — one ecosystem from scan to smile.
            </p>
            <div className="prod-ov-hero__actions">
              <Link className="btn" href={`/products/${FLAGSHIP.slug}`}>
                Explore {FLAGSHIP.name} <Arrow />
              </Link>
              <a className="btn btn-ghost" href="#spot-intraoral-scanner">
                Explore the lineup
              </a>
            </div>
          </div>
          <div className="prod-ov-hero__stage" aria-hidden>
            <img
              src={FLAGSHIP.heroImg ?? FLAGSHIP.img}
              alt=""
              className="prod-ov-hero__printer"
            />
            <span className="prod-ov-hero__floor" />
          </div>
        </div>
      </section>

      <nav className="prod-ov-jump" aria-label="Product spotlights">
        <div className="wrap prod-ov-jump__inner">
          {[FLAGSHIP, ...SPOTLIGHTS].map((p) => (
            <a key={p.slug} href={`#spot-${p.slug}`}>
              {p.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="prod-ov-spots">
        {SPOTLIGHTS.map((p, i) => (
          <Spotlight key={p.slug} product={p} index={i} />
        ))}
      </div>

      <section className="prod-ov-eco">
        <div className="wrap prod-ov-eco__grid">
          <div className="prod-ov-eco__copy reveal">
            <SecHead
              eyebrow="Connected workflow"
              h2="Cutting-edge digital dentistry powered by ODYX"
              p="Printer, curing, scanner, design, finishing and clinical resin — built to work as one validated path."
              align="left"
            />
            <div className="prod-ov-eco__actions">
              <Link className="btn" href="/workflows">
                See the workflow <Arrow />
              </Link>
              <Link className="btn btn-ghost" href="/design-services">
                Design services
              </Link>
            </div>
          </div>
          <ul className="prod-ov-eco__pillars reveal">
            {[
              { label: 'Scan', href: '/products/intraoral-scanner' },
              { label: 'Design', href: '/products/design' },
              { label: 'Print', href: '/products/3d-printers' },
              { label: 'Cure', href: '/products/curing-machines' },
              { label: 'Finish', href: '/products/staining-glazing' },
              { label: 'Materials', href: '/products/Resin' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="prod-ov-consult">
        <div className="wrap prod-ov-consult__inner reveal">
          <div>
            <span className="prod-ov-consult__eyebrow">Free consultation</span>
            <h2>See how 3D printing can transform your practice</h2>
            <p>
              Book a session with our team to map ODYX hardware, materials and
              design services to your chairside or lab goals.
            </p>
          </div>
          <div className="prod-ov-consult__actions">
            <Link className="btn" href="/support">
              Schedule a call <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/roi">
              Calculate ROI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
