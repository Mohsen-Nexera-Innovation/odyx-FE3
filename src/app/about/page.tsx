import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';
import { ABOUT_META } from '@/content/about';

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
};

export default function Page() {
  return <AboutPage />;
}
