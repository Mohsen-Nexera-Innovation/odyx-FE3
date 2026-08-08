"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useSpring,
  useVelocity,
  useReducedMotion,
  type MotionValue,
  type AnimationPlaybackControls,
} from "motion/react";

// Coverflow path picker matching the design reference: a wide, front-facing
// active card, a narrower 3D-turned card on each side whose bottom sits on the
// same baseline (so the outer top corner rises and the inner one drops), and
// exactly one blurred preview slab beyond each of those — five card positions,
// no fragments at the viewport edges.
//
// Navigation is a continuous cover-flow: `v` is an unbounded float position on
// the ring, each rendered card owns a virtual index `j`, and its pose is a
// function of `t = j - v`. Cards therefore physically travel through the slot
// poses (the CSS custom-property values below are the source of truth for the
// resting geometry) and are recycled only at t = ±3, where they are fully
// transparent. Filter / opacity / shadow / typography morphs ride CSS
// transitions keyed off the slot classes; transform, box width and depth order
// are spring-driven per frame.

const PATHS = [
  {
    key: "lab",
    title: "Lab Technician",
    desc: "Powerful tools for dental laboratories.",
    cta: "I'm a Lab Tech",
    href: "/solutions/labs",
    // Lab bench scene: printer, models, counters and a wall screen. The
    // distributor path card — keep distinct from guest explore CTA imagery.
    img: "/img/printers/lab-scene.jpg",
    alt: "A dental laboratory bench with a printer, printed models and workstation screens",
    icon: (
      // Conical laboratory flask — wide base, narrow neck, fill line.
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9.6 2.6h4.8" />
        <path d="M10.4 2.6v6.1L4.9 18.1A2.1 2.1 0 0 0 6.7 21.4h10.6a2.1 2.1 0 0 0 1.8-3.3l-5.5-9.4V2.6" />
        <path d="M7.7 14.4h8.6" />
      </svg>
    ),
  },
  {
    key: "dentist",
    title: "Dentist",
    desc: "Digital solutions for clinics of all sizes.",
    cta: "I'm a Dentist",
    href: "/solutions/dentists",
    // Wide operatory: chair and delivery unit on the right half, framed
    // radiograph and cabinetry behind. Framed loosely so the room reads.
    img: "/img/printers/clinic-scene.jpg",
    alt: "A dental chair and delivery unit in a modern clinic operatory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7.5 3.2C5.4 3.2 3.8 4.9 3.8 7c0 1.4.4 2.5.9 4 .5 1.4.7 2.8.9 4.6.2 1.5.4 3 1.3 3 .9 0 1.1-1.4 1.4-2.7.2-1.2.5-2.3 1.2-2.3s1 1.1 1.2 2.3c.3 1.3.5 2.7 1.4 2.7.9 0 1.1-1.5 1.3-3 .2-1.8.4-3.2.9-4.6.5-1.5.9-2.6.9-4 0-2.1-1.6-3.8-3.7-3.8-1.2 0-2 .6-2.6.6s-1.4-.6-2.6-.6Z" />
      </svg>
    ),
  },
  {
    key: "guest",
    title: "Guest",
    desc: "Explore ODYX as a guest.",
    cta: "Continue as Guest",
    href: "/workflows",
    // Scanner upright in its cradle on the right of the frame, clinic behind;
    // the card blurs it back so it reads as a soft product scene.
    img: "/img/scanner/s1-open-scene.png",
    alt: "An ODYX intraoral scanner upright in its cradle beside scanning software",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="7.8" r="4.2" />
        <path d="M4.3 20.8c.9-3.9 3.9-6 7.7-6s6.8 2.1 7.7 6" />
      </svg>
    ),
  },
] as const;

const N = PATHS.length;
const mod = (v: number) => ((v % N) + N) % N;
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// Resting geometry (reference px, multiplied by --pc-u at style time). These
// mirror the CSS slot variables exactly so the idle render is pixel-identical
// to the class-driven layout.
const SIDE_X = 519.5, SIDE_P = 740, SIDE_RY = 13, SIDE_RZ = 1.2;
const PREV_X = 806, PREV_P = 2600, PREV_RY = 72;
const ACTIVE_W = 616, SIDE_W = 400;
// Arc shaping during travel only — all terms are zero at integer positions.
const ARC_Y = 14;   // px of vertical bow (incoming rises, outgoing sinks)
const ARC_Z = 22;   // px of mid-travel lift toward the camera

const cardWidth = (t: number) => ACTIVE_W - (ACTIVE_W - SIDE_W) * clamp(Math.abs(t), 0, 1);

// dir ∈ [-1, 1]: smoothed sign of the ring velocity. It steers the vertical
// bow so cards travelling toward the centre rise and cards leaving it sink,
// and it fades the bow out as the spring settles.
function cardTransform(t: number, dir: number) {
  const a = Math.abs(t), s = t < 0 ? -1 : 1;
  let x: number, ry: number, rz: number, p: number;
  if (a <= 1) {
    x = SIDE_X * a; ry = SIDE_RY * a; rz = SIDE_RZ * a; p = SIDE_P;
  } else if (a <= 2) {
    const q = a - 1;
    x = lerp(SIDE_X, PREV_X, q); ry = lerp(SIDE_RY, PREV_RY, q);
    rz = SIDE_RZ * (1 - q); p = lerp(SIDE_P, PREV_P, q);
  } else {
    x = PREV_X + 240 * (a - 2); ry = Math.min(PREV_RY + 6 * (a - 2), 84);
    rz = 0; p = PREV_P;
  }
  x *= s; ry *= -s; rz *= -s;
  const y = a < 1 ? -ARC_Y * Math.sin(Math.PI * t) * dir : 0;
  const z = a < 1 ? ARC_Z * Math.sin(Math.PI * a) * Math.abs(dir) : 0;
  return (
    `translate3d(calc(${x.toFixed(2)} * var(--pc-u)), calc(${y.toFixed(2)} * var(--pc-u)), 0px) ` +
    `perspective(calc(${p.toFixed(1)} * var(--pc-u))) ` +
    `translateZ(calc(${z.toFixed(2)} * var(--pc-u))) ` +
    `rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg)`
  );
}

type Path = (typeof PATHS)[number];

function PathCard({
  j, d, v, dir, artX, path, sweep, reduce, onPick, suppressClick,
}: {
  j: number;
  d: number; // slot the card is headed for (j - target)
  v: MotionValue<number>;
  dir: MotionValue<number>;
  artX: MotionValue<number>;
  path: Path;
  sweep: number;
  reduce: boolean;
  onPick: (j: number) => void;
  suppressClick: React.RefObject<boolean>;
}) {
  const t = useTransform(v, (val) => j - val);
  const transform = useTransform([t, dir] as const, (latest) => {
    const [tv, dv] = latest as [number, number];
    return cardTransform(tv, dv);
  });
  const width = useTransform(t, (tv) => `calc(${cardWidth(tv).toFixed(2)} * var(--pc-u))`);
  const marginLeft = useTransform(t, (tv) => `calc(${cardWidth(tv).toFixed(2)} * var(--pc-u) / -2)`);
  const zIndex = useTransform(t, (tv) => Math.max(1, Math.round(40 - 10 * Math.abs(tv))));

  const bodyRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const prevD = useRef(d);

  // Content choreography: the card body dips while the card is in flight, and
  // the incoming active card re-reveals icon → title → copy → CTA with a small
  // stagger once it is ~2/3 of the way home. The dip also masks the CSS
  // font-size / button-style morph between slot classes.
  useEffect(() => {
    const was = prevD.current;
    prevD.current = d;
    if (reduce || was === d || !bodyRef.current) return;
    const kids = Array.from(bodyRef.current.children) as HTMLElement[];
    if (d === 0) {
      kids.forEach((el, i) => {
        animate(
          el,
          { opacity: [1, 0, 0, 1], y: [0, 10, 12, 0] },
          {
            duration: 0.82,
            times: [0, 0.16, 0.6, 1],
            delay: i * 0.05,
            ease: ["easeOut", "linear", [0.22, 1, 0.36, 1]],
          },
        );
      });
    } else if (was === 0) {
      kids.forEach((el, i) => {
        animate(
          el,
          { opacity: [1, 0.25, 1], y: [0, 9, 0] },
          { duration: 0.72, times: [0, 0.42, 1], delay: i * 0.02, ease: "easeInOut" },
        );
      });
    }
  }, [d, reduce]);

  // One-shot light sweep across the active card once the spring has settled.
  useEffect(() => {
    if (!sweep || d !== 0 || reduce || !sheenRef.current) return;
    animate(
      sheenRef.current,
      { x: ["-130%", "130%"], opacity: [0, 0.5, 0] },
      { duration: 0.48, times: [0, 0.45, 1], ease: "easeOut" },
    );
  }, [sweep]); // eslint-disable-line react-hooks/exhaustive-deps

  const g = Math.abs(d);
  const pos =
    d === 0
      ? "is-active"
      : `is-side is-${d < 0 ? "left" : "right"}${g >= 2 ? " is-ghost" : ""}${g >= 3 ? " is-far" : ""}`;

  return (
    <motion.article
      className={`hv2-pcard hv2-pcard-${path.key} ${pos}`}
      style={{ transform, width, marginLeft, zIndex }}
      onClick={() => {
        if (suppressClick.current) return;
        if (g === 1) onPick(j);
      }}
      role="group"
      aria-roledescription="slide"
      aria-label={path.title}
      aria-hidden={d !== 0 ? true : undefined}
    >
      <div className="hv2-pcard-art" aria-hidden>
        <motion.div className="hv2-pcard-par" style={{ x: artX }}>
          <img src={path.img} alt="" draggable={false} />
        </motion.div>
      </div>
      <div className="hv2-pcard-wash" aria-hidden />
      <div className="hv2-pcard-body" ref={bodyRef}>
        <span className="hv2-pcard-ic">{path.icon}</span>
        <h3>{path.title}</h3>
        <p>{path.desc}</p>
        <Link
          className="hv2-pcard-btn"
          href={path.href}
          tabIndex={d === 0 ? 0 : -1}
          draggable={false}
          onClick={(e) => {
            if (suppressClick.current) e.preventDefault();
          }}
        >
          {path.cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div className="hv2-pcard-sheen" ref={sheenRef} aria-hidden />
    </motion.article>
  );
}

type DragState = {
  x0: number;
  y0: number;
  v0: number;
  W: number;
  mode: "pending" | "drag" | "off";
  samples: Array<[number, number]>;
};

export default function PathCarousel() {
  const reduce = useReducedMotion() ?? false;
  // `target` is the settled ring position (unbounded integer); the visible
  // path is PATHS[mod(target)]. Dentist centred first, per the reference.
  const [target, setTarget] = useState(1);
  const targetRef = useRef(1);
  const [sweep, setSweep] = useState(0);
  const v = useMotionValue(1);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClick = useRef(false);

  // Shared motion derivatives: a smoothed velocity steers the travel arc and
  // the counter-directional image parallax inside each card.
  const vel = useVelocity(v);
  const velSm = useSpring(vel, { stiffness: 260, damping: 40 });
  const dir = useTransform(velSm, (vv) => (reduce ? 0 : clamp(vv * 1.4, -1, 1)));
  const artX = useTransform(velSm, (vv) => (reduce ? 0 : clamp(vv * 16, -26, 26)));

  const goTo = (next: number, velocity = 0) => {
    // Soft lock: allow one queued step while in flight, ignore beyond that.
    if (Math.abs(next - v.get()) > 2.4) return;
    const changed = next !== targetRef.current;
    targetRef.current = next;
    setTarget(next);
    animRef.current?.stop();
    if (reduce) {
      v.set(next);
      return;
    }
    animRef.current = animate(v, next, {
      type: "spring",
      visualDuration: 0.8,
      bounce: 0.16,
      velocity,
    });
    animRef.current.finished.then(() => {
      // Only sweep when this exact navigation settled (not a retarget/stop).
      if (changed && Math.abs(v.get() - targetRef.current) < 0.02) setSweep((s) => s + 1);
    });
  };

  const go = (delta: number) => goTo(targetRef.current + delta);
  const goToPath = (k: number) => {
    let d = mod(k - mod(targetRef.current));
    if (d === 2) d = -1; // shortest way around the 3-card ring
    goTo(targetRef.current + d);
  };

  // --- drag / swipe -------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as Element).closest(".hv2-nav, .hv2-dot")) return;
    const stage = stageRef.current;
    if (!stage) return;
    const u = stage.offsetHeight / 401; // stage height is 401 reference px
    dragRef.current = {
      x0: e.clientX,
      y0: e.clientY,
      v0: v.get(),
      W: Math.max(ACTIVE_W * u, 200),
      mode: "pending",
      samples: [[performance.now(), e.clientX]],
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.mode === "off") return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (d.mode === "pending") {
      // Horizontal intent starts a drag; vertical intent yields to scrolling.
      if (Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
        d.mode = "drag";
        d.v0 = v.get();
        animRef.current?.stop();
        stageRef.current?.setPointerCapture(e.pointerId);
      } else if (Math.abs(dy) > 10) {
        d.mode = "off";
        return;
      } else return;
    }
    suppressClick.current = true;
    let dv = -dx / d.W; // drag left → next
    const adv = Math.abs(dv);
    if (adv > 1) dv = Math.sign(dv) * (1 + (adv - 1) * 0.3); // rubber-band past one step
    v.set(d.v0 + dv);
    d.samples.push([performance.now(), e.clientX]);
    if (d.samples.length > 6) d.samples.shift();
  };

  const settleDrag = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || d.mode !== "drag") return;
    // Flick velocity from the last ~100ms of samples.
    const now = performance.now();
    let ref = d.samples[0];
    for (const s of d.samples) if (now - s[0] <= 110) { ref = s; break; }
    const last = d.samples[d.samples.length - 1];
    const dt = Math.max(last[0] - ref[0], 1);
    const vIdx = (-(last[1] - ref[1]) / dt) * (1000 / d.W);
    const dv = v.get() - d.v0;
    let step = 0;
    if (Math.abs(dv) > 0.18 || Math.abs(vIdx) > 0.9) {
      step = Math.abs(vIdx) > 0.9 ? Math.sign(vIdx) : Math.sign(dv);
    }
    goTo(Math.round(d.v0) + step, vIdx);
    // Let the click that follows pointerup see the flag, then clear it.
    setTimeout(() => { suppressClick.current = false; }, 60);
  };

  // Seven virtual indices: the five reference slots plus one invisible
  // recycling slot on each end, so cards enter and leave while fully
  // transparent and never flash or remount mid-flight.
  const cards: number[] = [];
  for (let j = target - 3; j <= target + 3; j++) cards.push(j);

  return (
    <div className="hv2-path rv" data-rv="1">
      <div
        className="hv2-path-stage"
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Choose your path"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={settleDrag}
        onPointerCancel={settleDrag}
      >
        <button
          type="button"
          className="hv2-nav hv2-nav-prev"
          aria-label="Previous path"
          aria-controls="hv2-path-ring"
          onClick={() => go(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>

        <div className="hv2-path-ring" id="hv2-path-ring">
          {cards.map((j) => (
            <PathCard
              key={j}
              j={j}
              d={j - target}
              v={v}
              dir={dir}
              artX={artX}
              path={PATHS[mod(j)]}
              sweep={sweep}
              reduce={reduce}
              onPick={(picked) => goTo(picked)}
              suppressClick={suppressClick}
            />
          ))}
        </div>

        <button
          type="button"
          className="hv2-nav hv2-nav-next"
          aria-label="Next path"
          aria-controls="hv2-path-ring"
          onClick={() => go(1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <p className="hv2-vh" aria-live="polite">
        {`${PATHS[mod(target)].title}, ${mod(target) + 1} of ${N}`}
      </p>

      <div className="hv2-dots" role="tablist" aria-label="Paths">
        {PATHS.map((p, k) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={k === mod(target)}
            aria-label={p.title}
            className={`hv2-dot${k === mod(target) ? " is-on" : ""}`}
            onClick={() => goToPath(k)}
          />
        ))}
      </div>
    </div>
  );
}
