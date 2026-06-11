'use client';

import { Suspense, useState } from 'react';
import type { UserRole } from '@/content/auth';
import AuthPageShell from './AuthPageShell';
import RegisterForm from './RegisterForm';

function RegisterFallback() {
  return <p className="auth-hint">Loading…</p>;
}

function accentForRole(role: UserRole | null): UserRole | 'default' {
  if (role === 'dentist') return 'dentist';
  if (role === 'lab') return 'lab';
  if (role === 'guest') return 'guest';
  return 'default';
}

export default function AuthRegisterPage() {
  const [role, setRole] = useState<UserRole | null>(null);

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
