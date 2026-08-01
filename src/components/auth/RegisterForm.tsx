'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AUTH_ROLES,
  roleById,
  sessionDestination,
  type RegisterRole,
} from '@/content/auth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { loginWithGoogle, register } from '@/lib/auth';
import { isGoogleSignInEnabled } from '@/lib/config';
import { peekGoogleIdToken, stashGoogleIdToken } from '@/lib/google-identity';
import AuthRoleRail from './AuthRoleRail';

/* ── Inline SVG Icons ───────────────────────────────────────────────────── */
function UserIcon() {
  return (
    <svg className="auth-field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="7" r="4" />
      <path d="M2 18c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="auth-field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 4l8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="auth-field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="auth-field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="8" />
      <path d="M2 10h16M10 2c2.2 2.5 3.5 5.2 3.5 8s-1.3 5.5-3.5 8c-2.2-2.5-3.5-5.2-3.5-8s1.3-5.5 3.5-8z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className="auth-field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 18V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14" />
      <path d="M13 10h3a1 1 0 0 1 1 1v7" />
      <path d="M3 18h14" />
      <path d="M6 6h2M6 9h2M6 12h2M10 6h1M10 9h1" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
      <circle cx="10" cy="10" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8.7 3.6A8.3 8.3 0 0 1 10 3.5c5.5 0 9 6 9 6a15.8 15.8 0 0 1-1.8 2.5M5.7 5.2A14.6 14.6 0 0 0 1 10s3.5 6 9 6c1.8 0 3.4-.6 4.8-1.5" />
      <path d="M2 2l16 16" />
      <path d="M8.2 8.2a2.5 2.5 0 0 0 3.5 3.5" />
    </svg>
  );
}

/* ── Password strength helper ───────────────────────────────────────────── */
function getPasswordStrength(pw: string): { level: number; label: string } {
  if (!pw) return { level: 0, label: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { level: score, label: labels[score] || '' };
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function RegisterForm({ onRoleChange }: { onRoleChange?: (role: RegisterRole | null) => void }) {
  const router = useRouter();
  const search = useSearchParams();
  const initialRole = roleById(search.get('role'))?.id ?? null;
  const googleEnabled = isGoogleSignInEnabled();

  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [role, setRole] = useState<RegisterRole | null>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const roleMeta = useMemo(() => roleById(role ?? undefined), [role]);
  const pwStrength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (peekGoogleIdToken()) {
      router.replace('/complete-google');
    }
  }, [router]);

  useEffect(() => {
    const q = roleById(search.get('role'));
    if (q) {
      setRole(q.id);
      onRoleChange?.(q.id);
      setStep(1);
    }
  }, [search, onRoleChange]);

  const pickRole = (r: RegisterRole) => {
    setRole(r);
    onRoleChange?.(r);
    setMsg('');
    setError(false);
    setStep(1);
  };

  const onGoogleCredential = useCallback(
    async (idToken: string) => {
      setBusy(true);
      setMsg('');
      setError(false);
      const result = await loginWithGoogle({ idToken });
      setBusy(false);
      if (!result.ok) {
        if (result.needsRegistration) {
          stashGoogleIdToken(idToken);
          router.push('/complete-google');
          return;
        }
        setMsg(result.error);
        setError(true);
        return;
      }
      setMsg(`Signed in with Google as ${result.session.name}.`);
      setTimeout(() => router.push(sessionDestination(result.session)), 700);
    },
    [router],
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) {
      setMsg('Pick a role to continue.');
      setError(true);
      setStep(0);
      return;
    }
    if (!name.trim() || !email.trim() || password.length < 8) {
      setMsg('Name, email, and 8+ character password required.');
      setError(true);
      return;
    }
    if (role !== 'guest' && !org.trim()) {
      setMsg(`Add your ${roleMeta?.orgLabel.toLowerCase() || 'organization'}.`);
      setError(true);
      return;
    }
    if (!terms) {
      setMsg('Accept the terms to continue.');
      setError(true);
      return;
    }

    setBusy(true);
    setError(false);

    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      org: org.trim(),
      country: country.trim(),
    });
    setBusy(false);
    if (!result.ok) {
      setMsg(result.error);
      setError(true);
      return;
    }
    setMsg(`Account created — welcome, ${result.session.name}.`);
    setTimeout(() => router.push(sessionDestination(result.session)), 900);
  };

  return (
    <>
      <AuthRoleRail roles={AUTH_ROLES} value={role} onChange={pickRole} />

      {step >= 1 && roleMeta && (
        <form className="auth-form auth-form-register" onSubmit={submit}>
          <div className="auth-form-grid">
            {/* Full name */}
            <div className="auth-field has-icon">
              <label htmlFor="reg-name">Full name</label>
              <UserIcon />
              <input
                id="reg-name"
                autoComplete="name"
                placeholder="Dr. Sarah Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="auth-field has-icon">
              <label htmlFor="reg-email">Email</label>
              <EmailIcon />
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password with toggle + strength */}
            <div className="auth-field has-icon">
              <label htmlFor="reg-pass">Password</label>
              <LockIcon />
              <input
                id="reg-pass"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '52px' }}
              />
              <button
                type="button"
                className="auth-field-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              {password.length > 0 && (
                <>
                  <div className="auth-strength">
                    <span
                      className="auth-strength-fill"
                      data-level={pwStrength.level}
                    />
                  </div>
                  <span
                    className="auth-strength-label"
                    data-level={pwStrength.level}
                  >
                    {pwStrength.label}
                  </span>
                </>
              )}
            </div>

            {/* Country */}
            <div className="auth-field has-icon">
              <label htmlFor="reg-country">Country</label>
              <GlobeIcon />
              <input
                id="reg-country"
                autoComplete="country-name"
                placeholder="Egypt"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          {/* Organization (conditional) */}
          {role !== 'guest' && (
            <div className="auth-field has-icon">
              <label htmlFor="reg-org">{roleMeta.orgLabel}</label>
              <BuildingIcon />
              <input
                id="reg-org"
                placeholder={roleMeta.orgPlaceholder}
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </div>
          )}

          <label className="auth-check auth-check-block">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <span>
              I agree to the <Link href="/about">Terms</Link> &amp;{' '}
              <Link href="/about">Privacy</Link>
            </span>
          </label>

          <button type="submit" className="btn auth-submit" disabled={busy}>
            {busy ? (
              <>
                <span className="auth-spinner" />
                Creating…
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>
      )}

      {googleEnabled && (
        <div className="auth-google">
          <div className="auth-divider" role="separator">
            <span>or sign up with Google</span>
          </div>
          <GoogleSignInButton
            text="signup_with"
            disabled={busy}
            onCredential={onGoogleCredential}
            onError={(message) => {
              setMsg(message);
              setError(true);
            }}
          />
          <p className="auth-google-hint">
            You'll confirm clinic details on the next step. Password is optional
            there.
          </p>
        </div>
      )}

      {msg && (
        <p className={`auth-toast${error ? '' : ' ok'}`} role="status">
          {msg}
        </p>
      )}

      <p className="auth-switch">
        Have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
