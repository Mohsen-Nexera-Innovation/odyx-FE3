"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const STAGGER_MS = [80, 220, 360, 520];
const ENTER_MS = 900;
const HOLD_MS = 1600;
const EXIT_MS = 1400;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function CureHeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const hero = root.closest<HTMLElement>(".cure-hero");
    const items = Array.from(root.children) as HTMLElement[];
    const cancelers: Array<() => void> = [];

    const poseItem = (el: HTMLElement, opacity: number, y: number, scale: number) => {
      el.style.setProperty("opacity", String(opacity), "important");
      el.style.setProperty(
        "transform",
        `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`,
        "important",
      );
    };

    const poseRoot = (p: number) => {
      const e = easeInOutCubic(clamp01(p));
      // Slide from center to the physical left, stay on-screen
      const heroW = hero?.offsetWidth ?? window.innerWidth;
      const contentW = root.offsetWidth;
      const travel = Math.max(0, (heroW - contentW) / 2 - 16);
      const x = -(e * travel);

      root.style.setProperty("opacity", "1", "important");
      root.style.setProperty(
        "transform",
        `translate3d(${x.toFixed(1)}px, 0, 0)`,
        "important",
      );
      root.style.pointerEvents = "";

      // Switch to left alignment as it docks
      if (e > 0.2) root.classList.add("is-left");
      else root.classList.remove("is-left");

      hero?.style.setProperty("--cure-hero-clear", String(e * 0.7));
    };

    // Start hidden
    items.forEach((el) => poseItem(el, 0, 72, 0.94));
    poseRoot(0);

    const animate = (
      duration: number,
      from: number,
      to: number,
      onUpdate: (v: number) => void,
      onDone?: () => void,
    ) => {
      let raf = 0;
      let start = 0;
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / duration);
        onUpdate(from + (to - from) * t);
        if (t < 1) raf = window.requestAnimationFrame(tick);
        else onDone?.();
      };
      raf = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(raf);
    };

    // 1) Staggered entrance
    items.forEach((el, i) => {
      let raf = 0;
      let start = 0;
      const timeout = window.setTimeout(() => {
        const tick = (now: number) => {
          if (!start) start = now;
          const t = Math.min(1, (now - start) / ENTER_MS);
          const e = easeOutCubic(t);
          poseItem(el, e, 72 * (1 - e), 0.94 + 0.06 * e);
          if (t < 1) raf = window.requestAnimationFrame(tick);
          else poseItem(el, 1, 0, 1);
        };
        raf = window.requestAnimationFrame(tick);
      }, STAGGER_MS[i] ?? 600);

      cancelers.push(() => {
        window.clearTimeout(timeout);
        window.cancelAnimationFrame(raf);
      });
    });

    // 2) Hold, then auto-slide to the edge and clear the video
    const exitDelay =
      (STAGGER_MS[STAGGER_MS.length - 1] ?? 520) + ENTER_MS + HOLD_MS;
    const exitTimer = window.setTimeout(() => {
      cancelers.push(animate(EXIT_MS, 0, 1, (v) => poseRoot(v)));
    }, exitDelay);
    cancelers.push(() => window.clearTimeout(exitTimer));

    return () => {
      cancelers.forEach((fn) => fn());
      hero?.style.removeProperty("--cure-hero-clear");
      root.classList.remove("is-left");
      root.style.removeProperty("opacity");
      root.style.removeProperty("transform");
      root.style.pointerEvents = "";
    };
  }, []);

  const hidden = {
    opacity: 0,
    transform: "translate3d(0, 72px, 0) scale(0.94)",
  } as const;

  return (
    <div ref={rootRef} className="cure-wrap cure-hero__content">
      <p className="cure-hero__brand" style={hidden}>
        ODYX
      </p>
      <h1 style={hidden}>Cure UV-02</h1>
      <p className="cure-hero__lead" style={hidden}>
        The last clinical step — controlled light, heat, and time in one chamber.
      </p>
      <div className="cure-actions" style={hidden}>
        <Link className="cure-btn" href="/support">
          Request a Demo
        </Link>
        <Link className="cure-btn cure-btn--ghost" href="/support#manuals">
          Download Specs
        </Link>
      </div>
    </div>
  );
}
