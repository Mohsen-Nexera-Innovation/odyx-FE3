
import type { CaseSubmissionData } from './types';

export default function OrderSummary({ data }: { data: CaseSubmissionData }) {
  const rows = [
    ['Design Type',    data.caseDetails.designType],
    ['Tooth Number(s)', data.caseDetails.toothNumbers || '—'],
    ['Material',       data.caseDetails.otherMaterial || data.caseDetails.material],
    ['Shade',          data.caseDetails.shade],
    ['Files',          '—'],
    ['Send Method',    data.sendMethod === 'whatsapp' ? 'WhatsApp' : data.sendMethod === 'email' ? 'Email' : '—'],
  ];

  return (
    <aside
      className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-6"
      aria-label="Order summary"
    >
      <div className="flex flex-col gap-4 mb-6">
        <div className="w-[42px] h-[42px] rounded-[10px] bg-[#0A1020] flex items-center justify-center text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 21V15a2 2 0 0 1 4 0v6" />
            <path d="M14 3h-4a5 5 0 0 0-5 5v5c0 3 2 4 4 4s2-2 3-2 1 2 3 2 4-1 4-4V8a5 5 0 0 0-5-5z" />
          </svg>
        </div>
        <h2 className="text-[16px] font-extrabold text-[#0A1020] m-0 tracking-tight">Order Summary</h2>
      </div>
      <dl className="flex flex-col gap-5">
        {rows.map(([label, val]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <dt className="text-[13px] font-medium text-[#6B7280]">{label}</dt>
            <dd className="text-[14px] font-semibold text-[#0A1020] m-0 break-words leading-tight">{val}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
