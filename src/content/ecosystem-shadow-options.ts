export type EcosystemShadowOption = {
  id: string;
  label: string;
  shadow: string | null;
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
    label: 'Recommended (navy soft)',
    shadow: '0 24px 56px rgba(8, 80, 130, 0.16)',
    swatch: 'rgba(8, 80, 130, 0.16)',
  },
  {
    id: 'black',
    label: 'Black (original)',
    shadow: '0 30px 90px rgba(0, 0, 0, 0.5)',
    swatch: 'rgba(0, 0, 0, 0.5)',
  },
  {
    id: 'deep-black',
    label: 'Deep black',
    shadow: '0 30px 90px rgba(0, 0, 0, 0.65)',
    swatch: 'rgba(0, 0, 0, 0.65)',
  },
  {
    id: 'sky',
    label: 'Sky glow',
    shadow: '0 28px 64px rgba(6, 165, 223, 0.18)',
    swatch: 'rgba(6, 165, 223, 0.18)',
  },
  {
    id: 'orange',
    label: 'Orange glow',
    shadow: '0 28px 64px rgba(255, 132, 0, 0.16)',
    swatch: 'rgba(255, 132, 0, 0.16)',
  },
  {
    id: 'teal',
    label: 'Teal glow',
    shadow: '0 28px 64px rgba(13, 150, 150, 0.16)',
    swatch: 'rgba(13, 150, 150, 0.16)',
  },
  {
    id: 'none',
    label: 'None',
    shadow: 'none',
    swatch: 'transparent',
  },
  {
    id: 'custom',
    label: 'Custom color',
    shadow: null,
  },
];

export function getEcosystemShadowOption(id: string): EcosystemShadowOption | undefined {
  return ECOSYSTEM_SHADOW_OPTIONS.find((opt) => opt.id === id);
}

export function buildCustomShadow(r: number, g: number, b: number, alpha = 0.18): string {
  return `0 28px 64px rgba(${r}, ${g}, ${b}, ${alpha})`;
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
