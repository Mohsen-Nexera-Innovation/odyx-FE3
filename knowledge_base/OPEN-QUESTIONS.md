# Open questions — consolidated register

One list of everything blocked on the client (or on us), collected from the screen specs.
Today it covers **036 · 3D Printers**; add rows from other screens as their specs land.
Source of each item: `screens/036-3d-printers/screen-details.md` §13 and `content.md` §7,
recorded 2026-07-25 at Checkpoint A (Khaled).

Statuses: **OPEN** (waiting on client) · **RESOLVED** (decision recorded) · **INTERNAL**
(ours to do, no client input needed).

## Decisions already recorded (Checkpoint A, 2026-07-25)

| Decision | Detail |
|---|---|
| Architecture | 036 is one family page with both models inline — not a hub, not two detail pages |
| Workflow spine | **Five steps sitewide:** SCAN → DESIGN → PRINT → WASH & CURE → DELIVER |
| HALOT claims | Where the client's reference and their catalog disagree, **the catalog wins** until they say otherwise |
| Shipping name | **HALOT-X1 is the shipping name.** Use "ODYX HALOT-X1" in headings, nav, cards and SEO title (was §13 #3) |

## Blocked on the client

| # | Question | What it blocks | Status |
|---|---|---|---|
| 1 | **HALOT resin-compatibility conflict.** The client's HALOT-X1 reference lists all five resin lines (incl. Ceramic Crown and Surgical Guide Pro) and says *"Compatible with the complete ODYX Dental Resin portfolio"* — the catalog (p13–p14) says the HALOT is **not recommended for** final restorations or advanced implant surgical guides. Their reference vs their catalog | The HALOT half of 036 (§5.3, §5.4, §5.5). Built to the catalog for now | **OPEN** |
| 2 | **HALOT positioning** — how much of *"not a dedicated dental 3D printer"* (p13) reaches the page? Currently framed as an honest fork by job | 036 §5.3 copy | **OPEN** |
| 4 | **Are prices published, and where?** 45,000–55,000 EGP (p14) is the only price in the catalog | §5.3, logged-in state, the `020` Buy Online link | **OPEN** (`products.md` Q7) |
| 5 | **Datasheet / brochure PDFs** — the client specified a `Downloads` inner link and drew a `Download Brochure` CTA; we hold no files | §5.11 and the secondary CTA — renders as "available on request" until the PDFs exist | **OPEN** |
| 6 | **Real clinical cases and named clinicians** (review #32: *"Put real cases with image for the doctor and image for the case"*) | §5.10 Proof — **section hidden entirely** until supplied | **OPEN** |
| 7 | **Warranty period and coverage.** Consumable schedules are published (2000 h / ~3000 h screens, ~30,000-layer film, ~20,000 h lamp) — a buyer's next question is what the warranty covers | §5.6 running costs, page `070` | **OPEN** (`products.md` Q9) |
| 8 | **Is the ROI calculator on 036?** The client's reference includes it; reviews #16/#26 trim surplus CTAs. Currently **excluded** to protect the single primary CTA | §5 section list | **OPEN — our judgement, needs a nod** |
| 9 | **Three indications have a published cure time and no ODYX resin line:** splints & night guards, dentures, castable work. Router currently answers "open material system — no ODYX line yet" | §5.4 router, and `039` Resins | **OPEN** — either lines are coming, or the site says plainly these run on third-party resin |
| 10 | **ACF on the HALOT-X1.** Client reference lists ACF as a HALOT feature; p7 says the four modifications were applied *"exclusively to the ODYX P1-26"*. Copy attributes ACF to the P1-26 only | §5.3b, §5.6 | **OPEN** — one sentence resolves it |
| 11 | **Which printer is in the studio photograph?** The real photo (`product-photos/`) does not match the client's P1-26 mockup: red hood / silver base / wordmark on hood / no model number vs orange hood / black base / wordmark on base / P1-26 label. Until answered, no caption names the machine in that photo | Hero and model captions on 036 — same question lands on 034 and 037 | **OPEN — outranks most of this list** |
| 12 | **Production photography.** The current p1-26 / halot-x1 image sets are AI-generated renders at reference resolution (~864–900 px sheets; lifestyle backgrounds show FDM filament spools that don't fit a resin-printer context). Cropped versions ship as placeholders only | Every image slot on 036 | **OPEN — request real studio shots** (hard rule: never synthesize ODYX hardware for production) |
| 13 | **Service network.** *"Nobody near me can service it"* is listed as an objection the page cannot answer today — no warranty period and no service network in the knowledge base | Objection table, trust argument sitewide | **OPEN** |

## Owed to the system (internal, no client input needed)

| Item | Detail | Status |
|---|---|---|
| Five-step spine propagation | CLAUDE.md, `design-system/odyx/MASTER.md` §6 and screens `044`–`049` still carry the six-step spine (`…CURE → FINISH → DELIVER`). One sitewide pass, not screen by screen. The app's `/workflows` routes still expose six steps incl. `finish` | **INTERNAL — pending** |
| Promote two components to MASTER §6 | **Product-family (forked) archetype** (2nd use: 037 Curing Machines) and the **Indication Router** (logic shared with 039 Resins and 047 Print) | **INTERNAL — pending** |
| Approved tokens vs live app CSS | The live app still runs the legacy token set (sky-blue accent, Sora/Space Grotesk). 036 ships with the approved tokens (Tajawal, `#0050D8`, family accent `#F5761E`) scoped to the screen; the sitewide migration is a separate pass | **INTERNAL — pending** |
