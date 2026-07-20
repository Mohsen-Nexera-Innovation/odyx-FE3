import Link from 'next/link';
import { Arrow } from '@/components/PageHero';
import CinematicHero from '@/components/CinematicHero';
import SecHead from '@/components/SecHead';
import { WORKFLOW_STEPS } from '@/content/workflow';

export default function WorkflowHubPage() {
  return (
    <div className="product-page product-page--print-line product-page--cinematic" data-accent="teal">
      <CinematicHero
        accent="teal"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Guided Workflows', href: '/workflows' }]}
        eyebrow="Scan to smile"
        title="One connected workflow"
        lead="Scan, design, print, cure, finish and deliver - six steps, one ecosystem."
        desc="Walk the sequence ODYX is built around, from the first chairside scan to the final delivered restoration."
        heroImg="/img/odyx/dental-frame.webp"
        heroAlt="ODYX connected workflow"
        primaryAction={{ label: 'Start with Scan', href: '/workflows/scan' }}
        secondaryAction={{ label: 'Products', href: '/products' }}
      />

      <section className="sec">
        <div className="wrap">
          <SecHead
            eyebrow="Overview"
            h2="How ODYX connects"
            p="A short path from capture to delivery — each step links to the product and learning you need."
          />
        </div>
      </section>

      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Steps" />
          <div className="wf-hub-grid build-group">
            {WORKFLOW_STEPS.map((s) => (
              <Link key={s.id} href={`/workflows/${s.id}`} className={`wf-hub-card build${s.accent === 'teal' ? ' teal' : ''}`}>
                <span className="wf-hub-no">Step {s.no}</span>
                <div className="wf-hub-img">
                  <img src={s.img} alt={s.label} loading="lazy" />
                </div>
                <h3>{s.label}</h3>
                <p>{s.lead}</p>
                <span className="more">Explore step <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-orange">
        <div className="wrap">
          <SecHead eyebrow="By role" />
          <div className="pgrid build-group">
            <Link href="/solutions/dentists" className="pcard teal reveal build">
              <div className="pcard-art">
                <img className="pimg" src="/img/paths/dentist.jpg" alt="Dentist chairside workflow" loading="lazy" />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
                  <svg width="22" height="26" viewBox="0 0 24 28" fill="currentColor" aria-hidden><path d="M7 1C4.2 1 2 3.2 2 6c0 1.9.5 3.4 1.1 5.4.5 1.8.8 3.6 1.1 5.8.2 1.7.4 3.8 1.4 3.8.9 0 1.1-1.8 1.4-3.3.3-1.9.5-3.2 1.5-3.2s1.2 1.3 1.5 3.2c.3 1.5.5 3.3 1.4 3.3 1 0 1.2-2.1 1.4-3.8.3-2.2.6-4 1.1-5.8C21.5 9.4 22 7.9 22 6c0-2.8-2.2-5-5-5-1.6 0-2.6.8-3.5.8S8.6 1 7 1z" /></svg>
                </div>
                <h3>Dentist workflow</h3>
                <p>Same-day restorations, chairside scan-to-deliver, patient comfort first.</p>
                <span className="more">Clinic journey <Arrow /></span>
              </div>
            </Link>
            <Link href="/solutions/labs" className="pcard reveal build">
              <div className="pcard-art">
                <img className="pimg" src="/img/paths/lab.jpg" alt="Dental lab production workflow" loading="lazy" />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="9" width="12" height="8" rx="1" /><path d="M6 17v3h12v-3M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" /></svg>
                </div>
                <h3>Lab workflow</h3>
                <p>Throughput, batch production, finishing and QA at scale.</p>
                <span className="more">Lab journey <Arrow /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
