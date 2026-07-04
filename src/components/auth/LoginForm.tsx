'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import { roleDestination } from '@/content/auth';
import { DEMO_ACCOUNTS, initAuthStore, login, loginAsGuest } from '@/lib/auth-store';
import { seedInboxForUser } from '@/lib/inbox-seed';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    initAuthStore();
  }, []);

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setMsg('');
    setError(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMsg('Email and password required.');
      setError(true);
      return;
    }
    setBusy(true);
    setMsg('');
    setError(false);

    setTimeout(() => {
      const result = login(email.trim(), password);
      setBusy(false);
      if (!result.ok) {
        setMsg(result.error);
        setError(true);
        return;
      }
      seedInboxForUser(result.session);
      setMsg(`Welcome back, ${result.session.name}.`);
      setTimeout(() => router.push(roleDestination(result.session.role)), 700);
    }, 400);
  };

  const continueAsGuest = () => {
    loginAsGuest();
    router.push('/inbox');
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

      <div className="auth-demo-accounts">
        <p className="auth-demo-label">Try a demo account</p>
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
