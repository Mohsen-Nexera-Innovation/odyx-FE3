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

export function PageCta({
  title,
  desc,
  demoClassName = 'btn btn-dark',
}: {
  title: string;
  desc: string;
  demoClassName?: string;
}) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="cta-band reveal">
          <h2>{title}</h2>
          <p>{desc}</p>
          <Link className={demoClassName} href="/support">Request a Demo <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function SpecTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="spec-table reveal">
      <table>
        <tbody>
          {specs.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DownloadList({ items }: { items: { name: string; type: string; href: string }[] }) {
  return (
    <ul className="dl-list reveal">
      {items.map((d) => (
        <li key={d.name}>
          <Link href={d.href}>
            <span className="dl-name">{d.name}</span>
            <span className="dl-type">{d.type}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { Arrow };
