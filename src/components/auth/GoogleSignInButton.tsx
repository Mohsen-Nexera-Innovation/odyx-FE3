'use client';

import { useEffect, useRef } from 'react';
import { getGoogleClientId } from '@/lib/config';
import { renderGoogleButton } from '@/lib/google-identity';

type Props = {
  text?: 'signin_with' | 'signup_with' | 'continue_with';
  onCredential: (idToken: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
};

export default function GoogleSignInButton({
  text = 'continue_with',
  onCredential,
  onError,
  disabled = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onCredentialRef.current = onCredential;
    onErrorRef.current = onError;
  }, [onCredential, onError]);

  useEffect(() => {
    const host = hostRef.current;
    const clientId = getGoogleClientId();
    if (!host || !clientId || disabled) return;

    let cancelled = false;
    void renderGoogleButton(host, {
      clientId,
      text,
      onCredential: (token) => {
        if (!cancelled) onCredentialRef.current(token);
      },
      onError: (message) => {
        if (!cancelled) onErrorRef.current?.(message);
      },
    }).catch((err) => {
      if (!cancelled) {
        onErrorRef.current?.(
          err instanceof Error ? err.message : 'Google sign-in failed to load.',
        );
      }
    });

    return () => {
      cancelled = true;
      host.innerHTML = '';
    };
  }, [text, disabled]);

  return (
    <div
      className={`auth-google-btn${disabled ? ' is-disabled' : ''}`}
      ref={hostRef}
      aria-busy={disabled || undefined}
    />
  );
}
