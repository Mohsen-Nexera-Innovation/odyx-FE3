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
