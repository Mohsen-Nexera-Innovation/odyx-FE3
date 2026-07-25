/**
 * 036 · 3D Printers — screen content.
 *
 * Every spec and claim below is transcribed from the claims register in
 * knowledge_base/screens/036-3d-printers/content.md §7, whose source is
 * `knowledge_base/ODYX Products - 18.7.26.pdf` (18 July 2026). Never add a
 * number here that is not in that register. Certification is stated per resin
 * line, never range-wide.
 *
 * Layout follows the client design references (card-dense, imagery-first) with
 * the revised dials in design-system/odyx/MASTER.md (Variance 3 · Motion 6 ·
 * Density 7). Images are placeholder renders from knowledge_base/product-photos/
 * (production photography pending — OPEN-QUESTIONS #12).
 */

export interface PrinterSpecRow {
  label: string;
  value: string;
}

export interface PrinterModel {
  id: 'p1-26' | 'halot-x1';
  name: string;
  label: string;
  headline: string;
  body: string;
  specPull: string[];
  img: string;
  imgAlt: string;
  gallery?: { img: string; alt: string }[];
  specs: PrinterSpecRow[];
}

export interface IndicationRow {
  id: string;
  pick: string;
  printer: string;
  printerNote?: string;
  resin: string;
  certification: 'ce-fda' | 'none' | 'open';
  resinNote?: string;
  cure: string;
}

export interface TechFeature {
  model: 'P1-26' | 'HALOT-X1';
  title: string;
  line: string;
  img: string;
  alt: string;
}

export const PRINTERS_META = {
  title: 'Dental 3D Printers — ODYX P1-26 & HALOT-X1',
  description:
    'Two ODYX dental 3D printers, sorted by what you print: the P1-26 for definitive restorations, the HALOT-X1 for models and appliances.',
};

export const HERO = {
  eyebrow: 'STEP 3 OF 5 · PRINT',
  headline: 'Dental 3D printers that finish what the scan started.',
  primaryCta: { label: 'Request a demo', href: '/support' },
  secondaryCta: { label: 'Download the datasheet', href: '#downloads' },
  chipsLabel: 'Common to both printers',
  chips: [
    '405 nm LCD light engine',
    'Open material system',
    'Cloud & USB printing',
    'Wash & cure on one bench',
    'Cure times per application',
  ],
  img: '/img/printers/p1-26-hero.jpg',
  imgAlt: 'ODYX P1-26 resin 3D printer on a bench',
};

export const WHY_IN_HOUSE = {
  title: 'Why print in-house',
  intro: 'Two reasons to bring it in-house, and they are not the same reason.',
  cards: [
    {
      label: 'For the clinic',
      img: '/img/printers/part-arch-model.png',
      imgAlt: 'Printed full-arch dental model',
      points: [
        'The case stops leaving the building',
        'A model, a guide, a splint or a temporary, made in the room where it was designed',
        '221 × 221 × 404 mm and 6.6 kg — an operatory footprint, not a lab bench',
        'The patient’s second appointment stops being a logistics problem',
      ],
    },
    {
      label: 'For the laboratory',
      img: '/img/printers/halot-volume.png',
      imgAlt: 'HALOT-X1 build plate loaded with printed arches and crowns',
      points: [
        'The plate is the unit of economics — 211.68 × 118.37 × 200 mm',
        'Up to 170 mm/h at a 0.20 mm layer changes what a night shift produces',
        'Open material — the catalog’s phrase: “keeps ongoing resin cost flexible”',
        'Cost per unit stays something you negotiate, not something you inherit',
      ],
    },
  ],
};

export const MODELS_INTRO = {
  title: 'The two printers',
  intro:
    'Two printers. Not two tiers. They are built for different work, and the honest way to choose between them is to start from the thing you are making.',
};

export const P1_26: PrinterModel = {
  id: 'p1-26',
  name: 'ODYX P1-26',
  label: 'THE DENTAL PRINTER',
  headline: 'Engineered for the work that goes in the mouth.',
  body: '18 µm X-Y accuracy across a 6.8" 9K monochrome LCD at 8520 × 4320 px. Layers from 0.01 to 0.1 mm, up to 60 mm/h, on a 153 × 77 × 160 mm plate. A third-generation integral 405 nm light source holds better than 90% uniformity, so a part at the edge of the plate matches a part at the centre.',
  specPull: ['18 µm XY', '9K · 6.8"', '60 mm/h', '153 × 77 × 160 mm'],
  img: '/img/printers/p1-26-angle.jpg',
  imgAlt: 'ODYX P1-26 three-quarter view',
  gallery: [
    { img: '/img/printers/p126-detail-precision.png', alt: '18 µm precision detail on printed teeth' },
    { img: '/img/printers/p126-detail-front.png', alt: 'P1-26 front view with accuracy annotations' },
    { img: '/img/printers/p126-detail-rails.png', alt: 'P1-26 side view showing dual linear rails' },
  ],
  specs: [
    { label: 'X-Y accuracy', value: '18 µm' },
    { label: 'Print screen', value: '6.8" 9K monochrome LCD, 8520 × 4320 px' },
    { label: 'Build volume', value: '153 × 77 × 160 mm' },
    { label: 'Max print speed', value: '60 mm/h' },
    { label: 'Layer thickness', value: '0.01 – 0.1 mm' },
    { label: 'Light source', value: '3rd-generation integral, 405 nm, uniformity > 90%' },
    { label: 'Z-axis', value: 'Dual linear guide rails + T-shaped screw' },
    { label: 'Touch screen', value: '5" capacitive color' },
    { label: 'Connectivity', value: 'USB / WiFi, cloud printing' },
    { label: 'Slicer', value: 'ODYX Box — Windows 7/8/10 x64, macOS' },
    { label: 'UI languages', value: '13' },
    { label: 'Materials', value: 'Open material system' },
    { label: 'Optional tank & platform', value: '60 × 60 × 100 mm, for single-unit cases' },
    { label: 'Machine size', value: '221 × 221 × 404 mm' },
    { label: 'Weight', value: '6.6 kg' },
    { label: 'Screen lifetime', value: '2000 h' },
  ],
};

export const P1_26_PRINTS = {
  label: 'Prints',
  items: [
    'Crowns',
    'Bridges',
    'Veneers',
    'Inlays & onlays',
    'Temporary crowns & bridges',
    'Study, aligner & working models',
    'Implant surgical guides',
  ],
  microcopy:
    'What a printed part is cleared for is a property of the resin, not the machine. Certification is stated per resin line.',
  microcopyLink: { label: 'See the resins', href: '/products/Resin' },
};

export const HALOT_X1: PrinterModel = {
  id: 'halot-x1',
  name: 'ODYX HALOT-X1',
  label: 'THE VOLUME PRINTER',
  headline: 'For everything that supports the case.',
  body: 'A 10.1" 16K monochrome LCD at 15120 × 6230 px over a 211.68 × 118.37 × 200 mm plate, running up to 170 mm/h at a 0.20 mm layer. A honeycomb 405 nm matrix fires only the 92 zones under the model. Factory-calibrated and leveling-free — the vat and light source move while the plate stays still — and the Auto Feed Unit keeps resin topped up, heated to 30–45 °C and weighed in real time.',
  specPull: ['16K · 10.1"', '170 mm/h', '211.68 × 118.37 × 200 mm', 'Leveling-free'],
  img: '/img/printers/halot-packshot.png',
  imgAlt: 'ODYX HALOT-X1 three-quarter view',
  gallery: [
    { img: '/img/printers/halot-x1-hero.png', alt: 'HALOT-X1 with a printed full-arch model' },
    { img: '/img/printers/halot-inprint.png', alt: 'Teeth printing on the HALOT-X1 build plate' },
    { img: '/img/printers/parts-tray.png', alt: 'Printed crowns, bridge and splint on a tray' },
  ],
  specs: [
    { label: 'X-Y resolution', value: '14 × 19 µm' },
    { label: 'Print screen', value: '10.1" 16K monochrome LCD, 15120 × 6230 px' },
    { label: 'Build volume', value: '211.68 × 118.37 × 200 mm' },
    { label: 'Print speed', value: 'Up to 170 mm/h at a 0.20 mm layer' },
    { label: 'Layer thickness', value: '0.01 – 0.2 mm' },
    { label: 'Light source', value: 'Honeycomb 405 nm matrix, 92 intelligent zones' },
    { label: 'Motion', value: 'Moving vat and light source, fixed build plate' },
    { label: 'Leveling', value: 'Leveling-free, factory calibrated' },
    { label: 'Resin feed', value: 'Auto Feed Unit — real-time level and bottle weight, heating 30–45 °C' },
    { label: 'File formats', value: 'STL / OBJ — reads straight from EXOCAD and 3Shape' },
    { label: 'Machine size', value: '344 × 331 × 434 mm' },
    { label: 'Weight', value: '12.93 kg' },
    { label: 'LCD lifetime', value: '~3000 h' },
    { label: 'Release film life', value: '~30,000 layers' },
    { label: 'UV lamp life', value: '~20,000 h' },
  ],
};

export const HALOT_HONEST_LINE = {
  body: 'It has the larger screen, the larger plate and the faster quoted speed. It is still the narrower instrument.',
  suitable:
    'Study models, orthodontic models, surgical guides, splints and night guards, and temporary crowns.',
  notRecommended:
    'Final restorations, advanced implant surgical guides, or full-arch prosthetics. For those, print on the P1-26.',
  microcopy: 'Reads STL and OBJ straight from EXOCAD and 3Shape.',
};

/** Technical features — image cards. Every line traces to the claims register. */
export const TECH_FEATURES: { title: string; intro: string; cards: TechFeature[] } = {
  title: 'Technical features',
  intro: 'Every figure is from the ODYX product catalog, 18 July 2026.',
  cards: [
    {
      model: 'P1-26',
      title: '18 µm X-Y accuracy',
      line: '9K monochrome LCD at 8520 × 4320 px, layers from 0.01 mm.',
      img: '/img/printers/p126-detail-precision.png',
      alt: 'Close-up of 18 µm precision detail on printed teeth',
    },
    {
      model: 'P1-26',
      title: 'Third-gen 405 nm light source',
      line: 'Better than 90% uniformity — edge parts match centre parts.',
      img: '/img/printers/p126-detail-front.png',
      alt: 'P1-26 front view, light source and screen annotated',
    },
    {
      model: 'P1-26',
      title: 'Dual linear rails + T-screw',
      line: 'Stable Z-motion in a 221 mm-deep operatory footprint.',
      img: '/img/printers/p126-detail-rails.png',
      alt: 'P1-26 side view showing the dual linear guide rails',
    },
    {
      model: 'HALOT-X1',
      title: 'Honeycomb 405 nm matrix',
      line: 'Fires only the 92 intelligent zones under the model.',
      img: '/img/printers/halot-light.png',
      alt: 'Honeycomb matrix light source visualization',
    },
    {
      model: 'HALOT-X1',
      title: '211.68 × 118.37 × 200 mm plate',
      line: 'Full arches and batch production in one run.',
      img: '/img/printers/halot-volume.png',
      alt: 'HALOT-X1 build plate loaded with arches and crowns',
    },
    {
      model: 'HALOT-X1',
      title: 'Auto Feed Unit',
      line: 'Real-time resin level and bottle weight, heated 30–45 °C.',
      img: '/img/printers/halot-afu.png',
      alt: 'Auto Feed Unit with resin bottle',
    },
    {
      model: 'HALOT-X1',
      title: 'Leveling-free Z-axis',
      line: 'Factory calibrated — moving vat and light source, fixed plate.',
      img: '/img/printers/halot-zaxis.png',
      alt: 'HALOT-X1 Z-axis and resin vat close-up',
    },
    {
      model: 'HALOT-X1',
      title: '14 × 19 µm X-Y resolution',
      line: '16K screen, 0.01–0.2 mm layers, up to 170 mm/h.',
      img: '/img/printers/halot-xy.png',
      alt: 'Micro-detail comparison on a printed model',
    },
  ],
};

export const ROUTER = {
  title: 'What are you printing?',
  img: '/img/printers/parts-tray.png',
  imgAlt: 'Printed bridge, crown and splint on a steel tray',
  indications: [
    {
      id: 'crown-bridge',
      pick: 'Crown or bridge',
      printer: 'P1-26',
      resin: 'Crown & Bridge',
      certification: 'ce-fda',
      cure: 'Varies by resin — see cure timings',
    },
    {
      id: 'veneer-inlay',
      pick: 'Veneer, inlay or onlay',
      printer: 'P1-26',
      resin: 'Ceramic Crown',
      certification: 'ce-fda',
      cure: 'Varies by resin — see cure timings',
    },
    {
      id: 'temporary',
      pick: 'Temporary crown or bridge',
      printer: 'P1-26',
      printerNote: 'HALOT-X1 for volume',
      resin: 'Temporary Restoration',
      certification: 'none',
      cure: '~10 min',
    },
    {
      id: 'study-model',
      pick: 'Study or orthodontic model',
      printer: 'Either printer',
      resin: 'Ortho Model 2.0',
      certification: 'ce-fda',
      cure: '~2 min',
    },
    {
      id: 'aligner-model',
      pick: 'Aligner / thermoform model',
      printer: 'Either printer',
      resin: 'Ortho Model 2.0',
      certification: 'ce-fda',
      resinNote: 'Withstands vacuum thermoforming heat',
      cure: '~2 min',
    },
    {
      id: 'surgical-guide',
      pick: 'Implant surgical guide',
      printer: 'P1-26',
      resin: 'Surgical Guide Pro',
      certification: 'none',
      resinNote: 'Steam sterilizable to 135 °C',
      cure: '~3 min',
    },
    {
      id: 'splint',
      pick: 'Splint or night guard',
      printer: 'Either printer',
      resin: 'No ODYX resin line — open material system',
      certification: 'open',
      cure: 'Set by your resin',
    },
    {
      id: 'denture',
      pick: 'Denture',
      printer: 'P1-26',
      resin: 'No ODYX resin line — open material system',
      certification: 'open',
      cure: '~15 min',
    },
  ] as IndicationRow[],
  openMaterialCopy:
    'Both printers are open-material systems, so this one runs on the 405 nm resin you already use. There is no ODYX line for it yet.',
  links: {
    resin: { label: 'See the resin', href: '/products/Resin' },
    cure: { label: 'See the cure settings', href: '/products/curing-machines' },
  },
  footnote:
    'Two of the five ODYX resin lines carry neither CE nor FDA. Certification is stated per line, never across the range.',
};

export const SPECS_SECTION = {
  title: 'Specifications',
  intro: 'Every figure below is from the ODYX product catalog, 18 July 2026.',
};

export const RUNNING_COSTS = {
  title: 'Running costs',
  intro:
    'Every LCD printer has consumables. Here is the schedule, in hours and layers, so it can be budgeted rather than discovered.',
  rows: [
    { part: 'LCD screen', p126: '2000 h', halot: '~3000 h' },
    { part: 'Release film', p126: 'ACF release sheet', halot: '~30,000 layers' },
    { part: 'UV light source', p126: '—', halot: '~20,000 h' },
  ],
  microcopy:
    'Resin is the ongoing cost, and both machines are open — so it stays negotiable.',
};

export const ODYX_CHANGED = {
  title: 'What ODYX changed on the P1-26',
  intro:
    'The straight answer to the question every buyer of a new hardware brand is entitled to ask. Four modifications, on the machine we do our own engineering on.',
  img: '/img/printers/p126-detail-tank.png',
  imgAlt: 'P1-26 tank and platform with ACF release film, small tank and liquid-level annotations',
  callouts: [
    {
      title: 'A small tank and platform',
      body: '60 × 60 × 100 mm, for crowns, bridges and veneers. Less resin in the vat for a single-unit case.',
    },
    {
      title: 'ACF release sheets',
      body: 'Replacing NFEP, for easier peeling between layers.',
    },
    {
      title: 'ODYX Box',
      body: 'The slicing software, rebranded and shipped as ours. Windows and macOS.',
    },
    {
      title: 'A dispensing channel in the tank',
      body: 'Pour resin back without decanting the vat.',
    },
  ],
};

export const WORKFLOW_SECTION = {
  title: 'Where printing sits',
  steps: ['Scan', 'Design', 'Print', 'Wash & Cure', 'Deliver'],
  activeStep: 2,
  stepCopy:
    'The file becomes an object. Minutes to hours, depending on what it is and how many of them are on the plate.',
  img: '/img/printers/halot-inprint.png',
  imgAlt: 'Teeth mid-print on the build plate',
  back: {
    copy: 'The file that lands here came from the S1 or from your own CAD — STL or OBJ, from whatever software you already use.',
    link: { label: 'The step before: Design', href: '/workflows/design' },
  },
  forward: {
    copy: 'Nothing comes off the plate finished. It is washed, then post-cured — and the time depends on the resin, not the printer.',
    link: { label: 'The step after: Wash & Cure', href: '/workflows/cure' },
  },
  followAll: { label: 'Follow the whole workflow', href: '/workflows/print' },
};

export const WORKS_WITH = {
  title: 'The ODYX ecosystem',
  intro: 'The workflow is chosen, not enforced — every step stays open.',
  nodes: [
    {
      name: 'ODYX-S1 scanner',
      body: 'Exports STL and OBJ to any CAD, with no ecosystem restriction.',
      href: '/products/intraoral-scanner',
      img: '/img/cutouts/feat-scanner-cutout.png',
    },
    {
      name: 'P1-26 / HALOT-X1',
      body: 'Two printers, two jobs — definitive work and volume.',
      href: '#models',
      img: '/img/cutouts/feat-printer-cutout.png',
    },
    {
      name: 'ODYX resins',
      body: 'Five lines. The resin decides what the part is cleared for — certification stated per line.',
      href: '/products/Resin',
      img: '/img/cutouts/feat-resin-cutout.png',
    },
    {
      name: 'ODYX Cure / UW-03',
      body: 'Three selectable wavelengths — 365, 385, 405 nm. The UW-03 washes models still on the plate.',
      href: '/products/curing-machines',
      img: '/img/cutouts/feat-curing-cutout.png',
    },
  ],
};

export const DOWNLOADS = {
  title: 'Downloads & demo',
  emptyCopy: 'Datasheets and the full specification sheet are available on request.',
  emptyCta: { label: 'Request a demo', href: '/support' },
  img: '/img/printers/halot-ecosystem.png',
  imgAlt: 'HALOT-X1 on a bench with resins, a printed model and CAD on a laptop',
  closing: {
    headline: 'See it print the case you’re holding.',
    sub: 'A demo runs on your file, in your resin, on the printer you’re considering.',
    cta: { label: 'Request a demo', href: '/support' },
    ctaMicrocopy: 'On your file, in your resin, on the printer you’re considering',
  },
};

export const SUBNAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Models', href: '#models' },
  { label: 'Specs', href: '#specs' },
  { label: 'Downloads', href: '#downloads' },
];
