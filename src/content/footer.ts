export interface FooterLink {
  label: string;
  href: string;
  dimmed?: boolean;
}

export interface FooterColumn {
  title: string;
  dimmed?: boolean;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  /** Instagram carries no path — it is stroked in SocialGlyph. */
  path?: string;
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About ODYX Egypt", href: "/about" },
      { label: "Why ODYX", href: "/about#why" },
      { label: "Our Values", href: "/about#values" },
      { label: "Our Team", href: "/about#team" },
      { label: "News & Insights", href: "/news" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Intraoral Scanners", href: "/products/odyx-s1" },
      { label: "Design Services", href: "/products/design-services" },
      { label: "3D Printers", href: "/products/odyx-p1-26" },
      { label: "UV Curing Units", href: "/products/curing-machines" },
      { label: "Premium Resins", href: "/products/resins" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Clinical Applications", href: "/solutions/clinical-applications" },
      { label: "Clinical Cases", href: "/solutions/cases" },
      { label: "By Application", href: "/solutions/cases/applications" },
      { label: "By Product", href: "/solutions/cases/products" },
    ],
  },
  {
    title: "Workflows",
    links: [
      { label: "Restorative", href: "/solutions/clinical-applications#restorative" },
      { label: "Implant", href: "/solutions/clinical-applications#implant" },
      { label: "Orthodontics", href: "/solutions/clinical-applications#orthodontics" },
      { label: "Prosthetics", href: "/solutions/clinical-applications#prosthetics" },
      { label: "All Workflows", href: "/workflows", dimmed: true },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Clinical Courses", href: "/learning" },
      { label: "Webinars", href: "/learning#videos" },
      { label: "Guides", href: "/learning#articles" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Manuals", href: "/support/manuals" },
      { label: "Downloads", href: "/support/downloads" },
      { label: "FAQs", href: "/support/faqs" },
      { label: "Warranty", href: "/support/warranty" },
    ],
  },
];

export const FOOTER_SOCIAL: FooterSocial[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/odyxeg",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
  { label: "Instagram", href: "https://www.instagram.com/odyxeg/" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@odyxeg",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@odyxeg",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.28 0 .54.04.79.1v3.5a6.4 6.4 0 0 0-.79-.05 6.34 6.34 0 1 0 6.34 6.34V8.73a8.2 8.2 0 0 0 4.76 1.52V6.8c-.34 0-.67-.04-1-.11z",
  },
];

export const FOOTER_TAGLINE =
  "A complete digital dentistry ecosystem, designed to work in perfect harmony.";

export const FOOTER_NEWSLETTER_TITLE = "Newsletter";
export const FOOTER_NEWSLETTER_TAGLINE = "Stay updated with the latest from ODYX.";
export const FOOTER_NEWSLETTER_EMAIL_LABEL = "Email address";
export const FOOTER_NEWSLETTER_PLACEHOLDER = "Enter your email";
export const FOOTER_NEWSLETTER_SUBSCRIBE_LABEL = "Subscribe";
export const FOOTER_COPYRIGHT = "© 2026 ODYX. All rights reserved.";
