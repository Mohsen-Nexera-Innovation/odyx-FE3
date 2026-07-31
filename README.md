# ODYX — Marketing Website (odyx-FE2)

Next.js marketing site for **ODYX** digital dentistry — homepage, products, workflows, solutions, support, and auth UI.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4

## Build

```bash
npm run build
npm start
```

## Environments

| Environment | Where | API |
| --- | --- | --- |
| **Staging** | Vercel | `https://staging-api.odyx.com` (Hostinger VPS) |
| **Production** | Hostinger VPS Docker | `https://api.odyx.com` |

### Vercel staging

Set in the Vercel project:

```bash
NEXT_PUBLIC_USE_API=true
NEXT_PUBLIC_API_URL=https://staging-api.odyx.com
```

### Production (Hostinger VPS)

Deployed with the API via Docker Compose. On the VPS:

```text
/opt/odyx/api  → odyx-api
/opt/odyx/web  → this repo
```

See `odyx-api` README → **Hostinger VPS + Vercel staging** for the full steps.

`NEXT_PUBLIC_USE_API` and `NEXT_PUBLIC_API_URL` are Docker build args (defaults: `true` / `https://api.odyx.com`).
