import {
  Sora,
  Space_Grotesk,
  Tajawal,
  IBM_Plex_Sans_Arabic,
  Inter,
  Manrope,
  Poppins,
  Playfair_Display,
  Lora,
} from 'next/font/google';

// Latin (variable fonts) — display + body
export const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
export const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

// Arabic (RTL) — Tajawal (display) + IBM Plex Sans Arabic (body); not variable, specify weights
export const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700', '800'], variable: '--font-tajawal', display: 'swap' });
export const plexAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400', '500', '600'], variable: '--font-plex-ar', display: 'swap' });

// Optional families exposed through the font picker
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });
export const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
export const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });

export const fontVars = [
  sora.variable,
  space.variable,
  tajawal.variable,
  plexAr.variable,
  inter.variable,
  manrope.variable,
  poppins.variable,
  playfair.variable,
  lora.variable,
].join(' ');
