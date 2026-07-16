'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import { acceptInvite } from '@/lib/auth';
import { sessionDestination } from '@/content/auth';

function AcceptInviteForm() {
  const search = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(search.get('token') || '');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const result = await acceptInvite({
      token: token.trim(),
      name: name.trim(),
      password,
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(sessionDestination(result.session));
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="auth-field">
        <label htmlFor="invite-token">Invite token</label>
        <input
          id="invite-token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </div>
      <div className="auth-field">
        <label htmlFor="invite-name">Full name</label>
        <input
          id="invite-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="auth-field">
        <label htmlFor="invite-password">Password</label>
        <input
          id="invite-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </div>
      <button type="submit" className="btn auth-submit" disabled={busy}>
        {busy ? 'Activating…' : 'Activate staff account'}
      </button>
      {error && <p className="auth-toast err">{error}</p>}
      <p className="auth-switch">
        Already active? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}

export default function AcceptInvitePage() {
  return (
    <AuthPageShell
      title="Accept staff invite"
      subtitle="Set your name and password to join the Odyx team."
    >
      <Suspense fallback={<p className="auth-hint">Loading…</p>}>
        <AcceptInviteForm />
      </Suspense>
    </AuthPageShell>
  );
}
