export type UserRole = 'dentist' | 'lab' | 'guest';

export interface AuthRole {
  id: UserRole;
  label: string;
  short: string;
  desc: string;
  accent: 'teal' | 'orange';
  href: string;
  perks: string[];
  orgLabel: string;
  orgPlaceholder: string;
  verifyNote?: string;
}

export const AUTH_ROLES: AuthRole[] = [
  {
    id: 'dentist',
    label: 'Dentist',
    short: 'Clinic & chairside',
    desc: 'Same-day restorations, implant guides, and a guided chairside workflow.',
    accent: 'teal',
    href: '/solutions/dentists',
    orgLabel: 'Clinic name',
    orgPlaceholder: 'Your practice name',
    verifyNote: 'Optional license upload unlocks clinical courses and case submission faster.',
    perks: [
      'Registered clinical courses & academy',
      'Device warranty linked to your clinic',
      'Case library access and submission',
      'Priority chairside support',
    ],
  },
  {
    id: 'lab',
    label: 'Lab technician',
    short: 'Production & throughput',
    desc: 'High-volume printing, nesting, and lab workflow tools built for accuracy.',
    accent: 'orange',
    href: '/solutions/labs',
    orgLabel: 'Lab name',
    orgPlaceholder: 'Your dental lab',
    verifyNote: 'Lab verification helps unlock production resources and bulk support.',
    perks: [
      'Lab workflow hub & material guides',
      'Firmware and software update alerts',
      'Production troubleshooting priority',
      'Submit and browse lab case studies',
    ],
  },
  {
    id: 'guest',
    label: 'Guest',
    short: 'Explore first',
    desc: 'Browse the ecosystem, workflows, and learning previews — upgrade anytime.',
    accent: 'orange',
    href: '/workflows',
    orgLabel: 'Organization (optional)',
    orgPlaceholder: 'Clinic, lab, or company',
    perks: [
      'Full workflow tour and product explorer',
      'Beginner learning previews',
      'Demo and brochure requests',
      'Upgrade to unlock courses & warranty',
    ],
  },
];

export function roleById(id: string | null | undefined): AuthRole | undefined {
  if (!id) return undefined;
  return AUTH_ROLES.find((r) => r.id === id);
}

export function roleDestination(role: UserRole): string {
  if (role === 'dentist') return '/solutions/dentists';
  if (role === 'lab') return '/solutions/labs';
  return '/workflows';
}

export const AUTH_STORAGE_KEY = 'odyx_account';
