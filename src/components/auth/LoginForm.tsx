'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useCallback, useEffect, useState } from 'react';
import { sessionDestination } from '@/content/auth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import SocialSignInButton from '@/components/auth/SocialSignInButton';
import { login, loginWithGoogle, startLinkedInSignIn } from '@/lib/auth';
import { isGoogleSignInEnabled } from '@/lib/config';

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
          <SocialSignInButton provider="linkedin" disabled={busy} onClick={onLinkedIn} />
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
