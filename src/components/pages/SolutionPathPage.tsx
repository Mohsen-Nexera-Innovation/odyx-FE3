import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero, { Arrow, PageActions, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import { getSolution } from '@/content/solutions';

export default function SolutionPathPage({ slug }: { slug: string }) {
  const path = getSolution(slug);
  if (!path) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: `/solutions/${path.slug}` },
          { label: path.eyebrow, href: `/solutions/${path.slug}` },
        ]}
        title={path.title}
        lead={path.lead}
        action={
          <PageActions>
            <Link className="btn" href="/workflows">Explore workflow <Arrow /></Link>
            <Link className="btn btn-ghost" href="/#cta">Request a Demo</Link>
          </PageActions>
        }
      />

      <section className={`sec sec-${path.accent === 'teal' ? 'mint' : 'orange'}`}>
        <div className="wrap wf-step-layout">
          <div className="wf-step-visual reveal">
            <img src={path.img} alt={path.title} />
          </div>
          <div className="wf-step-copy reveal">
            <span className="eyebrow">Challenges we solve</span>
            <h2 className="m-underline">Why teams go digital with ODYX</h2>
            <ul className="wf-benefits">
              {path.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Recommended stack" h2="Products for this path" />
          <div className="sol-prod-list build-group">
            {path.recommendedProducts.map((p) => (
              <Link key={p.name} href={p.href} className="sol-prod-card build reveal">
                <div className="sol-prod-img">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="sol-prod-body">
                  <h3>{p.name}</h3>
                  <p>{p.why}</p>
                  <span className="more">View product <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Workflow emphasis" h2="Your connected sequence" />
          <div className="steps reveal">
            {path.workflowEmphasis.map((s, i) => (
              <div key={s} className="step">
                <div className="n">0{i + 1}</div>
                <h4>{s}</h4>
              </div>
            ))}
          </div>
          <div className="sec-head-action reveal">
            <Link className="btn" href="/workflows">Open Workflow Hub <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Outcomes" h2="What you can expect" />
          <div className="inner-stat-grid build-group">
            {path.outcomes.map((o) => (
              <div key={o.label} className="card stat reveal build">
                <div className="num">{o.stat}</div>
                <div className="lbl">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-orange">
        <div className="wrap">
          <div className="g2">
            <div className="inner-split-block reveal">
              <SecHead eyebrow="Cases" h2="Proof in practice" align="left" />
              <div className="pill-list">
                {path.cases.map((c) => (
                  <Link key={c.title} href={c.href}>{c.title}</Link>
                ))}
              </div>
            </div>
            <div className="inner-split-block reveal">
              <SecHead eyebrow="Training" h2="Build skill with ODYX" align="left" />
              <div className="pill-list">
                {path.training.map((t) => (
                  <Link key={t.label} href={t.href}>{t.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title={path.slug === 'dentists' ? 'Start your clinic journey' : 'Scale your lab production'}
        desc="Book a tailored demo with products and workflow matched to your team."
      />
    </>
  );
}
