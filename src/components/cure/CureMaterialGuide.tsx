"use client";

import { useState } from "react";

const IMG = "/img/cure-stitch/clinical-cases";

const MATERIALS = [
  {
    id: "crown",
    name: "Crowns & Bridges",
    time: "3–5 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Full polymerization for permanent strength and marginal accuracy.",
    image: `${IMG}/case-crown-curing.png`,
    alt: "ODYX Cure UV-02 curing a dental crown inside the amber UV chamber",
  },
  {
    id: "guide",
    name: "Surgical Guides",
    time: "3 min",
    heat: "38°C",
    wave: "385 + 405 nm",
    note: "Clears residual monomer while preserving dimensional fit.",
    image: `${IMG}/case-guide-curing.png`,
    alt: "ODYX Cure UV-02 chamber curing a surgical guide under dual-wave light",
  },
  {
    id: "denture",
    name: "Denture Bases",
    time: "8–10 min",
    heat: "42°C",
    wave: "385 + 405 nm",
    note: "Longer cycle for thicker geometries and biocompatible finish.",
    image: `${IMG}/case-denture-curing.png`,
    alt: "ODYX Cure UV-02 curing a denture base on the rotating platform",
  },
  {
    id: "model",
    name: "Dental Models",
    time: "2 min",
    heat: "35°C",
    wave: "405 nm",
    note: "Fast surface harden for diagnostic and working models.",
    image: `${IMG}/case-model-curing.png`,
    alt: "ODYX Cure UV-02 curing a dental model in the UV chamber",
  },
  {
    id: "guard",
    name: "Splints & Guards",
    time: "4 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Balances toughness with clarity for occlusal appliances.",
    image: `${IMG}/case-splint-curing.png`,
    alt: "ODYX Cure UV-02 curing a splint inside the amber-lit chamber",
  },
  {
    id: "temp",
    name: "Provisionals",
    time: "3 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Chairside-ready temporaries with stable shade and edge.",
    image: `${IMG}/case-temp-curing.png`,
    alt: "ODYX Cure UV-02 curing a provisional restoration with the chamber open",
  },
] as const;

const cx = (part: string) => `cure-${part}`;

export default function CureMaterialGuide() {
  const [active, setActive] = useState<(typeof MATERIALS)[number]["id"]>("crown");
  const material = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0];

  return (
    <div className={cx("guide")}>
      <div className={cx("guide__picker")} role="tablist" aria-label="Material curing profiles">
        {MATERIALS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            className={`${cx("guide__tab")}${item.id === active ? " is-active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className={cx("guide__panel")} role="tabpanel">
        <div className={cx("guide__visual")}>
          <img
            key={material.id}
            src={material.image}
            alt={material.alt}
            width={960}
            height={640}
          />
          <span className={cx("guide__machine")} aria-hidden>
            Cure UV-02
          </span>
        </div>
        <div className={cx("guide__data")}>
          <p className={cx("guide__label")}>Validated cycle</p>
          <h3>{material.name}</h3>
          <p className={cx("guide__note")}>{material.note}</p>
          <dl className={cx("guide__stats")}>
            <div>
              <dt>Time</dt>
              <dd>{material.time}</dd>
            </div>
            <div>
              <dt>Heat</dt>
              <dd>{material.heat}</dd>
            </div>
            <div>
              <dt>Wavelength</dt>
              <dd>{material.wave}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
