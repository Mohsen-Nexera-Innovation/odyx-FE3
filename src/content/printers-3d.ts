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

import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

export interface PrinterSpecRow {
  label: string;
  value: string;
}

export interface PrinterModel {
  id: 'p1-26';
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

export type ResinLineId =
  | 'ceramic-crown'
  | 'crown-bridge'
  | 'ortho-model'
  | 'surgical-guide-pro'
  | 'temporary-restoration';

export interface ResinLine {
  id: ResinLineId;
  name: string;
  idealFor: string;
  highlight: string;
  /** Per-line certification — never range-wide (claims register rule). */
  cert: { label: string; badges: string[] };
  packshot: string;
  scene: string;
  sceneAlt: string;
}

export interface ClinicalCasePlaceholder {
  title: string;
}

export interface IndicationRow {
  id: string;
  pick: string;
  printer: string;
  printerNote?: string;
  resin: string;
  /** Matching ODYX resin line — absent on open-material indications. */
  resinId?: ResinLineId;
  certification: 'ce-fda' | 'none' | 'open';
  resinNote?: string;
  cure: string;
  cases: ClinicalCasePlaceholder[];
}

export interface TechFeature {
  model: 'P1-26';
  title: string;
  line: string;
  img: string;
  alt: string;
}

export const PRINTERS_META = {
  title: 'Dental 3D Printer — ODYX P1-26',
  description:
    'The ODYX P1-26 dental 3D printer — 18 µm X-Y accuracy for definitive restorations, models and appliances. Open-material 405 nm LCD.',
};

export const HERO = {
  eyebrow: 'STEP 3 OF 5 · PRINT',
  headline: 'The dental 3D printer that finishes what the scan started.',
  sub:
    'The ODYX P1-26 prints the definitive work that goes in the mouth — crowns, bridges, guides and models — on an open-material 405 nm LCD system.',
  primaryCta: { label: 'Request a demo', href: '/request-demo' },
  secondaryCta: { label: 'Download the datasheet', href: '#downloads' },
  chipsLabel: 'Built into the P1-26',
  chips: [
    '405 nm LCD light engine',
    'Open material system',
    'Cloud & USB printing',
    'Wash & cure on one bench',
    'Cure times per application',
  ],
  img: '/img/cutouts/feat-printer-cutout.png',
  imgAlt: 'ODYX P1-26 resin 3D printer',
};

export const WHY_IN_HOUSE = {
  title: 'Why print in-house',
  intro: 'Two reasons to bring it in-house, and they are not the same reason.',
  cards: [
    {
      label: 'For the clinic',
      img: '/img/printers/clinic-scene.jpg',
      imgAlt: 'Compact resin printer on an operatory bench with printed models, an aligner and crowns, dental chair behind',
      points: [
        'The case stops leaving the building',
        'A model, a guide, a splint or a temporary, made in the room where it was designed',
        '221 × 221 × 404 mm and 6.6 kg — an operatory footprint, not a lab bench',
        'The patient’s second appointment stops being a logistics problem',
      ],
    },
    {
      label: 'For the laboratory',
      img: '/img/printers/lab-scene.jpg',
      imgAlt: 'Lab printer with a build plate fully loaded with printed arches, crowns and splints',
      points: [
        '153 × 77 × 160 mm plate — crowns, bridges, guides and models on one machine',
        'Up to 60 mm/h with layers from 0.01 to 0.1 mm',
        'Open material — the catalog’s phrase: “keeps ongoing resin cost flexible”',
        'Cost per unit stays something you negotiate, not something you inherit',
      ],
    },
  ],
};

export const MODELS_INTRO = {
  title: 'The ODYX P1-26',
  intro:
    'Engineered for the work that goes in the mouth — and for the models and appliances that support it.',
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

/** Video placeholder — poster only until the client delivers the print-run footage. */
export const P1_26_VIDEO = {
  poster: '/img/printers/p1-26-hero.jpg',
  posterAlt: 'ODYX P1-26 mid-print, build platform lowered into the resin vat',
  caption: 'The P1-26 in action',
};

export const P1_26_RESINS = {
  label: 'Featured resins',
  items: [
    { name: 'Temporary Restoration Resin', img: '/img/resins/temp-restro-resign-2.jpg' },
    { name: 'Crown and Bridge Resin', img: '/img/resins/crown-and-bridge-resign-2.jpg' },
    { name: 'Surgical Guide Resin Pro', img: '/img/resins/surcgical-guide-resign-pro-1.jpg' },
  ],
  cta: { label: 'Explore more resins', href: '/products/resins' },
  microcopy:
    'What a printed part is cleared for is a property of the resin, not the machine. Certification is stated per resin line.',
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
      model: 'P1-26',
      title: '153 × 77 × 160 mm plate',
      line: 'Room for crowns, bridges, guides and models in one run.',
      img: '/img/printers/parts-tray.png',
      alt: 'Printed crowns, bridge and splint on a tray',
    },
    {
      model: 'P1-26',
      title: 'Optional small tank & platform',
      line: '60 × 60 × 100 mm — less resin in the vat for single-unit cases.',
      img: '/img/printers/p126-detail-tank.png',
      alt: 'P1-26 tank and platform with ACF release film annotations',
    },
    {
      model: 'P1-26',
      title: 'Open material · cloud printing',
      line: 'ODYX Box slicer, USB and WiFi, 13 UI languages.',
      img: '/img/printers/p1-26-hero.jpg',
      alt: 'ODYX P1-26 mid-print on the bench',
    },
  ],
};

/**
 * The five resin lines, as shown inside the indication router. Copy is
 * transcribed from knowledge_base/screens/039-resin/content.md §3 (which traces
 * to the product catalog PDF). Imagery from knowledge_base/product-photos/resin.
 */
export const RESIN_LINES: Record<ResinLineId, ResinLine> = {
  'ceramic-crown': {
    id: 'ceramic-crown',
    name: 'Ceramic Crown Resin',
    idealFor: 'Crowns, veneers, inlays and onlays — permanent and temporary restorations.',
    highlight:
      'Low polymerization shrinkage for an accurate marginal fit; wear- and fracture-resistant, in six natural shades.',
    cert: { label: 'Certified', badges: ['CE', 'FDA', 'ISO'] },
    packshot: '/img/resins/ceramic-crown.jpg',
    scene: '/img/resins/ceramic-scene.jpg',
    sceneAlt: 'Ceramic Crown Resin bottle beside printed crowns and bridges on a marble bench',
  },
  'crown-bridge': {
    id: 'crown-bridge',
    name: 'Crown & Bridge Resin',
    idealFor: 'Crowns, bridges, denture teeth, inlays, onlays and veneers.',
    highlight:
      'Mechanical strength for long-term restorations; impact resistance that minimizes fracture risk.',
    cert: { label: 'Certified', badges: ['CE', 'FDA', 'ISO'] },
    packshot: '/img/resins/crown-and-bridge.jpg',
    scene: '/img/resins/crown-and-bridge-resign-2.jpg',
    sceneAlt: 'Crown & Bridge Resin bottle on a bench in front of a printer and a printed arch',
  },
  'ortho-model': {
    id: 'ortho-model',
    name: 'Ortho Model Resin 2.0',
    idealFor: 'Study models, aligner models and working models.',
    highlight:
      'High dimensional accuracy with a smooth surface — and it withstands vacuum thermoforming heat.',
    cert: { label: 'Certified', badges: ['CE', 'FDA', 'ISO'] },
    packshot: '/img/resins/model-resin.jpg',
    scene: '/img/resins/model-scene.jpg',
    sceneAlt: 'Model Resin bottle surrounded by printed dental arch models',
  },
  'surgical-guide-pro': {
    id: 'surgical-guide-pro',
    name: 'Surgical Guide Resin Pro',
    idealFor: 'Implant surgical guides.',
    highlight:
      'High transparency for visibility during surgery; flexibility that prevents cracking; steam-sterilizable to 135 °C.',
    cert: { label: 'Biocompatibility-tested', badges: ['ISO 10993', 'ISO 13485'] },
    packshot: '/img/resins/surgical-guide-pro.jpg',
    scene: '/img/resins/surgical-scene.jpg',
    sceneAlt: 'Surgical Guide Resin Pro bottle with transparent printed implant guides',
  },
  'temporary-restoration': {
    id: 'temporary-restoration',
    name: 'Temporary Restoration Resin',
    idealFor: 'Temporary crowns and bridges.',
    highlight:
      'Easy polishing and patient comfort, water absorption under 1.5%, six natural shades.',
    cert: { label: 'Biocompatibility-tested', badges: ['ISO 10993', 'ISO 13485'] },
    packshot: '/img/resins/temporary-restoration.jpg',
    scene: '/img/resins/temp-scene.jpg',
    sceneAlt: 'Temporary Restoration Resin bottle in a workflow scene with printer, scanner and printed provisionals',
  },
};

/** Shown for open-material indications (splints, dentures) instead of a line card. */
export const OPEN_MATERIAL_PANEL = {
  title: 'Runs on your 405 nm resin',
  img: '/img/resins/all-resins.jpg',
  imgAlt: 'The five ODYX resin bottles grouped together',
  cta: { label: 'See all five ODYX resin lines', href: '/products/resins' },
};

export const ROUTER = {
  title: 'What are you printing?',
  resinCardLabel: 'The resin for this job',
  casesLabel: 'Clinical cases',
  casesNote:
    'Real cases from ODYX clinicians are being documented — photography pending. Each will show the printed part, the printer and the resin line used.',
  casePendingTag: 'Photography pending',
  indications: [
    {
      id: 'crown-bridge',
      pick: 'Crown or bridge',
      printer: 'P1-26',
      resin: 'Crown & Bridge',
      resinId: 'crown-bridge',
      certification: 'ce-fda',
      cure: 'Varies by resin — see cure timings',
      cases: [
        { title: 'Three-unit posterior bridge' },
        { title: 'Single molar crown' },
        { title: 'Full-arch restoration' },
      ],
    },
    {
      id: 'veneer-inlay',
      pick: 'Veneer, inlay or onlay',
      printer: 'P1-26',
      resin: 'Ceramic Crown',
      resinId: 'ceramic-crown',
      certification: 'ce-fda',
      cure: 'Varies by resin — see cure timings',
      cases: [
        { title: 'Anterior veneer case, shade-matched' },
        { title: 'Inlay on a first molar' },
        { title: 'Onlay with cusp coverage' },
      ],
    },
    {
      id: 'temporary',
      pick: 'Temporary crown or bridge',
      printer: 'P1-26',
      resin: 'Temporary Restoration',
      resinId: 'temporary-restoration',
      certification: 'none',
      cure: '~10 min',
      cases: [
        { title: 'Long-span provisional bridge' },
        { title: 'Same-visit temporary crown' },
        { title: 'Provisional batch on one plate' },
      ],
    },
    {
      id: 'study-model',
      pick: 'Study or orthodontic model',
      printer: 'P1-26',
      resin: 'Ortho Model 2.0',
      resinId: 'ortho-model',
      certification: 'ce-fda',
      cure: '~2 min',
      cases: [
        { title: 'Full-arch study model' },
        { title: 'Orthodontic working model' },
        { title: 'Overnight model batch' },
      ],
    },
    {
      id: 'aligner-model',
      pick: 'Aligner / thermoform model',
      printer: 'P1-26',
      resin: 'Ortho Model 2.0',
      resinId: 'ortho-model',
      certification: 'ce-fda',
      resinNote: 'Withstands vacuum thermoforming heat',
      cure: '~2 min',
      cases: [
        { title: 'Thermoformed aligner series' },
        { title: 'Aligner models across one plate' },
        { title: 'Retainer model set' },
      ],
    },
    {
      id: 'surgical-guide',
      pick: 'Implant surgical guide',
      printer: 'P1-26',
      resin: 'Surgical Guide Pro',
      resinId: 'surgical-guide-pro',
      certification: 'none',
      resinNote: 'Steam sterilizable to 135 °C',
      cure: '~3 min',
      cases: [
        { title: 'Guided posterior implant placement' },
        { title: 'Full-arch implant guide' },
        { title: 'Guide sterilized and seated' },
      ],
    },
    {
      id: 'splint',
      pick: 'Splint or night guard',
      printer: 'P1-26',
      resin: 'No ODYX resin line — open material system',
      certification: 'open',
      cure: 'Set by your resin',
      cases: [
        { title: 'Occlusal splint' },
        { title: 'Night guard, thin-wall' },
      ],
    },
    {
      id: 'denture',
      pick: 'Denture',
      printer: 'P1-26',
      resin: 'No ODYX resin line — open material system',
      certification: 'open',
      cure: '~15 min',
      cases: [
        { title: 'Full denture base' },
        { title: 'Try-in denture' },
      ],
    },
  ] as IndicationRow[],
  openMaterialCopy:
    'The P1-26 is an open-material system, so this one runs on the 405 nm resin you already use. There is no ODYX line for it yet.',
  links: {
    resin: { label: 'See the resin', href: '/products/resins' },
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
    { part: 'LCD screen', value: '2000 h' },
    { part: 'Release film', value: 'ACF release sheet' },
  ],
  microcopy:
    'Resin is the ongoing cost, and the machine is open — so it stays negotiable.',
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
  steps: [
    { label: 'Scan', href: DIGITAL_WORKFLOW_LINKS.scan, dimmed: isDigitalWorkflowDimmed('scan') },
    { label: 'Design', href: DIGITAL_WORKFLOW_LINKS.design, dimmed: isDigitalWorkflowDimmed('design') },
    { label: 'Print', href: DIGITAL_WORKFLOW_LINKS.print, dimmed: isDigitalWorkflowDimmed('print') },
    { label: 'Cure', href: DIGITAL_WORKFLOW_LINKS.cure, dimmed: isDigitalWorkflowDimmed('cure') },
  ],
  activeStep: 2,
  stepCopy:
    'The file becomes an object. Minutes to hours, depending on what it is and how many of them are on the plate.',
  img: '/img/printers/p1-26-hero.jpg',
  imgAlt: 'ODYX P1-26 mid-print, build platform lowered into the resin vat',
  back: {
    copy: 'The file that lands here came from the S1 or from your own CAD — STL or OBJ, from whatever software you already use.',
    link: {
      label: 'The step before: Design',
      href: DIGITAL_WORKFLOW_LINKS.design,
      dimmed: isDigitalWorkflowDimmed('design'),
    },
  },
  forward: {
    copy: 'Printed parts move to post-cure — time depends on the resin, not the printer.',
    link: { label: 'The step after: Cure', href: DIGITAL_WORKFLOW_LINKS.cure },
  },
  followAll: { label: 'Follow the whole workflow', href: DIGITAL_WORKFLOW_LINKS.print },
};

export const WORKS_WITH = {
  title: 'The ODYX ecosystem',
  intro: 'The workflow is chosen, not enforced — every step stays open.',
  nodes: [
    {
      name: 'ODYX-S1 scanner',
      body: 'Exports STL and OBJ to any CAD, with no ecosystem restriction.',
      href: '/products/odyx-s1-intraoral-scanner',
      img: '/img/scanner/s1-hero-cutout.png',
    },
    {
      name: 'ODYX P1-26',
      body: 'The dental printer — definitive restorations, models and appliances.',
      href: '#models',
      img: '/img/cutouts/feat-printer-cutout.png',
    },
    {
      name: 'ODYX resins',
      body: 'Five lines. The resin decides what the part is cleared for — certification stated per line.',
      href: '/products/resins',
      img: '/img/scanner/eco-resins.jpg',
    },
    {
      name: 'ODYX Cure / UW-03',
      body: 'Three selectable wavelengths — 365, 385, 405 nm. The UW-03 washes models still on the plate.',
      href: '/products/curing-machines',
      img: '/img/cutouts/cure-icon-right-1.jpg',
    },
  ],
};

export const DOWNLOADS = {
  title: 'Downloads & demo',
  emptyCopy: 'Datasheets and the full specification sheet are available on request.',
  emptyCta: { label: 'Request a demo', href: '/request-demo' },
  img: '/img/printers/p1-26-angle.jpg',
  imgAlt: 'ODYX P1-26 three-quarter view on a bench',
  closing: {
    headline: 'See it print the case you’re holding.',
    sub: 'A demo runs on your file, in your resin, on the P1-26.',
    cta: { label: 'Request a demo', href: '/request-demo' },
    ctaMicrocopy: 'On your file, in your resin, on the printer you’re considering',
  },
};

export const SUBNAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Printer', href: '#models' },
  { label: 'Specs', href: '#specs' },
  { label: 'Downloads', href: '#downloads' },
];
