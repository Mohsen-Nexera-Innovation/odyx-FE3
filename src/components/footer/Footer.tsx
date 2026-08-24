"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthShellPath } from "@/content/auth";
import {
  FOOTER_COLUMNS,
  FOOTER_COPYRIGHT,
  FOOTER_NEWSLETTER_EMAIL_LABEL,
  FOOTER_NEWSLETTER_PLACEHOLDER,
  FOOTER_NEWSLETTER_SUBSCRIBE_LABEL,
  FOOTER_NEWSLETTER_TAGLINE,
  FOOTER_NEWSLETTER_TITLE,
  FOOTER_SOCIAL,
  FOOTER_TAGLINE,
} from "@/content/footer";
import {
  FT,
  FT_A,
  FT_A_DIM,
  FT_BOTTOM,
  FT_BRAND,
  FT_COL,
  FT_COPY,
  FT_FORM,
  FT_GRID,
  FT_H,
  FT_IN,
  FT_INPUT,
  FT_LOGO,
  FT_NAV,
  FT_NEWS,
  FT_NEWSTAG,
  FT_PAD,
  FT_SEND,
  FT_SOC,
  FT_SOCIAL,
  FT_SR,
  FT_TAG,
  FT_UL,
} from "./footerChrome";

// Site footer — navy band. Layout is one auto-fit CSS grid so columns
// grow from 1 → 2 → 3 → … as the viewport widens.
//
// Footer brand mark: /brand/odyx-egypt-white.png (black fill → white for navy band).

function SocialGlyph({ path }: { path?: string }) {
  if (!path) {
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

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || isAuthShellPath(pathname)) return null;

  return (
    <footer className={FT} aria-label="Site footer">
      <div className={FT_IN}>
        <div className={FT_PAD}>
          <div className={FT_GRID}>
            <div className={FT_BRAND}>
              <Link href="/" className={FT_LOGO} aria-label="ODYX home">
                <img src="/brand/odyx-egypt-white.png" alt="ODYX Egypt" />
              </Link>
              <p className={FT_TAG}>
                {FOOTER_TAGLINE}
              </p>
              <div className={FT_SOCIAL}>
                {FOOTER_SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    className={FT_SOC}
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

            <nav className={FT_NAV} aria-label="Footer">
              {FOOTER_COLUMNS.map((col) => (
                <div className={FT_COL} key={col.title}>
                  <h2 className={FT_H}>{col.title}</h2>
                  <ul className={FT_UL}>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {col.dimmed || l.dimmed ? (
                          <span className={FT_A_DIM} aria-disabled="true" title="Coming soon">
                            {l.label}
                          </span>
                        ) : (
                          <Link className={FT_A} href={l.href}>{l.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className={`${FT_NEWS} opacity-[.42] pointer-events-none`}>
              <h2 className={FT_H}>{FOOTER_NEWSLETTER_TITLE}</h2>
              <p className={FT_NEWSTAG}>
                {FOOTER_NEWSLETTER_TAGLINE}
              </p>
              <form className={FT_FORM} aria-disabled="true">
                <label className={FT_SR} htmlFor="site-ft-email">
                  {FOOTER_NEWSLETTER_EMAIL_LABEL}
                </label>
                <input
                  id="site-ft-email"
                  className={FT_INPUT}
                  type="email"
                  name="email"
                  placeholder={FOOTER_NEWSLETTER_PLACEHOLDER}
                  disabled
                  tabIndex={-1}
                />
                <button className={`${FT_SEND} cursor-not-allowed!`} type="button" disabled aria-label={FOOTER_NEWSLETTER_SUBSCRIBE_LABEL}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4.4 12h14.4M12.7 5.9l6.1 6.1-6.1 6.1" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className={FT_BOTTOM}>
            <p className={FT_COPY}>{FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
