import {
  Camera,
  CloudUpload,
  FileCheck2,
  FileImage,
  FileText,
  Mail,
  MessageCircle,
} from 'lucide-react';
import type { SendMethod } from './types';

const FILE_GUIDANCE = [
  { label: 'STL / PLY / DICOM Scan File', icon: FileCheck2 },
  { label: 'Intraoral Scan Required', icon: CloudUpload },
  { label: 'Bite Scan Recommended', icon: FileImage },
  { label: 'Photos Recommended', icon: Camera },
  { label: 'Prescription Optional', icon: FileText },
] as const;

type SendMethodStepProps = {
  value: SendMethod;
  onChange: (value: SendMethod) => void;
};

export default function SendMethodStep({ value, onChange }: SendMethodStepProps) {
  return (
    <div className="case-send-content">
      <div className="case-send-grid" role="radiogroup" aria-label="Send method">
        <label className={`case-send-option case-send-option--whatsapp${value === 'whatsapp' ? ' is-selected' : ''}`}>
          <input
            type="radio"
            name="sendMethod"
            checked={value === 'whatsapp'}
            onChange={() => onChange('whatsapp')}
          />
          <MessageCircle size={40} strokeWidth={1.7} aria-hidden />
          <h2>WhatsApp</h2>
          <p>After submitting your request, you will be redirected to WhatsApp to send your scan files.</p>
          <span>Continue via WhatsApp</span>
        </label>
        <label className={`case-send-option case-send-option--email${value === 'email' ? ' is-selected' : ''}`}>
          <input
            type="radio"
            name="sendMethod"
            checked={value === 'email'}
            onChange={() => onChange('email')}
          />
          <Mail size={40} strokeWidth={1.7} aria-hidden />
          <h2>Email</h2>
          <p>After submitting your request, please send your scan files to:</p>
          <strong>support@odyx.com</strong>
          <span>Copy Email Address</span>
        </label>
      </div>

      <section className="case-file-guide">
        <h2>Please prepare the following files:</h2>
        <div className="case-file-guide__grid">
          {FILE_GUIDANCE.map(({ label, icon: Icon }) => (
            <div key={label}>
              <span><Icon size={23} aria-hidden /></span>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
