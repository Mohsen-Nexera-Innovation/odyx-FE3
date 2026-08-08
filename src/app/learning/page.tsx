import type { Metadata } from 'next';
import LearningPage from './components/LearningPage';
import { LEARNING_META } from '@/content/learning';

export const metadata: Metadata = {
  title: LEARNING_META.title,
  description: LEARNING_META.description,
};

export default function Page() {
  return <LearningPage />;
}
