"use client";

import { useState } from "react";
import Link from "next/link";

// Clinical Applications — the mock's layered card deck: left copy column and
// a five-card stack that recedes to the left behind a large active card.
// Geometry is dimensioned against the client reference at a 2048px viewport
// (1828px content container, 680x585 card box) and carried in cqw off
// .hv2-ca-in, so every offset holds its proportion at any width. See the
// "6 · Clinical applications" block in home-v2.css.

type ClinicalApplication = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const APPLICATIONS: ClinicalApplication[] = [
  {
    id: "restorative",
    title: "Restorative",
    description: "From crowns to veneers,\nperfect esthetics and\nlasting durability.",
    image: "/img/hv2-clinical/restorative.webp",
    alt: "Ceramic crowns and a posterior bridge on a dark studio surface",
  },
  {
    id: "prosthetics",
    title: "Prosthetics",
    description: "Complete and partial\ndentures with a natural,\nlifelike finish.",
    image: "/img/hv2-clinical/prosthetics.webp",
    alt: "A full upper and lower denture set photographed against a dark background",
  },
  {
    id: "implant",
    title: "Implant",
    description: "Surgical guides for\naccurate planning and\nprecise placement.",
    image: "/img/hv2-clinical/implant-dentistry.webp",
    alt: "A printed implant surgical guide seated on a dental model",
  },
  {
    id: "models",
    title: "Models",
    description: "High-precision arches\nfor predictable try-ins\nand provisionals.",
    image: "/img/hv2-clinical/dental-models.webp",
    alt: "A sectioned dental model carrying finished crowns",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Clear aligners and\nretainers for lasting\nresults.",
    image: "/img/hv2-clinical/clear-aligners.webp",
    alt: "Clear orthodontic aligners in front of two printed arch models",
  },
];

const N = APPLICATIONS.length;
const mod = (v: number) => ((v % N) + N) % N;

const Tooth = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 2.6c-3 0-4.9 1.4-7.2 1.4S11 2.6 8.1 2.6C3.7 2.6 1.6 6.5 1.6 11c0 3.3 1 5.8 2.1 9.3 1.1 3.3 1.6 6.5 2 10.8.4 3.6.9 8.3 3.1 8.3 2.2 0 2.7-3.3 3.4-6.4.6-2.8 1.2-5.3 3.8-5.3s3.2 2.5 3.8 5.3c.7 3.1 1.2 6.4 3.4 6.4 2.2 0 2.7-4.7 3.1-8.3.4-4.3.9-7.5 2-10.8 1.1-3.5 2.1-6 2.1-9.3 0-4.5-2.1-8.4-6.5-8.4Z" transform="translate(5 4)" />
  </svg>
);

export default function ClinicalApplicationsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="hv2-ca" id="applications" aria-labelledby="hv2-ca-h">
      <div className="hv2-ca-in">
        <div className="hv2-ca-copy rv" data-rv="1">
          <p className="hv2-eyebrow hv2-ca-eyebrow">Clinical Applications</p>
          <h2 className="hv2-h2 hv2-ca-h" id="hv2-ca-h">
            Solutions for
            <br />
            Every Need<span className="hv2-blue">.</span>
          </h2>
          <span className="hv2-ca-rule" aria-hidden />
          <p className="hv2-ca-lead">
            Discover how ODYX fits into
            <br />
            every clinical indication.
          </p>
          <Link className="hv2-btn hv2-ca-cta" href="/workflows">
            <span>Explore All Applications</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="hv2-ca-stage rv" data-rv="2">
          {/* aria-roledescription needs a real role to attach to. */}
          <div className="hv2-ca-deck" role="group" aria-roledescription="carousel" aria-label="Clinical applications">
            {APPLICATIONS.map((a, i) => {
              const slot = mod(i - active);
              return (
                <article
                  className={`hv2-ca-card hv2-ca-${a.id}`}
                  key={a.id}
                  data-slot={slot}
                  aria-hidden={slot !== 0 ? true : undefined}
                >
                  <img
                    className="hv2-ca-art"
                    src={a.image}
                    alt={slot === 0 ? a.alt : ""}
                    width={1400}
                    height={1204}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="hv2-ca-scrim" aria-hidden />
                  <div className="hv2-ca-cbody">
                    <span className="hv2-ca-ic" aria-hidden>
                      <Tooth />
                    </span>
                    <h3 className="hv2-ca-t">{a.title}</h3>
                    <span className="hv2-ca-t-rule" aria-hidden />
                    <p className="hv2-ca-d">{a.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="hv2-nav hv2-ca-nav hv2-ca-nav-prev"
            aria-label="Previous application"
            onClick={() => setActive((a) => mod(a - 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hv2-nav hv2-ca-nav hv2-ca-nav-next"
            aria-label="Next application"
            onClick={() => setActive((a) => mod(a + 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
