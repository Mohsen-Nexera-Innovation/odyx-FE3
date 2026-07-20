'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS, type MegaColumn, type NavGroup, type NavLink } from '@/content/nav';
import { LOCALE_LABEL, useGlobalTools, type Locale } from './GlobalTools';
import { useAuthSession } from '@/hooks/useAuthSession';
import { logout, type AccountSession } from '@/lib/auth';
import { unreadTotal } from '@/lib/inbox-store';
import { unreadTotalApi } from '@/lib/inbox-api';
import { isApiMode } from '@/lib/config';
import { subscribeChatSocket } from '@/lib/chat-socket';
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
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function MegaLink({
  item,
  onClick,
}: {
  item: NavLink;
  onClick: () => void;
}) {
  return (
    <NavAnchor href={item.href} className="mega-link" onClick={onClick}>
      <span className="mega-link__label">{item.label}</span>
    </NavAnchor>
  );
}

function MegaColumnBlock({
  column,
  onClick,
}: {
  column: MegaColumn;
  onClick: () => void;
}) {
  return (
    <div className="mega-col">
      {column.href ? (
        <NavAnchor href={column.href} className="mega-col__title" onClick={onClick}>
          {column.title}
        </NavAnchor>
      ) : (
        <p className="mega-col__title">{column.title}</p>
      )}
      {column.groups?.map((group, i) => (
        <div className="mega-group" key={group.label ?? `g-${i}`}>
          {group.label ? <p className="mega-group__label">{group.label}</p> : null}
          {group.items.map((item) => (
            <MegaLink key={item.label + item.href} item={item} onClick={onClick} />
          ))}
        </div>
      ))}
      {column.items?.map((item) => (
        <MegaLink key={item.label + item.href} item={item} onClick={onClick} />
      ))}
    </div>
  );
}

function MegaPanel({
  menu,
  onClick,
}: {
  menu: NavGroup;
  onClick: () => void;
}) {
  if (menu.columns?.length) {
    return (
      <div className="mega mega-panel">
        <div className="mega-panel__inner wrap">
          <div
            className={`mega-panel__cols${menu.featured ? ' mega-panel__cols--featured' : ''}`}
            style={{ ['--mega-cols' as string]: String(menu.columns.length) }}
          >
            {menu.columns.map((col) => (
              <MegaColumnBlock key={col.title} column={col} onClick={onClick} />
            ))}
          </div>
          {menu.featured ? (
            <aside className="mega-featured">
              <span className="mega-featured__eyebrow">{menu.featured.eyebrow}</span>
              <strong className="mega-featured__title">{menu.featured.title}</strong>
              <p className="mega-featured__desc">{menu.featured.desc}</p>
              <NavAnchor href={menu.featured.href} className="mega-featured__cta" onClick={onClick}>
                {menu.featured.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </NavAnchor>
            </aside>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mega">
      {menu.items.map((item) => (
        <NavAnchor key={item.label} href={item.href} onClick={onClick}>
          {item.label}
        </NavAnchor>
      ))}
    </div>
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
        {session.role !== 'guest' && (
          <Link
            href="/settings"
            role="menuitem"
            className="nav-user-link"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
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
  const { openSearch, locale, setLocale } = useGlobalTools();
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
    if (!session) {
      setInboxUnread(0);
      return;
    }
    if (isApiMode() && session.accountType === 'CLIENT') {
      void unreadTotalApi(session)
        .then(setInboxUnread)
        .catch(() => setInboxUnread(0));
      return;
    }
    setInboxUnread(unreadTotal(session));
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
    if (!session || !isApiMode() || session.accountType !== 'CLIENT') return;
    return subscribeChatSocket({
      onConversationCreated: () => refreshUnread(),
      onConversationMessage: () => refreshUnread(),
      onConversationUpdated: () => refreshUnread(),
    });
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

  // Admin has its own shell — avoid double chrome / sticky offset bugs.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header id="hdr" ref={headerRef} className={headerClass} onMouseMove={onSpotlightMove}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="ODYX home">
          <img className="logo-img" src="/brand/odyx-company.png" alt="ODYX" />
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}`} aria-label="Main">
          {HEADER_MENUS.map((m) => (
            <div
              className={`nav-item${m.columns ? ' nav-item--mega' : ''}${expandedNav === m.label ? ' exp' : ''}`}
              key={m.label}
            >
              <NavAnchor href={m.href} onClick={(e) => toggleMobileSection(m.label, e)}>
                <span className={isMenuActive(m.href) ? 'nav-link-label active' : 'nav-link-label'}>{m.label}</span> <Caret />
              </NavAnchor>
              <MegaPanel menu={m} onClick={closeMenu} />
            </div>
          ))}
          <div className="nav-mobile-auth" aria-label="Account">
            {session ? (
              <Link className="btn-ghost btn btn-sm" href="/#register" onClick={closeMenu}>Register device</Link>
            ) : (
              <Link className="btn-ghost btn btn-sm" href="/login" onClick={closeMenu}>Sign in</Link>
            )}
            <Link className="btn-ghost btn btn-sm" href="/support#contact" onClick={closeMenu}>Contact Sales</Link>
            <Link className="btn btn-sm nav-demo" href="/support" onClick={closeMenu}>Request a Demo</Link>
          </div>
        </nav>
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
              {session.accountType === 'STAFF' ? (
                <Link className="btn-ghost btn btn-sm nav-inbox" href="/admin">
                  Admin
                </Link>
              ) : (
                <>
                  <Link className="btn-ghost btn btn-sm nav-reg-device" href="/#register">
                    <span className="nav-label-long">Register device</span>
                    <span className="nav-label-short">Device</span>
                  </Link>
                  <Link className="btn-ghost btn btn-sm nav-inbox" href="/inbox" aria-label={inboxUnread > 0 ? `Inbox, ${inboxUnread} unread` : 'Inbox'}>
                    Inbox
                    {inboxUnread > 0 ? <span className="nav-inbox-badge">{inboxUnread}</span> : null}
                  </Link>
                </>
              )}
              {session.accountType === 'STAFF' && (
                <Link className="btn-ghost btn btn-sm nav-inbox" href="/admin/chat">
                  Chat
                </Link>
              )}
              <UserMenu session={session} onSignOut={signOut} />
            </>
          ) : (
            <Link className="btn-ghost btn btn-sm nav-login" href="/login">Sign in</Link>
          )}
          <Link className="btn-ghost btn btn-sm nav-sales" href="/support#contact">
            <span className="nav-label-long">Contact Sales</span>
            <span className="nav-label-short">Sales</span>
          </Link>
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
