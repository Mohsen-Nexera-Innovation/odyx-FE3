"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABEL, useGlobalTools, type Locale } from "@/components/GlobalTools";
import { isAuthShellPath } from "@/content/auth";

// Site footer — single reusable navy band for the whole website.
// Visual source of truth: the Home V2 client footer reference (2048-CSS-px
// viewport: 76px side padding, 364px tall, columns at x = 76 / 442 / 683 /
// 943 / 1200 / 1433 / 1657). Geometry is carried in --fu (one reference
// pixel) off the query container.
//
// The wordmark is set in type rather than /brand/odyx-company.png: the official
// asset is a dark wordmark over a blue swoosh, and the reference shows a plain
// white ODYX with no swoosh.

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About ODYX", href: "/about" },
      { label: "Why ODYX", href: "/about#why" },
      { label: "Our Values", href: "/about#values" },
      { label: "Our Team", href: "/about#team" },
      { label: "News & Insights", href: "/about#news" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Intraoral Scanners", href: "/products/odyx-s1-intraoral-scanner" },
      { label: "3D Printers", href: "/products/odyx-p1-26" },
      { label: "UV Curing Units", href: "/products/curing-machines" },
      { label: "Premium Resins", href: "/products/resins" },
    ],
  },
  {
    // Home-section anchors use /#… so they resolve from any route.
    title: "Workflows",
    links: [
      { label: "Restorative", href: "/#applications" },
      { label: "Implant", href: "/#applications" },
      { label: "Orthodontics", href: "/#applications" },
      { label: "Prosthetics", href: "/#applications" },
      { label: "All Workflows", href: "/workflows" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Courses", href: "/learning#courses" },
      { label: "Webinars", href: "/learning#videos" },
      { label: "Guides", href: "/learning#articles" },
      { label: "Clinical Cases", href: "/#cases" },
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

// Beat the unlayered global `footer { padding/margin }` in odyx.css.
const FT =
  "relative m-0! p-0! border-0!" +
  " [background:linear-gradient(180deg,#04173D_0%,#01183D_48%,#011438_100%)]!" +
  " rounded-b-[20px] overflow-hidden text-[var(--ft-text)]" +
  " [font-family:var(--font-tajawal),'Tajawal',sans-serif]" +
  " [--fu:.048828cqw] [--ft-heading:#F3F6FF] [--ft-text:rgba(210,219,241,.72)]" +
  " [--ft-muted:rgba(190,202,229,.72)] [--ft-divider:rgba(108,137,190,.16)]" +
  " [--ft-input-bg:rgba(8,34,76,.75)] [--ft-input-line:rgba(93,122,173,.25)] [--ft-accent:#075EF6]" +
  " [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-[#7FB0FF] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:rounded" +
  " max-[860px]:rounded-b-2xl!";

const FT_IN = "w-[min(100%,2048px)] mx-auto [container-type:inline-size]";

const FT_PAD =
  "px-[calc(76*var(--fu))]" +
  " max-[1499px]:px-[clamp(28px,3.6vw,62px)]!";

// Avoid Tailwind `grid` — odyx.css `.grid { gap: 20px }` would win.
const FT_GRID =
  "[display:grid]! [grid-template-columns:calc(366*var(--fu))_calc(1215*var(--fu))_calc(315*var(--fu))]!" +
  " pb-[calc(33*var(--fu))] [gap:0]!" +
  " max-[1499px]:[grid-template-columns:minmax(200px,1fr)_minmax(0,3.1fr)_minmax(268px,1.35fr)]!" +
  " max-[1499px]:[column-gap:clamp(24px,2.6vw,44px)]! max-[1499px]:[padding-block:44px_40px]!" +
  " max-[1180px]:[grid-template-columns:minmax(0,1fr)_minmax(280px,auto)]!" +
  " max-[1180px]:[column-gap:clamp(24px,4vw,60px)]! max-[1180px]:[row-gap:36px]!" +
  " max-[860px]:[grid-template-columns:1fr]! max-[860px]:[row-gap:34px]! max-[860px]:[padding-block:38px_32px]!";

const FT_NAV =
  "[display:grid]! [grid-template-columns:calc(241*var(--fu))_calc(260*var(--fu))_calc(257*var(--fu))_calc(233*var(--fu))_calc(224*var(--fu))]!" +
  " [gap:0]!" +
  " max-[1499px]:[grid-template-columns:repeat(5,minmax(0,1fr))]! max-[1499px]:[column-gap:clamp(14px,1.4vw,24px)]!" +
  " max-[1180px]:col-span-full! max-[1180px]:row-start-2! max-[1180px]:[column-gap:clamp(12px,2vw,26px)]!" +
  " max-[860px]:[grid-template-columns:repeat(2,minmax(0,1fr))]! max-[860px]:[gap:26px_18px]! max-[860px]:row-auto!" +
  " max-[420px]:[grid-template-columns:1fr]! max-[420px]:[gap:22px]!";

const FT_BRAND =
  "pt-[calc(33*var(--fu))]" +
  " max-[1499px]:pt-0!" +
  " max-[1180px]:col-start-1 max-[1180px]:row-start-1" +
  " max-[860px]:col-auto max-[860px]:row-auto";

const FT_LOGO =
  "block w-max text-white! text-[length:calc(50*var(--fu))]! font-extrabold! leading-none!" +
  " [letter-spacing:.03em]! no-underline!" +
  " max-[1499px]:text-[26px]!";

const FT_TAG =
  "m-[calc(16*var(--fu))_0_0]! max-w-[calc(245*var(--fu))] text-[var(--ft-muted)]" +
  " text-[length:calc(19*var(--fu))] font-medium leading-[calc(31*var(--fu))]" +
  " max-[1499px]:mt-4! max-[1499px]:max-w-[26ch]! max-[1499px]:text-[14.5px]! max-[1499px]:leading-6!" +
  " max-[860px]:max-w-[32ch]!";

const FT_SOCIAL =
  "flex items-center gap-[calc(31*var(--fu))] mt-[calc(38*var(--fu))]" +
  " max-[1499px]:mt-6! max-[1499px]:gap-[14px]!";

const FT_SOC =
  "w-[calc(33*var(--fu))] h-[calc(33*var(--fu))] inline-flex items-center justify-center" +
  " rounded-full bg-[rgba(206,217,238,.92)] text-[#0A1745]" +
  " transition-[background,color] duration-[.18s] ease" +
  " hover:bg-white" +
  " [&>svg]:w-[calc(18*var(--fu))] [&>svg]:h-[calc(18*var(--fu))] [&>svg]:block" +
  " motion-reduce:transition-none!" +
  " max-[1499px]:w-8! max-[1499px]:h-8! max-[1499px]:[&>svg]:w-4! max-[1499px]:[&>svg]:h-4!";

const FT_COL =
  "pt-[calc(45*var(--fu))]" +
  " max-[1499px]:pt-0!";

const FT_H =
  "m-0! text-[var(--ft-heading)]! text-[length:calc(18*var(--fu))]! font-extrabold!" +
  " leading-[calc(22*var(--fu))]! [letter-spacing:.035em]! uppercase!" +
  " rtl:[letter-spacing:0]! rtl:normal-case!" +
  " max-[1499px]:text-[13px]! max-[1499px]:leading-[18px]! max-[1499px]:[letter-spacing:.03em]! max-[1499px]:rtl:[letter-spacing:0]!";

const FT_UL =
  "list-none m-[calc(17*var(--fu))_0_0]! p-0" +
  " max-[1499px]:mt-[14px]!";

const FT_A =
  "inline-block text-[var(--ft-text)]! no-underline!" +
  " text-[length:calc(19.5*var(--fu))]! font-medium! leading-[calc(36.6*var(--fu))]!" +
  " transition-colors duration-[.17s] ease hover:text-[#EEF3FF]!" +
  " motion-reduce:transition-none!" +
  " max-[1499px]:text-[14.5px]! max-[1499px]:leading-7!";

const FT_NEWS =
  "pt-[calc(45*var(--fu))]" +
  " max-[1499px]:pt-0!" +
  " max-[1180px]:col-start-2 max-[1180px]:row-start-1" +
  " max-[860px]:col-auto max-[860px]:row-auto";

const FT_NEWSTAG =
  "m-[calc(20*var(--fu))_0_0]! max-w-[calc(195*var(--fu))] text-[var(--ft-muted)]" +
  " text-[length:calc(19*var(--fu))] font-medium leading-[calc(30.5*var(--fu))]" +
  " max-[1499px]:mt-[14px]! max-[1499px]:max-w-[30ch]! max-[1499px]:text-[14.5px]! max-[1499px]:leading-6!" +
  " max-[860px]:max-w-[34ch]!";

const FT_FORM =
  "flex items-stretch w-[calc(312*var(--fu))] h-[calc(57*var(--fu))] mt-[calc(32*var(--fu))]" +
  " rounded-none bg-[var(--ft-input-bg)] border border-[var(--ft-input-line)] overflow-hidden" +
  " [box-shadow:inset_0_1px_0_rgba(255,255,255,.03),0_2px_10px_rgba(1,9,26,.25)]" +
  " focus-within:border-[rgba(126,164,235,.55)]" +
  " max-[1499px]:w-full! max-[1499px]:max-w-[312px]! max-[1499px]:h-[50px]! max-[1499px]:mt-5! max-[1499px]:rounded-[10px]!" +
  " max-[860px]:max-w-none!";

const FT_INPUT =
  "flex-auto min-w-0 bg-transparent! border-0! outline-0! shadow-none!" +
  " ps-[calc(21*var(--fu))] pe-[calc(8*var(--fu))] text-[#E9EFFF]!" +
  " [font-family:inherit] text-[length:calc(18.5*var(--fu))]! font-medium!" +
  " placeholder:text-[rgba(203,214,238,.66)] focus-visible:outline-0!" +
  " max-[1499px]:text-[14.5px]! max-[1499px]:ps-4! max-[1499px]:pe-2!";

const FT_SEND =
  "flex-none w-[calc(57*var(--fu))] inline-flex items-center justify-center" +
  " bg-[var(--ft-accent)] text-white border-0 cursor-pointer" +
  " transition-colors duration-[.18s] ease hover:bg-[#2472FF]" +
  " [&>svg]:w-[calc(26*var(--fu))] [&>svg]:h-[calc(26*var(--fu))] [&>svg]:block" +
  " rtl:[&>svg]:scale-x-[-1]" +
  " motion-reduce:transition-none!" +
  " max-[1499px]:w-[50px]! max-[1499px]:[&>svg]:w-[21px]! max-[1499px]:[&>svg]:h-[21px]!";

const FT_NOTE =
  "m-[calc(9*var(--fu))_0_0]! h-[calc(18*var(--fu))] text-[rgba(150,196,255,.9)]" +
  " text-[length:calc(14.5*var(--fu))] font-medium leading-[calc(18*var(--fu))]" +
  " max-[1499px]:text-[12.5px]! max-[1499px]:mt-2! max-[1499px]:min-h-4! max-[1499px]:h-auto!";

const FT_SR =
  "absolute w-px h-px overflow-hidden [clip-path:inset(50%)] whitespace-nowrap";

const FT_BOTTOM =
  "h-[calc(64*var(--fu))] [display:grid]! [grid-template-columns:calc(697*var(--fu))_auto_1fr]! items-center" +
  " border-t border-[var(--ft-divider)] [gap:0]!" +
  " max-[1499px]:h-auto! max-[1499px]:min-h-[58px]! max-[1499px]:[padding-block:14px]!" +
  " max-[1499px]:[grid-template-columns:1fr_auto_1fr]! max-[1499px]:[column-gap:20px]!" +
  " max-[860px]:[grid-template-columns:1fr]! max-[860px]:justify-items-center! max-[860px]:[row-gap:12px]!" +
  " max-[860px]:text-center! max-[860px]:[padding-block:20px]!";

const FT_COPY =
  "m-0 text-[var(--ft-muted)] text-[length:calc(19*var(--fu))] font-medium" +
  " max-[1499px]:text-[13.5px]!";

const FT_LEGAL =
  "flex items-center gap-[calc(56*var(--fu))]" +
  " max-[1499px]:gap-[clamp(20px,3vw,46px)]!";

const FT_LEGAL_A =
  "text-[var(--ft-muted)]! no-underline! text-[length:calc(19*var(--fu))]! font-medium!" +
  " transition-colors duration-[.17s] ease hover:text-[#EEF3FF]!" +
  " motion-reduce:transition-none!" +
  " max-[1499px]:text-[13.5px]!";

const FT_LANG =
  "relative justify-self-end max-[860px]:justify-self-center!";

const FT_LANGBTN =
  "inline-flex items-center cursor-pointer bg-transparent! border-0! p-0!" +
  " text-[var(--ft-muted)]! [font-family:inherit] text-[length:calc(19*var(--fu))]! font-medium!" +
  " transition-colors duration-[.17s] ease hover:text-[#EEF3FF]!" +
  " max-[1499px]:text-[13.5px]!";

const FT_GLOBE =
  "inline-flex me-[calc(10*var(--fu))] [&>svg]:w-[calc(23*var(--fu))] [&>svg]:h-[calc(23*var(--fu))] [&>svg]:block" +
  " max-[1499px]:me-2! max-[1499px]:[&>svg]:w-[18px]! max-[1499px]:[&>svg]:h-[18px]!";

const FT_CHEV =
  "w-[calc(15*var(--fu))] h-[calc(15*var(--fu))] ms-[calc(21*var(--fu))]" +
  " max-[1499px]:w-[13px]! max-[1499px]:h-[13px]! max-[1499px]:ms-3!";

const FT_LANGMENU =
  "absolute bottom-[calc(100%+10*var(--fu))] end-0 list-none m-0 p-[calc(6*var(--fu))]" +
  " min-w-[calc(170*var(--fu))] bg-[#06214F] border border-[var(--ft-input-line)]" +
  " rounded-[calc(12*var(--fu))] [box-shadow:0_18px_40px_rgba(1,8,26,.5)] z-[2]" +
  " max-[1499px]:bottom-[calc(100%+10px)]! max-[1499px]:p-1.5! max-[1499px]:min-w-[168px]! max-[1499px]:rounded-xl!";

const FT_LANGOPT =
  "w-full flex items-center justify-between gap-[calc(14*var(--fu))]" +
  " bg-transparent! border-0! cursor-pointer" +
  " p-[calc(9*var(--fu))_calc(12*var(--fu))] rounded-[calc(8*var(--fu))]" +
  " text-[var(--ft-text)]! [font-family:inherit] text-[length:calc(16*var(--fu))]! font-medium! text-start!" +
  " hover:bg-[rgba(255,255,255,.07)] hover:text-white!" +
  " aria-[selected=true]:text-white!" +
  " max-[1499px]:p-[9px_12px]! max-[1499px]:rounded-lg! max-[1499px]:text-[14px]! max-[1499px]:gap-[14px]!";

const FT_LANGCODE =
  "text-[rgba(160,183,224,.7)] text-[length:calc(13.5*var(--fu))]" +
  " max-[1499px]:text-xs!";

export default function Footer() {
  const pathname = usePathname();
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

  if (pathname?.startsWith("/admin") || isAuthShellPath(pathname)) return null;

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  }

  const current = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  return (
    <footer className={FT} aria-label="Site footer">
      <div className={FT_IN}>
        <div className={FT_PAD}>
          <div className={FT_GRID}>
            <div className={FT_BRAND}>
              <Link href="/" className={FT_LOGO} aria-label="ODYX home">
                ODYX
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

            <div className={FT_NEWS}>
              <h2 className={FT_H}>Newsletter</h2>
              <p className={FT_NEWSTAG}>
                Stay updated with the latest from ODYX.
              </p>
              <form className={FT_FORM} onSubmit={onSubscribe}>
                <label className={FT_SR} htmlFor="site-ft-email">
                  Email address
                </label>
                <input
                  id="site-ft-email"
                  className={FT_INPUT}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className={FT_SEND} type="submit" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4.4 12h14.4M12.7 5.9l6.1 6.1-6.1 6.1" />
                  </svg>
                </button>
              </form>
              <p className={FT_NOTE} role="status">
                {sent ? "Thanks — you're subscribed." : ""}
              </p>
            </div>
          </div>

          <div className={FT_BOTTOM}>
            <p className={FT_COPY}>© 2025 ODYX. All rights reserved.</p>
            <div className={FT_LEGAL}>
              <Link className={FT_LEGAL_A} href="/about#privacy">Privacy Policy</Link>
              <Link className={FT_LEGAL_A} href="/about#terms">Terms of Service</Link>
            </div>
            <div className={FT_LANG} ref={localeRef}>
              <button
                type="button"
                className={FT_LANGBTN}
                aria-expanded={localeOpen}
                aria-haspopup="listbox"
                aria-label={`Language: ${current.label}`}
                onClick={() => setLocaleOpen((o) => !o)}
              >
                <span className={FT_GLOBE} aria-hidden><GlobeIcon /></span>
                <span>{current.label}</span>
                <svg className={FT_CHEV} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m6 9.5 6 6 6-6" />
                </svg>
              </button>
              {localeOpen ? (
                <ul className={FT_LANGMENU} role="listbox" aria-label="Language">
                  {LOCALES.map((l) => (
                    <li key={l.id}>
                      <button
                        type="button"
                        className={FT_LANGOPT}
                        role="option"
                        aria-selected={l.id === locale}
                        onClick={() => {
                          setLocale(l.id);
                          setLocaleOpen(false);
                        }}
                      >
                        {l.label}
                        <span className={FT_LANGCODE} aria-hidden>{LOCALE_LABEL[l.id]}</span>
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
