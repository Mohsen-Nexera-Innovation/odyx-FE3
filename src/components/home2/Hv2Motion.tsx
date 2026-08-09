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

  // Top scroll progress bar (#progress, styled globally in odyx.css) —
  // same element OdyxMotion owns on other screens, created here since this
  // page doesn't mount OdyxMotion.
  useEffect(() => {
    let prog = document.getElementById("progress") as HTMLDivElement | null;
    if (!prog) {
      prog = document.createElement("div");
      prog.id = "progress";
      document.body.appendChild(prog);
    }
    const onScroll = () => {
      const h = document.documentElement;
      prog!.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0}%`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      removeEventListener("scroll", onScroll);
      prog?.remove();
    };
  }, []);

  // Hero collage 3D parallax: writes --hx/--hy (-.5...5) on the hero band
  // as the mouse crosses it; the product cutouts' Tailwind transforms turn the
  // pair into perspective tilt + depth-scaled translation. Mouse only, and
  // skipped entirely under reduced motion (CSS also guards).
  useEffect(() => {
    const band = document.querySelector<HTMLElement>(".hv2-hero-band");
    if (!band) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = band.getBoundingClientRect();
      const hx = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
      const hy = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
      band.style.setProperty("--hx", hx.toFixed(3));
      band.style.setProperty("--hy", hy.toFixed(3));
    };
    // Ease back to the resting pose instead of freezing mid-tilt.
    const onLeave = () => {
      band.style.setProperty("--hx", "0");
      band.style.setProperty("--hy", "0");
    };
    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerleave", onLeave);
    return () => {
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
