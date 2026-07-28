# ODYX — Project Status

**Last reviewed:** 2026-07-28  
**Repos:** `odyx-api` (NestJS) · `odyx-FE3` (Next.js)

ODYX is a mid-maturity digital dentistry platform: Nest commerce/ops API + Next.js marketing/commerce site. Core auth, shop, payments, shipping, inbox, and admin work. Gaps remain on product content depth, uploads, i18n, brand token migration, tests/CI, and client-blocked assets.

Related: [`knowledge_base/OPEN-QUESTIONS.md`](./knowledge_base/OPEN-QUESTIONS.md) (client blockers), [`knowledge_base/README.md`](./knowledge_base/README.md) (design authority).  
API twin of this doc: `odyx-api/PROJECT_STATUS.md`.

---

## Stack overview

| Repo | Role | Stack |
| --- | --- | --- |
| **odyx-api** | Backend: auth, shop, payments, shipping, inbox, admin | NestJS 11, Prisma 6, PostgreSQL 16, Socket.IO, Paymob, Bosta |
| **odyx-FE3** | Marketing + shop + design inbox + staff admin | Next.js 16, React 19, Tailwind CSS v4 |

**Integration:** FE uses Nest when `NEXT_PUBLIC_USE_API=true`; otherwise offline `localStorage` demo mode.

| Environment | Frontend | API |
| --- | --- | --- |
| Staging | Vercel | `https://staging-api.odyx.com` |
| Production | Hostinger VPS Docker (`/opt/odyx/web`) | `https://api.odyx.com` (`/opt/odyx/api`) |

---

## Maturity snapshot

| Area | Rough progress | Notes |
| --- | --- | --- |
| API commerce + ops | ~80% | Real Paymob/Bosta when keyed; uploads & catalog admin missing |
| FE marketing shell | ~75% | Broad IA live; token/i18n incomplete |
| KB product specs (034/036/037/039) | ~60% | Four ranges started; resin children + cure consolidation pending |
| i18n / brand migration | ~20% | Locale chrome only; sitewide still legacy sky + Sora |
| Tests / CI | ~5% | One health e2e; no CI pipeline |
| Client-blocked content | Waiting | Cases, PDFs, prices, production photos |

---

# COMPLETED

## Frontend — routes

| URL | Purpose | Status |
| --- | --- | --- |
| `/` | Marketing home | Done |
| `/about` | Brand story, values, team | Done (legal stubs) |
| `/products` | Product hub | Done |
| `/products/odyx-s1-intraoral-scanner` | **034** S1 scanner | Done (cases/downloads partial) |
| `/products/3d-printers` | **036** printers family | Done (proof/downloads partial) |
| `/products/resins` | **039** resins range | Done (child pages missing) |
| `/products/cure-v6` | **037** UV-02 (catalog-correct) | Done (gallery hidden) |
| `/products/curing-machines` | Legacy curing page | Live but **wrong specs** — keep until redirected |
| `/products/design` | Generic design product | Done |
| `/solutions/dentists`, `/solutions/labs` | Journey pages | Done |
| `/workflows`, `/workflows/[slug]` | Workflow hub + steps | Done (**still 6 steps**) |
| `/learning` | Academy hub (static cards) | Done (not CMS) |
| `/support` | Support hub | Done |
| `/roi` | ROI calculator + lead capture | Done |
| `/shop`, `/cart`, `/checkout`, `/checkout/success` | Commerce | Done (dual-mode) |
| `/design-services`, `/design-services/request` | Design SKUs + request | Done |
| `/inbox`, `/inbox/new`, `/inbox/[caseId]` | Client inbox | Done |
| `/login`, `/register`, `/complete-google` | Auth | Done |
| `/forgot-password`, `/reset-password`, `/accept-invite` | Auth extras | Done |
| `/settings` | Profile / password | Done |
| `/admin`, `/admin/users`, `/admin/roles` | Staff admin | Done |
| `/admin/orders`, `/admin/clients`, `/admin/leads`, `/admin/chat` | Staff ops | Done |

**Slug aliases:** `intraoral-scanner` → S1; resin aliases → `resins`; legacy cure cutout paths → `curing-machines`.

---

## Frontend — knowledge-base product screens

### 034 Intraoral Scanner (`/products/odyx-s1-intraoral-scanner`)

| Section | Status |
| --- | --- |
| Hero, Why S1, Clean by design | Completed |
| Scan in action + apps | Completed (still frame; no client video) |
| Software panels (3 catalog AI features) | Completed |
| Specs, open system, Design Services hand-off | Completed |
| Workflow spine + ecosystem (5-step) | Completed |
| FAQ + Downloads + CTA | Completed (downloads = “on request”) |
| Clinical cases & reviews | **Hidden** until client assets |

### 036 3D Printers (`/products/3d-printers`)

| Section | Status |
| --- | --- |
| Hero, why print in-house, two models (P1-26 + HALOT-X1) | Completed |
| Technical features, indication router, specs, running costs | Completed |
| What ODYX changed, PRINT workflow (5-step), ecosystem | Completed |
| Downloads + demo CTA | Completed (“on request”) |
| Video | Poster only |
| Proof / clinical cases | **Hidden** |
| On-page ROI | Excluded on purpose (OPEN-QUESTIONS #8) |

### 037 Curing UV-02 (`/products/cure-v6`)

| Section | Status |
| --- | --- |
| Hero, why wash & cure, washed→cured acts | Completed |
| Feature chips ×5, cure times, what you can cure | Completed |
| Specs + downloads row, 5-step workflow, ecosystem, CTA | Completed |
| Results gallery | **Hidden** |
| “Smart Heating” | Held per spec §13.2 |

### 039 Resins range (`/products/resins`)

| Section | Status |
| --- | --- |
| Dark hero, workflow band, five lines, compare matrix | Completed |
| Shades, wash & cure, docs/certification, ecosystem + CTA | Completed |
| Five per-line **detail pages** | **Not built** (cards → `#docs-{id}`) |

---

## Frontend — commerce, auth, inbox, admin

| Area | Completed detail |
| --- | --- |
| **Shop / design catalog** | API `GET /products` or static `SHOP_PRODUCTS` / `DESIGN_SERVICES` |
| **Cart** | API cart endpoints or `localStorage` |
| **Checkout** | Preview, checkout, Paymob intent/simulate, success by order number |
| **Auth** | Login, register, Google (+ complete profile), forgot/reset, invite accept, settings, logout (client clear) |
| **Inbox** | List/thread/reply/compose; Socket.IO in API mode; patients list/create on design request |
| **Admin** | Users invite/patch, roles CRUD-lite, orders confirm/ship, clients list, leads list, staff chat |
| **ROI** | Calculator UI + `POST /leads` (or demo) |
| **Dual-mode** | `NEXT_PUBLIC_USE_API` + `NEXT_PUBLIC_API_URL` + optional Google client ID |

---

## Frontend — marketing sections (home)

Completed: hero, Why ODYX, path lanes (dentist/lab/distributor), ecosystem slider, featured products, clinical bento, case spotlight, learning/support previews, news, register-device teaser, shop teaser.

Also completed: solutions content, support hub, about (minus legal), global header/footer, search + keyword AI FAQ, WhatsApp float.

---

## Frontend — design / RTL infrastructure

| Item | Status |
| --- | --- |
| Spec-scoped CSS (034/036/037/039) with `#0050D8`, Tajawal, family accents | Completed |
| Spec RTL rules (no letter-spacing/uppercase; mirrored spines) | Completed |
| Locale switch EN/AR/FR (`lang` + `dir` + font swap) | Completed (chrome only) |
| Fonts: Sora, Space Grotesk, Tajawal, IBM Plex Arabic | Loaded |
| Knowledge base + generated `design-system/odyx/` | Present |

---

## API — HTTP endpoints (48)

### Health / auth

| Method | Path | Status |
| --- | --- | --- |
| `GET` | `/health` | Done |
| `POST` | `/auth/register`, `/login`, `/google`, `/refresh` | Done |
| `POST` | `/auth/logout` | Soft stub `{ ok: true }` (no revoke) |
| `POST` | `/auth/accept-invite`, `/forgot-password`, `/reset-password` | Done |
| `GET`/`PATCH` | `/auth/me` | Done |
| `POST` | `/auth/change-password` | Done |

### Commerce

| Method | Path | Status |
| --- | --- | --- |
| `GET` | `/products`, `/products/slug/:slug`, `/products/:id` | Done (read-only) |
| `GET`/`PUT`/`DELETE` | `/cart`, `/cart/items`, `/cart/items/:productId` | Done |
| `POST` | `/orders/preview`, `/orders/checkout` | Done |
| `GET` | `/orders`, `/orders/:id`, `/orders/by-number/:n` | Done |
| `POST` | `/payments/intent`, `/payments/simulate` | Done |
| `POST` | `/webhooks/paymob`, `/webhooks/bosta` | Done |

### Patients / leads / chat

| Method | Path | Status |
| --- | --- | --- |
| `GET`/`POST`/`PATCH` | `/patients`, `/patients/:id` | Done (no delete) |
| `POST` | `/leads` | Done |
| `POST`/`GET` | `/conversations`, `/conversations/:id` | Done |
| `GET`/`POST` | `/conversations/:id/messages` | Done |
| `POST` | `/conversations/:id/read` | Done |
| `PATCH` | `/conversations/:id/assign` | Done (`chat.assign`) |

### Admin

| Method | Path | Permission | Status |
| --- | --- | --- | --- |
| `GET`/`POST`/`PATCH` | `/admin/users*` | `users.invite` | Done |
| `GET` | `/admin/clients` | `clients.read` | Done |
| `GET`/`POST`/`PATCH` | `/admin/roles*`, `/admin/permissions` | `roles.manage` | Done |
| `GET` | `/admin/orders` | `orders.read` | Done |
| `POST` | `/admin/orders/:id/confirm`, `.../ship` | `orders.manage` | Done |
| `GET` | `/admin/leads` | `leads.read` | Done |

---

## API — realtime, data, integrations, infra

| Area | Completed |
| --- | --- |
| **Socket.IO `/chat`** | Push events: `chat:ready`, `conversation:created`, `conversation:message`, `conversation:updated` (REST for writes) |
| **Prisma models (16)** | User, tokens, roles/permissions, Product, Cart/CartItem, Order/OrderItem, Payment, Shipment, Conversation/Message, Lead, Patient — all wired |
| **Seed** | 9 permissions, Support/Sales/Ops roles, 4 demo users (`demo12345`), 4 hardware + 5 design products |
| **Paymob** | Pixel preferred; legacy iframe; webhook HMAC; simulate in non-prod when unset |
| **Bosta** | Live pricing/create when keyed; else flat 150 EGP + demo AWB; webhook can set DELIVERED |
| **SMTP** | Invite + reset emails when set; else log/skip and still return invite URL |
| **Google** | ID token verify when `GOOGLE_CLIENT_ID` set |
| **Deploy** | Docker local/staging/prod, Dockerfile migrate-on-boot, Hostinger script, nginx TLS confs |

**RBAC permissions with working endpoints:** `users.invite`, `roles.manage`, `orders.read`, `orders.manage`, `clients.read`, `leads.read`, `chat.reply`, `chat.assign`.

---

# MISSING / PARTIAL

## High impact — product & brand (FE)

| Gap | Detail | Priority |
| --- | --- | --- |
| **Five resin child pages** | Need routes for ceramic-crown, crown-bridge, ortho-model, surgical-guide, temporary; cards currently `#docs-{id}` | High |
| **Cure URL consolidation** | Default nav/footer → `/products/curing-machines` (legacy 2λ / 385+405). Correct page is `/products/cure-v6`. Dual nav labels (“ODYX Cure” + “Cure V2”) | High |
| **Five-step spine sitewide** | Spec/product screens = 5 steps. `/workflows`, `workflow.ts`, `nav.ts`, AI FAQ, some metadata still include **Finish** (6 steps) | High |
| **Sitewide token migration** | Global `--sky:#06a5df` + Sora/Space Grotesk. Approved `#0050D8` + Tajawal only on scoped product CSS | High |
| **i18n content** | No message catalogs; EN copy everywhere; AR only flips RTL chrome; FR/Chinese not content-ready | Medium |
| **Cross-links to legacy cure** | e.g. resins wash-cure still link `/products/curing-machines` | Medium |
| **UW-03 leftovers** | Off website per 037; still mentioned in some resin/ecosystem copy | Low |

---

## Knowledge-base section gaps

### 034
- Clinical cases/reviews hidden  
- Client video missing  
- Downloads empty / on request  
- Open: price, consumables tip, uncatalogued AI features, PDFs  

### 036
- Proof hidden; videos poster-only; downloads on request  
- OPEN-QUESTIONS #1–2, #4–13 (HALOT claims, prices, PDFs, cases, warranty, ROI nod, resin gaps, ACF, photo identity, studio shots, service network)  

### 037
- Results gallery hidden; Smart Heating held  
- Hero photo identity unconfirmed  
- **Not** primary nav target  

### 039
- Child detail pages missing  
- Real TDS/SDS blocked (Scientific Team)  
- CE/FDA refresh / canonical names open  

---

## Brief / sitemap features not built

| Feature | Evidence |
| --- | --- |
| **Case library** (`/cases`) | Linked from solutions/workflows — no `page.tsx` |
| **Events calendar** | Not in `src/app/` |
| **Learning CMS / courses** | `/learning` static; `/learning/courses` linked but no route |
| **Dedicated Contact / multi CRM forms** | Support anchors + WhatsApp only |
| **Distributor real journey** | Home path lane only |
| **Staining & glazing product line** | In brief; no product page |
| **Legal pages** | Privacy / terms / cookies “coming soon” on About |
| **Device registration API** | Home/support UI form only — no devices module |
| **Chinese locale** | Brief mention; locale type is `en\|ar\|fr` only |

---

## Platform gaps — API

| Gap | Detail |
| --- | --- |
| **`catalog.manage`** | Seeded (Sales role) — **no** product create/update/delete/deactivate endpoints |
| **File uploads** | `Message.attachmentName` string only — no storage/URL |
| **Order cancel** | `CANCELLED` in transition matrix — no HTTP |
| **Order deliver (staff)** | `DELIVERED` only via Bosta webhook — no staff HTTP |
| **Refunds** | `PaymentRecordStatus.REFUNDED` never set |
| **Conversation close** | `ConversationStatus.CLOSED` unused |
| **Lead status pipeline** | `CONTACTED` / `CLOSED` — no update API |
| **Patient delete** | Missing |
| **Role delete** | Create/patch only |
| **Shipment tracking GET** | `trackDelivery()` in provider — no route |
| **Tax** | Always `0` in pricing |
| **Seed hardware prices** | Dummy USD×50 EGP |
| **Logout / refresh revoke** | Soft stub; JWTs not denylisted |
| **Devices** | No model/module |
| **Tests** | Zero `src/**/*.spec.ts`; one health e2e |
| **CI** | No GitHub/GitLab workflows |
| **OpenAPI / Swagger** | Not installed |
| **API README** | Still incomplete vs real surface (see this doc) |

---

## Platform gaps — FE wiring

| Gap | Detail |
| --- | --- |
| Catalog admin UI | None |
| Lead status editor | List only |
| Order cancel / refund UI | None |
| Conversation assign UI | `assignConversationApi` defined, unused |
| Patient update UI | `updatePatientApi` defined, unused |
| Attachment upload UI | Metadata only |
| Real AI assistant | Keyword FAQ in `GlobalTools` only |
| Home legacy ecosystem map | Section exists but `hidden` |

---

## Client-blocked (cannot finish without client)

Full register: [`knowledge_base/OPEN-QUESTIONS.md`](./knowledge_base/OPEN-QUESTIONS.md).

| # | Blocker | Blocks |
| --- | --- | --- |
| 1–2 | HALOT resin compatibility & positioning | 036 HALOT copy |
| 4 | Published prices | Shop / CTAs / logged-in pricing |
| 5 | Datasheet / brochure PDFs | Downloads on 034/036/037/039 |
| 6 | Real clinical cases + named clinicians | Proof sections (hidden) |
| 7 | Warranty period/coverage | Trust / support |
| 8 | ROI on 036? | Section inclusion |
| 9 | Indications without ODYX resin lines | Router + 039 honesty |
| 10 | ACF on HALOT? | Feature attribution |
| 11 | Studio photo machine identity | Captions 036/034/037 |
| 12 | Production photography | 036 image slots |
| 13 | Service network | Objection handling sitewide |
| + | S1 video, tip consumables; UV-02 photo; resin TDS numbers | Per-screen depth |

---

# Suggested priorities

1. Consolidate curing to UV-02; redirect/drop legacy curing page  
2. Build the five resin child detail pages  
3. Enforce the five-step spine sitewide (workflows, nav, AI FAQ)  
4. Migrate global tokens to `#0050D8` + Tajawal (LTR + RTL)  
5. File uploads for design/chat attachments  
6. Admin catalog APIs + real product pricing  
7. Real Arabic (and optionally French) content  
8. Tests + CI; OpenAPI; keep README in sync with this doc  

---

## Key paths

| Concern | Path |
| --- | --- |
| FE routes | `src/app/` |
| FE page components | `src/components/pages/` |
| FE API client | `src/lib/api/`, `src/lib/config.ts` |
| Design authority | `knowledge_base/` |
| Open client questions | `knowledge_base/OPEN-QUESTIONS.md` |
| API modules | `odyx-api/src/` |
| Prisma / seed | `odyx-api/prisma/` |
| Env templates | `odyx-api/.env.example`, `.env.example` |
