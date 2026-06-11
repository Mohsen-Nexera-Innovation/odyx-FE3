import type { Metadata } from 'next';
import AuthRegisterPage from '@/components/auth/AuthRegisterPage';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Create account | ODYX',
  description: 'Register for ODYX — dentist, lab, or guest.',
};

export default function RegisterPage() {
  return (
    <>
      <AuthRegisterPage />
      <InnerPageMotion />
    </>
  );
}
