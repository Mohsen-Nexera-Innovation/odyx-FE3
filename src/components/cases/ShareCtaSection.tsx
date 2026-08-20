import Link from 'next/link';
import { ArrowIcon } from './CasesIcons';
import { CASES_BTN_OUTLINE, CASES_BTN_PRIMARY, CASES_GUTTER } from './casesChrome';
import type { ShareSectionData } from '@/content/cases';

export function ShareCtaSection({ data }: { data: ShareSectionData }) {
  return (
    <section className={CASES_GUTTER} aria-labelledby="cases-share-title">
      <div className="w-full rounded-[16px] overflow-hidden border border-[#DDE6F3] bg-gradient-to-br from-[#F3F7FD] via-[#EEF4FB] to-[#F7F9FC] shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-7 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="w-[88px] h-[88px] lg:w-[110px] lg:h-[110px] shrink-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.clipboard.img}
              alt={data.clipboard.alt}
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,80,216,0.15)]"
            />
          </div>

          <div className="flex-1 text-center lg:text-start min-w-0">
            <h2
              id="cases-share-title"
              className="text-[22px] lg:text-[28px] font-extrabold text-[#0A1020] leading-[1.25] tracking-tight mb-2"
            >
              {data.title}
            </h2>
            <p className="text-[14px] lg:text-[15px] text-[#667085] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              {data.body}
            </p>
          </div>

          <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4! shrink-0">
            <div className="flex flex-col items-stretch gap-2! min-w-[200px]">
              <p className="text-[12px] font-semibold text-[#667085] text-center sm:text-start m-0!">
                {data.registered.label}
              </p>
              <Link href={data.registered.cta.href} className={CASES_BTN_OUTLINE}>
                {data.registered.cta.label}
                <ArrowIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
            <div className="flex flex-col items-stretch gap-2! min-w-[200px]">
              <p className="text-[12px] font-semibold text-[#667085] text-center sm:text-start m-0!">
                {data.newUser.label}
              </p>
              <Link href={data.newUser.cta.href} className={CASES_BTN_PRIMARY}>
                {data.newUser.cta.label}
                <ArrowIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
