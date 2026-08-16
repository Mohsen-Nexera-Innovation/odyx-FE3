import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/PageHero';
import CinematicHero from '@/components/CinematicHero';
import SecHead from '@/components/SecHead';
import { digitalWorkflowHref } from '@/content/digital-workflow-links';
import { getAdjacentSteps, getWorkflowStep, type WorkflowId } from '@/content/workflow';

function stepProductHref(step: { id: string; productSlug: string }) {
  if (step.productSlug) return `/products/${step.productSlug}`;
  return digitalWorkflowHref(step.id);
}

export default function WorkflowStepPage({ slug }: { slug: string }) {
  const step = getWorkflowStep(slug);
  if (!step) notFound();
  const { prev, next } = getAdjacentSteps(step.id as WorkflowId);

  return (
    <div className="product-page product-page--print-line product-page--cinematic" data-accent={step.accent}>
      <CinematicHero
        accent={step.accent}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Workflows', href: '/workflows' },
          { label: step.label, href: `/workflows/${step.id}` },
        ]}
        eyebrow={`Step ${step.no} of 06`}
        title={`${step.label}`}
        lead={step.lead}
        desc={step.whatHappens}
        heroImg={step.img}
        heroAlt={step.label}
        primaryAction={
          step.productSlug
            ? { label: `Explore ${step.productName}`, href: `/products/${step.productSlug}` }
            : { label: 'Request a Demo', href: '/request-demo' }
        }
        secondaryAction={{ label: 'All steps', href: '/workflows' }}
      />

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="Key benefits" />
          <div className="pill-list reveal">
            {step.benefits.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead eyebrow="For dentists & labs" />
          <div className="g2 build-group">
            <div className="card reveal build">
              <span className="card-eyebrow teal">Dentist</span>
              <h3>Chairside</h3>
              <p>{step.dentistNote}</p>
              <Link className="more" href="/solutions">Dentist path <Arrow /></Link>
            </div>
            <div className="card reveal build">
              <span className="card-eyebrow orange">Lab</span>
              <h3>Production</h3>
              <p>{step.labNote}</p>
              <Link className="more" href="/solutions">Lab path <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {step.learning.length > 0 && (
        <section className="sec sec-teal">
          <div className="wrap">
            <SecHead eyebrow="Related learning" />
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
            <Link href={stepProductHref(prev)} className="btn btn-ghost btn-sm">
              &larr; {prev.label}
            </Link>
          ) : (
            <span />
          )}
          <Link href="/products" className="btn btn-ghost btn-sm">
            All products
          </Link>
          {next ? (
            <Link href={stepProductHref(next)} className="btn btn-sm">
              {next.label} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </div>
  );
}
