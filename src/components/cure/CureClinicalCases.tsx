"use client";

import { useState } from "react";

const IMG = "/img/cure-stitch/clinical-cases";

const CASES = [
  {
    id: "crown",
    label: "Crown",
    title: "Full-contour crown",
    note: "Printed green → validated UV cycle → seat-ready finish.",
    before: `${IMG}/case-crown-before.png`,
    curing: `${IMG}/case-crown-curing.png`,
    finished: `${IMG}/case-crown-finished.png`,
    cycle: "3–5 min · 40°C · 385 + 405 nm",
  },
  {
    id: "guide",
    label: "Surgical Guide",
    title: "Surgical guide",
    note: "Dimensional fit held through a controlled dual-wave cure.",
    before: `${IMG}/case-guide-before.png`,
    curing: `${IMG}/case-guide-curing.png`,
    finished: `${IMG}/case-guide-finished.png`,
    cycle: "3 min · 38°C · 385 + 405 nm",
  },
  {
    id: "denture",
    label: "Denture",
    title: "Denture base",
    note: "Thicker geometries get a longer, biocompatible finish cycle.",
    before: `${IMG}/case-denture-before.png`,
    curing: `${IMG}/case-denture-curing.png`,
    finished: `${IMG}/case-denture-finished.png`,
    cycle: "8–10 min · 42°C · 385 + 405 nm",
  },
  {
    id: "splint",
    label: "Splint",
    title: "Splint & night guard",
    note: "Clarity and toughness balanced for occlusal appliances.",
    before: `${IMG}/case-splint-before.png`,
    curing: `${IMG}/case-splint-curing.png`,
    finished: `${IMG}/case-splint-finished.png`,
    cycle: "4 min · 40°C · 385 + 405 nm",
  },
  {
    id: "model",
    label: "Model",
    title: "Dental model",
    note: "Fast surface harden for diagnostic and working models.",
    before: `${IMG}/case-model-before.png`,
    curing: `${IMG}/case-model-curing.png`,
    finished: `${IMG}/case-model-finished.png`,
    cycle: "2 min · 35°C · 405 nm",
  },
] as const;

const STAGES = [
  { key: "before", label: "Before curing" },
  { key: "curing", label: "Curing with UV-02" },
  { key: "finished", label: "Finished restoration" },
] as const;

export default function CureClinicalCases({
  classPrefix = "cure-v4",
}: {
  classPrefix?: "cure-v4" | "cure-v5";
}) {
  const [active, setActive] = useState<(typeof CASES)[number]["id"]>("crown");
  const caseItem = CASES.find((c) => c.id === active) ?? CASES[0];
  const cx = (part: string) => `${classPrefix}-${part}`;

  return (
    <div className={cx("cases")}>
      <div className={cx("cases__tabs")} role="tablist" aria-label="Clinical case type">
        {CASES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active}
            className={`${cx("cases__tab")}${item.id === active ? " is-active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={cx("cases__panel")} role="tabpanel">
        <div className={cx("cases__meta")}>
          <h3>{caseItem.title}</h3>
          <p>{caseItem.note}</p>
          <span className={cx("cases__cycle")}>{caseItem.cycle}</span>
        </div>

        <div className={cx("cases__stages")}>
          {STAGES.map((stage, index) => (
            <figure key={stage.key} className={cx("cases__stage")}>
              <div className={cx("cases__frame")}>
                <img
                  src={caseItem[stage.key]}
                  alt={`${caseItem.title} — ${stage.label}`}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <em>0{index + 1}</em>
                <span>{stage.label}</span>
              </figcaption>
              {index < STAGES.length - 1 ? (
                <span className={cx("cases__arrow")} aria-hidden>
                  →
                </span>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
