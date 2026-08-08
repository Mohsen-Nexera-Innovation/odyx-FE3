'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Hv2Footer from '@/components/home2/Hv2Footer';
import { isAuthShellPath } from '@/content/auth';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Intraoral Scanners', href: '/products/odyx-s1-intraoral-scanner' },
      { label: 'Design Services', href: '/design-services' },
      { label: '3D Printers', href: '/products/odyx-p1-26' },
      { label: 'ODYX Cure', href: '/products/curing-machines' },
      { label: 'Resins', href: '/products/resins' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Dentists', href: '/solutions/dentists' },
      { label: 'For Dental Labs', href: '/solutions/labs' },
      { label: 'Clinical Applications', href: '/solutions/clinical-applications' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { label: 'Academy', href: '/learning' },
      { label: 'Webinars', href: '/learning#videos' },
      { label: 'Guides', href: '/learning#articles' },
      { label: 'Cases', href: '/cases' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'Manuals', href: '/support/manuals' },
      { label: 'Downloads', href: '/support/downloads' },
      { label: 'FAQs', href: '/support/faqs' },
      { label: 'Warranty', href: '/support/warranty' },
      { label: 'Design Services', href: '/design-services' },
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


export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin') || isAuthShellPath(pathname)) return null;
  /* Product / clinical landings use the home navy band (Hv2), not the near-black P126 footer */
  if (
    pathname?.startsWith('/products') ||
    pathname?.includes('/solutions/clinical-applications')
  ) {
    return <Hv2Footer />;
  }

  return (
    <footer className="site-footer">
      <div className="w-[min(1240px,calc(100%-24px))] sm:w-[min(1240px,calc(100%-clamp(40px,8vw,112px)))] mx-auto">
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
