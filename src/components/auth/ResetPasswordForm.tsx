'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { resetPassword } from '@/lib/auth';

export default function ResetPasswordForm() {
  const search = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(search.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token.trim()) {
      setError('Reset token is missing. Use the link from your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);
    const result = await resetPassword(token.trim(), password);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/login?reset=1');
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      {!search.get('token') && (
        <div className="auth-field">
          <label htmlFor="reset-token">Reset token</label>
          <input
            id="reset-token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
      )}
      <div className="auth-field">
        <label htmlFor="reset-password">New password</label>
        <input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </div>
      <div className="auth-field">
        <label htmlFor="reset-confirm">Confirm password</label>
        <input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={8}
          required
        />
      </div>
      <button type="submit" className="btn auth-submit" disabled={busy}>
        {busy ? 'Saving…' : 'Set new password'}
      </button>
      {error && (
        <p className="auth-toast err" role="alert">
          {error}
        </p>
      )}
      <p className="auth-switch">
        <Link href="/login">← Back to sign in</Link>
      </p>
    </form>
  );
}
