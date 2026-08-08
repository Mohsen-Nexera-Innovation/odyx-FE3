export interface NavLink {
  label: string;
  href: string;
  desc?: string;
  /** Background-free cutout shown in the mega menu's featured card while this link is hovered */
  img?: string;
  /** Visible but non-navigable (preview / not ready) */
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
  /** Dim column title link (and treat as not ready) */
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
  /** Top-level visible but non-navigable; mega still opens on hover */
  dimmed?: boolean;
  /** Opens mega / mobile accordion only — never navigates to href */
  navOnly?: boolean;
}

export const HEADER_MENUS: NavGroup[] = [
  {
    label: "About ODYX",
    href: "/about",
    items: [
      {
        label: "Who We Are",
        href: "/about#who-we-are",
        desc: "Our story and what drives us",
      },
      {
        label: "Vision & Mission",
        href: "/about#vision-mission",
        desc: "Where we are headed",
      },
      {
        label: "Values & Beliefs",
        href: "/about#values",
        desc: "The principles behind ODYX",
      },
      {
        label: "Our Team",
        href: "/about#team",
        desc: "The people building ODYX",
      },
      {
        label: "News",
        href: "/about#news",
        desc: "Latest announcements and press",
      },
    ],
    columns: [
      {
        title: "Company",
        href: "/about",
        items: [
          {
            label: "Who We Are",
            href: "/about#who-we-are",
            desc: "Our story and what drives us",
          },
          {
            label: "Vision & Mission",
            href: "/about#vision-mission",
            desc: "Where we are headed",
          },
          {
            label: "Values & Beliefs",
            href: "/about#values",
            desc: "The principles behind ODYX",
          },
        ],
      },
      {
        title: "People & News",
        items: [
          {
            label: "Our Team",
            href: "/about#team",
            desc: "The people building ODYX",
          },
          {
            label: "News",
            href: "/about#news",
            desc: "Latest announcements and press",
          },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    navOnly: true,
    items: [
      { label: "All Products", href: "/products", desc: "Full ODYX lineup", dimmed: true },
      {
        label: "Intraoral Scanner",
        href: "/products/odyx-s1-intraoral-scanner",
        desc: "ODYX-S1",
      },
      {
        label: "Design Services",
        href: "/case-submission",
        desc: "On-demand dental CAD design",
      },
      {
        label: "3D Printers",
        href: "/products/3d-printers",
        desc: "ODYX P1-26",
      },
      {
        label: "ODYX Cure",
        href: "/products/curing-machines",
        desc: "Powerful curing. Perfect results.",
        img: "/img/cutouts/feat-curing-cutout.png",
      },
      {
        label: "Resins",
        href: "/products/resins",
        desc: "Clinical resin lines",
      },
    ],
    columns: [
      {
        title: "Intraoral Scanner",
        href: "/products/odyx-s1-intraoral-scanner",
        items: [
          {
            label: "ODYX-S1",
            href: "/products/odyx-s1-intraoral-scanner",
            desc: "Chairside 3D impressions in seconds",
            img: "/img/cutouts/feat-scanner-cutout.png",
          },
        ],
      },
      {
        title: "3D Printing",
        href: "/products/3d-printers",
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
                img: "/img/cutouts/feat-curing-cutout.png",
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
            img: "/img/resins/all-resins-cutout.png",
          },
            ],
          },
        ],
      },
      {
        title: "Design Services",
        href: "/case-submission",
        items: [
          {
            label: "Design Services",
            href: "/case-submission",
            desc: "On-demand dental CAD design",
            img: "/img/cutouts/feat-design-cutout.png",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Flagship",
      title: "ODYX P1-26",
      desc: "The dental production workhorse — validated profiles for crowns, guides, models and more.",
      href: "/products/3d-printers",
      cta: "Explore P1-26",
      img: "/img/cutouts/feat-printer-cutout.png",
      imgAlt: "ODYX P1-26 dental 3D printer",
    },
  },
  {
    label: "Solutions",
    href: "/solutions/clinical-applications",
    items: [
      {
        label: "For Dentists",
        href: "/solutions/dentists",
        desc: "Same-day chairside dentistry",
        dimmed: true,
      },
      {
        label: "For Dental Labs",
        href: "/solutions/labs",
        desc: "Scale production with confidence",
        dimmed: true,
      },
      {
        label: "Clinical Applications",
        href: "/solutions/clinical-applications",
        desc: "Crowns, aligners, guides and more",
      },
    ],
    columns: [
      {
        title: "By Role",
        items: [
          {
            label: "For Dentists",
            href: "/solutions/dentists",
            desc: "Same-day chairside dentistry",
            dimmed: true,
          },
          {
            label: "For Dental Labs",
            href: "/solutions/labs",
            desc: "Scale production with confidence",
            dimmed: true,
          },
        ],
      },
      {
        title: "Applications",
        items: [
          {
            label: "Clinical Applications",
            href: "/solutions/clinical-applications",
            desc: "Crowns, aligners, guides and more",
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
  {
    label: "Real Cases",
    href: "/cases",
    items: [
      {
        label: "Case Library",
        href: "/cases",
        desc: "Browse real clinical cases",
      },
      {
        label: "By Application",
        href: "/cases#by-application",
        desc: "Restorative, implant, ortho, denture",
      },
      {
        label: "By Product",
        href: "/cases#by-product",
        desc: "Scanner, printer, cure, resin",
      },
    ],
    columns: [
      {
        title: "Library",
        href: "/cases",
        items: [
          {
            label: "Case Library",
            href: "/cases",
            desc: "Browse real clinical cases",
          },
          {
            label: "By Application",
            href: "/cases#by-application",
            desc: "Restorative, implant, ortho, denture",
          },
          {
            label: "By Product",
            href: "/cases#by-product",
            desc: "Scanner, printer, cure, resin",
          },
        ],
      },
    ],
  },
  {
    label: "Learning",
    href: "/learning",
    dimmed: true,
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
      {
        label: "ROI Calculator",
        href: "/roi",
        desc: "Full ecosystem — scanner, printer & cure",
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
          {
            label: "ROI Calculator",
            href: "/roi",
            desc: "Full ecosystem — scanner, printer & cure",
          },
        ],
      },
    ],
  },
  {
    label: "Support",
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
