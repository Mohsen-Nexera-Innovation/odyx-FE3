import Link from 'next/link';
import PageHero, { Arrow, PageActions } from '@/components/PageHero';
import SecHead from '@/components/SecHead';
import RegisterDevice from '@/components/RegisterDevice';
import { SUPPORT_SECTIONS } from '@/content/support';

export default function SupportHubPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Support', href: '/support' }]}
        title="Help when you need it"
        lead="Troubleshooting, manuals, updates, warranty and live care - from first setup to advanced cases."
        action={
          <PageActions>
            <Link className="btn" href="/support#register">Register a device <Arrow /></Link>
            <Link className="btn btn-ghost" href="/support#contact">Contact support</Link>
          </PageActions>
        }
      />

      <section className="sec sec-teal">
        <div className="wrap">
          <SecHead eyebrow="Quick access" />
          <div className="support-quick reveal">
            <Link href="/support#manuals" className="support-quick-card">
              <strong>Manuals</strong>
              <span>IFU and setup guides</span>
            </Link>
            <Link href="/support#troubleshooting" className="support-quick-card">
              <strong>Troubleshooting</strong>
              <span>Fix common issues</span>
            </Link>
            <Link href="/support#register" className="support-quick-card">
              <strong>Warranty</strong>
              <span>Register and check status</span>
            </Link>
            <Link href="/support#chat" className="support-quick-card">
              <strong>Live help</strong>
              <span>AI + WhatsApp care</span>
            </Link>
          </div>
        </div>
      </section>

      {SUPPORT_SECTIONS.map((sec, i) => (
        <section key={sec.id} className={`sec${i % 2 === 0 ? '' : ' sec-orange'}`} id={sec.id}>
          <div className="wrap">
            <SecHead eyebrow={sec.title} align="left" p={sec.desc} />
            <ul className="support-list reveal">
              {sec.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span>{item.label}</span>
                    {item.meta && <span className="support-meta">{item.meta}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="sec sec-teal" id="register">
        <div className="wrap">
          <SecHead
            eyebrow="Device registration"
            h2="Register your device"
            p="Activate warranty coverage and check status for ODYX hardware."
          />
          <RegisterDevice />
        </div>
      </section>

      <section className="sec" id="contact">
        <div className="wrap">
          <SecHead
            eyebrow="Contact"
            h2="Talk to sales or support"
            p="Request a demo, contact the sales team, or open a technical ticket."
          />
          <div className="g3 build-group">
            <div className="card build reveal">
              <h3>Request a Demo</h3>
              <p>See the ODYX workflow with your team.</p>
              <Link className="btn btn-sm" href="mailto:sales@odyx.dental?subject=Demo%20request">
                Email sales <Arrow />
              </Link>
            </div>
            <div className="card build reveal">
              <h3>Contact Sales Team</h3>
              <p>Pricing, quotes and distributor questions.</p>
              <Link className="btn btn-sm" href="mailto:sales@odyx.dental?subject=Sales%20inquiry">
                Contact sales <Arrow />
              </Link>
            </div>
            <div className="card build reveal">
              <h3>Technical Support</h3>
              <p>Existing customers — include serial number and issue type.</p>
              <Link className="btn btn-sm" href="mailto:support@odyx.dental?subject=Technical%20support">
                Email support <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
