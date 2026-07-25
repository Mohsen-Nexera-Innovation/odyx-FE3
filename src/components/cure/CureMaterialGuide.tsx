"use client";

import { useState } from "react";

const MATERIALS = [
  {
    id: "crown",
    name: "Crowns & Bridges",
    time: "3–5 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Full polymerization for permanent strength and marginal accuracy.",
    image: "/img/cure-stitch/odyx-cine-crown.webp",
  },
  {
    id: "guide",
    name: "Surgical Guides",
    time: "3 min",
    heat: "38°C",
    wave: "385 + 405 nm",
    note: "Clears residual monomer while preserving dimensional fit.",
    image: "/img/cure-stitch/odyx-cine-guide.webp",
  },
  {
    id: "denture",
    name: "Denture Bases",
    time: "8–10 min",
    heat: "42°C",
    wave: "385 + 405 nm",
    note: "Longer cycle for thicker geometries and biocompatible finish.",
    image: "/img/cure-stitch/odyx-cine-denture.webp",
  },
  {
    id: "model",
    name: "Dental Models",
    time: "2 min",
    heat: "35°C",
    wave: "405 nm",
    note: "Fast surface harden for diagnostic and working models.",
    image: "/img/cure-stitch/odyx-cine-model.webp",
  },
  {
    id: "guard",
    name: "Splints & Guards",
    time: "4 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Balances toughness with clarity for occlusal appliances.",
    image: "/img/cure-stitch/odyx-cine-guard.webp",
  },
  {
    id: "temp",
    name: "Provisionals",
    time: "3 min",
    heat: "40°C",
    wave: "385 + 405 nm",
    note: "Chairside-ready temporaries with stable shade and edge.",
    image: "/img/cure-stitch/odyx-cine-temp.webp",
  },
] as const;

export default function CureMaterialGuide({
  classPrefix = "cure-ed",
}: {
  classPrefix?: "cure-ed" | "cure-fl";
}) {
  const [active, setActive] = useState<(typeof MATERIALS)[number]["id"]>("crown");
  const material = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0];
  const cx = (part: string) => `${classPrefix}-${part}`;

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
          <img src={material.image} alt={material.name} width={640} height={480} />
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
