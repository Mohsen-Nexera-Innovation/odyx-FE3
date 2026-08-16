export type PathRole = {
  id: string;
  tab: string;
  title: string;
  line: string;
  cta: string;
  href: string;
  /** Full-bleed / continuum lifestyle photo for the role */
  img: string;
  alt: string;
};

export const PATH_SWAP_MS = 380;

/** Roles used by Path Opt 1 + Opt 3 (Distributor replaces Guest). */
export const PATH_ROLES: PathRole[] = [
  {
    id: 'dentist',
    tab: 'Dentist',
    title: 'Dentist',
    line: 'Chairside workflows built for the clinic.',
    cta: 'Enter clinic journey',
    href: '/solutions',
    img: '/img/paths/dentist.jpg?v=3',
    alt: 'Dentist using an ODYX intraoral scanner chairside',
  },
  {
    id: 'lab',
    tab: 'Dental Lab',
    title: 'Dental Lab',
    line: 'Production workflows built for dental labs.',
    cta: 'Enter lab journey',
    href: '/solutions',
    img: '/img/paths/lab.jpg?v=3',
    alt: 'Dental lab production with ODYX digital equipment',
  },
  {
    id: 'distributor',
    tab: 'Distributor',
    title: 'Distributor',
    line: 'Grow the network with tools clinics trust.',
    cta: 'Enter partner journey',
    href: '/solutions',
    img: '/img/paths/distributor.jpg?v=3',
    alt: 'ODYX partner and distributor ecosystem',
  },
];
