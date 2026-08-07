import { ClipboardList } from 'lucide-react';
import type { CaseSubmissionData } from './types';

export default function OrderSummary({ data }: { data: CaseSubmissionData }) {
  const rows = [
    ['Design Type', data.caseDetails.designType],
    ['Tooth Number(s)', data.caseDetails.toothNumbers || '—'],
    ['Material', data.caseDetails.otherMaterial || data.caseDetails.material],
    ['Shade', data.caseDetails.shade],
    ['Files', '—'],
    ['Send Method', data.sendMethod === 'whatsapp' ? 'WhatsApp' : 'Email'],
  ];

  return (
    <aside className="case-summary case-side-card" aria-label="Order summary">
      <span className="case-side-card__icon" aria-hidden>
        <ClipboardList size={20} />
      </span>
      <h2>Order Summary</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
