# pohodazdomova.cz — design specification

**Datum:** 2026-05-05
**Status:** návrh připravený k implementaci
**Autor:** Filip Mojík + Claude (brainstorming)

---

## 1. Účel a cíl projektu

Online prodej **AI e-booků** pro českou cílovou skupinu lidí v zaměstnání, kteří hledají moderní přívýdělek z domova. Doména `pohodazdomova.cz`.

**Cílová skupina:** primárně zaměstnaní lidé (skupiny A+B z brainstormingu — od úplných začátečníků po freelancery/OSVČ s prvními zkušenostmi), kteří chtějí praktické dovednosti k privýdělku po večerech, bez studených hovorů a bez nutnosti měnit zaměstnání.

**Brand voice:** autentický, klidný, faktický. Vyloučeny agresivní číselné sliby ("vyděláš 30 000 navíc"), výkřiky a hype. Důvěra > rychlost prodeje. Nosný element brandu = osobní příběh autora (z práce na stavbě k tvorbě webů s AI po večerech).

---

## 2. Produktový lineup a ceny

| # | E-book | Cena | Poznámka |
|---|---|---|---|
| 1 | AI UGC reklamy | 399 Kč | Hlavní vstupní produkt — nejlepší pro UGC marketing (meta-loop) |
| 2 | AI grafika a vizuály | 399 Kč | Vizuálně dobře demonstrovatelný |
| 3 | AI weby pro malé firmy | 399 Kč | Konkrétní výdělek (CZ OSVČ platí za web 10–30 tis. Kč) |
| **Bundle** | **Všechny 3 + bonus** | **999 Kč** | Úspora 198 Kč vůči součtu |
| Bonus | "Jak sehnat prvního klienta" | — | Dostupný **pouze v bundle**. Obsahuje autorovy techniky včetně cold-email automatizace s AI personalizací |

**Délka každého e-booku:** maximálně 30 stran. Hutné, akční, žádný fluff.

**Budoucí rozšíření (po validaci, mimo MVP):** 4. e-book na téma AI automatizace pro firmy.

---

## 3. Site map (Next.js App Router)

```
pohodazdomova.cz/
├── /                         Homepage (hero + bundle pitch + 3 e-booky preview + příběh + CTA)
├── /pribeh                   Tvůj příběh (rozšířená verze, volitelně samostatná)
├── /ai-ugc-reklamy           Produktová LP (cílovka Meta ads)
├── /ai-grafika               Produktová LP (cílovka Meta ads)
├── /ai-weby                  Produktová LP (cílovka Meta ads)
├── /bundle                   Bundle LP — důraz na bonus a FOMO
├── /checkout                 Vlastní checkout s order bump
├── /diky                     Thank-you stránka s download linky
├── /obchodni-podminky        Legal
├── /gdpr                     Legal
└── /kontakt                  E-mail / formulář
```

**Šablona produktové LP (3× ve stejné struktuře, jiný obsah):** hero → pain/solution → what's inside → ukázky výstupů → cena 399 Kč → FAQ → sticky CTA.

**Šablona bundle LP:** hero "Všechny 3 + bonus za 999 Kč" → důraz na exkluzivní bonus → rozpis 3 produktů → FOMO ("bonus není dostupný samostatně") → CTA.

---

## 4. Vizuální identita

**Paleta (směr A z brainstormingu):**

| Role | HEX |
|---|---|
| Tmavé pozadí / akcent | `#1a1f3a` (deep navy) |
| Sekundární tmavá | `#2d3561` |
| Hlavní akcent | `#ffba08` (gold) |
| Světlé pozadí | `#f5f5f3` |
| Bílá | `#ffffff` |
| Tělo textu | `#1a1a1a` |

**Fonty:** Inter pro celé UI. Headlines v Inter 800/900, tělo v Inter 400. Bez serifu.

**Pocit:** moderní e-commerce (Shopify vibe), zaoblené rohy 8–12 px, jemné stíny pod kartami, generous whitespace. Žádné emoji v UI textech. Žádné gradienty kromě FOMO upsell baru.

**Logo:** wordmark "pohoda **z domova**" se zlatým barevným zvýrazněním druhé poloviny.

**Obálky e-booků:**
- 3 hlavní e-booky: navy pozadí (#1a1f3a a #2d3561) se zlatými metadata texty
- Bonus: zlatá obálka (#ffba08) na navy textu — vizuálně odlišný = exkluzivita
- Layout: "PRŮVODCE 0X" / "BONUS · JEN V BALÍČKU" label + velký název + "pohoda z domova" v patičce

---

## 5. Checkout flow + order bump

### 5.1 Layout

Klidný, Shopify-vibe layout (express checkout, kontakt, platba ve třech kartách vlevo; sticky souhrn vpravo) **plus jeden výrazně kontrastní FOMO upsell bar nahoře**. Kontrast je nositelem FOMO efektu — zbytek stránky musí zůstat klidný, aby upsell vyčníval.

**FOMO upsell bar:**
- Tmavě modrý gradient (#1a1f3a → #2d3561) se zlatým akcentem
- Headline: "Pouze **999 Kč** a získáte všechny 3 e-booky + bonus zdarma"
- Diagonální sáska "UŠETŘÍTE 198 KČ" v rohu
- Side-by-side srovnání: "Bez balíčku 1197 Kč (přeškrtnuto)" vs. "S balíčkem 999 Kč"
- Zvýraznění bonusu ("Bonus 'Jak sehnat prvního klienta' — moje vlastní techniky shánění klientů. Není dostupný samostatně.")
- Badge "NEJOBLÍBENĚJŠÍ VOLBA"
- Box-shadow pro vystoupení z plochy

### 5.2 Order bump mechanika

Toggle (checkbox) v upsell baru:
1. Browser pošle `POST /api/checkout/update` s novou sadou produktů
2. API zaktualizuje Stripe PaymentIntent na novou částku
3. Browser obnoví UI: Payment Element ukáže novou sumu, button text se přepne ("Zaplatit 399 Kč" → "Zaplatit 999 Kč")
4. Po platbě webhook ví správnou sadu produktů → odešle správné PDF

**Kritický invariant:** source of truth pro to, co zákazník dostane, je **vždy server-side** (PaymentIntent metadata + naše DB). Browser tomu nesmí věřit (ochrana proti manipulaci).

### 5.3 Formulář

- E-mail (povinné)
- Jméno (volitelné)
- Stripe Payment Element (karta + Apple Pay + Google Pay)
- Souhlas s OP a GDPR (povinné)
- **Souhlas s okamžitým plněním a vzdání se práva na 14denní odstoupení od smlouvy** (povinné, právní ochrana proti refundům dle EU práva)
- Trust signal pod tlačítkem: "Platba je zabezpečená šifrováním. Po úhradě obdržíte e-mail s odkazem ke stažení."

**Žádný 14denní refund banner** — zákazník se vzdal práva. Refund proces existuje technicky (Stripe Dashboard → webhook), ale není inzerovaný.

---

## 6. Technická architektura

### 6.1 Stack

| Vrstva | Nástroj | Free / placeno |
|---|---|---|
| Frontend + API | Next.js (App Router) | — |
| Hosting | Vercel Pro | $20/měs |
| DB + Storage | Supabase | Free tier |
| Platby | Stripe | 0 měsíčně, ~3 % transakce |
| Transakční mail | Resend | Free 3 000/měs |
| Nurture mail / list | Mailerlite | Free do 1 000 kontaktů |
| PDF design | Canva (Pro volitelné, ~340 Kč/měs) | — |
| Doména | pohodazdomova.cz (vlastní) | — |

**Mimo MVP:** Fakturoid (faktury, později), Comgate/GoPay (CZ platební metody, později), Affiliate program (později).

### 6.2 Datový tok (happy path bundle)

1. Browser na `/bundle` → POST `/api/checkout` s produkty
2. API vytvoří Stripe PaymentIntent + uloží předběžnou objednávku do Supabase (status: `pending`)
3. Browser zobrazí Stripe Payment Element, zákazník zaplatí
4. Stripe pošle webhook na `/api/webhook/stripe`
5. Webhook handler:
   - Ověří podpis (Stripe webhook secret)
   - **Idempotency check** podle `stripe_payment_intent_id` (unique constraint v DB) — druhý zápis selže, mail se neposílá 2×
   - Aktualizuje objednávku (`status: paid`, `paid_at: now()`)
   - Vygeneruje signed URLs pro PDF z Supabase Storage (7denní platnost)
   - Odešle e-mail přes Resend
   - Odešle Meta server-side conversion event
6. Browser je redirectnut na `/diky?order=...`, zobrazí download linky

### 6.3 Datový model (Supabase)

```sql
table products
  slug              text primary key
  title             text
  price_kc          int
  pdf_storage_path  text
  is_bonus_only     bool
  created_at        timestamptz

table orders
  id                       uuid primary key
  email                    text not null
  name                     text
  stripe_payment_intent_id text unique not null
  amount_total_kc          int not null
  product_slugs            text[] not null
  has_bonus                bool not null default false
  status                   text not null  -- 'pending' | 'paid' | 'failed' | 'refunded'
  fakturoid_invoice_id     text
  created_at               timestamptz default now()
  paid_at                  timestamptz
  metadata                 jsonb  -- utm, referrer, ad_id, fbclid

table email_log
  id                 uuid primary key
  order_id           uuid references orders
  email_type         text not null  -- 'download' | 'started_reading' | 'upsell' | 'review_request'
  resend_message_id  text
  sent_at            timestamptz default now()

table refunds
  id                 uuid primary key
  order_id           uuid references orders
  reason             text
  refunded_at        timestamptz default now()
```

### 6.4 Edge cases

| Případ | Řešení |
|---|---|
| Webhook 2× (Stripe retry) | Idempotency podle stripe_payment_intent_id |
| Webhook nedorazil | `/diky` má fallback: pokud objednávka v DB chybí, dotaz na Stripe API + uložení |
| Zákazník ztratil link / link expiroval | `/kontakt` formulář → request re-send (manuální nebo auto pokud e-mail v DB) |
| Refund | Stripe Dashboard → webhook `charge.refunded` → status: refunded |
| PDF aktualizace | Verzování v Storage (`ai-grafika-v2.pdf`), `products.pdf_storage_path` se přepíše |
| Sdílení signed URL | Akceptujeme — DRM by bylo overkill |
| Marketing tracking | Meta Pixel na `/diky` + server-side Conversions API z webhooku |

---

## 7. E-mail flow

### 7.1 Customer flow (po platbě, řízeno Resend + Vercel cron)

| Čas | E-mail | Účel |
|---|---|---|
| T+0 min | **Doručení e-booku** | Download linky, "Filip / pohoda z domova" podpis |
| T+0 min | **Stripe receipt** (auto) | Doklad o platbě |
| T+1 den | **"Začal jsi číst?"** | Personal touch, snižuje refund risk, otevírá komunikaci |
| T+5 dní | **Single → bundle upsell** (jen pro single kupce) | Kupon na 600 Kč doplatek, platí 48 hod |
| T+10 dní | **Žádost o feedback / recenzi** | Sociální důkaz |

### 7.2 List flow (necustomers, řízeno Mailerlite)

| Trigger | E-mail | Účel |
|---|---|---|
| Sign-up (lead magnet) | **Welcome + lead magnet PDF** | "5 AI nástrojů, které denně používám" |
| T+2 dny | **Tvůj příběh** | Důvěra, žádné CTA |
| T+5 dní | **Konkrétní hands-on tip** | Demonstrace expertizy ("Jak za 30 min vyrobíš první AI vizuál") |
| T+8 dní | **Soft pitch e-booků** | Link na `/bundle` |
| T+14 dní | **Sociální důkaz** (až budou recenze) | Jinak skip |
| Průběžně (volitelně) | **Newsletter 1× za 2 týdny** | Pouze pokud autor potvrdí kapacitu |

### 7.3 Proč 2 nástroje

- **Resend** = transakční (rychlost, dev-friendly, signed-url integrace) — ale chybí mu UI pro nurture sekvence
- **Mailerlite** = list management + automation flows + sign-up forms — ale slabší na transakční

Hybrid je standard.

---

## 8. Marketing a tracking

**Hlavní kanál:** Meta Ads (Facebook/Instagram) s vlastním UGC obsahem (autor točí na vícero profilech).

**Strategie:** Každá UGC kreativa cílí na specifickou produktovou LP (`/ai-ugc-reklamy`, `/ai-grafika`, `/ai-weby`). Pak na checkoutu order bump na bundle.

**Tracking (full setup v MVP):**
- **Meta Pixel** na všech stránkách
- **GA4** na všech stránkách
- **Meta Conversions API** server-side z webhooku (vyšší accuracy díky iOS limitům, věrohodnější přiřazení)
- **UTM parametry** propisované do `orders.metadata`

**Lead magnet pro Meta retargeting:** sign-up form na všech LP → e-mail do Mailerlite + custom audience na Meta.

**Affiliate program:** mimo MVP (po prvních 50–100 prodejích).

---

## 9. Launch sequence (8 týdnů)

| Týden | Tvoje práce | Moje práce |
|---|---|---|
| W1 | Účty (Stripe, Supabase, Resend, Mailerlite), brand assets, osnova 1. e-booku | Next.js scaffold, Vercel deploy, doména, DB schéma, Tailwind + brand variables |
| W2 | Draft 1. e-booku, screenshoty, PDF template v Canva | Homepage, /bundle, 3 produktové LP, /pribeh, /kontakt (statika) |
| W3 | Dokončení 1. e-booku, osnova 2. | /checkout, Stripe Payment Element, order bump UI, /diky |
| W4 | Draft 2. e-booku, upload 1. e-booku do Storage | Stripe webhook (idempotency, signed URLs, Resend mail), legal checkbox, OP/GDPR draft |
| W5 | Dokončení 2. e-booku, draft 3., lead magnet PDF | Customer e-mail templates v Resend, Vercel cron job |
| W6 | Dokončení 3. e-booku, draft bonusu, **UGC batch 1** (5 reels pro AI UGC) | Mailerlite list flow + sign-up form embed |
| W7 | Dokončení bonusu, **UGC batch 2 + 3** (5 grafika + 5 weby), upload PDF | Meta Pixel + GA4 + Conversions API, Stripe refund webhook, end-to-end QA |
| **W8** | **Meta Ads Manager (3 ad sety, denní rozpočet 200–300 Kč/sada první týden), LAUNCH** | **Launch monitoring, fix bugs** |

**Předpoklad:** ~15 hodin tvého času týdně.

**Realistický cíl prodejů:** break-even ~10–16 bundlů/měsíc (~3 prodeje/týden).

---

## 10. MVP scope vs. v2

### V MVP (W8 launch)

- Homepage, /pribeh, /kontakt
- 3 produktové LP + /bundle
- /checkout s order bump + legal checkbox
- Stripe + Supabase + Resend integrace
- Idempotency, signed URLs, refund webhook
- Customer e-mail flow (5 mailů)
- Lead magnet + Mailerlite list flow (5 mailů)
- Meta Pixel + GA4 + server-side Conversions API
- OP, GDPR, podpis souhlasu
- Stripe receipt jako náhrada faktury
- 3 e-booky + bonus, vše max 30 stran
- 15 UGC reels (5/produkt)
- Meta ads campaigns

### v2 (po prvních 50–100 prodejích)

- Fakturoid integrace
- Comgate/GoPay (CZ platební metody)
- Affiliate program (Rewardful nebo vlastní)
- Sekce recenzí na LP
- Členská sekce / účet
- 4. e-book (automatizace) + další
- Pravidelný newsletter (jen pokud autor potvrdí kapacitu)
- A/B testy LP
- Google Ads, TikTok Ads
- Pokročilé segmentace v Mailerlite

---

## 11. Náklady

| Položka | Cena |
|---|---|
| Vercel Pro | $20/měs (~480 Kč) |
| Supabase free | 0 Kč |
| Resend free (3k mailů) | 0 Kč |
| Mailerlite free (1k kontaktů) | 0 Kč |
| Stripe transakční | ~3 % obratu |
| Canva Pro (volitelné) | ~340 Kč/měs |
| Meta Ads (start) | ~6 000–10 000 Kč/měs |
| **Měsíčně 1. měsíc** | **~7 000–11 000 Kč** |

Break-even cíl: ~10–16 bundlů/měs (~3 prodeje/týden) při čistém zisku ~700 Kč/bundle.

---

## 12. Hlavní rizika

| Riziko | Mitigace |
|---|---|
| Nestihne se 4 e-booky za 7 týdnů | Fallback na hybrid Z (launch s 1, dopisuje za pochodu) |
| Téma nezasáhne (žádné prodeje za 2 týdny ads) | Změna creatives, copy, cílovky. Po 8 000 Kč ad spendu bez prodejů zvážit pivot |
| Ad účet zablokován Meta | Záložní BM účet, conservative copy (žádné "vyděláš milion") |
| Refund vlna | Legal checkbox = primární ochrana. Plus kvalitní PDF a engagement T+1 mail |
| Burn-out (job + 15 hod side projektu týdně) | Pokud W3 zaostává, přepnout na hybrid Z. Better launched than perfect |

---

## 13. Vyloučené z rozsahu (vědomě)

- **14denní refund banner / nabídka vrácení peněz** — vědomě vyloučeno. Legal checkbox o vzdání se práva pokrývá EU regulaci.
- **4. e-book "AI automatizace"** — odloženo na v2 (vyšší vstupní bariéra pro cílovku, hůře demonstrovatelné v UGC).
- **Členská sekce / uživatelský účet** — fulfillment je e-mail s download linkem (rozhodnutí 7a A z brainstormingu). Může přijít ve v2.
- **Faktury z Fakturoidu v MVP** — Stripe receipt slouží jako doklad pro spotřebitele. Faktury přidat ve v2 podle reálné poptávky zákazníků.
- **Affiliate program** — odloženo na v2. UGC reklamy si autor točí sám na svých profilech.
- **Multi-currency / EU překlady** — primárně CZ trh, jen české texty, jen Kč.
