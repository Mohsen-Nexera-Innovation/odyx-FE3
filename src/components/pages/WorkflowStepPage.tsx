import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero, { Arrow, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import { getAdjacentSteps, getWorkflowStep, type WorkflowId } from '@/content/workflow';

export default function WorkflowStepPage({ slug }: { slug: string }) {
  const step = getWorkflowStep(slug);
  if (!step) notFound();
  const { prev, next } = getAdjacentSteps(step.id as WorkflowId);

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Workflows', href: '/workflows' },
          { label: step.label, href: `/workflows/${step.id}` },
        ]}
        title={`Step ${step.no}: ${step.label}`}
        lead={step.lead}
        action={
          step.productSlug ? (
            <Link className="btn" href={`/products/${step.productSlug}`}>
              Explore {step.productName} <Arrow />
            </Link>
          ) : (
            <Link className="btn" href="/#cta">Request a Demo <Arrow /></Link>
          )
        }
      />

      <section className={`sec sec-${step.accent === 'teal' ? 'teal' : 'orange'}`}>
        <div className="wrap wf-step-layout">
          <div className="wf-step-visual reveal">
            <img src={step.img} alt={step.label} />
          </div>
          <div className="wf-step-copy">
            <div className="reveal">
              <span className="eyebrow">What happens</span>
              <h2 className="m-underline">{step.label} in the workflow</h2>
              <p className="copy-lead">{step.whatHappens}</p>
            </div>
            <ul className="wf-benefits reveal">
              {step.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="By audience" />
          <div className="g2 build-group">
            <div className="card reveal build">
              <span className="card-eyebrow teal">Dentist</span>
              <h3>Chairside emphasis</h3>
              <p>{step.dentistNote}</p>
              <Link className="more" href="/solutions/dentists">Dentist path <Arrow /></Link>
            </div>
            <div className="card reveal build">
              <span className="card-eyebrow orange">Lab</span>
              <h3>Production emphasis</h3>
              <p>{step.labNote}</p>
              <Link className="more" href="/solutions/labs">Lab path <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {step.learning.length > 0 && (
        <section className="sec sec-teal">
          <div className="wrap">
            <SecHead eyebrow="Learn more" />
            <div className="pill-list reveal">
              {step.learning.map((l) => (
                <Link key={l.label} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap wf-step-nav reveal">
          {prev ? (
            <Link href={`/workflows/${prev.id}`} className="btn btn-ghost btn-sm">
              &larr; {prev.label}
            </Link>
          ) : (
            <span />
          )}
          <Link href="/workflows" className="btn btn-ghost btn-sm">All steps</Link>
          {next ? (
            <Link href={`/workflows/${next.id}`} className="btn btn-sm">
              {next.label} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>

      <PageCta title="Ready to go digital?" desc="Walk this step live with an ODYX workflow specialist." />
    </>
  );
}
