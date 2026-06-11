import type { Metadata } from 'next';
import AuthPageShell from '@/components/auth/AuthPageShell';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Forgot password | ODYX',
  description: 'Reset your ODYX account password.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthPageShell title="Reset password" subtitle="We'll email you a link">
        <ForgotPasswordForm />
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
