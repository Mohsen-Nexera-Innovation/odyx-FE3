"use client";

import { useRef, useState } from "react";

// Printer hover demo — while the pointer is over the ecosystem board's
// printer (baked patch + icon/label node), a circular video disc fades in
// over the centre of the orbit and plays; leaving pauses and fades it out.
//
// Rendered inside .hv2-eco-stage, so both layers position in stage
// percentages like every other piece of the board. The baked patches are
// pointer-events:none, so the hover surface is an invisible hotspot drawn
// over the printer's patch + node footprint.
export default function EcoPrinterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  const enter = () => {
    setActive(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const leave = () => {
    setActive(false);
    videoRef.current?.pause();
  };

  return (
    <>
      {/* Printer hover video: a circular disc pinned to the orbit's centre
          (ellipse cx 732 cy 200 of the 1358x485 panel → 39.8% / 41.2% in
          stage coords). Hidden until the printer hotspot is hovered; the
          ring + glow echo the baked node halos. A physical (not
          RTL-mirrored) position, like the rest of the stage art. */}
      <div
        className="absolute z-[4] left-[39.8%] top-[41.2%] [translate:-50%_-50%] w-[31%] aspect-square rounded-full overflow-hidden bg-white [box-shadow:0_0_0_clamp(3px,.4cqw,6px)_rgba(255,255,255,.92),0_0_0_clamp(4px,.55cqw,8px)_rgba(35,80,228,.18),0_18px_44px_rgba(10,40,90,.28)] opacity-0 scale-[.82] pointer-events-none [transition:opacity_.28s_ease,scale_.32s_cubic-bezier(.2,.9,.3,1.05)] data-[active]:opacity-100 data-[active]:scale-100"
        data-active={active || undefined}
        aria-hidden
      >
        <video
          className="w-full h-full object-cover block"
          ref={videoRef}
          src="/video/eco-printer.mp4"
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      {/* Invisible hover surface over the printer patch + its icon/label
          node (the baked patches themselves are pointer-events-none). */}
      <div
        className="absolute z-[5] left-[58.5%] top-[5%] w-[20.5%] h-[47%] cursor-pointer"
        onPointerEnter={enter}
        onPointerLeave={leave}
        aria-hidden
      />
    </>
  );
}
