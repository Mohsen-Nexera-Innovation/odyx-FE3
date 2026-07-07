import Link from 'next/link';
import { Arrow, PageActions } from '@/components/PageHero';

const HERO_IMG_WIDTH = 964;
const HERO_IMG_HEIGHT = 1280;

type Accent = 'teal' | 'orange';

const BRAND_PRINTING = {
  src: '/brand/odyx-digital-printing-mark-light.png',
  alt: 'ODYX Digital Printing',
  className: 'prod-print-hero__brand',
};

const BRAND_SCANNERS = {
  src: '/brand/odyx-scanners.png',
  alt: 'ODYX Scanners',
  className: 'prod-print-hero__brand prod-print-hero__brand--scanners',
};

const DEFAULT_EYEBROW: Record<Accent, string> = {
  teal: 'Capture. Design. Deliver.',
  orange: 'Precision meets production',
};

export interface CinematicHeroCrumb {
  label: string;
  href: string;
}

export interface CinematicHeroAction {
  label: string;
  href: string;
}

export interface CinematicHeroProps {
  accent: Accent;
  crumbs: CinematicHeroCrumb[];
  title: string;
  lead: string;
  heroImg: string;
  heroAlt: string;
  eyebrow?: string;
  desc?: string;
  primaryAction: CinematicHeroAction;
  secondaryAction?: CinematicHeroAction;
}

function isCutoutHero(src: string) {
  return src.endsWith('.png');
}

export default function CinematicHero({
  accent,
  crumbs,
  title,
  lead,
  heroImg,
  heroAlt,
  eyebrow,
  desc,
  primaryAction,
  secondaryAction,
}: CinematicHeroProps) {
  const brand = accent === 'teal' ? BRAND_SCANNERS : BRAND_PRINTING;
  const printerClass = [
    'prod-cine-hero__printer',
    !isCutoutHero(heroImg) ? 'prod-cine-hero__printer--photo' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className="prod-cine-hero" aria-labelledby="cine-hero-title">
      <div className="prod-cine-hero__bg" aria-hidden />
      <div className="prod-cine-hero__glow" aria-hidden />

      <div className="wrap prod-cine-hero__wrap">
        <nav className="crumbs prod-print-hero__crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.href + c.label} style={{ display: 'contents' }}>
              {i > 0 && <span className="sep">/</span>}
              {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>

        <div className="prod-cine-hero__copy">
          <img
            className={brand.className}
            src={brand.src}
            alt={brand.alt}
            width={1000}
            height={429}
          />
          <p className="prod-print-hero__eyebrow">{eyebrow ?? DEFAULT_EYEBROW[accent]}</p>
          <h1 id="cine-hero-title" className="prod-cine-hero__title">{title}</h1>
          <p className="prod-print-hero__lead">{lead}</p>
          {desc && <p className="prod-print-hero__desc">{desc}</p>}
          <PageActions>
            <Link className="btn btn-sign" href={primaryAction.href}>
              {primaryAction.label} <Arrow />
            </Link>
            {secondaryAction && (
              <Link className="btn btn-ghost prod-print-hero__ghost" href={secondaryAction.href}>
                {secondaryAction.label} <Arrow />
              </Link>
            )}
          </PageActions>
        </div>
      </div>

      <div className="prod-cine-hero__floor" aria-hidden />
      <img
        className={printerClass}
        src={heroImg}
        alt={heroAlt}
        width={HERO_IMG_WIDTH}
        height={HERO_IMG_HEIGHT}
        decoding="async"
        fetchPriority="high"
      />
    </section>
  );
}
