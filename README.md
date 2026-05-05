# pohodazdomova.cz

E-shop pro 3 AI e-booky + bonus bundle. Next.js 15 / TypeScript / Tailwind v4 / Stripe / Supabase / Resend / Mailerlite.

## Quick start

```bash
npm install
cp .env.example .env.local   # pak doplnit reálné klíče
npm run dev                  # http://localhost:3000
```

## Skripty

- `npm run dev` — dev server (Turbopack)
- `npm run build` — produkční build
- `npm test` — Vitest unit + API testy (30+ testů)
- `npm run test:watch` — Vitest watch mode
- `npm run test:e2e` — Playwright E2E (vyžaduje běžící dev server)

## Struktura

```
app/                 # Next App Router (stránky + API routes)
  api/checkout/      # POST: vytvoří PaymentIntent + draft order
  api/checkout/update/ # POST: order bump dynamic update
  api/webhook/stripe/  # Stripe webhook (succeeded, refunded, failed)
  api/cron/followup/   # Vercel cron — denně 9:00 UTC
  api/lead/            # Mailerlite lead magnet sign-up
  api/help/resend/     # Re-send download link

components/
  brand/Logo.tsx
  shared/{StickyHeader,Footer,FAQ,SignupForm,ResendForm}.tsx
  product/{ProductHero,PricingCard}.tsx
  checkout/{CheckoutForm,OrderBumpBar,OrderSummary}.tsx
  tracking/{GA4,MetaPixel}.tsx

lib/                 # business logika + 3rd-party wrapery
  products.ts        # katalog (single source of truth)
  pricing.ts         # cart calc + fulfillment expansion
  validation.ts      # Zod schémata
  checkout-service.ts # createCheckout, updateCheckout, markOrderPaid, markOrderRefunded
  stripe.ts, supabase.ts, resend.ts, mailerlite.ts, meta-conversions.ts
  signed-url.ts      # 7-denní Supabase Storage signed URLs

emails/              # React Email templaty
  DownloadEmail.tsx        # po platbě
  StartedReadingEmail.tsx  # T+1
  UpsellEmail.tsx          # T+5 single→bundle
  ReviewRequestEmail.tsx   # T+10

content/             # Markdown pro legal pages
supabase/migrations/ # SQL migrace
tests/unit/          # Vitest pure logic
tests/api/           # Vitest API routes (mocked Stripe/Supabase)
tests/e2e/           # Playwright
```

## Architektura

- **Single source of truth pro produkty:** `lib/products.ts`
- **Single source of truth pro ceny:** `lib/pricing.ts` (server-side)
- **Idempotency:**
  - Webhook order paid: SQL `UPDATE ... WHERE status='pending'` (atomic)
  - Email logging: unique index `email_log(order_id, email_type)`
- **Lazy klienti:** `stripe.ts`, `supabase.ts`, `resend.ts` se inicializují až při prvním volání — build neselže bez env vars

## Deploy

Vercel Pro. Cron job konfigurovaný v `vercel.json` (denně 9:00 UTC).

## Co je k vyřízení

- `TODO_FILIP.md` — manuální kroky (účty, klíče, DNS, PDF, právní review)
- `LAUNCH_PUNCH_LIST.md` — QA test matrix před `v1.0-launch` tagem
- `docs/superpowers/specs/2026-05-05-pohoda-ebook-design.md` — produktová spec
- `docs/superpowers/plans/2026-05-05-pohoda-ebook-implementation.md` — implementační plán

## Tagy

- `phase2-complete` — checkout + payments hotové
- `phase4-complete` — tracking + admin email + QA šablona hotové
- `v1.0-launch` — bude po manuálním QA na live mode (zatím netagováno)
