import { ClipboardList, MessageCircle, Pencil, UserRound } from 'lucide-react';
import type { CaseSubmissionData } from './types';

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
    <section className="case-review-section">
      <div className="case-review-section__heading">
        <span aria-hidden>{icon}</span>
        <h2>{title}</h2>
        <button type="button" onClick={() => onEdit(step)}>
          Edit <Pencil size={13} aria-hidden />
        </button>
      </div>
      <div className="case-review-section__body">{children}</div>
    </section>
  );
}

export default function ReviewSubmitStep({
  data,
  onEdit,
  onConfirmedChange,
}: ReviewSubmitStepProps) {
  const doctor = data.doctor;
  const details = data.caseDetails;

  return (
    <div className="case-review-card">
      <ReviewSection icon={<UserRound size={19} />} title="Doctor Information" step={1} onEdit={onEdit}>
        <p><strong>{doctor.fullName}</strong></p>
        <p>{doctor.clinicName}</p>
        <p>{doctor.country}{doctor.city ? `, ${doctor.city}` : ''}</p>
        {doctor.address ? <p>{doctor.address}</p> : null}
        <p>{doctor.countryCode} {doctor.whatsapp}</p>
        <p>{doctor.email}</p>
      </ReviewSection>

      <ReviewSection icon={<ClipboardList size={19} />} title="Case Details" step={2} onEdit={onEdit}>
        <dl className="case-review-list">
          <div><dt>Design Type</dt><dd>{details.designType}</dd></div>
          <div><dt>Tooth Number(s)</dt><dd>{details.toothNumbers}</dd></div>
          <div><dt>Material</dt><dd>{details.otherMaterial || details.material}</dd></div>
          <div><dt>Shade</dt><dd>{details.shade}</dd></div>
          <div><dt>Color Notes</dt><dd>{details.colorNotes || '—'}</dd></div>
          <div><dt>Special Instructions</dt><dd>{details.instructions || '—'}</dd></div>
        </dl>
      </ReviewSection>

      <ReviewSection icon={<MessageCircle size={19} />} title="Send Method" step={3} onEdit={onEdit}>
        <p><strong>{data.sendMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}</strong></p>
      </ReviewSection>

      <label className="case-confirmation">
        <input
          type="checkbox"
          checked={data.confirmed}
          onChange={(event) => onConfirmedChange(event.target.checked)}
        />
        <span>I confirm that all information is correct.</span>
      </label>
    </div>
  );
}
