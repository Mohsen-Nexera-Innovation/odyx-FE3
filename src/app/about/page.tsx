import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero, { Arrow, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'About ODYX',
  description: 'Who we are, our vision and why clinics and labs choose one connected digital dentistry ecosystem.',
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
        title="About ODYX"
        lead="Premium digital dentistry - one connected workflow from the first scan to the delivered restoration."
        action={<Link className="btn" href="/#why">Why ODYX <Arrow /></Link>}
      />
      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Company" />
          <div className="g2 build-group">
            <div className="card build reveal">
              <h3>Vision &amp; Mission</h3>
              <p>Reduce the complexity of going digital with guided, visual, workflow-led tools for dentists and labs.</p>
            </div>
            <div className="card build reveal">
              <h3>News</h3>
              <p>See the latest on our homepage news section.</p>
              <Link className="more" href="/#news">Latest news <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
      <PageCta title="Meet the ecosystem" desc="Explore products and workflows built around one connected chain." />
      <InnerPageMotion />
    </>
  );
}
