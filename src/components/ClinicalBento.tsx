'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Accent = 'teal' | 'orange';
type Category = 'Restorative' | 'Surgical' | 'Orthodontic' | 'Prosthetic' | 'Provisional';

interface ClinicalItem {
  tag: Category;
  t: string;
  d: string;
  detail: string;
  img: string;
  accent: Accent;
  href: string;
}

const CATEGORIES: Array<Category | 'All'> = [
  'All',
  'Restorative',
  'Surgical',
  'Orthodontic',
  'Prosthetic',
  'Provisional',
];

const ITEMS: ClinicalItem[] = [
  {
    tag: 'Restorative',
    t: 'Crowns & Bridges',
    d: 'Single units to full-arch, designed and printed in-house.',
    detail: 'Chairside CAD/CAM for permanent and temporary restorations with validated ODYX resin.',
    img: '/img/crowns.jpg',
    accent: 'orange',
    href: '/workflows',
  },
  {
    tag: 'Surgical',
    t: 'Implant Guides',
    d: 'Accurate surgical guides for confident placement.',
    detail: 'Print stackable or single-piece guides from intraoral scan data with sub-millimeter fit.',
    img: '/img/implant.jpg',
    accent: 'teal',
    href: '/workflows',
  },
  {
    tag: 'Orthodontic',
    t: 'Orthodontic Models',
    d: 'Precise models and appliances from digital scans.',
    detail: 'High-resolution models for aligners, retainers and diagnostic wax-ups.',
    img: '/img/ortho.jpg',
    accent: 'teal',
    href: '/workflows',
  },
  {
    tag: 'Prosthetic',
    t: 'Dentures',
    d: 'Digital denture workflows with a natural finish.',
    detail: 'Base, teeth and try-in printed in sequence for predictable, lifelike outcomes.',
    img: '/img/denture.jpg',
    accent: 'orange',
    href: '/workflows',
  },
  {
    tag: 'Provisional',
    t: 'Temporary Restorations',
    d: 'Fast, durable provisionals while finals are made.',
    detail: 'Same-day temporaries that protect the prep and keep patients comfortable.',
    img: '/img/temp.jpg',
    accent: 'orange',
    href: '/workflows',
  },
];

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Placeholder = ({ label }: { label: string }) => (
  <div className="ph">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M3 17l5-4 4 3 5-5 4 4" />
    </svg>
    <small>{label}</small>
  </div>
);

function useImageLoader(imgRef: React.RefObject<HTMLImageElement | null>) {
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const src = img.dataset.isrc;
    if (!src) return;
    const probe = new Image();
    probe.onload = () => {
      img.src = src;
      img.classList.add('loaded');
    };
    probe.src = src;
  }, [imgRef]);
}

function BentoTile({
  item,
  index,
  active,
  reduced,
  built,
}: {
  item: ClinicalItem;
  index: number;
  active: boolean;
  reduced: boolean;
  built: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  useImageLoader(imgRef);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !artRef.current) return;
      const rect = artRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      artRef.current.style.setProperty('--px', `${x * 14}px`);
      artRef.current.style.setProperty('--py', `${y * 10}px`);
    },
    [reduced],
  );

  const onLeave = useCallback(() => {
    artRef.current?.style.setProperty('--px', '0px');
    artRef.current?.style.setProperty('--py', '0px');
  }, []);

  return (
    <a
      href={item.href}
      className={`capp cb-tile build${built ? ' built' : ''}${item.accent === 'teal' ? ' teal' : ''}${active ? '' : ' dim'}`}
      data-idx={index}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="capp-art cb-art" ref={artRef}>
        <div className="imgslot">
          <Placeholder label={item.t} />
          <img ref={imgRef} data-isrc={item.img} alt={item.t} />
        </div>
        <span className="capp-tag">{item.tag}</span>
        <div className="cb-expand" aria-hidden>
          <p>{item.detail}</p>
          <span className="more">
            See solutions <Arrow s={14} />
          </span>
        </div>
      </div>
      <div className="capp-body">
        <h3>{item.t}</h3>
        <p>{item.d}</p>
        <span className="more">
          See solutions <Arrow s={15} />
        </span>
      </div>
    </a>
  );
}

export default function ClinicalBento() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [reduced, setReduced] = useState(false);
  const [built, setBuilt] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Own the `built` class in React so filter re-renders don't strip it
  // (OdyxMotion adds `built` via DOM, but React className updates remove it).
  useEffect(() => {
    if (reduced) {
      setBuilt(true);
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;

    const tiles = grid.querySelectorAll('.build');
    const markBuilt = () => {
      const delay = Math.max(0, (tiles.length - 1) * 160 + 600);
      const timer = setTimeout(() => setBuilt(true), delay);
      return timer;
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = markBuilt();
        io.disconnect();
      },
      { threshold: 0.12 },
    );
    io.observe(grid);

    const rect = grid.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh * 0.94 && rect.bottom > vh * 0.06) {
      timer = markBuilt();
      io.disconnect();
    }

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <div className="cb-wrap m-up">
      <div className="cb-filters" role="tablist" aria-label="Clinical application categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            className={`cb-chip${filter === cat ? ' on' : ''}`}
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="capp-grid build-group m-stagger" ref={gridRef}>
        {ITEMS.map((item, i) => (
          <BentoTile
            key={item.t}
            item={item}
            index={i}
            active={filter === 'All' || item.tag === filter}
            reduced={reduced}
            built={built}
          />
        ))}
      </div>
    </div>
  );
}
