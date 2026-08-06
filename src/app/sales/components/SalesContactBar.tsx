import Link from 'next/link';
import { CONTACT_SALES_BAR } from '@/content/contact-sales';
import {
  ArrowIcon,
  HeadsetClockIcon,
  MailIcon,
  WhatsAppIcon,
} from './SalesIcons';

export function SalesContactBar() {
  const { support, whatsapp, email } = CONTACT_SALES_BAR;

  return (
    <section
      className="w-full px-[var(--cs-pad-x)]"
      aria-label="Sales contact details"
    >
      <div className="rounded-[var(--cs-radius)] bg-[var(--cs-surface)] px-5 py-4 sm:px-7 sm:py-5 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 cs-grid">
          {/* Support */}
          <div className="flex items-start gap-4 pt-5 sm:pt-0 first:pt-0">
            <span
              className="inline-flex h-11 w-11 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F0FE] text-[#0050D8]"
              aria-hidden
            >
              <HeadsetClockIcon className="h-5 w-5 lg:h-7 lg:w-7" />
            </span>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-[var(--cs-ink)] mb-1">
                {support.title}
              </h3>
              <p className="text-[13px] leading-snug text-[#6B7280] font-medium mb-3 whitespace-pre-line">
                {support.description}
              </p>
              <Link 
                href={support.cta.href} 
                className="inline-flex items-center justify-center border-[1.5px] border-[#DCE6F7] !text-[#0050D8] bg-transparent font-bold text-[12px] px-4 py-2 rounded-[8px] transition-colors hover:bg-[#0050D8] hover:!text-white max-w-max mt-1"
              >
                {support.cta.label}
              </Link>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-4 pt-7 sm:pt-0">
            <span
              className="inline-flex h-11 w-11 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] text-[#25D366]"
              aria-hidden
            >
              <WhatsAppIcon className="h-5 w-5 lg:h-7 lg:w-7" />
            </span>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-[var(--cs-ink)] mb-1">
                {whatsapp.title}
              </h3>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-bold !text-[#0A1020] hover:!text-[#0050D8] transition-colors mb-2"
              >
                {whatsapp.phoneDisplay}
              </a>
              <p className="text-[12px] text-[#6B7280] font-medium">
                {whatsapp.note}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 pt-7 sm:pt-0">
            <span
              className="inline-flex h-11 w-11 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]"
              aria-hidden
            >
              <MailIcon className="h-5 w-5 lg:h-7 lg:w-7" />
            </span>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-bold text-[var(--cs-ink)] mb-1">
                {email.title}
              </h3>
              <a
                href={email.href}
                className="text-[13px] font-medium !text-[#0A1020] hover:!text-[#0050D8] hover:underline break-all mb-2"
              >
                {email.emailDisplay}
              </a>
              <p className="text-[12px] text-[#6B7280] font-medium">
                {email.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
