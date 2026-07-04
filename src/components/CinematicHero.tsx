import Link from 'next/link';
import { Arrow, PageActions } from '@/components/PageHero';
import type { ProductContent } from '@/content/products';

const HERO_IMG_WIDTH = 964;
const HERO_IMG_HEIGHT = 1280;

export default function CinematicHero({ product }: { product: ProductContent }) {
  const heroSrc = product.heroImg ?? product.img;

  return (
    <section className="prod-cine-hero" aria-labelledby="cine-hero-title">
      <div className="prod-cine-hero__bg" aria-hidden />
      <div className="prod-cine-hero__glow" aria-hidden />

      <div className="wrap prod-cine-hero__wrap">
        <nav className="crumbs prod-print-hero__crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/products">Products</Link>
          <span className="sep">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="prod-cine-hero__copy">
          <img
            className="prod-print-hero__brand"
            src="/brand/odyx-digital-printing-mark-light.png"
            alt="ODYX Digital Printing"
            width={1000}
            height={429}
          />
          <p className="prod-print-hero__eyebrow">Precision meets production</p>
          <h1 id="cine-hero-title" className="prod-cine-hero__title">{product.name}</h1>
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
      </div>

      <div className="prod-cine-hero__floor" aria-hidden />
      <img
        className="prod-cine-hero__printer"
        src={heroSrc}
        alt={product.name}
        width={HERO_IMG_WIDTH}
        height={HERO_IMG_HEIGHT}
        decoding="async"
        fetchPriority="high"
      />
    </section>
  );
}
