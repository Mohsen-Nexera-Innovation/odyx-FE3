import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Design cases start from the catalog; support opens compose. */
export default async function InboxNewRedirect({ searchParams }: Props) {
  const params = await searchParams;
  const service = params.service;
  const order = params.order;
  const hasDesignHandoff =
    (typeof service === 'string' && service) ||
    (typeof order === 'string' && order) ||
    (Array.isArray(service) && service[0]) ||
    (Array.isArray(order) && order[0]);

  if (hasDesignHandoff) {
    redirect('/design-services');
  }
  redirect('/inbox?compose=1');
}
