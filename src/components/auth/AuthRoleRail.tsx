'use client';

import type { AuthRole, UserRole } from '@/content/auth';

const ICONS: Record<UserRole, React.ReactNode> = {
  dentist: (
    <svg width="24" height="24" viewBox="0 0 24 28" fill="currentColor" aria-hidden>
      <path d="M7 1C4.2 1 2 3.2 2 6c0 1.9.5 3.4 1.1 5.4.5 1.8.8 3.6 1.1 5.8.2 1.7.4 3.8 1.4 3.8.9 0 1.1-1.8 1.4-3.3.3-1.9.5-3.2 1.5-3.2s1.2 1.3 1.5 3.2c.3 1.5.5 3.3 1.4 3.3 1 0 1.2-2.1 1.4-3.8.3-2.2.6-4 1.1-5.8C21.5 9.4 22 7.9 22 6c0-2.8-2.2-5-5-5-1.6 0-2.6.8-3.5.8S8.6 1 7 1z" />
    </svg>
  ),
  lab: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v4M8 7h8l-2 14H10L8 7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 21h12" strokeLinecap="round" />
    </svg>
  ),
  guest: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" strokeLinecap="round" />
    </svg>
  ),
};

export default function AuthRoleRail({
  roles,
  value,
  onChange,
}: {
  roles: AuthRole[];
  value: UserRole | null;
  onChange: (role: UserRole) => void;
}) {
  const activeIndex = value ? roles.findIndex((r) => r.id === value) : -1;
  const fillPct = activeIndex >= 0 && roles.length > 1
    ? `${(activeIndex / (roles.length - 1)) * 100}%`
    : '0%';

  return (
    <div className="auth-role-rail" role="radiogroup" aria-label="Your role">
      <div className="auth-role-icons-wrap">
        <div className="auth-role-track" aria-hidden>
          <span className="auth-role-fill" style={{ width: fillPct }} />
        </div>
        <div className="auth-role-icons">
          {roles.map((r) => {
            const on = value === r.id;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={r.label}
                className={`auth-role-node${on ? ' on' : ''}${r.accent === 'teal' ? ' teal' : ''}`}
                onClick={() => onChange(r.id)}
              >
                <span className="auth-role-icon">
                  <span className="auth-role-ring" aria-hidden />
                  {ICONS[r.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="auth-role-labels" aria-hidden={false}>
        {roles.map((r) => (
          <span
            key={r.id}
            className={`auth-role-name${value === r.id ? ' on' : ''}`}
          >
            {r.id === 'lab' ? 'Lab' : r.label.split(' ')[0]}
          </span>
        ))}
      </div>
    </div>
  );
}
