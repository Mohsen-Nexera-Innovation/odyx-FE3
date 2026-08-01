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
      <div className="hv2-eco-vid" data-active={active || undefined} aria-hidden>
        <video
          ref={videoRef}
          src="/video/eco-printer.mp4"
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div
        className="hv2-eco-hot-printer"
        onPointerEnter={enter}
        onPointerLeave={leave}
        aria-hidden
      />
    </>
  );
}
