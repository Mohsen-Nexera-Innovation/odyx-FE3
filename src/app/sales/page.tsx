import type { Metadata } from 'next';
import { CONTACT_SALES_META } from '@/content/contact-sales';
import ContactSalesPage from './components/ContactSalesPage';
import './contact-sales.css';

export const metadata: Metadata = {
  title: CONTACT_SALES_META.title,
  description: CONTACT_SALES_META.description,
};

export default function Page() {
  return <ContactSalesPage />;
}
