import Link from 'next/link';
import CureActsSequence from '@/components/cure/CureActsSequence';

// 037 · ODYX Cure UV-02 — spec-faithful build of
// knowledge_base/screens/037 Curing Machines (content.md + screen-details.md
// + sub-design-system.md). Every number traces to ODYX Products 18.7.26.pdf
// p14–15 via the content.md §7 claims register. No "Smart Heating", no
// UW-03, no invented specs. The results gallery (§5.10) ships hidden until
// real case imagery arrives (review #32).

const HERO_STATS = [
  { value: '1–5 min', label: 'Typical cure time' },
  { value: '3 λ', label: '365 / 385 / 405 nm' },
  { value: '360°', label: 'All-round coverage' },
  { value: '8', label: 'Memory presets' },
] as const;

const FEATURES = [
  {
    title: '360° Uniform Curing',
    copy: 'All-round coverage; every surface sees the light.',
    icon: 'orbit',
  },
  {
    title: 'Triple-Wavelength UV',
    copy: '365, 385 and 405 nm, selectable independently or together.',
    icon: 'waves',
  },
  {
    title: 'Adjustable Intensity & Timer',
    copy: '5–100% light intensity; 1 second to 30 minutes.',
    icon: 'gauge',
  },
  {
    title: '8 Memory Presets',
    copy: 'Store wavelength, intensity and time per application. No guesswork.',
    icon: 'chip',
  },
  {
    title: 'Safety by Design',
    copy: 'One-way mirror chamber; the process stops the moment the cover opens.',
    icon: 'shield',
  },
] as const;

const CURE_TIMES = [
  {
    name: 'Standard models',
    minutes: '~2',
    img: '/img/cure-stitch/clinical-cases/case-model-curing.png',
    alt: 'A printed dental model curing under amber light',
  },
  {
    name: 'Surgical guides',
    minutes: '~3',
    img: '/img/cure-stitch/clinical-cases/case-guide-curing.png',
    alt: 'A clear surgical guide curing in the chamber',
  },
  {
    name: 'Castable resins',
    minutes: '~3',
    img: '/img/cure-stitch/odyx-cure-macro-amber.png',
    alt: 'A castable crown pattern under the curing light',
  },
  {
    name: 'Temporary crowns',
    minutes: '~10',
    img: '/img/cure-stitch/clinical-cases/case-crown-curing.png',
    alt: 'A temporary crown curing on the plate',
  },
  {
    name: 'Dentures',
    minutes: '~15',
    img: '/img/cure-stitch/clinical-cases/case-denture-curing.png',
    alt: 'A denture base curing inside the chamber',
  },
] as const;

const APPLICATIONS = [
  { name: 'Surgical Guides', img: '/img/cure-uv02/app-guides.jpg' },
  { name: 'Crowns & Bridges', img: '/img/cure-uv02/app-crowns.jpg' },
  { name: 'Models', img: '/img/cure-uv02/app-models.jpg' },
  { name: 'Splints & Night Guards', img: '/img/cure-uv02/app-splints.jpg' },
  { name: 'Temporary Restorations', img: '/img/cure-uv02/app-temps.jpg' },
  { name: 'Dentures', img: '/img/cure-uv02/app-dentures.jpg' },
] as const;

const SPECS = [
  { label: 'Curing chamber', value: '180 mm diameter × 120 mm height' },
  { label: 'Wavelengths', value: '365 / 385 / 405 nm — independently or together' },
  { label: 'Light intensity', value: 'Adjustable 5% – 100%' },
  { label: 'Timer', value: '1 second – 30 minutes' },
  { label: 'Memory presets', value: '8 saved profiles (wavelength + intensity + time)' },
  { label: 'Typical cure time', value: '1 – 5 minutes' },
  { label: 'Coverage', value: '360° all-round' },
  { label: 'Input voltage', value: '100–240 V, 50–60 Hz (dual-voltage switch: 115 V / 230 V)' },
  { label: 'Body', value: 'Anodized metal; corrosion-resistant chamber interior' },
  { label: 'Safety', value: 'One-way mirror design; sensor stops the process if the cover opens' },
] as const;

const SPINE = ['Scan', 'Design', 'Print', 'Wash & Cure', 'Deliver'] as const;

const ECOSYSTEM = [
  {
    name: 'ODYX S1',
    type: 'Intraoral scanner',
    img: '/img/cutouts/feat-scanner-cutout.png',
    href: '/products/odyx-s1-intraoral-scanner',
  },
  {
    name: 'ODYX P1-26',
    type: 'Dental 3D printer',
    img: '/img/cutouts/feat-printer-cutout.png',
    href: '/products/3d-printers',
  },
  {
    name: 'ODYX Resins',
    type: 'Five clinical lines',
    img: '/img/scanner/eco-resins.jpg',
    href: '/products/resins',
  },
  {
    name: 'ODYX Cure UV-02',
    type: 'This machine',
    img: '/img/cutouts/cure-icon-right-1.jpg',
    href: null,
  },
] as const;

function FeatureIcon({ name }: { name: (typeof FEATURES)[number]['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'orbit':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.6 9.4a8.5 8.5 0 1 0 .4 4.1" />
          <path d="M20 4v5.4h-5.4" />
        </svg>
      );
    case 'waves':
      return (
        <svg {...common}>
          <path d="M2 8c1.7-3 3.3-3 5 0s3.3 3 5 0 3.3-3 5-0" />
          <path d="M2 13c1.7-3 3.3-3 5 0s3.3 3 5 0 3.3-3 5 0" />
          <path d="M2 18c1.7-3 3.3-3 5 0s3.3 3 5 0 3.3-3 5 0" />
        </svg>
      );
    case 'gauge':
      return (
        <svg {...common}>
          <path d="M20.2 15.5a8.5 8.5 0 1 0-16.4 0" />
          <path d="m12 13 4-4.4" />
          <circle cx="12" cy="14" r="1.6" />
        </svg>
      );
    case 'chip':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.4 3 8.1 7 9.5 4-1.4 7-5.1 7-9.5V6l-7-3Z" />
          <path d="m9.2 11.8 2 2 3.6-4" />
        </svg>
      );
  }
}

function StepIcon({ name }: { name: 'print' | 'wash' | 'cure' }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'print':
      return (
        <svg {...common}>
          <path d="M5 3h14M7 3v5h10V3M12 8v3" />
          <path d="m12 11-2.6 4.5h5.2L12 11ZM4 21h16" />
        </svg>
      );
    case 'wash':
      return (
        <svg {...common}>
          <path d="M7 3h10l-1 8.5a4 4 0 0 1-8 0L7 3Z" />
          <path d="M8.2 14.5C6 16 5 17.6 5 19h14c0-1.4-1-3-3.2-4.5" />
        </svg>
      );
    case 'cure':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6" />
        </svg>
      );
  }
}

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 4v10m0 0 4-4m-4 4-4-4M4 19h16" />
  </svg>
);

export default function CuringUv02Page() {
  return (
    <div className="c6">
      {/* 1 · Hero — light split, model name as H1 (review #22) */}
      <section className="c6-hero" data-hero-light id="overview">
        <div className="c6-wrap">
          <nav className="c6-crumbs reveal" aria-label="Breadcrumb">
            <Link href="/products">Products</Link>
            <span className="sep" aria-hidden>
              /
            </span>
            <span aria-current="page">ODYX Cure UV-02</span>
          </nav>
          <div className="c6-hero-grid">
            <div className="m-left">
              <p className="c6-eyebrow">Wash &amp; Cure</p>
              <h1 className="c6-h1">ODYX Cure UV-02</h1>
              <p className="c6-hero-tag">Powerful Curing. Perfect Results.</p>
              <p className="c6-hero-body">
                The precision cure box for dental 3D printing: triple-wavelength UV light, 360°
                coverage, and validated timing for every application in the ODYX range.
              </p>
              <div className="c6-hero-stats m-stagger">
                {HERO_STATS.map((s) => (
                  <div className="c6-stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="c6-hero-ctas">
                <Link className="c6-btn" href="/support">
                  Request a Demo
                </Link>
                <a className="c6-btn c6-btn--ghost" href="#downloads">
                  Download Datasheet
                </a>
              </div>
              <p className="c6-cta-micro">
                Live demo at your clinic or lab, in Arabic, English or French.
              </p>
            </div>
            {/* Hero ships uncaptioned until the client confirms the unit (spec §13.1) */}
            <figure className="c6-hero-media m-scale">
              <img
                src="/img/cure-stitch/odyx-cure-chamber-glow-cutout.png"
                alt="The curing chamber glowing orange around a plate of crowns"
                width={901}
                height={832}
                fetchPriority="high"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 2 · Why washing & curing matters */}
      <section className="c6-sec" id="why">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">A printed part isn&rsquo;t a finished part</h2>
          </div>
          <div className="c6-why-grid">
            <div className="c6-why-copy m-left">
              <p>
                Off the printer, every surface still carries a film of uncured resin, and the
                material underneath has only partly polymerized. First the part is washed in
                isopropyl alcohol to strip that film from fine details and deep cavities. Then
                post-curing under UV light completes the reaction the printer started — hardening
                the part to its full mechanical strength.
              </p>
              <p>
                Skip either step and you seat a restoration that is weaker, less accurate, and
                still carrying uncured resin. The ODYX Cure UV-02 is built for that second step:
                the cure that makes the part clinical.
              </p>
            </div>
            <div className="c6-card c6-tl m-right" role="list" aria-label="Print, wash, cure timeline">
              <div className="c6-tl-step" role="listitem">
                <StepIcon name="print" />
                <div>
                  <strong>PRINT</strong>
                  <span>The part takes shape, layer by layer.</span>
                </div>
              </div>
              <div className="c6-tl-arrow" aria-hidden>
                ↓
              </div>
              <div className="c6-tl-step" role="listitem">
                <StepIcon name="wash" />
                <div>
                  <strong>WASH</strong>
                  <span>An IPA bath strips uncured resin.</span>
                </div>
              </div>
              <div className="c6-tl-arrow" aria-hidden>
                ↓
              </div>
              <div className="c6-tl-step c6-tl-step--active" role="listitem">
                <StepIcon name="cure" />
                <div>
                  <strong>CURE</strong>
                  <span>The UV-02 completes polymerization.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Washed. Then cured. — the one dark band (§5.3) */}
      <CureActsSequence />

      {/* 4 · Feature chips ×5 */}
      <section className="c6-sec" id="features">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">Built to finish every case</h2>
          </div>
          <div className="c6-chips m-stagger">
            {FEATURES.map((f) => (
              <article className="c6-card c6-chip" key={f.title}>
                <FeatureIcon name={f.icon} />
                <h3>{f.title}</h3>
                <p>{f.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Cure times by application (catalog p15) */}
      <section className="c6-sec c6-sec--tint" id="cure-times">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">Set it by the case, not by trial and error</h2>
          </div>
          <div className="c6-times m-stagger">
            {CURE_TIMES.map((t) => (
              <article className="c6-card c6-time" key={t.name}>
                <div className="c6-time-img">
                  <img src={t.img} alt={t.alt} loading="lazy" width={800} height={600} />
                </div>
                <div className="c6-time-body">
                  <h3>{t.name}</h3>
                  <p className="c6-time-min">
                    {t.minutes} <small>min</small>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="c6-micro">Recommended parameters; may vary by resin type.</p>
          <p className="c6-mech reveal">
            <strong>Why one box covers this whole table:</strong> each resin cures best under its
            own light — and with three wavelengths, selectable independently or together, the
            UV-02 lets you choose.
          </p>
        </div>
      </section>

      {/* 6 · What can you cure */}
      <section className="c6-sec" id="applications">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">Built for the daily work of dentistry</h2>
          </div>
          <div className="c6-apps m-stagger">
            {APPLICATIONS.map((a) => (
              <figure className="c6-card c6-app" key={a.name}>
                <img src={a.img} alt={a.name} loading="lazy" width={1024} height={640} />
                <figcaption>{a.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="c6-micro">
            Wavelength selection matches the cure to the resin —{' '}
            <Link href="/products/resins">see the resin range for per-line guidance</Link>.
          </p>
        </div>
      </section>

      {/* 7 · Technical specifications (catalog p14) */}
      <section className="c6-sec c6-sec--tint" id="specs">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">Technical specifications</h2>
          </div>
          <div className="c6-specs-grid">
            {/* Video slot — drop client footage at public/video/cure-in-action.mp4;
                the device still serves as poster until it plays */}
            <figure className="c6-card c6-specs-media m-left">
              <video
                src="/video/cure-in-action.mp4"
                poster="/img/cure-uv02/device-angle.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                width={1536}
                height={1024}
                aria-label="The ODYX Cure UV-02 running a cure cycle, chamber glowing"
              />
              <figcaption>The Cure UV-02 in action: a full cure cycle inside the chamber.</figcaption>
            </figure>
            <div className="m-right">
              <table className="c6-table">
                <tbody>
                  {SPECS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="c6-dl" id="downloads">
                <Link href="/support#manuals">
                  <DownloadIcon />
                  Cure UV-02 datasheet (PDF)
                </Link>
                <Link href="/support#manuals">
                  <DownloadIcon />
                  Product manual
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Workflow position — step four of five */}
      <section className="c6-sec" id="workflow">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">Step four of five</h2>
          </div>
          <p className="c6-intro reveal">
            Your scan became a design; your design became a printed part. After its wash, the
            UV-02 is where that part becomes a restoration — fully cured, ready to seat.
          </p>
          <div className="c6-spine m-stagger" aria-label="The ODYX workflow">
            {SPINE.map((step, i) => (
              <span className="c6-spine-step" key={step}>
                {i > 0 ? <i className="c6-spine-join" aria-hidden /> : null}
                <em {...(step === 'Wash & Cure' ? { 'aria-current': 'step' } : {})}>{step}</em>
              </span>
            ))}
          </div>
          <div className="c6-spine-links reveal">
            <Link href="/products/3d-printers">← PRINT: the P1-26 that feeds this step</Link>
            <Link href="/workflows">DELIVER: what same-day actually looks like →</Link>
          </div>
        </div>
      </section>

      {/* 9 · Ecosystem strip */}
      <section className="c6-sec c6-sec--tint" id="ecosystem">
        <div className="c6-wrap">
          <div className="c6-shead reveal">
            <h2 className="c6-h2">One connected workflow</h2>
          </div>
          <div className="c6-eco m-stagger">
            {ECOSYSTEM.map((item, i) => (
              <div
                className={`c6-eco-item${item.href ? '' : ' c6-eco-item--active'}`}
                key={item.name}
              >
                {i > 0 ? <span className="c6-eco-join" aria-hidden /> : null}
                {item.href ? (
                  <Link href={item.href}>
                    <img src={item.img} alt="" loading="lazy" width={300} height={300} />
                    <strong>{item.name}</strong>
                    <span>{item.type}</span>
                  </Link>
                ) : (
                  <span className="c6-eco-self" aria-current="page">
                    <img src={item.img} alt="" loading="lazy" width={300} height={300} />
                    <strong>{item.name}</strong>
                    <span>{item.type}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · CTA — results gallery ships hidden until real cases arrive (review #32) */}
      <section className="c6-sec">
        <div className="c6-wrap">
          <div className="c6-cta-card m-scale">
            <div>
              <h2>See a crown cured in minutes</h2>
              <p>
                Book a demo at your clinic or lab and watch a printed restoration go from wash to
                seat-ready.
              </p>
              <div className="c6-cta-actions">
                <Link className="c6-btn" href="/support">
                  Request a Demo
                </Link>
              </div>
              <p className="c6-cta-micro">
                Live demo at your clinic or lab, in Arabic, English or French.
              </p>
            </div>
            <figure className="c6-cta-media">
              <img
                src="/img/cure-uv02/device-front.jpg"
                alt="The ODYX Cure UV-02 curing station"
                loading="lazy"
                width={1536}
                height={1024}
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
