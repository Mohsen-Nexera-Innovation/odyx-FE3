import Link from 'next/link';
import type { UserRole } from '@/content/auth';

const ACCENT: Record<UserRole | 'default', string> = {
  default: 'sky',
  dentist: 'teal',
  lab: 'orange',
  guest: 'sky',
  admin: 'sky',
};

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
    <div className="auth-page" data-accent={ACCENT[accent]} data-wide={wide ? 'true' : undefined}>
      <div className="auth-ambient" aria-hidden>
        <span className="auth-orb auth-orb-a" />
        <span className="auth-orb auth-orb-b" />
        <span className="auth-orb auth-orb-c" />
        <span className="auth-grid" />
      </div>

      <div className="auth-center">
        <div className="auth-card">
          <Link href="/" className="auth-logo" aria-label="ODYX home">
            <img src="/brand/odyx-company.png" alt="" width={120} height={40} />
          </Link>
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-sub">{subtitle}</p>}
          {children}
          {foot}
        </div>
      </div>
    </div>
  );
}
