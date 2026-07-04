import Link from 'next/link';
import { Arrow, PageActions } from '@/components/PageHero';
import type { ProductContent } from '@/content/products';

const HERO_IMG_WIDTH = 964;
const HERO_IMG_HEIGHT = 1280;

export default function PrintLineHero({ product }: { product: ProductContent }) {
  const heroSrc = product.heroImg ?? product.img;

  return (
    <section className="prod-print-hero" aria-labelledby="print-hero-title">
      <div className="prod-print-hero__bg" aria-hidden />

      <div className="wrap prod-print-hero__wrap">
        <nav className="crumbs prod-print-hero__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/products">Products</Link>
          <span className="sep">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="prod-print-hero__grid">
          <div className="prod-print-hero__copy">
            <div className="prod-print-hero__brand-wrap">
              <img
                className="prod-print-hero__brand"
                src="/brand/odyx-digital-printing-mark-light.png"
                alt="ODYX Digital Printing"
                width={1000}
                height={429}
              />
            </div>
            <p className="prod-print-hero__eyebrow">Precision meets production</p>
            <h1 id="print-hero-title">{product.name}</h1>
            <p className="prod-print-hero__lead">{product.tagline}</p>
            <p className="prod-print-hero__desc">{product.overview}</p>
            <PageActions>
              <Link className="btn btn-sign" href="/support">
                Request a Demo <Arrow />
              </Link>
              <Link className="btn btn-ghost prod-print-hero__ghost" href={`/workflows/${product.workflowStep}`}>
                Workflow step <Arrow />
              </Link>
            </PageActions>
          </div>

          <div className="prod-print-hero__visual">
            <div className="prod-print-hero__glow" aria-hidden />
            <img
              className="prod-print-hero__printer"
              src={heroSrc}
              alt={product.name}
              width={HERO_IMG_WIDTH}
              height={HERO_IMG_HEIGHT}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
