import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InnerPageMotion from '@/components/InnerPageMotion';
import ProductCaseDetail from '@/components/solutions/cases/products/ProductCaseDetail';
import {
  fallbackProductSlug,
  resolveApplicationCase,
} from '@/app/solutions/cases/applications/load-application-case';
import {
  APPLICATION_CASE_META,
  isApplicationCaseSlug,
} from '@/content/application-cases';

type Props = { params: Promise<{ applicationSlug: string; caseSlug: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { applicationSlug, caseSlug } = await params;
  const c = await resolveApplicationCase(applicationSlug, caseSlug);
  if (!c) return { title: 'Case | ODYX' };
  const app = isApplicationCaseSlug(applicationSlug)
    ? APPLICATION_CASE_META[applicationSlug].label
    : 'Application';
  return {
    title: `${c.title} | ${app} | ODYX`,
    description: c.summary || `${c.badge} clinical case from the ODYX Real Case Library.`,
  };
}

export default async function ApplicationCaseDetailPage({ params }: Props) {
  const { applicationSlug, caseSlug } = await params;
  if (!isApplicationCaseSlug(applicationSlug)) notFound();

  const caseItem = await resolveApplicationCase(applicationSlug, caseSlug);
  if (!caseItem) notFound();

  return (
    <>
      <ProductCaseDetail
        productSlug={fallbackProductSlug(caseItem)}
        caseItem={caseItem}
        applicationSlug={applicationSlug}
      />
      <InnerPageMotion />
    </>
  );
}
