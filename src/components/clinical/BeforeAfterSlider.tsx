'use client';

import { useState } from 'react';

type Slide = {
  before: { img: string; alt: string };
  after: { img: string; alt: string };
};

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
    <div className="cl-card">
      <h2>{title}</h2>
      <div className="cl-ba-pair">
        <figure className="cl-ba-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.before.img} alt={slide.before.alt} />
          <span className="cl-ba-label">Before</span>
        </figure>
        <figure className="cl-ba-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.after.img} alt={slide.after.alt} />
          <span className="cl-ba-label">After</span>
        </figure>
      </div>
      {slides.length > 1 ? (
        <div className="cl-ba-dots" role="tablist" aria-label="Before and after slides">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className="cl-ba-dot"
              data-active={idx === i}
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
