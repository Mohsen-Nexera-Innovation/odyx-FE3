// design-sync shim for `next/script`. Third-party script loading is a hosting
// concern with no meaning inside a design surface — render nothing.
export default function Script(_props: Record<string, unknown>) {
  return null;
}
