/**
 * Request a Demo — copy & structure from client mock.
 * Product names match site catalog labels; no invented specs.
 */

import { WORLD_COUNTRIES } from '@/content/countries';

export const REQUEST_DEMO_META = {
  title: 'Request a Demo | ODYX',
  description:
    'See how the ODYX digital dentistry ecosystem can transform your practice or lab with a tailored demonstration from our experts.',
};

export const REQUEST_DEMO_HERO = {
  eyebrow: 'REQUEST A DEMO',
  titleBefore: 'Request Your',
  titleAccent: 'Personalized',
  titleAfter: 'Demo.',
  description:
    'See how the ODYX digital dentistry ecosystem can transform your practice or lab with a tailored demonstration from our experts.',
  valueProps: [
    {
      id: 'workflow',
      title: 'Personalized Workflow',
      body: 'See the workflow that fits your needs.',
      icon: 'tooth' as const,
    },
    {
      id: 'live',
      title: 'Live Product Demonstration',
      body: 'Experience real devices and real cases.',
      icon: 'play' as const,
    },
    {
      id: 'qa',
      title: 'Expert Q&A',
      body: 'Ask our specialists anything.',
      icon: 'chat' as const,
    },
    {
      id: 'next',
      title: 'Implementation Recommendations',
      body: 'Receive personalized next steps.',
      icon: 'clipboard' as const,
    },
  ],
} as const;

export const REQUEST_DEMO_STEPS = [
  {
    id: 'contact',
    number: 1,
    title: 'Contact Information',
    shortTitle: 'Contact',
    subtitle: 'Your basic details',
  },
  {
    id: 'practice',
    number: 2,
    title: 'Practice & Interests',
    shortTitle: 'Practice',
    subtitle: 'Tell us about your needs',
  },
  {
    id: 'schedule',
    number: 3,
    title: 'Schedule & Notes',
    shortTitle: 'Schedule',
    subtitle: 'Choose time and add notes',
  },
] as const;

export type DemoStepId = (typeof REQUEST_DEMO_STEPS)[number]['id'];

export type DemoRoleId =
  | 'dentist'
  | 'lab'
  | 'distributor'
  | 'university'
  | 'student'
  | 'other';

export const DEMO_ROLES = [
  { id: 'dentist' as const, label: 'Dentist', icon: 'tooth' as const },
  { id: 'lab' as const, label: 'Dental Lab', icon: 'flask' as const },
  { id: 'distributor' as const, label: 'Distributor', icon: 'truck' as const },
  { id: 'university' as const, label: 'University', icon: 'grad' as const },
  { id: 'student' as const, label: 'Student', icon: 'book' as const },
  { id: 'other' as const, label: 'Other', icon: 'user' as const },
];

export type DemoProductId =
  | 'scanner'
  | 'design'
  | 'printer'
  | 'cure'
  | 'resins'
  | 'workflow';

export const DEMO_PRODUCTS = [
  {
    id: 'scanner' as const,
    title: 'Scanner',
    subtitle: 'ODYX IO Scanner',
    image: '/img/scanner/s1-hero-cutout.png',
  },
  {
    id: 'design' as const,
    title: 'Design Software',
    subtitle: 'ODYX Design',
    // Same selected design software art as the home ecosystem orbit
    image: '/img/hv2-eco/eco-software.webp',
  },
  {
    id: 'printer' as const,
    title: '3D Printer',
    subtitle: 'ODYX Printer',
    image: '/img/hv2-cut/printer-product.webp',
  },
  {
    id: 'cure' as const,
    title: 'Curing Unit',
    subtitle: 'ODYX Cure',
    image: '/img/cure-uv02/hero/machine-cutout.png',
  },
  {
    id: 'resins' as const,
    title: 'Dental Resins',
    subtitle: 'ODYX Resins',
    image: '/img/hv2-cut/resins-product.webp',
  },
  {
    id: 'workflow' as const,
    title: 'Complete Workflow',
    subtitle: 'All ODYX Solutions',
    image: '/img/request-demo/complete-workflow.png',
  },
];

export type DemoApplicationId =
  | 'crown-bridge'
  | 'implant'
  | 'surgical-guide'
  | 'orthodontics'
  | 'denture'
  | 'smile-design'
  | 'general';

export const DEMO_APPLICATIONS = [
  { id: 'crown-bridge' as const, label: 'Crown & Bridge', icon: 'crown' as const },
  { id: 'implant' as const, label: 'Implant Workflow', icon: 'implant' as const },
  { id: 'surgical-guide' as const, label: 'Surgical Guide', icon: 'guide' as const },
  { id: 'orthodontics' as const, label: 'Orthodontics', icon: 'ortho' as const },
  {
    id: 'denture' as const,
    label: 'Dentures',
    icon: 'denture' as const,
  },
  { id: 'smile-design' as const, label: 'Digital Smile Design', icon: 'smile' as const },
  { id: 'general' as const, label: 'General Dentistry', icon: 'general' as const },
];

export type DemoTypeId = 'online' | 'onsite' | 'distributor';

export const DEMO_TYPES = [
  {
    id: 'online' as const,
    title: 'Online Demo',
    body: 'Live video call',
    icon: 'video' as const,
  },
  {
    id: 'onsite' as const,
    title: 'On-site Demo',
    body: 'At your location',
    icon: 'building' as const,
  },
  {
    id: 'distributor' as const,
    title: 'Distributor Demo',
    body: 'Through partner',
    icon: 'handshake' as const,
  },
];

export const DEMO_COUNTRIES = WORLD_COUNTRIES;

export const DEMO_LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'Arabic' },
  { id: 'fr', label: 'French' },
] as const;

export const DEMO_CHAIR_OPTIONS = [
  '1-3 Chairs',
  '4-6 Chairs',
  '7-10 Chairs',
  '11+ Chairs',
  'Not applicable',
] as const;

export const DEMO_SPECIALTIES = [
  'Restorative Dentistry',
  'Prosthodontics',
  'Implantology',
  'Orthodontics',
  'Oral Surgery',
  'General Dentistry',
  'Other',
] as const;

export const DEMO_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
] as const;

export const DEMO_TIMEZONES = [
  { id: 'africa/cairo', label: '(UTC+02:00) Cairo' },
  { id: 'asia/riyadh', label: '(UTC+03:00) Riyadh' },
  { id: 'asia/dubai', label: '(UTC+04:00) Dubai' },
  { id: 'europe/paris', label: '(UTC+01:00) Paris' },
  { id: 'utc', label: '(UTC+00:00) UTC' },
] as const;

export const REQUEST_DEMO_FORM = {
  sections: {
    contact: {
      title: 'Contact Information',
      subtitle: 'Please provide your contact details.',
      fields: {
        firstName: {
          label: 'First Name',
          placeholder: 'Enter first name',
          required: true,
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Enter last name',
          required: true,
        },
        email: {
          label: 'Work Email',
          placeholder: 'name@clinic.com',
          required: true,
        },
        phone: {
          label: 'Phone Number',
          placeholder: '+20 101 234 5678',
          required: true,
        },
        country: {
          label: 'Country',
          placeholder: 'Select country',
          required: true,
        },
        city: { label: 'City', placeholder: 'Enter your city', required: false },
        language: {
          label: 'Preferred Language',
          placeholder: 'Select language',
          required: false,
        },
      },
    },
    practice: {
      title: 'Practice & Interests',
      subtitle: "Tell us more about yourself and what you're looking for.",
      aboutYou: { label: 'I am a', prompt: '', required: true },
      clinicName: {
        label: 'Clinic Name',
        placeholder: 'Clear Smile Dental Clinic',
        required: true,
      },
      chairs: {
        label: 'Number of Chairs',
        placeholder: 'Select',
        required: true,
      },
      specialty: {
        label: 'Specialty',
        placeholder: 'Select specialty',
        optionalNote: 'Optional',
        required: false,
      },
      products: {
        label: "Products you're interested in",
        hint: 'Select all that apply',
        required: true,
      },
      applications: {
        label: "Applications you'd like to see",
        hint: 'Select all that apply',
        required: false,
      },
    },
    schedule: {
      title: 'Schedule & Notes',
      subtitle: 'Choose your preferred time and add any additional notes.',
      demoType: { label: 'Preferred Demo Type', required: true },
      date: { label: 'Preferred Date', required: true },
      time: { label: 'Preferred Time', placeholder: 'Select time', required: true },
      timezone: {
        label: 'Time Zone',
        placeholder: 'Select timezone',
        required: false,
      },
      notes: {
        label: 'Additional Notes',
        optionalNote: 'Optional',
        placeholder:
          "Tell us about your practice, your goals, or any specific topics you'd like us to cover during the demo...",
        required: false,
      },
      privacy: {
        labelBefore: "I agree to ODYX's",
        privacyLabel: 'Privacy Policy',
        privacyHref: '/about',
        and: 'and',
        termsLabel: 'Terms of Use',
        termsHref: '/about',
        required: true,
      },
      marketing: {
        label:
          'I would like to receive product updates and educational content from ODYX',
        required: false,
      },
      submitLabel: 'Request My Demo',
      secureNote: 'Your information is secure and will never be shared.',
    },
  },
  summary: {
    title: 'Demo Summary',
    editLabel: 'Edit',
    empty: '—',
    yourInfo: 'Your Information',
    products: 'Products of Interest',
    applications: 'Applications',
    details: 'Demo Details',
    fields: {
      name: 'Name',
      role: 'Role',
      clinic: 'Clinic',
      location: 'Location',
      language: 'Language',
      demoType: 'Demo Type',
      date: 'Date',
      time: 'Time',
      timezone: 'Time Zone',
    },
  },
  help: {
    title: 'Questions?',
    body: 'Our team is here to help.',
    email: 'sales@odyxegypt.net',
    mailto: 'mailto:sales@odyxegypt.net',
  },
  success:
    'Thanks — your demo request is in. Our team will confirm your preferred time shortly.',
} as const;

/** Trust strip from the mock (marketing claims — not product catalog specs). */
export const REQUEST_DEMO_TRUST = [
  {
    id: 'clinicians',
    value: '8,000+',
    label: 'Clinicians Worldwide',
    detail: 'Trust ODYX solutions',
    icon: 'users' as const,
  },
  {
    id: 'countries',
    value: '120+',
    label: 'Countries',
    detail: 'Global presence',
    icon: 'globe' as const,
  },
  {
    id: 'years',
    value: '15+',
    label: 'Years of Innovation',
    detail: 'In digital dentistry',
    icon: 'shield' as const,
  },
  {
    id: 'response',
    value: '24h',
    label: 'Response Time',
    detail: "We're here for you",
    icon: 'clock' as const,
  },
] as const;
