import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero, { Arrow, DownloadList, PageActions, PageCta, SpecTable } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import { getProduct } from '@/content/products';

export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
        title={product.name}
        lead={product.tagline}
        action={
          <PageActions>
            <Link className="btn" href="/#cta">Request a Demo <Arrow /></Link>
            <Link className="btn btn-ghost" href={`/workflows/${product.workflowStep}`}>
              Workflow step <Arrow />
            </Link>
          </PageActions>
        }
      />

      <section className={`sec sec-${product.accent === 'teal' ? 'teal' : 'orange'}`}>
        <div className="wrap wf-step-layout">
          <div className="wf-step-visual reveal">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="wf-step-copy reveal">
            <span className="eyebrow">Overview</span>
            <h2 className="m-underline">Built for the ODYX workflow</h2>
            <p className="copy-lead">{product.overview}</p>
            <ul className="wf-benefits">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Models" h2="Choose your configuration" />
          <div className="g2 build-group">
            {product.models.map((m) => (
              <div key={m.name} className="card build reveal">
                <h3>{m.name}</h3>
                <p>{m.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-teal">
        <div className="wrap prod-detail-cols">
          <div>
            <SecHead eyebrow="Specifications" h2="Technical details" align="left" />
            <SpecTable specs={product.specs} />
          </div>
          <div>
            <SecHead eyebrow="Downloads" h2="Brochures and docs" align="left" />
            <DownloadList items={product.downloads} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Applications" h2="Clinical indications" />
          <div className="pill-list reveal">
            {product.applications.map((a) => (
              <Link key={a} href="/#clinical">{a}</Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta title={`Demo the ${product.name}`} desc="See specs, materials and workflow fit with a live walkthrough." />
    </>
  );
}
