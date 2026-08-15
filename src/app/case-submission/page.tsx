import { permanentRedirect } from 'next/navigation';

/** Legacy Case Submission URL → Products Design Services */
export default function Page() {
  permanentRedirect('/products/design-services');
}
