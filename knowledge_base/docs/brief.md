# ODYX Website Brief — full transcription

Source: `knowledge_base/archive/ODYX Website Brief.pdf`, May 2026, client-authored. Complete
transcription of all 8 sections. **This is the working source of truth for the brief** — the
original PDF is archived and should not be worked from.

> **⚠️ One section is superseded.** §5 Visual Identity specifies orange-on-navy. The client's
> own design references (13 images, later) show blue-on-white. We follow the references —
> see [design-tokens-draft.md](design-tokens-draft.md). The original wording is preserved
> below, struck through, so nothing is lost. **Everything else in this brief still stands.**

---

## 1. What Is ODYX

ODYX is a premium digital dentistry brand covering the full technology workflow a dental
clinic or laboratory needs to run a complete digital workflow — from the first scan of a
patient's mouth all the way to the final delivered restoration.

> The brand is not a product catalog. It is a complete ecosystem. Every product ODYX offers
> connects into a single, uninterrupted digital workflow. That concept — the connected
> workflow — is the core idea the website must communicate.

## 2. The Digital Workflow — the heart of the website

ODYX products do not exist in isolation. They are steps in a sequence. The website must show
this sequence visually, interactively, and clearly.

| Step | Product | What happens |
|---|---|---|
| **SCAN** | Intraoral Scanner | Digital impression taken chairside. No physical molds. Instant 3D data |
| **DESIGN** | Design Software | Scan data transferred into CAD software. Crown, guide, or model designed digitally |
| **PRINT** | 3D Printer + Resin | Design file sent to the ODYX printer. Object built layer-by-layer using ODYX resin |
| **CURE** | Post-Curing Machine | Printed part exposed to controlled UV light. Reaches full strength, surface quality, and biocompatibility |
| **FINISH** | Staining & Glazing | Final aesthetics applied. Color matching and surface treatment |
| **DELIVER** | — | Completed restoration delivered to the patient. Often same-day |

> **Client callout:** "This workflow must be a dedicated visual module on the website —
> animated or interactive, showing the ODYX product used at each step with a link to that
> product page. This is a core differentiator. Most competitor websites show products in
> isolation. ODYX shows the full picture."

## 3. Product Lines

Six categories currently, with more in development.

- **Intraoral Scanners** — replace physical impressions with real-time 3D digital scans taken directly in the patient's mouth. Speed and accuracy are the main selling points.
- **Dental 3D Printers (+ slicing software)** — used in-clinic or in-lab to produce crowns, bridges, surgical guides, orthodontic models, and denture bases. No outsourcing. No waiting.
- **Post-Curing Machines** — a mandatory step after every 3D print. Applies controlled UV light to complete polymerization, giving the printed part its final mechanical strength and biocompatibility. *"This product is often overlooked by competitors; ODYX presents it as essential."*
- **ODYX Resins — five clinical lines:** Permanent Crown & Bridge · Ceramic Crown · Temporary Restoration · Dental Model · Surgical Guide
- **Design Software** — CAD tools for designing dental restorations and appliances. Bridges the gap between scanner output and printer input.
- **Staining & Glazing Solutions** — finishing products for final color and surface aesthetics. The last step before delivery.

## 4. Who the Website Is Talking To

Two professional audiences. The website must identify them early and route them accordingly.

| Dentists & Clinics | Dental Laboratories |
|---|---|
| Clinics looking to go fully digital | Transitioning from milling to 3D printing |
| Same-day restoration capability | High-volume resin production needs |
| Implant guides and surgical templates | CAD/CAM integration |
| Training and transition support | End-to-end solution sourcing |

> **Developer note:** After the hero section, present a "Choose Your Path" entry — three clear
> cards: Dentist / Dental Lab / Distributor. Each leads to a tailored journey. This avoids a
> generic experience that speaks to no one.

## 5. Visual Identity

| | Brief said | Status |
|---|---|---|
| Primary color | ~~`#FF8400` — Orange. Used for accents, CTAs, section highlights, hover states~~ | **SUPERSEDED** → `#0050D8` blue, per client references |
| Background | ~~`#1A1A2E` — Dark navy. Base for hero and premium sections~~ | **SUPERSEDED** → light/white dominant; dark reserved for product heroes |
| Overall feel | Premium technology brand. Think Apple-level clarity — not pharmaceutical, not clinical, not generic | **STANDS** |
| Product pages | Clean backgrounds, strong product photography | **STANDS** |

The *feel* direction survives intact. Only the two hex values changed.

## 6. Key Website Features — ideas to build around

**A. Hero Section** — full-screen opening with a short, powerful statement headline.
Background: looping video or animation showing the workflow in motion — scanner in use,
printer running, a crown being removed. Two primary CTAs: Explore Products and Request a Demo.
~~Dark background, orange accents, white type.~~ *(color superseded)*

**B. Interactive Ecosystem Visual** — an animated visual showing how every ODYX product
connects: scanner → software → printer → curing machine → resin. Each node clickable and goes
to that product's page. The message: everything you need is here, and it all works together.

**C. Smart AI Assistant** — a floating chat widget, always accessible, right-aligned or
centered. It answers clinical questions: *"Which resin do I use for crowns?"* or *"What
printer suits a small clinic?"* It guides users to the right products or content, and
escalates to a human when needed. Both a UX tool and a trust signal.

**D. Learning Center** — a full educational hub: beginner guides explaining what an intraoral
scanner is, what curing does, why digital workflows matter. Advanced content: full clinical
workflow courses per application (crowns, implant guides, dentures). Downloadable e-books.
Registered-user-only course access. Positions ODYX as a partner in the professional's
learning journey — not just a vendor.

**E. Case Library** — before-and-after case studies, filterable by application (crowns,
implants, ortho, dentures) and by product used. Each case shows: the clinical challenge, the
ODYX solution, the workflow used, the final result. Registered users can submit their own
cases. Community-building built into the structure.

**F. Multi-Language Support** — English, Arabic, and French, available from the header, every
page. *"This is infrastructure, not a feature — plan it from the architecture stage."*
(Client has since asked for Chinese to be added.)

**G. Lead Conversion Points** — Request a Demo must appear as a CTA throughout, not just on
the contact page. Additional entry points: Book a Training Session, Become a Distributor,
Request Technical Support. All forms must be CRM-ready, trackable, and minimal in friction.

**H. Persistent Contact Access** — WhatsApp button visible on every page. AI chat always
available. *"This is not a 'contact us' page behind a click — it is ambient access to the
ODYX team at every point in the user journey."*

## 7. Website Structure — section overview

| # | Section | What it contains |
|---|---|---|
| Global | Header / Footer | Language selector, search bar, AI assistant, WhatsApp, login/register, social links |
| Home | Homepage | Hero, Choose Your Path, Ecosystem Visual, Featured Products, Why ODYX, Case Highlights, Learning Preview |
| 01 | About ODYX | Brand story, vision and mission, values, team, news |
| 02 | Products | Intraoral Scanners, 3D Printers, Curing Machines, Resins, Design Software — with full specs, videos, downloads |
| 03 | Solutions | By clinical application (Crowns, Implants, Ortho, Dentures) and by user type (Dentist / Lab) |
| 04 | Guided Workflows | Interactive Scan → Design → Print → Cure → Deliver with videos and direct product links |
| 05 | Learning Center | Beginner paths, clinical courses, articles, video tutorials, downloadable e-books |
| 06 | Case Library | Filterable case studies by application and product used |
| 07 | Events | Webinars, exhibitions, scientific events |
| 08 | Support | Troubleshooting guides, product manuals, software updates, community forum, warranty |
| 09 | Contact | Demo request, sales, technical support, training booking, distributor application |

## 8. Developer Considerations

*"These are technical and structural points that should be decided at the architecture stage,
not retrofitted later."*

- **RTL support for Arabic is not a switch** — it affects layout, spacing, alignment, icon direction, and animations. Plan it from day one.
- **The AI assistant needs a clear handoff protocol** — AI answers product/clinical questions → escalates to human for pricing, custom orders, or anything unresolved. Define the boundary upfront.
- **The Learning Center has two content tiers** — open access (beginner) and registered-user-only (advanced courses). Authentication and content gating must be part of the CMS architecture.
- **Product pages will have downloadable files** — technical specs, safety data sheets, software files, user manuals. These need version control: when a file is updated, the old link should still be traceable.
- **The Case Library requires a submission system** for registered users, with a moderation layer before cases go live. Plan the workflow, not just the display.
- **The interactive workflow module (Scan → Deliver) is a central piece — not decorative.** If it breaks or loads slowly, a core brand message is lost. Treat it as a priority component.
- **All CTAs must be connected to a CRM** or lead management system with source tracking. A form that goes to an inbox is not enough.
- **The website must function as a credibility document** for both end users and B2B partners (distributors).
- **Mobile experience must be as considered as desktop** — the dental professional checking a product spec between patients is on a phone.
