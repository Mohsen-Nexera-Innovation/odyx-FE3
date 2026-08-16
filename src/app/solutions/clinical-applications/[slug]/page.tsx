import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClinicalIndicationPage from '@/components/solutions/clinical-applications/ClinicalIndicationPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import {
  CLINICAL_INDICATION_META,
  CLINICAL_INDICATION_SLUGS,
  getClinicalIndication,
} from '@/content/clinical-indications';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CLINICAL_INDICATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = CLINICAL_INDICATION_META[slug];
  if (!meta) return { title: 'Clinical Application | ODYX' };
  return { title: meta.title, description: meta.description };
}

export default async function ClinicalIndicationRoute({ params }: Props) {
  const { slug } = await params;
  const data = getClinicalIndication(slug);
  if (!data) notFound();

  return (
    <>
      <ClinicalIndicationPage data={data} />
      <InnerPageMotion />
    </>
  );
}
