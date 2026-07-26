<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# ODYX design & content knowledge base

Before designing or implementing any screen, read `knowledge_base/README.md` — it indexes
the client's design references, approved design tokens, the website brief, the product
catalog, and per-screen specs, in authority order.

Non-negotiables when building UI:

- **Tokens:** action blue `#0050D8` on white; Tajawal font (Latin+Arabic, weights
  400/500/700); light-dominant surfaces, dark `#0A1020` only for cinematic product heroes.
- **Claims:** every product spec must trace to `knowledge_base/ODYX Products - 18.7.26.pdf`.
  Never invent a number. Certification is stated per resin line, never range-wide.
- **Workflow spine:** SCAN → DESIGN → PRINT → WASH & CURE → DELIVER (five steps) is the
  site's organizing principle, not a decorative section.
- **RTL:** Arabic is a first-class locale — plan layout, spacing and motion for RTL from
  the start. No letter-spacing, uppercase, or italic on Arabic text.
- The generated files in `design-system/odyx/` are supplementary; where they conflict with
  the client references or approved tokens, the client's decisions win.
