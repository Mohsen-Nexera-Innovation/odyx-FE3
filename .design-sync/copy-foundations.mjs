// Ship the foundation layer: tokens/*.css and the guidelines/*.html cards.
//
// Why this isn't done by the converter: `copyTokens` in lib/css.mjs returns
// immediately unless `cfg.tokensPkg` is set, and that key resolves under
// node_modules — it assumes a design system distributed as a package with a
// sibling tokens package. This repo is an application, so the converter leaves
// tokens/ and guidelines/ empty and every value ends up buried inside the 2MB
// _ds_bundle.css, where the Design System pane has nothing browsable to show.
//
// So the foundations are authored under .design-sync/ (committed, reviewable)
// and mirrored into the bundle here, with the token files spliced into the
// styles.css @import closure.
//
// Ordering matters: tokens are imported BEFORE _ds_bundle.css, so the real
// application stylesheet still wins on any value it also defines. These files
// document and expose the palette; they never override it.
//
// Must run AFTER package-build.mjs (which clears the output dir) and after
// copy-assets.mjs.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const REPO = resolve(import.meta.dirname, '..');
const SRC_TOKENS = join(REPO, '.design-sync', 'tokens');
const SRC_GUIDES = join(REPO, '.design-sync', 'guidelines');
const OUT = process.argv[2] ? resolve(process.argv[2]) : join(REPO, 'ds-bundle');

const STYLES = join(OUT, 'styles.css');
if (!existsSync(STYLES)) {
  console.error(`[FOUNDATIONS] no styles.css under ${OUT} — run package-build.mjs first`);
  process.exit(1);
}

// Deterministic order: variables first, then the things that consume them.
const TOKEN_ORDER = ['colors.css', 'typography.css', 'layout.css', 'motion.css'];

const copyDir = (src, destName) => {
  if (!existsSync(src)) return [];
  const dest = join(OUT, destName);
  mkdirSync(dest, { recursive: true });
  const names = readdirSync(src).filter((f) => !f.startsWith('.'));
  for (const f of names) copyFileSync(join(src, f), join(dest, f));
  return names;
};

const tokenFiles = copyDir(SRC_TOKENS, 'tokens');
const guideFiles = copyDir(SRC_GUIDES, 'guidelines');

// Splice token imports ahead of everything already in the closure. Idempotent:
// existing token imports are stripped first, so re-running never stacks them.
const ordered = [
  ...TOKEN_ORDER.filter((f) => tokenFiles.includes(f)),
  ...tokenFiles.filter((f) => !TOKEN_ORDER.includes(f)).sort(),
];
const existing = readFileSync(STYLES, 'utf8')
  .split('\n')
  .filter((l) => l.trim() && !/^@import\s+"\.\/tokens\//.test(l.trim()));
const next = [...ordered.map((f) => `@import "./tokens/${f}";`), ...existing].join('\n') + '\n';
writeFileSync(STYLES, next);

// Every guideline card must carry the @dsCard marker on line 1 — that is what
// registers it in the Design System pane. A silently unmarked file would just
// never appear, so fail loudly instead.
const unmarked = guideFiles.filter(
  (f) => f.endsWith('.html') && !readFileSync(join(OUT, 'guidelines', f), 'utf8').startsWith('<!-- @dsCard'),
);

console.error(`  foundations: ${tokenFiles.length} token file(s), ${guideFiles.length} guideline card(s)`);
console.error(`  styles.css: ${next.trim().split('\n').length} @import(s)`);
if (unmarked.length) {
  console.error(`  [DSCARD_MISSING] guideline(s) without a first-line @dsCard marker: ${unmarked.join(', ')}`);
  process.exit(1);
}
