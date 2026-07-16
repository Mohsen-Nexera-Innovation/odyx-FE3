import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPageShell from '@/components/auth/AuthPageShell';
import LoginForm from '@/components/auth/LoginForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Sign in | ODYX',
  description: 'Sign in to your ODYX account.',
};

export default function LoginPage() {
  return (
    <>
      <AuthPageShell title="Sign in" subtitle="Dentist · Lab · Guest" wide>
        <Suspense fallback={<p className="auth-hint">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
