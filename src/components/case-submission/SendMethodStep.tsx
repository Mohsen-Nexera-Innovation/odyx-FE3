import { Camera, CloudUpload, FileCheck2, FileImage, FileText, Mail } from 'lucide-react';
import type { SendMethod } from './types';

// Custom WhatsApp Icon to match the image
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.098.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

const FILE_GUIDANCE = [
  { label1: 'STL / PLY / OBJ', label2: 'Scan File',       icon: FileCheck2 },
  { label1: 'Intraoral Scan',  label2: 'Required',        icon: CloudUpload },
  { label1: 'Bite Scan',       label2: 'Recommended',     icon: FileImage },
  { label1: 'Photos',          label2: 'Recommended',     icon: Camera },
  { label1: 'Prescription',    label2: 'Optional',        icon: FileText },
] as const;

type SendMethodStepProps = {
  value: SendMethod;
  onChange: (value: SendMethod) => void;
  errors?: Record<string, string>;
};

export default function SendMethodStep({ value, onChange, errors = {} }: SendMethodStepProps) {
  return (
    <div className="flex flex-col gap-4">

      {/* Method cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Send method">

        {/* WhatsApp */}
        <label className={`relative min-h-[260px] p-7 border-[1.5px] rounded-[8px] flex flex-col items-center text-center cursor-pointer transition-all duration-150 bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] ${
          value === 'whatsapp'
            ? 'border-[#25D366] bg-[#F0FDF4] shadow-[0_0_0_1px_#25D366]'
            : 'border-[#E5E7EB] hover:border-[#C5CDD8] hover:bg-[#F7F9FB]'
        }`}>
          <input type="radio" name="sendMethod" className="sr-only" checked={value === 'whatsapp'} onChange={() => onChange('whatsapp')} />
          <WhatsAppIcon aria-hidden className="w-12 h-12 text-[#25D366] mb-3.5" />
          <h2 className="text-[17px] font-bold text-[#0A1020] m-0 mb-2.5">WhatsApp</h2>
          <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed max-w-[240px] m-0">
            After submitting your request,<br/>you will be redirected to WhatsApp<br/>to send your scan files.
          </p>
          <div className="mt-auto pt-6 w-full">
            <span className="flex items-center justify-center w-full h-[40px] rounded-[6px] bg-[#16A34A] text-white text-[13px] font-bold hover:bg-[#15803d] transition-colors">
              Continue to WhatsApp
            </span>
          </div>
        </label>

        {/* Email */}
        <label className={`relative min-h-[260px] p-7 border-[1.5px] rounded-[8px] flex flex-col items-center text-center cursor-pointer transition-all duration-150 bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] ${
          value === 'email'
            ? 'border-[#0050D8] bg-[#F3F7FF] shadow-[0_0_0_1px_#0050D8]'
            : 'border-[#E5E7EB] hover:border-[#C5CDD8] hover:bg-[#F7F9FB]'
        }`}>
          <input type="radio" name="sendMethod" className="sr-only" checked={value === 'email'} onChange={() => onChange('email')} />
          <Mail size={44} strokeWidth={1.7} aria-hidden className="text-[#0050D8] mb-3.5" />
          <h2 className="text-[17px] font-bold text-[#0A1020] m-0 mb-2.5">Email</h2>
          <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed max-w-[240px] m-0">
            After submitting your request,<br/>please send your scan files to:
          </p>
          <strong className={`text-[15px] font-bold mt-2.5 ${value === 'email' ? 'text-[#0050D8]' : 'text-[#0050D8]'}`}>
            Support@odyxegypt.net
          </strong>
          <div className="mt-auto pt-6 w-full">
            <span className="flex items-center justify-center w-full h-[40px] rounded-[6px] bg-[#0050D8] text-white text-[13px] font-bold hover:bg-[#003da6] transition-colors">
              Copy Email Address
            </span>
          </div>
        </label>
      </div>
      {errors.sendMethod && (
        <p className="text-[#EF4444] text-[13px] font-medium m-0 mt-[-4px]">{errors.sendMethod}</p>
      )}

      {/* File guidance */}
      <div className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-6">
        <h2 className="text-[14px] font-bold text-[#0A1020] m-0 mb-5">Please prepare the following files:</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {FILE_GUIDANCE.map(({ label1, label2, icon: Icon }) => (
            <div key={label1} className="flex flex-col items-center gap-2.5 text-center">
              <span className="w-[52px] h-[52px] rounded-[10px] bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0050D8] shadow-sm">
                <Icon size={24} aria-hidden strokeWidth={1.5} />
              </span>
              <p className="text-[12px] font-semibold text-[#0A1020] leading-tight m-0">
                {label1}<br/>
                <span className="font-normal text-[#6B7280] mt-0.5 inline-block">{label2}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
