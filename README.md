# Ebrix Public Website (`ebrix.tech`)

Static-first marketing site with a small dynamic surface (lead intake form).

## Quick Start

```bash
cd web
npm run dev
```

Open `http://localhost:3000`.

## Configuration

Copy `web/.env.example` to `web/.env.local` and configure:

- `LEAD_WEBHOOK_URL` (required for successful form delivery)
- `LEAD_WEBHOOK_AUTH_HEADER` (optional)
- `LEAD_FALLBACK_EMAIL` (optional)
- `NEXT_PUBLIC_CONTACT_EMAIL` (optional)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional analytics)

## Lead Intake

`POST /api/lead` validates and delivers the submission to `LEAD_WEBHOOK_URL` as JSON:

```json
{
  "lead": {
    "name": "…",
    "company": "…",
    "email": "…",
    "message": "…"
  },
  "receivedAt": "2026-02-09T00:00:00.000Z",
  "source": "ebrix-web"
}
```

Anti-spam:

- Honeypot field (`website`)
- Basic in-memory rate limiting (best-effort; for stronger protection use an external store)

## Content Updates

Primary copy and structure:

- `web/src/app/page.tsx`
- `web/src/content/site.ts`

Privacy policy:

- `web/src/app/privacy/page.tsx`

3D hero (progressive enhancement):

- `web/src/components/hero/HeroVisual.tsx`
- `web/src/components/hero/Hero3D.tsx`

## Tests + Quality

```bash
cd web
npm test
npm run smoke
npm run lhci
```

## Deployment (Vercel)

1. Create a Vercel project with root directory set to `web/`.
2. Add env vars from `.env.local` to Vercel (Project Settings → Environment Variables).
3. Deploy (Preview + Production are HTTPS by default on Vercel).
4. Point the `ebrix.tech` DNS records to Vercel and add the domain in Vercel settings.

