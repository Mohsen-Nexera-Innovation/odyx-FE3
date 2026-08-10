import Link from 'next/link';
import type { RegisterRole, UserRole } from '@/content/auth';
import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

const ACCENT: Record<RegisterRole | 'admin' | 'default', string> = {
  default: 'sky',
  dentist: 'teal',
  lab: 'orange',
  guest: 'sky',
  admin: 'sky',
};

/** Left-rail workflow CTAs → product pages (same destinations as site spine). */
const WORKFLOW_STEPS = [
  { label: 'Scan', href: DIGITAL_WORKFLOW_LINKS.scan, stepId: 'scan' as const },
  { label: 'Design', href: DIGITAL_WORKFLOW_LINKS.design, stepId: 'design' as const },
  { label: 'Print', href: DIGITAL_WORKFLOW_LINKS.print, stepId: 'print' as const },
  { label: 'Wash & Cure', href: DIGITAL_WORKFLOW_LINKS.cure, stepId: 'cure' as const },
  { label: 'Deliver', href: DIGITAL_WORKFLOW_LINKS.finish, stepId: 'finish' as const },
];

export default function AuthPageShell({
  title,
  subtitle,
  accent = 'default',
  wide = false,
  children,
  foot,
}: {
  title: string;
  subtitle?: string;
  accent?: UserRole | 'default';
  wide?: boolean;
  children: React.ReactNode;
  foot?: React.ReactNode;
}) {
  return (
    <div
      className="auth-page"
      data-accent={ACCENT[accent]}
      data-wide={wide ? 'true' : undefined}
    >
      {/* ── Left Panel — Dark Brand Canvas ── */}
      <div className="auth-brand">
        <span className="auth-brand-orb auth-brand-orb-a" aria-hidden />
        <span className="auth-brand-orb auth-brand-orb-b" aria-hidden />
        <span className="auth-brand-orb auth-brand-orb-c" aria-hidden />

        <div className="auth-brand-content">
          <Link href="/" className="auth-brand-logo-link" aria-label="ODYX home">
            <img
              src="/brand/odyx-company.png"
              alt="ODYX"
              className="auth-brand-logo"
              width={160}
              height={48}
            />
          </Link>
          <h2 className="auth-brand-headline">
            The connected dental workflow
          </h2>
          <p className="auth-brand-tagline">
            From scan to delivery — one ecosystem for every step of your
            digital dentistry practice.
          </p>

          <ul className="auth-brand-workflow" aria-label="ODYX workflow">
            {WORKFLOW_STEPS.map((step, i) => {
              const dimmed = isDigitalWorkflowDimmed(step.stepId);
              return (
                <li
                  key={step.label}
                  className={`auth-brand-step${dimmed ? ' is-dimmed' : ''}`}
                >
                  {i > 0 && (
                    <span className="auth-brand-step-arrow" aria-hidden>
                      →
                    </span>
                  )}
                  {dimmed ? (
                    <span className="auth-brand-step-label">{step.label}</span>
                  ) : (
                    <Link
                      href={step.href}
                      className="auth-brand-step-link"
                      aria-label={`${step.label} — view product`}
                    >
                      {step.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="auth-brand-trust" aria-hidden>
            <span className="auth-brand-trust-item">
              <span className="auth-brand-trust-dot" />
              CE Certified
            </span>
            <span className="auth-brand-trust-item">
              <span className="auth-brand-trust-dot" />
              FDA Cleared
            </span>
            <span className="auth-brand-trust-item">
              <span className="auth-brand-trust-dot" />
              ISO 13485
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form Surface ── */}
      <div className="auth-form-panel">
        <div className="auth-ambient" aria-hidden>
          <span className="auth-orb auth-orb-a" />
          <span className="auth-orb auth-orb-b" />
          <span className="auth-grid" />
        </div>

        <div className="auth-center">
          <div className="auth-card">
            <Link href="/" className="auth-logo" aria-label="ODYX home">
              <img
                src="/brand/odyx-company.png"
                alt=""
                width={120}
                height={40}
              />
            </Link>
            <h1 className="auth-title">{title}</h1>
            {subtitle && <p className="auth-sub">{subtitle}</p>}
            {children}
            {foot}
          </div>
        </div>
      </div>
    </div>
  );
}
