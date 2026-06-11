export interface NavLink { label: string; href: string }
export interface NavGroup { label: string; href: string; items: NavLink[] }

export const HEADER_MENUS: NavGroup[] = [
  {
    label: 'About ODYX',
    href: '/about',
    items: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Vision & Mission', href: '/about' },
      { label: 'Values & Beliefs', href: '/about' },
      { label: 'Why ODYX', href: '/#why' },
      { label: 'Our Team', href: '/about' },
      { label: 'News', href: '/#news' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    items: [
      { label: 'Products Overview', href: '/products' },
      { label: 'Intraoral Scanners', href: '/products/intraoral-scanner' },
      { label: 'Design Software', href: '/products/design' },
      { label: '3D Printers', href: '/products/3d-printers' },
      { label: 'Curing Machines', href: '/products/curing-machines' },
      { label: 'Staining & Glazing', href: '/products/staining-glazing' },
      { label: 'Resins', href: '/products/resins' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions/dentists',
    items: [
      { label: 'For Dentists', href: '/solutions/dentists' },
      { label: 'For Dental Labs', href: '/solutions/labs' },
      { label: 'Clinical Applications', href: '/#clinical' },
      { label: 'Solutions Overview', href: '/solutions/dentists' },
    ],
  },
  {
    label: 'Workflows',
    href: '/workflows',
    items: [
      { label: 'Workflow Hub', href: '/workflows' },
      { label: 'Scan', href: '/workflows/scan' },
      { label: 'Design', href: '/workflows/design' },
      { label: 'Print', href: '/workflows/print' },
      { label: 'Cure', href: '/workflows/cure' },
      { label: 'Finish', href: '/workflows/finish' },
      { label: 'Deliver', href: '/workflows/deliver' },
    ],
  },
  {
    label: 'Learning',
    href: '/learning',
    items: [
      { label: 'Learning Center', href: '/learning' },
      { label: 'Beginner Path', href: '/learning' },
      { label: 'Clinical Courses', href: '/learning' },
      { label: 'Articles', href: '/learning' },
      { label: 'Videos & Tutorials', href: '/learning' },
    ],
  },
  {
    label: 'Support',
    href: '/support',
    items: [
      { label: 'Support Hub', href: '/support' },
      { label: 'Troubleshooting', href: '/support#troubleshooting' },
      { label: 'Product Manuals', href: '/support#manuals' },
      { label: 'Software Updates', href: '/support#updates' },
      { label: 'Knowledge Base', href: '/support#educate' },
      { label: 'Warranty & Service', href: '/support#warranty' },
      { label: 'Live Chat', href: '/support#chat' },
    ],
  },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Scanners', href: '/products/intraoral-scanner' },
      { label: '3D Printers', href: '/products/3d-printers' },
      { label: 'Curing', href: '/products/curing-machines' },
      { label: 'Resins', href: '/products/resins' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Dentists', href: '/solutions/dentists' },
      { label: 'Labs', href: '/solutions/labs' },
      { label: 'Clinical', href: '/#clinical' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { label: 'Academy', href: '/learning' },
      { label: 'Workflows', href: '/workflows' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Sign in', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Contact', href: '/#cta' },
    ],
  },
];
