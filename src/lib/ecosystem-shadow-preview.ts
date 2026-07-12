import {
  buildSectionBackground,
  DEFAULT_ECO_INACTIVE_OPACITY,
  DEFAULT_ECO_SHADOW_ID,
  getEcosystemShadowOption,
  hexToRgb,
} from '@/content/ecosystem-shadow-options';

export type EcosystemShadowPreviewState = {
  shadowId: string;
  customColor?: string;
  inactiveOpacity?: number;
};

type Rgb = { r: number; g: number; b: number };

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const INK: Rgb = { r: 33, g: 28, b: 29 };

function resolveTintRgb(state: EcosystemShadowPreviewState): Rgb | null {
  const { shadowId, customColor } = state;

  if (shadowId === 'none' || shadowId === DEFAULT_ECO_SHADOW_ID) return null;

  if (shadowId === 'custom' && customColor) {
    return hexToRgb(customColor);
  }

  return getEcosystemShadowOption(shadowId)?.tintRgb ?? null;
}

function resolveSectionBackground(state: EcosystemShadowPreviewState): string | null {
  const { shadowId } = state;
  const intensity = state.inactiveOpacity ?? DEFAULT_ECO_INACTIVE_OPACITY;

  if (shadowId === 'none') return 'transparent';

  const tint = resolveTintRgb(state);
  if (!tint) return null;

  const option = getEcosystemShadowOption(shadowId);
  return buildSectionBackground(tint.r, tint.g, tint.b, intensity, option?.deep);
}

/** Relative luminance 0..1 (sRGB). */
function luminance({ r, g, b }: Rgb): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  const k = Math.min(1, Math.max(0, t));
  return {
    r: Math.round(a.r + (b.r - a.r) * k),
    g: Math.round(a.g + (b.g - a.g) * k),
    b: Math.round(a.b + (b.b - a.b) * k),
  };
}

function chroma({ r, g, b }: Rgb): number {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function rgbCss({ r, g, b }: Rgb, alpha?: number): string {
  if (alpha === undefined) return `rgb(${r}, ${g}, ${b})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function contrastRatio(a: Rgb, b: Rgb): number {
  const L1 = luminance(a);
  const L2 = luminance(b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Build pill chrome from the *resolved* section background so controls
 * always contrast with it (not just reuse the tint, which can vanish into
 * an orange-on-orange / teal-on-teal band).
 */
function applyPillPreviewVars(root: HTMLElement, tint: Rgb | null, sectionBg: string) {
  if (!tint || sectionBg === 'transparent') {
    root.removeAttribute('data-eco-pill-tone');
    root.style.removeProperty('--eco-preview-rgb');
    root.style.removeProperty('--eco-preview-pill-bg');
    root.style.removeProperty('--eco-preview-pill-border');
    root.style.removeProperty('--eco-preview-pill-fill');
    root.style.removeProperty('--eco-preview-pill-fg');
    root.style.removeProperty('--eco-preview-pill-border-on');
    return;
  }

  const bg = hexToRgb(sectionBg);
  if (!bg) {
    root.removeAttribute('data-eco-pill-tone');
    return;
  }

  root.style.setProperty('--eco-preview-rgb', `${tint.r}, ${tint.g}, ${tint.b}`);

  const darkBand = luminance(bg) < 0.45;
  root.setAttribute('data-eco-pill-tone', darkBand ? 'dark' : 'light');

  if (darkBand) {
    // Lift off the dark band with lighter surfaces so pills never match the bg hue 1:1.
    const surface = mix(bg, WHITE, 0.16);
    const border = mix(bg, WHITE, 0.3);
    const fill = mix(bg, WHITE, 0.38);
    const fg = contrastRatio(WHITE, bg) >= 3 ? WHITE : mix(bg, WHITE, 0.92);

    // Active accent: brightened tint when it still reads on the band; else white.
    let accent = mix(bg, WHITE, 0.55);
    if (chroma(tint) > 24) {
      const brightTint = mix(tint, WHITE, luminance(tint) < 0.4 ? 0.35 : 0.08);
      if (contrastRatio(brightTint, bg) >= 1.5) accent = brightTint;
    }

    root.style.setProperty('--eco-preview-pill-bg', rgbCss(surface));
    root.style.setProperty('--eco-preview-pill-border', rgbCss(border));
    root.style.setProperty('--eco-preview-pill-fill', rgbCss(fill));
    root.style.setProperty('--eco-preview-pill-fg', rgbCss(fg));
    root.style.setProperty('--eco-preview-pill-border-on', rgbCss(accent));
    return;
  }

  // Light band: darken toward ink / tint so pills sit on top of pale fills.
  const surface = mix(bg, INK, 0.07);
  const border = mix(bg, mix(tint, INK, 0.35), 0.45);
  let fill = mix(bg, mix(tint, INK, 0.25), 0.55);
  // If tint is too close to the band (high strength orange/sky), force a darker wash.
  if (contrastRatio(fill, bg) < 1.25) {
    fill = mix(bg, INK, 0.2);
  }
  const fg = contrastRatio(INK, bg) >= 3 ? INK : mix(bg, INK, 0.85);

  let accent = mix(tint, INK, luminance(tint) > 0.55 ? 0.35 : 0.12);
  if (contrastRatio(accent, bg) < 1.4) {
    accent = mix(bg, INK, 0.45);
  }

  root.style.setProperty('--eco-preview-pill-bg', rgbCss(surface));
  root.style.setProperty('--eco-preview-pill-border', rgbCss(border));
  root.style.setProperty('--eco-preview-pill-fill', rgbCss(fill));
  root.style.setProperty('--eco-preview-pill-fg', rgbCss(fg));
  root.style.setProperty('--eco-preview-pill-border-on', rgbCss(accent));
}

export function applyEcosystemShadowPreview(state: EcosystemShadowPreviewState) {
  const root = document.documentElement;

  if (state.shadowId === DEFAULT_ECO_SHADOW_ID) {
    clearEcosystemShadowPreview();
    return;
  }

  const sectionBg = resolveSectionBackground(state);
  if (!sectionBg) {
    clearEcosystemShadowPreview();
    return;
  }

  const intensity = state.inactiveOpacity ?? DEFAULT_ECO_INACTIVE_OPACITY;
  const tint = resolveTintRgb(state);

  root.setAttribute('data-eco-shadow-preview', state.shadowId);
  root.style.setProperty('--eco-preview-section-bg', sectionBg);
  root.style.setProperty('--eco-preview-intensity', String(intensity));
  applyPillPreviewVars(root, tint, sectionBg);
}

export function clearEcosystemShadowPreview() {
  const root = document.documentElement;
  root.removeAttribute('data-eco-shadow-preview');
  root.removeAttribute('data-eco-pill-tone');
  root.style.removeProperty('--eco-preview-section-bg');
  root.style.removeProperty('--eco-preview-intensity');
  root.style.removeProperty('--eco-preview-rgb');
  root.style.removeProperty('--eco-preview-pill-bg');
  root.style.removeProperty('--eco-preview-pill-border');
  root.style.removeProperty('--eco-preview-pill-fill');
  root.style.removeProperty('--eco-preview-pill-fg');
  root.style.removeProperty('--eco-preview-pill-border-on');
}
