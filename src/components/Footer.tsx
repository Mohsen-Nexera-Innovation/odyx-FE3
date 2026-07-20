'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Support', href: '/support' },
  { label: 'About', href: '/about' },
] as const;

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__row">
          <Link href="/" className="logo" aria-label="ODYX home">
            <img
              className="logo-img"
              src="/brand/odyx-company.png"
              alt="ODYX"
            />
          </Link>
          <nav className="site-footer__nav" aria-label="Footer">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© 2026 ODYX. All rights reserved.</span>
          <span>
            <Link href="/about">Privacy</Link>
            {' · '}
            <Link href="/about">Terms</Link>
            {' · '}
            <Link href="/support">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
