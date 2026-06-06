export interface SupportSection {
  id: string;
  title: string;
  desc: string;
  items: { label: string; href: string; meta?: string }[];
}

export const SUPPORT_SECTIONS: SupportSection[] = [
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    desc: 'Quick fixes for common scan, print and cure issues.',
    items: [
      { label: 'Scanner not connecting', href: '#', meta: '2 min read' },
      { label: 'Print adhesion problems', href: '#', meta: '3 min read' },
      { label: 'Incomplete cure symptoms', href: '#', meta: '2 min read' },
      { label: 'Design export errors', href: '#', meta: '4 min read' },
    ],
  },
  {
    id: 'manuals',
    title: 'Product Manuals',
    desc: 'IFU, setup guides and maintenance for every ODYX device.',
    items: [
      { label: 'Intraoral Scanner IFU', href: '#', meta: 'PDF' },
      { label: '3D Printer setup guide', href: '#', meta: 'PDF' },
      { label: 'Curing machine manual', href: '#', meta: 'PDF' },
      { label: 'Design software install', href: '#', meta: 'PDF' },
      { label: 'Resin processing guides', href: '/products/resins', meta: 'PDF' },
    ],
  },
  {
    id: 'updates',
    title: 'Software Updates',
    desc: 'Firmware and application releases for registered devices.',
    items: [
      { label: 'Scanner firmware v2.4', href: '#', meta: 'Mar 2026' },
      { label: 'Print OS v1.8', href: '#', meta: 'Feb 2026' },
      { label: 'Design Studio v3.1', href: '#', meta: 'Jan 2026' },
    ],
  },
  {
    id: 'educate',
    title: 'Knowledge Base & FAQs',
    desc: 'Learn workflows, materials and best practices.',
    items: [
      { label: 'Which resin for crowns?', href: '#', meta: 'FAQ' },
      { label: 'Workflow overview', href: '/workflows', meta: 'Guide' },
      { label: 'Register your device', href: '/#register', meta: 'Guide' },
      { label: 'Warranty coverage', href: '#warranty', meta: 'FAQ' },
    ],
  },
  {
    id: 'community',
    title: 'User Community',
    desc: 'Connect with clinicians and lab partners.',
    items: [
      { label: 'WhatsApp user group', href: '#', meta: 'Community' },
      { label: 'ODYX on LinkedIn', href: '#', meta: 'Social' },
      { label: 'YouTube tutorials', href: '#', meta: 'Video' },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty & Service',
    desc: 'Coverage, repairs and RMA for registered products.',
    items: [
      { label: 'Register a device', href: '/#register', meta: 'Required' },
      { label: 'Check warranty status', href: '/#register', meta: 'Self-service' },
      { label: 'Request service / RMA', href: '/#cta', meta: 'Contact' },
    ],
  },
  {
    id: 'chat',
    title: 'Live Support',
    desc: 'AI assistant first, human specialist when you need one.',
    items: [
      { label: 'Open Smart Assistant', href: '#', meta: 'Instant' },
      { label: 'WhatsApp customer care', href: '#', meta: '24/7' },
      { label: 'Technical support form', href: '/#cta', meta: 'Email follow-up' },
    ],
  },
];
