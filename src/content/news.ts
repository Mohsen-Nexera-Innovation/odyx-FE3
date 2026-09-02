import { aboutData } from '@/content/about';

export const NEWS_META = {
  title: 'News & Insights | ODYX',
  description:
    'The latest news, product launches, research, and insights from ODYX.',
};

export type NewsArticle = {
  date: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  href: string;
};

const EXTRA_NEWS: NewsArticle[] = [
  {
    date: 'August 10, 2026',
    title: 'ODYX at AEEDC 2026',
    description: 'Thank you for visiting our booth.',
    image: '/img/hv2-news/aeedc-event.webp',
    category: 'Event',
    href: '/about',
  },
  {
    date: 'August 5, 2026',
    title: 'New Resin Line',
    description: 'High performance resins now available.',
    image: '/img/hv2-hub/store-resins-cutout.png',
    category: 'Product',
    href: '/products/resins',
  },
  {
    date: 'August 20, 2026',
    title: 'Webinar: Integration',
    description: 'Tips for a seamless digital workflow.',
    image: '/img/hv2-news/webinar.webp',
    category: 'Webinar',
    href: '/learning',
  },
  {
    date: 'August 15, 2026',
    title: 'New Partner Announcement',
    description: 'Excited to welcome new partners to the ODYX family.',
    image: '/img/hv2-news/partners.webp',
    category: 'News',
    href: '/about',
  },
];

const ABOUT_HREFS: Record<string, string> = {
  'ODYX Launches Next-Gen Intraoral Scanner': '/products/odyx-s1',
  'ODYX at IDS 2025: Thank You!': '/about',
  'AI-Powered Design: The Future is Now': '/products/design-services',
};

export const NEWS_PAGE = {
  kicker: 'NEWS & INSIGHTS',
  title: 'Stay Inspired. Stay Ahead.',
  description: 'The latest news, product launches, research, and insights from ODYX.',
};

export const NEWS_ARTICLES: NewsArticle[] = [
  ...aboutData.news.news.map((item) => ({
    ...item,
    href: item.href && item.href !== '#' ? item.href : (ABOUT_HREFS[item.title] ?? '/about'),
  })),
  ...EXTRA_NEWS,
];
