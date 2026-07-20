import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/PageHero';
import CinematicHero from '@/components/CinematicHero';
import SecHead from '@/components/SecHead';
import { getSolution } from '@/content/solutions';

export default function SolutionPathPage({ slug }: { slug: string }) {
  const path = getSolution(slug);
  if (!path) notFound();

  return (
    <div className="product-page product-page--print-line product-page--cinematic" data-accent={path.accent}>
      <CinematicHero
        accent={path.accent}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: `/solutions/${path.slug}` },
          { label: path.eyebrow, href: `/solutions/${path.slug}` },
        ]}
        eyebrow={path.eyebrow}
        title={path.title}
        lead={path.lead}
        heroImg={path.img}
        heroAlt={path.title}
        primaryAction={{ label: 'Explore workflow', href: '/workflows' }}
        secondaryAction={{ label: 'Request a Demo', href: '/support' }}
      />

      <section className="sec" id="clinical">
        <div className="wrap">
          <SecHead eyebrow="Overview" h2={path.title} p={path.lead} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Challenges we solve" />
          <div className="pill-list reveal">
            {path.challenges.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Recommended stack" />
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
          <SecHead eyebrow="Workflow emphasis" />
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
          <SecHead eyebrow="Outcomes" />
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
              <SecHead eyebrow="Cases" align="left" />
              <div className="pill-list">
                {path.cases.map((c) => (
                  <Link key={c.title} href={c.href}>{c.title}</Link>
                ))}
              </div>
            </div>
            <div className="inner-split-block reveal">
              <SecHead eyebrow="Training" align="left" />
              <div className="pill-list">
                {path.training.map((t) => (
                  <Link key={t.label} href={t.href}>{t.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
