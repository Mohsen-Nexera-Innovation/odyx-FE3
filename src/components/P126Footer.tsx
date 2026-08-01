'use client';

import Link from 'next/link';
import { FormEvent, type ReactNode, useState } from 'react';
import '@/app/odyx-p126.css';

const COMPANY = [
  { label: 'About ODYX', href: '/about' },
  { label: 'Our Mission', href: '/about#mission' },
  { label: 'Careers', href: '/about#careers' },
  { label: 'News & Events', href: '/#news' },
  { label: 'Contact Us', href: '/support' },
] as const;

const PRODUCTS = [
  { label: 'Intraoral Scanners', href: '/products/odyx-s1-intraoral-scanner' },
  { label: '3D Printers', href: '/products/odyx-p1-26' },
  { label: 'UV Curing Units', href: '/products/curing-machines' },
  { label: 'Premium Resins', href: '/products/resins' },
  { label: 'Accessories', href: '/shop' },
] as const;

const WORKFLOWS = [
  { label: 'Restorative', href: '/solutions/clinical-applications/same-day-crown' },
  { label: 'Implant', href: '/solutions/clinical-applications' },
  { label: 'Orthodontics', href: '/solutions/clinical-applications' },
  { label: 'Prosthetics', href: '/solutions/clinical-applications' },
  { label: 'All Applications', href: '/solutions/clinical-applications' },
] as const;

const LEARNING = [
  { label: 'Courses', href: '/learning' },
  { label: 'Webinars', href: '/learning#videos' },
  { label: 'Guides', href: '/learning#articles' },
  { label: 'Clinical Cases', href: '/#cases-preview' },
] as const;

const SUPPORT = [
  { label: 'Help Center', href: '/support' },
  { label: 'Live Chat', href: '/support' },
  { label: 'Downloads', href: '/support#manuals' },
  { label: 'Warranty', href: '/support#warranty' },
] as const;

function SocialCircle({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <a href="#" aria-label={label} className="p126-ft__social">
      {children}
    </a>
  );
}

export default function P126Footer() {
  const [email, setEmail] = useState('');

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    setEmail('');
  }

  return (
    <footer className="p126-ft" aria-label="Site footer">
      <div className="p126-ft__wrap">
        <div className="p126-ft__main">
          <div className="p126-ft__brand">
            <Link href="/" className="p126-ft__logo" aria-label="ODYX home">
              ODYX
            </Link>
            <p className="p126-ft__tag">
              A complete digital dentistry ecosystem, designed to work in perfect harmony.
            </p>
            <div className="p126-ft__socials" aria-label="Social media">
              <SocialCircle label="Facebook">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                </svg>
              </SocialCircle>
              <SocialCircle label="Instagram">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </SocialCircle>
              <SocialCircle label="LinkedIn">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-3.8V8.5z" />
                </svg>
              </SocialCircle>
              <SocialCircle label="YouTube">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
                </svg>
              </SocialCircle>
            </div>
          </div>

          <nav className="p126-ft__nav" aria-label="Footer">
            <div className="p126-ft__col">
              <p className="p126-ft__heading">Company</p>
              <ul>
                {COMPANY.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p126-ft__col">
              <p className="p126-ft__heading">Products</p>
              <ul>
                {PRODUCTS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p126-ft__col">
              <p className="p126-ft__heading">Workflows</p>
              <ul>
                {WORKFLOWS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p126-ft__col">
              <p className="p126-ft__heading">Learning</p>
              <ul>
                {LEARNING.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p126-ft__col">
              <p className="p126-ft__heading">Support</p>
              <ul>
                {SUPPORT.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p126-ft__col p126-ft__col--news">
              <p className="p126-ft__heading">Newsletter</p>
              <p className="p126-ft__news-lead">Stay updated with the latest from ODYX.</p>
              <form className="p126-ft__form" onSubmit={onSubscribe}>
                <label className="sr-only" htmlFor="p126-ft-email">
                  Email
                </label>
                <input
                  id="p126-ft-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </nav>
        </div>

        <div className="p126-ft__bottom">
          <span>© 2025 ODYX. All rights reserved.</span>
          <div className="p126-ft__legal">
            <Link href="/about#privacy">Privacy Policy</Link>
            <Link href="/about#terms">Terms of Service</Link>
          </div>
          <button type="button" className="p126-ft__lang" aria-label="Language: English">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" />
            </svg>
            English
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
