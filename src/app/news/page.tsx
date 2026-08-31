import type { Metadata } from 'next';
import NewsPage from '@/components/news/NewsPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { NEWS_META } from '@/content/news';

export const metadata: Metadata = {
  title: NEWS_META.title,
  description: NEWS_META.description,
};

export default function Page() {
  return (
    <>
      <NewsPage />
      <InnerPageMotion />
    </>
  );
}
