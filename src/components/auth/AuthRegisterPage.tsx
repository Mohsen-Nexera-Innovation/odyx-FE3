'use client';

import { Suspense, useState } from 'react';
import type { RegisterRole } from '@/content/auth';
import AuthPageShell from './AuthPageShell';
import RegisterForm from './RegisterForm';

function RegisterFallback() {
  return <p className="auth-hint">Loading…</p>;
}

function accentForRole(role: RegisterRole | null): RegisterRole | 'default' {
  if (role === 'dentist') return 'dentist';
  if (role === 'lab') return 'lab';
  if (role === 'guest') return 'guest';
  return 'default';
}

export default function AuthRegisterPage() {
  const [role, setRole] = useState<RegisterRole | null>(null);

  return (
    <AuthPageShell
      title="Create account"
      subtitle="One profile. Your workflow."
      accent={accentForRole(role)}
      wide
    >
      <Suspense fallback={<RegisterFallback />}>
        <RegisterForm onRoleChange={setRole} />
      </Suspense>
    </AuthPageShell>
  );
}
