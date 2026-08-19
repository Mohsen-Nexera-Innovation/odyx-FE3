export interface NavLink {
  label: string;
  href: string;
  desc?: string;
  /** Background-free cutout shown in the mega menu's featured card while this link is hovered */
  img?: string;
  /** Hidden from the navbar until ready (kept in data for later) */
  dimmed?: boolean;
}

/** Nested group inside a mega column (e.g. "3D Printers") */
export interface MegaGroup {
  label?: string;
  items: NavLink[];
}

/** SprintRay-style mega column */
export interface MegaColumn {
  title: string;
  href?: string;
  groups?: MegaGroup[];
  items?: NavLink[];
  /** Hidden column until ready */
  dimmed?: boolean;
}

export interface MegaFeatured {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  /** Background-free product cutout — must read on both the dark and on-light card variants */
  img?: string;
  imgAlt?: string;
  dimmed?: boolean;
}

export interface NavGroup {
  label: string;
  href: string;
  items: NavLink[];
  /** Full-width multi-column mega (SprintRay-inspired) */
  columns?: MegaColumn[];
  featured?: MegaFeatured;
  /** Hidden top-level item until ready */
  dimmed?: boolean;
  /** Opens mega / mobile accordion only — never navigates to href */
  navOnly?: boolean;
  /** Visible in the bar but not clickable — hover/focus shows a coming-soon tooltip */
  comingSoon?: boolean;
}

/** About mega — only sections that exist on `/about` (app/about). */
const ABOUT_NAV_ITEMS: NavLink[] = [
  {
    label: "Why ODYX",
    href: "/about#why",
    desc: "More than technology — a partner you can rely on",
  },
  {
    label: "Our Values",
    href: "/about#values",
    desc: "What drives the ODYX team",
  },
  {
    label: "Our Team",
    href: "/about#team",
    desc: "The people building ODYX",
    dimmed: true,
  },
  {
    label: "News & Insights",
    href: "/about#news",
    desc: "Latest announcements and stories",
    dimmed: true,
  },
];

export const HEADER_MENUS: NavGroup[] = [
  {
    label: "About ODYX Egypt",
    href: "/about",
    items: ABOUT_NAV_ITEMS,
    columns: [
      {
        title: "Company",
        href: "/about",
        items: [
          ABOUT_NAV_ITEMS[0],
          ABOUT_NAV_ITEMS[1],
        ],
      },
      {
        title: "People & News",
        items: [
          ABOUT_NAV_ITEMS[2],
          ABOUT_NAV_ITEMS[3],
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    // navOnly: true,
    // comingSoon: true,
    items: [
      { label: "All Products", href: "/products", desc: "Full ODYX lineup", dimmed: true },
      {
        label: "Intraoral Scanner",
        href: "/products/odyx-s1",
        desc: "ODYX-S1",
      },
      {
        label: "Design Services",
        href: "/products/design-services",
        desc: "On-demand dental CAD design",
      },
      {
        label: "3D Printers",
        href: "/products/odyx-p1-26",
        desc: "ODYX P1-26",
      },
      {
        label: "ODYX Cure",
        href: "/products/curing-machines",
        desc: "Powerful curing. Perfect results.",
        img: "/img/cure-uv02/hero/machine-cutout.png",
      },
      {
        label: "Resins",
        href: "/products/resins",
        desc: "Clinical resin lines",
        img: "/img/hv2-hub/store-resins-cutout.png",
      },
    ],
    columns: [
      {
        title: "Intraoral Scanner",
        items: [
          {
            label: "ODYX-S1",
            href: "/products/odyx-s1",
            desc: "Chairside 3D impressions in seconds",
            img: "/img/scanner/s1-hero-cutout.png",
          },
        ],
      },
      {
        title: "Design Services",
        items: [
          {
            label: "Design Services",
            href: "/products/design-services",
            desc: "On-demand dental CAD design",
            img: "/img/cutouts/feat-design-cutout.png",
          },
        ],
      },
      {
        title: "3D Printing",
        groups: [
          {
            label: "Printers",
            items: [
              {
                label: "ODYX P1-26",
                href: "/products/odyx-p1-26",
                desc: "Desktop production for clinic and lab",
            img: "/img/cutouts/feat-printer-cutout.png",
          },
            ],
          },
          {
            label: "Curing",
            items: [
              {
                label: "ODYX Cure",
                href: "/products/curing-machines",
                desc: "Powerful curing. Perfect results.",
                img: "/img/cure-uv02/hero/machine-cutout.png",
              },
            ],
          },
          {
            label: "Resins",
            items: [
              {
                label: "Resin lines",
                href: "/products/resins",
                desc: "Five clinical lines, workflow-validated",
            img: "/img/hv2-hub/store-resins-cutout.png",
          },
            ],
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Flagship",
      title: "ODYX P1-26",
      desc: "The dental production workhorse — validated profiles for crowns, guides, models and more.",
      href: "/products/odyx-p1-26",
      cta: "Explore P1-26",
      img: "/img/cutouts/feat-printer-cutout.png",
      imgAlt: "ODYX P1-26 dental 3D printer",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    // comingSoon: true,
    items: [
      {
        label: "Clinical Applications",
        href: "/solutions/clinical-applications",
        desc: "Crowns, aligners, guides and more",
      },
      {
        label: "Real Cases",
        href: "/solutions/cases",
        desc: "Browse real clinical cases",
      },
      {
        label: "By Application",
        href: "/solutions/cases/applications",
        desc: "Restorative, implant, ortho, denture",
      },
      {
        label: "By Product",
        href: "/solutions/cases/products",
        desc: "Scanner, printer, cure, resin",
      },
    ],
    columns: [
      {
        title: "Applications",
        groups: [
          {
            items: [
              {
                label: "Clinical Applications",
                href: "/solutions/clinical-applications",
                desc: "Crowns, aligners, guides and more",
              },
            ],
          },
          {
            label: "Real Cases",
            items: [
              {
                label: "Case Library",
                href: "/solutions/cases",
                desc: "Browse real clinical cases",
              },
              {
                label: "By Application",
                href: "/solutions/cases/applications",
                desc: "Restorative, implant, ortho, denture",
              },
              {
                label: "By Product",
                href: "/solutions/cases/products",
                desc: "Scanner, printer, cure, resin",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Workflows",
    href: "/workflows",
    dimmed: true,
    items: [
      {
        label: "Workflow Hub",
        href: "/workflows",
        desc: "The end-to-end digital flow",
      },
      {
        label: "Scan",
        href: "/workflows/scan",
        desc: "Capture the patient in minutes",
      },
      {
        label: "Design",
        href: "/workflows/design",
        desc: "Plan the restoration",
      },
      {
        label: "Print",
        href: "/workflows/print",
        desc: "Produce with precision",
      },
      {
        label: "Cure",
        href: "/workflows/cure",
        desc: "Finalize material properties",
      },
      { label: "Finish", href: "/workflows/finish", desc: "Polish and refine" },
      {
        label: "Deliver",
        href: "/workflows/deliver",
        desc: "Seat the final result",
      },
    ],
    columns: [
      {
        title: "Workflow",
        items: [
          {
            label: "Hub overview",
            href: "/workflows",
            desc: "The end-to-end digital flow",
          },
          {
            label: "Scan",
            href: "/workflows/scan",
            desc: "Capture the patient in minutes",
          },
          {
            label: "Design",
            href: "/workflows/design",
            desc: "Plan the restoration",
          },
          {
            label: "Print",
            href: "/workflows/print",
            desc: "Produce with precision",
          },
          {
            label: "Cure",
            href: "/workflows/cure",
            desc: "Finalize material properties",
          },
          {
            label: "Finish",
            href: "/workflows/finish",
            desc: "Polish and refine",
          },
          {
            label: "Deliver",
            href: "/workflows/deliver",
            desc: "Seat the final result",
          },
        ],
      },
    ],
  },
  // Learning — hidden from navbar until ready
  {
    label: "Learning",
    href: "/learning",
    items: [
      {
        label: "Learning Center",
        href: "/learning",
        desc: "Everything to get started",
      },
      {
        label: "Beginner Path",
        href: "/learning#beginner",
        desc: "Guided onboarding track",
      },
      {
        label: "Clinical Courses",
        href: "/learning#courses",
        desc: "Deep-dive training",
      },
      {
        label: "Articles",
        href: "/learning#articles",
        desc: "Tips, guides and insights",
      },
      {
        label: "Videos & Tutorials",
        href: "/learning#videos",
        desc: "Watch and follow along",
      },
    ],
    columns: [
      {
        title: "Paths",
        href: "/learning",
        items: [
          {
            label: "Beginner Path",
            href: "/learning#beginner",
            desc: "Guided onboarding track",
          },
          {
            label: "Clinical Courses",
            href: "/learning#courses",
            desc: "Deep-dive training",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            label: "Articles",
            href: "/learning#articles",
            desc: "Tips, guides and insights",
          },
          {
            label: "Videos & Tutorials",
            href: "/learning#videos",
            desc: "Watch and follow along",
          },
        ],
      },
    ],
  },
  {
    label: "Support",
    href: "/support",
    // dimmed: true,
    items: [
      { label: "Support / Help Center", href: "/support", desc: "Get help fast" },
      {
        label: "Manuals",
        href: "/support/manuals",
        desc: "Guides and product manuals",
      },
      {
        label: "Downloads",
        href: "/support/downloads",
        desc: "Software, firmware and drivers",
      },
      {
        label: "FAQs",
        href: "/support/faqs",
        desc: "Answers to common questions",
      },
      {
        label: "Warranty",
        href: "/support/warranty",
        desc: "Coverage and claims",
      },
    ],
    columns: [
      {
        title: "Help",
        href: "/support",
        items: [
          { label: "Support / Help Center", href: "/support", desc: "Get help fast" },
          {
            label: "Manuals",
            href: "/support/manuals",
            desc: "Guides and product manuals",
          },
          {
            label: "Downloads",
            href: "/support/downloads",
            desc: "Software, firmware and drivers",
          },
        ],
      },
      {
        title: "Service",
        items: [
          {
            label: "FAQs",
            href: "/support/faqs",
            desc: "Answers to common questions",
          },
          {
            label: "Warranty",
            href: "/support/warranty",
            desc: "Coverage and claims",
          },
        ],
      },
    ],
  },
];
