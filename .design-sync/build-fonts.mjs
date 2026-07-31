// Harvest the ODYX brand webfonts out of the Next build cache.
//
// The app loads its fonts through `next/font/google` (src/app/fonts.ts), which
// self-hosts them at build time: there is no @font-face in the repo's own CSS
// and no woff2 under public/. Without this step the design system ships CSS
// that asks for Sora / Space Grotesk / Tajawal / IBM Plex Sans Arabic and gets
// system fallbacks — every design built with it would render in the wrong type.
//
// Next writes both the woff2 binaries (.next/static/media) and the generated
// @font-face rules (.next/**/*.css), so we collect the brand faces, copy their
// binaries, and emit one fonts.css for cfg.extraFonts.
//
// Requires a prior `next build`/`next dev` — see .design-sync/NOTES.md.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const REPO = resolve(import.meta.dirname, '..');
const NEXT = join(REPO, '.next');
const OUT = join(REPO, '.design-sync', '.cache', 'fonts');

// The four families the shipped stylesheet actually references, via the
// --font-display / --font-body token pairs (Latin + Arabic).
const BRAND = new Set(['Sora', 'Space Grotesk', 'Tajawal', 'IBM Plex Sans Arabic']);

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.css')) out.push(p);
  }
  return out;
}

if (!existsSync(NEXT)) {
  console.error('[FONTS] no .next/ — run `npm run build` (or `npm run dev` once) first');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const blocks = new Map(); // dedupe key -> rewritten @font-face text
const copied = new Set();
const perFamily = {};

for (const cssFile of walk(NEXT)) {
  const css = readFileSync(cssFile, 'utf8');
  if (!css.includes('@font-face')) continue;
  for (const m of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = m[1];
    const fam = body.match(/font-family\s*:\s*['"]?([^;'"}]+)['"]?/)?.[1]?.trim();
    if (!fam || !BRAND.has(fam)) continue;
    const url = body.match(/url\(\s*['"]?([^'")]+\.woff2?)['"]?\s*\)/i)?.[1];
    if (!url) continue; // metric-only "<Family> Fallback" faces carry no binary
    const src = resolve(dirname(cssFile), url.split(/[?#]/)[0]);
    if (!existsSync(src)) continue;

    const file = basename(src);
    // Dev and prod chunks emit the SAME logical face with different
    // content-hashed filenames. Key on the face's identity, not the file, so
    // one face wins instead of the browser being handed two candidates for
    // every weight/range (which doubles the download for no visual gain).
    const range = body.match(/unicode-range\s*:\s*([^;}]+)/)?.[1]?.trim() ?? '';
    const weight = body.match(/font-weight\s*:\s*([^;}]+)/)?.[1]?.trim() ?? '';
    const style = body.match(/font-style\s*:\s*([^;}]+)/)?.[1]?.trim() ?? '';
    const key = `${fam}|${weight}|${style}|${range}`;
    if (blocks.has(key)) continue;

    if (!copied.has(file)) {
      copyFileSync(src, join(OUT, file));
      copied.add(file);
    }
    blocks.set(key, `@font-face{${body.replace(url, `./${file}`).trim()}}`);
    perFamily[fam] = (perFamily[fam] ?? 0) + 1;
  }
}

const missing = [...BRAND].filter((f) => !perFamily[f]);
const header = `/* ODYX brand webfonts, harvested from the Next build cache by
 * .design-sync/build-fonts.mjs. Self-hosted by next/font/google in the app;
 * shipped here so designs render in real ODYX type rather than fallbacks.
 * ${blocks.size} faces across ${Object.keys(perFamily).length} families.
 */\n`;

writeFileSync(join(OUT, 'fonts.css'), header + [...blocks.values()].join('\n') + '\n');

const bytes = [...copied].reduce((a, f) => a + statSync(join(OUT, f)).size, 0);
console.error(`  fonts.css: ${blocks.size} faces, ${copied.size} woff2 (${Math.round(bytes / 1024)}KB)`);
for (const [fam, n] of Object.entries(perFamily).sort()) console.error(`    ${fam}: ${n} face(s)`);
if (missing.length) {
  console.error(`  [FONT_MISSING] no faces harvested for: ${missing.join(', ')}`);
  process.exit(1);
}
