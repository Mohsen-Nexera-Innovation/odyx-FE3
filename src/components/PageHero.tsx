import Link from 'next/link';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function PageHero({
  crumbs,
  title,
  lead,
  action,
  brand,
}: {
  crumbs: { label: string; href: string }[];
  title: string;
  lead: string;
  action?: React.ReactNode;
  brand?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="grid-bg" aria-hidden />
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.href + c.label} style={{ display: 'contents' }}>
              {i > 0 && <span className="sep">/</span>}
              {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        {brand}
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {action && <div className="page-hero-actions">{action}</div>}
      </div>
    </section>
  );
}

export function PageActions({ children }: { children: React.ReactNode }) {
  return <div className="page-hero-actions">{children}</div>;
}

export function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="spec-table reveal">
      <ul className="spec-rows">
        {specs.map((s, i) => (
          <li key={s.label} className="spec-row">
            <span className="spec-row__n" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="spec-row__body">
              <span className="spec-row__label">{s.label}</span>
              <strong className="spec-row__value">{s.value}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FileIcon() {
  return (
    <svg className="dl-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5M12 18v-6M9 15l3 3 3-3" />
    </svg>
  );
}

export function DownloadList({ items }: { items: { name: string; type: string; href: string }[] }) {
  return (
    <ul className="dl-list reveal">
      {items.map((d) => (
        <li key={d.name}>
          <Link href={d.href} className="dl-item">
            <span className="dl-ic-wrap">
              <FileIcon />
            </span>
            <span className="dl-meta">
              <span className="dl-name">{d.name}</span>
              <span className="dl-type">{d.type}</span>
            </span>
            <span className="dl-action">Download</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { Arrow };
