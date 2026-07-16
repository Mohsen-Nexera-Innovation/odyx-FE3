/** Public register picker ids (client subtypes + guest). Not staff ranks. */
export type RegisterRole = 'dentist' | 'lab' | 'guest';

/** @deprecated Prefer accountType / clientType on AccountSession */
export type UserRole = RegisterRole | 'admin';

export type AccountType = 'STAFF' | 'CLIENT';
export type ClientType = 'DENTIST' | 'LAB' | 'OTHER';
export type StaffRank = 'SUPER_ADMIN' | 'OWNER' | 'STAFF';

export interface AuthRole {
  id: RegisterRole;
  label: string;
  short: string;
  desc: string;
  accent: 'teal' | 'orange';
  href: string;
  perks: string[];
  orgLabel: string;
  orgPlaceholder: string;
  verifyNote?: string;
  clientType: ClientType | null;
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
    clientType: 'DENTIST',
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
    clientType: 'LAB',
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
    clientType: null,
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

export function registerRoleToClientType(role: RegisterRole): ClientType | null {
  return roleById(role)?.clientType ?? null;
}

export function clientTypeToRegisterRole(
  clientType: ClientType | null | undefined,
): RegisterRole {
  if (clientType === 'LAB') return 'lab';
  if (clientType === 'DENTIST') return 'dentist';
  return 'dentist';
}

export function sessionDestination(session: {
  accountType: AccountType | 'GUEST';
}): string {
  if (session.accountType === 'STAFF') return '/admin';
  return '/inbox';
}

/** @deprecated Use sessionDestination(session) */
export function roleDestination(role: UserRole): string {
  if (role === 'admin') return '/admin';
  return '/inbox';
}

export const AUTH_STORAGE_KEY = 'odyx_account';
