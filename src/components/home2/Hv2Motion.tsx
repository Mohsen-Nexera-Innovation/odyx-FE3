"use client";

import { useEffect } from "react";

// Reveal-on-scroll for the Home V2 screen: elements with .rv fade/slide in
// once, staggered by their data-rv index. No-op under reduced motion (the
// CSS also guards, so nothing is ever hidden without JS).

export default function Hv2Motion() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".hv2 .rv"));
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("rv-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
