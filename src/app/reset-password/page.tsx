import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Set new password | ODYX',
  description: 'Choose a new password for your ODYX account.',
};

export default function ResetPasswordPage() {
  return (
    <>
      <AuthPageShell title="Set new password" subtitle="Choose a strong password">
        <Suspense fallback={<p className="auth-hint">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
