/**
 * About ODYX — brand story content.
 * Narrative from knowledge_base/docs/brief.md §1–4.
 * No product specs invented here; links point to catalog-backed product pages.
 */

import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

export const ABOUT_META = {
  title: 'About ODYX Egypt',
  description:
    'Who we are, vision, values and the team behind one connected digital dentistry ecosystem — from scan to delivered restoration.',
};

/** Live `/about` hub types and copy. */

export interface AboutHeroFeature {
  icon: 'shield-check' | 'users' | 'lightbulb' | 'globe';
  title: string;
  description: string;
}

export interface AboutHeroData {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  features: AboutHeroFeature[];
}

export interface WhyFeature {
  icon: 'settings' | 'user' | 'book' | 'heart';
  title: string;
  description: string;
}

export interface WhyCard {
  image: string;
  title: string;
  description: string;
}

export interface WhyOdyxData {
  kicker: string;
  title: string;
  subtitle: string;
  features: WhyFeature[];
  cards: WhyCard[];
}

export interface ValueItem {
  icon: 'shield' | 'bulb' | 'cap' | 'handshake';
  title: string;
  description: string;
}

export interface ValuesData {
  kicker: string;
  title: string;
  subtitle?: string;
  values: ValueItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface TeamData {
  kicker: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  members: TeamMember[];
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  href: string;
}

export interface NewsData {
  kicker: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  news: NewsItem[];
}

export interface StatsData {
  title: string;
  stats: { value: string; label: string }[];
}

export interface AboutPageData {
  hero: AboutHeroData;
  why: WhyOdyxData;
  values: ValuesData;
  team: TeamData;
  news: NewsData;
  stats: StatsData;
}

export const aboutData: AboutPageData = {
  hero: {
    kicker: 'ABOUT ODYX EGYPT',
    title: 'Built to Transform Digital Dentistry.',
    subtitle: 'At ODYX Egypt, we combine advanced technology, deep expertise, and a passion for innovation to create an ecosystem that empowers clinicians and elevates patient care.',
    primaryCta: { label: 'Our Story', href: '#who-we-are' },
    features: [
      {
        icon: 'shield-check',
        title: 'Our Mission',
        description: 'Empower clinicians with innovative solutions.',
      },
      {
        icon: 'users',
        title: 'Our Focus',
        description: 'Simplify workflows and improve outcomes.',
      },
      {
        icon: 'lightbulb',
        title: 'Our Innovation',
        description: 'Pioneering technology that shapes the future of dentistry.',
      },
    ],
  },
  why: {
    kicker: 'WHY ODYX',
    title: 'More than technology, a partner you can rely on.',
    subtitle: 'We stand by clinicians with reliable solutions, real support, and a commitment to help them grow—today and for the future.',
    features: [
      {
        icon: 'settings',
        title: 'Engineered to Perform',
        description: 'Precision. Reliability. Proven results.',
      },
      {
        icon: 'user',
        title: 'People Who Care',
        description: 'Real support from real experts.',
      },
      {
        icon: 'book',
        title: 'Knowledge That Empowers',
        description: 'Education and resources to keep you ahead.',
      },
      {
        icon: 'heart',
        title: 'Growing Together',
        description: 'Your success is our mission.',
      },
    ],
    cards: [
      {
        image: '/images/about/clinicians.png',
        title: 'For Clinicians',
        description: 'Solutions that simplify your daily workflow.',
      },
      {
        image: '/images/about/educators.png',
        title: 'For Educators',
        description: 'Tools and training that inspire confidence.',
      },
      {
        image: '/images/about/partners.png',
        title: 'For Partners',
        description: 'We grow with partners who share our vision.',
      },
    ],
  },
  values: {
    kicker: 'OUR VALUES',
    title: 'What Drives Us.',
    values: [
      {
        icon: 'shield',
        title: 'Integrity',
        description: 'We do the right thing—for our customers, partners, and patients.',
      },
      {
        icon: 'bulb',
        title: 'Innovation',
        description: 'We challenge the status quo to deliver breakthrough solutions.',
      },
      {
        icon: 'cap',
        title: 'Education',
        description: 'We empower clinicians through knowledge, training, and support.',
      },
      {
        icon: 'handshake',
        title: 'Partnership',
        description: 'We grow together with our customers and communities.',
      },
    ],
  },
  team: {
    kicker: 'OUR TEAM',
    title: 'Built by Experts. Inspired by Impact.',
    description: 'Our diverse team of clinicians, engineers, designers, and researchers are united by one mission: advancing dental care through technology.',
    cta: { label: 'Meet the Team', href: '#team' },
    members: [
      {
        name: 'Team Member 1',
        role: 'Co-Founder & CEO',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 2',
        role: 'Head of Clinical Affairs',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 3',
        role: 'CTO',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 4',
        role: 'Head of Design',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
      {
        name: 'Team Member 5',
        role: 'Lead Developer',
        image: '/images/about/our_team.png',
        linkedin: '#',
      },
    ],
  },
  news: {
    kicker: 'NEWS & INSIGHTS',
    title: 'Stay Inspired. Stay Ahead.',
    description: 'The latest news, product launches, research, and insights from ODYX.',
    cta: { label: 'View All News', href: '/news' },
    news: [
      {
        date: 'May 20, 2025',
        title: 'ODYX Launches Next-Gen Intraoral Scanner',
        description: 'Faster. Smarter. More Accurate.',
        image: '/images/about/next_gen.png',
        category: 'FEATURED',
        href: '#',
      },
      {
        date: 'Apr 28, 2025',
        title: 'ODYX at IDS 2025: Thank You!',
        description: 'It was an incredible event.',
        image: '/images/about/ids_2025.png',
        href: '#',
      },
      {
        date: 'Apr 10, 2025',
        title: 'AI-Powered Design: The Future is Now',
        description: 'How AI is transforming workflows.',
        image: '/images/about/ai_powered.png',
        href: '#',
      },
    ],
  },
  stats: {
    title: 'Together, we\'re shaping the future of dentistry.',
    stats: [],
  },
};

/** Cinematic About draft — kept for `src/components/pages/AboutPage.tsx` (not the live route). */

export const ABOUT_HERO = {
  brand: 'ODYX',
  title: 'One connected digital dentistry ecosystem',
  lead: 'From the first scan to the delivered restoration — hardware, materials, and guidance designed as one uninterrupted path.',
  primaryCta: { label: 'Explore products', href: '/products' },
  secondaryCta: { label: 'Our story', href: '/about#who-we-are' },
  float: [
    {
      src: '/img/scanner/s1-hero-cutout.png',
      alt: 'ODYX intraoral scanner',
      className: 'about-hero__float--scanner',
    },
    {
      src: '/img/cutouts/feat-printer-cutout.png',
      alt: 'ODYX dental 3D printer',
      className: 'about-hero__float--printer',
    },
    {
      src: '/img/cure-uv02/hero/machine-cutout.png',
      alt: 'ODYX Cure curing station',
      className: 'about-hero__float--cure',
    },
  ],
};

export const ABOUT_MANIFESTO = {
  kicker: 'The idea',
  line: 'Not a catalog of devices.',
  emphasis: 'A single digital workflow.',
  body: 'Every ODYX product connects into one sequence — so clinics and labs go digital with clarity, not complexity.',
};

export const ABOUT_STORY = {
  eyebrow: 'Who we are',
  h2: 'Built for the full clinical path',
  paragraphs: [
    'ODYX covers the technology a dental clinic or laboratory needs to run a complete digital workflow — from the first scan of a patient’s mouth to the final delivered restoration.',
    'That connected path is the brand. Scanner, design, print, cure, and resin are steps in one system — not isolated products on a shelf.',
  ],
  mosaic: [
    {
      src: '/img/scanner/s1-hero.png',
      alt: 'ODYX S1 intraoral scanner in a clinical chairside setting',
      caption: 'Scan',
    },
    {
      src: '/img/printers/clinic-scene.jpg',
      alt: 'ODYX dental 3D printer in a clinic production scene',
      caption: 'Print',
    },
    {
      src: '/img/printers/lab-scene.jpg',
      alt: 'ODYX printing workflow in a dental laboratory',
      caption: 'Lab',
    },
    {
      src: '/img/cure-uv02/device-angle.jpg',
      alt: 'ODYX Cure post-curing unit',
      caption: 'Cure',
    },
  ],
};

/** Four-step spine (SCAN → DESIGN → PRINT → CURE). Design is dimmed until ready. */
export const ABOUT_SPINE = [
  {
    no: '01',
    label: 'Scan',
    blurb: 'Chairside digital impression — instant 3D data, no molds.',
    href: DIGITAL_WORKFLOW_LINKS.scan,
    dimmed: isDigitalWorkflowDimmed('scan'),
    img: '/img/scanner/s1-hero.png',
    alt: 'Digital intraoral scan',
  },
  {
    no: '02',
    label: 'Design',
    blurb: 'Scan data becomes a precise restoration in CAD.',
    href: DIGITAL_WORKFLOW_LINKS.design,
    dimmed: isDigitalWorkflowDimmed('design'),
    img: '/img/odyx/design.webp',
    alt: 'Dental restoration design',
  },
  {
    no: '03',
    label: 'Print',
    blurb: 'Layer by layer — crowns, guides, models, dentures.',
    href: DIGITAL_WORKFLOW_LINKS.print,
    dimmed: isDigitalWorkflowDimmed('print'),
    img: '/img/scanner/step-print.jpg',
    alt: 'Dental 3D printing',
  },
  {
    no: '04',
    label: 'Cure',
    blurb: 'Controlled finishing for strength and biocompatibility.',
    href: DIGITAL_WORKFLOW_LINKS.cure,
    dimmed: isDigitalWorkflowDimmed('cure'),
    img: '/img/scanner/step-cure.jpg',
    alt: 'Cure step',
  },
] as const;

export const ABOUT_VISION = {
  title: 'Vision',
  body: 'Make digital dentistry the default standard of care — accessible, reliable, and clinically trusted for every practice ready to go digital.',
  img: '/img/why/why-clinical.png',
  alt: 'Clinical digital dentistry environment',
};

export const ABOUT_MISSION = {
  title: 'Mission',
  body: 'Reduce the complexity of going digital with guided, visual, workflow-led tools — so dentists and labs move from first scan to delivered restoration with confidence.',
  img: '/img/why/why-integrated.png',
  alt: 'Integrated digital dentistry workflow',
};

export const ABOUT_VALUES = [
  {
    no: '01',
    title: 'Clinical confidence',
    desc: 'Validated parameters from scan to cure so outcomes stay predictable across the chairside and lab floor.',
    img: '/img/why/why-clinical.png',
    alt: 'Clinical confidence',
  },
  {
    no: '02',
    title: 'Connected workflow',
    desc: 'Hardware, materials, and guidance designed to work as one system — not isolated devices.',
    img: '/img/why/why-integrated.png',
    alt: 'Connected workflow',
  },
  {
    no: '03',
    title: 'Professional clarity',
    desc: 'Direct language for dentists and labs — no unnecessary complexity, no marketing fog.',
    img: '/img/why/why-precision.png',
    alt: 'Professional clarity',
  },
  {
    no: '04',
    title: 'Lifelong support',
    desc: 'Training, manuals, and service that stay with the practice after purchase.',
    img: '/img/why/why-training.png',
    alt: 'Lifelong support and training',
  },
] as const;

export const ABOUT_AUDIENCES = [
  {
    title: 'Dentists & clinics',
    desc: 'Same-day capability, implant guides, and a clear path from analog impressions to a full digital chairside workflow.',
    img: '/img/paths/dentist.jpg',
    alt: 'Dentist digital workflow path',
    href: '/solutions',
    cta: 'Dentist journey',
    tone: 'teal' as const,
  },
  {
    title: 'Dental laboratories',
    desc: 'High-volume resin production, CAD/CAM integration, and an end-to-end stack for labs transitioning from milling to print.',
    img: '/img/paths/lab.jpg',
    alt: 'Dental laboratory digital workflow path',
    href: '/solutions',
    cta: 'Lab journey',
    tone: 'sky' as const,
  },
] as const;

export const ABOUT_FAMILIES = [
  {
    name: 'ODYX Scanners',
    desc: 'Chairside capture that starts the digital path.',
    img: '/img/scanner/s1-hero-cutout.png',
    brand: '/brand/odyx-scanners.png',
    href: '/products/odyx-s1',
    accent: 'teal' as const,
  },
  {
    name: 'Digital Printing',
    desc: 'Print, cure, and clinical resins as one production line.',
    img: '/img/cutouts/feat-printer-cutout.png',
    brand: '/brand/odyx-digital-printing.png',
    href: '/products/odyx-p1-26',
    accent: 'print' as const,
  },
] as const;

export const ABOUT_TEAM = [
  {
    name: 'Leadership',
    role: 'Strategy, partnerships, and brand direction',
    focus: 'Building the ecosystem dentists and labs can grow with.',
  },
  {
    name: 'Clinical advisors',
    role: 'Workflow & indications',
    focus: 'Keeping every recommendation grounded in real chairside and lab practice.',
  },
  {
    name: 'Product engineering',
    role: 'Hardware & materials',
    focus: 'Scanner, printers, cure systems, and resin lines that connect cleanly.',
  },
  {
    name: 'Customer care',
    role: 'Support & training',
    focus: 'Setup, troubleshooting, and academy paths after the purchase.',
  },
] as const;

export const ABOUT_NEWS = [
  {
    tag: 'Product',
    title: 'Permanent crown & bridge resin line',
    href: '/products/resins',
    img: '/img/news-1.jpg',
    alt: 'ODYX resin product news',
    featured: true,
  },
  {
    tag: 'Workflow',
    title: 'Scan to cure — the four-step path',
    href: '/workflows',
    img: '/img/news-2.jpg',
    alt: 'ODYX digital workflow news',
    featured: false,
  },
  {
    tag: 'Academy',
    title: 'Learning paths for clinics and labs',
    href: '/learning',
    img: '/img/news-3.jpg',
    alt: 'ODYX academy news',
    featured: false,
  },
] as const;

export const ABOUT_CHAPTERS = [
  { id: 'who-we-are', label: 'Story' },
  { id: 'ecosystem', label: 'Workflow' },
  { id: 'vision-mission', label: 'Vision' },
  { id: 'values', label: 'Values' },
  { id: 'audiences', label: 'Paths' },
  { id: 'team', label: 'Team' },
] as const;
