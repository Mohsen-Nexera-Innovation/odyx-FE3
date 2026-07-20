import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero, { Arrow } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import InnerPageMotion from '@/components/InnerPageMotion';

export const metadata: Metadata = {
  title: 'About ODYX',
  description: 'Who we are, vision, values and the team behind one connected digital dentistry ecosystem.',
};

const VALUES = [
  { title: 'Clinical confidence', desc: 'Validated parameters from scan to cure so outcomes stay predictable.' },
  { title: 'Connected workflow', desc: 'Hardware, materials and guidance designed to work as one system.' },
  { title: 'Professional clarity', desc: 'Direct language for dentists and labs — no unnecessary complexity.' },
  { title: 'Lifelong support', desc: 'Training, manuals and service that stay with the practice after purchase.' },
];

const TEAM = [
  { name: 'Leadership', role: 'Strategy & partnerships' },
  { name: 'Clinical advisors', role: 'Workflow & indications' },
  { name: 'Product engineering', role: 'Hardware & materials' },
  { name: 'Customer care', role: 'Support & training' },
];

const NEWS = [
  { tag: 'Product', title: 'New permanent crown & bridge resin line', href: '/products/Resin' },
  { tag: 'Expo', title: 'ODYX at the digital dentistry expo', href: '/about#news' },
  { tag: 'Academy', title: 'Academy: new implant-guide course', href: '/learning' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
        title="About ODYX"
        lead="Premium digital dentistry — one connected workflow from the first scan to the delivered restoration."
      />

      <section className="sec sec-teal" id="who-we-are">
        <div className="wrap">
          <SecHead eyebrow="Who we are" h2="Built for dentists and labs" p="ODYX delivers a complete digital dentistry ecosystem — scanner, design, print, cure and resin — so clinics and labs can go digital with confidence." />
        </div>
      </section>

      <section className="sec" id="vision-mission">
        <div className="wrap">
          <SecHead eyebrow="Vision & Mission" />
          <div className="g2 build-group">
            <div className="card build reveal">
              <h3>Vision</h3>
              <p>Make digital dentistry the default standard of care — accessible, reliable and clinically trusted.</p>
            </div>
            <div className="card build reveal">
              <h3>Mission</h3>
              <p>Reduce the complexity of going digital with guided, visual, workflow-led tools for dentists and labs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-orange" id="values">
        <div className="wrap">
          <SecHead eyebrow="Values & Beliefs" />
          <div className="g2 build-group">
            {VALUES.map((v) => (
              <div key={v.title} className="card build reveal">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="team">
        <div className="wrap">
          <SecHead eyebrow="Our Team" h2="People behind ODYX" p="Clinical, product and support teams working as one." />
          <div className="g2 build-group">
            {TEAM.map((t) => (
              <div key={t.name} className="card build reveal">
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-teal" id="news">
        <div className="wrap">
          <SecHead eyebrow="News" h2="Latest from ODYX" />
          <div className="g3 build-group">
            {NEWS.map((n) => (
              <Link key={n.title} href={n.href} className="card build reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="eyebrow">{n.tag}</span>
                <h3>{n.title}</h3>
                <span className="more">Read more <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="privacy">
        <div className="wrap">
          <SecHead eyebrow="Legal" />
          <div className="g3 build-group">
            <div className="card build reveal" id="terms">
              <h3>Privacy Policy</h3>
              <p>How we collect and protect personal data. Full policy coming soon.</p>
            </div>
            <div className="card build reveal">
              <h3>Terms of Use</h3>
              <p>Terms governing use of the ODYX website and services. Full terms coming soon.</p>
            </div>
            <div className="card build reveal" id="cookies">
              <h3>Cookie Policy</h3>
              <p>How cookies and similar technologies are used. Full policy coming soon.</p>
            </div>
          </div>
        </div>
      </section>
      <InnerPageMotion />
    </>
  );
}
