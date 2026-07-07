'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS } from '@/content/nav';
import { LOCALE_LABEL, useGlobalTools, type Locale } from './GlobalTools';
import AiChatbotIcon from './AiChatbotIcon';
import { useAuthSession } from '@/hooks/useAuthSession';
import { logout } from '@/lib/auth-store';
import { unreadTotal } from '@/lib/inbox-store';

const Caret = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);

function NavAnchor({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { openSearch, openAi, locale, setLocale, aiIconAnimating } = useGlobalTools();
  const { session } = useAuthSession();
  const [inboxUnread, setInboxUnread] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const topSeg = (href: string) => href.split(/[#?]/)[0].split('/')[1] || '';
  const currentSeg = topSeg(pathname || '/');
  const isMenuActive = (href: string) => currentSeg !== '' && topSeg(href) === currentSeg;

  const refreshUnread = () => {
    if (session) setInboxUnread(unreadTotal(session));
  };

  useEffect(() => {
    refreshUnread();
  }, [session]);

  useEffect(() => {
    const onInboxChange = () => refreshUnread();
    window.addEventListener('odyx-inbox-change', onInboxChange);
    return () => window.removeEventListener('odyx-inbox-change', onInboxChange);
  }, [session]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 140 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y < 140) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 767) {
        setOpen(false);
        setExpandedNav(null);
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && window.innerWidth <= 767 ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const signOut = () => {
    logout();
    setUserOpen(false);
    router.push('/login');
  };

  const pickLocale = (l: Locale) => {
    setLocale(l);
    setLangOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
    setExpandedNav(null);
  };

  const toggleMobileSection = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth > 767) return;
    e.preventDefault();
    setExpandedNav((prev) => (prev === label ? null : label));
  };

  const onSpotlightMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = headerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const headerClass = [scrolled ? 'scrolled' : '', hidden && !open ? 'nav-hidden' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header id="hdr" ref={headerRef} className={headerClass} onMouseMove={onSpotlightMove}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="ODYX home">
          <img className="logo-img" src="/brand/odyx-company.png" alt="ODYX" />
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}`} aria-label="Main">
          {HEADER_MENUS.map((m) => (
            <div className={`nav-item${expandedNav === m.label ? ' exp' : ''}`} key={m.label}>
              <NavAnchor href={m.href} onClick={(e) => toggleMobileSection(m.label, e)}>
                <span className={isMenuActive(m.href) ? 'nav-link-label active' : 'nav-link-label'}>{m.label}</span> <Caret />
              </NavAnchor>
              <div className="mega">
                <div className="mega-head">{m.label}</div>
                {m.items.map((item) => (
                  <NavAnchor key={item.label} href={item.href} onClick={closeMenu}>
                    <span className="mega-item-label">{item.label}</span>
                    {item.desc ? <span className="mega-item-desc">{item.desc}</span> : null}
                  </NavAnchor>
                ))}
              </div>
            </div>
          ))}
          <div className="nav-mobile-auth" aria-label="Account">
            <Link className="btn-ghost btn btn-sm" href="/#register" onClick={closeMenu}>Register device</Link>
            {!session && (
              <Link className="btn-ghost btn btn-sm" href="/login" onClick={closeMenu}>Login</Link>
            )}
          </div>
        </nav>
        <button type="button" className="nav-assist" onClick={openAi} aria-label="Open Odyx Agent">
          <AiChatbotIcon size={22} animate={aiIconAnimating} variant="toolbar" className="nav-assist-icon" />
          <span className="nav-assist-label">Odyx Agent</span>
        </button>
        <div className="nav-tools">
          <button type="button" className="tool-btn search-btn" onClick={openSearch} title="Search (Cmd+K)" aria-label="Open search">
            <SearchIcon />
            <span className="search-kbd-hint">{isMac ? '\u2318K' : 'Ctrl K'}</span>
          </button>
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
          <Link className="btn-ghost btn btn-sm nav-reg-device" href="/#register">
            <span className="nav-label-long">Register device</span>
            <span className="nav-label-short">Device</span>
          </Link>
          {session ? (
            <>
              <Link className="btn-ghost btn btn-sm nav-inbox" href="/inbox">
                Inbox
                {inboxUnread > 0 ? <span className="nav-inbox-badge">{inboxUnread}</span> : null}
              </Link>
              <div className="nav-user-wrap" ref={userRef}>
                <button
                  type="button"
                  className={`btn-ghost btn btn-sm nav-user${userOpen ? ' on' : ''}`}
                  aria-expanded={userOpen}
                  onClick={() => setUserOpen((o) => !o)}
                >
                  {session.role === 'guest' ? 'Guest' : session.name.split(' ')[0]}
                </button>
                {userOpen && (
                  <div className="nav-user-drop" role="menu">
                    {session.role !== 'guest' && (
                      <p className="nav-user-meta">
                        {session.name}
                        <span>{session.email}</span>
                      </p>
                    )}
                    <button type="button" role="menuitem" onClick={signOut}>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link className="btn-ghost btn btn-sm nav-login" href="/login">Login</Link>
          )}
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
