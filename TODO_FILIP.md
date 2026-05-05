# TODO Filip — manuální kroky před launchem

> Žije souběžně s `docs/superpowers/plans/2026-05-05-pohoda-ebook-implementation.md`. Code je hotový z mé strany — tady jsou všechny věci, kde potřebuju **tvoje účty, klíče, peníze nebo rozhodnutí**.

Pořadí je optimalizované — můžeš jet shora dolů. Kde to dává smysl, jsou seskupené paralelní kroky.

---

## 0) Před vším — Vercel deploy (PHASE 1 checkpoint)

- [ ] `npm install -g vercel`
- [ ] `vercel login`
- [ ] `vercel --prod` (vyber Vercel Pro plán, project name `pohodazdomova`)
- [ ] V doménovém registrátoru, kde máš pohodazdomova.cz, nastavit:
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] V Vercel dashboardu → Settings → Domains → přidat `pohodazdomova.cz` a `www.pohodazdomova.cz` (Vercel sám provisionuje SSL, trvá 5–30 min)

---

## 1) Supabase (PHASE 2)

- [ ] Vytvořit projekt na supabase.com
  - Name: `pohodazdomova`
  - Region: `eu-central-1` (Frankfurt — nejblíž ČR)
  - Strong DB password (uložit do password manageru)
- [ ] V Supabase dashboardu → **SQL Editor** → vložit obsah `supabase/migrations/0001_initial.sql` → Run
- [ ] V **Table Editor** ověřit že existují tabulky: `products`, `orders`, `email_log`, `refunds` (a v `products` je 5 řádků)
- [ ] V **Storage** → Create bucket
  - Name: `pdfs`
  - **Visibility: Private** (důležité — používáme signed URLs)
- [ ] Settings → API → zkopírovat:
  - `Project URL` → `SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (POZOR: tajný, jen server-side, nikdy do gitu)
- [ ] Doplnit do `.env.local` a do Vercel → Settings → Environment Variables (Production)

---

## 2) Stripe (PHASE 2)

- [ ] Registrace na stripe.com (real business: jméno, IČ, adresa, číslo bankovního účtu)
- [ ] Aktivovat účet (KYC dokumenty — občanka nebo pas)
- [ ] Dashboard → **Developers → API keys** → zkopírovat:
  - `Secret key` → `STRIPE_SECRET_KEY` (pro dev použij **test mode** klíče `sk_test_...`)
  - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_...`)
- [ ] Dashboard → **Developers → Webhooks → Add endpoint**:
  - URL: `https://pohodazdomova.cz/api/webhook/stripe`
  - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
  - Save → zkopírovat **Signing secret** (`whsec_...`) → `STRIPE_WEBHOOK_SECRET` do Vercelu
- [ ] **Lokální webhook test** (potřebné pro full flow test):
  ```bash
  brew install stripe/stripe-cli/stripe
  stripe login
  stripe listen --forward-to localhost:3000/api/webhook/stripe
  ```
  Stripe CLI vypíše vlastní webhook secret pro lokál — tento dej do `.env.local` jako `STRIPE_WEBHOOK_SECRET` (na Vercelu zůstane production whsec).

### 2.1) Live mode přepnutí (před launchem)

- [ ] Stripe Dashboard → toggle Test mode → Live mode
- [ ] Vygenerovat **Live** API keys → vyměnit na Vercelu `STRIPE_SECRET_KEY` a `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` za `sk_live_...` a `pk_live_...`
- [ ] Webhook endpoint vytvořit znovu v Live mode → updatovat `STRIPE_WEBHOOK_SECRET`

---

## 3) PDF placeholdery (PHASE 2)

- [ ] Vyrobit 4 single-page PDF (klidně v Pages/Word/Canva, "Coming soon — pohoda z domova"):
  - `ai-ugc-reklamy.pdf`
  - `ai-grafika.pdf`
  - `ai-weby.pdf`
  - `bonus-prvni-klient.pdf`
- [ ] Nahrát do Supabase Storage bucket `pdfs/` (drag & drop v Storage UI)
- [ ] Před launchem nahradit reálnými e-booky (stejný název)

---

## 4) End-to-end test PHASE 2 (až máš 1-3 hotové)

- [ ] `npm run dev` v jednom terminálu
- [ ] `stripe listen --forward-to localhost:3000/api/webhook/stripe` v druhém
- [ ] V prohlížeči otevři http://localhost:3000/ai-grafika
- [ ] Klik "Koupit za 399 Kč" → checkout
- [ ] Vyplň email, zaškrtni oba souhlasy
- [ ] Zaškrtni FOMO bump bar → cena se má update na 999 Kč
- [ ] Zaplať Stripe test kartou: `4242 4242 4242 4242`, exp `12/30`, cvc `123`, ZIP libovolný
- [ ] Po redirectu na `/diky` ověř že se zobrazí 4 download linky (3 e-booky + bonus)
- [ ] V Stripe Dashboardu (test mode) → Payments — vidíš 999 Kč succeeded
- [ ] V Supabase Table Editor → orders — vidíš row se status `paid`, `product_slugs: ['bundle']`, `has_bonus: true`
- [ ] V Stripe CLI okně vidíš `payment_intent.succeeded -> 200`
- [ ] Klikni "Stáhnout" u jednoho linku → PDF se stáhne

---

## 5) Resend (PHASE 3 — e-maily)

- [ ] Registrace na resend.com (free tier 100 emailů/den stačí pro start)
- [ ] **Domains → Add domain** → `pohodazdomova.cz`
- [ ] Resend zobrazí DNS records (SPF, DKIM, DMARC) → přidat je v doménovém registrátoru
- [ ] Počkat na verify (5–30 min, někdy hodiny)
- [ ] **API Keys → Create** → `RESEND_API_KEY` do Vercelu
- [ ] Vercel env var: `RESEND_FROM_EMAIL=Filip <filip@pohodazdomova.cz>`

### 5.1) Vercel Cron secret

- [ ] Vygeneruj náhodný string (např. `openssl rand -hex 32`) → `CRON_SECRET` env var ve Vercelu
- [ ] Vercel automaticky přidá `Authorization: Bearer <CRON_SECRET>` při volání `/api/cron/followup` díky `vercel.json` (už je v repu)

---

## 6) Mailerlite (PHASE 4 — lead magnet a nurture)

- [ ] Registrace na mailerlite.com
- [ ] **Subscribers → Groups → Create**:
  - Group "Lead magnet — homepage" → zkopírovat ID → `MAILERLITE_GROUP_ID_LEAD_MAGNET`
- [ ] **Integrations → Developer API** → API key → `MAILERLITE_API_KEY`
- [ ] Vytvořit automation: "Někdo přidán do skupiny → e-mail za 30 min s odkazem na free chapter PDF" (nebo cokoli, co chceš dát zdarma jako lead magnet)
- [ ] Pripravit free chapter PDF a hostovat někde (Supabase Storage public bucket, nebo přímo přiložit jako attachment v MailerLite e-mailu)

---

## 7) Meta Pixel + Conversions API (PHASE 4 — tracking)

- [ ] business.facebook.com → Events Manager → Create Pixel pro `pohodazdomova.cz`
- [ ] Zkopíruj **Pixel ID** → `META_PIXEL_ID`
- [ ] Events Manager → tvůj pixel → Settings → **Conversions API → Generate access token** → `META_CONVERSIONS_ACCESS_TOKEN`
- [ ] Po deployi otestovat:
  - Otevři / na produkci
  - V Events Manageru → Test Events vidíš PageView
  - Proveď test purchase → vidíš Purchase event s `value` a `currency`

---

## 8) GA4 (PHASE 4)

- [ ] analytics.google.com → vytvořit property "pohodazdomova.cz"
- [ ] Data stream → Web → URL `https://pohodazdomova.cz`
- [ ] Zkopíruj **Measurement ID** (`G-XXXXXX`) → `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## 9) Final pre-launch checklist

- [ ] Legal review obchodních podmínek a GDPR (nech projít právníkem nebo aspoň důkladný AI review)
- [ ] Nahradit placeholder PDF reálnými e-booky
- [ ] V `app/page.tsx` a `app/pribeh/page.tsx` zkontrolovat copy a upravit dle preferencí (žádné agresivní číselné sliby)
- [ ] Nahrát Filipovu fotku do `/public/filip.jpg` a nahradit placeholder kruh v `/pribeh`
- [ ] OG image — vytvořit `public/og-image.png` (1200×630), aktualizovat metadata v `app/layout.tsx`
- [ ] Doplnit IČ a sídlo do `content/obchodni-podminky.md` a `components/shared/Footer.tsx`
- [ ] Stripe live mode přepnutí
- [ ] Smoke test na produkci se skutečnou kartou (jeden tvůj nákup, pak refund přes Stripe Dashboard)
- [ ] Test e-mailů na production: tvůj e-mail dorazí, signed URL funguje

---

## 10) Po launchu

- [ ] Spustit Meta ads (UGC kreativy z dříve plánovaných side účtů)
- [ ] Sledovat: Stripe Dashboard, Supabase orders, Vercel logs, Meta Events Manager
- [ ] V `vercel.json` je cron na `/api/cron/followup` — běží denně 8:00 UTC, posílá T+1, T+5, T+10 e-maily
- [ ] Refund flow: Stripe Dashboard → Refund → automaticky webhookem se status v DB flipne na `refunded`

---

## Env vars cheat sheet

Tohle všechno musí být v `.env.local` (lokál) a ve Vercelu Production (deploy).

```
NEXT_PUBLIC_SITE_URL=https://pohodazdomova.cz

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=Filip <filip@pohodazdomova.cz>

MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID_LEAD_MAGNET=

META_PIXEL_ID=
META_CONVERSIONS_ACCESS_TOKEN=

NEXT_PUBLIC_GA_MEASUREMENT_ID=

CRON_SECRET=
```
