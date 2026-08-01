'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { sessionDestination } from '@/content/auth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import SocialSignInButton from '@/components/auth/SocialSignInButton';
import { login, loginWithGoogle, startLinkedInSignIn } from '@/lib/auth';
import { isGoogleSignInEnabled } from '@/lib/config';

/* ── Inline SVG Icons ───────────────────────────────────────────────────── */
function EmailIcon() {
  return (
    <svg
      className="auth-field-icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2 4l8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="auth-field-icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="9" width="12" height="8" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
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

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function safeNextPath(next: string | null): string | null {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return null;
  return next;
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const googleEnabled = isGoogleSignInEnabled();

  useEffect(() => {
    if (search.get('reset') === '1') {
      setMsg('Password updated. Sign in with your new password.');
      setError(false);
    }
  }, [search]);

  const goAfterAuth = useCallback(
    (session: Parameters<typeof sessionDestination>[0]) => {
      const next = safeNextPath(search.get('next'));
      const dest =
        next &&
        (session.accountType === 'STAFF' || !next.startsWith('/admin'))
          ? next
          : sessionDestination(session);
      setTimeout(() => router.push(dest), 700);
    },
    [router, search],
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMsg('Email and password required.');
      setError(true);
      return;
    }
    setBusy(true);
    setMsg('');
    setError(false);

    const result = await login(email.trim(), password);
    setBusy(false);
    if (!result.ok) {
      setMsg(result.error);
      setError(true);
      return;
    }
    setMsg(`Welcome back, ${result.session.name}.`);
    goAfterAuth(result.session);
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
          const { stashGoogleIdToken } = await import('@/lib/google-identity');
          stashGoogleIdToken(idToken);
          setMsg('Almost done — add your clinic details.');
          setError(false);
          router.push('/complete-google');
          return;
        }
        setMsg(result.error);
        setError(true);
        return;
      }
      setMsg(`Signed in with Google as ${result.session.name}.`);
      goAfterAuth(result.session);
    },
    [goAfterAuth, router],
  );

  const onLinkedIn = () => {
    startLinkedInSignIn();
    setBusy(true);
    setMsg('Redirecting to LinkedIn…');
    setError(false);
  };

  return (
    <>
      <form className="auth-form" onSubmit={submit}>
        {/* Email field with icon */}
        <div className="auth-field has-icon">
          <label htmlFor="login-email">Email</label>
          <EmailIcon />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@clinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password field with icon + visibility toggle */}
        <div className="auth-field has-icon">
          <label htmlFor="login-password">Password</label>
          <LockIcon />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
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
        </div>

        <div className="auth-inline">
          <label className="auth-check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <Link className="auth-link" href="/forgot-password">
            Forgot?
          </Link>
        </div>

        <button type="submit" className="btn auth-submit" disabled={busy}>
          {busy ? (
            <>
              <span className="auth-spinner" />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div className="auth-social">
        <div className="auth-divider" role="separator">
          <span>or continue with</span>
        </div>
        {googleEnabled ? (
          <>
            <GoogleSignInButton
              text="continue_with"
              disabled={busy}
              onCredential={onGoogleCredential}
              onError={(message) => {
                setMsg(message);
                setError(true);
              }}
            />
            <SocialSignInButton
              provider="linkedin"
              disabled={busy}
              onClick={onLinkedIn}
            />
          </>
        ) : (
          <SocialSignInButton
            provider="linkedin"
            disabled={busy}
            onClick={onLinkedIn}
          />
        )}
      </div>

      {msg && (
        <p className={`auth-toast${error ? ' err' : ' ok'}`} role="status">
          {msg}
        </p>
      )}

      <p className="auth-switch">
        No account? <Link href="/register">Create one</Link>
      </p>
    </>
  );
}
