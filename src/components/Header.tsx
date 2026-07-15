'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS } from '@/content/nav';
import { LOCALE_LABEL, useGlobalTools, type Locale } from './GlobalTools';
import AiChatbotIcon from './AiChatbotIcon';
import { useAuthSession } from '@/hooks/useAuthSession';
import { logout, type AccountSession } from '@/lib/auth';
import { unreadTotal } from '@/lib/inbox-store';
import { cartCountAsync } from '@/lib/commerce';

const Caret = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 6h15l-1.5 9h-12z" />
    <path d="M6 6l-1-3H2" />
    <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

function initialsFrom(session: AccountSession): string {
  if (session.role === 'guest') return 'G';
  const parts = session.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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

function UserMenu({ session, onSignOut }: { session: AccountSession; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const displayName = session.role === 'guest' ? 'Guest' : session.name.split(' ')[0];

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('click', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="nav-user-wrap" ref={wrapRef}>
      <button
        type="button"
        ref={triggerRef}
        className={`nav-user${open ? ' on' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="nav-user-menu"
        aria-label={`Account menu for ${displayName}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-avatar" aria-hidden>{initialsFrom(session)}</span>
        <span className="nav-user-caret" aria-hidden><Caret /></span>
      </button>
      <div className="nav-user-drop" id="nav-user-menu" role="menu" aria-label="Account" data-open={open ? 'true' : 'false'}>
        {session.role !== 'guest' && (
          <p className="nav-user-meta">
            {session.name}
            <span>{session.email}</span>
          </p>
        )}
        <button type="button" role="menuitem" className="nav-user-signout" tabIndex={open ? 0 : -1} onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { openSearch, openAi, locale, setLocale, aiIconAnimating } = useGlobalTools();
  const { session } = useAuthSession();
  const [inboxUnread, setInboxUnread] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
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
    const refreshCart = () => {
      void cartCountAsync().then(setCartItems).catch(() => setCartItems(0));
    };
    refreshCart();
    window.addEventListener('odyx-cart-change', refreshCart);
    window.addEventListener('storage', refreshCart);
    window.addEventListener('odyx-auth-change', refreshCart);
    return () => {
      window.removeEventListener('odyx-cart-change', refreshCart);
      window.removeEventListener('storage', refreshCart);
      window.removeEventListener('odyx-auth-change', refreshCart);
    };
  }, []);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Hero-aware scroll: transparent over hero, dark while still in hero, light once past hero.
  useEffect(() => {
    const heroEl = document.querySelector('.page-hero');
    setHasHero(!!heroEl);

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (heroEl) {
        setPastHero(heroEl.getBoundingClientRect().bottom <= 68);
      } else {
        setPastHero(false);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

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
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const signOut = async () => {
    await logout();
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

  const transparent = hasHero && !pastHero && !scrolled;
  const onLight = hasHero && pastHero;
  const headerClass = [
    transparent ? 'transparent' : '',
    onLight ? 'on-light' : '',
    !transparent && !onLight ? 'solid' : '',
    scrolled && !onLight ? 'scrolled' : '',
  ]
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
              <div className={`mega${m.sections ? ' mega-cat' : ''}`}>
                {m.sections ? (
                  m.sections.map((section) => (
                    <div className="mega-section" key={section.category}>
                      <p className="mega-cat-label">{section.category}</p>
                      {section.items.map((item) => (
                        <NavAnchor key={item.label} href={item.href} onClick={closeMenu}>
                          {item.label}
                        </NavAnchor>
                      ))}
                    </div>
                  ))
                ) : (
                  m.items.map((item) => (
                    <NavAnchor key={item.label} href={item.href} onClick={closeMenu}>
                      {item.label}
                    </NavAnchor>
                  ))
                )}
              </div>
            </div>
          ))}
          <div className="nav-mobile-auth" aria-label="Account">
            {session ? (
              <Link className="btn-ghost btn btn-sm" href="/#register" onClick={closeMenu}>Register device</Link>
            ) : (
              <>
                <Link className="btn-ghost btn btn-sm" href="/login" onClick={closeMenu}>Sign in</Link>
                <Link className="btn-ghost btn btn-sm" href="/register" onClick={closeMenu}>Sign up</Link>
              </>
            )}
            <Link className="btn btn-sm nav-demo" href="/support" onClick={closeMenu}>Request a Demo</Link>
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
          <Link
            className="tool-btn nav-cart"
            href="/cart"
            title="Cart"
            aria-label={cartItems > 0 ? `Cart, ${cartItems} items` : 'Cart'}
            onClick={closeMenu}
          >
            <CartIcon />
            {cartItems > 0 ? <span className="nav-cart-badge">{cartItems > 99 ? '99+' : cartItems}</span> : null}
          </Link>
          <div className="lang-wrap" ref={langRef}>
            <button type="button" className={`tool-btn lang${langOpen ? ' on' : ''}`} title="Language" aria-haspopup="menu" aria-expanded={langOpen} onClick={() => setLangOpen((o) => !o)}>
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
          {session ? (
            <>
              <Link className="btn-ghost btn btn-sm nav-reg-device" href="/#register">
                <span className="nav-label-long">Register device</span>
                <span className="nav-label-short">Device</span>
              </Link>
              <Link className="btn-ghost btn btn-sm nav-inbox" href="/inbox" aria-label={inboxUnread > 0 ? `Inbox, ${inboxUnread} unread` : 'Inbox'}>
                Inbox
                {inboxUnread > 0 ? <span className="nav-inbox-badge">{inboxUnread}</span> : null}
              </Link>
              <UserMenu session={session} onSignOut={signOut} />
            </>
          ) : (
            <>
              <Link className="btn-ghost btn btn-sm nav-login" href="/login">Sign in</Link>
              <Link className="btn-ghost btn btn-sm nav-signup" href="/register">Sign up</Link>
            </>
          )}
          <Link className="btn btn-sm nav-demo" href="/support">
            <span className="nav-label-long">Request a Demo</span>
            <span className="nav-label-short">Demo</span>
          </Link>
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
