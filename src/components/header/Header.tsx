'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HEADER_MENUS, type MegaColumn, type NavGroup, type NavLink } from '@/content/nav';
import { isAuthShellPath } from '@/content/auth';
import { useGlobalTools, type Locale } from '@/components/GlobalTools';
import { cn } from '@/lib/cn';
import {
  BURGER_BAR,
  burgerClass,
  COMING_SOON_WRAP,
  LOGO_CLASS,
  LOGO_IMG_CLASS,
  CARET_CLASS,
  MEGA_COL,
  MEGA_COLS,
  MEGA_COLS_FEATURED,
  MEGA_COL_TITLE,
  MEGA_COL_TITLE_ACTIVE,
  MEGA_COL_TITLE_LINK,
  MEGA_FEATURED,
  MEGA_FEATURED_CTA,
  MEGA_FEATURED_DESC,
  MEGA_FEATURED_EYEBROW,
  MEGA_FEATURED_IMG,
  MEGA_FEATURED_MEDIA,
  MEGA_FEATURED_TITLE,
  MEGA_GROUP,
  MEGA_GROUP_LABEL,
  MEGA_INNER,
  MEGA_LINK,
  MEGA_LINK_ACTIVE,
  MEGA_LINK_LABEL,
  MEGA_LINK_LABEL_ACTIVE,
  MEGA_SIMPLE_LINK,
  MEGA_SIMPLE_LINK_ACTIVE,
  NAV_BAR_CLASS,
  NAV_DEMO,
  NAV_DEMO_MOBILE,
  NAV_DEMO_TOOLS,
  NAV_LABEL_LONG,
  NAV_LABEL_SHORT,
  NAV_MOBILE_AUTH,
  NAV_MOBILE_AUTH_ON_LIGHT,
  NAV_SOON,
  NAV_SOON_TIP,
  NAV_TOOLS,
  NAV_TRIGGER_TW,
  SITE_NOTICE_CLASS,
  headerShellClass,
  megaDropdownClass,
  megaPanelClass,
  navItemClass,
  navLinkLabelClass,
  navMenuClass,
} from './headerChrome';
import NavAuth from './NavAuth';

const SITE_NOTICE: Record<Locale, string> = {
  en: 'The Website is under construction - بث تجريبي',
  ar: 'The Website is under construction - بث تجريبي',
  fr: 'The Website is under construction - بث تجريبي',
};

const Caret = () => (
  <svg className={CARET_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

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
  if (collectMenuHrefs(menu).some((href) => isNavHrefActive(pathname, href, hash))) {
    return true;
  }
  // Same-page hashes that aren't listed in the mega (e.g. /about#who-we-are
  // from the Our Story CTA) still belong to this section.
  const menuPath = navHrefPath(menu.href);
  if (menuPath === '/') return false;
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
}

function ComingSoonNavItem({ label }: { label: string }) {
  const tipId = `nav-soon-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={COMING_SOON_WRAP}>
      <span
        className={NAV_SOON}
        tabIndex={0}
        aria-disabled="true"
        aria-label={`${label}, coming soon`}
        aria-describedby={tipId}
      >
        <span className="nav-link-label">{label}</span>
      </span>
      <span id={tipId} className={NAV_SOON_TIP} role="tooltip">
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
      className={cn('group/link', MEGA_LINK, active && MEGA_LINK_ACTIVE)}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      {...previewProps}
    >
      <span className={cn(MEGA_LINK_LABEL, active && MEGA_LINK_LABEL_ACTIVE)}>{item.label}</span>
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
    <div className={MEGA_COL}>
      {column.href ? (
        <NavAnchor
          href={column.href}
          className={cn(MEGA_COL_TITLE_LINK, titleActive && MEGA_COL_TITLE_ACTIVE, titleActive && 'active')}
          onClick={onClick}
          aria-current={titleActive ? 'page' : undefined}
        >
          {column.title}
        </NavAnchor>
      ) : (
        <p className={MEGA_COL_TITLE}>{column.title}</p>
      )}
      {column.groups?.map((group, i) => (
        <div className={MEGA_GROUP} key={group.label ?? `g-${i}`}>
          {group.label ? <p className={MEGA_GROUP_LABEL}>{group.label}</p> : null}
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
  onLight,
  expanded,
}: {
  menu: NavGroup;
  onClick: () => void;
  pathname: string;
  hash: string;
  onLight: boolean;
  expanded: boolean;
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
      <div
        className={megaPanelClass(onLight)}
        data-expanded={expanded ? 'true' : undefined}
        onMouseLeave={() => setPreview(null)}
      >
        <div className={MEGA_INNER}>
          <div
            className={cn(MEGA_COLS, menu.featured && MEGA_COLS_FEATURED)}
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
            <aside className={MEGA_FEATURED}>
              {shown.img ? (
                <span className={MEGA_FEATURED_MEDIA}>
                  {/* keyed by src so a swap remounts and replays the fade-in */}
                  <img key={shown.img} className={MEGA_FEATURED_IMG} src={shown.img} alt={shown.imgAlt ?? ''} loading="lazy" />
                </span>
              ) : null}
              <span className={MEGA_FEATURED_EYEBROW}>{shown.eyebrow}</span>
              <strong className={MEGA_FEATURED_TITLE}>{shown.title}</strong>
              <p className={MEGA_FEATURED_DESC}>{shown.desc}</p>
              <NavAnchor
                href={shown.href}
                className={MEGA_FEATURED_CTA}
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
    <div className={megaDropdownClass()} data-expanded={expanded ? 'true' : undefined}>
      {menu.items.map((item) => {
        const active = isNavHrefActive(pathname, item.href, hash);
        return (
          <NavAnchor
            key={item.label}
            href={item.href}
            className={cn(MEGA_SIMPLE_LINK, active && MEGA_SIMPLE_LINK_ACTIVE)}
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

function initialHeroFromPath(pathname: string | null) {
  const p = pathname || '/';
  const darkHero =
    p === '/products/resins' ||
    p.startsWith('/products/resins/') ||
    /^\/solutions\/clinical-applications\/[^/]+\/?$/.test(p);
  const clearTop = p === '/' || p === '/support';
  return {
    hasHero: true,
    heroLight: !darkHero,
    heroClear: clearTop && !darkHero,
  };
}

export default function Header() {
  const pathname = usePathname();
  const { locale } = useGlobalTools();
  const [scrolled, setScrolled] = useState(false);
  const guessed = initialHeroFromPath(pathname);
  const [hasHero, setHasHero] = useState(guessed.hasHero);
  const [heroLight, setHeroLight] = useState(guessed.heroLight);
  const [heroClear, setHeroClear] = useState(guessed.heroClear);
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
    setHeroClear(!!heroEl?.hasAttribute('data-hero-clear'));

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
  const solid = !transparent && !onLight;
  const atTop = !scrolled;
  const clearTop = onLight && atTop && heroClear && !pastHero;

  // Admin and auth screens use their own shell — avoid double chrome / sticky offset bugs.
  if (pathname?.startsWith('/admin') || isAuthShellPath(pathname)) return null;

  return (
    <header
      id="hdr"
      ref={headerRef}
      className={headerShellClass({
        transparent,
        onLight,
        solid,
        scrolled: scrolled && !onLight,
        atTop,
        clearTop,
      })}
      onMouseMove={onSpotlightMove}
    >
      <p className={SITE_NOTICE_CLASS} role="status">
        {SITE_NOTICE[locale]}
      </p>
      <div className={NAV_BAR_CLASS}>
        <Link href="/" className={LOGO_CLASS} aria-label="ODYX home">
          <img
            className={LOGO_IMG_CLASS}
            src={onLight ? '/brand/odyx-egypt.png' : '/brand/odyx-egypt-white.png'}
            alt="ODYX Egypt"
          />
        </Link>
        <nav
          className={navMenuClass(open, forceClose, onLight)}
          data-open={open ? 'true' : undefined}
          aria-label="Main"
        >
          {VISIBLE_MENUS.map((m) =>
            m.comingSoon ? (
              <ComingSoonNavItem key={m.label} label={m.label} />
            ) : (
              <div
                className={navItemClass(!!m.columns, expandedNav === m.label)}
                key={m.label}
              >
                <NavAnchor
                  href={m.href}
                  className={NAV_TRIGGER_TW}
                  navOnly={m.navOnly}
                  onClick={(e) => {
                    if (window.innerWidth > 1024) {
                      closeMenu();
                      return;
                    }
                    toggleMobileSection(m.label, e);
                  }}
                >
                  <span className={navLinkLabelClass(isMenuActive(m))}>{m.label}</span> <Caret />
                </NavAnchor>
                <MegaPanel
                  menu={m}
                  onClick={closeMenu}
                  pathname={pathname || '/'}
                  hash={hash}
                  onLight={onLight}
                  expanded={expandedNav === m.label}
                />
              </div>
            ),
          )}
          <div className={cn(NAV_MOBILE_AUTH, onLight && NAV_MOBILE_AUTH_ON_LIGHT)}>
            <NavAuth placement="mobile" onNavigate={closeMenu} />
            <Link className={cn(NAV_DEMO, NAV_DEMO_MOBILE)} href="/request-demo" onClick={closeMenu}>
              Request a Demo
            </Link>
          </div>
        </nav>
        <div className={NAV_TOOLS}>
          <NavAuth placement="tools" />
          <Link className={cn(NAV_DEMO, NAV_DEMO_TOOLS)} href="/request-demo">
            <span className={NAV_LABEL_LONG}>Request a Demo</span>
            <span className={NAV_LABEL_SHORT}>Demo</span>
          </Link>
          <button
            type="button"
            className={burgerClass()}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={cn(BURGER_BAR, open && 'translate-y-[7px] rotate-45')} />
            <span className={cn(BURGER_BAR, open && 'opacity-0')} />
            <span className={cn(BURGER_BAR, open && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
      </div>
    </header>
  );
}
