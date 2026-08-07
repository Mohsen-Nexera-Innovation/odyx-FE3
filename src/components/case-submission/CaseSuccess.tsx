import { Check, CheckCircle2, Copy, Mail, MessageCircle } from 'lucide-react';
import type { SendMethod } from './types';

export default function CaseSuccess({
  sendMethod,
  caseId,
}: {
  sendMethod: SendMethod;
  caseId: string;
}) {
  const copyCaseId = () => {
    void navigator.clipboard?.writeText(caseId);
  };

  return (
    <section className="case-success" aria-labelledby="case-success-title">
      <div className="case-success__celebration" aria-hidden>
        {Array.from({ length: 14 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="case-success__grid">
        <div className="case-success__main">
          <span className="case-success__check" aria-hidden>
            <Check size={38} strokeWidth={2.5} />
          </span>
          <h1 id="case-success-title">Your Case Has Been Submitted!</h1>
          <p>Thank you. We have received your case and our team is working on it.</p>
          <div className="case-id-card">
            <span>Your Case ID</span>
            <strong>{caseId}</strong>
            <button type="button" onClick={copyCaseId} aria-label="Copy case ID">
              <Copy size={17} aria-hidden />
            </button>
            <small>Save this ID to track your case or share with our support team.</small>
          </div>
          <div className="case-success__actions">
            <a
              className="case-success__action case-success__action--whatsapp"
              href="https://wa.me/"
            >
              <MessageCircle size={18} aria-hidden />
              {sendMethod === 'whatsapp' ? 'Open WhatsApp' : 'Chat on WhatsApp'}
            </a>
            <a className="case-success__action" href="mailto:support@odyx.com">
              <Mail size={18} aria-hidden />
              Open Email
            </a>
          </div>
        </div>

        <aside className="case-next-card">
          <h2>What&apos;s Next?</h2>
          <ol>
            <li className="is-done">
              <span><Check size={14} /></span>
              <div><strong>Case Received</strong><small>We have received your case.</small></div>
            </li>
            <li className="is-done">
              <span><Check size={14} /></span>
              <div><strong>In Review</strong><small>Our CAD team is reviewing your case.</small></div>
            </li>
            <li>
              <span>3</span>
              <div><strong>Design In Progress</strong><small>We are designing your case.</small></div>
            </li>
            <li>
              <span>4</span>
              <div><strong>Ready for Delivery</strong><small>We will deliver it via WhatsApp or Email.</small></div>
            </li>
          </ol>
          <p><CheckCircle2 size={16} aria-hidden /> You can close this page safely.</p>
        </aside>
      </div>
    </section>
  );
}
