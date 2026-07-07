import type { ProductStat } from '@/content/products';

const DEFAULT_STATS: ProductStat[] = [
  { value: '25µm', label: 'Layer precision', desc: 'Validated profiles for clinical-grade detail.' },
  { value: '2×', label: 'Configurations', desc: 'Print One for chairside, Print Pro for production.' },
  { value: '5+', label: 'Indications', desc: 'Crowns, guides, models, dentures and more.' },
];

export default function PrintLineStats({ stats }: { stats?: ProductStat[] }) {
  const items = stats ?? DEFAULT_STATS;

  return (
    <section className="prod-print-stats" aria-label="Key capabilities">
      <div className="wrap prod-print-stats__grid">
        {items.map((s) => (
          <article key={s.label} className="prod-print-stat reveal">
            <p className="prod-print-stat__value">{s.value}</p>
            <h2 className="prod-print-stat__label">{s.label}</h2>
            <p className="prod-print-stat__desc">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
