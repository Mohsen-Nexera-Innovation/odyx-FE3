export type CasesCta = {
  label: string;
  href: string;
};

export type CasesHeroAction = CasesCta & {
  variant: 'primary' | 'outline';
  /** Leading icon id — resolved in CasesIcons (About-page icon-map pattern) */
  icon: HeroActionIconId;
};

export type HeroActionIconId = 'layout-grid' | 'box' | 'cloud-upload';

export type CasesHeroData = {
  kicker: string;
  titleLead: string;
  titleRest: string;
  body: string;
  searchPlaceholder: string;
  before: { img: string; alt: string };
  after: { img: string; alt: string };
  actions: CasesHeroAction[];
};

export type ApplicationIconId = 'restorative' | 'implant' | 'orthodontic' | 'denture';

export type BrowseCard = {
  id: string;
  title: string;
  countLabel: string;
  href: string;
  img: string;
  imgAlt: string;
  icon?: ApplicationIconId;
};

export type BrowseSectionData = {
  id: string;
  kicker: string;
  title: string;
  viewAll: CasesCta;
  items: BrowseCard[];
  productStyle?: boolean;
};

export type FeaturedProductIcon = {
  id: string;
  img: string;
  alt: string;
};

export type FeaturedCase = {
  id: string;
  badge: string;
  title: string;
  tags: string[];
  href: string;
  img: string;
  imgAlt: string;
  /** Optional before/after pair for the mock split preview */
  before?: { img: string; alt: string };
  after?: { img: string; alt: string };
  /** All product keys used by this case (for CASE BY PRODUCT filtering) */
  productKeys?: string[];
  products: FeaturedProductIcon[];
  moreProducts: number;
};

export type FeaturedSectionData = {
  kicker: string;
  title: string;
  viewAll: CasesCta;
  items: FeaturedCase[];
};

export type ShareSectionData = {
  title: string;
  body: string;
  clipboard: { img: string; alt: string };
  registered: { label: string; cta: CasesCta };
  newUser: { label: string; cta: CasesCta };
};

export type CasesPageData = {
  hero: CasesHeroData;
  applications: BrowseSectionData;
  products: BrowseSectionData;
  featured: FeaturedSectionData;
  share: ShareSectionData;
};
