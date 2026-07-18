import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Preserve paid-design handoff query params into the inbox compose pane. */
export default async function InboxNewRedirect({ searchParams }: Props) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  qs.set('compose', '1');
  for (const key of ['service', 'order'] as const) {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) qs.set(key, value);
  }
  redirect(`/inbox?${qs.toString()}`);
}
