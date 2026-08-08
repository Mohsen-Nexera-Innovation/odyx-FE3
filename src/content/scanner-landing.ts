/**
 * Scanner S1 landing layout data — attached UI.
 * Specs/claims from scanner-s1.ts claims register only.
 */

export const S1_LANDING_HERO = {
  title: 'ODYX S1',
  subtitle: 'Intraoral Scanner',
  tagline: 'AI-Powered. Accurate. Effortless.',
  body: 'The ODYX S1 delivers high-precision scans with AI-driven features for a seamless digital workflow.',
  img: '/img/scanner/s1-hero-waves.png',
  imgAlt: 'ODYX-S1 intraoral scanner on its charging base with soft signal waves',
  primaryCta: { label: 'Request Demo', href: '/request-demo' },
  secondaryCta: { label: 'Download Brochure', href: '/support' },
};

export const S1_WHY = [
  { id: 'accuracy', label: 'Accuracy' },
  { id: 'ai', label: 'AI Margin Detection' },
  { id: 'weight', label: 'Light Weight' },
  { id: 'arch', label: 'Full Arch In 40s' },
  { id: 'open', label: 'Open System' },
] as const;

export const S1_APPLICATIONS = [
  { id: 'crowns', label: 'Bridges, Crowns', badge: '.STL' },
  { id: 'veneers', label: 'Veneers', badge: '.STL' },
  { id: 'implant', label: 'Implant', badge: '.STL' },
  { id: 'ortho', label: 'Orthodontics', badge: '.STL' },
] as const;

export const S1_VIDEO = {
  title: 'Videos for S1',
  poster: '/img/scanner/s1-software.jpg',
  posterAlt: 'ODYX-S1 scan software with live 3D arch',
  src: '/video/dental-scan-animation.mp4',
};

/** Labels from client mock (intraoral scanne-odyxs1.jpeg) */
export const S1_AI_FEATURES = [
  'AI Scan Cleaning',
  'AI Margin Detection',
  'Soft Tissue Removal',
  'Smart Scan Guidance',
] as const;

/**
 * Mock technical features — label-only checklist.
 * Order is column-major for a 4-row × 2-col grid:
 * Accuracy / Scan Depth / Weight / Tip Size | Scan Speed / Output Format / Warranty
 */
export const S1_TECH_FEATURES = [
  { label: 'Accuracy' },
  { label: 'Scan Depth' },
  { label: 'Weight' },
  { label: 'Tip Size' },
  { label: 'Scan Speed' },
  { label: 'Output Format' },
  { label: 'Warranty' },
] as const;

/** Horizontal cards: transparent cutouts | name + category + Learn more > */
export const S1_COMPATIBLE = [
  {
    name: 'P1-26',
    category: '3D Printer',
    href: '/products/odyx-p1-26',
    img: '/img/scanner/compat/p126.png',
  },
  {
    name: 'Odyx Resin',
    category: '',
    href: '/products/resins',
    img: '/img/scanner/compat/resins.png',
  },
  {
    name: 'Odyx Cure',
    category: '',
    href: '/products/curing-machines',
    img: '/img/scanner/compat/cure.png',
  },
] as const;

export const S1_CASES = [
  {
    title: 'Full Arch Case',
    body: 'Complete upper-arch capture chairside with margin-ready export.',
    author: 'Dr. Ahmed K.',
    img: '/img/scanner/arch-photo.jpg',
  },
  {
    title: 'Crown Prep Case',
    body: 'AI margin detection kept the prep line clear for the lab.',
    author: 'Dr. Sara M.',
    img: '/img/scanner/s1-scanlight.jpg',
  },
  {
    title: 'Implant Scan Body',
    body: 'Deep margins and scan bodies captured in a single pass.',
    author: 'Dr. Youssef R.',
    img: '/img/scanner/s1-chairside.jpg',
  },
] as const;

export const S1_REVIEW = {
  quote:
    'The S1 made same-day digital impressions routine — light in the hand, open files for our lab.',
  author: 'Dr. Rania A.',
};
