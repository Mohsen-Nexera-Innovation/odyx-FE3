'use client';

import Link from 'next/link';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';

const TILES = [
  {
    href: '/admin/users',
    perm: 'users.invite',
    title: 'Staff',
    desc: 'Invite teammates and assign dynamic roles.',
    cta: 'Manage staff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3.5 19c.8-3.2 2.8-4.8 5.5-4.8S13.7 15.8 14.5 19" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M16 14.2c2 .3 3.4 1.5 4 3.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/admin/roles',
    perm: 'roles.manage',
    title: 'Roles & permissions',
    desc: 'Build named roles from the permission catalog.',
    cta: 'Edit roles',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 3l8 4v5c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V7l8-4z" strokeLinejoin="round" />
        <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/admin/orders',
    perm: 'orders.read',
    title: 'Orders',
    desc: 'Confirm payments and move shipments forward.',
    cta: 'View orders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M6 6h15l-1.5 9H7.2L6 6z" strokeLinejoin="round" />
        <path d="M6 6L5 3H2" strokeLinecap="round" />
        <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '/admin/clients',
    perm: 'clients.read',
    title: 'Clients',
    desc: 'Browse dentists, labs, and other buyers.',
    cta: 'Open directory',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V7" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    href: '/admin/chat',
    perm: 'chat.reply',
    title: 'Client chat',
    desc: 'Reply to inbox conversations from leads and clients.',
    cta: 'Open inbox',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M5 18l-1.5 3.2L8 18h8.5A4.5 4.5 0 0021 13.5v-3A4.5 4.5 0 0016.5 6H7.5A4.5 4.5 0 003 10.5V15" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

function displayFirstName(name?: string) {
  if (!name?.trim()) return '';
  const parts = name.trim().split(/\s+/);
  // Avoid awkward "Welcome back, ODYX" when name is "ODYX Owner"
  if (parts[0].toUpperCase() === 'ODYX' && parts[1]) return parts[1];
  return parts[0];
}

export default function AdminHomePage() {
  const { session } = useAuthSession();
  const fullAccess =
    session?.staffRank === 'OWNER' ||
    session?.staffRank === 'SUPER_ADMIN' ||
    Boolean(session?.permissions?.includes('*'));

  const rankLabel =
    session?.staffRank === 'SUPER_ADMIN'
      ? 'Super Admin'
      : session?.staffRank === 'OWNER'
        ? 'Owner'
        : session?.roleName || 'Staff';

  const tiles = TILES.filter((t) => hasPermission(session, t.perm));
  const firstName = displayFirstName(session?.name);

  return (
    <>
      <div className="admin-page-head">
        <div className="admin-welcome">
          <div>
            <h1>Welcome back{firstName ? `, ${firstName}` : ''}</h1>
            <p className="admin-sub">
              Manage staffing, commerce, and client support from one place.
            </p>
          </div>
          <div className="admin-meta-row">
            {fullAccess ? <span className="admin-badge">Full access</span> : null}
            <span className="admin-stat-chip">
              Role <em>{rankLabel}</em>
            </span>
            {session?.email ? (
              <span className="admin-stat-chip">
                Account <em>{session.email}</em>
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {tiles.length > 0 ? (
        <div className="admin-tile-grid">
          {tiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className="admin-tile">
              <span className="admin-tile-icon">{tile.icon}</span>
              <strong>{tile.title}</strong>
              <p>{tile.desc}</p>
              <span className="admin-tile-cta">{tile.cta} →</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="admin-card">
          <p className="admin-muted">
            Your role has no admin modules yet. Ask an Owner to assign permissions.
          </p>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>How access works</h2>
        </div>
        <p className="admin-muted">
          Owners and Super Admins always have every permission. Other staff only see modules
          granted by their assigned role.
        </p>
      </div>
    </>
  );
}
