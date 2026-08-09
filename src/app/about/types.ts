export interface AboutHeroFeature {
  icon: 'shield-check' | 'users' | 'lightbulb' | 'globe';
  title: string;
  description: string;
}

export interface AboutHeroData {
  kicker: string;
  title: string;
  subtitle: string;
  /** Omitted until the CTA destination is ready */
  primaryCta?: { label: string; href: string };
  features: AboutHeroFeature[];
}

export interface WhyFeature {
  icon: 'settings' | 'user' | 'book' | 'heart';
  title: string;
  description: string;
}

export interface WhyCard {
  image: string;
  title: string;
  description: string;
}

export interface WhyOdyxData {
  kicker: string;
  title: string;
  subtitle: string;
  features: WhyFeature[];
  cards: WhyCard[];
}

export interface ValueItem {
  icon: 'shield' | 'bulb' | 'cap' | 'handshake';
  title: string;
  description: string;
}

export interface ValuesData {
  kicker: string;
  title: string;
  subtitle?: string;
  values: ValueItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface TeamData {
  kicker: string;
  title: string;
  description: string;
  /** Omitted until the CTA destination is ready */
  cta?: { label: string; href: string };
  members: TeamMember[];
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  href: string;
}

export interface NewsData {
  kicker: string;
  title: string;
  description: string;
  /** Omitted until the CTA destination is ready */
  cta?: { label: string; href: string };
  news: NewsItem[];
}

export interface StatsData {
  title: string;
  stats: { value: string; label: string }[];
  cta: { label: string; href: string };
}

export interface AboutPageData {
  hero: AboutHeroData;
  why: WhyOdyxData;
  values: ValuesData;
  team: TeamData;
  news: NewsData;
  stats: StatsData;
}
