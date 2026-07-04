export type FontFamilyOption = {
  id: string;
  label: string;
  // CSS values applied to the --font-display / --font-body tokens.
  // null on the default option so we clear any override.
  display: string | null;
  body: string | null;
  // Short preview used in the picker swatch.
  sample?: string;
};

export type FontSizeOption = {
  id: string;
  label: string;
  // Root font-size; drives every rem-based size across the site.
  // null on the default option so we clear any override.
  scale: string | null;
};

export const DEFAULT_FONT_FAMILY_ID = 'brand';
export const DEFAULT_FONT_SIZE_ID = 'md';

export const FONT_FAMILY_OPTIONS: FontFamilyOption[] = [
  {
    id: DEFAULT_FONT_FAMILY_ID,
    label: 'ODYX signature (Sora / Space Grotesk)',
    display: null,
    body: null,
  },
  {
    id: 'inter',
    label: 'Modern (Inter)',
    display: "var(--font-inter), 'Inter', sans-serif",
    body: "var(--font-inter), 'Inter', sans-serif",
  },
  {
    id: 'manrope',
    label: 'Clean (Manrope)',
    display: "var(--font-manrope), 'Manrope', sans-serif",
    body: "var(--font-manrope), 'Manrope', sans-serif",
  },
  {
    id: 'poppins',
    label: 'Geometric (Poppins)',
    display: "var(--font-poppins), 'Poppins', sans-serif",
    body: "var(--font-poppins), 'Poppins', sans-serif",
  },
  {
    id: 'editorial',
    label: 'Editorial (Playfair / Lora)',
    display: "var(--font-playfair), 'Playfair Display', serif",
    body: "var(--font-lora), 'Lora', serif",
  },
  {
    id: 'display-serif',
    label: 'Display serif (Playfair / Inter)',
    display: "var(--font-playfair), 'Playfair Display', serif",
    body: "var(--font-inter), 'Inter', sans-serif",
  },
  {
    id: 'system',
    label: 'Native system',
    display:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
];

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { id: 'xs', label: 'Compact', scale: '87.5%' },
  { id: 'sm', label: 'Small', scale: '93.75%' },
  { id: DEFAULT_FONT_SIZE_ID, label: 'Default', scale: null },
  { id: 'lg', label: 'Large', scale: '106.25%' },
  { id: 'xl', label: 'Extra large', scale: '112.5%' },
];

export function getFontFamilyOption(id: string): FontFamilyOption | undefined {
  return FONT_FAMILY_OPTIONS.find((o) => o.id === id);
}

export function getFontSizeOption(id: string): FontSizeOption | undefined {
  return FONT_SIZE_OPTIONS.find((o) => o.id === id);
}

export const FONT_FAMILY_STORAGE_KEY = 'odyx-font-family';
export const FONT_SIZE_STORAGE_KEY = 'odyx-font-size';
