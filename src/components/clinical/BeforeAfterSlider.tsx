'use client';

import { useState } from 'react';

type Slide = {
  before: { img: string; alt: string };
  after: { img: string; alt: string };
};

const INTER =
  "[font-family:var(--font-inter),'Inter',ui-sans-serif,system-ui,sans-serif]";

export default function BeforeAfterSlider({
  title,
  slides,
}: {
  title: string;
  slides: Slide[];
}) {
  const [i, setI] = useState(0);
  const slide = slides[i] ?? slides[0];

  return (
    <div className="rounded-2xl border border-solid border-[#e8ebf2] bg-white p-[clamp(18px,2vw,22px)] shadow-[0_6px_18px_rgba(20,40,80,.04)]">
      <h2 className={`${INTER} m-0 mb-3.5 text-left text-[1.25rem] font-bold tracking-[-0.02em] text-[#111827]`}>
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-2.5">
        <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-xl bg-[#f3f5f9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.before.img} alt={slide.before.alt} className="block size-full object-cover" />
          <span
            className={`${INTER} absolute bottom-2.5 left-2.5 rounded-lg bg-[rgba(17,24,39,.82)] px-2.5 py-1 text-[0.75rem] font-semibold text-white`}
          >
            Before
          </span>
        </figure>
        <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-xl bg-[#f3f5f9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.after.img} alt={slide.after.alt} className="block size-full object-cover" />
          <span
            className={`${INTER} absolute bottom-2.5 left-2.5 rounded-lg bg-[rgba(17,24,39,.82)] px-2.5 py-1 text-[0.75rem] font-semibold text-white`}
          >
            After
          </span>
        </figure>
      </div>
      {slides.length > 1 ? (
        <div className="mt-3.5 flex justify-center gap-1.5" role="tablist" aria-label="Before and after slides">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={
                idx === i
                  ? 'h-[7px] w-[18px] cursor-pointer rounded-full border-0 bg-[#0050D8] p-0'
                  : 'size-[7px] cursor-pointer rounded-full border-0 bg-[#c8d0dc] p-0'
              }
              aria-label={`Slide ${idx + 1}`}
              aria-selected={idx === i}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
