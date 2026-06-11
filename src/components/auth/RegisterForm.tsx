'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AUTH_ROLES,
  AUTH_STORAGE_KEY,
  roleById,
  roleDestination,
  type UserRole,
} from '@/content/auth';
import AuthRoleRail from './AuthRoleRail';

export default function RegisterForm({ onRoleChange }: { onRoleChange?: (role: UserRole | null) => void }) {
  const router = useRouter();
  const search = useSearchParams();
  const initialRole = roleById(search.get('role'))?.id ?? null;

  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const roleMeta = useMemo(() => roleById(role ?? undefined), [role]);

  useEffect(() => {
    const q = roleById(search.get('role'));
    if (q) {
      setRole(q.id);
      onRoleChange?.(q.id);
      setStep(1);
    }
  }, [search, onRoleChange]);

  const pickRole = (r: UserRole) => {
    setRole(r);
    onRoleChange?.(r);
    setMsg('');
    setStep(1);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!role) {
      setMsg('Pick a role to continue.');
      setStep(0);
      return;
    }
    if (!name.trim() || !email.trim() || password.length < 8) {
      setMsg('Name, email, and 8+ character password required.');
      return;
    }
    if (role !== 'guest' && !org.trim()) {
      setMsg(`Add your ${roleMeta?.orgLabel.toLowerCase() || 'organization'}.`);
      return;
    }
    if (!terms) {
      setMsg('Accept the terms to continue.');
      return;
    }

    setBusy(true);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        email: email.trim(),
        name: name.trim(),
        role,
        org: org.trim(),
        country: country.trim(),
        createdAt: new Date().toISOString(),
      }),
    );

    setTimeout(() => {
      setBusy(false);
      setMsg('Account created.');
      setTimeout(() => router.push(roleDestination(role)), 900);
    }, 700);
  };

  return (
    <>
      <AuthRoleRail roles={AUTH_ROLES} value={role} onChange={pickRole} />

      {step >= 1 && roleMeta && (
        <form className="auth-form auth-form-register" onSubmit={submit}>
          <div className="auth-form-grid">
            <div className="auth-field">
              <label htmlFor="reg-name">Full name</label>
              <input
                id="reg-name"
                autoComplete="name"
                placeholder="Dr. Sarah Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-pass">Password</label>
              <input
                id="reg-pass"
                type="password"
                autoComplete="new-password"
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="reg-country">Country</label>
              <input
                id="reg-country"
                autoComplete="country-name"
                placeholder="Egypt"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          {role !== 'guest' && (
            <div className="auth-field">
              <label htmlFor="reg-org">{roleMeta.orgLabel}</label>
              <input
                id="reg-org"
                placeholder={roleMeta.orgPlaceholder}
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </div>
          )}
          <label className="auth-check auth-check-block">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>
              I agree to the <Link href="/about">Terms</Link> &amp; <Link href="/about">Privacy</Link>
            </span>
          </label>
          <button type="submit" className="btn auth-submit" disabled={busy}>
            {busy ? 'Creating…' : 'Create account'}
          </button>
        </form>
      )}

      {msg && (
        <p className={`auth-toast${msg.includes('created') ? ' ok' : ''}`} role="status">
          {msg}
        </p>
      )}

      <p className="auth-switch">
        Have an account? <Link href="/login">Sign in</Link>
      </p>
    </>
  );
}
