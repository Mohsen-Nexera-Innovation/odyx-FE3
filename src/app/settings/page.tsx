import type { Metadata } from 'next';
import AuthPageShell from '@/components/auth/AuthPageShell';
import SettingsForm from '@/components/auth/SettingsForm';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Account settings | ODYX',
  description: 'Update your ODYX profile and password.',
};

export default function SettingsPage() {
  return (
    <>
      <AuthPageShell
        title="Account settings"
        subtitle="Profile and password"
        wide
      >
        <SettingsForm />
      </AuthPageShell>
      <InnerPageMotion />
    </>
  );
}
