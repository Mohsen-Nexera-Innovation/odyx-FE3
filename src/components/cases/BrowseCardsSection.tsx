import Link from 'next/link';
import { ApplicationIcon, ArrowIcon } from './CasesIcons';
import { CASES_CARD, CASES_CARD_PAD, CASES_GUTTER, CASES_KICKER, CASES_SECTION_H2, CASES_TEXT_LINK } from './casesChrome';
import type { BrowseSectionData } from '@/content/cases';

export function BrowseCardsSection({ data }: { data: BrowseSectionData }) {
  return (
    <section id={data.id} className={CASES_GUTTER} aria-labelledby={`${data.id}-title`}>
      <div className={`w-full ${CASES_CARD} ${CASES_CARD_PAD}`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3! mb-6!">
          <div>
            <p className={`${CASES_KICKER} mb-3`}>
              {data.kicker}
            </p>
            <h2
              id={`${data.id}-title`}
              className={CASES_SECTION_H2}
            >
              {data.title}
            </h2>
          </div>
          {data.viewAll ? (
            <Link href={data.viewAll.href} className={CASES_TEXT_LINK}>
              {data.viewAll.label}
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4!">
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-[14px] bg-white border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`relative aspect-[16/11] overflow-hidden ${
                  data.productStyle
                    ? 'bg-gradient-to-b from-[#F4F7FB] to-[#E8EEF6]'
                    : 'bg-gray-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.imgAlt}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    data.productStyle ? 'object-contain p-4' : 'object-cover'
                  }`}
                />
                {item.icon ? (
                  <span className="absolute left-3 bottom-3 w-9 h-9 rounded-full bg-white text-[#0050D8] shadow-[0_6px_16px_rgba(15,23,42,0.12)] flex items-center justify-center">
                    <ApplicationIcon id={item.icon} />
                  </span>
                ) : null}
              </div>

              <div className="flex items-end justify-between gap-3! px-4 py-3.5">
                <div>
                  <strong className="block text-[14px] font-extrabold text-[#0A1020] mb-0.5">
                    {item.title}
                  </strong>
                  <span className="text-[12px] font-medium text-[#667085]">{item.countLabel}</span>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#EEF3FF] text-[#0050D8] flex items-center justify-center shrink-0 group-hover:bg-[#0050D8] group-hover:text-white transition-colors">
                  <ArrowIcon className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
