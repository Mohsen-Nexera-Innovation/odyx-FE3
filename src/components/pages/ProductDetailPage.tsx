import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow, DownloadList, PageActions, PageCta, SpecTable } from '@/components/PageHero';
import PageHero from '@/components/PageHero';
import PrintLineHero from '@/components/PrintLineHero';
import CinematicHero from '@/components/CinematicHero';
import PrintLineStats from '@/components/PrintLineStats';
import SecHead from '@/components/SecHead';
import { getProduct, type ProductLayout } from '@/content/products';

export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const layout: ProductLayout | 'standard' = product.layout ?? 'standard';

  // Signature keeps the standard structure but rides the print-line canvas so it
  // inherits the exact cinematic colors + fonts (only the hero is re-themed below).
  const isPrintCanvas = layout === 'print-line' || layout === 'cinematic' || layout === 'signature';
  const pageClass = [
    'product-page',
    isPrintCanvas ? 'product-page--print-line' : '',
    layout === 'cinematic' ? 'product-page--cinematic' : '',
    layout === 'signature' ? 'product-page--print-signature' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Shared content sections used by the print-line + cinematic canvases.
  const sharedSections = (
    <>
      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Models" />
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

      <section className="sec prod-specs">
        <div className="wrap prod-detail-cols">
          <div>
            <SecHead eyebrow="Specifications" align="left" />
            <SpecTable specs={product.specs} />
          </div>
          <div>
            <SecHead eyebrow="Downloads" align="left" />
            <DownloadList items={product.downloads} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Applications" />
          <div className="pill-list reveal">
            {product.applications.map((a) => (
              <Link key={a} href="/#clinical">{a}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  if (layout === 'print-line' || layout === 'cinematic') {
    return (
      <div className={pageClass} data-product={product.slug}>
        {layout === 'cinematic' ? <CinematicHero product={product} /> : <PrintLineHero product={product} />}
        <PrintLineStats />
        {sharedSections}
      </div>
    );
  }

  // Classic: scanner-style layout, but riding the print-line canvas so it shares
  // the printing-line colors/typography and follows the background picker.
  if (layout === 'classic') {
    return (
      <div className="product-page product-page--print-line product-page--print-classic" data-product={product.slug}>
        <section className="sec prod-classic-hero">
          <div className="wrap">
            <nav className="crumbs prod-classic-hero__crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <Link href="/products">Products</Link>
              <span className="sep">/</span>
              <span>{product.name}</span>
            </nav>
            <img
              className="prod-print-hero__brand prod-classic-hero__brand"
              src="/brand/odyx-digital-printing-mark.png"
              alt="ODYX Digital Printing"
              width={1000}
              height={429}
            />
            <span className="eyebrow prod-classic-hero__eyebrow">Precision meets production</span>
            <h1 className="prod-classic-hero__title">{product.name}</h1>
            <p className="copy-lead prod-classic-hero__lead">{product.tagline}</p>
            <PageActions>
              <Link className="btn btn-sign" href="/support">
                Request a Demo <Arrow />
              </Link>
              <Link className="btn btn-ghost" href={`/workflows/${product.workflowStep}`}>
                Workflow step <Arrow />
              </Link>
            </PageActions>
          </div>
        </section>

        <section className="sec">
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

        {sharedSections}
      </div>
    );
  }

  return (
    <div className={pageClass} data-product={product.slug}>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
        title={product.name}
        lead={product.tagline}
        brand={
          layout === 'signature' ? (
            <img
              className="prod-print-hero__brand page-hero__brand"
              src="/brand/odyx-digital-printing-mark-light.png"
              alt="ODYX Digital Printing"
              width={1000}
              height={429}
            />
          ) : undefined
        }
        action={
          <PageActions>
            <Link className={layout === 'signature' ? 'btn btn-sign' : 'btn'} href="/support">
              Request a Demo <Arrow />
            </Link>
            <Link
              className={`btn btn-ghost${layout === 'signature' ? ' prod-print-hero__ghost' : ''}`}
              href={`/workflows/${product.workflowStep}`}
            >
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
          <SecHead eyebrow="Models" />
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

      <section className={`sec prod-specs sec-${product.accent === 'teal' ? 'teal' : 'orange'}`}>
        <div className="wrap prod-detail-cols">
          <div>
            <SecHead eyebrow="Specifications" align="left" />
            <SpecTable specs={product.specs} />
          </div>
          <div>
            <SecHead eyebrow="Downloads" align="left" />
            <DownloadList items={product.downloads} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Applications" />
          <div className="pill-list reveal">
            {product.applications.map((a) => (
              <Link key={a} href="/#clinical">{a}</Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title={`Demo the ${product.name}`}
        desc="See specs, materials and workflow fit with a live walkthrough."
        demoClassName={layout === 'signature' ? 'btn btn-sign' : 'btn btn-dark'}
      />
    </div>
  );
}
