import { ClipboardList, CreditCard, MessageCircle, UserRound } from 'lucide-react';
import { PAYMENT_METHOD_LABELS, type CaseSubmissionData } from '../types';

type ReviewSubmitStepProps = {
  data: CaseSubmissionData;
  onEdit: (step: number) => void;
  onConfirmedChange: (confirmed: boolean) => void;
};

function ReviewSection({
  icon,
  title,
  step,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 sm:px-6 py-5">
      <div className="flex items-center gap-3 mb-4 text-[#4B5563]">
        <span aria-hidden className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] bg-white">
          {icon}
        </span>
        <h2 className="flex-1 text-[14px] font-bold text-[#0A1020] m-0">{title}</h2>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-[#0050D8] text-[13px] font-bold cursor-pointer transition-colors hover:text-[#003da6] bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-[rgba(0,80,216,.2)]"
        >
          Edit
        </button>
      </div>
      <div className="pl-11">{children}</div>
    </section>
  );
}

export default function ReviewSubmitStep({ data, onEdit, onConfirmedChange }: ReviewSubmitStepProps) {
  const doctor = data.doctor;
  const details = data.caseDetails;
  const paymentLabel = data.paymentMethod
    ? PAYMENT_METHOD_LABELS[data.paymentMethod]
    : '—';

  return (
    <div className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] overflow-hidden divide-y divide-[#E5E7EB]">

      <ReviewSection icon={<UserRound size={16} strokeWidth={2} />} title="Doctor Information" step={1} onEdit={onEdit}>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-semibold text-[#0A1020] m-0">{doctor.fullName}</p>
          <p className="text-[13px] font-medium text-[#4B5563] m-0">{doctor.clinicName}</p>
          <p className="text-[13px] font-medium text-[#4B5563] m-0">{doctor.country}{doctor.city ? `, ${doctor.city}` : ''}</p>
          {doctor.address && <p className="text-[13px] font-medium text-[#4B5563] m-0">{doctor.address}</p>}
          <p className="text-[13px] font-medium text-[#4B5563] m-0">{doctor.countryCode} {doctor.whatsapp}</p>
          <p className="text-[13px] font-medium text-[#4B5563] m-0">{doctor.email}</p>
        </div>
      </ReviewSection>

      <ReviewSection icon={<ClipboardList size={16} strokeWidth={2} />} title="Case Details" step={2} onEdit={onEdit}>
        <dl className="grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] gap-y-2 gap-x-3 m-0">
          {[
            ['Design Type',        details.designType],
            ['Tooth Number(s)',    details.toothNumbers || '—'],
            ['Material',          details.material],
            ['Shade',             details.shade],
            ['Color Notes',       details.colorNotes || '—'],
            ['Special Instructions', details.instructions || '—'],
          ].map(([label, val]) => (
            <div key={label} className="contents">
              <dt className="text-[12.5px] font-medium text-[#6B7280]">{label}</dt>
              <dd className="text-[12.5px] font-semibold text-[#0A1020] m-0 break-words">{val}</dd>
            </div>
          ))}
        </dl>
      </ReviewSection>

      <ReviewSection icon={<MessageCircle size={16} strokeWidth={2} />} title="Send Method" step={3} onEdit={onEdit}>
        <p className="text-[12.5px] font-semibold text-[#0A1020] m-0">
          {data.sendMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
        </p>
      </ReviewSection>

      <ReviewSection icon={<CreditCard size={16} strokeWidth={2} />} title="Payment Method" step={4} onEdit={onEdit}>
        <p className="text-[12.5px] font-semibold text-[#0A1020] m-0">{paymentLabel}</p>
      </ReviewSection>

      {/* Confirmation checkbox */}
      <label className="flex items-center gap-3 px-4 sm:px-6 py-5 bg-white cursor-pointer select-none">
        <input
          type="checkbox"
          checked={data.confirmed}
          onChange={(e) => onConfirmedChange(e.target.checked)}
          className="w-4 h-4 accent-[#16A34A] cursor-pointer flex-shrink-0 border-[#D1D5DB] rounded-[4px]"
        />
        <span className="text-[13px] font-medium text-[#0A1020]">
          I confirm that all information is correct.
        </span>
      </label>

    </div>
  );
}
