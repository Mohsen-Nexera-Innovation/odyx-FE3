'use client';

import { Check, Copy, Mail, MessageCircle, Package, Pencil } from 'lucide-react';
import Link from 'next/link';
import type { SendMethod } from './types';

export default function CaseSuccess({
  sendMethod,
  caseId,
}: {
  sendMethod: SendMethod;
  caseId: string;
}) {
  const copyCaseId = () => void navigator.clipboard?.writeText(caseId);

  return (
    <section
      className="w-[min(960px,calc(100%-24px))] sm:w-[min(960px,calc(100%-40px))] mx-auto py-8 sm:py-12 relative"
      aria-labelledby="case-success-title"
    >
      {/* Confetti */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => {
          const colors = ['#0050D8', '#16A34A', '#F59E0B', '#EC4899', '#8B5CF6', '#14B8A6'];
          const left = (i * 13.7) % 100;
          const delay = (i * 0.07) % 2.5;
          const duration = 2.5 + ((i * 0.3) % 1.5);
          
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '-20px',
                left: `${left}%`,
                width: i % 3 === 0 ? '8px' : '6px',
                height: i % 2 === 0 ? '8px' : '6px',
                borderRadius: i % 4 === 0 ? '50%' : '2px',
                background: colors[i % colors.length],
                animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
              }}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,1fr)] gap-6 items-center relative z-10">

        {/* Main card */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Check icon */}
          <div className="w-[72px] h-[72px] rounded-full border-[5px] border-[#16A34A] text-[#16A34A] flex items-center justify-center mb-5 bg-white shadow-sm">
            <Check size={40} strokeWidth={4} aria-hidden />
          </div>

          <h1 id="case-success-title" className="text-[22px] sm:text-[26px] font-extrabold text-[#0A1020] tracking-tight m-0 mb-3">
            Your Case Has Been Submitted!
          </h1>
          <p className="text-[14px] font-bold text-[#0A1020] m-0 mb-1">
            Thank you, Dr. Ahmed Mohamed.
          </p>
          <p className="text-[13px] font-medium text-[#6B7280] m-0 mb-6">
            We have received your case and our team is working on it.
          </p>

          {/* Case ID card */}
          <div className="w-full max-w-[400px] border border-[#E5E7EB] rounded-[8px] bg-white p-5 mb-5 flex flex-col items-center gap-1.5 shadow-sm">
            <span className="text-[13px] font-bold text-[#0A1020]">Your Case ID</span>
            <div className="flex items-center gap-2 justify-center">
              <strong className="text-[22px] font-bold text-[#16A34A] tracking-wide">{caseId}</strong>
              <button
                type="button"
                onClick={copyCaseId}
                aria-label="Copy case ID"
                className="text-[#0050D8] hover:text-[#0040B0] bg-transparent border-0 p-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[rgba(0,80,216,.2)] rounded"
              >
                <Copy size={18} aria-hidden strokeWidth={2} />
              </button>
            </div>
            <small className="text-[11.5px] text-[#6B7280] font-normal leading-snug">
              Save this ID to track your case or share with our support team.
            </small>
          </div>

          {/* Action buttons */}
          <div className="w-full max-w-[400px] flex gap-3">
            <Link
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[6px] bg-[#16A34A] text-white text-[13px] font-bold no-underline transition-colors hover:bg-[#15803d]"
            >
              <MessageCircle size={16} aria-hidden strokeWidth={2} />
              Open WhatsApp
            </Link>
            <Link
              href="mailto:support@odyxegypt.net"
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 border-[1.5px] border-[#0050D8] rounded-[6px] bg-white !text-[#0050D8] text-[13px] font-bold no-underline transition-colors hover:bg-[#F3F7FF]"
            >
              <Mail size={16} aria-hidden strokeWidth={2} />
              Open Email
            </Link>
          </div>
        </div>

        {/* What's next card */}
        <aside className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-6 lg:sticky lg:top-24 mt-4 lg:mt-0">
          <h2 className="text-[15px] font-bold text-[#0A1020] m-0 mb-5">What&apos;s Next?</h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[13px] top-[14px] bottom-[14px] w-[2px] bg-[#E5E7EB]" aria-hidden />

            <ol className="list-none p-0 m-0 flex flex-col gap-5 relative z-10">
              {[
                { done: true,  icon: Check,   label: 'Case Received',     sub: 'We have received your case.' },
                { done: true,  icon: Check,   label: 'In Review',         sub: 'Our CAD team is reviewing your case.' },
                { done: false, icon: Pencil,  label: 'Design in Progress', sub: 'We are designing your case.' },
                { done: false, icon: Package, label: 'Ready for Delivery', sub: 'We will deliver it to you via WhatsApp or Email.' },
              ].map(({ done, icon: Icon, label, sub }, i) => (
                <li key={i} className="flex items-start gap-4 text-[13px] bg-white">
                  <span className={`flex-shrink-0 w-[28px] h-[28px] rounded-full border-2 flex items-center justify-center transition-all bg-white ${done ? 'border-[#16A34A] text-[#16A34A]' : 'border-[#E5E7EB] text-[#9CA3AF]'}`}>
                    <Icon size={14} strokeWidth={3} />
                  </span>
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <strong className="text-[13px] font-bold text-[#0A1020]">{label}</strong>
                    <small className="text-[11.5px] text-[#6B7280] font-medium">{sub}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>

      </div>

      {/* Confetti keyframe */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
