
// Ecosystem hub — the client mock's grid of connected panels below the
// clinical cases deck: Learning / Support on the first row, Store /
// Registration on the second. One shared outer container owns the border,
// radius and clipping; the panels are grid cells separated by a 14px
// (reference) white gutter, so no card carries a surface of its own.
//
// Geometry is measured off the client references — 2850x1116 for row 1 and
// 2846x962 for row 2 (knowledge_base/screens/041-… and 042-…) — where the
// container is 2836 wide, row-1 cards are 1411x886 and row-2 cards 1411x875.
// .hv2-hub-in is the query container, so every reference pixel is
// value / 28.36 cqw and the whole composition holds its proportions at any
// width. See "8 · Ecosystem hub" in home-v2.css.
//
// The product art is a soft-feathered patch of the mock (public/img/hv2-hub/,
// same technique as the ecosystem patches): the mock's own copy tails are
// erased from its alpha and its chip rail is painted back out of the artwork,
// so the DOM owns every word on screen and the chips can be translucent over
// the laptop's screen the way the mock's are.

const HubIcon = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5.2h5.2A2.8 2.8 0 0 1 11 8v11a2.2 2.2 0 0 0-2.2-2.2H3V5.2Z" />
      <path d="M21 5.2h-5.2A2.8 2.8 0 0 0 13 8v11a2.2 2.2 0 0 1 2.2-2.2H21V5.2Z" />
    </svg>
  ),
  webinar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4.5" width="18" height="13" rx="2.2" />
      <path d="M10.2 8.9v4.2l3.8-2.1-3.8-2.1Z" fill="currentColor" stroke="none" />
      <path d="M8.5 21h7M12 17.5V21" />
    </svg>
  ),
  guide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7.4A1.4 1.4 0 0 0 6 4.4v15.2A1.4 1.4 0 0 0 7.4 21h9.2a1.4 1.4 0 0 0 1.4-1.4V7l-4-4Z" />
      <path d="M14 3v4h4M9.2 12h5.6M9.2 15.6h5.6" />
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2-2.4 3.6" />
      <circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 12.4c0 3.8-3.8 6.9-8.5 6.9-1 0-2-.15-2.9-.4L4 20.5l1.5-3.5a6.6 6.6 0 0 1-2-4.6C3.5 8.6 7.3 5.5 12 5.5s8.5 3.1 8.5 6.9Z" />
      <path d="M9 11.6h6M9 14.3h3.8" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3.5v10.8M8 10.6l4 4 4-4" />
      <path d="M4.2 17v2.1c0 .8.6 1.4 1.4 1.4h12.8c.8 0 1.4-.6 1.4-1.4V17" />
    </svg>
  ),
} as const;

const CtaArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12h14M12.5 6l6 6-6 6" />
  </svg>
);

type Chip = { label: string; icon: keyof typeof HubIcon };

// Chip boxes are staggered in the mock — each one steps a little further left
// as it follows the laptop's perspective — so every chip carries its own
// left/top (card %) rather than sitting in a plain stack.
const LEARN_CHIPS: (Chip & { l: number; t: number; w: number })[] = [
  { label: "Courses", icon: "book", l: 79.87, t: 29.12, w: 15.80 },
  { label: "Webinars", icon: "webinar", l: 79.80, t: 42.66, w: 15.80 },
  { label: "Guides", icon: "guide", l: 78.81, t: 56.21, w: 15.52 },
  { label: "Quizzes", icon: "quiz", l: 77.60, t: 69.75, w: 15.80 },
];

const SUPPORT_CHIPS: (Chip & { l: number; t: number; w: number })[] = [
  { label: "Help Center", icon: "book", l: 76.68, t: 35.21, w: 18.57 },
  { label: "Live Chat", icon: "chat", l: 76.68, t: 50.11, w: 18.57 },
  { label: "Downloads", icon: "download", l: 76.68, t: 64.67, w: 18.57 },
];

// Row 2 carries no chip rail — copy, rule, CTA and one product patch — so the
// two cards are one component. Only the art's own left/width differs, and that
// lives on the `art.cls` modifier in home-v2.css.
type ActionCard = {
  id: string;
  label: string;
  title: [string, string];
  desc: [string, string];
  cta: string;
  href: string;
  art: { cls: string; src: string; alt: string; w: number; h: number };
};

const ACTION_CARDS: ActionCard[] = [
  {
    id: "store",
    label: "Store",
    title: ["Everything You Need.", "In One Place."],
    desc: ["Resins, accessories and more –", "delivered to your door."],
    cta: "Go to Store",
    href: "/shop",
    art: {
      cls: "hv2-hub-art-store",
      src: "/img/hv2-hub/store-shelf.webp",
      alt: "ODYX resin bottles and a carton on a lit display pedestal with a tooth disc and a clear aligner",
      w: 1034,
      h: 875,
    },
  },
  {
    id: "reg",
    label: "Registration",
    title: ["Register Your Device.", "Stay Protected."],
    desc: ["Activate warranty and get", "the full ODYX experience."],
    cta: "Register Device",
    // Same target the global header's "Register device" uses — /register is
    // the account sign-up route, not device registration.
    href: "/support#register",
    art: {
      cls: "hv2-hub-art-reg",
      src: "/img/hv2-hub/registration-device.webp",
      alt: "An ODYX device on its base behind a glowing shield with a checkmark",
      w: 1003,
      h: 875,
    },
  },
];

function HubActionCard({ card, rv }: { card: ActionCard; rv: number }) {
  return (
    <article className={`hv2-hub-card hv2-hub-act hv2-hub-${card.id} rv`} data-rv={rv}>
      <div className="hv2-hub-copy">
        <p className="hv2-hub-eyebrow">{card.label}</p>
        <h3 className="hv2-hub-h">
          {card.title[0]}
          <br />
          {card.title[1]}
        </h3>
        <span className="hv2-hub-rule" aria-hidden />
        <p className="hv2-hub-d">
          {card.desc[0]}
          <br />
          {card.desc[1]}
        </p>
      </div>
      <a className="hv2-btn hv2-hub-cta" href={card.href}>
        <span>{card.cta}</span>
        <CtaArrow />
      </a>
      <img
        className={`hv2-hub-art ${card.art.cls}`}
        src={card.art.src}
        alt={card.art.alt}
        width={card.art.w}
        height={card.art.h}
        loading="lazy"
        decoding="async"
      />
    </article>
  );
}

export default function HubCardsSection() {
  return (
    <section className="hv2-hub" id="hub" aria-label="Learning, support, store and device registration">
      <div className="hv2-hub-in">
        <div className="hv2-hub-grid">
          {/* ---- Learning ---- */}
          <article className="hv2-hub-card hv2-hub-learn rv" data-rv="1">
            <div className="hv2-hub-copy">
              <p className="hv2-hub-eyebrow">Learning</p>
              <h3 className="hv2-hub-h">
                Grow Your Skills.
                <br />
                Master Digital Dentistry.
              </h3>
              <span className="hv2-hub-rule" aria-hidden />
              <p className="hv2-hub-d">
                Access courses, webinars
                <br />
                and step-by-step guides.
              </p>
            </div>
            <ul className="hv2-hub-chips" aria-label="What the learning centre covers">
              {LEARN_CHIPS.map((c) => (
                <li
                  className="hv2-hub-chip"
                  key={c.label}
                  style={{ "--l": `${c.l}%`, "--t": `${c.t}%`, "--w": `${c.w}%` } as React.CSSProperties}
                >
                  <span className="hv2-hub-chip-ic" aria-hidden>{HubIcon[c.icon]}</span>
                  <span className="hv2-hub-chip-l">{c.label}</span>
                </li>
              ))}
            </ul>
            <a className="hv2-btn hv2-hub-cta" href="/learning">
              <span>Start Learning</span>
              <CtaArrow />
            </a>
            <img
              className="hv2-hub-art hv2-hub-art-learn"
              src="/img/hv2-hub/learning-laptop.webp"
              alt="A laptop showing the ODYX learning centre with a course video ready to play"
              width={863}
              height={886}
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* ---- Support ---- */}
          <article className="hv2-hub-card hv2-hub-support rv" data-rv="2">
            <div className="hv2-hub-copy">
              <p className="hv2-hub-eyebrow">Support</p>
              <h3 className="hv2-hub-h">
                We&rsquo;re Here
                <br />
                When You Need Us.
              </h3>
              <span className="hv2-hub-rule" aria-hidden />
              <p className="hv2-hub-d">
                Get technical support,
                <br />
                resources and live help.
              </p>
            </div>
            <ul className="hv2-hub-chips" aria-label="Ways to get support">
              {SUPPORT_CHIPS.map((c) => (
                <li
                  className="hv2-hub-chip"
                  key={c.label}
                  style={{ "--l": `${c.l}%`, "--t": `${c.t}%`, "--w": `${c.w}%` } as React.CSSProperties}
                >
                  <span className="hv2-hub-chip-ic" aria-hidden>{HubIcon[c.icon]}</span>
                  <span className="hv2-hub-chip-l">{c.label}</span>
                </li>
              ))}
            </ul>
            <a className="hv2-btn hv2-hub-cta" href="/support">
              <span>Get Support</span>
              <CtaArrow />
            </a>
            <img
              className="hv2-hub-art hv2-hub-art-support"
              src="/img/hv2-hub/support-headset.webp"
              alt="An ODYX support headset with a boom microphone on a lit display pedestal"
              width={678}
              height={886}
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* ---- Store / Registration (second row) ---- */}
          {ACTION_CARDS.map((card, i) => (
            <HubActionCard key={card.id} card={card} rv={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
