import {
  ROI_PILLARS_ECOSYSTEM,
  ROI_PILLARS_PRINTER,
  type RoiScope,
} from '@/content/roi';

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  'lab-fee': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  materials: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3c3.5 4.4 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.4 12 3z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 6h6M9 18h6" />
      <rect x="2" y="3" width="7" height="6" rx="2" />
      <rect x="15" y="3" width="7" height="6" rx="2" />
      <rect x="8.5" y="15" width="7" height="6" rx="2" />
      <path d="M5.5 9v3a2 2 0 0 0 2 2h1M18.5 9v3a2 2 0 0 1-2 2h-1" />
    </svg>
  ),
};

type Props = {
  scope?: RoiScope;
};

export default function RoiPillars({ scope = 'printer' }: Props) {
  const pillars =
    scope === 'ecosystem' ? ROI_PILLARS_ECOSYSTEM : ROI_PILLARS_PRINTER;

  return (
    <div className="roi-pillars">
      {pillars.map((p, i) => (
        <article key={p.id} className="roi-pillar reveal">
          <span className="roi-pillar-num" aria-hidden>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="roi-pillar-ic">{PILLAR_ICONS[p.id]}</span>
          <span className="roi-pillar-stat">{p.stat}</span>
          <h4>{p.title}</h4>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  );
}
