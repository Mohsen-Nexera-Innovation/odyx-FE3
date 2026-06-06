import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WorkflowStepPage from '@/components/pages/WorkflowStepPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { WORKFLOW_STEPS } from '@/content/workflow';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORKFLOW_STEPS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const step = WORKFLOW_STEPS.find((s) => s.id === slug);
  if (!step) return { title: 'Workflow | ODYX' };
  return {
    title: `${step.label} | ODYX Workflow`,
    description: step.lead,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!WORKFLOW_STEPS.some((s) => s.id === slug)) notFound();
  return (
    <>
      <WorkflowStepPage slug={slug} />
      <InnerPageMotion />
    </>
  );
}
