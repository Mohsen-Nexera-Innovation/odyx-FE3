"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthShellPath } from "@/content/auth";
import { HV2_GUTTER } from "@/components/home2/hv2Chrome";

// Site footer — navy band. Brand + company links. No corner radius —
// the band is flush to the page.

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About ODYX", href: "/about" },
      { label: "Why ODYX", href: "/about#why" },
      { label: "Our Values", href: "/about#values" },
      // { label: "Our Team", href: "/about#team" },
      { label: "News & Insights", href: "/about#news" },
    ],
  },
];

/* Instagram carries no path — it is stroked in SocialGlyph. */
const SOCIAL: { label: string; href: string; path?: string }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/odyxeg",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
  { label: "Instagram", href: "https://www.instagram.com/odyxeg/" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@odyxeg",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@odyxeg",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.28 0 .54.04.79.1v3.5a6.4 6.4 0 0 0-.79-.05 6.34 6.34 0 1 0 6.34 6.34V8.73a8.2 8.2 0 0 0 4.76 1.52V6.8c-.34 0-.67-.04-1-.11z",
  },
];

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

// Beat the unlayered global `footer { padding/margin }` in odyx.css.
const FT =
  "relative m-0! p-0! border-0! rounded-none!" +
  " [background:linear-gradient(180deg,#04173D_0%,#01183D_48%,#011438_100%)]!" +
  " text-[var(--ft-text)]" +
  " [font-family:var(--font-tajawal),'Tajawal',sans-serif]" +
  " [--ft-heading:#F3F6FF] [--ft-text:rgba(210,219,241,.72)]" +
  " [--ft-muted:rgba(190,202,229,.72)] [--ft-divider:rgba(108,137,190,.16)]" +
  " [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-[#7FB0FF] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:rounded";

const FT_IN = `w-full box-border ${HV2_GUTTER}`;

// Avoid Tailwind `grid` — odyx.css `.grid { gap: 20px }` would win.
const FT_GRID =
  "flex flex-col gap-10 [padding-block:40px_28px]" +
  " min-[900px]:flex-row min-[900px]:justify-between min-[900px]:items-start min-[900px]:gap-8" +
  " min-[900px]:[padding-block:52px_36px]";

const FT_NAV =
  "flex flex-col gap-8" +
  " min-[480px]:flex-row min-[480px]:justify-between" +
  " min-[900px]:contents";

const FT_BRAND = "min-w-0 max-w-[28em] shrink-0";

const FT_LOGO =
  "block w-max no-underline! leading-none!" +
  " [&_img]:block [&_img]:h-[clamp(40px,4.2vw,56px)] [&_img]:w-auto";

const FT_TAG =
  "mt-4! mb-0! max-w-[28ch] text-[var(--ft-muted)]" +
  " text-[15px] font-medium leading-6";

const FT_SOCIAL = "flex items-center gap-3 mt-6";

const FT_SOC =
  "w-11 h-11 inline-flex items-center justify-center" +
  " rounded-full bg-[rgba(206,217,238,.92)] text-[#0A1745]" +
  " transition-[background,color] duration-[.18s] ease" +
  " hover:bg-white" +
  " [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:block" +
  " motion-reduce:transition-none!";

const FT_COL = "min-w-0 shrink-0";

const FT_H =
  "m-0! text-[var(--ft-heading)]! text-[13px]! font-extrabold!" +
  " leading-[18px]! [letter-spacing:.035em]! uppercase!" +
  " rtl:[letter-spacing:0]! rtl:normal-case!";

const FT_UL = "list-none mt-3.5! mb-0! p-0";

const FT_A =
  "inline-flex items-center min-h-11 text-[var(--ft-text)]! no-underline!" +
  " text-[15px]! font-medium! leading-snug!" +
  " transition-colors duration-[.17s] ease hover:text-[#EEF3FF]!" +
  " motion-reduce:transition-none!";

const FT_BOTTOM =
  "flex items-center justify-center text-center border-t border-[var(--ft-divider)] py-5";

const FT_COPY =
  "m-0 text-[var(--ft-muted)] text-[13.5px] font-medium";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || isAuthShellPath(pathname)) return null;

  return (
    <footer className={FT} aria-label="Site footer">
      <div className={FT_IN}>
        <div className={FT_GRID}>
            <div className={FT_BRAND}>
              <Link href="/" className={FT_LOGO} aria-label="ODYX home">
                <img src="/brand/odyx-egypt-white.png" alt="ODYX Egypt" />
              </Link>
              <p className={FT_TAG}>
                A complete digital dentistry ecosystem, designed to work in
                perfect harmony.
              </p>
              <div className={FT_SOCIAL}>
                {SOCIAL.map((s) => (
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
              {COLUMNS.map((col) => (
                <div className={FT_COL} key={col.title}>
                  <h2 className={FT_H}>{col.title}</h2>
                  <ul className={FT_UL}>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link className={FT_A} href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className={FT_BOTTOM}>
            <p className={FT_COPY}>© 2026 ODYX. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
}
