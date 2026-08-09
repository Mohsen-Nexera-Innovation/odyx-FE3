'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS, type MegaColumn, type NavGroup, type NavLink } from '@/content/nav';
import { LOCALE_LABEL, useGlobalTools, type Locale } from './GlobalTools';
import { useAuthSession } from '@/hooks/useAuthSession';
import { isAuthShellPath } from '@/content/auth';
import { logout, type AccountSession } from '@/lib/auth';
import { unreadTotalApi } from '@/lib/inbox-api';
import { subscribeChatSocket } from '@/lib/chat-socket';

const Caret = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>);

const SearchIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);

function initialsFrom(session: AccountSession): string {
  if (session.role === 'guest') return 'G';
  const parts = session.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Dimmed entries stay in nav data for later, but are not shown. */
function visibleLinks(items: NavLink[]): NavLink[] {
  return items.filter((item) => !item.dimmed);
}

function visibleColumn(column: MegaColumn): MegaColumn | null {
  if (column.dimmed) return null;
  const groups = column.groups
    ?.map((group) => ({ ...group, items: visibleLinks(group.items) }))
    .filter((group) => group.items.length > 0);
  const items = column.items ? visibleLinks(column.items) : undefined;
  const hasGroups = (groups?.length ?? 0) > 0;
  const hasItems = (items?.length ?? 0) > 0;
  if (!hasGroups && !hasItems && !column.href) return null;
  return { ...column, groups, items };
}

function visibleMenu(menu: NavGroup): NavGroup | null {
  if (menu.dimmed) return null;
  const items = visibleLinks(menu.items);
  const columns = menu.columns
    ?.map(visibleColumn)
    .filter((col): col is MegaColumn => col != null);
  const featured = menu.featured?.dimmed ? undefined : menu.featured;
  if (!items.length && !(columns?.length) && !featured) return null;
  return { ...menu, items, columns, featured };
}

const VISIBLE_MENUS = HEADER_MENUS.map(visibleMenu).filter(
  (m): m is NavGroup => m != null,
);

function NavAnchor({
  href,
  children,
  onClick,
  className,
  onMouseEnter,
  onFocus,
  navOnly,
  'aria-current': ariaCurrent,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  /** Keep as link for hover/mega, but never navigate to href */
  navOnly?: boolean;
  'aria-current'?: 'page' | undefined;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (navOnly) e.preventDefault();
    onClick?.(e);
  };

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className={className}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        aria-disabled={navOnly ? true : undefined}
        aria-current={ariaCurrent}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      aria-disabled={navOnly ? true : undefined}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
}

/** What the featured card previews while a product link is hovered/focused */
type MegaPreview = { item: NavLink; category: string };

function navHrefPath(href: string) {
  return href.split(/[#?]/)[0] || '/';
}

function navHrefHash(href: string) {
  const i = href.indexOf('#');
  return i >= 0 ? href.slice(i + 1).split('?')[0] : '';
}

/** True when this nav href matches the current location (path + optional hash). */
function isNavHrefActive(pathname: string, href: string, hash = ''): boolean {
  const path = navHrefPath(href);
  const linkHash = navHrefHash(href);
  if (path === '/') return pathname === '/' && !linkHash;

  const pathMatch =
    pathname === path || pathname.startsWith(`${path}/`);
  if (!pathMatch) return false;

  if (linkHash) {
    return pathname === path && hash === linkHash;
  }
  // Path-only links stay active on nested routes; on the exact page they
  // yield to a hash-specific sibling when a hash is present.
  if (pathname.startsWith(`${path}/`)) return true;
  return !hash;
}

function collectMenuHrefs(menu: NavGroup): string[] {
  const hrefs: string[] = [menu.href];
  for (const item of menu.items) hrefs.push(item.href);
  for (const col of menu.columns ?? []) {
    if (col.href) hrefs.push(col.href);
    for (const item of col.items ?? []) hrefs.push(item.href);
    for (const group of col.groups ?? []) {
      for (const item of group.items) hrefs.push(item.href);
    }
  }
  if (menu.featured?.href) hrefs.push(menu.featured.href);
  return hrefs;
}

function isMenuRouteActive(menu: NavGroup, pathname: string, hash = ''): boolean {
  return collectMenuHrefs(menu).some((href) => isNavHrefActive(pathname, href, hash));
}

function MegaLink({
  item,
  onClick,
  onPreview,
  active,
}: {
  item: NavLink;
  onClick: () => void;
  onPreview?: (item: NavLink) => void;
  active?: boolean;
}) {
  const previewProps = item.img && onPreview
    ? { onMouseEnter: () => onPreview(item), onFocus: () => onPreview(item) }
    : {};
  return (
    <NavAnchor
      href={item.href}
      className={`mega-link${active ? ' active' : ''}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      {...previewProps}
    >
      <span className="mega-link__label">{item.label}</span>
    </NavAnchor>
  );
}

function MegaColumnBlock({
  column,
  onClick,
  onPreview,
  pathname,
  hash,
}: {
  column: MegaColumn;
  onClick: () => void;
  onPreview?: (preview: MegaPreview) => void;
  pathname: string;
  hash: string;
}) {
  const preview = onPreview
    ? (item: NavLink) => onPreview({ item, category: column.title })
    : undefined;
  const titleActive = column.href
    ? isNavHrefActive(pathname, column.href, hash)
    : false;
  return (
    <div className="mega-col">
      {column.href ? (
        <NavAnchor
          href={column.href}
          className={`mega-col__title${titleActive ? ' active' : ''}`}
          onClick={onClick}
          aria-current={titleActive ? 'page' : undefined}
        >
          {column.title}
        </NavAnchor>
      ) : (
        <p className="mega-col__title">{column.title}</p>
      )}
      {column.groups?.map((group, i) => (
        <div className="mega-group" key={group.label ?? `g-${i}`}>
          {group.label ? <p className="mega-group__label">{group.label}</p> : null}
          {group.items.map((item) => (
            <MegaLink
              key={item.label + item.href}
              item={item}
              onClick={onClick}
              onPreview={preview}
              active={isNavHrefActive(pathname, item.href, hash)}
            />
          ))}
        </div>
      ))}
      {column.items?.map((item) => (
        <MegaLink
          key={item.label + item.href}
          item={item}
          onClick={onClick}
          onPreview={preview}
          active={isNavHrefActive(pathname, item.href, hash)}
        />
      ))}
    </div>
  );
}

function MegaPanel({
  menu,
  onClick,
  pathname,
  hash,
}: {
  menu: NavGroup;
  onClick: () => void;
  pathname: string;
  hash: string;
}) {
  // The featured card previews whichever product link is hovered/focused,
  // falling back to the menu's default flagship when nothing is.
  const [preview, setPreview] = useState<MegaPreview | null>(null);
  if (menu.columns?.length) {
    const featured = menu.featured;
    const shown = featured
      ? preview
        ? {
            eyebrow: preview.category,
            title: preview.item.label,
            desc: preview.item.desc ?? featured.desc,
            href: preview.item.href,
            cta: `Explore ${preview.item.label}`,
            img: preview.item.img,
            imgAlt: preview.item.label,
          }
        : featured
      : null;
    return (
      <div className="mega mega-panel" onMouseLeave={() => setPreview(null)}>
        <div className="mega-panel__inner wrap">
          <div
            className={`mega-panel__cols${menu.featured ? ' mega-panel__cols--featured' : ''}`}
            style={{ ['--mega-cols' as string]: String(menu.columns.length) }}
          >
            {menu.columns.map((col) => (
              <MegaColumnBlock
                key={col.title}
                column={col}
                onClick={onClick}
                onPreview={menu.featured ? setPreview : undefined}
                pathname={pathname}
                hash={hash}
              />
            ))}
          </div>
          {shown ? (
            <aside className="mega-featured">
              {shown.img ? (
                <span className="mega-featured__media">
                  {/* keyed by src so a swap remounts and replays the fade-in */}
                  <img key={shown.img} src={shown.img} alt={shown.imgAlt ?? ''} loading="lazy" />
                </span>
              ) : null}
              <span className="mega-featured__eyebrow">{shown.eyebrow}</span>
              <strong className="mega-featured__title">{shown.title}</strong>
              <p className="mega-featured__desc">{shown.desc}</p>
              <NavAnchor
                href={shown.href}
                className="mega-featured__cta"
                onClick={onClick}
              >
                {shown.cta}
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
      {menu.items.map((item) => {
        const active = isNavHrefActive(pathname, item.href, hash);
        return (
          <NavAnchor
            key={item.label}
            href={item.href}
            className={active ? 'active' : undefined}
            aria-current={active ? 'page' : undefined}
            onClick={onClick}
          >
            {item.label}
          </NavAnchor>
        );
      })}
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
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [heroLight, setHeroLight] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  const [hash, setHash] = useState('');
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isMenuActive = (menu: NavGroup) =>
    isMenuRouteActive(menu, pathname || '/', hash);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ''));
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  const refreshUnread = () => {
    if (!session || session.accountType !== 'CLIENT') {
      setInboxUnread(0);
      return;
    }
    void unreadTotalApi(session)
      .then(setInboxUnread)
      .catch(() => setInboxUnread(0));
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
    if (!session || session.accountType !== 'CLIENT') return;
    return subscribeChatSocket({
      onConversationCreated: () => refreshUnread(),
      onConversationMessage: () => refreshUnread(),
      onConversationUpdated: () => refreshUnread(),
    });
  }, [session]);

  // Hero-aware scroll: transparent over hero, dark while still in hero, light once past hero.
  useEffect(() => {
    // A hero marked data-hero-light is a light surface — the bar goes on-light
    // immediately instead of transparent (white links would be unreadable).
    // data-hero-dark marks custom dark heroes that don't use .page-hero styles.
    const heroEl = document.querySelector('.page-hero, [data-hero-light], [data-hero-dark]');
    setHasHero(!!heroEl);
    setHeroLight(!!heroEl?.hasAttribute('data-hero-light'));

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
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(false);
        setExpandedNav(null);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && window.innerWidth <= 1024 ? 'hidden' : '';
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

  // Keep mega closed after a link click until the pointer leaves the nav —
  // otherwise same-page hash links (About sections) reopen the panel while
  // the cursor is still hovering the parent item.
  useEffect(() => {
    if (!forceClose) return;
    const nav = headerRef.current?.querySelector('.nav-menu');
    const reset = () => setForceClose(false);
    nav?.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { once: true, passive: true });
    return () => {
      nav?.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', reset);
    };
  }, [forceClose]);

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
    setForceClose(true);
  };

  const toggleMobileSection = (label: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth > 1024) return;
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

  const transparent = hasHero && !heroLight && !pastHero && !scrolled;
  const onLight = hasHero && (pastHero || heroLight);
  const headerClass = [
    transparent ? 'transparent' : '',
    onLight ? 'on-light' : '',
    !transparent && !onLight ? 'solid' : '',
    scrolled && !onLight ? 'scrolled' : '',
    !scrolled ? 'at-top' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Admin and auth screens use their own shell — avoid double chrome / sticky offset bugs.
  if (pathname?.startsWith('/admin') || isAuthShellPath(pathname)) return null;

  return (
    <header id="hdr" ref={headerRef} className={headerClass} onMouseMove={onSpotlightMove}>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="ODYX home">
          <img className="logo-img" src="/brand/odyx-company.png" alt="ODYX" />
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}${forceClose ? ' force-close' : ''}`} aria-label="Main">
          {VISIBLE_MENUS.map((m) => (
            <div
              className={`nav-item${m.columns ? ' nav-item--mega' : ''}${expandedNav === m.label ? ' exp' : ''}`}
              key={m.label}
            >
              <NavAnchor
                href={m.href}
                navOnly={m.navOnly}
                onClick={(e) => toggleMobileSection(m.label, e)}
              >
                <span className={isMenuActive(m) ? 'nav-link-label active' : 'nav-link-label'}>{m.label}</span> <Caret />
              </NavAnchor>
              <MegaPanel menu={m} onClick={closeMenu} pathname={pathname || '/'} hash={hash} />
            </div>
          ))}
          <div className="nav-mobile-auth" aria-label="Account">
            {session ? null : (
              <Link className="btn-ghost btn btn-sm" href="/login" onClick={closeMenu}>Sign in</Link>
            )}
            <Link className="btn-ghost btn btn-sm" href="/sales" onClick={closeMenu}>Contact Sales</Link>
            <Link className="btn btn-sm nav-demo" href="/request-demo" onClick={closeMenu}>Request a Demo</Link>
          </div>
        </nav>
        <div className="nav-tools">
          <button type="button" className="tool-btn search-btn" onClick={openSearch} title="Search (Cmd+K)" aria-label="Open search">
            <SearchIcon />
          </button>
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
                <Link className="btn-ghost btn btn-sm nav-inbox" href="/inbox" aria-label={inboxUnread > 0 ? `Inbox, ${inboxUnread} unread` : 'Inbox'}>
                  Inbox
                  {inboxUnread > 0 ? <span className="nav-inbox-badge">{inboxUnread}</span> : null}
                </Link>
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
          <Link className="btn-ghost btn btn-sm nav-sales" href="/sales">
            <span className="nav-label-long">Contact Sales</span>
            <span className="nav-label-short">Sales</span>
          </Link>
          <Link className="btn btn-sm nav-demo" href="/request-demo">
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
