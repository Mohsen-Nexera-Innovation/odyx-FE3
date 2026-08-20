/**
 * Learning Center — academy hub content.
 * Screen copy follows the Learning Center mock; no product catalog specs invented here.
 */

export const LEARNING_META = {
  title: 'Learning Center | ODYX',
  description:
    'Learn digital dentistry from beginner to expert — clinical courses, workflow tutorials, articles, and guides for dentists and labs.',
};

export type LearningCta = {
  label: string;
  href: string;
};

export type LearningRoleId = 'dentist' | 'lab' | 'beginner' | 'customer';

export type LearningPathId = 'beginner' | 'workflows' | 'applications' | 'advanced';

export type LearningPathStep = {
  id: LearningPathId;
  title: string;
  description: string;
  meta: string;
  href: string;
};

export type LearningHeroData = {
  kicker: string;
  titleLead: string;
  titleRest: string;
  body: string;
  roles: { id: LearningRoleId; label: string }[];
  actions: (LearningCta & { variant: 'primary' | 'outline' })[];
  paths: {
    kicker: string;
    viewAll: LearningCta;
    steps: LearningPathStep[];
  };
};

export type FeaturedProgress = {
  title: string;
  meta: string;
  percent: number;
};

export type FeaturedCourseData = {
  kicker: string;
  badge: string;
  viewAll: LearningCta;
  title: string;
  body: string;
  img: string;
  imgAlt: string;
  date: string;
  time: string;
  instructor: { name: string; role: string; img: string };
  progress: FeaturedProgress[];
  register: LearningCta;
};

export type SearchSectionData = {
  placeholder: string;
  popularLabel: string;
  tags: { label: string; href: string }[];
};

export type JourneySectionData = {
  kicker: string;
  titleLead: string;
  titleRest: string;
  steps: (LearningPathStep & { number: number; certificate: string })[];
};

export type BeginnerLesson = {
  id: string;
  title: string;
  body: string;
  duration: string;
  level: string;
  href: string;
  img: string;
  imgAlt: string;
  accent: string;
};

export type BeginnerPathData = {
  id: string;
  kicker: string;
  title: string;
  viewAll: LearningCta;
  lessons: BeginnerLesson[];
};

export type ClinicalCourse = {
  id: string;
  title: string;
  lessons: string;
  duration: string;
  level: string;
  percent: number;
  href: string;
  img: string;
  imgAlt: string;
  certificate: string;
};

export type ClinicalCoursesData = {
  id: string;
  kicker: string;
  title: string;
  viewAll: LearningCta;
  courses: ClinicalCourse[];
  gate: {
    message: string;
    signIn: LearningCta;
    register: LearningCta;
  };
};

export type ResourceVideo = {
  id: string;
  title: string;
  duration: string;
  href: string;
  img: string;
  imgAlt: string;
  category: string;
};

export type ResourceArticle = {
  id: string;
  title: string;
  readTime: string;
  href: string;
  img: string;
  imgAlt: string;
  category: string;
};

export type ResourceGuide = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  accent: string;
};

export type ResourcesSectionData = {
  id: string;
  videos: {
    kicker: string;
    title: string;
    viewAll: LearningCta;
    filters: string[];
    items: ResourceVideo[];
  };
  articles: {
    kicker: string;
    title: string;
    viewAll: LearningCta;
    filters: string[];
    items: ResourceArticle[];
  };
  guides: {
    kicker: string;
    title: string;
    viewAll: LearningCta;
    items: ResourceGuide[];
  };
};

export type ImpactStat = {
  value: string;
  label: string;
  detail: string;
  icon: 'book' | 'video' | 'guide' | 'cap' | 'users';
};

export type ImpactSectionData = {
  continue: {
    kicker: string;
    heading: string;
    title: string;
    meta: string;
    percent: number;
    href: string;
    ctaLabel: string;
    img: string;
    imgAlt: string;
  };
  impact: {
    kicker: string;
    title: string;
    stats: ImpactStat[];
    cta: LearningCta;
  };
};

export type LearningCtaBannerData = {
  title: string;
  body: string;
  cta: LearningCta;
  img: string;
  imgAlt: string;
};

export type LearningPageData = {
  hero: LearningHeroData;
  featured: FeaturedCourseData;
  search: SearchSectionData;
  journey: JourneySectionData;
  beginner: BeginnerPathData;
  clinical: ClinicalCoursesData;
  resources: ResourcesSectionData;
  impact: ImpactSectionData;
  cta: LearningCtaBannerData;
};

/**
 * Image preference for Learning:
 * 1) Webview-ready assets under /img/hv2-* (webp) when a matching role exists
 * 2) High-quality product/clinical renders under /images/ otherwise
 */
const WEB = {
  scanner: '/img/scanner/s1-hero.png',
  printer: '/img/hv2-cut/printer-product.webp',
  curing: '/img/cure-uv02/hero/machine-cutout.png',
  resins: '/img/hv2-cut/resins-product.webp',
  crown: '/img/hv2-clinical/restorative.webp',
  implant: '/img/hv2-clinical/implant-dentistry.webp',
  ortho: '/img/clinical/aligners/hero-cutout.png',
  denture: '/img/hv2-clinical/prosthetics.webp',
  learning: '/img/hv2-hub/learning-laptop.webp',
  newsWorkflow: '/img/hv2-news/workflow.webp',
  newsResin: '/img/hv2-news/resin-line.webp',
  newsScan: '/img/hv2-news/scan-live.webp',
  ecoScanner: '/img/hv2-eco/eco-scanner.webp',
  ecoPrinter: '/img/hv2-eco/eco-printer.webp',
  ecoCure: '/img/cure-uv02/hero/machine-cutout.png',
  ecoResin: '/img/hv2-eco/eco-resin.webp',
} as const;

const LEARNING_PATH_STEPS: LearningPathStep[] = [
  {
    id: 'beginner',
    title: 'Beginner Path',
    description: 'Build your foundation',
    meta: '8 Lessons • 2–4 Hours',
    href: '#beginner',
  },
  {
    id: 'workflows',
    title: 'Workflows',
    description: 'Master core workflows',
    meta: '12+ Lessons • 4–6 Hours',
    href: '#courses',
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'Explore clinical applications',
    meta: '15+ Lessons • 8–16 Hours',
    href: '#courses',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Become an expert',
    meta: '20+ Lessons • 16+ Hours',
    href: '#courses',
  },
];

export const learningData: LearningPageData = {
  hero: {
    kicker: 'LEARNING CENTER',
    titleLead: 'Learn Digital Dentistry.',
    titleRest: 'From Beginner to Expert.',
    body: 'Clinical education, workflow tutorials, articles and structured learning designed to help every dentist and lab succeed with ODYX.',
    roles: [
      { id: 'dentist', label: 'Dentist' },
      { id: 'lab', label: 'Dental Lab' },
      { id: 'beginner', label: 'Beginner' },
      { id: 'customer', label: 'Existing Customer' },
    ],
    actions: [
      { label: 'Browse Learning', href: '#beginner', variant: 'primary' },
      { label: 'Explore Courses', href: '#courses', variant: 'outline' },
    ],
    paths: {
      kicker: 'Learning Paths',
      viewAll: { label: 'View All', href: '#journey' },
      steps: LEARNING_PATH_STEPS,
    },
  },
  featured: {
    kicker: 'Featured Course',
    badge: 'POPULAR',
    viewAll: { label: 'View All', href: '#courses' },
    title: 'Full Digital Workflow: From Scan to Smile.',
    body: 'Complete end-to-end training covering scan, design, print, and delivery for predictable aesthetic outcomes.',
    img: WEB.crown,
    imgAlt: 'Dental crown models for digital workflow training',
    date: 'July 16, 2025',
    time: '2:00 PM (UTC+2)',
    instructor: {
      name: 'Dr. James Park',
      role: 'Digital Dentistry Expert',
      img: '/img/news-lead.jpg',
    },
    progress: [
      { title: 'Implant Guide', meta: '9 Lessons • 60 Min', percent: 45 },
      { title: 'Orthodontic Models', meta: '7 Lessons • 40 Min', percent: 38 },
    ],
    register: { label: 'Register Now', href: '/register' },
  },
  search: {
    placeholder: 'Search for courses, videos, articles, guides...',
    popularLabel: 'Popular Searches:',
    tags: [
      { label: 'Scanner Setup', href: '#videos' },
      { label: '3D Printing', href: '#videos' },
      { label: 'Resins', href: '#articles' },
      { label: 'Crown Workflow', href: '#courses' },
    ],
  },
  journey: {
    kicker: 'YOUR LEARNING JOURNEY',
    titleLead: 'Choose your path.',
    titleRest: 'Learn at your pace.',
    steps: LEARNING_PATH_STEPS.map((step, i) => ({
      ...step,
      number: i + 1,
      certificate: 'Certificate',
    })),
  },
  beginner: {
    id: 'beginner',
    kicker: 'BEGINNER PATH',
    title: 'Start with the basics.',
    viewAll: { label: 'View All', href: '#beginner' },
    lessons: [
      {
        id: 'scanner',
        title: 'What is an Intraoral Scanner?',
        body: 'Understand how intraoral scanners capture accurate digital impressions.',
        duration: '5 min',
        level: 'Beginner',
        href: '/products/odyx-s1',
        img: WEB.scanner,
        imgAlt: 'ODYX intraoral scanner',
        accent: '#E8F1FF',
      },
      {
        id: 'printer',
        title: 'What is Dental 3D Printing?',
        body: 'Learn the basics of 3D printing in digital dentistry.',
        duration: '6 min',
        level: 'Beginner',
        href: '/products/odyx-p1-26',
        img: WEB.printer,
        imgAlt: 'ODYX dental 3D printer',
        accent: '#FFE8E4',
      },
      {
        id: 'curing',
        title: 'What is Curing?',
        body: "Discover the curing process and why it's critical.",
        duration: '4 min',
        level: 'Beginner',
        href: '/products/curing-machines',
        img: WEB.curing,
        imgAlt: 'ODYX curing unit',
        accent: '#FFF0E4',
      },
      {
        id: 'resins',
        title: 'What are Dental Resins?',
        body: 'Explore types of resins and how to choose the right one.',
        duration: '5 min',
        level: 'Beginner',
        href: '/products/resins',
        img: WEB.resins,
        imgAlt: 'ODYX dental resin bottles',
        accent: '#F0E8FF',
      },
    ],
  },
  clinical: {
    id: 'courses',
    kicker: 'CLINICAL COURSES',
    title: 'Structured courses by application.',
    viewAll: { label: 'View All Courses', href: '#courses' },
    courses: [
      {
        id: 'crown',
        title: 'Crown Workflow',
        lessons: '8 Lessons',
        duration: '45 Min',
        level: 'Intermediate',
        percent: 65,
        href: '/solutions/clinical-applications',
        img: WEB.crown,
        imgAlt: 'Restorative crown workflow',
        certificate: 'Certificate',
      },
      {
        id: 'implant',
        title: 'Implant Guide',
        lessons: '9 Lessons',
        duration: '60 Min',
        level: 'Advanced',
        percent: 45,
        href: '/solutions/clinical-applications',
        img: WEB.implant,
        imgAlt: 'Implant dentistry workflow',
        certificate: 'Certificate',
      },
      {
        id: 'ortho',
        title: 'Orthodontic Models',
        lessons: '7 Lessons',
        duration: '40 Min',
        level: 'Intermediate',
        percent: 30,
        href: '/solutions/clinical-applications',
        img: WEB.ortho,
        imgAlt: 'Clear aligner orthodontic models',
        certificate: 'Certificate',
      },
      {
        id: 'denture',
        title: 'Denture Workflow',
        lessons: '8 Lessons',
        duration: '50 Min',
        level: 'Intermediate',
        percent: 55,
        href: '/solutions/clinical-applications',
        img: WEB.denture,
        imgAlt: 'Prosthetic denture workflow',
        certificate: 'Certificate',
      },
    ],
    gate: {
      message: 'Clinical courses are available for registered users only. Create an account to unlock.',
      signIn: { label: 'Sign In', href: '/login' },
      register: { label: 'Register Now', href: '/register' },
    },
  },
  resources: {
    id: 'resources',
    videos: {
      kicker: 'VIDEOS & TUTORIALS',
      title: 'Watch, learn, and apply.',
      viewAll: { label: 'View All', href: '#videos' },
      filters: ['All', 'Setup', 'Maintenance', 'Workflow', 'Troubleshooting'],
      items: [
        {
          id: 'v1',
          title: 'Scanner Setup',
          duration: '5:12',
          href: '#videos',
          img: WEB.ecoScanner,
          imgAlt: 'Intraoral scanner setup tutorial',
          category: 'Setup',
        },
        {
          id: 'v2',
          title: 'Printer Calibration',
          duration: '3:00',
          href: '#videos',
          img: WEB.ecoPrinter,
          imgAlt: '3D printer calibration tutorial',
          category: 'Maintenance',
        },
        {
          id: 'v3',
          title: 'Resin Preparation',
          duration: '2:44',
          href: '#videos',
          img: WEB.ecoResin,
          imgAlt: 'Resin preparation tutorial',
          category: 'Workflow',
        },
        {
          id: 'v4',
          title: 'Post Curing',
          duration: '4:02',
          href: '#videos',
          img: WEB.ecoCure,
          imgAlt: 'Post curing tutorial',
          category: 'Troubleshooting',
        },
      ],
    },
    articles: {
      kicker: 'ARTICLES',
      title: 'Insights and clinical tips.',
      viewAll: { label: 'View All', href: '#articles' },
      filters: ['All', 'Clinical', 'Lab', 'Business', 'Technology'],
      items: [
        {
          id: 'a1',
          title: '5 Tips for Successful Digital Impressions',
          readTime: 'Clinical • 5 min read',
          href: '/solutions',
          img: WEB.newsScan,
          imgAlt: 'Digital impressions article',
          category: 'Clinical',
        },
        {
          id: 'a2',
          title: 'How to Improve Margin Accuracy in Crowns',
          readTime: 'Clinical • 8 min read',
          href: '/solutions/clinical-applications',
          img: WEB.newsWorkflow,
          imgAlt: 'Crown margin accuracy article',
          category: 'Clinical',
        },
        {
          id: 'a3',
          title: 'Choosing the Right Resin for Your Case',
          readTime: 'Lab • 4 min read',
          href: '/products/resins',
          img: WEB.newsResin,
          imgAlt: 'Dental resin selection article',
          category: 'Lab',
        },
      ],
    },
    guides: {
      kicker: 'GUIDES & E-BOOKS',
      title: 'Download and learn offline.',
      viewAll: { label: 'View All', href: '#resources' },
      items: [
        {
          id: 'g1',
          title: 'Beginner Guide',
          subtitle: 'Getting Started with Digital Dentistry',
          href: '#',
          accent: '#0050D8',
        },
        {
          id: 'g2',
          title: 'Workflow Guide',
          subtitle: 'Complete Digital Workflow',
          href: '#',
          accent: '#0D9488',
        },
        {
          id: 'g3',
          title: 'Resin Selection Guide',
          subtitle: 'Choose the Right Resin',
          href: '#',
          accent: '#7C3AED',
        },
        {
          id: 'g4',
          title: 'Daily Checklist',
          subtitle: 'Lab & Clinical Checklist',
          href: '#',
          accent: '#EA580C',
        },
      ],
    },
  },
  impact: {
    continue: {
      kicker: 'CONTINUE LEARNING',
      heading: 'Pick up where you left off.',
      title: 'Crown Workflow',
      meta: 'Lesson 3 of 8 • 32 min left',
      percent: 65,
      href: '#courses',
      ctaLabel: 'Continue Course',
      img: WEB.crown,
      imgAlt: 'Crown workflow course thumbnail',
    },
    impact: {
      kicker: 'LEARNING IMPACT',
      title: 'Trusted by thousands of clinicians and labs worldwide.',
      stats: [
        { value: '120+', label: 'Lessons', detail: 'Across all topics', icon: 'book' },
        { value: '40+', label: 'Clinical Videos', detail: 'Step-by-step tutorials', icon: 'video' },
        { value: '15+', label: 'Guides & E-books', detail: 'Downloadable resources', icon: 'guide' },
        { value: '12', label: 'Clinical Courses', detail: 'With certificates', icon: 'cap' },
        { value: '8,000+', label: 'Students', detail: 'Worldwide', icon: 'users' },
      ],
      cta: { label: 'Join Community', href: '/register' },
    },
  },
  cta: {
    title: 'Every Great Digital Workflow Starts with Better Learning.',
    body: 'Continue your journey and elevate your clinical practice.',
    cta: { label: 'Start Learning', href: '#beginner' },
    img: '',
    imgAlt: '',
  },
};
