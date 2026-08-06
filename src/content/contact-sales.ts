/**
 * Contact Sales — copy & structure from client mock.
 * Contact details taken from the mock; no product specs invented.
 */

export const CONTACT_SALES_META = {
  title: 'Contact Sales | ODYX',
  description:
    'Talk to the ODYX sales team for pricing, product recommendations, bundle offers, and financing options.',
};

export const CONTACT_SALES_HERO = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Sales', href: '/sales' },
  ],
  title: 'Contact Sales',
  subtitle: 'Talk to our sales team',
  description:
    'Get pricing, product recommendations, bundle offers and\nfinancing options tailored to your needs.',
  image: {
    src: '/images/contact-sales/_preview-hero.png',
    alt: 'ODYX ecosystem products — intraoral scanner, 3D printer, cure unit, and resin',
    width: 1696,
    height: 1083,
  },
} as const;

export type ContactChannelId = 'whatsapp' | 'call' | 'email';

export interface ContactChannel {
  id: ContactChannelId;
  title: string;
  description: string;
  cta: { label: string; href: string };
  emailDisplay?: string;
}

export const CONTACT_SALES_DIRECT = {
  title: 'Contact us directly',
  channels: [
    {
      id: 'whatsapp' as const,
      title: 'WhatsApp Sales',
      description: 'Chat instantly with our sales team\non WhatsApp.',
      cta: {
        label: 'Start Chat',
        href: 'https://wa.me/201001234567',
      },
    },
    {
      id: 'call' as const,
      title: 'Call Sales',
      description: 'Speak directly with one of\nour sales representatives.',
      cta: {
        label: 'Call Now',
        href: 'tel:+201001234567',
      },
    },
    {
      id: 'email' as const,
      title: 'Email Sales',
      description: 'Send us an email and our team\nwill get back to you.',
      cta: {
        label: 'Send Email',
        href: 'mailto:sales@odyxegypt.net',
      },
      emailDisplay: 'sales@odyxegypt.net',
    },
  ] satisfies ContactChannel[],
};

export type ProductInterestId =
  | 'scanner'
  | 'printer'
  | 'cure'
  | 'resin'
  | 'ecosystem';

export interface ProductInterestOption {
  id: ProductInterestId;
  label: string;
}

export const CONTACT_SALES_QUOTE = {
  title: 'Request a Quote',
  description:
    'Fill out the form and our team will contact you with a customized quotation.',
  submitLabel: 'Request a Quote',
  fields: {
    fullName: {
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    clinicName: {
      label: 'Clinic / Lab Name',
      placeholder: 'Enter your clinic or lab name',
      required: true,
    },
    phone: {
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      required: true,
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email address',
      required: true,
    },
    city: {
      label: 'City',
      placeholder: 'Select your city',
      required: true,
    },
    product: {
      label: 'Interested Product',
      required: true,
    },
    message: {
      label: 'Message (Optional)',
      placeholder: 'Tell us more about your needs...',
      required: false,
    },
  },
  products: [
    { id: 'scanner', label: 'Scanner' },
    { id: 'printer', label: '3D Printer' },
    { id: 'cure', label: 'Cure Unit' },
    { id: 'resin', label: 'Resin Materials' },
    { id: 'ecosystem', label: 'Complete Ecosystem' },
  ] satisfies ProductInterestOption[],
  cities: [
    'Cairo',
    'Giza',
    'Alexandria',
    'Mansoura',
    'Tanta',
    'Asyut',
    'Other',
  ] as const,
};

export interface SalesBenefit {
  id: string;
  title: string;
  description: string;
  icon: 'quote' | 'recommend' | 'bundle' | 'finance';
}

export const CONTACT_SALES_BENEFITS = {
  title: 'Why contact sales?',
  items: [
    {
      id: 'quote',
      title: 'Personalized quotation',
      description: 'Get a price that fits your\nrequirements.',
      icon: 'quote',
    },
    {
      id: 'recommend',
      title: 'Product recommendation',
      description: 'We help you choose the right\nsolution.',
      icon: 'recommend',
    },
    {
      id: 'bundle',
      title: 'Bundle pricing',
      description: 'Special discounts on complete\necosystem packages.',
      icon: 'bundle',
    },
    {
      id: 'finance',
      title: 'Financing options',
      description: 'Flexible payment plans\nto fit your budget.',
      icon: 'finance',
    },
  ] satisfies SalesBenefit[],
};

export const CONTACT_SALES_BAR = {
  support: {
    title: 'Need help?',
    description: 'Our team is ready to assist you\nMonday – Thursday, 9AM – 5PM',
    cta: { label: 'Contact Support', href: '/support' },
  },
  whatsapp: {
    title: 'WhatsApp Sales',
    phoneDisplay: '+20 100 123 4567',
    href: 'https://wa.me/201001234567',
    note: 'Quick response on WhatsApp',
  },
  email: {
    title: 'Email Sales',
    emailDisplay: 'sales@odyxegypt.net',
    href: 'mailto:sales@odyxegypt.net',
    note: 'We usually reply within 24 hours',
  },
} as const;
