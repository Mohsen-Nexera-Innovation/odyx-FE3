'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS } from '@/content/nav';
import { LOCALE_LABEL, useGlobalTools, type Locale } from './GlobalTools';
import AiChatbotIcon from './AiChatbotIcon';

const Caret = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);

function NavAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('/')) return <Link href={href}>{children}</Link>;
  return <a href={href}>{children}</a>;
}

export default function Header() {
  const { openSearch, openAi, locale, setLocale, aiIconAnimating } = useGlobalTools();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const pickLocale = (l: Locale) => {
    setLocale(l);
    setLangOpen(false);
  };

  return (
    <header id="hdr" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="ODYX home">
          <img className="logo-img" src="/brand/odyx-company.png" alt="ODYX" />
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}`} aria-label="Main">
          {HEADER_MENUS.map((m) => (
            <div className="nav-item" key={m.label}>
              <NavAnchor href={m.href}>{m.label} <Caret /></NavAnchor>
              <div className="mega">
                <div className="mega-head">{m.label}</div>
                {m.items.map((item) => (
                  <NavAnchor key={item.label} href={item.href}>{item.label}</NavAnchor>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <button type="button" className="nav-assist" onClick={openAi} aria-label="Open Smart AI Assistant">
          <AiChatbotIcon size={28} animate={aiIconAnimating} variant="toolbar" className="nav-assist-icon" />
          Assistant
        </button>
        <div className="nav-tools">
          <button type="button" className="tool-btn" onClick={openSearch} title="Search (Cmd+K)" aria-label="Open search"><SearchIcon /></button>
          <div className="lang-wrap" ref={langRef}>
            <button type="button" className={`tool-btn lang${langOpen ? ' on' : ''}`} title="Language" aria-expanded={langOpen} onClick={() => setLangOpen((o) => !o)}>
              {LOCALE_LABEL[locale]} <Caret />
            </button>
            {langOpen && (
              <div className="lang-drop" role="menu">
                {(['en', 'ar', 'fr'] as Locale[]).map((l) => (
                  <button key={l} type="button" role="menuitem" className={locale === l ? 'active' : ''} onClick={() => pickLocale(l)}>{LOCALE_LABEL[l]}</button>
                ))}
              </div>
            )}
          </div>
          <Link className="btn-ghost btn btn-sm nav-reg" href="/register">Register</Link>
          <Link className="btn-ghost btn btn-sm" href="/login">Login</Link>
          <Link className="btn btn-sm" href="/#cta">Request a Demo</Link>
          <div className="burger" onClick={() => setOpen((o) => !o)}><span /><span /><span /></div>
        </div>
      </div>
    </header>
  );
}
