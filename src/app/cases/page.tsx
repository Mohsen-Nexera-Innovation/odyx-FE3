import { permanentRedirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

/** Legacy library URL — canonical is `/solutions/cases`. */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  const suffix = qs.toString();
  permanentRedirect(suffix ? `/solutions/cases?${suffix}` : '/solutions/cases');
}
