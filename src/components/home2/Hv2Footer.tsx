"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { LOCALE_LABEL, useGlobalTools, type Locale } from "@/components/GlobalTools";

// Footer — the navy band that closes the home screen, directly after Latest
// Updates.
//
// Geometry is dimensioned against the client's footer reference (a 2048-CSS-px
// viewport: 76px side padding, 364px tall, columns starting at x = 76 / 442 /
// 683 / 943 / 1200 / 1433 / 1657) and carried in --fu, one reference pixel, off
// the query container .hv2-ft-in. See "10 · Footer" in home-v2.css.
//
// The wordmark is set in type rather than /brand/odyx-company.png: the official
// asset is a dark wordmark over a blue swoosh, and the reference shows a plain
// white ODYX with no swoosh — the same call P126Footer makes on its dark band.

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About ODYX", href: "/about" },
      { label: "Our Mission", href: "/about#vision-mission" },
      { label: "Careers", href: "/about#team" },
      { label: "News & Events", href: "/about#news" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Intraoral Scanners", href: "/products/odyx-s1-intraoral-scanner" },
      { label: "3D Printers", href: "/products/odyx-p1-26" },
      { label: "UV Curing Units", href: "/products/curing-machines" },
      { label: "Premium Resins", href: "/products/resins" },
      { label: "Accessories", href: "/shop" },
    ],
  },
  {
    // The four indications are the deck this page already carries; only the
    // last link leaves for the workflow hub.
    title: "Workflows",
    links: [
      { label: "Restorative", href: "#applications" },
      { label: "Implant", href: "#applications" },
      { label: "Orthodontics", href: "#applications" },
      { label: "Prosthetics", href: "#applications" },
      { label: "All Workflows", href: "/workflows" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Courses", href: "/learning#courses" },
      { label: "Webinars", href: "/learning#videos" },
      { label: "Guides", href: "/learning#articles" },
      { label: "Clinical Cases", href: "#cases" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Live Chat", href: "/support#chat" },
      { label: "Downloads", href: "/support#manuals" },
      { label: "Warranty", href: "/support#warranty" },
      { label: "Contact Us", href: "/support#contact" },
    ],
  },
];

/* Instagram carries no path — it is stroked in SocialGlyph. */
const SOCIAL: { label: string; href: string; path?: string }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
  { label: "Instagram", href: "https://www.instagram.com/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-3.8V8.5z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z",
  },
];

const LOCALES: { id: Locale; label: string }[] = [
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
  { id: "fr", label: "Français" },
];

function SocialGlyph({ path }: { path?: string }) {
  if (!path) {
    /* Instagram is stroked, not filled — the reference draws its rounded
       square and lens as outlines. */
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M2.8 12h18.4M12 2.8c2.4 2.5 3.6 5.6 3.6 9.2s-1.2 6.7-3.6 9.2c-2.4-2.5-3.6-5.6-3.6-9.2S9.6 5.3 12 2.8Z" />
  </svg>
);

export default function Hv2Footer() {
  const { locale, setLocale } = useGlobalTools();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const localeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localeOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!localeRef.current?.contains(e.target as Node)) setLocaleOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLocaleOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [localeOpen]);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  }

  const current = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  return (
    <footer className="hv2-ft" aria-label="Site footer">
      <div className="hv2-ft-in">
        <div className="hv2-ft-pad">
          <div className="hv2-ft-grid">
            <div className="hv2-ft-brand">
              <Link href="/" className="hv2-ft-logo" aria-label="ODYX home">
                ODYX
              </Link>
              <p className="hv2-ft-tag">
                A complete digital dentistry ecosystem, designed to work in
                perfect harmony.
              </p>
              <div className="hv2-ft-social">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    className="hv2-ft-soc"
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <SocialGlyph path={s.path} />
                  </a>
                ))}
              </div>
            </div>

            <nav className="hv2-ft-nav" aria-label="Footer">
              {COLUMNS.map((col) => (
                <div className="hv2-ft-col" key={col.title}>
                  <h2 className="hv2-ft-h">{col.title}</h2>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="hv2-ft-news">
              <h2 className="hv2-ft-h">Newsletter</h2>
              <p className="hv2-ft-newstag">
                Stay updated with the latest from ODYX.
              </p>
              <form className="hv2-ft-form" onSubmit={onSubscribe}>
                <label className="hv2-ft-sr" htmlFor="hv2-ft-email">
                  Email address
                </label>
                <input
                  id="hv2-ft-email"
                  className="hv2-ft-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="hv2-ft-send" type="submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4.4 12h14.4M12.7 5.9l6.1 6.1-6.1 6.1" />
                  </svg>
                </button>
              </form>
              <p className="hv2-ft-note" role="status">
                {sent ? "Thanks — you're subscribed." : ""}
              </p>
            </div>
          </div>

          <div className="hv2-ft-bottom">
            <p className="hv2-ft-copy">© 2025 ODYX. All rights reserved.</p>
            <div className="hv2-ft-legal">
              <Link href="/about#privacy">Privacy Policy</Link>
              <Link href="/about#terms">Terms of Service</Link>
            </div>
            <div className="hv2-ft-lang" ref={localeRef}>
              <button
                type="button"
                className="hv2-ft-langbtn"
                aria-expanded={localeOpen}
                aria-haspopup="listbox"
                aria-label={`Language: ${current.label}`}
                onClick={() => setLocaleOpen((o) => !o)}
              >
                <span className="hv2-ft-globe" aria-hidden><GlobeIcon /></span>
                <span className="hv2-ft-langlbl">{current.label}</span>
                <svg className="hv2-ft-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m6 9.5 6 6 6-6" />
                </svg>
              </button>
              {localeOpen ? (
                <ul className="hv2-ft-langmenu" role="listbox" aria-label="Language">
                  {LOCALES.map((l) => (
                    <li key={l.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l.id === locale}
                        onClick={() => {
                          setLocale(l.id);
                          setLocaleOpen(false);
                        }}
                      >
                        {l.label}
                        <span aria-hidden>{LOCALE_LABEL[l.id]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
