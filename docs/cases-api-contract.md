# ODYX Cases API — Frontend Contract (v1)

**Audience:** Frontend engineers integrating the design-case wizard  
**Backend:** `odyx-api` (NestJS)  
**Base URL:** `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:4000`) — **no `/api` prefix**  
**Live OpenAPI:** `{BASE_URL}/docs`  
**Auth:** `Authorization: Bearer <accessToken>` (client account only)  
**Content-Type:** `application/json` except file upload (`multipart/form-data`)

---

## 1. Product flow (UI should mirror this)

```text
Create draft → PATCH doctor → PATCH details → PATCH send-method
            → upload files → POST submit
```

Optional after submit: existing shop checkout / inbox handoff is a **separate** product decision. This contract covers **Cases + Files + Lookups only**. Submit does **not** create a Conversation or Order.

**Suggested UI steps**

| Step | API calls |
|------|-----------|
| Open wizard | `POST /cases` (or `GET /cases/:id` to resume) |
| Doctor | `PATCH /cases/:id/doctor` |
| Details (patient, type, teeth…) | `GET /patients`, lookups, then `PATCH /cases/:id/details` |
| Send method | `PATCH /cases/:id/send-method` |
| Files | `POST/GET/DELETE /cases/:id/files` |
| Finish | `POST /cases/:id/submit` |
| My cases | `GET /cases` |

Draft mutations after `status === "SUBMITTED"` return **409**.

---

## 2. Auth & errors

| Code | Meaning |
|------|---------|
| `401` | Missing/invalid JWT |
| `403` | Not a **CLIENT** account (staff cannot manage cases) |
| `404` | Case/file not found **or** not owned (do not leak ownership) |
| `400` | Validation / incomplete submit / bad file type |
| `409` | Case already submitted |

Error body shape (Nest):

```json
{ "statusCode": 400, "message": "…", "error": "Bad Request" }
```

Incomplete submit may return:

```json
{
  "statusCode": 400,
  "message": "Case is incomplete",
  "missing": ["doctorName", "files"]
}
```

(`missing` is present when the service throws that payload; FE should display `message` and optionally list `missing`.)

---

## 3. Shared types

```ts
type CaseStatus = 'DRAFT' | 'SUBMITTED';
type CaseSendMethod = 'DIGITAL' | 'PHYSICAL';

type CaseFile = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string; // ISO
};

type Case = {
  id: string;
  caseNumber: string; // e.g. "ODYX-C-00001"
  status: CaseStatus;

  doctorName: string | null;
  doctorEmail: string | null;
  doctorPhone: string | null;
  clinicName: string | null;
  countryId: string | null;
  country?: { id: string; code: string; name: string } | null;

  patientId: string | null;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    ref?: string | null;
  } | null;

  designTypeId: string | null;
  designType?: { id: string; slug: string; name: string } | null;
  materialId: string | null;
  material?: {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
  } | null;

  toothNumbers: string[]; // FDI as strings, e.g. ["14","15"]
  shade: string | null;
  notes: string | null;

  sendMethod: CaseSendMethod | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingNotes: string | null;

  files: CaseFile[];

  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
```

---

## 4. Cases endpoints

### `POST /cases` — create draft

- **Auth:** client JWT  
- **Body:** none  
- **Response:** `Case` with `status: "DRAFT"`, empty fields, `files: []`

### `GET /cases` — list mine

- **Response:** `Case[]` (newest first)

### `GET /cases/:id` — get one

- **Response:** `Case` (includes nested lookups + file metadata; no binary)

### `PATCH /cases/:id/doctor`

```ts
type UpdateDoctorBody = {
  doctorName?: string;
  doctorEmail?: string; // email format
  doctorPhone?: string;
  clinicName?: string;
  countryId?: string | null; // from GET /countries
};
```

### `PATCH /cases/:id/details`

```ts
type UpdateDetailsBody = {
  patientId?: string | null; // must be owned patient from /patients
  designTypeId?: string | null; // from GET /design-types
  materialId?: string | null; // from GET /materials
  toothNumbers?: string[];
  shade?: string | null;
  notes?: string | null;
};
```

### `PATCH /cases/:id/send-method`

```ts
type UpdateSendMethodBody = {
  sendMethod?: 'DIGITAL' | 'PHYSICAL';
  shippingAddress?: string | null; // required on submit if PHYSICAL
  shippingCity?: string | null; // required on submit if PHYSICAL
  shippingNotes?: string | null;
};
```

### `POST /cases/:id/submit`

- **Body:** none  
- **Success:** `Case` with `status: "SUBMITTED"` and `submittedAt` set  
- **Requires before success:**
  - `doctorName`, `doctorEmail`, `clinicName`
  - `designTypeId`
  - `sendMethod`
  - if `DIGITAL` → at least one file
  - if `PHYSICAL` → `shippingAddress` + `shippingCity`

---

## 5. Files endpoints

### `GET /cases/:id/files`

- **Response:** `CaseFile[]`

### `POST /cases/:id/files` — upload (draft only)

- **Content-Type:** `multipart/form-data`  
- **Field name:** `file` (required)  
- **Max size:** 50 MB  
- **Allowed extensions:** `.stl` `.ply` `.obj` `.zip` `.pdf` `.jpg` `.jpeg` `.png`  
- **Response:** `CaseFile`  
- **Note:** Do **not** set `Content-Type: application/json`. Let the browser set the multipart boundary.

### `GET /cases/:id/files/:fileId/download`

- **Response:** binary stream  
- Headers include `Content-Type`, `Content-Disposition`, `Content-Length`

### `DELETE /cases/:id/files/:fileId`

- **Draft only**  
- **Response:** `{ "ok": true }`

---

## 6. Lookup endpoints (JWT)

### `GET /countries`

```ts
{ id: string; code: string; name: string }[]
```

### `GET /materials`

```ts
{ id: string; slug: string; name: string; description?: string | null }[]
```

Seeded slugs (stable): `ceramic-crown`, `crown-bridge`, `temporary-restoration`, `model-2`, `surgical-guide-pro`

### `GET /design-types`

```ts
{ id: string; slug: string; name: string }[]
```

Seeded slugs (stable): `single-unit`, `dsd-veneers`, `rpd`, `occlusal-splint`, `surgical-guide`

**Map shop design SKUs → design-type slug**

| Product slug (`/products?category=design`) | Design type slug |
|--------------------------------------------|------------------|
| `design-single-unit` | `single-unit` |
| `design-dsd-veneers` | `dsd-veneers` |
| `design-rpd` | `rpd` |
| `design-occlusal-splint` | `occlusal-splint` |
| `design-surgical-guide` | `surgical-guide` |

### `GET /teeth`

```ts
{ fdi: number; arch: 'upper' | 'lower'; quadrant: 1 | 2 | 3 | 4 }[]
```

Permanent FDI 11–48 (32 teeth). Frontend may still use its own odontogram; this endpoint is the canonical list.

### Related (already exists)

- `GET/POST /patients`, `GET/PATCH /patients/:id` — use for case `patientId`

---

## 7. Example sequence (curl)

```bash
BASE=http://localhost:4000
TOKEN=… # from POST /auth/login

# 1) Draft
CASE=$(curl -s -X POST "$BASE/cases" -H "Authorization: Bearer $TOKEN")
CID=$(echo "$CASE" | jq -r .id)

# 2) Lookups
curl -s "$BASE/countries" -H "Authorization: Bearer $TOKEN"
curl -s "$BASE/design-types" -H "Authorization: Bearer $TOKEN"
curl -s "$BASE/materials" -H "Authorization: Bearer $TOKEN"

# 3) Doctor
curl -s -X PATCH "$BASE/cases/$CID/doctor" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"doctorName":"Dr Sarah","doctorEmail":"sarah@clinic.com","clinicName":"Smile Clinic","countryId":"<countryId>"}'

# 4) Details
curl -s -X PATCH "$BASE/cases/$CID/details" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"patientId":"<patientId>","designTypeId":"<designTypeId>","toothNumbers":["14"],"notes":"…"}'

# 5) Send method
curl -s -X PATCH "$BASE/cases/$CID/send-method" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"sendMethod":"DIGITAL"}'

# 6) File
curl -s -X POST "$BASE/cases/$CID/files" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@./scan.stl;type=application/octet-stream"

# 7) Submit
curl -s -X POST "$BASE/cases/$CID/submit" -H "Authorization: Bearer $TOKEN"
```

---

## 8. FE implementation checklist

- [ ] JWT client helpers for all routes above  
- [ ] Multipart upload helper (no forced JSON Content-Type)  
- [ ] Wizard with draft id in URL/query for resume (`?caseId=`)  
- [ ] Prefill doctor from `/auth/me` (name, email, phone, org)  
- [ ] Prefill `designTypeId` from selected design-service slug map  
- [ ] Patient picker using existing `/patients`  
- [ ] Country / material / design-type selects from lookups  
- [ ] Tooth chart → `toothNumbers: string[]` (FDI)  
- [ ] DIGITAL vs PHYSICAL UI; shipping fields only when PHYSICAL  
- [ ] Block edits when `status === "SUBMITTED"`  
- [ ] My cases list (`GET /cases`) with Resume for drafts  
- [ ] Surface `400` incomplete `missing[]` and `409` clearly  

---

## 9. Out of scope (v1 backend)

- Notifications API  
- Global `/api` prefix (do not call `/api/cases`)  
- S3/R2 (files are local disk on API host)  
- Admin case inbox  
- Auto Conversation/Order on submit  

---

**Source of truth:** Nest controllers in `odyx-api/src/cases` + `odyx-api/src/lookups`, and Swagger at `/docs`.
