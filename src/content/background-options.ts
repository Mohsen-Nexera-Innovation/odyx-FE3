export type BackgroundOption = {
  id: string;
  label: string;
  value: string | null;
};

export type BackgroundGroup = {
  label: string;
  options: BackgroundOption[];
};

export const DEFAULT_BG_ID = 'default';

export const BACKGROUND_GROUPS: BackgroundGroup[] = [
  {
    label: 'Default',
    options: [{ id: DEFAULT_BG_ID, label: 'Site default (sky light)', value: null }],
  },
  {
    label: 'Solid colors',
    options: [
      { id: 'solid-white', label: 'Pure white', value: '#ffffff' },
      { id: 'solid-paper', label: 'Off-white paper', value: '#f5fafd' },
      { id: 'solid-sky-light', label: 'Light sky', value: '#eef6fc' },
      { id: 'solid-sky', label: 'Sky blue', value: '#06a5df' },
      { id: 'solid-sky-soft', label: 'Soft sky', value: '#7fd0f3' },
      { id: 'solid-teal', label: 'Teal', value: '#0d9696' },
      { id: 'solid-mint', label: 'Mint', value: '#e8f7f5' },
      { id: 'solid-navy', label: 'Navy', value: '#15263f' },
      { id: 'solid-navy-deep', label: 'Navy deep', value: '#0d1a2e' },
      { id: 'solid-orange', label: 'Orange', value: '#ff8400' },
      { id: 'solid-orange-tint', label: 'Orange tint', value: '#fff4e8' },
      { id: 'solid-warm-grey', label: 'Warm grey', value: '#e8e8ec' },
      { id: 'solid-cool-grey', label: 'Cool grey', value: '#dce4ea' },
      { id: 'solid-slate', label: 'Slate', value: '#10283a' },
    ],
  },
  {
    label: 'Linear gradients',
    options: [
      {
        id: 'linear-sky-fade',
        label: 'Sky fade (current)',
        value:
          'radial-gradient(1100px 680px at 12% 8%, rgba(6,165,223,.10), transparent 58%), radial-gradient(900px 560px at 88% 18%, rgba(6,165,223,.06), transparent 55%), linear-gradient(180deg, #f5fafd 0%, #eef6fc 40%, #e9f4fb 70%, #f5fafd 100%)',
      },
      {
        id: 'linear-navy-depth',
        label: 'Navy depth',
        value:
          'linear-gradient(165deg, #0d1a2e 0%, #0b1728 45%, #15263f 100%)',
      },
      {
        id: 'linear-dawn',
        label: 'Dawn (warm → cool)',
        value: 'linear-gradient(180deg, #fff8f0 0%, #eef6fc 55%, #e4f0f9 100%)',
      },
      {
        id: 'linear-sunset',
        label: 'Sunset (orange → navy)',
        value: 'linear-gradient(135deg, #ff8400 0%, #ffa340 28%, #15263f 100%)',
      },
      {
        id: 'linear-ocean',
        label: 'Ocean (teal → navy)',
        value: 'linear-gradient(160deg, #16b3b3 0%, #0d9696 35%, #0d1a2e 100%)',
      },
      {
        id: 'linear-mint',
        label: 'Mint fresh',
        value: 'linear-gradient(180deg, #f0fdf9 0%, #e6f7f3 50%, #dff3ee 100%)',
      },
      {
        id: 'linear-purple-haze',
        label: 'Purple haze',
        value: 'linear-gradient(145deg, #ede9fe 0%, #e0e7ff 45%, #dbeafe 100%)',
      },
      {
        id: 'linear-diagonal-sky',
        label: 'Diagonal sky',
        value: 'linear-gradient(135deg, #f5fafd 0%, #06a5df 100%)',
      },
      {
        id: 'linear-horizontal-bands',
        label: 'Horizontal bands',
        value:
          'linear-gradient(180deg, #f5fafd 0%, #eef6fc 25%, #e9f4fb 50%, #eef6fc 75%, #f5fafd 100%)',
      },
    ],
  },
  {
    label: 'Radial gradients',
    options: [
      {
        id: 'radial-sky-glow',
        label: 'Sky glow center',
        value: 'radial-gradient(circle at 50% 40%, rgba(6,165,223,.35), #f5fafd 70%)',
      },
      {
        id: 'radial-orange-spot',
        label: 'Orange spotlight',
        value: 'radial-gradient(circle at 30% 20%, rgba(255,132,0,.28), #f5fafd 65%)',
      },
      {
        id: 'radial-teal-corner',
        label: 'Teal corner',
        value: 'radial-gradient(ellipse at 0% 0%, rgba(13,150,150,.22), #f5fafd 60%)',
      },
      {
        id: 'radial-dual-glow',
        label: 'Dual glow (sky + orange)',
        value:
          'radial-gradient(900px 600px at 15% 10%, rgba(6,165,223,.18), transparent 55%), radial-gradient(800px 500px at 85% 20%, rgba(255,132,0,.12), transparent 50%), #f5fafd',
      },
      {
        id: 'radial-navy-vignette',
        label: 'Navy vignette',
        value: 'radial-gradient(ellipse at center, #244066 0%, #0d1a2e 100%)',
      },
    ],
  },
  {
    label: 'Mesh & multi-stop',
    options: [
      {
        id: 'mesh-site-bg',
        label: 'Site mesh (navy + accents)',
        value:
          'radial-gradient(1400px 900px at 70% -8%, rgba(13,150,150,.08), transparent 52%), radial-gradient(1200px 800px at 10% 40%, rgba(255,132,0,.05), transparent 50%), linear-gradient(165deg, #0d1a2e 0%, #0b1728 45%, #15263f 100%)',
      },
      {
        id: 'mesh-sky-mesh',
        label: 'Sky mesh (light)',
        value:
          'radial-gradient(1100px 680px at 12% 8%, rgba(6,165,223,.14), transparent 58%), radial-gradient(900px 560px at 88% 18%, rgba(6,165,223,.08), transparent 55%), radial-gradient(700px 400px at 50% 90%, rgba(13,150,150,.06), transparent 60%), linear-gradient(180deg, #f5fafd, #eef6fc)',
      },
      {
        id: 'mesh-aurora',
        label: 'Aurora',
        value:
          'radial-gradient(800px 500px at 20% 30%, rgba(13,150,150,.20), transparent 55%), radial-gradient(700px 450px at 80% 25%, rgba(6,165,223,.18), transparent 50%), radial-gradient(600px 400px at 50% 80%, rgba(127,208,243,.15), transparent 55%), linear-gradient(180deg, #0d1a2e, #15263f)',
      },
      {
        id: 'mesh-warm-cool',
        label: 'Warm / cool split',
        value:
          'radial-gradient(900px 600px at 0% 50%, rgba(255,132,0,.12), transparent 55%), radial-gradient(900px 600px at 100% 50%, rgba(6,165,223,.14), transparent 55%), #f5fafd',
      },
      {
        id: 'mesh-clinical',
        label: 'Clinical clean',
        value:
          'radial-gradient(1000px 600px at 50% 0%, rgba(255,255,255,.9), transparent 60%), linear-gradient(180deg, #eef6fc 0%, #f5fafd 100%)',
      },
    ],
  },
  {
    label: 'Patterns & textures',
    options: [
      {
        id: 'pattern-dot-grid',
        label: 'Dot grid',
        value:
          'radial-gradient(circle, rgba(6,165,223,.18) 1px, transparent 1px), #f5fafd',
      },
      {
        id: 'pattern-line-grid',
        label: 'Line grid',
        value:
          'linear-gradient(rgba(6,165,223,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,165,223,.08) 1px, transparent 1px), #f5fafd',
      },
      {
        id: 'pattern-diagonal',
        label: 'Diagonal stripes',
        value:
          'repeating-linear-gradient(135deg, rgba(6,165,223,.06) 0 2px, transparent 2px 14px), #f5fafd',
      },
      {
        id: 'pattern-crosshatch',
        label: 'Crosshatch',
        value:
          'repeating-linear-gradient(45deg, rgba(16,40,58,.04) 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, rgba(16,40,58,.04) 0 1px, transparent 1px 12px), #eef6fc',
      },
      {
        id: 'pattern-noise-light',
        label: 'Noise grain (light)',
        value:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.08\'/%3E%3C/svg%3E"), #f5fafd',
      },
      {
        id: 'pattern-noise-dark',
        label: 'Noise grain (dark)',
        value:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.12\'/%3E%3C/svg%3E"), #0d1a2e',
      },
    ],
  },
];

export const ALL_BACKGROUND_OPTIONS = BACKGROUND_GROUPS.flatMap((g) => g.options);

export function getBackgroundOption(id: string): BackgroundOption | undefined {
  return ALL_BACKGROUND_OPTIONS.find((o) => o.id === id);
}

export const BG_PREVIEW_STORAGE_KEY = 'odyx-bg-preview';
