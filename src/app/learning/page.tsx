import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'Learning Center | ODYX',
  description: 'Beginner paths, clinical courses, articles and video tutorials for digital dentistry.',
};

const BEGINNER = [
  { title: 'What is an intraoral scanner?', href: '/products/intraoral-scanner' },
  { title: 'What is a 3D printer?', href: '/products/3d-printers' },
  { title: 'What is curing?', href: '/products/curing-machines' },
  { title: 'What are dental resins?', href: '/products/Resin' },
];

const COURSES = [
  { title: 'Crown workflow', href: '/workflows/print' },
  { title: 'Implant guide', href: '/workflows/design' },
  { title: 'Orthodontic model', href: '/workflows/print' },
  { title: 'Denture workflow', href: '/workflows/deliver' },
];

const ARTICLES = [
  { title: 'Getting started with chairside digital', href: '/solutions/dentists' },
  { title: 'Lab throughput with ODYX print', href: '/solutions/labs' },
  { title: 'Choosing the right resin line', href: '/products/Resin' },
];

const VIDEOS = [
  { title: 'Scan to smile overview', href: '/workflows' },
  { title: 'P1-26 setup walkthrough', href: '/products/3d-printers' },
  { title: 'Cure profiles explained', href: '/products/curing-machines' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Learning', href: '/learning' }]}
        eyebrow="Academy"
        title="Learning Center"
        lead="Build real skill — from your first scan to advanced clinical cases."
        action={
          <PageActions>
            <Link className="btn" href="/learning#beginner">
              Start beginner path <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/roi">
              ROI Calculator
            </Link>
          </PageActions>
        }
      />

      <section className="sec sec-teal" id="beginner">
        <div className="wrap">
          <SecHead eyebrow="Beginner Path" h2="Core digital concepts" p="Short primers for new users — click through to the matching ODYX product." />
          <div className="g2 build-group">
            {BEGINNER.map((item) => (
              <Link key={item.title} href={item.href} className="card build reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{item.title}</h3>
                <span className="more">Open <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="courses">
        <div className="wrap">
          <SecHead eyebrow="Clinical Courses" h2="By application" />
          <div className="g2 build-group">
            {COURSES.map((item) => (
              <Link key={item.title} href={item.href} className="card build reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{item.title}</h3>
                <span className="more">View path <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-orange" id="articles">
        <div className="wrap">
          <SecHead eyebrow="Articles" h2="Guides and insights" />
          <div className="g3 build-group">
            {ARTICLES.map((item) => (
              <Link key={item.title} href={item.href} className="card build reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{item.title}</h3>
                <span className="more">Read <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="videos">
        <div className="wrap">
          <SecHead eyebrow="Videos & Tutorials" h2="Watch and follow along" />
          <div className="g3 build-group">
            {VIDEOS.map((item) => (
              <Link key={item.title} href={item.href} className="card build reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{item.title}</h3>
                <span className="more">Open <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-teal">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <SecHead eyebrow="Tools" h2="ROI Calculator" p="Estimate the return of the ODYX ecosystem for your clinic or lab." />
          <Link className="btn" href="/roi">Open ROI Calculator <Arrow /></Link>
        </div>
      </section>
      <InnerPageMotion />
    </>
  );
}
