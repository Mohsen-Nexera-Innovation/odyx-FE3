'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqEntry } from './data';

export function FAQAccordion({ faqs }: { faqs: FaqEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-2.5">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id} className="rounded-[10px] border border-[#E5E7EB] bg-white">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-[14px] font-bold text-[#0A1020]">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[#6B7280] transition-transform ${open ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {open && (
              <div className="px-4 pb-4 -mt-1">
                <p className="text-[13px] leading-relaxed font-medium text-[#6B7280]">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
      {faqs.length === 0 && (
        <p className="rounded-[10px] border border-dashed border-[#E5E7EB] bg-white px-4 py-8 text-center text-[13px] font-medium text-[#6B7280]">
          No FAQs match your search yet.
        </p>
      )}
    </div>
  );
}

export default FAQAccordion;
