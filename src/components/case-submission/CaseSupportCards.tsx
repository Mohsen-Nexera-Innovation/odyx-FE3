import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function NeedHelp() {
  return (
    <aside
      className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-3"
      aria-label="Contact support"
    >
      <h2 className="text-[14px] font-bold text-[#0A1020] m-0">Need Help?</h2>
      <Link
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-[50px] flex items-center justify-center gap-2 border-[1.5px] border-[#16A34A] rounded-[6px] bg-white !text-[#16A34A] text-[13px] font-bold no-underline transition-colors hover:bg-[#F0FDF4]"
      >
        <MessageCircle size={16} strokeWidth={2} aria-hidden />
        Chat on WhatsApp
      </Link>
      <Link
        href="mailto:support@odyxegypt.net"
        className="min-h-[50px] flex items-center justify-center gap-2 border-[1.5px] border-[#0050D8] rounded-[6px] bg-white !text-[#0050D8] text-[13px] font-bold no-underline transition-colors hover:bg-[#F3F7FF]"
      >
        <Mail size={16} strokeWidth={2} aria-hidden />
        Email Us
      </Link>
    </aside>
  );
}

export function SecureConfidential() {
  return (
    <aside
      className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-5 flex items-start gap-3"
      aria-label="Security notice"
    >
      <span className="flex-shrink-0 text-[#0A1020]">
        <ShieldCheck size={30} strokeWidth={1.8} aria-hidden />
      </span>
      <div>
        <h2 className="text-[14px] font-bold text-[#0A1020] m-0 mb-1">Secure &amp; Confidential</h2>
        <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed m-0">
          Your data is 100% secure and will never be shared with third parties.
        </p>
      </div>
    </aside>
  );
}
