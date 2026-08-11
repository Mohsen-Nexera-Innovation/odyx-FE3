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

| Environment | Where | Git branch | Ports (shared VPS) |
| --- | --- | --- | --- |
| **Staging** | Hostinger VPS Docker (also optional Vercel FE) | `main` | web `:3000`, API `:4000` |
| **Production** | Hostinger VPS Docker | `production` | web `:3001`, API `:4001` |

Full ops guide lives in the API repo: **`odyx-api/deploy/README.md`**.

### Deploy production

1. Merge/cherry-pick the release onto this repo’s `production` branch and push.
2. Ensure the API `production` branch is updated the same way.
3. GitHub Actions runs **CI** on `production`, then **Deploy Production VPS** (`ODYX_ENV=production ./deploy/vps-deploy.sh web`). You can also trigger that workflow manually from the Actions tab.

Manual fallback on the VPS:

```bash
ssh -i ~/.ssh/odyx_github_actions -p 2222 root@<VPS_HOST>
cd /opt/odyx/api
ODYX_ENV=production ./deploy/vps-deploy.sh all
# or web only:
ODYX_ENV=production ./deploy/vps-deploy.sh web
```

```text
/opt/odyx/api  → odyx-api
/opt/odyx/web  → this repo
```

Verify: `https://odyxegypt.net` (web) and `https://api.odyxegypt.net/health` (API).

GitHub Actions deploys **staging** (`main`) and **production** (`production`). Same secrets as staging: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_SSH_PORT`, `VPS_DEPLOY_PATH=/opt/odyx/api`.

`NEXT_PUBLIC_USE_API` and `NEXT_PUBLIC_API_URL` are Docker build args (from `.env.production` on the VPS).

### Vercel staging (optional)

Set in the Vercel project:

```bash
NEXT_PUBLIC_USE_API=true
NEXT_PUBLIC_API_URL=https://staging-api.odyx.com
```
