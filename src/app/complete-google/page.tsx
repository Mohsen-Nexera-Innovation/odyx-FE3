import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import CompleteGoogleForm from '@/components/auth/CompleteGoogleForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Complete Google signup | ODYX',
  description: 'Finish your ODYX account after signing in with Google.',
};

export default function CompleteGooglePage() {
  return (
    <>
      <AuthPageShell
        title="Finish your account"
        subtitle="We pulled your name and email from Google. Add the rest below."
        wide
      >
        <Suspense fallback={<p className="auth-hint">Loading…</p>}>
          <CompleteGoogleForm />
        </Suspense>
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
