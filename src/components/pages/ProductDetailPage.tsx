import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow, DownloadList, PageActions, SpecTable } from '@/components/PageHero';
import PageHero from '@/components/PageHero';
import PrintLineHero from '@/components/PrintLineHero';
import CinematicHero from '@/components/CinematicHero';
import PrintLineStats from '@/components/PrintLineStats';
import SecHead from '@/components/SecHead';
import ProductBuyActions from '@/components/shop/ProductBuyActions';
import ProductHeroBuyCta from '@/components/shop/ProductHeroBuyCta';
import PrinterRoiSection from '@/components/roi/PrinterRoiSection';
import { getProduct, type ProductLayout } from '@/content/products';

const BENEFIT_ICONS: React.ReactNode[] = [
  <svg key="i0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>,
  <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" />
  </svg>,
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z" />
  </svg>,
  <svg key="i3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-3z" />
    <path d="M9.5 12l1.8 1.8L15 10" />
  </svg>,
];

export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const layout: ProductLayout | 'standard' = product.layout ?? 'standard';
  const buyableModel = product.models.find((m) => m.shopProductId);
  const heroAccent = product.accent === 'orange' ? 'orange' : product.accent === 'teal' ? 'teal' : 'sky';

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

  const highlightsSection = (
    <section className="sec prod-highlights">
      <div className="wrap">
        <SecHead eyebrow="Highlights" h2="Built for the ODYX workflow" />
        <div className="prod-highlights__grid">
          {product.benefits.map((b, i) => (
            <article key={b} className="prod-highlight reveal">
              <span className="prod-highlight__ic">
                {BENEFIT_ICONS[i % BENEFIT_ICONS.length]}
              </span>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const hasMultipleModels = product.models.length > 1;
  const modelsSection = hasMultipleModels ? (
    <section className="sec">
      <div className="wrap">
        <SecHead eyebrow="Models" />
        <div className="build-group prod-models g2">
          {product.models.map((m) => (
            <div key={m.name} className="card build reveal prod-model-card">
              <span className="prod-model-card__badge">{product.category}</span>
              <h3>{m.name}</h3>
              <p>{m.tagline}</p>
              {m.shopProductId ? (
                <ProductBuyActions
                  shopProductId={m.shopProductId}
                  accent={product.accent === 'orange' ? 'orange' : 'sky'}
                />
              ) : (
                <Link className="btn btn-ghost btn-sm prod-model-demo" href="/support">
                  Request a Demo <Arrow />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;

  // Shared content sections used by the print-line + cinematic canvases.
  const sharedSections = (
    <>
      {modelsSection}

      <section className="sec prod-specs">
        <div className="wrap prod-detail-cols">
          <div className="prod-panel reveal">
            <SecHead eyebrow="Specifications" align="left" />
            <SpecTable specs={product.specs} />
          </div>
          <div className="prod-panel reveal">
            <SecHead eyebrow="Downloads" align="left" />
            <DownloadList items={product.downloads} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Applications" />
          <div className="prod-applications reveal">
            {product.applications.map((a, i) => (
              <Link key={a} href="/#clinical" className="prod-application">
                <span className="prod-application__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="prod-application__label">{a}</span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  if (layout === 'print-line' || layout === 'cinematic') {
    return (
      <div className={pageClass} data-product={product.slug} data-accent={product.accent}>
        {layout === 'cinematic' ? (
          <CinematicHero
            accent={product.accent}
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: product.name, href: `/products/${product.slug}` },
            ]}
            title={product.name}
            lead={product.tagline}
            desc={product.overview}
            heroImg={product.heroImg ?? product.img}
            heroAlt={product.name}
            primaryAction={{ label: 'Request a Demo', href: '/support' }}
            secondaryAction={{ label: 'Workflow step', href: `/workflows/${product.workflowStep}` }}
            actions={
              buyableModel?.shopProductId ? (
                <ProductHeroBuyCta
                  shopProductId={buyableModel.shopProductId}
                  workflowHref={`/workflows/${product.workflowStep}`}
                  accent={heroAccent}
                />
              ) : undefined
            }
          />
        ) : (
          <PrintLineHero product={product} />
        )}
        <PrintLineStats stats={product.stats} />
        {highlightsSection}
        {sharedSections}
        {product.slug === '3d-printers' ? <PrinterRoiSection /> : null}
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
            {buyableModel?.shopProductId ? (
              <ProductHeroBuyCta
                shopProductId={buyableModel.shopProductId}
                workflowHref={`/workflows/${product.workflowStep}`}
                accent="orange"
              />
            ) : (
              <PageActions>
                <Link className="btn btn-sign" href="/support">
                  Request a Demo <Arrow />
                </Link>
                <Link className="btn btn-ghost" href={`/workflows/${product.workflowStep}`}>
                  Workflow step <Arrow />
                </Link>
              </PageActions>
            )}
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
          buyableModel?.shopProductId ? (
            <ProductHeroBuyCta
              shopProductId={buyableModel.shopProductId}
              workflowHref={`/workflows/${product.workflowStep}`}
              accent={layout === 'signature' ? 'orange' : 'sky'}
            />
          ) : (
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
          )
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

      {modelsSection}

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

    </div>
  );
}
