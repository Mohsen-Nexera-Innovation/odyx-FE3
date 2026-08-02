---
name: odyx-screen-from-image
description: >-
  Implement any ODYX website screen from a reference mock/screenshot, seed
  low-quality media, then export an external HQ-regen pack with a ChatGPT
  prompt for identical high-quality image replacements. Use when the user
  provides a design reference image and asks to build a screen, implement a
  mock, or export LQ assets for ChatGPT / identical HQ upscale.
---

# ODYX Screen-from-Image

General workflow: **reference image → implement the screen → export LQ media + ChatGPT HQ prompt**.

Not limited to product or resin pages. Infer structure from the mock. Match nearby codebase patterns for that screen family.

## When to apply

- User attaches or points at a mock/screenshot and asks to implement it
- User asks to export LQ images for ChatGPT HQ regeneration
- User asks to swap in HQ outputs after external generation

Skip if there is no reference image and the task is not HQ-pack export.

## Progress checklist

Copy and update as you go:

```
Screen-from-image:
- [ ] 1. Ingest reference + knowledge_base
- [ ] 2. Inventory sections + raster assets
- [ ] 3. Implement screen (route/content/page/CSS)
- [ ] 4. Seed LQ media (stable filenames)
- [ ] 5. Export HQ pack (script)
- [ ] 6. Hand off pack path to user
- [ ] 7. Polish vs mock (after HQ swap if applicable)
```

## Step 1 — Ingest the reference

1. Read the reference image carefully (layout, sections, type, spacing, media roles).
2. Read `knowledge_base/README.md` (authority order, tokens, claims).
3. Find a matching mock/spec under `knowledge_base/` when one exists; otherwise the user image is the fidelity target.
4. Agree a short kebab-case `screen-id` (from the user or mock filename).

Also read `AGENTS.md` non-negotiables: action blue `#0050D8`, Tajawal, RTL-ready layout, no invented catalog numbers.

## Step 2 — Plan from the image

1. List sections **top-to-bottom from the mock** — do not assume a fixed section spine.
2. List every raster asset role (hero, cards, devices, clinical photos, etc.).
3. Prefer crisp **SVG** for simple line icons; rasters for photos/product shots.
4. For deeper ODYX/CSS notes and one worked example, read [reference.md](reference.md).

## Step 3 — Implement

1. Follow conventions of **nearby screens** (routing, content modules, page components, scoped CSS).
2. Do **not** force the Temporary Resin file layout unless the mock is that kind of page.
3. This Next.js version may differ from training data — check `node_modules/next/dist/docs/` before using unfamiliar APIs.
4. Wire the route so the screen is reachable; register in any existing product/sitemap lists if that screen family requires it.

## Step 4 — Seed LQ media

1. Crop from the mock or generate placeholders that preserve composition.
2. Store under a stable public path used by the screen (`public/images/…` or the existing `public/img/…` tree for that family).
3. Keep **filenames stable** — HQ outputs overwrite the same names later.

## Step 5 — Export HQ pack

From the **odyx-FE3 repo root**, after LQ files exist:

```bash
python3 .agents/skills/odyx-screen-from-image/scripts/export-hq-pack.py \
  --screen-id <kebab-id> \
  --images path/to/lq1.png path/to/lq2.jpg
```

Optional: `--out /absolute/or/relative/path` (default `../hq-regen/<screen-id>`).

Pack contents:

| Path | Purpose |
|------|---------|
| `lq/` | Copies of the LQ images |
| `PROMPT.md` | Filled ChatGPT instructions |
| `manifest.json` | screen id, roles, paths, sizes |

Prompt template source: [chatgpt-prompt.md](chatgpt-prompt.md).

## Step 6 — Hand off

Tell the user:

1. Absolute path to the pack folder
2. Attach every file in `lq/` in ChatGPT and paste `PROMPT.md`
3. Save HQ outputs with the **same filenames** as in `manifest.json`, then drop them into the original public paths (or ask the agent to swap)

## Step 7 — Polish / HQ swap

When HQ files arrive (or on request):

1. Replace assets at the original paths (same filenames).
2. Trim excess white space if cards look sparse.
3. Clear Next image cache: `rm -rf .next/cache/images`
4. Diff spacing/type/borders against the mock; force gaps when global `odyx.css` wins (see [reference.md](reference.md)).

## Out of scope

- Calling ChatGPT or image APIs automatically
- Auto pixel-diff against the mock
- Building a screen with no reference image
