import Link from 'next/link';
import { Arrow } from '@/components/PageHero';
import InnerPageMotion from '@/components/InnerPageMotion';
import AboutMotion from '@/components/about/AboutMotion';
import {
  ABOUT_AUDIENCES,
  ABOUT_CHAPTERS,
  ABOUT_FAMILIES,
  ABOUT_HERO,
  ABOUT_MANIFESTO,
  ABOUT_MISSION,
  ABOUT_NEWS,
  ABOUT_SPINE,
  ABOUT_STORY,
  ABOUT_TEAM,
  ABOUT_VALUES,
  ABOUT_VISION,
} from '@/content/about';

export default function AboutPage() {
  const featuredNews = ABOUT_NEWS.find((n) => n.featured) ?? ABOUT_NEWS[0];
  const sideNews = ABOUT_NEWS.filter((n) => n !== featuredNews);

  return (
    <div className="about-page">
      <nav className="about-nav" aria-label="About sections">
        {ABOUT_CHAPTERS.map((c) => (
          <button
            key={c.id}
            type="button"
            className="about-nav__dot"
            data-chapter={c.id}
            aria-label={c.label}
            title={c.label}
          >
            <span className="about-nav__label">{c.label}</span>
          </button>
        ))}
      </nav>

      {/* —— Cinematic hero —— */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__stage" aria-hidden>
          <div className="about-hero__glow about-hero__glow--a" />
          <div className="about-hero__glow about-hero__glow--b" />
          <div className="about-hero__grid" />
          <div className="about-hero__orbit" />
        </div>

        <div className="wrap about-hero__wrap">
          <nav className="crumbs about-hero__crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>About</span>
          </nav>

          <div className="about-hero__layout">
            <div className="about-hero__copy">
              <p className="about-hero__brand" aria-label="ODYX">
                <span>{ABOUT_HERO.brand}</span>
              </p>
              <h1 id="about-hero-title">{ABOUT_HERO.title}</h1>
              <p className="about-hero__lead">{ABOUT_HERO.lead}</p>
              <div className="about-hero__actions">
                <Link className="btn" href={ABOUT_HERO.primaryCta.href}>
                  {ABOUT_HERO.primaryCta.label} <Arrow />
                </Link>
                <Link className="btn btn-ghost" href={ABOUT_HERO.secondaryCta.href}>
                  {ABOUT_HERO.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="about-hero__visual" aria-hidden>
              <div className="about-hero__aura" />
              <div className="about-hero__orbit-ring" />
              <div className="about-hero__cluster">
                <div className="about-hero__ground" />
                <div className="about-hero__links">
                  <span className="about-hero__link about-hero__link--a" />
                  <span className="about-hero__link about-hero__link--b" />
                </div>
                {ABOUT_HERO.float.map((f) => (
                  <figure key={f.src} className={`about-hero__item ${f.className}`}>
                    <img src={f.src} alt="" draggable={false} />
                    <span className="about-hero__shadow" />
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <a className="about-hero__scroll" href="#manifesto">
            <span>Scroll the story</span>
            <i aria-hidden />
          </a>
        </div>
      </section>

      {/* —— Manifesto —— */}
      <section className="about-manifesto" id="manifesto">
        <div className="wrap about-manifesto__inner reveal">
          <p className="about-manifesto__kicker">{ABOUT_MANIFESTO.kicker}</p>
          <p className="about-manifesto__line">{ABOUT_MANIFESTO.line}</p>
          <p className="about-manifesto__emphasis">{ABOUT_MANIFESTO.emphasis}</p>
          <p className="about-manifesto__body">{ABOUT_MANIFESTO.body}</p>
        </div>
      </section>

      {/* —— Story —— */}
      <section
        className="sec about-story"
        id="who-we-are"
        data-about-chapter="who-we-are"
      >
        <div className="wrap about-story__grid">
          <div className="about-story__sticky reveal">
            <span className="eyebrow">{ABOUT_STORY.eyebrow}</span>
            <h2>{ABOUT_STORY.h2}</h2>
            {ABOUT_STORY.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="about-story__actions">
              <Link className="btn" href="/products">
                See the products <Arrow />
              </Link>
              <Link className="btn btn-ghost" href="/support">
                Request a Demo
              </Link>
            </div>
          </div>

          <div className="about-mosaic build-group">
            {ABOUT_STORY.mosaic.map((shot, i) => (
              <figure
                key={shot.src}
                className={`about-mosaic__cell about-mosaic__cell--${i + 1} build reveal`}
              >
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* —— Horizontal workflow filmstrip —— */}
      <section
        className="about-spine"
        id="ecosystem"
        data-about-chapter="ecosystem"
      >
        <div className="wrap about-spine__head reveal">
          <span className="eyebrow">The connected workflow</span>
          <h2>Four steps. One system.</h2>
          <p>Scroll sideways — each step opens the matching product page.</p>
        </div>

        <div className="about-spine__viewport">
          <ol className="about-spine__rail build-group" tabIndex={0} aria-label="Workflow steps">
            {ABOUT_SPINE.map((step) => (
              <li key={step.no} className={`about-spine__step build reveal${step.dimmed ? ' is-dimmed' : ''}`}>
                {step.dimmed ? (
                  <span className="about-spine__card is-dimmed" aria-disabled="true" title="Coming soon">
                    <div className="about-spine__media">
                      <img src={step.img} alt={step.alt} loading="lazy" />
                    </div>
                    <div className="about-spine__meta">
                      <span className="about-spine__no">{step.no}</span>
                      <strong>{step.label}</strong>
                      <p>{step.blurb}</p>
                    </div>
                  </span>
                ) : (
                  <Link href={step.href} className="about-spine__card">
                    <div className="about-spine__media">
                      <img src={step.img} alt={step.alt} loading="lazy" />
                    </div>
                    <div className="about-spine__meta">
                      <span className="about-spine__no">{step.no}</span>
                      <strong>{step.label}</strong>
                      <p>{step.blurb}</p>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* —— Vision / Mission immersive —— */}
      <section
        className="about-vm"
        id="vision-mission"
        data-about-chapter="vision-mission"
      >
        <article className="about-vm__panel about-vm__panel--vision reveal">
          <div className="about-vm__media">
            <img src={ABOUT_VISION.img} alt={ABOUT_VISION.alt} loading="lazy" className="parallax" />
          </div>
          <div className="about-vm__body">
            <span className="eyebrow">Vision</span>
            <h2>{ABOUT_VISION.title}</h2>
            <p>{ABOUT_VISION.body}</p>
          </div>
        </article>
        <article className="about-vm__panel about-vm__panel--mission reveal">
          <div className="about-vm__media">
            <img src={ABOUT_MISSION.img} alt={ABOUT_MISSION.alt} loading="lazy" className="parallax" />
          </div>
          <div className="about-vm__body">
            <span className="eyebrow">Mission</span>
            <h2>{ABOUT_MISSION.title}</h2>
            <p>{ABOUT_MISSION.body}</p>
          </div>
        </article>
      </section>

      {/* —— Values chapters —— */}
      <section className="about-values-sec" id="values" data-about-chapter="values">
        <div className="wrap about-values-sec__head reveal">
          <span className="eyebrow">Values & Beliefs</span>
          <h2>Principles behind every product</h2>
        </div>
        <div className="about-values-list">
          {ABOUT_VALUES.map((v, i) => (
            <article
              key={v.no}
              className={`about-value-row${i % 2 === 1 ? ' about-value-row--flip' : ''}`}
            >
              <div className="about-value-row__media">
                <img src={v.img} alt={v.alt} loading="lazy" />
              </div>
              <div className="about-value-row__copy">
                <span className="about-value-row__no">{v.no}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* —— Audiences —— */}
      <section
        className="about-audiences"
        id="audiences"
        data-about-chapter="audiences"
      >
        <div className="wrap about-audiences__head reveal">
          <span className="eyebrow">Who we serve</span>
          <h2>Two paths into the ecosystem</h2>
        </div>
        <div className="about-audiences__grid build-group">
          {ABOUT_AUDIENCES.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className={`about-audience about-audience--${a.tone} build reveal`}
            >
              <img src={a.img} alt={a.alt} loading="lazy" />
              <div className="about-audience__scrim" aria-hidden />
              <div className="about-audience__body">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <span className="about-audience__cta">
                  {a.cta} <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* —— Families —— */}
      <section className="sec about-families-sec" id="families">
        <div className="wrap">
          <div className="about-families-sec__head reveal">
            <span className="eyebrow">Product families</span>
            <h2>Scanners and digital printing</h2>
            <p>One masterbrand. Two families that cover the clinical path.</p>
          </div>
          <div className="about-families build-group">
            {ABOUT_FAMILIES.map((f) => (
              <Link
                key={f.name}
                href={f.href}
                className={`about-family about-family--${f.accent} build reveal`}
              >
                <img
                  className="about-family__brand"
                  src={f.brand}
                  alt=""
                  width={480}
                  height={180}
                />
                <div className="about-family__stage">
                  <img src={f.img} alt={f.name} loading="lazy" />
                </div>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
                <span className="more">
                  Explore <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* —— Team —— */}
      <section
        className="sec about-team-sec"
        id="team"
        data-about-chapter="team"
      >
        <div className="wrap">
          <div className="about-team-sec__head reveal">
            <span className="eyebrow">Our Team</span>
            <h2>People behind ODYX</h2>
            <p>Clinical, product, and support — working as one from first demo to lifelong care.</p>
          </div>
          <div className="about-team build-group">
            {ABOUT_TEAM.map((t, i) => (
              <article key={t.name} className="about-team__card build reveal">
                <span className="about-team__idx" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{t.name}</h3>
                <p className="about-team__role">{t.role}</p>
                <p>{t.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* —— News magazine —— */}
      <section className="sec about-news-sec" id="news">
        <div className="wrap">
          <div className="about-news-sec__head reveal">
            <span className="eyebrow">News</span>
            <h2>Latest from ODYX</h2>
          </div>
          <div className="about-mag build-group">
            <Link href={featuredNews.href} className="about-mag__lead build reveal">
              <div className="about-mag__media">
                <img src={featuredNews.img} alt={featuredNews.alt} loading="lazy" />
              </div>
              <div className="about-mag__body">
                <span className="eyebrow">{featuredNews.tag}</span>
                <h3>{featuredNews.title}</h3>
                <span className="more">
                  Read more <Arrow />
                </span>
              </div>
            </Link>
            <div className="about-mag__side">
              {sideNews.map((n) => (
                <Link key={n.title} href={n.href} className="about-mag__item build reveal">
                  <div className="about-mag__thumb">
                    <img src={n.img} alt={n.alt} loading="lazy" />
                  </div>
                  <div>
                    <span className="eyebrow">{n.tag}</span>
                    <h3>{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* —— Dark CTA —— */}
      <section className="about-cta">
        <div className="about-cta__bg" aria-hidden>
          <img src="/img/printers/clinic-scene.jpg" alt="" />
        </div>
        <div className="wrap about-cta__inner reveal">
          <span className="eyebrow">Next step</span>
          <h2>See the ecosystem in action</h2>
          <p>Explore the lineup, walk the five-step workflow, or book a demo with the team.</p>
          <div className="about-cta__actions">
            <Link className="btn" href="/products">
              Explore products <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/support">
              Request a Demo
            </Link>
            <Link className="btn btn-ghost" href="/roi">
              ROI Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* —— Legal —— */}
      <section className="about-legal" id="privacy">
        <div className="wrap">
          <p className="about-legal__label">Legal</p>
          <div className="about-legal__grid">
            <div>
              <h3>Privacy Policy</h3>
              <p>How we collect and protect personal data. Full policy coming soon.</p>
            </div>
            <div id="terms">
              <h3>Terms of Use</h3>
              <p>Terms governing use of the ODYX website and services. Full terms coming soon.</p>
            </div>
            <div id="cookies">
              <h3>Cookie Policy</h3>
              <p>How cookies and similar technologies are used. Full policy coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      <AboutMotion />
      <InnerPageMotion />
    </div>
  );
}
