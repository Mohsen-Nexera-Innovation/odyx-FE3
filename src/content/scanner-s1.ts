/**
 * 034 · Intraoral Scanner — ODYX-S1 content.
 * Copy transcribed from knowledge_base/screens/034-interoral-scanner/content.md §4;
 * every number traces to the claims register (content.md §7 → ODYX Products
 * 18.7.26.pdf p31–32). Never add a spec that isn't in the register.
 * Price, video, clinical cases and downloads are client-blocked (screen-details §13).
 */

import { DIGITAL_WORKFLOW_LINKS } from '@/content/digital-workflow-links';

export const SCANNER_META = {
  title: 'ODYX-S1 Intraoral Scanner — Full-Arch Scans in 40 Seconds',
  description:
    'The ODYX-S1 intraoral scanner captures full-arch digital impressions in 40 seconds at ≤20 µm — AI margin detection, 270 g, open STL/OBJ export to any lab.',
};

export const SCANNER_SLUG = 'odyx-s1-intraoral-scanner';

export const SUBNAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Applications', href: '#applications' },
  { label: 'Specs', href: '#specs' },
  { label: 'Downloads', href: '#downloads' },
];

export const WORKFLOW_STEPS = ['Scan', 'Design', 'Print', 'Cure', 'Deliver'];

export const HERO = {
  eyebrow: 'SCAN · STEP 1 OF 5',
  h1: 'ODYX-S1',
  sub: 'Intraoral Scanner — AI-powered. Accurate. Effortless.',
  body:
    'Full-arch digital impressions in 40 seconds, accurate to 20 microns — and open to whatever workflow you already run. The ODYX-S1 is where the digital chain starts.',
  ctaPrimary: { label: 'Request a Demo', href: '/support' },
  ctaSecondary: { label: 'Download Brochure', href: '#downloads' },
  // "Buy online" (tertiary) is held back: price unconfirmed — screen-details §13.1
  ctaMicrocopy: 'Demos available chairside or online, in Arabic, English or French.',
  img: '/img/scanner/s1-hero.jpg',
  imgAlt: 'ODYX-S1 intraoral scanner wand docked in its cradle, white with teal control panel',
};

/** Section 2 · Why S1 — five proof chips (icon + figure + one line) */
export const WHY_CHIPS = [
  { figure: '≤ 20 µm', label: 'accuracy', line: 'Margin-level detail, scan after scan.' },
  { figure: '40 s', label: 'full arch', line: 'An impression in the time a tray takes to seat.' },
  { figure: '270 g', label: 'in the hand', line: 'Comfortable through a full day of appointments.' },
  { figure: 'AI', label: 'margin detection', line: 'The prep line, found while you scan.' },
  { figure: 'STL / OBJ', label: 'open system', line: 'Any CAD, any lab, no lock-in.' },
];

/** Section 3 · Clean by design */
export const CHAIRSIDE = {
  eyebrow: 'CHAIRSIDE',
  title: 'Scan without touching the screen',
  body:
    "The S1's remote control lets you complete an entire scan without reaching for the display — fewer touchpoints with gloved hands, and a cleaner protocol between patients. At 270 g with a rounded 20 × 17 mm tip, it stays comfortable for you and tolerable for the patient, even on long procedures.",
  caption: 'Fast and clean: the full scan sequence, hands on the wand only.',
  img: '/img/scanner/s1-chairside.jpg',
  imgAlt: 'ODYX-S1 scanner resting on a counter in a bright dental operatory',
};

/** Section 4 · Scan in action — laptop software demo + applications with .STL badges.
 * Staging follows the client reference (knowledge_base/product-photos/odyx-s1/
 * scanner-with-software.png): the scan software on a laptop, arch in the viewport,
 * File-export card. Every on-screen string traces to the claims register. */
export const SCAN_ACTION = {
  title: 'See the S1 at work',
  body:
    'Real-time capture in high-resolution 3D and true color — deep margins, implant scan bodies and gingival contour, rendered as they’re scanned. This is the screen you watch while the S1 works.',
  demo: {
    photo: '/img/scanner/arch-photo.jpg',
    mesh: '/img/scanner/arch-mesh.jpg',
    alt:
      'Laptop running the ODYX-S1 scan software: a full dental arch rebuilt live as a teal 3D mesh in the viewport, AI margin detection and soft-tissue filtering active, with one-click export to STL or OBJ.',
    appTitle: 'ODYX-S1 · Live capture',
    caseLabel: 'Upper arch — full-arch scan',
    liveChip: 'HD 3D · real color',
    marginChip: 'AI margin detection — active',
    tissueChip: 'AI soft-tissue filter — on',
    progressLabel: 'Full arch · 40 s',
    statusAccuracy: '≤ 20 µm accuracy',
    exportCard: {
      title: 'File export',
      stl: 'Export to STL',
      obj: 'Export to OBJ',
      note: 'No ecosystem restriction — any CAD, any lab.',
    },
    hint: 'The scan line rebuilds the arch, live, into the mesh your lab receives.',
  },
  applicationsLabel: 'Applications',
  applications: [
    'Crowns & bridges',
    'Inlays / onlays',
    'Veneers',
    'Basic implant planning',
    'Orthodontics',
  ],
  microcopy: 'Every case exports as an open STL or OBJ file.',
};

/** Section 5 · Software that works with you — the three catalog-backed features only.
 * The reference's "AI Scan Cleaning" and "Smart Scan Guidance" are NOT in the catalog
 * and do not ship (screen-details §13.4). */
export const SOFTWARE = {
  title: 'Software that works with you',
  panels: [
    {
      title: 'AI margin detection',
      body: 'The software traces the preparation margin during the scan, so the case leaves the chair lab-ready.',
      img: '/img/scanner/s1-software.jpg',
      imgAlt: 'Scan software on the cart display tracing a preparation margin around a crown prep',
    },
    {
      title: 'AI soft-tissue filtering',
      body: 'Tongue and lip capture is filtered out automatically while you scan — less cleanup, fewer rescans.',
      img: '/img/scanner/s1-scanlight.jpg',
      imgAlt: 'The S1 tip projecting its scanning light across a row of teeth on a demonstration model',
    },
    {
      title: 'Remote control',
      body: 'Start, pause and complete a scan from the wand. The screen is for looking, not touching.',
      img: '/img/scanner/s1-remote.jpg',
      imgAlt: 'Close-up of the S1 control button and status light on the teal panel',
    },
  ],
  // Bridge to workflow step 2 (DESIGN); the full offer band lives in §7 (OPEN_SYSTEM.next).
  linkOut: {
    label: 'Prefer the design done for you? ODYX Design Services',
    href: '/design-services',
  },
};

/** Section 6 · Specifications — every row page-cited to p31–32 */
export const SPECS = {
  title: 'Specifications',
  intro:
    'Every number below is from the ODYX product catalog. Download the datasheet or request a demo to verify them chairside.',
  rows: [
    { label: 'Accuracy', value: '≤ 20 µm' },
    { label: 'Scanning speed', value: '40 seconds, full arch' },
    { label: 'Scan depth', value: '23 mm' },
    { label: 'Tip', value: 'Rounded, 20 × 17 mm' },
    { label: 'Weight', value: '270 g' },
    { label: 'Imaging', value: 'High-resolution 3D (HD), real color' },
    { label: 'Export', value: 'STL / OBJ — open system' },
    { label: 'Control', value: 'Remote control from the wand' },
    { label: 'Software', value: 'AI margin detection · AI tongue-and-lip filtering' },
  ],
};

/** Section 7 · Open system — statement band + DESIGN hand-off.
 * The hand-off band bridges to workflow step 2: the open file can go to your own
 * CAD — or to ODYX design-as-a-service. Service list traces to
 * src/content/design-services.ts (the five design SKUs); no prices shown here. */
export const OPEN_SYSTEM = {
  title: 'Your scan. Your workflow.',
  body:
    'The S1 exports open STL and OBJ files that any lab and any CAD can read. No subscription gate, no ecosystem restriction — the ODYX workflow earns its place at every step, it never forces it.',
  microcopy: 'Prefer the full chain? The same file slices in ODYX Box, print-ready for the P1-26.',
  img: '/img/scanner/s1-open-scene.jpg',
  imgAlt: 'S1 on its stand beside a laptop exporting a scan to STL, with printed models, ODYX printer and cure unit behind',
  next: {
    eyebrow: 'DESIGN · STEP 2 OF 5',
    title: 'Your scan, designed for you',
    body:
      'No in-house CAD? Upload the STL and ODYX designs the case — single units, smile design, removable partials, splints and surgical guides — delivered back print-ready.',
    cta: { label: 'Explore Design Services', href: '/design-services' },
  },
};

/** Section 8 · Your scan's next step — workflow stepper + ecosystem strip */
export const NEXT_STEP = {
  eyebrow: 'THE CONNECTED WORKFLOW',
  title: 'A great scan is only step one',
  activeStep: 0,
  body:
    'From the chair, your scan becomes a design; the design becomes a print. With the P1-26 printing at 18 µm from the S1’s ≤ 20 µm capture, precision carries through the whole chain — that’s how a restoration happens the same day.',
  ecosystem: [
    {
      name: 'P1-26 3D Printer',
      line: 'prints your scan at 18 µm',
      href: '/products/odyx-p1-26',
      img: '/img/scanner/eco-printer.jpg',
    },
    {
      name: 'ODYX Resins',
      line: 'five lines, matched to the case',
      href: '/products/resins',
      img: '/img/scanner/eco-resins.jpg',
    },
    {
      name: 'ODYX Cure',
      line: 'the finish the resin needs',
      href: '/products/curing-machines',
      img: '/img/scanner/eco-cure.jpg',
      fit: 'cover',
    },
  ],
  linkOut: { label: 'See the full workflow, step by step', href: DIGITAL_WORKFLOW_LINKS.scan },
};

/* Section 9 · Clinical cases & reviews — client-supplied only (screen-details §13.3,
 * Halim #32). Stays hidden until real cases and named clinicians exist. */

/** Section 10 · FAQ + Downloads + closing CTA */
export const FAQ = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'How does an intraoral scanner work?',
      a: 'An intraoral scanner projects light onto the teeth and soft tissue and captures the reflection with optical sensors, building a 3D digital impression in real time — no trays, no impression material.',
    },
    {
      q: 'Does the ODYX-S1 lock me into ODYX software?',
      a: 'No. The S1 is an open system: it exports standard STL and OBJ files that work with any CAD software and any lab.',
    },
    {
      q: 'How fast is a full-arch scan?',
      a: '40 seconds for a full arch, captured in high-resolution 3D with real color.',
    },
    {
      q: 'Which cases can I scan with the S1?',
      a: 'Crowns and bridges, inlays and onlays, veneers, basic implant planning, and orthodontics — including deep margins and implant scan bodies.',
    },
  ],
};

export const DOWNLOADS = {
  title: 'Downloads',
  // No S1 datasheet/brochure PDF on file yet — screen-details §13.7
  emptyCopy:
    'The S1 datasheet and brochure are available on request while the download library is being prepared — ask and we’ll send the PDF the same day, in English, Arabic or French.',
  closing: {
    headline: 'Put the S1 in your hand',
    sub: 'Book a chairside demo and scan a full arch yourself — in your clinic, on your cases.',
    cta: { label: 'Request a Demo', href: '/support' },
    ctaMicrocopy: 'Demos available chairside or online, in Arabic, English or French.',
    secondary: { label: 'Talk to a Representative', href: '/support' },
    secondaryMicrocopy: 'For labs and distributors — coverage across Egypt and MENA.',
  },
};
