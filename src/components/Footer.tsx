'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Intraoral Scanners', href: '/products/intraoral-scanner' },
      { label: 'Digital Products', href: '/products/design' },
      { label: '3D Printers', href: '/products/3d-printers' },
      { label: 'Curing Machines', href: '/products/curing-machines' },
      { label: 'Resin', href: '/products/Resin' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Dentists', href: '/solutions/dentists' },
      { label: 'For Dental Labs', href: '/solutions/labs' },
      { label: 'Clinical Applications', href: '/#clinical' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { label: 'Academy', href: '/learning' },
      { label: 'Webinars', href: '/learning#videos' },
      { label: 'Guides', href: '/learning#articles' },
      { label: 'Cases', href: '/#cases-preview' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'Manuals', href: '/support#manuals' },
      { label: 'FAQs', href: '/support#troubleshooting' },
      { label: 'Warranty', href: '/support#warranty' },
      { label: 'Design Services', href: '/design-services' },
      { label: 'Store', href: '/shop' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'News', href: '/#news' },
      { label: 'Contact', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/about#privacy' },
      { label: 'Terms', href: '/about#terms' },
      { label: 'Cookie Policy', href: '/about#cookies' },
    ],
  },
] as const;

const SOCIAL = [
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'YouTube', href: '#', icon: 'yt' },
  { label: 'Facebook', href: '#', icon: 'fb' },
  { label: 'Instagram', href: '#', icon: 'ig' },
] as const;

function SocialIcon({ kind }: { kind: (typeof SOCIAL)[number]['icon'] }) {
  if (kind === 'in') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-3.8V8.5z" />
      </svg>
    );
  }
  if (kind === 'yt') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    );
  }
  if (kind === 'fb') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="logo" aria-label="ODYX home">
              <img
                className="logo-img"
                src="/brand/odyx-company.png"
                alt="ODYX"
              />
            </Link>
            <p className="site-footer__tag">Digital dentistry, end to end.</p>
            <div className="site-footer__social" aria-label="Social media">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="site-footer__social-link">
                  <SocialIcon kind={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <nav className="site-footer__grid" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.title} className="site-footer__col">
                <p className="site-footer__col-title">{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© 2026 ODYX. All rights reserved.</span>
          <span>
            <Link href="/about#privacy">Privacy</Link>
            {' · '}
            <Link href="/about#terms">Terms</Link>
            {' · '}
            <Link href="/support">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
