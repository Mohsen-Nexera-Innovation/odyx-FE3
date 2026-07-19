'use client';

import { useMemo } from 'react';

/** Interactive odontogram — FDI (two-digit) notation, multi-select. */

const UPPER: number[] = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER: number[] = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const DISPLAY_ORDER = [...UPPER, ...LOWER];

const TYPE_LABEL: Record<number, string> = {
  1: 'central incisor',
  2: 'lateral incisor',
  3: 'canine',
  4: 'first premolar',
  5: 'second premolar',
  6: 'first molar',
  7: 'second molar',
  8: 'third molar',
};

const QUADRANT_LABEL: Record<number, string> = {
  1: 'upper right',
  2: 'upper left',
  3: 'lower left',
  4: 'lower right',
};

function toothName(fdi: number) {
  return `Tooth ${fdi} — ${QUADRANT_LABEL[Math.floor(fdi / 10)]} ${TYPE_LABEL[fdi % 10]}`;
}

/** Molars widest, incisors narrowest — mirrors real crown proportions. */
function toothWidth(fdi: number) {
  const t = fdi % 10;
  if (t >= 6) return 33;
  if (t >= 4) return 29;
  if (t === 3) return 27;
  return 25;
}

/** Extract FDI tooth numbers (11–48) from free text like "#14, 24". */
export function parseFdiTeeth(value: string): number[] {
  const found = new Set<number>();
  for (const m of value.matchAll(/\b([1-4][1-8])\b/g)) found.add(Number(m[1]));
  return DISPLAY_ORDER.filter((t) => found.has(t));
}

type ToothPos = { fdi: number; x: number; y: number; rot: number };

function archPositions(teeth: number[], upper: boolean): ToothPos[] {
  const cx = 230;
  const rx = 186;
  const ry = 156;
  const baseY = upper ? 196 : 224;
  return teeth.map((fdi, i) => {
    const a = Math.PI - (Math.PI * (i + 0.5)) / 16;
    const x = cx + rx * Math.cos(a);
    const y = upper ? baseY - ry * Math.sin(a) : baseY + ry * Math.sin(a);
    const deg = (a * 180) / Math.PI;
    const rot = upper ? 90 - deg : deg - 90;
    return { fdi, x, y, rot };
  });
}

const POSITIONS: ToothPos[] = [...archPositions(UPPER, true), ...archPositions(LOWER, false)];

type ToothChartSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ToothChartSelector({ value, onChange }: ToothChartSelectorProps) {
  const selected = useMemo(() => new Set(parseFdiTeeth(value)), [value]);

  const toggle = (fdi: number) => {
    const next = new Set(selected);
    if (next.has(fdi)) next.delete(fdi);
    else next.add(fdi);
    onChange(
      DISPLAY_ORDER.filter((t) => next.has(t))
        .map((t) => `#${t}`)
        .join(', '),
    );
  };

  return (
    <div className="tooth-chart">
      <div className="tooth-chart-head">
        <span className="tooth-chart-hint">Tap teeth to select · FDI notation</span>
        {selected.size > 0 ? (
          <button type="button" className="tooth-chart-clear" onClick={() => onChange('')}>
            Clear {selected.size} selected
          </button>
        ) : null}
      </div>

      <svg
        className="tooth-chart-svg"
        viewBox="0 0 460 420"
        role="group"
        aria-label="Tooth chart (FDI notation)"
      >
        <text className="tc-arch-label" x="230" y="152" textAnchor="middle">
          Upper
        </text>
        <text className="tc-arch-label" x="230" y="278" textAnchor="middle">
          Lower
        </text>
        <text className="tc-side-label" x="14" y="214" textAnchor="middle">
          R
        </text>
        <text className="tc-side-label" x="446" y="214" textAnchor="middle">
          L
        </text>
        <line className="tc-midline" x1="230" y1="18" x2="230" y2="60" />
        <line className="tc-midline" x1="230" y1="360" x2="230" y2="402" />

        {POSITIONS.map(({ fdi, x, y, rot }) => {
          const w = toothWidth(fdi);
          const h = 38;
          const isSelected = selected.has(fdi);
          return (
            <g
              key={fdi}
              className={`tc-tooth${isSelected ? ' is-selected' : ''}`}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})`}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={toothName(fdi)}
              tabIndex={0}
              onClick={() => toggle(fdi)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(fdi);
                }
              }}
            >
              <title>{toothName(fdi)}</title>
              <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="9" />
              <text transform={`rotate(${(-rot).toFixed(1)})`} textAnchor="middle" dy="3.5">
                {fdi}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
