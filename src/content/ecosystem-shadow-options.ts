export type EcosystemShadowOption = {
  id: string;
  label: string;
  /** RGB tint for the section background; null = site default */
  tintRgb: { r: number; g: number; b: number } | null;
  /** Stronger tint multiplier for deep variants */
  deep?: boolean;
  swatch?: string;
};

export const DEFAULT_ECO_SHADOW_ID = 'recommended';
export const DEFAULT_ECO_INACTIVE_OPACITY = 0.62;

export const ECO_SHADOW_STORAGE_KEY = 'odyx-eco-shadow-preview';
export const ECO_INACTIVE_OPACITY_STORAGE_KEY = 'odyx-eco-inactive-opacity';
export const ECO_CUSTOM_COLOR_STORAGE_KEY = 'odyx-eco-custom-shadow-color';

export const ECOSYSTEM_SHADOW_OPTIONS: EcosystemShadowOption[] = [
  {
    id: DEFAULT_ECO_SHADOW_ID,
    label: 'Recommended (default)',
    tintRgb: null,
    swatch: 'linear-gradient(135deg, #f0f7fc, #e2f0f9)',
  },
  {
    id: 'black',
    label: 'Black',
    tintRgb: { r: 0, g: 0, b: 0 },
    swatch: '#000000',
  },
  {
    id: 'deep-black',
    label: 'Deep black',
    tintRgb: { r: 33, g: 28, b: 29 },
    deep: true,
    swatch: '#211C1D',
  },
  {
    id: 'sky',
    label: 'Sky',
    tintRgb: { r: 6, g: 165, b: 223 },
    swatch: '#06a5df',
  },
  {
    id: 'orange',
    label: 'Orange',
    tintRgb: { r: 255, g: 132, b: 0 },
    swatch: '#ff8400',
  },
  {
    id: 'teal',
    label: 'Teal',
    tintRgb: { r: 13, g: 150, b: 150 },
    swatch: '#0d9696',
  },
  {
    id: 'none',
    label: 'None (transparent)',
    tintRgb: null,
    swatch: 'transparent',
  },
  {
    id: 'custom',
    label: 'Custom color',
    tintRgb: null,
  },
];

export function getEcosystemShadowOption(id: string): EcosystemShadowOption | undefined {
  return ECOSYSTEM_SHADOW_OPTIONS.find((opt) => opt.id === id);
}

function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
}

/** Paper token — matches `--paper` (#f5fafd) */
const PAPER_RGB = { r: 245, g: 250, b: 253 };

function lerpChannel(from: number, to: number, t: number): number {
  return Math.round(from + (to - from) * t);
}

/**
 * Section fill from the chosen tint.
 * Uses a flat solid (paper → tint) blend so black reads as black, not a shadow wash.
 */
export function buildSectionBackground(
  r: number,
  g: number,
  b: number,
  intensity = DEFAULT_ECO_INACTIVE_OPACITY,
  deep = false,
): string {
  const t = Math.min(1, Math.max(0, intensity * (deep ? 1.08 : 1)));

  // Full strength — exact target color
  if (t >= 0.98) return toHex(r, g, b);

  // Solid blend from paper to tint (no translucent overlay on top of the section)
  const sr = lerpChannel(PAPER_RGB.r, r, t);
  const sg = lerpChannel(PAPER_RGB.g, g, t);
  const sb = lerpChannel(PAPER_RGB.b, b, t);
  return toHex(sr, sg, sb);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return null;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
}
