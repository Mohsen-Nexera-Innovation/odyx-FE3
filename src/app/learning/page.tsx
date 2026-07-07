import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero, { Arrow, PageCta } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Learning Center | ODYX',
  description: 'Beginner paths, clinical courses, articles and video tutorials for digital dentistry.',
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Learning', href: '/learning' }]}
        title="Learning Center"
        lead="Build real skill - from your first scan to advanced clinical cases. Academy content is coming online."
        action={<Link className="btn" href="/register">Create account <Arrow /></Link>}
      />
      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Coming soon" />
          <div className="g3 build-group">
            {['Beginner Path', 'Clinical Courses', 'Videos & Guides'].map((t) => (
              <div key={t} className="card build reveal">
                <h3>{t}</h3>
                <p>Content launching soon. Explore workflows and support in the meantime.</p>
                <Link className="more" href="/workflows">Browse workflows <Arrow /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageCta title="Hands-on training" desc="Book training with an ODYX specialist when you are ready." />
      <InnerPageMotion />
    </>
  );
}
