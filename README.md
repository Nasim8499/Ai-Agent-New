# Visa Agent OS

A secure AI visa application and browser automation platform starter built with Next.js, Playwright, SSE, and Mistral AI integration.

## Features
- White-theme dashboard and visa workspace
- AI-generated application planning with Mistral API
- Browser automation worker with Playwright
- OCR-ready worker interface
- SSE event streaming for live execution metrics
- Supabase schema starter for applications, runs, and events
- Docker compose scaffold for web + worker + Redis + n8n

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run worker
```

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
MISTRAL_API_KEY=your-mistral-key
```

## Notes
- Only approved government portals should be automated.
- Require explicit human approval before final submission or payment.
- OCR is advisory and must not be treated as truth.
