# Launch guide — od nuly k pohodazdomova.cz live

> Dělej kroky **v tomto pořadí**. U každého kroku je box **„Pošli mi"** — to jsou věci, které mi napiš/vlož do chatu, abych ti je dal do Vercelu, ověřil připojení a posunul tě dál. Pokud env vars dáš do Vercelu sám, stačí napsat „hotovo" + verzi (test/live).
>
> **Aktuální ceny v kódu** (kdyby ses divil): UGC 499 / grafika 299 / weby 599, balíček 999 Kč (úspora 398 Kč). Bonus „Jak sehnat prvního klienta" jen v balíčku. Vše počítané server-side, nemusíš nic v Stripe nastavovat.

---

## KROK 0 — GitHub repo (5 min, volitelné ale doporučuju)

Bez GitHubu funguje Vercel deploy přes CLI, ale s GitHubem máš auto-deploy na push, preview PRy a já tam můžu pushovat opravy.

- [ ] `gh repo create pohodazdomova --private --source=. --remote=origin --push` (potřebuje gh CLI), **nebo** ručně:
  - na github.com vytvoř repo `pohodazdomova` (private)
  - `git remote add origin git@github.com:USERNAME/pohodazdomova.git`
  - `git push -u origin main --tags`

> **Pošli mi:** URL repozitáře (`https://github.com/USERNAME/pohodazdomova`). Pokud GitHub přeskočíš, napiš „bez GitHubu".

---

## KROK 1 — Vercel deploy + doména (15-30 min, +30 min na DNS)

### 1.1 Deploy

- [ ] `npm install -g vercel && vercel login`
- [ ] V root projektu: `vercel --prod`
- [ ] Při promptech: project name `pohodazdomova`, framework Next.js (auto), build command `npm run build` (auto)
- [ ] Vercel ti vrátí URL typu `https://pohodazdomova-xxx.vercel.app` — funkční, ale bez env vars zatím nepojde checkout

### 1.2 Doména

- [ ] V doménovém registrátoru, kde máš `pohodazdomova.cz`:
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] Vercel dashboard → projekt → Settings → Domains → Add → `pohodazdomova.cz` + `www.pohodazdomova.cz`
- [ ] Vercel automaticky provisuje SSL (5–30 min)

### 1.3 Základní env var

- [ ] Vercel dashboard → projekt → Settings → Environment Variables → přidat pro Production:
  - `NEXT_PUBLIC_SITE_URL` = `https://pohodazdomova.cz`

> **Pošli mi:**
> 1. Production URL (`https://pohodazdomova-xxx.vercel.app` nebo už `https://pohodazdomova.cz`)
> 2. Jaký registrátor domény používáš (Wedos / OnlyDomains / Forpsi / ...) — pro případ že DNS bude divný
> 3. „Doména hotová" jakmile pohodazdomova.cz vrací HTTPS

---

## KROK 2 — Supabase (10 min)

### 2.1 Projekt

- [ ] supabase.com → New project
  - Name: `pohodazdomova`
  - Region: **`eu-central-1` (Frankfurt)**
  - Strong DB password (ulož do password manageru)
- [ ] Počkej cca 2 min než se projekt vytvoří

### 2.2 Migration

- [ ] Supabase dashboard → SQL Editor → New query
- [ ] Vlož celý obsah `supabase/migrations/0001_initial.sql` (najdeš v repu) → Run
- [ ] Table Editor → ověř že existují: `products`, `orders`, `email_log`, `refunds` (a v `products` 5 řádků)

### 2.3 Storage bucket

- [ ] Storage → Create bucket
  - Name: `pdfs`
  - **Visibility: Private** ← důležité, používáme signed URLs

### 2.4 API keys

- [ ] Settings → API → zkopíruj 3 hodnoty:
  - `Project URL` → půjde do `SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_URL`
  - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (TAJNÝ, jen server)

### 2.5 Vlož do Vercelu

- [ ] Vercel → Settings → Environment Variables → přidat 4 vars (Production):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> **Pošli mi:** „Supabase hotové" + Project URL (tu nemusíš tajit, anon key taky ne, jen service_role neposílej v plain — tu nahraj přímo do Vercelu).

---

## KROK 3 — Stripe TEST mode (15 min, KYC pro live mode bývá pomalejší)

### 3.1 Účet + test keys

- [ ] stripe.com → Sign up (real business: jméno, IČ, adresa, číslo bank. účtu)
- [ ] Aktivuj účet (občanka/pas, KYC) — pro test mode stačí registrace, KYC až pro live
- [ ] Dashboard → ujisti se že máš **Test mode** ON (toggle vlevo dole)
- [ ] Developers → API keys → zkopíruj:
  - `Publishable key` (`pk_test_...`)
  - `Secret key` (`sk_test_...`)

### 3.2 Webhook (production)

- [ ] Dashboard → Developers → Webhooks → Add endpoint
- [ ] URL: `https://pohodazdomova.cz/api/webhook/stripe`
- [ ] Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
- [ ] Save → zkopíruj **Signing secret** (`whsec_...`)

### 3.3 Vlož do Vercelu

- [ ] Production env vars:
  - `STRIPE_SECRET_KEY` = `sk_test_...`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
  - `STRIPE_WEBHOOK_SECRET` = `whsec_...` (production webhook secret z 3.2)

### 3.4 Lokální Stripe CLI (pro test webhooku v dev)

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

CLI vypíše vlastní `whsec_...` jen pro lokál — ten dej do `.env.local` (ne do Vercelu).

> **Pošli mi:** „Stripe test mode hotový" + verzi webhook URL pokud se liší.

---

## KROK 4 — Resend (10 min + ~30 min DNS verify)

### 4.1 Účet

- [ ] resend.com → Sign up (free tier 100 mail/den stačí na start)
- [ ] Domains → Add domain → `pohodazdomova.cz`
- [ ] Resend zobrazí DNS records (SPF, DKIM, DMARC) → přidej je v doménovém registrátoru
- [ ] Počkej na "Verified" status (5–30 min, max pár hodin)

### 4.2 API key

- [ ] API Keys → Create → zkopíruj `re_...`
- [ ] Vercel env vars Production:
  - `RESEND_API_KEY` = `re_...`
  - `RESEND_FROM_EMAIL` = `Filip <filip@pohodazdomova.cz>`

> **Pošli mi:** „Resend doména verified" + screenshot Resend dashboardu se zelenou tečkou pro Verified (kdyby DNS dělalo problém).

---

## KROK 5 — Cron secret (1 min)

- [ ] Vygeneruj náhodný 64-znakový string:
  ```bash
  openssl rand -hex 32
  ```
- [ ] Vercel env var Production: `CRON_SECRET` = výsledek

Vercel sám automaticky volá `/api/cron/followup` denně 9:00 UTC s tímto Bearer tokenem (konfigurace v `vercel.json` v repu).

> **Pošli mi:** nic, nebo „cron hotový".

---

## KROK 6 — PDF placeholdery do Supabase (10 min)

Aby šlo testovat doručení po platbě, potřebuješ 4 PDFy v bucketu `pdfs/`. Stačí jednostránkové „Coming soon — pohoda z domova" PDFy (Pages / Word / Canva).

- [ ] Vyrob 4 PDF a nahraj do Supabase Storage → bucket `pdfs/` (drag & drop):
  - `ai-ugc-reklamy.pdf`
  - `ai-grafika.pdf`
  - `ai-weby.pdf`
  - `bonus-prvni-klient.pdf`
- [ ] Před launchem nahradíš stejnými názvy reálnými e-booky

> **Pošli mi:** „PDFy nahrané".

---

## KROK 7 — Test end-to-end na produkci (15 min)

Po krocích 1-6 by měl jít plný checkout flow.

- [ ] Otevři https://pohodazdomova.cz
- [ ] Klikni `Koupit za 299 Kč` u AI grafiky (nejlevnější pro test)
- [ ] V checkoutu vyplň svůj e-mail, zaškrtni oba souhlasy
- [ ] Zaškrtni FOMO bump bar → cena se má update na 999 Kč
- [ ] Zaplať Stripe **test kartou** `4242 4242 4242 4242`, exp `12/30`, cvc `123`, ZIP libovolný
- [ ] Po redirectu na `/diky` ověř 4 download linky (3 e-booky + bonus PDF)
- [ ] Klikni Stáhnout u jednoho linku → tvůj placeholder PDF se stáhne
- [ ] Stripe Dashboard (test mode) → Payments — vidíš 999 Kč succeeded
- [ ] Supabase Table Editor → orders — vidíš row se status `paid`, `product_slugs: ['bundle']`
- [ ] Tvůj e-mail (případně spam) — došel mail _„Tvoje e-booky jsou připravené ke stažení"_
- [ ] Klikni link v mailu → PDF stažení funguje

> **Pošli mi:** výsledek testu. Pokud něco selže, screenshot Vercel logs (Functions → vyber endpoint → posledních 50 invocations).

---

## KROK 8 — Mailerlite (10 min, lze udělat až po launchi)

### 8.1 Účet + skupina + automation

- [ ] mailerlite.com → Sign up (free tier 1000 subscribers / 12000 mailů/měs)
- [ ] Subscribers → Groups → Create → "Lead magnet — 8 AI nástrojů"
- [ ] Note → ID skupiny
- [ ] Automations → Create:
  - Trigger: "Joins group: Lead magnet — 8 AI nástrojů"
  - Step: send welcome email s odkazem na PDF/Notion s 8 AI nástroji + use-casy
  - (případně další e-maily T+2, T+5 dle libosti)
- [ ] Integrations → Developer API → Generate token

### 8.2 Lead magnet content

- [ ] Vytvoř PDF nebo public Notion stránku se seznamem 8 AI nástrojů, které opravdu používáš (Claude / Supabase / Vercel / Cursor / MidJourney / ElevenLabs / Linear / Framer + konkrétní use-cases a ceny)
- [ ] URL na lead magnet vlož do welcome mailu v MailerLite

### 8.3 Vlož do Vercelu

- [ ] Production env vars:
  - `MAILERLITE_API_KEY` = token
  - `MAILERLITE_GROUP_ID_LEAD_MAGNET` = ID skupiny

> **Pošli mi:** „Mailerlite hotové" + URL na lead magnet PDF (abych se podíval, jestli to dává smysl).

---

## KROK 9 — GA4 + Meta Pixel + Conversions API (15 min)

### 9.1 GA4

- [ ] analytics.google.com → Create property → `pohodazdomova.cz`
- [ ] Data stream → Web → URL `https://pohodazdomova.cz`
- [ ] Zkopíruj **Measurement ID** (`G-XXXXXXXX`)
- [ ] Vercel env: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXX`

### 9.2 Meta Pixel + Conversions API

- [ ] business.facebook.com → Events Manager → Create Pixel pro `pohodazdomova.cz`
- [ ] Zkopíruj **Pixel ID** (číslo)
- [ ] Pixel → Settings → Conversions API → **Generate access token**
- [ ] Vercel env vars:
  - `NEXT_PUBLIC_META_PIXEL_ID` = pixel ID
  - `META_CONVERSIONS_ACCESS_TOKEN` = token

### 9.3 Test

- [ ] Po deployi otevři / na produkci → v Meta Events Manager → Test Events vidíš PageView do několika sekund
- [ ] Proveď test purchase → vidíš Purchase event s `value: 999, currency: CZK`

> **Pošli mi:** „GA4 + Meta hotové" + screenshot Meta Test Events s PageView (volitelné).

---

## KROK 10 — Finální polish před launchem (variabilní čas)

### 10.1 Reálné PDFy

- [ ] Když máš e-booky finální, nahraj je do Supabase Storage `pdfs/` se stejnými názvy (přepíší placeholdery)

### 10.2 Filipova fotka

- [ ] Foto v cca 400×400 px na `/public/filip.jpg` (přidej commitem / pushni / Vercel auto-redeploy)
- [ ] Pak v `components/landing/AuthorSection.tsx` a `components/landing/CustomerStories.tsx` (sekce featured pro Marka — ten dostane vlastní foto pokud existuje, jinak nech placeholder) přidej `imageSrc="/filip.jpg"` do `<PersonPlaceholder>`

> **Pošli mi:** fotku jako attachment (nebo URL kam si ji uložíš v Supabase Storage public bucket). Já ti pak pushnu úpravy komponent.

### 10.3 OG image

- [ ] Vyrob `/public/og-image.png` 1200×630, navy + gold + logo + headline
- [ ] (Pokud nechceš kreslit, řekni mi, vyrobím ti SVG verzi)

### 10.4 Legal — IČ, sídlo, finální právní review

- [ ] Doplň `IČ` a `sídlo` do:
  - `components/shared/Footer.tsx` (řádek `Filip Mojík, IČ: [doplnit]`)
  - `content/obchodni-podminky.md` (sekce 1)
  - `content/gdpr.md` (sekce 1)
- [ ] Nech projít OP a GDPR právníkem nebo aspoň důkladný AI review (Claude se k tomu hodí)

> **Pošli mi:** IČ + sídlo (klidně rovnou v chatu, je to veřejné) — já to za tebe vložím a pushnu.

### 10.5 Stripe LIVE mode

- [ ] Stripe Dashboard → toggle Test → Live (potřebuje dokončené KYC)
- [ ] Developers → API keys → zkopíruj LIVE keys (`sk_live_`, `pk_live_`)
- [ ] **Vyměň** v Vercel Production env:
  - `STRIPE_SECRET_KEY` = `sk_live_...`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- [ ] Vytvoř NOVÝ webhook endpoint v Live mode s URL `https://pohodazdomova.cz/api/webhook/stripe`, stejné eventy
- [ ] Nový **signing secret** → vyměň `STRIPE_WEBHOOK_SECRET` ve Vercelu
- [ ] Vercel → Deployments → Redeploy production (aby chytly nové env vars)

### 10.6 Smoke test live

- [ ] 1 Kč test purchase reálnou kartou (vytvoř testovací produkt v Stripe? Ne — radši přes admin override v Supabase, nebo prostě udělej reálný nákup za 299 Kč a hned refundni)
- [ ] Refund přes Stripe Dashboard → ověř že přijde admin mail + status v DB se flipne na refunded

### 10.7 Tag launch

```bash
git tag v1.0-launch
git push --tags
```

---

## SHRNUTÍ: Co mi pošleš

V chatu mi piš v tomto pořadí (klidně po jednom řádku):

| Krok | Co mi pošleš |
|------|--------------|
| 0 | URL GitHub repa (nebo „bez GitHubu") |
| 1 | Vercel production URL + jaký registrátor domény |
| 2 | „Supabase hotové" |
| 3 | „Stripe test mode hotový" |
| 4 | „Resend doména verified" |
| 5 | „cron hotový" (volitelně) |
| 6 | „PDFy nahrané" |
| 7 | Výsledek end-to-end testu |
| 8 | „Mailerlite hotové" + URL na lead magnet |
| 9 | „GA4 + Meta hotové" |
| 10 | IČ + sídlo + foto |

**Tajné věci** (`SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `META_CONVERSIONS_ACCESS_TOKEN`, `MAILERLITE_API_KEY`, `RESEND_API_KEY`, `CRON_SECRET`) — vlož přímo do Vercelu, mně ne. Stačí napsat „nahráno".

**Public hodnoty** (`NEXT_PUBLIC_*`, `RESEND_FROM_EMAIL`, `MAILERLITE_GROUP_ID_LEAD_MAGNET`, `NEXT_PUBLIC_SITE_URL`, GA4 měření, Meta Pixel ID) — můžeš mi je v chatu napsat klidně, jsou stejně viditelné v browseru.

---

## Komplet env vars cheat sheet

Tohle všechno musí být v `.env.local` (lokál) **i** ve Vercelu Production (deploy):

```
# Public
NEXT_PUBLIC_SITE_URL=https://pohodazdomova.cz

# Supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe (test → live při launchi)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=Filip <filip@pohodazdomova.cz>

# Mailerlite (volitelné, lze později)
MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID_LEAD_MAGNET=

# Meta (volitelné, lze později)
NEXT_PUBLIC_META_PIXEL_ID=
META_CONVERSIONS_ACCESS_TOKEN=

# GA4 (volitelné, lze později)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Cron
CRON_SECRET=
```

---

## Časový odhad

| | Čistý čas | + čekání |
|---|---|---|
| Krok 0-1 | 15 min | + 30 min DNS |
| Krok 2 | 10 min | — |
| Krok 3 | 15 min | (KYC pro live mode může trvat 1-2 dny) |
| Krok 4 | 10 min | + 30 min DNS verify |
| Krok 5-6 | 15 min | — |
| Krok 7 (test) | 15 min | — |
| Krok 8-9 | 25 min | — |
| Krok 10 (polish) | 30-90 min | + KYC pro Stripe live |
| **Celkem** | **2-3 hodiny aktivní práce** | + ~1 hodina čekání DNS + KYC dle Stripe |

Pro MVP test (kroky 0-7) ti stačí ~hodina aktivní práce. Mailerlite + tracking + foto + IČ klidně až po prvních testech.
