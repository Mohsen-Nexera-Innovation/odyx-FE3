'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.');
      return;
    }

    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSent(true);
      setMsg(`If an account exists for ${value}, you'll receive reset instructions shortly.`);
    }, 700);
  };

  return (
    <>
      {!sent ? (
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="you@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn auth-submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      ) : (
        <div className="auth-forgot-done">
          <p className="auth-forgot-lead">Check your inbox</p>
          <p className="auth-forgot-note">
            The link expires in 24 hours. Didn&apos;t get it? Check spam or try again.
          </p>
          <button
            type="button"
            className="btn btn-ghost auth-submit"
            onClick={() => {
              setSent(false);
              setMsg('');
            }}
          >
            Try another email
          </button>
        </div>
      )}

      {error && <p className="auth-toast" role="alert">{error}</p>}
      {msg && <p className="auth-toast ok" role="status">{msg}</p>}

      <p className="auth-switch">
        <Link href="/login">← Back to sign in</Link>
      </p>
    </>
  );
}
