'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { sessionDestination } from '@/content/auth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import SocialSignInButton from '@/components/auth/SocialSignInButton';
import {
  DEMO_ACCOUNTS,
  initAuthStore,
  login,
  loginAsGuest,
  loginWithGoogle,
  loginWithSocialDemo,
  startLinkedInSignIn,
  type SocialProvider,
} from '@/lib/auth';
import { isApiMode, isGoogleSignInEnabled } from '@/lib/config';
import { stashGoogleIdToken } from '@/lib/google-identity';
import { seedInboxForUser } from '@/lib/inbox-seed';

function safeNextPath(next: string | null): string | null {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return null;
  return next;
}

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const apiMode = isApiMode();
  const googleEnabled = isGoogleSignInEnabled();

  useEffect(() => {
    initAuthStore();
    if (search.get('reset') === '1') {
      setMsg('Password updated. Sign in with your new password.');
      setError(false);
    }
  }, [search]);

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setMsg('');
    setError(false);
  };

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
    // Inbox seed is localStorage-only; skip when auth is backed by Nest.
    if (!apiMode) seedInboxForUser(result.session);
    setMsg(
      apiMode
        ? `Signed in via API as ${result.session.name} (JWT stored).`
        : `Welcome back, ${result.session.name}.`,
    );
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

  const handleSocialResult = useCallback(
    (provider: SocialProvider, result: ReturnType<typeof loginWithSocialDemo>) => {
      if (!result.ok) {
        setMsg(result.error);
        setError(true);
        return;
      }
      if (!apiMode) seedInboxForUser(result.session);
      setMsg(
        `Signed in with ${provider === 'google' ? 'Google' : 'LinkedIn'} as ${result.session.name}.`,
      );
      setError(false);
      goAfterAuth(result.session);
    },
    [apiMode, goAfterAuth],
  );

  const onGoogleDemo = () => {
    handleSocialResult('google', loginWithSocialDemo('google'));
  };

  const onLinkedIn = () => {
    const result = startLinkedInSignIn();
    if (result === 'redirect') {
      setBusy(true);
      setMsg('Redirecting to LinkedIn…');
      setError(false);
      return;
    }
    handleSocialResult('linkedin', result);
  };

  const continueAsGuest = () => {
    loginAsGuest();
    router.push('/inbox');
  };

  return (
    <>
      <p
        className="auth-toast ok"
        role="status"
        style={{ marginBottom: '0.75rem' }}
      >
        {apiMode
          ? 'API mode — auth calls Nest at localhost:4000'
          : 'Demo mode — auth uses localStorage (no backend)'}
      </p>
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@clinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-inline">
          <label className="auth-check">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span>Remember me</span>
          </label>
          <Link className="auth-link" href="/forgot-password">Forgot?</Link>
        </div>
        <button type="submit" className="btn auth-submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
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
            <SocialSignInButton provider="linkedin" disabled={busy} onClick={onLinkedIn} />
          </>
        ) : (
          <div className="auth-social-row">
            <SocialSignInButton provider="google" disabled={busy} onClick={onGoogleDemo} />
            <SocialSignInButton provider="linkedin" disabled={busy} onClick={onLinkedIn} />
          </div>
        )}
      </div>

      <div className="auth-demo-accounts">
        <button
          type="button"
          className="auth-demo-toggle"
          aria-expanded={demoOpen}
          onClick={() => setDemoOpen((v) => !v)}
        >
          <span>
            {apiMode ? 'Seeded API accounts (same DB as Nest)' : 'Try a demo account'}
          </span>
          <svg
            className={`auth-demo-chev${demoOpen ? ' open' : ''}`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {demoOpen && (
          <>
            <ul className="auth-demo-list">
              {DEMO_ACCOUNTS.map((demo) => (
                <li key={demo.email}>
                  <button
                    type="button"
                    className="auth-demo-btn"
                    onClick={() => fillDemo(demo.email, demo.password)}
                  >
                    <span className="auth-demo-email">{demo.email}</span>
                    <span className="auth-demo-hint">{demo.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="auth-demo-pass">Password for all demos: <code>demo12345</code></p>
          </>
        )}
      </div>

      <div className="auth-alt">
        <button type="button" className="auth-link-btn" onClick={continueAsGuest}>
          Explore as guest →
        </button>
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
