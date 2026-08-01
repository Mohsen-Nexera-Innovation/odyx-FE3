'use client';

import { useCallback, useEffect, useRef } from 'react';
import SocialSignInButton from '@/components/auth/SocialSignInButton';
import { getGoogleClientId } from '@/lib/config';
import { renderGoogleButton } from '@/lib/google-identity';

type Props = {
  text?: 'signin_with' | 'signup_with' | 'continue_with';
  onCredential: (idToken: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
};

const VISIBLE_LABEL: Record<
  NonNullable<Props['text']>,
  string
> = {
  continue_with: 'Continue with Google',
  signup_with: 'Sign up with Google',
  signin_with: 'Sign in with Google',
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

  const triggerGoogleSignIn = useCallback(() => {
    if (disabled) return;
    const host = hostRef.current;
    if (!host) {
      onErrorRef.current?.('Google sign-in is not ready yet.');
      return;
    }
    const googleBtn = host.querySelector<HTMLElement>('[role="button"]');
    if (!googleBtn) {
      onErrorRef.current?.('Google sign-in is not ready yet.');
      return;
    }
    googleBtn.click();
  }, [disabled]);

  return (
    <div className="auth-google-wrap">
      <SocialSignInButton
        provider="google"
        label={VISIBLE_LABEL[text]}
        disabled={disabled}
        onClick={triggerGoogleSignIn}
      />
      <div ref={hostRef} className="auth-google-host" aria-hidden="true" />
    </div>
  );
}
