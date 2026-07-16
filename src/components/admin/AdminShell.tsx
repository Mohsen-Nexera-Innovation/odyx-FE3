'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import AdminGate from './AdminGate';
import '@/app/admin.css';

const Icon = {
  overview: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  ),
  staff: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19c.8-3.2 2.8-4.8 5.5-4.8S13.7 15.8 14.5 19" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2 .3 3.4 1.5 4 3.8" strokeLinecap="round" />
    </svg>
  ),
  roles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3l8 4v5c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V7l8-4z" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  orders: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6h15l-1.5 9H7.2L6 6z" strokeLinejoin="round" />
      <path d="M6 6L5 3H2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  clients: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V7" />
      <path d="M3 12h18" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 18l-1.5 3.2L8 18h8.5A4.5 4.5 0 0021 13.5v-3A4.5 4.5 0 0016.5 6H7.5A4.5 4.5 0 003 10.5V15" strokeLinejoin="round" />
    </svg>
  ),
};

type NavLink = {
  href: string;
  label: string;
  perm: string | null;
  icon: React.ReactNode;
  section: string;
};

const LINKS: NavLink[] = [
  { href: '/admin', label: 'Overview', perm: null, icon: Icon.overview, section: 'Workspace' },
  { href: '/admin/users', label: 'Staff', perm: 'users.invite', icon: Icon.staff, section: 'Team' },
  { href: '/admin/roles', label: 'Roles', perm: 'roles.manage', icon: Icon.roles, section: 'Team' },
  { href: '/admin/orders', label: 'Orders', perm: 'orders.read', icon: Icon.orders, section: 'Commerce' },
  { href: '/admin/clients', label: 'Clients', perm: 'clients.read', icon: Icon.clients, section: 'Commerce' },
  { href: '/admin/chat', label: 'Chat', perm: 'chat.reply', icon: Icon.chat, section: 'Support' },
];

function initials(name?: string) {
  if (!name?.trim()) return 'OX';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return pathname.startsWith(href);
}

function groupLinks(links: NavLink[]) {
  const sections: { section: string; items: NavLink[] }[] = [];
  for (const link of links) {
    const last = sections[sections.length - 1];
    if (last && last.section === link.section) {
      last.items = [...last.items, link];
    } else {
      sections.push({ section: link.section, items: [link] });
    }
  }
  return sections;
}

function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useAuthSession();

  const visible = LINKS.filter((l) => !l.perm || hasPermission(session, l.perm));
  const sections = groupLinks(visible);

  const rankLabel =
    session?.staffRank === 'SUPER_ADMIN'
      ? 'Super Admin'
      : session?.staffRank === 'OWNER'
        ? 'Owner'
        : session?.roleName || 'Staff';

  return (
    <div className="admin-shell">
      <aside className="admin-nav" aria-label="Admin navigation">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-mark" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M4 12h16M12 4v16" strokeLinecap="round" />
              <circle cx="12" cy="12" r="8.5" />
            </svg>
          </span>
          <span className="admin-brand-text">
            <strong>ODYX Admin</strong>
            <span>Operations</span>
          </span>
        </Link>

        {sections.map((group) => (
          <div key={group.section}>
            <p className="admin-nav-section">{group.section}</p>
            {group.items.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="admin-nav-link"
                data-active={isActive(pathname, l.href) ? 'true' : 'false'}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="admin-nav-foot">
          <div className="admin-user-card">
            <span className="admin-user-avatar" aria-hidden>
              {initials(session?.name)}
            </span>
            <div className="admin-user-meta">
              <strong>{session?.name || 'Staff'}</strong>
              <span>{rankLabel}</span>
            </div>
          </div>
          <Link href="/" className="admin-nav-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to site
          </Link>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <AdminChrome>{children}</AdminChrome>
    </AdminGate>
  );
}
