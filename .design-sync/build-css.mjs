// Flatten the ODYX app stylesheets into one self-contained sheet for
// cfg.cssEntry.
//
// Why this exists rather than letting esbuild bundle the CSS from the JS
// entry: the app's sheets reference their assets with host-absolute paths
// (`url("/img/hv2-bg.jpg")`), which esbuild cannot resolve and hard-errors on.
// The converter appends cfg.cssEntry to _ds_bundle.css verbatim, so flattening
// here keeps the cascade order exact AND lets us turn those host-absolute
// references into data URIs — the design system then carries its own imagery
// instead of depending on an ODYX origin serving /img.
//
// Deterministic: same inputs -> same bytes. Re-run before every converter
// build (see .design-sync/NOTES.md).

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const REPO = resolve(import.meta.dirname, '..');
const APP = join(REPO, 'src', 'app');
const PUBLIC = join(REPO, 'public');
const OUT = join(REPO, '.design-sync', '.cache', 'ds-styles.css');

// Cascade order. globals.css pulls its own siblings in via @import; we inline
// that chain rather than re-listing it, so the order can never drift from the
// app's. odyx-p126.css is imported by the P126 components themselves (that
// import is shimmed out for the bundle), so it is appended explicitly.
const ROOTS = [
  join(APP, 'tokens.css'),
  join(APP, 'globals.css'),
  join(APP, 'odyx-p126.css'),
];

// Bare-specifier imports we deliberately drop. Tailwind contributes only
// preflight + theme vars here — the scoped components use zero Tailwind
// utility classes (verified), and globals.css ships its own reset.
const DROP_IMPORTS = new Set(['tailwindcss']);

// Sibling sheets globals.css pulls in that this design system does not cover.
// Every ODYX sheet namespaces its own selectors, so dropping these cannot
// change how the Home or P1-26 markup cascades — it only keeps the shipped
// stylesheet describing the two approved screens instead of the whole site.
// background-picker.css is dev tooling (DevPreviewTools), never product UI.
const DROP_SHEETS = new Set([
  'product-print.css', 'product-cure.css', 'product-cure-v6.css',
  'printers-family.css', 'scanner-s1.css', 'resins.css', 'about.css',
  'background-picker.css',
]);

const INLINE_MAX = 1_200_000; // bytes; larger assets stay as absolute URLs
const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.avif': 'image/avif',
  '.gif': 'image/gif',
};

const remoteImports = [];
const inlined = [];
const leftAbsolute = [];
const seen = new Set();

function inlineAssets(css, fromDir) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (whole, _q, ref) => {
    // `#name` / `%23name` are in-document SVG references (filters, gradients),
    // not assets. They surface here because this regex also matches url()s
    // nested inside an outer SVG data URI, which is left untouched either way.
    if (/^(data:|https?:|#|%23)/i.test(ref)) return whole;
    const clean = ref.split(/[?#]/)[0];
    // Host-absolute -> public/; otherwise relative to the sheet that used it.
    const file = clean.startsWith('/') ? join(PUBLIC, clean) : resolve(fromDir, clean);
    if (!existsSync(file)) {
      leftAbsolute.push(`${ref} (not found)`);
      return whole;
    }
    const size = statSync(file).size;
    const ext = clean.slice(clean.lastIndexOf('.')).toLowerCase();
    const mime = MIME[ext];
    if (!mime || size > INLINE_MAX) {
      leftAbsolute.push(`${ref} (${Math.round(size / 1024)}KB${mime ? '' : ', unknown type'})`);
      return whole;
    }
    inlined.push({ ref, size });
    return `url("data:${mime};base64,${readFileSync(file).toString('base64')}")`;
  });
}

function flatten(file) {
  const abs = resolve(file);
  if (seen.has(abs)) return `/* design-sync: ${abs.replace(REPO + '/', '')} already inlined */\n`;
  if (!existsSync(abs)) throw new Error(`missing stylesheet: ${abs}`);
  seen.add(abs);
  const dir = dirname(abs);
  let out = '';
  const body = readFileSync(abs, 'utf8').replace(
    /@import\s+(?:url\(\s*(['"]?)([^'")]+)\1\s*\)|(['"])([^'"]+)\3)\s*;/g,
    (whole, _q1, urlRef, _q2, strRef) => {
      const ref = urlRef ?? strRef;
      // NB: never write the literal at-import keyword into these comments —
      // the bundle validator scans the raw CSS text for it and reports a
      // commented-out reference as an unresolvable import.
      if (/^https?:\/\//.test(ref)) { remoteImports.push(ref); return `/* design-sync: hoisted remote sheet ${ref} */`; }
      if (DROP_IMPORTS.has(ref)) return `/* design-sync: dropped import of "${ref}" */`;
      if (DROP_SHEETS.has(ref.split('/').pop())) return `/* design-sync: out of scope — dropped import of "${ref}" */`;
      if (!ref.startsWith('.') && !ref.startsWith('/')) return `/* design-sync: dropped import of "${ref}" */`;
      const target = ref.startsWith('/') ? join(PUBLIC, ref) : resolve(dir, ref);
      return `\n/* ─── ${ref} ─── */\n${flatten(target)}`;
    },
  );
  out += inlineAssets(body, dir);
  return out;
}

let css = ROOTS.map((r) => `\n/* ═══ ${r.replace(REPO + '/', '')} ═══ */\n${flatten(r)}`).join('\n');

// Any remote @import must lead the file to stay a legal @import.
if (remoteImports.length) {
  css = [...new Set(remoteImports)].map((u) => `@import url("${u}");`).join('\n') + '\n' + css;
}

// next/font/google normally defines these four variables on <html> (see
// src/app/fonts.ts + layout.tsx). Outside Next nothing sets them, and that is
// not a soft failure: globals.css declares
//   --font-display: var(--font-sora), 'Sora', sans-serif;
// so an undefined --font-sora makes the WHOLE declaration invalid at computed
// value time — the comma fallback never applies and type collapses to the
// initial family. Binding them to the real family names shipped in fonts.css
// reproduces exactly what next/font does at runtime.
const FONT_VARS = `
/* ─── design-sync: next/font variable bindings ─── */
:root{
  --font-sora:'Sora';
  --font-space:'Space Grotesk';
  --font-tajawal:'Tajawal';
  --font-plex-ar:'IBM Plex Sans Arabic';
}
`;

const header = `/* ODYX design system — flattened application stylesheet.
 * Generated by .design-sync/build-css.mjs from ${ROOTS.length} roots; do not edit by hand.
 * ${inlined.length} asset(s) inlined as data URIs, ${leftAbsolute.length} left as absolute URLs.
 */\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, header + FONT_VARS + css);

const kb = (n) => `${Math.round(n / 1024)}KB`;
console.error(`  ds-styles.css: ${kb(Buffer.byteLength(header + css))} from ${seen.size} sheets`);
console.error(`  inlined ${inlined.length} asset(s), ${kb(inlined.reduce((a, b) => a + b.size, 0))} raw`);
if (leftAbsolute.length) {
  console.error(`  [CSS_ASSET_ABSOLUTE] ${leftAbsolute.length} url() left host-absolute:`);
  for (const l of leftAbsolute) console.error(`    - ${l}`);
}
