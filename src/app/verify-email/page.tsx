import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Verify email | ODYX',
  description: 'Confirm your ODYX account email address.',
};

export default function VerifyEmailPage() {
  return (
    <>
      <AuthPageShell title="Verify email" subtitle="Finish creating your account">
        <Suspense fallback={<p className="auth-hint">Loading…</p>}>
          <VerifyEmailForm />
        </Suspense>
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
