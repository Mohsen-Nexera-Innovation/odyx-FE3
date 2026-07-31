// Copy the host-absolute assets the components reference into the bundle.
//
// The ODYX components address their imagery the way an app does — `<img
// src="/brand/odyx-company.png">`, `/img/hv2-news/*.webp` — because in
// production Next serves public/ at the origin root. Those are string literals
// inside the components, not imports, so no bundler step can rewrite them and
// nothing copies them along.
//
// CSS backgrounds are already handled (build-css.mjs inlines them as data
// URIs). This covers the <img src> side: mirror the referenced files into the
// bundle at the same absolute paths, so any host serving the design-system
// project from its root resolves them — including the local review server.
//
// Must run AFTER package-build.mjs, which clears the output directory.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const REPO = resolve(import.meta.dirname, '..');
const PUBLIC = join(REPO, 'public');
const OUT = process.argv[2] ? resolve(process.argv[2]) : join(REPO, 'ds-bundle');

const BUNDLE = join(OUT, '_ds_bundle.js');
if (!existsSync(BUNDLE)) {
  console.error(`[ASSETS] no _ds_bundle.js under ${OUT} — run package-build.mjs first`);
  process.exit(1);
}

// Only these roots: they are what public/ actually exposes and what the
// components reference. A blanket "any /path" scan would sweep up route hrefs
// like "/products/odyx-p1-26".
const ROOTS = /"(\/(?:img|brand|video)\/[^"]+?\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm))"/g;

// Video is deliberately not shipped. public/video/hero.mp4 alone is 44MB —
// four times the entire image set — and it buys nothing here: P126Video
// renders its poster frame (/img/printers/p126/video-poster.jpg) and only
// fetches the source on play, which a design surface never does.
const SKIP = /^\/video\//;

const refs = new Set();
for (const m of readFileSync(BUNDLE, 'utf8').matchAll(ROOTS)) refs.add(m[1]);

let copied = 0, bytes = 0, skipped = 0;
const missing = [];
for (const ref of [...refs].sort()) {
  if (SKIP.test(ref)) { skipped++; continue; }
  const src = join(PUBLIC, ref);
  if (!existsSync(src)) { missing.push(ref); continue; }
  const dest = join(OUT, ref);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  copied++;
  bytes += statSync(src).size;
}

console.error(
  `  assets: ${copied}/${refs.size} copied into the bundle (${Math.round(bytes / 1024)}KB)` +
    (skipped ? `, ${skipped} video file(s) skipped by design` : ''),
);
if (missing.length) {
  console.error(`  [ASSET_MISSING] ${missing.length} referenced file(s) absent from public/:`);
  for (const m of missing) console.error(`    - ${m}`);
}
