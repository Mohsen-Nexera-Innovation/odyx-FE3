import Link from 'next/link';
import PageHero, { Arrow, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import { PRODUCTS } from '@/content/products';

export default function ProductsOverviewPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }]}
        title="The ODYX product ecosystem"
        lead="Scanner, design, print, cure, finish and materials - each built to connect in one validated workflow."
        action={<Link className="btn" href="/workflows">See the workflow <Arrow /></Link>}
      />

      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead
            eyebrow="Product families"
            h2="Everything in one connected chain"
          />
          <div className="prod-grid build-group">
            {PRODUCTS.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className={`prod-card build${p.accent === 'teal' ? ' teal' : ''}`}>
                <div className="prod-card-img">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="prod-card-body">
                  <span className="prod-cat">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>{p.tagline}</p>
                  <span className="more">View specs &amp; downloads <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta title="Not sure where to start?" desc="Tell us your role and we will recommend the right ODYX setup." />
    </>
  );
}
