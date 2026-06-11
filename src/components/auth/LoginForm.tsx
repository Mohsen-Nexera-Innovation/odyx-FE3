'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { AUTH_STORAGE_KEY, roleDestination, type UserRole } from '@/content/auth';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const finishLogin = (role: UserRole, name: string) => {
    const payload = { email, name, role, loggedInAt: new Date().toISOString() };
    if (remember) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
    setMsg(`Welcome back${name ? `, ${name}` : ''}.`);
    setTimeout(() => router.push(roleDestination(role)), 800);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMsg('Email and password required.');
      return;
    }
    setBusy(true);
    setMsg('');

    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const account = JSON.parse(saved) as { email?: string; name?: string; role?: UserRole };
        if (account.email?.toLowerCase() === email.trim().toLowerCase() && account.role) {
          finishLogin(account.role, account.name || '');
          return;
        }
      } catch {
        /* demo */
      }
    }

    setTimeout(() => {
      finishLogin('guest', email.split('@')[0] || 'Guest');
      setBusy(false);
    }, 600);
  };

  const continueAsGuest = () => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ email: '', name: 'Guest', role: 'guest', loggedInAt: new Date().toISOString() }),
    );
    router.push('/workflows');
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

      <div className="auth-alt">
        <button type="button" className="auth-link-btn" onClick={continueAsGuest}>
          Explore as guest →
        </button>
      </div>

      {msg && <p className="auth-toast ok" role="status">{msg}</p>}

      <p className="auth-switch">
        No account? <Link href="/register">Create one</Link>
      </p>
    </>
  );
}
