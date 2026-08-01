import Link from 'next/link';
import type { RegisterRole, UserRole } from '@/content/auth';

const ACCENT: Record<RegisterRole | 'admin' | 'default', string> = {
  default: 'sky',
  dentist: 'teal',
  lab: 'orange',
  guest: 'sky',
  admin: 'sky',
};

const WORKFLOW_STEPS = [
  'Scan',
  'Design',
  'Print',
  'Wash & Cure',
  'Deliver',
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
      <div className="auth-brand" aria-hidden>
        <span className="auth-brand-orb auth-brand-orb-a" />
        <span className="auth-brand-orb auth-brand-orb-b" />
        <span className="auth-brand-orb auth-brand-orb-c" />

        <div className="auth-brand-content">
          <img
            src="/brand/odyx-company.png"
            alt=""
            className="auth-brand-logo"
            width={160}
            height={48}
          />
          <h2 className="auth-brand-headline">
            The connected dental workflow
          </h2>
          <p className="auth-brand-tagline">
            From scan to delivery — one ecosystem for every step of your
            digital dentistry practice.
          </p>

          <ul className="auth-brand-workflow">
            {WORKFLOW_STEPS.map((step, i) => (
              <li key={step} className="auth-brand-step">
                {i > 0 && <span className="auth-brand-step-arrow">→</span>}
                {step}
              </li>
            ))}
          </ul>

          <div className="auth-brand-trust">
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
