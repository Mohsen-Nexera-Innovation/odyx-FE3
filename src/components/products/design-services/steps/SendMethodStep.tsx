'use client';

import { CloudUpload, FileCheck2, Mail, Upload, X } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { copyText } from '../copyText';
import type { CaseAttachments, SendMethod } from '../types';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.098.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

type SendMethodStepProps = {
  value: SendMethod;
  attachments: CaseAttachments;
  onChange: (value: SendMethod) => void;
  onAttachmentsChange: (attachments: CaseAttachments) => void;
  errors?: Record<string, string>;
  onClearError?: (field: string) => void;
};

function AttachmentField({
  id,
  label,
  hint,
  accept,
  file,
  error,
  icon: Icon,
  onFile,
}: {
  id: string;
  label: string;
  hint: string;
  accept: string;
  file: File | null;
  error?: string;
  icon: typeof FileCheck2;
  onFile: (file: File | null) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 min-w-0">
      <div className="flex items-center gap-2.5">
        <span className="w-[52px] h-[52px] flex-shrink-0 rounded-[10px] bg-white border border-[#E5E7EB] flex items-center justify-center text-[#0050D8] shadow-sm">
          <Icon size={24} aria-hidden strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#0A1020] leading-tight m-0">{label}</p>
          <p className="text-[12px] font-normal text-[#6B7280] m-0 mt-0.5">{hint}</p>
        </div>
      </div>
      {file ? (
        <div className="flex items-center gap-2 min-h-[42px] border border-[#E5E7EB] rounded-[6px] bg-white px-3 py-2">
          <span className="flex-1 min-w-0 text-[13px] font-medium text-[#0A1020] truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => onFile(null)}
            aria-label={`Remove ${label}`}
            className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-[4px] text-[#6B7280] bg-transparent border-0 cursor-pointer hover:bg-[#F3F4F6] hover:text-[#0A1020]"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`inline-flex items-center justify-center gap-2 min-h-[42px] px-4 border rounded-[6px] bg-white text-[13px] font-bold cursor-pointer transition-colors ${
            error
              ? 'border-[#EF4444] text-[#EF4444]'
              : 'border-[#0050D8]/25 text-[#0050D8] hover:bg-[#F3F7FF] hover:border-[#0050D8]/40'
          }`}
        >
          <Upload size={16} aria-hidden />
          Choose file
          <input
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
      {error ? (
        <span className="text-[#EF4444] text-[12.5px] font-medium">{error}</span>
      ) : null}
    </div>
  );
}

export default function SendMethodStep({
  value,
  attachments,
  onChange,
  onAttachmentsChange,
  errors = {},
  onClearError,
}: SendMethodStepProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const supportEmail = 'Support@odyxegypt.net';

  const copySupportEmail = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onChange('email');
    const ok = await copyText(supportEmail);
    if (!ok) return;
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-4">

      {/* Method cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Receive method">

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
            Receive the completed design<br/>and case communication<br/>on WhatsApp.
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
            Receive the completed design<br/>and case communication by email.
          </p>
          <strong className="text-[15px] font-bold mt-2.5 text-[#0050D8]">
            {supportEmail}
          </strong>
          <div className="mt-auto pt-6 w-full">
            <button
              type="button"
              onClick={(event) => void copySupportEmail(event)}
              aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}
              className="flex items-center justify-center w-full h-[40px] rounded-[6px] bg-[#0050D8] text-white text-[13px] font-bold hover:bg-[#003da6] transition-colors border-0 cursor-pointer"
            >
              {emailCopied ? 'Copied' : 'Copy Email Address'}
            </button>
          </div>
        </label>
      </div>
      {errors.sendMethod && (
        <p className="text-[#EF4444] text-[13px] font-medium m-0 mt-[-4px]">{errors.sendMethod}</p>
      )}

      <div className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-6">
        <h2 className="text-[14px] font-bold text-[#0A1020] m-0 mb-5">Please attach the following files</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AttachmentField
            id="design-stl-file"
            label="STL file"
            hint="Required · at least one scan file"
            accept=".stl,model/stl,application/sla"
            file={attachments.stlFile}
            error={errors.stlFile}
            icon={FileCheck2}
            onFile={(file) => {
              onAttachmentsChange({ ...attachments, stlFile: file });
              onClearError?.('stlFile');
            }}
          />
          <AttachmentField
            id="design-intraoral-file"
            label="Intraoral Scanner file/data"
            hint="Optional · scan export"
            accept=".stl,.ply,.obj,.dcm,.zip,.3oxz,.3ox"
            file={attachments.intraoralFile}
            error={errors.intraoralFile}
            icon={CloudUpload}
            onFile={(file) => {
              onAttachmentsChange({ ...attachments, intraoralFile: file });
              onClearError?.('intraoralFile');
            }}
          />
        </div>
      </div>

    </div>
  );
}
