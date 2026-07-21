'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import AuthRoleRail from '@/components/auth/AuthRoleRail';
import {
  AUTH_ROLES,
  registerRoleToClientType,
  sessionDestination,
  type RegisterRole,
} from '@/content/auth';
import { loginWithGoogle } from '@/lib/auth';
import {
  clearGoogleIdToken,
  decodeGoogleIdToken,
  peekGoogleIdToken,
} from '@/lib/google-identity';

const CLIENT_ROLES = AUTH_ROLES.filter((r) => r.id !== 'guest');

export default function CompleteGoogleForm() {
  const router = useRouter();
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<RegisterRole | null>(null);
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const profile = useMemo(
    () => (idToken ? decodeGoogleIdToken(idToken) : null),
    [idToken],
  );
  const roleMeta = useMemo(
    () => CLIENT_ROLES.find((r) => r.id === role),
    [role],
  );

  useEffect(() => {
    const token = peekGoogleIdToken();
    if (!token) {
      router.replace('/login');
      return;
    }
    setIdToken(token);
  }, [router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!idToken) {
      setMsg('Google session expired. Sign in with Google again.');
      setError(true);
      return;
    }
    if (!role || role === 'guest') {
      setMsg('Choose Dentist or Lab to continue.');
      setError(true);
      return;
    }
    if (!org.trim()) {
      setMsg(`Add your ${roleMeta?.orgLabel.toLowerCase() || 'organization'}.`);
      setError(true);
      return;
    }
    if (password && password.length < 8) {
      setMsg('Password must be at least 8 characters, or leave it blank.');
      setError(true);
      return;
    }
    if (password && password !== confirm) {
      setMsg('Passwords do not match.');
      setError(true);
      return;
    }
    if (!terms) {
      setMsg('Accept the terms to continue.');
      setError(true);
      return;
    }

    const clientType = registerRoleToClientType(role);
    if (!clientType) {
      setMsg('Choose Dentist or Lab to continue.');
      setError(true);
      return;
    }

    setBusy(true);
    setError(false);
    const result = await loginWithGoogle({
      idToken,
      clientType,
      org: org.trim(),
      country: country.trim() || undefined,
      phone: phone.trim() || undefined,
      password: password.trim() || undefined,
    });
    setBusy(false);

    if (!result.ok) {
      setMsg(result.error);
      setError(true);
      return;
    }

    clearGoogleIdToken();
    setMsg(`Welcome, ${result.session.name}.`);
    setTimeout(() => router.push(sessionDestination(result.session)), 700);
  };

  if (!idToken) {
    return <p className="auth-hint">Loading Google profile…</p>;
  }

  return (
    <>
      <div className="auth-google-profile">
        {profile?.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="auth-google-avatar"
            src={profile.picture}
            alt=""
            width={48}
            height={48}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="auth-google-avatar auth-google-avatar-fallback" aria-hidden>
            {(profile?.name || profile?.email || '?').slice(0, 1).toUpperCase()}
          </span>
        )}
        <div className="auth-google-profile-text">
          <p className="auth-google-name">{profile?.name || 'Google account'}</p>
          <p className="auth-google-email">{profile?.email || '—'}</p>
          <p className="auth-google-locked">From Google — not editable here</p>
        </div>
      </div>

      <AuthRoleRail
        roles={CLIENT_ROLES}
        value={role}
        onChange={(r) => {
          setRole(r);
          setMsg('');
          setError(false);
        }}
      />

      <form className="auth-form auth-form-register" onSubmit={submit}>
        {roleMeta && (
          <div className="auth-field">
            <label htmlFor="cg-org">{roleMeta.orgLabel}</label>
            <input
              id="cg-org"
              placeholder={roleMeta.orgPlaceholder}
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              required
            />
          </div>
        )}

        <div className="auth-form-grid">
          <div className="auth-field">
            <label htmlFor="cg-country">Country</label>
            <input
              id="cg-country"
              autoComplete="country-name"
              placeholder="Egypt"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="cg-phone">Phone</label>
            <input
              id="cg-phone"
              autoComplete="tel"
              placeholder="+20…"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="cg-pass">Password (optional)</label>
            <input
              id="cg-pass"
              type="password"
              autoComplete="new-password"
              placeholder="8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="cg-confirm">Confirm password</label>
            <input
              id="cg-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat if set"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
        </div>

        <p className="auth-google-hint">
          Skip password to use Google only. Add one if you also want email sign-in.
        </p>

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

        <button type="submit" className="btn auth-submit" disabled={busy || !role}>
          {busy ? 'Creating…' : 'Complete account'}
        </button>
      </form>

      {msg && (
        <p className={`auth-toast${error ? '' : ' ok'}`} role="status">
          {msg}
        </p>
      )}

      <p className="auth-switch">
        <Link href="/login">Back to sign in</Link>
      </p>
    </>
  );
}
