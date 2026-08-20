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
import { HV2_BTN, HV2_BTN_SIZE } from "@/components/home2/hv2Chrome";

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
    img: "/img/scanner/s1-hero.png",
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
const AUTO_MS = 4500;
const RESUME_MS = 8000;
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

// --- Tailwind style tables ------------------------------------------------
// Transform / width / margin-left / z-index are all driven per-frame by the
// motion values below and set via the `style` prop, so they always win over
// any CSS class regardless of slot — the is-active/is-left/is-right rules
// that existed for those properties in the old stylesheet were already
// inert. Only opacity/filter/box-shadow/cursor/pointer-events (which carry
// their own CSS transitions) and typography still need slot-state classes.
const PCARD_BASE =
  "[--pc1:#16309F] [--pc2:#0D1C6B] [--w:var(--pc-w)] absolute top-0 left-0 h-[calc(var(--pc-h)*var(--pc-u))] w-[calc(var(--w)*var(--pc-u))] ml-[calc(var(--w)*var(--pc-u)/-2)] rounded-[calc(var(--pc-r)*var(--pc-u))] overflow-hidden [background:linear-gradient(175deg,var(--pc1)_0%,var(--pc2)_100%)] [box-shadow:0_calc(20*var(--pc-u))_calc(34*var(--pc-u))_calc(-16*var(--pc-u))_rgba(9,22,72,.55)] [transform-origin:50%_100%] transition-[opacity,filter,box-shadow] duration-[.8s] [transition-timing-function:cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none! [will-change:transform] isolate" +
  // Per-slot cursor/opacity/filter/shadow — the only genuinely effective
  // slot-state styling (see note above).
  " [&.is-side]:cursor-pointer [&.is-side]:[box-shadow:0_calc(18*var(--pc-u))_calc(30*var(--pc-u))_calc(-15*var(--pc-u))_rgba(9,22,72,.5)]" +
  " [&.is-ghost]:cursor-default [&.is-ghost]:opacity-[.72] [&.is-ghost]:pointer-events-none [&.is-ghost]:[filter:brightness(.78)_saturate(.62)_blur(calc(9*var(--pc-u)))] [&.is-ghost]:[box-shadow:0_calc(14*var(--pc-u))_calc(24*var(--pc-u))_calc(-14*var(--pc-u))_rgba(9,22,72,.4)]" +
  " [&.is-far]:opacity-0 [&.is-far]:pointer-events-none" +
  // Below 760px a visible side-card strip is mid-text — arrows/dots alone
  // carry the deck; faded (not unmounted) so cards keep travelling through
  // the slot without popping, and #path already clips sideways.
  " max-[760px]:[&.is-side]:opacity-0! max-[760px]:[&.is-side]:pointer-events-none!";

// Per-card tint (the reference varies it): lab navy, dentist navy→royal
// (own full gradient), guest desaturated blue-grey.
const PCARD_VARIANT: Record<Path["key"], string> = {
  lab: "[--pc1:#16317F] [--pc2:#060C34]",
  dentist:
    "[background:linear-gradient(99deg,#070F44_0%,#0B1A66_38%,#1739B4_76%,#2350E2_100%)]",
  guest: "[--pc1:#7A8598] [--pc2:#39424F]",
};

// One crop per card (a zoom about a per-card focal point) plus, for lab and
// guest, a lighter duotone filter than the shared default.
const PCARD_IMG_VARIANT: Record<Path["key"], string> = {
  lab: "[transform:scale(1.7)] [transform-origin:16%_42%] [filter:grayscale(1)_brightness(.72)_contrast(1.12)]",
  dentist: "[transform:scale(1.5)] [transform-origin:81%_36%]",
  guest:
    "[transform:scale(1.5)] [transform-origin:73%_55%] [filter:grayscale(1)_brightness(.92)_contrast(1.04)_blur(calc(2.2*var(--pc-u)))]",
};

// Legibility wash over the text half, LTR then RTL (mirrored angle/stops —
// this one genuinely differs by direction, unlike the transform rules
// above).
const PCARD_WASH_VARIANT: Record<Path["key"], string> = {
  lab:
    "[background:linear-gradient(97deg,rgba(4,10,44,.88)_0%,rgba(4,10,44,.62)_28%,rgba(4,10,44,.20)_54%,rgba(4,10,44,0)_74%)]" +
    " rtl:[background:linear-gradient(-97deg,rgba(4,10,44,.90)_0%,rgba(4,10,44,.74)_30%,rgba(4,10,44,.32)_58%,rgba(4,10,44,0)_80%)]",
  dentist:
    "[background:linear-gradient(99deg,rgba(5,12,52,.90)_0%,rgba(6,16,66,.72)_34%,rgba(14,40,150,.26)_68%,rgba(24,70,222,.16)_100%)]" +
    " rtl:[background:linear-gradient(-99deg,rgba(5,12,52,.90)_0%,rgba(6,16,66,.72)_34%,rgba(14,40,150,.26)_68%,rgba(24,70,222,.16)_100%)]",
  guest:
    "[background:linear-gradient(97deg,rgba(24,32,50,.82)_0%,rgba(33,43,62,.62)_32%,rgba(44,55,76,.26)_62%,rgba(44,55,76,.06)_84%)]" +
    " rtl:[background:linear-gradient(-97deg,rgba(24,32,50,.82)_0%,rgba(33,43,62,.62)_32%,rgba(44,55,76,.26)_62%,rgba(44,55,76,.06)_84%)]",
};

// Explicit measure per card so the browser cannot pick another break point
// (Tajawal, measured): lab 156–196, dentist 220–242, guest 108–129.
const PCARD_PARA_MAXW: Record<Path["key"], string> = {
  lab: "max-w-[calc(175*var(--pc-u))]",
  dentist: "max-w-[calc(230*var(--pc-u))]",
  guest: "max-w-[calc(124*var(--pc-u))]",
};

const PCARD_BTN_MINW: Record<Path["key"], string> = {
  lab: "min-w-[calc(168*var(--pc-u))]!",
  dentist: "min-w-[calc(168*var(--pc-u))]!",
  guest: "min-w-[calc(188*var(--pc-u))]!",
};

const PCARD_CTA =
  `${HV2_BTN} ${HV2_BTN_SIZE} mt-auto! w-auto! whitespace-nowrap` +
  " inline-flex! items-center! justify-center! leading-none!" +
  " [&>span]:leading-none! [&>span]:mt-px" +
  " [&>svg]:block! [&>svg]:shrink-0! [&>svg]:transition-transform [&>svg]:duration-[.25s] [&>svg]:ease-out" +
  " hover:[&>svg]:translate-x-[3px] rtl:[&>svg]:scale-x-[-1] rtl:hover:[&>svg]:translate-x-[-3px]";

// Outer deck: card geometry lives here as CSS custom properties (mirrors the
// old .hv2-path rule) so `.hv2-pcard`'s own arbitrary values can reach them,
// plus the deck's soft pale-blue backdrop pool.
const PATH_ROOT =
  "[--pc-w:616] [--pc-h:401] [--pc-sw:400] [--pc-r:20]" +
  " [--pc-side-x:519.5] [--pc-side-p:740] [--pc-side-ry:13deg] [--pc-side-rz:1.2deg] [--pc-side-s:1]" +
  " [--pc-prev-x:806] [--pc-prev-p:2600] [--pc-prev-ry:72deg] [--pc-prev-s:1]" +
  " mt-[calc(31*var(--pc-u))] [background:radial-gradient(60cqw_78%_at_50%_46%,rgba(0,80,216,.055),transparent_70%)]";

// No perspective on the ring itself — each slot carries its own perspective()
// in `cardTransform()` above; a shared scene camera cannot render the
// outermost near-profile cards without smearing their rotated depth.
const PATH_STAGE =
  "relative w-full h-[calc(var(--pc-h)*var(--pc-u))] overflow-visible [touch-action:pan-y] select-none";
const PATH_RING = "absolute top-0 bottom-0 left-1/2 w-0";

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
      className={`${PCARD_BASE} ${PCARD_VARIANT[path.key]} ${pos}`}
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
      <div className="absolute inset-0 mix-blend-luminosity pointer-events-none" aria-hidden>
        <motion.div className="absolute inset-0 [will-change:transform]" style={{ x: artX }}>
          <img
            className={`absolute inset-0 w-full h-full object-cover block [-webkit-user-drag:none] [filter:grayscale(1)_brightness(.56)_contrast(1.2)] ${PCARD_IMG_VARIANT[path.key]}`}
            src={path.img}
            alt=""
            draggable={false}
          />
        </motion.div>
      </div>
      <div className={`absolute inset-0 pointer-events-none ${PCARD_WASH_VARIANT[path.key]}`} aria-hidden />
      <div
        className="relative z-[1] h-full flex flex-col items-start pt-[calc(33*var(--pc-u))] pr-[calc(30*var(--pc-u))] pb-[calc(43*var(--pc-u))] pl-[calc(41*var(--pc-u))]"
        ref={bodyRef}
      >
        <span className="w-[calc(50*var(--pc-u))] h-[calc(50*var(--pc-u))] text-[#EAF0FF] flex-none [&>svg]:w-full [&>svg]:h-full [&>svg]:block">
          {path.icon}
        </span>
        <h3 className="text-white! text-[length:calc(36*var(--pc-u))] leading-[1.1] mt-[calc(40*var(--pc-u))] mb-[calc(12*var(--pc-u))] transition-[font-size] duration-[.6s] [transition-timing-function:cubic-bezier(.22,1,.36,1)] [.is-active_&]:text-[length:calc(42*var(--pc-u))]">
          {path.title}
        </h3>
        <p
          className={`text-white/94 text-[length:calc(19*var(--pc-u))] leading-[1.5] m-0 transition-[font-size] duration-[.6s] [transition-timing-function:cubic-bezier(.22,1,.36,1)] [.is-active_&]:text-[length:calc(20*var(--pc-u))] ${PCARD_PARA_MAXW[path.key]}`}
        >
          {path.desc}
        </p>
        <Link
          className={`${PCARD_CTA} ${PCARD_BTN_MINW[path.key]}`}
          href={path.href}
          tabIndex={d === 0 ? 0 : -1}
          draggable={false}
          onClick={(e) => {
            if (suppressClick.current) e.preventDefault();
          }}
        >
          <span>{path.cta}</span>
          <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 w-[60%] z-[2] opacity-0 pointer-events-none [background:linear-gradient(100deg,transparent_18%,rgba(255,255,255,.4)_50%,transparent_82%)]"
        ref={sheenRef}
        aria-hidden
      />
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
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const pauseAuto = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_MS);
  };

  // Auto-advance when in view; pause on interaction / reduced motion / hidden tab.
  useEffect(() => {
    if (reduce) return;

    const stage = stageRef.current;
    const io = stage
      ? new IntersectionObserver(
          ([entry]) => {
            inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.35;
          },
          { threshold: [0, 0.35, 0.7] },
        )
      : null;
    if (stage && io) io.observe(stage);

    const onVis = () => {
      if (document.hidden) pausedRef.current = true;
    };
    document.addEventListener("visibilitychange", onVis);

    autoTimer.current = setInterval(() => {
      if (pausedRef.current || document.hidden || !inViewRef.current) return;
      if (dragRef.current?.mode === "drag") return;
      goTo(targetRef.current + 1);
    }, AUTO_MS);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (autoTimer.current) clearInterval(autoTimer.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
    // goTo is stable enough via refs; intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // --- drag / swipe -------------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pauseAuto();
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
    <div className={`${PATH_ROOT} rv`} data-rv="1">
      <div
        className={PATH_STAGE}
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Choose your path"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); pauseAuto(); go(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); pauseAuto(); go(1); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={settleDrag}
        onPointerCancel={settleDrag}
        onPointerEnter={() => { pausedRef.current = true; }}
        onPointerLeave={() => {
          if (!dragRef.current) {
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
            resumeTimer.current = setTimeout(() => {
              pausedRef.current = false;
            }, RESUME_MS);
          }
        }}
      >
        <div className={PATH_RING} id="hv2-path-ring">
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
              onPick={(picked) => { pauseAuto(); goTo(picked); }}
              suppressClick={suppressClick}
            />
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`${PATHS[mod(target)].title}, ${mod(target) + 1} of ${N}`}
      </p>
    </div>
  );
}
