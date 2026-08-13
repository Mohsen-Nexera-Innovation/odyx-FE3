'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS, type MegaColumn, type NavGroup, type NavLink } from '@/content/nav';
import { isAuthShellPath } from '@/content/auth';
import { useGlobalTools, type Locale } from '@/components/GlobalTools';

const SITE_NOTICE: Record<Locale, string> = {
  en: 'The Website is under construction - بث تجريبي',
  ar: 'The Website is under construction - بث تجريبي',
  fr: 'The Website is under construction - بث تجريبي',
};

const Caret = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>);

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

function ComingSoonNavItem({ label }: { label: string }) {
  const tipId = `nav-soon-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="nav-item is-coming-soon">
      <span
        className="nav-soon"
        tabIndex={0}
        aria-disabled="true"
        aria-label={`${label}, coming soon`}
        aria-describedby={tipId}
      >
        <span className="nav-link-label">{label}</span>
      </span>
      <span id={tipId} className="nav-soon-tip" role="tooltip">
        Coming soon
      </span>
    </div>
  );
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

export default function Header() {
  const pathname = usePathname();
  const { locale } = useGlobalTools();
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [heroLight, setHeroLight] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [forceClose, setForceClose] = useState(false);
  const [hash, setHash] = useState('');
  const headerRef = useRef<HTMLElement>(null);

  const isMenuActive = (menu: NavGroup) =>
    isMenuRouteActive(menu, pathname || '/', hash);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ''));
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

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
        const hdr = headerRef.current?.offsetHeight ?? 68;
        setPastHero(heroEl.getBoundingClientRect().bottom <= hdr);
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
    const el = headerRef.current;
    if (!el) {
      document.documentElement.style.setProperty('--hdr-h', '0px');
      return;
    }
    const syncH = () => {
      document.documentElement.style.setProperty('--hdr-h', `${el.offsetHeight}px`);
    };
    syncH();
    const ro = new ResizeObserver(syncH);
    ro.observe(el);

    // iOS Safari moves the visual viewport when the URL bar shows/hides.
    // Fixed chrome stays on the layout viewport, leaving a gap above the bar
    // where page content (e.g. Why ODYX) shows through. Pin to the visual top.
    const vv = window.visualViewport;
    const pin = () => {
      el.style.top = `${vv?.offsetTop ?? 0}px`;
    };
    pin();
    vv?.addEventListener('resize', pin);
    vv?.addEventListener('scroll', pin);

    return () => {
      ro.disconnect();
      vv?.removeEventListener('resize', pin);
      vv?.removeEventListener('scroll', pin);
      document.documentElement.style.removeProperty('--hdr-h');
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
      <p className="site-notice" role="status">
        {SITE_NOTICE[locale]}
      </p>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="ODYX home">
          <img className="logo-img logo-img-on-dark" src="/brand/odyx-egypt-white.png" alt="ODYX Egypt" />
          <img className="logo-img logo-img-on-light" src="/brand/odyx-egypt.png" alt="ODYX Egypt" />
        </Link>
        <nav className={`nav-menu${open ? ' open' : ''}${forceClose ? ' force-close' : ''}`} aria-label="Main">
          {VISIBLE_MENUS.map((m) =>
            m.comingSoon ? (
              <ComingSoonNavItem key={m.label} label={m.label} />
            ) : (
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
            ),
          )}
        </nav>
        <div className="nav-tools">
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
