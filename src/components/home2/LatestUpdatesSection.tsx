"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { HV2_GUTTER, HV2_NAV, HV2_SECTION_Y } from "@/components/home2/hv2Chrome";

// Latest Updates — the client mock's five-up update carousel, the last band on
// the home screen (after the ecosystem hub's Store / Registration row).
//
// Geometry is dimensioned against `knowledge_base/screens/043-latest-updates-
// reference.png` (2852x1256 = a 2048-CSS-px viewport at 1.3926x) and carried in
// cqw off the query container (reference width 1878.7px) — so every reference
// pixel is value / 18.787 cqw and the whole composition holds its proportions
// at any width.
//
// Two things the mock does that look like plain rotation but are not: the outer
// cards are trapezoids (vertical edges stay vertical, the horizontal ones tilt
// and the far edge is SHORTER), which is a Y-axis rotation under its own
// perspective camera — a shared scene camera compounds off-axis, same finding as
// the path carousel. And the nav discs sit BEHIND the cards, clipped by card 1
// and card 5, ~60px above the card row's centre line.
//
// The mock draws five cards but four pagination dots, so the deck is eight
// items paginated two-per-dot. Items 6-8 are placeholder updates built from the
// repo's existing photography — swap them for CMS content.

type Update = {
  id: string;
  cat: string;
  tone: "navy" | "light" | "beige";
  title: string;
  desc: string[];
  date: string;
  iso: string;
  href: string;
  /* placeholders cut from repo photography need a fade painted into the card
     field; the mock's own five already carry theirs */
  fade?: true;
  /* Each asset was cut at exactly the image band the mock gives its card, so
     its own w/h IS the band's aspect ratio — driving the band off that (rather
     than off a share of the card height) keeps the art uncropped, and its faded
     tail flush with the card field, at every slot and every breakpoint. */
  art: { src: string; alt: string; w: number; h: number };
};

const UPDATES: Update[] = [
  {
    id: "aeedc",
    cat: "Event",
    tone: "navy",
    title: "ODYX at AEEDC 2025",
    desc: ["Thank you for visiting", "our booth!"],
    date: "May 10, 2025",
    iso: "2025-05-10",
    href: "/about",
    art: {
      src: "/img/hv2-news/aeedc-event.webp",
      alt: "The ODYX exhibition booth lit in blue, with product counters under a glowing ODYX sign",
      w: 668,
      h: 684,
    },
  },
  {
    id: "resins",
    cat: "Product",
    tone: "light",
    title: "New Resin Line",
    desc: ["High performance", "resins now available."],
    date: "May 5, 2025",
    iso: "2025-05-05",
    href: "/products/resins",
    art: {
      src: "/img/hv2-news/resin-line.webp",
      alt: "A dark ODYX resin bottle on a stone pedestal in a bright studio",
      w: 704,
      h: 728,
    },
  },
  {
    id: "workflow",
    cat: "Update",
    tone: "navy",
    title: "ODYX Workflow",
    desc: ["Simplify your", "digital workflow."],
    date: "April 28, 2025",
    iso: "2025-04-28",
    href: "/workflows",
    art: {
      src: "/img/hv2-news/workflow.webp",
      alt: "A robotic manufacturing arm over a glowing blue platform in a dark chamber",
      w: 764,
      h: 720,
    },
  },
  {
    id: "webinar",
    cat: "Webinar",
    tone: "beige",
    title: "Webinar: Integration",
    desc: ["Tips for a seamless", "digital workflow."],
    date: "April 20, 2025",
    iso: "2025-04-20",
    href: "/learning",
    art: {
      src: "/img/hv2-news/webinar.webp",
      alt: "A tablet on a warm beige surface showing the ODYX dashboard's grid of blue app tiles",
      w: 707,
      h: 716,
    },
  },
  {
    id: "partners",
    cat: "News",
    tone: "navy",
    title: "New Partner Announcement",
    desc: ["Excited to welcome", "new partners to", "the ODYX family."],
    date: "April 15, 2025",
    iso: "2025-04-15",
    href: "/about",
    art: {
      src: "/img/hv2-news/partners.webp",
      alt: "Two people in dark suits shaking hands in front of a blue-lit modern skyline",
      w: 632,
      h: 616,
    },
  },
  {
    id: "design-suite",
    cat: "Update",
    tone: "navy",
    title: "Design Suite Update",
    desc: ["New tools across the", "ODYX design workflow."],
    date: "April 8, 2025",
    iso: "2025-04-08",
    href: "/design-services",
    fade: true,
    art: {
      src: "/img/hv2-news/design-suite.webp",
      alt: "A monitor in a dark studio showing a crown designed on a scanned lower arch",
      w: 764,
      h: 720,
    },
  },
  {
    id: "open-house",
    cat: "Event",
    tone: "light",
    title: "Open House Sessions",
    desc: ["Hands-on demos at the", "ODYX showroom."],
    date: "March 27, 2025",
    iso: "2025-03-27",
    href: "/support",
    fade: true,
    art: {
      src: "/img/hv2-news/open-house.webp",
      alt: "The ODYX showroom booth with a glowing blue logo, dental chair and product displays",
      w: 764,
      h: 720,
    },
  },
  {
    id: "scan-live",
    cat: "Webinar",
    tone: "beige",
    title: "Scan to Print, Live",
    desc: ["Join our clinical team", "for a full walkthrough."],
    date: "March 14, 2025",
    iso: "2025-03-14",
    href: "/learning",
    fade: true,
    art: {
      src: "/img/hv2-news/scan-live.webp",
      alt: "A clinician presenting a scanned arch to colleagues in a training room",
      w: 764,
      h: 720,
    },
  },
];

const N = UPDATES.length;
const PER_DOT = 2;        // the mock shows four dots for eight items
const DOTS = N / PER_DOT;
// How many cards are on screen, which one is emphasised and where the off-deck
// ones park is entirely a CSS concern (see the --s<n>-* slot tokens), so this
// component only publishes each card's ring position as data-slot.

const mod = (v: number, n: number) => ((v % n) + n) % n;

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="1.1" y="4.2" width="21.8" height="18.7" rx="4.6" />
    <path d="M6.9 1.6v4.4M17.1 1.6v4.4M1.5 10.6h21" />
  </svg>
);

const CardArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.6 12h14.2M12.6 5.6 19 12l-6.4 6.4" />
  </svg>
);

const LU_SECTION =
  `relative w-full ${HV2_GUTTER} ${HV2_SECTION_Y}` +
  " [background:radial-gradient(46%_32%_at_50%_-3%,rgba(226,236,255,.85)_0%,rgba(245,247,253,0)_74%),radial-gradient(34%_30%_at_4%_86%,rgba(98,157,255,.09)_0%,rgba(245,247,253,0)_72%),#F5F7FD]";

const LU_IN =
  // Outer air lives on the section; keep only the composition scale tokens here.
  "w-[min(100%,1879px)] mx-auto [container-type:inline-size]" +
  " [--k:1] [--u:calc(1cqw*var(--k))]" +
  " [--lu-r:calc(1.437*var(--u))] [--lu-px:calc(1.330*var(--u))] [--lu-persp:calc(74.52*var(--u))]" +
  " [--lu-ease:cubic-bezier(.22,1,.36,1)]" +
  " [--lu-spring:cubic-bezier(.3,1.18,.36,1)] [--lu-dur:.62s]" +
  " [--lu-shadow:0_calc(.958*var(--u))_calc(2.022*var(--u))_rgba(5,28,72,.12),0_calc(.213*var(--u))_calc(.639*var(--u))_rgba(5,28,72,.06)]" +
  " [--lu-shadow-hov:0_calc(1.28*var(--u))_calc(2.55*var(--u))_rgba(5,28,72,.15),0_calc(.32*var(--u))_calc(.85*var(--u))_rgba(5,28,72,.08)]" +
  " [--lu-ring:0_0_0_calc(.107*var(--u))_rgba(10,90,255,.85),0_0_0_calc(.27*var(--u))_rgba(120,170,255,.32),0_0_calc(1.4*var(--u))_calc(.32*var(--u))_rgba(60,130,255,.26),0_calc(1.17*var(--u))_calc(2.13*var(--u))_rgba(0,25,70,.16)]" +
  // Measured spring where linear() is supported.
  " [@supports(transition-timing-function:linear(0,1))]:[--lu-spring:linear(0,.224_6.6%,.492_12.8%,.765_20.4%,.924_28.6%,1.005_38.8%,1.026_50%,1.02_61.2%,1.006_74.6%,1)]" +
  " max-[1439px]:[--k:1.237]" +
  " max-[1179px]:[--k:1.679]" +
  " max-[899px]:[--k:2.30]" +
  " max-[599px]:[--k:3.05]! max-[599px]:w-full!" +
  " max-[599px]:[--lu-r:22px]! max-[599px]:[--lu-px:20px]!" +
  " max-[599px]:[--lu-shadow:0_14px_30px_rgba(5,28,72,.14),0_3px_9px_rgba(5,28,72,.07)]!" +
  " max-[599px]:[--lu-ring:0_0_0_2px_rgba(10,90,255,.85),0_0_0_5px_rgba(120,170,255,.32),0_0_22px_5px_rgba(60,130,255,.26),0_18px_34px_rgba(0,25,70,.16)]!";

const LU_HEAD = "text-center";

const LU_EYEBROW =
  "text-[var(--hv2-blue)]! text-[1.262cqw]! font-bold! uppercase! [letter-spacing:.0316em]! leading-none!" +
  " rtl:[letter-spacing:0]! rtl:normal-case!" +
  " max-[1179px]:text-[length:clamp(13px,1.55vw,20px)]!";

const LU_PIP = "mx-[.42cqw] text-[.85em] align-[.08em]";

const LU_H =
  "m-[.972cqw_0_0]! text-[#0D1B31]! text-[3.358cqw]! font-extrabold! leading-none! [letter-spacing:-.04em]!" +
  " max-[1179px]:mt-[.34em]! max-[1179px]:text-[length:clamp(38px,4.4vw,58px)]!";

const LU_SUB =
  "m-[.150cqw_0_0]! text-[#263E68]! text-[1.192cqw]! font-semibold! leading-[1.25]!" +
  " max-[1179px]:mt-[.12em]! max-[1179px]:text-[length:clamp(15px,1.7vw,21px)]!";

const LU_STAGE =
  "relative mt-[2.081cqw]" +
  " max-[1179px]:mt-[clamp(24px,2.6vw,42px)]!" +
  " max-[599px]:grid! max-[599px]:grid-cols-[auto_1fr_auto]! max-[599px]:items-center!" +
  " max-[599px]:[column-gap:14px]! max-[599px]:mt-[clamp(20px,5vw,30px)]!";

// Slot geometry tokens — rewritten per breakpoint (different card counts).
const LU_ROW =
  "relative h-[30.460cqw]" +
  " [--s0-x:-.256cqw] [--s0-w:18.326cqw] [--s0-h:29.845cqw] [--s0-y:.037cqw] [--s0-r:13.2deg] [--s0-z:2]" +
  " [--s1-x:19.503cqw] [--s1-w:18.731cqw] [--s1-h:29.808cqw] [--s1-y:0cqw] [--s1-r:0deg] [--s1-z:3]" +
  " [--s2-x:39.804cqw] [--s2-w:20.333cqw] [--s2-h:29.925cqw] [--s2-y:.037cqw] [--s2-r:0deg] [--s2-z:5]" +
  " [--s3-x:61.585cqw] [--s3-w:18.853cqw] [--s3-h:29.925cqw] [--s3-y:.383cqw] [--s3-r:-6.6deg] [--s3-z:3]" +
  " [--s4-x:81.972cqw] [--s4-w:17.416cqw] [--s4-h:30.154cqw] [--s4-y:.266cqw] [--s4-r:-15.5deg] [--s4-z:2]" +
  " [--s0-o:.92] [--s1-o:.96] [--s2-o:1] [--s3-o:.96] [--s4-o:.92]" +
  // 4-up
  " max-[1439px]:h-[37.680cqw]!" +
  " max-[1439px]:[--s0-x:-.317cqw]! max-[1439px]:[--s0-w:22.669cqw]! max-[1439px]:[--s0-h:36.918cqw]! max-[1439px]:[--s0-y:.046cqw]! max-[1439px]:[--s0-r:13.2deg]! max-[1439px]:[--s0-z:2]!" +
  " max-[1439px]:[--s1-x:24.126cqw]! max-[1439px]:[--s1-w:23.170cqw]! max-[1439px]:[--s1-h:36.872cqw]! max-[1439px]:[--s1-y:0cqw]! max-[1439px]:[--s1-r:0deg]! max-[1439px]:[--s1-z:3]!" +
  " max-[1439px]:[--s2-x:49.238cqw]! max-[1439px]:[--s2-w:25.152cqw]! max-[1439px]:[--s2-h:37.017cqw]! max-[1439px]:[--s2-y:.046cqw]! max-[1439px]:[--s2-r:0deg]! max-[1439px]:[--s2-z:5]!" +
  " max-[1439px]:[--s3-x:76.181cqw]! max-[1439px]:[--s3-w:23.321cqw]! max-[1439px]:[--s3-h:37.017cqw]! max-[1439px]:[--s3-y:.474cqw]! max-[1439px]:[--s3-r:-9.4deg]! max-[1439px]:[--s3-z:2]!" +
  " max-[1439px]:[--s0-o:.93]! max-[1439px]:[--s1-o:.96]! max-[1439px]:[--s2-o:1]! max-[1439px]:[--s3-o:.93]!" +
  // 3-up
  " max-[1179px]:h-[51.142cqw]!" +
  " max-[1179px]:[--s0-x:-.430cqw]! max-[1179px]:[--s0-w:30.777cqw]! max-[1179px]:[--s0-h:50.110cqw]! max-[1179px]:[--s0-y:.062cqw]! max-[1179px]:[--s0-r:13.2deg]! max-[1179px]:[--s0-z:2]!" +
  " max-[1179px]:[--s1-x:33.267cqw]! max-[1179px]:[--s1-w:34.139cqw]! max-[1179px]:[--s1-h:50.244cqw]! max-[1179px]:[--s1-y:0cqw]! max-[1179px]:[--s1-r:0deg]! max-[1179px]:[--s1-z:5]!" +
  " max-[1179px]:[--s2-x:70.319cqw]! max-[1179px]:[--s2-w:29.245cqw]! max-[1179px]:[--s2-h:50.628cqw]! max-[1179px]:[--s2-y:.447cqw]! max-[1179px]:[--s2-r:-15.5deg]! max-[1179px]:[--s2-z:2]!" +
  " max-[1179px]:[--s0-o:.94]! max-[1179px]:[--s1-o:1]! max-[1179px]:[--s2-o:.94]!" +
  // 2-up
  " max-[899px]:h-[87cqw]!" +
  " max-[899px]:[--s0-x:0cqw]! max-[899px]:[--s0-w:57cqw]! max-[899px]:[--s0-h:86cqw]! max-[899px]:[--s0-y:0cqw]! max-[899px]:[--s0-r:0deg]! max-[899px]:[--s0-z:5]!" +
  " max-[899px]:[--s1-x:62cqw]! max-[899px]:[--s1-w:57cqw]! max-[899px]:[--s1-h:86.5cqw]! max-[899px]:[--s1-y:.5cqw]! max-[899px]:[--s1-r:-4deg]! max-[899px]:[--s1-z:2]!" +
  " max-[899px]:[--s0-o:1]! max-[899px]:[--s1-o:.95]!" +
  // 1-up (+ peek)
  " max-[599px]:h-[calc(91cqw+180px)]!" +
  " max-[599px]:[--s0-x:0cqw]! max-[599px]:[--s0-w:88cqw]! max-[599px]:[--s0-h:calc(91cqw+172px)]! max-[599px]:[--s0-y:0cqw]! max-[599px]:[--s0-r:0deg]! max-[599px]:[--s0-z:5]!" +
  " max-[599px]:[--s1-x:92cqw]! max-[599px]:[--s1-w:88cqw]! max-[599px]:[--s1-h:calc(91cqw+172px)]! max-[599px]:[--s1-y:0cqw]! max-[599px]:[--s1-r:0deg]! max-[599px]:[--s1-z:2]!" +
  " max-[599px]:col-span-full!";

const LU_TRACK =
  "absolute inset-0" +
  " focus-visible:outline-[.16cqw] focus-visible:outline-[var(--hv2-blue)] focus-visible:outline-offset-[.4cqw] focus-visible:rounded-[var(--lu-r)]" +
  // Travel-pass animations (A/B name swap restarts on rapid nav).
  " data-[anim]:[&_[data-lu=card]]:[animation:hv2LuDipA_var(--lu-dur)_var(--lu-ease)]" +
  " data-[anim=b]:[&_[data-lu=card]]:[animation-name:hv2LuDipB]" +
  " data-[anim]:[&_[data-lu=card]]:after:[animation:hv2LuSheenA_.7s_cubic-bezier(.4,0,.2,1)_.1s]" +
  " data-[anim=b]:[&_[data-lu=card]]:after:[animation-name:hv2LuSheenB]" +
  " data-[anim]:[&_[data-lu=cat]]:[animation:hv2LuRiseA_.42s_var(--lu-ease)_backwards]" +
  " data-[anim]:[&_[data-lu=t]]:[animation:hv2LuRiseA_.42s_var(--lu-ease)_backwards]" +
  " data-[anim]:[&_[data-lu=d]]:[animation:hv2LuRiseA_.42s_var(--lu-ease)_backwards]" +
  " data-[anim]:[&_[data-lu=foot]]:[animation:hv2LuRiseA_.42s_var(--lu-ease)_backwards]" +
  " data-[anim]:[&_[data-lu=art]]:[animation:hv2LuArtA_.5s_var(--lu-ease)_.045s_backwards]" +
  " data-[anim=b]:[&_[data-lu=cat]]:[animation-name:hv2LuRiseB]" +
  " data-[anim=b]:[&_[data-lu=t]]:[animation-name:hv2LuRiseB]" +
  " data-[anim=b]:[&_[data-lu=d]]:[animation-name:hv2LuRiseB]" +
  " data-[anim=b]:[&_[data-lu=foot]]:[animation-name:hv2LuRiseB]" +
  " data-[anim=b]:[&_[data-lu=art]]:[animation-name:hv2LuArtB]" +
  " data-[anim]:[&_[data-lu=t]]:[animation-delay:.09s]" +
  " data-[anim]:[&_[data-lu=d]]:[animation-delay:.105s]" +
  " data-[anim]:[&_[data-lu=foot]]:[animation-delay:.135s]" +
  " motion-reduce:data-[anim]:[&_[data-lu=card]]:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=card]]:after:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=art]]:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=cat]]:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=t]]:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=d]]:animate-none!" +
  " motion-reduce:data-[anim]:[&_[data-lu=foot]]:animate-none!";

const LU_CARD =
  "absolute top-0 left-0 rtl:left-auto rtl:right-0" +
  " w-[var(--w)] h-[var(--h)] rounded-[var(--lu-r)] overflow-hidden" +
  " [transform:translate3d(var(--x),var(--y),0)_perspective(var(--lu-persp))_rotateY(var(--r))]" +
  " rtl:[transform:translate3d(calc(-1*var(--x)),var(--y),0)_perspective(var(--lu-persp))_rotateY(calc(-1*var(--r)))]" +
  " [transform-style:preserve-3d] bg-[var(--bg)] [box-shadow:var(--ring,var(--lu-shadow))] z-[var(--z)]" +
  " [transition:width_var(--lu-dur)_var(--lu-ease),height_var(--lu-dur)_var(--lu-ease),transform_var(--lu-dur)_var(--lu-spring),box-shadow_var(--lu-dur)_var(--lu-ease),opacity_calc(var(--lu-dur)*_.8)_ease,visibility_var(--lu-dur),translate_.35s_var(--lu-ease)]" +
  // Parked off the end by default; visible slots override.
  " [--x:104%] [--y:0cqw] [--w:var(--s0-w)] [--h:var(--s0-h)] [--r:0deg] [--z:1] [--dip:.958] [--sheen:0]" +
  " opacity-0 invisible pointer-events-none" +
  " data-[slot=7]:[--x:-22cqw]" +
  " data-[slot=0]:[--x:var(--s0-x)] data-[slot=0]:[--y:var(--s0-y)] data-[slot=0]:[--w:var(--s0-w)] data-[slot=0]:[--h:var(--s0-h)] data-[slot=0]:[--r:var(--s0-r)] data-[slot=0]:[--z:var(--s0-z)] data-[slot=0]:[--o:var(--s0-o,1)]" +
  " data-[slot=1]:[--x:var(--s1-x)] data-[slot=1]:[--y:var(--s1-y)] data-[slot=1]:[--w:var(--s1-w)] data-[slot=1]:[--h:var(--s1-h)] data-[slot=1]:[--r:var(--s1-r)] data-[slot=1]:[--z:var(--s1-z)] data-[slot=1]:[--o:var(--s1-o,1)]" +
  " data-[slot=2]:[--x:var(--s2-x)] data-[slot=2]:[--y:var(--s2-y)] data-[slot=2]:[--w:var(--s2-w)] data-[slot=2]:[--h:var(--s2-h)] data-[slot=2]:[--r:var(--s2-r)] data-[slot=2]:[--z:var(--s2-z)] data-[slot=2]:[--o:var(--s2-o,1)]" +
  " data-[slot=3]:[--x:var(--s3-x)] data-[slot=3]:[--y:var(--s3-y)] data-[slot=3]:[--w:var(--s3-w)] data-[slot=3]:[--h:var(--s3-h)] data-[slot=3]:[--r:var(--s3-r)] data-[slot=3]:[--z:var(--s3-z)] data-[slot=3]:[--o:var(--s3-o,1)]" +
  " data-[slot=4]:[--x:var(--s4-x)] data-[slot=4]:[--y:var(--s4-y)] data-[slot=4]:[--w:var(--s4-w)] data-[slot=4]:[--h:var(--s4-h)] data-[slot=4]:[--r:var(--s4-r)] data-[slot=4]:[--z:var(--s4-z)] data-[slot=4]:[--o:var(--s4-o,1)]" +
  " data-[slot=0]:opacity-[var(--o,1)] data-[slot=0]:visible data-[slot=0]:pointer-events-auto" +
  " data-[slot=1]:opacity-[var(--o,1)] data-[slot=1]:visible data-[slot=1]:pointer-events-auto" +
  " data-[slot=2]:opacity-[var(--o,1)] data-[slot=2]:visible data-[slot=2]:pointer-events-auto" +
  " data-[slot=3]:opacity-[var(--o,1)] data-[slot=3]:visible data-[slot=3]:pointer-events-auto" +
  " data-[slot=4]:opacity-[var(--o,1)] data-[slot=4]:visible data-[slot=4]:pointer-events-auto" +
  // Active ring / dip / sheen ride the centred slot per breakpoint.
  " data-[slot=2]:[--ring:var(--lu-ring)] data-[slot=2]:[--dip:.988] data-[slot=2]:[--sheen:1]" +
  " max-[1439px]:data-[slot=4]:[--x:104%]! max-[1439px]:data-[slot=4]:opacity-0! max-[1439px]:data-[slot=4]:invisible! max-[1439px]:data-[slot=4]:pointer-events-none!" +
  " max-[1179px]:data-[slot=1]:[--ring:var(--lu-ring)]! max-[1179px]:data-[slot=1]:[--dip:.988]! max-[1179px]:data-[slot=1]:[--sheen:1]!" +
  " max-[1179px]:data-[slot=2]:[--ring:initial]! max-[1179px]:data-[slot=2]:[--dip:.958]! max-[1179px]:data-[slot=2]:[--sheen:0]!" +
  " max-[1179px]:data-[slot=3]:[--x:104%]! max-[1179px]:data-[slot=3]:opacity-0! max-[1179px]:data-[slot=3]:invisible! max-[1179px]:data-[slot=3]:pointer-events-none!" +
  " max-[1179px]:data-[slot=4]:[--x:104%]! max-[1179px]:data-[slot=4]:opacity-0! max-[1179px]:data-[slot=4]:invisible! max-[1179px]:data-[slot=4]:pointer-events-none!" +
  " max-[899px]:data-[slot=0]:[--ring:var(--lu-ring)]! max-[899px]:data-[slot=0]:[--dip:.992]! max-[899px]:data-[slot=0]:[--sheen:1]!" +
  " max-[899px]:data-[slot=1]:[--ring:initial]! max-[899px]:data-[slot=1]:[--dip:.975]! max-[899px]:data-[slot=1]:[--sheen:0]!" +
  " max-[899px]:data-[slot=2]:[--x:104%]! max-[899px]:data-[slot=2]:opacity-0! max-[899px]:data-[slot=2]:invisible! max-[899px]:data-[slot=2]:pointer-events-none! max-[899px]:data-[slot=2]:[--ring:initial]!" +
  // Tones / ids / cats
  " data-[tone=navy]:[--bg:#040F28] data-[tone=navy]:[--t-fg:#F2F5FF] data-[tone=navy]:[--d-fg:rgba(255,255,255,.70)] data-[tone=navy]:[--dt-fg:rgba(255,255,255,.86)] data-[tone=navy]:[--go-bg:#2450EC] data-[tone=navy]:[--go-fg:#fff]" +
  " data-[tone=light]:[--bg:#F0F2F9] data-[tone=light]:[--t-fg:#0A1020] data-[tone=light]:[--d-fg:#6B7285] data-[tone=light]:[--dt-fg:#3A4152] data-[tone=light]:[--go-bg:#FFFFFF] data-[tone=light]:[--go-fg:#1B4BE0]" +
  " data-[tone=light]:outline data-[tone=light]:outline-1 data-[tone=light]:outline-[rgba(70,100,150,.14)] data-[tone=light]:-outline-offset-1" +
  " data-[tone=beige]:[--bg:#F0E1D2] data-[tone=beige]:[--t-fg:#1A1510] data-[tone=beige]:[--d-fg:#6E645C] data-[tone=beige]:[--dt-fg:#443B34] data-[tone=beige]:[--go-bg:#D6A87C] data-[tone=beige]:[--go-fg:#2A1C10]" +
  " data-[id=workflow]:[--bg:#020A1D] data-[id=partners]:[--bg:#0C1021] data-[id=design-suite]:[--bg:#05101F]" +
  " data-[cat=Event]:[--cat-bg:#2B54DE] data-[cat=Event]:[--cat-fg:#EAF1FF]" +
  " data-[cat=Product]:[--cat-bg:#C2D2FB] data-[cat=Product]:[--cat-fg:#2F55C8]" +
  " data-[cat=Update]:[--cat-bg:#2049EF] data-[cat=Update]:[--cat-fg:#FFFFFF]" +
  " data-[cat=Update]:[&_[data-lu=cat]]:[box-shadow:0_0_calc(1.1*var(--u))_rgba(32,73,239,.55)]" +
  " data-[cat=Webinar]:[--cat-bg:#DCB088] data-[cat=Webinar]:[--cat-fg:#3A2A1C]" +
  " data-[cat=News]:[--cat-bg:#3358D8] data-[cat=News]:[--cat-fg:#EAF1FF]" +
  // Sheen layer
  " after:content-[''] after:absolute after:inset-0 after:z-[4] after:pointer-events-none" +
  " after:[background:linear-gradient(105deg,rgba(255,255,255,0)_42%,rgba(255,255,255,.20)_50%,rgba(255,255,255,0)_58%)]" +
  " after:[translate:-135%_0] after:opacity-0" +
  // Hover lift (fine pointer only)
  " [@media(hover:hover)_and_(pointer:fine)]:hover:[translate:0_calc(-.30*var(--u))]" +
  " [@media(hover:hover)_and_(pointer:fine)]:hover:[box-shadow:var(--ring,var(--lu-shadow-hov))]" +
  " hover:[&_[data-lu=go]]:scale-[1.06] hover:[&_[data-lu=go]]:brightness-[1.06]" +
  " motion-reduce:transition-[opacity]! motion-reduce:duration-250!" +
  " motion-reduce:hover:[translate:none]!";

const LU_MEDIA =
  "absolute top-0 inset-x-0 aspect-[var(--band)] overflow-hidden" +
  // Fade into card field for repo placeholders only.
  " [[data-fade]_&]:after:content-[''] [[data-fade]_&]:after:absolute [[data-fade]_&]:after:inset-x-0 [[data-fade]_&]:after:bottom-0 [[data-fade]_&]:after:h-[46%]" +
  " [[data-fade]_&]:after:[background:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,var(--bg)_92%)]";

const LU_ART = "block w-full h-full object-cover object-[center_top]";

const LU_CAT =
  "absolute z-[2] m-0! top-[calc(1.341*var(--u))] start-[var(--lu-px)]" +
  " h-[calc(1.990*var(--u))] [padding:calc(.415*var(--u))_calc(.585*var(--u))_0]" +
  " rounded-full inline-flex items-center" +
  " text-[length:calc(.847*var(--u))]! font-bold! leading-none! uppercase! [letter-spacing:.045em]!" +
  " bg-[var(--cat-bg)] text-[var(--cat-fg)]" +
  " [box-shadow:0_calc(.16*var(--u))_calc(.43*var(--u))_rgba(4,16,48,.22)]" +
  " rtl:[letter-spacing:0]! rtl:normal-case!" +
  " max-[599px]:top-[18px]! max-[599px]:h-8! max-[599px]:[padding:6px_12px_0]! max-[599px]:text-[12.5px]!";

const LU_COPY =
  "absolute z-[2] bottom-[calc(.985*var(--u))] inset-x-[var(--lu-px)]" +
  " max-[599px]:bottom-4!";

const LU_T =
  "m-0! text-[var(--t-fg)]! text-[length:calc(1.737*var(--u))]! font-bold! leading-[1.02]! [letter-spacing:-.025em]!" +
  " max-[599px]:text-[length:clamp(21px,5.6vw,26px)]! max-[599px]:leading-[1.14]!";

const LU_LINK =
  "text-inherit no-underline" +
  " after:content-[''] after:absolute after:inset-0 after:z-[3] after:rounded-[var(--lu-r)]" +
  " focus-visible:outline-none" +
  " focus-visible:after:outline-[length:calc(.16*var(--u))] focus-visible:after:outline-[var(--hv2-blue)] focus-visible:after:outline-offset-[calc(-.32*var(--u))]";

const LU_D =
  "m-[calc(.705*var(--u))_0_0]! text-[var(--d-fg)]! text-[length:calc(1.099*var(--u))]! font-medium! leading-[1.53]!" +
  " max-[599px]:mt-2.5! max-[599px]:text-[length:clamp(14px,3.9vw,16.5px)]! max-[599px]:leading-normal!";

const LU_DLINE = "block";

const LU_FOOT =
  "mt-[calc(1.064*var(--u))] h-[calc(2.528*var(--u))] flex items-center justify-between gap-[calc(.8*var(--u))]" +
  " max-[599px]:mt-4! max-[599px]:h-[46px]! max-[599px]:gap-3!";

const LU_DATE =
  "m-0! text-[var(--dt-fg)]! inline-flex items-center gap-[calc(.615*var(--u))]" +
  " text-[length:calc(1.022*var(--u))]! font-semibold! leading-[1.2]! whitespace-nowrap" +
  " max-[599px]:text-[13.5px]! max-[599px]:gap-[9px]!" +
  " [&>time]:block [&>time]:mt-[calc(.13*var(--u))] max-[599px]:[&>time]:mt-px!";

const LU_CAL =
  "block flex-none [&>svg]:block [&>svg]:w-[calc(1.18*var(--u))] [&>svg]:h-[calc(1.18*var(--u))]" +
  " max-[599px]:[&>svg]:w-[17px]! max-[599px]:[&>svg]:h-[17px]!";

const LU_GO =
  "flex-none rounded-full w-[calc(2.528*var(--u))] h-[calc(2.528*var(--u))] grid place-items-center" +
  " bg-[var(--go-bg)] text-[var(--go-fg)]" +
  " [box-shadow:0_calc(.32*var(--u))_calc(.8*var(--u))_rgba(4,16,48,.24)]" +
  " transition-[transform,filter] duration-[.22s] ease" +
  " [&>svg]:block [&>svg]:w-[calc(1.278*var(--u))] [&>svg]:h-[calc(1.278*var(--u))]" +
  " rtl:[&>svg]:scale-x-[-1]" +
  " motion-reduce:transition-none!" +
  " max-[599px]:w-[46px]! max-[599px]:h-[46px]! max-[599px]:[box-shadow:0_5px_12px_rgba(4,16,48,.24)]!" +
  " max-[599px]:[&>svg]:w-[21px]! max-[599px]:[&>svg]:h-[21px]!";

const LU_NAV =
  `${HV2_NAV} absolute! z-0! top-[calc(9.898*var(--u))]!` +
  " w-[calc(3.593*var(--u))]! h-[calc(3.593*var(--u))]!" +
  " text-[var(--hv2-blue)]! border-0!" +
  " [box-shadow:0_calc(.53*var(--u))_calc(1.28*var(--u))_rgba(10,40,90,.16)]!" +
  " [&>svg]:w-[calc(1.49*var(--u))]! [&>svg]:h-[calc(1.49*var(--u))]!" +
  " transition-[color,transform]! duration-[.2s,.3s]! ease-[ease,var(--lu-spring)]!" +
  " active:scale-[.93]! active:duration-[.2s,.1s]!" +
  " rtl:[&>svg]:scale-x-[-1]" +
  " motion-reduce:transition-none!" +
  " max-[899px]:z-[6]! max-[899px]:top-[calc(50%-1.8*var(--u))]!" +
  " max-[599px]:static! max-[599px]:z-[1]! max-[599px]:w-11! max-[599px]:h-11! max-[599px]:mt-[18px]! max-[599px]:top-auto!" +
  " max-[599px]:[&>svg]:w-[19px]! max-[599px]:[&>svg]:h-[19px]!";

const LU_NAV_PREV =
  " start-[calc(-2.928*var(--u))]!" +
  " max-[899px]:start-[calc(-1.4*var(--u))]!" +
  " max-[599px]:col-start-1! max-[599px]:row-start-2! max-[599px]:start-auto!";

const LU_NAV_NEXT =
  " end-[calc(-2.928*var(--u))]!" +
  " max-[899px]:end-[calc(-1.4*var(--u))]!" +
  " max-[599px]:col-start-3! max-[599px]:row-start-2! max-[599px]:end-auto!";

const LU_DOTS =
  "flex justify-center items-center gap-[calc(1.331*var(--u))] mt-[calc(1.224*var(--u))]" +
  " max-[599px]:col-start-2! max-[599px]:row-start-2! max-[599px]:gap-[14px]! max-[599px]:mt-[18px]!";

const LU_DOT =
  "w-[calc(.80*var(--u))]! h-[calc(.80*var(--u))]! border-0! p-0! rounded-full!" +
  " bg-[#D3DAE7]! cursor-pointer" +
  " transition-[width,height,background,box-shadow]! duration-[.4s,.4s,.3s,.3s]! ease-[var(--lu-spring),var(--lu-spring),ease,ease]!" +
  " data-[on]:w-[calc(.958*var(--u))]! data-[on]:h-[calc(.958*var(--u))]! data-[on]:bg-[#1E46F1]!" +
  " data-[on]:[box-shadow:0_0_0_calc(.28*var(--u))_rgba(30,70,241,.15)]!" +
  " hover:not-data-[on]:bg-[#B9C4D8]!" +
  " motion-reduce:transition-none!" +
  " max-[599px]:w-[9px]! max-[599px]:h-[9px]! max-[599px]:data-[on]:w-[11px]! max-[599px]:data-[on]:h-[11px]!";

export default function LatestUpdatesSection() {
  // `offset` is the ring position of the card in slot 0.
  const [offset, setOffset] = useState(0);
  // Counts real navigations (arrow, dot, key, swipe). Its parity is published
  // as data-anim="a"/"b", which is what restarts the CSS travel animations —
  // the depth dip, content stagger and sheen. Keyed to navigation rather than
  // render so unrelated rerenders never replay them, and 0 renders no attribute
  // at all so SSR markup is inert.
  const [phase, setPhase] = useState(0);
  // Pointer swipe: one gesture = one step, threshold in px so a tap never fires.
  const drag = useRef<{ x: number; id: number } | null>(null);

  const step = useCallback((d: number) => {
    setOffset((o) => mod(o + d, N));
    setPhase((p) => p + 1);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  return (
    <section className={LU_SECTION} id="updates" aria-labelledby="hv2-lu-h">
      <div className={LU_IN}>
        <div className={`${LU_HEAD} rv`}>
          <p className={LU_EYEBROW}>
            <span className={LU_PIP} aria-hidden>&bull;</span>
            Stay Informed
            <span className={LU_PIP} aria-hidden>&bull;</span>
          </p>
          <h2 className={LU_H} id="hv2-lu-h">Latest Updates</h2>
          <p className={LU_SUB}>News, events, product updates and more from ODYX.</p>
        </div>

        <div className={`${LU_STAGE} rv`} data-rv="1">
          <div className={LU_ROW}>
            {/* aria-roledescription needs a real role to attach to. */}
            <div
              className={LU_TRACK}
              data-anim={phase === 0 ? undefined : phase % 2 ? "a" : "b"}
              role="group"
              aria-roledescription="carousel"
              aria-label="Latest ODYX updates"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { drag.current = null; }}
            >
              {UPDATES.map((u, i) => (
                <article
                  className={LU_CARD}
                  data-lu="card"
                  key={u.id}
                  data-slot={mod(i - offset, N)}
                  data-tone={u.tone}
                  data-cat={u.cat}
                  data-id={u.id}
                  data-fade={u.fade ? "" : undefined}
                  style={{ "--band": `${u.art.w} / ${u.art.h}` } as CSSProperties}
                >
                  <span className={LU_MEDIA} data-lu="media">
                    <img
                      className={LU_ART}
                      data-lu="art"
                      src={u.art.src}
                      alt={u.art.alt}
                      width={u.art.w}
                      height={u.art.h}
                      loading={i < 5 ? undefined : "lazy"}
                      decoding="async"
                    />
                  </span>
                  <p className={LU_CAT} data-lu="cat">{u.cat}</p>
                  <div className={LU_COPY}>
                    {/* One focusable target per card: the title link stretches
                        over the whole card, so the arrow disc stays decorative. */}
                    <h3 className={LU_T} data-lu="t">
                      <Link className={LU_LINK} href={u.href}>{u.title}</Link>
                    </h3>
                    <p className={LU_D} data-lu="d">
                      {u.desc.map((line) => (
                        <span className={LU_DLINE} key={line}>{line}</span>
                      ))}
                    </p>
                    <div className={LU_FOOT} data-lu="foot">
                      <p className={LU_DATE}>
                        <span className={LU_CAL} aria-hidden><CalendarIcon /></span>
                        <time dateTime={u.iso}>{u.date}</time>
                      </p>
                      <span className={LU_GO} data-lu="go" aria-hidden><CardArrow /></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Siblings of the deck, not children: on phones they leave the row
              and become grid items either side of the dots. */}
          <button
            type="button"
            className={`${LU_NAV}${LU_NAV_PREV}`}
            aria-label="Previous updates"
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${LU_NAV}${LU_NAV_NEXT}`}
            aria-label="Next updates"
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <div className={LU_DOTS} role="group" aria-label="Update pages">
            {Array.from({ length: DOTS }, (_, k) => {
              const on = Math.floor(offset / PER_DOT) === k;
              return (
                <button
                  type="button"
                  className={LU_DOT}
                  key={k}
                  aria-label={`Updates ${k * PER_DOT + 1}\u2013${k * PER_DOT + PER_DOT}`}
                  aria-current={on || undefined}
                  data-on={on ? "" : undefined}
                  onClick={() => {
                    const t = k * PER_DOT;
                    if (t === offset) return; // no travel, no replay
                    setOffset(t);
                    setPhase((p) => p + 1);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
