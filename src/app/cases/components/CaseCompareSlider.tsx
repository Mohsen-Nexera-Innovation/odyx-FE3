'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

type Props = {
  before: { img: string; alt: string };
  after: { img: string; alt: string };
};

/** Interactive before/after compare for the Cases hero. */
export function CaseCompareSlider({ before, after }: Props) {
  const [pos, setPos] = useState(50);
  const [frameW, setFrameW] = useState(0);
  const dragging = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setFrameW(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={frameRef}
      className="cases-ba relative w-full aspect-[5/4] overflow-hidden rounded-[14px] border border-gray-100/80 bg-[#0A1020] shadow-[0_18px_40px_rgba(15,23,42,0.1)] touch-none select-none cursor-ew-resize"
      role="img"
      aria-labelledby={labelId}
      style={{ ['--cases-ba-w' as string]: frameW ? `${frameW}px` : '100%' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span id={labelId} className="sr-only">
        Before and after clinical comparison. Drag the handle to compare.
      </span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src={after.img}
        alt={after.alt}
        draggable={false}
      />

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-y-0 left-0 h-full max-w-none object-cover object-left pointer-events-none"
          style={{ width: 'var(--cases-ba-w)' }}
          src={before.img}
          alt={before.alt}
          draggable={false}
        />
      </div>

      <span className="absolute top-3 left-3 z-[2] rounded-full bg-[#0A1020]/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        Before
      </span>
      <span className="absolute top-3 right-3 z-[2] rounded-full bg-[#0A1020]/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
        After
      </span>

      <div
        className="absolute inset-y-0 z-[3] w-0 -translate-x-1/2 pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0050D8] shadow-[0_6px_18px_rgba(15,23,42,0.2)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        className="absolute inset-0 z-[4] h-full w-full cursor-ew-resize opacity-0 m-0!"
        type="range"
        min={4}
        max={96}
        value={Math.round(pos)}
        aria-label="Compare before and after"
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  );
}
