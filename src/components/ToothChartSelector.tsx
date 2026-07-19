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

/** Extract FDI tooth numbers (11–48) from free text like "#14, 24". */
export function parseFdiTeeth(value: string): number[] {
  const found = new Set<number>();
  for (const m of value.matchAll(/\b([1-4][1-8])\b/g)) found.add(Number(m[1]));
  return DISPLAY_ORDER.filter((t) => found.has(t));
}

/* ---------------------------------------------------------------------------
 * Anatomy: average crown dimensions in mm, [mesiodistal, buccolingual],
 * keyed by tooth position (FDI last digit). Real mouths have wide central
 * incisors, narrow lower incisors and big deep molars — using the true
 * ratios is what makes the chart read as a real dentition.
 * ------------------------------------------------------------------------ */
const UPPER_MM: Record<number, [number, number]> = {
  1: [8.5, 7.0],
  2: [6.5, 6.3],
  3: [7.6, 8.0],
  4: [7.0, 9.0],
  5: [6.8, 9.0],
  6: [10.0, 11.0],
  7: [9.5, 11.0],
  8: [8.5, 10.5],
};
const LOWER_MM: Record<number, [number, number]> = {
  1: [5.3, 6.0],
  2: [5.9, 6.4],
  3: [6.9, 7.5],
  4: [7.0, 7.8],
  5: [7.3, 8.0],
  6: [11.0, 10.5],
  7: [10.5, 10.0],
  8: [9.5, 10.0],
};

/* ---------------------------------------------------------------------------
 * Arch curves. Real dental arches are narrow, deep horseshoes (nearly as
 * deep as they are wide), not shallow half-circles — these ellipses are
 * taller than wide-half, giving steep sides and a rounded front like the
 * occlusal view of a real mouth. Teeth are placed by true arc length so
 * they stay in tight contact all the way around.
 * ------------------------------------------------------------------------ */
const CX = 230;
const UPPER_ARCH = { rx: 140, ry: 165, baseY: 210 };
const LOWER_ARCH = { rx: 132, ry: 168, baseY: 250 };
const KD = 3.1; // buccolingual (radial) mm→px
const ARC_FILL = 0.93; // teeth cover ~93% of the arch, tiny gaps between crowns

type Pt = { x: number; y: number };
type ToothPos = { fdi: number; x: number; y: number; rot: number };

function sampleArch(upper: boolean, steps = 256): Pt[] {
  const { rx, ry, baseY } = upper ? UPPER_ARCH : LOWER_ARCH;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI - (Math.PI * i) / steps; // left end → right end
    const x = CX + rx * Math.cos(a);
    const y = upper ? baseY - ry * Math.sin(a) : baseY + ry * Math.sin(a);
    pts.push({ x, y });
  }
  return pts;
}

function buildArch(teeth: number[], upper: boolean): { pos: ToothPos[]; pxPerMm: number } {
  const pts = sampleArch(upper);
  const cumLen: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    cumLen.push(cumLen[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const arcLen = cumLen[cumLen.length - 1];

  const mm = upper ? UPPER_MM : LOWER_MM;
  const widths = teeth.map((f) => mm[f % 10][0]);
  const totalMm = widths.reduce((s, w) => s + w, 0);
  const pxPerMm = (arcLen * ARC_FILL) / totalMm;

  let cum = 0;
  const pos = teeth.map((fdi, i) => {
    const s = ((cum + widths[i] / 2) / totalMm) * arcLen;
    cum += widths[i];
    let j = 1;
    while (j < cumLen.length - 1 && cumLen[j] < s) j++;
    const t = (s - cumLen[j - 1]) / (cumLen[j] - cumLen[j - 1] || 1);
    const x = pts[j - 1].x + (pts[j].x - pts[j - 1].x) * t;
    const y = pts[j - 1].y + (pts[j].y - pts[j - 1].y) * t;
    const rot =
      (Math.atan2(pts[j].y - pts[j - 1].y, pts[j].x - pts[j - 1].x) * 180) / Math.PI;
    return { fdi, x, y, rot };
  });
  return { pos, pxPerMm };
}

const UPPER_BUILD = buildArch(UPPER, true);
const LOWER_BUILD = buildArch(LOWER, false);
const POSITIONS: ToothPos[] = [...UPPER_BUILD.pos, ...LOWER_BUILD.pos];

function crownSize(fdi: number): { w: number; h: number } {
  const upper = fdi < 30;
  const [wMm, dMm] = (upper ? UPPER_MM : LOWER_MM)[fdi % 10];
  return { w: wMm * (upper ? UPPER_BUILD.pxPerMm : LOWER_BUILD.pxPerMm), h: dMm * KD };
}

/**
 * Organic crown outline (occlusal view) centered at origin — a smooth blob
 * through 4 anchor points. `pinch` narrows the side mid-points so molar
 * corners bulge into a lobed, waisted silhouette like a real crown.
 */
function crownBlob(w: number, h: number, c1: number, c2: number, pinch: number): string {
  const hw = w / 2;
  const hh = h / 2;
  const px = (hw * (1 - pinch)).toFixed(1);
  const cx = (hw * c1).toFixed(1);
  const cy = (hh * c2).toFixed(1);
  return [
    `M 0 ${-hh.toFixed(1)}`,
    `C ${cx} ${-hh.toFixed(1)} ${px} ${-cy} ${px} 0`,
    `C ${px} ${cy} ${cx} ${hh.toFixed(1)} 0 ${hh.toFixed(1)}`,
    `C -${cx} ${hh.toFixed(1)} -${px} ${cy} -${px} 0`,
    `C -${px} ${-cy} -${cx} ${-hh.toFixed(1)} 0 ${-hh.toFixed(1)}`,
    'Z',
  ].join(' ');
}

function toothPath(fdi: number): string {
  const { w, h } = crownSize(fdi);
  const t = fdi % 10;
  if (t >= 6) return crownBlob(w, h, 0.95, 0.78, 0.08); // molar: lobed, waisted
  if (t >= 4) return crownBlob(w, h, 0.86, 0.78, 0.03); // premolar: plump oval
  if (t === 3) return crownBlob(w, h, 0.62, 0.88, -0.02); // canine: pointed diamond
  return crownBlob(w, h, 0.85, 0.68, 0); // incisor: wide thin lens
}

/** Occlusal fissures / ridges — the detail lines inside each crown. */
function groovePath(fdi: number): string | null {
  const { w, h } = crownSize(fdi);
  const t = fdi % 10;
  if (t >= 6) {
    // molar: central fissure with Y-shaped ends
    const x = (w * 0.22).toFixed(1);
    const bx = (w * 0.36).toFixed(1);
    const by = (h * 0.2).toFixed(1);
    return `M -${x} 0 H ${x} M -${x} 0 L -${bx} -${by} M -${x} 0 L -${bx} ${by} M ${x} 0 L ${bx} -${by} M ${x} 0 L ${bx} ${by}`;
  }
  if (t >= 4) {
    // premolar: short central groove
    const x = (w * 0.2).toFixed(1);
    return `M -${x} 0 H ${x}`;
  }
  if (t === 3) {
    // canine: buccolingual ridge
    const y = (h * 0.22).toFixed(1);
    return `M 0 -${y} V ${y}`;
  }
  // incisor: incisal edge
  const x = (w * 0.3).toFixed(1);
  return `M -${x} 0 H ${x}`;
}

/* Gums — offset outward/inward from the tooth centerline arches above.
 * Upper: filled horseshoe dome with darker palate; lower: deep U band. */
const UPPER_GUM = 'M 58 210 A 172 196 0 0 1 402 210 C 340 226 120 226 58 210 Z';
const UPPER_PALATE = 'M 122 210 A 108 127 0 0 1 338 210 C 292 220 168 220 122 210 Z';
const LOWER_GUM = 'M 66 250 A 164 200 0 0 0 394 250 L 326 250 A 96 128 0 0 1 134 250 Z';

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
        viewBox="0 0 460 460"
        role="group"
        aria-label="Tooth chart (FDI notation)"
      >
        <g className="tc-gums" aria-hidden>
          <path className="tc-gum" d={UPPER_GUM} />
          <path className="tc-palate" d={UPPER_PALATE} />
          <path className="tc-gum" d={LOWER_GUM} />
        </g>

        <text className="tc-arch-label tc-arch-label--on-gum" x="230" y="168" textAnchor="middle">
          Upper
        </text>
        <text className="tc-arch-label" x="230" y="310" textAnchor="middle">
          Lower
        </text>
        <text className="tc-side-label" x="34" y="236" textAnchor="middle">
          R
        </text>
        <text className="tc-side-label" x="426" y="236" textAnchor="middle">
          L
        </text>

        {POSITIONS.map(({ fdi, x, y, rot }) => {
          const isSelected = selected.has(fdi);
          const groove = groovePath(fdi);
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
              <path className="tc-crown" d={toothPath(fdi)} />
              {groove ? <path className="tc-groove" d={groove} /> : null}
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
