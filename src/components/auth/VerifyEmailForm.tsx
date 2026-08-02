'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { sessionDestination } from '@/content/auth';
import { resendVerification, verifyEmail } from '@/lib/auth';

export default function VerifyEmailForm() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get('token')?.trim() || '';
  const attempted = useRef(false);

  const [status, setStatus] = useState<'idle' | 'verifying' | 'ok' | 'error'>(
    token ? 'verifying' : 'error',
  );
  const [msg, setMsg] = useState(
    token ? 'Verifying your email…' : 'Verification link is missing or invalid.',
  );
  const [email, setEmail] = useState('');
  const [resendBusy, setResendBusy] = useState(false);

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;

    let cancelled = false;
    (async () => {
      const result = await verifyEmail(token);
      if (cancelled) return;
      if (!result.ok) {
        setStatus('error');
        setMsg(result.error);
        return;
      }
      setStatus('ok');
      setMsg(`Email verified — welcome, ${result.session.name}.`);
      setTimeout(() => router.push(sessionDestination(result.session)), 900);
    })();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  const onResend = async () => {
    if (!email.trim()) {
      setMsg('Enter the email you used to register.');
      setStatus('error');
      return;
    }
    setResendBusy(true);
    const result = await resendVerification(email.trim());
    setResendBusy(false);
    if (!result.ok) {
      setMsg(result.error);
      setStatus('error');
      return;
    }
    setStatus('idle');
    setMsg('If an unverified account exists for that email, a new link was sent.');
  };

  return (
    <div className="auth-form">
      <p className={`auth-toast${status === 'error' ? '' : ' ok'}`} role="status">
        {msg}
      </p>

      {status === 'verifying' && (
        <p className="auth-hint">
          <span className="auth-spinner" /> Confirming your verification link…
        </p>
      )}

      {status === 'error' && (
        <>
          <div className="auth-field">
            <label htmlFor="verify-email">Email</label>
            <input
              id="verify-email"
              type="email"
              autoComplete="email"
              placeholder="you@clinic.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn auth-submit"
            disabled={resendBusy}
            onClick={onResend}
          >
            {resendBusy ? (
              <>
                <span className="auth-spinner" />
                Sending…
              </>
            ) : (
              'Resend verification email'
            )}
          </button>
        </>
      )}

      <p className="auth-switch">
        Back to <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}
