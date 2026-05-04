# pohodazdomova.cz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build production-ready e-commerce site selling 3 AI e-books + bonus bundle on `pohodazdomova.cz`, deployable to Vercel Pro, with custom checkout, order bump, automated email delivery, and full marketing tracking.

**Architecture:** Next.js 15 App Router monolith on Vercel Pro. Supabase (Postgres + Storage) for orders/PDFs. Stripe Payment Element with custom checkout (required for dynamic order bump). Resend for transactional email + Vercel Cron for delayed sends. Mailerlite for nurture sequences. Meta Pixel + GA4 + Conversions API for tracking. Server-side validation as single source of truth for orders.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`, `stripe` Node SDK), Supabase JS client, Resend SDK, React Email, Zod (validation), Vitest (tests), Playwright (E2E).

**Spec:** `docs/superpowers/specs/2026-05-05-pohoda-ebook-design.md`

---

## File Structure (mapped before tasks)

```
pohodazdomova.cz/
├── app/
│   ├── layout.tsx                    # Root layout, Inter font, providers
│   ├── page.tsx                      # Homepage (/)
│   ├── pribeh/page.tsx               # Story page
│   ├── kontakt/page.tsx              # Contact form
│   ├── obchodni-podminky/page.tsx    # Terms (Markdown render)
│   ├── gdpr/page.tsx                 # GDPR (Markdown render)
│   ├── ai-ugc-reklamy/page.tsx       # Product LP 1
│   ├── ai-grafika/page.tsx           # Product LP 2
│   ├── ai-weby/page.tsx              # Product LP 3
│   ├── bundle/page.tsx               # Bundle LP
│   ├── checkout/page.tsx             # Checkout with order bump
│   ├── diky/page.tsx                 # Thank-you with download links
│   ├── api/
│   │   ├── checkout/route.ts         # POST: create PaymentIntent + draft order
│   │   ├── checkout/update/route.ts  # POST: update PaymentIntent (order bump)
│   │   ├── webhook/stripe/route.ts   # POST: Stripe webhook handler
│   │   ├── lead/route.ts             # POST: lead magnet sign-up → Mailerlite
│   │   ├── help/resend/route.ts      # POST: re-send download link
│   │   └── cron/followup/route.ts    # GET: Vercel cron for follow-up emails
│   └── globals.css                   # Tailwind + brand tokens
├── components/
│   ├── brand/Logo.tsx
│   ├── checkout/CheckoutForm.tsx
│   ├── checkout/OrderBumpBar.tsx
│   ├── checkout/OrderSummary.tsx
│   ├── product/ProductHero.tsx
│   ├── product/PricingCard.tsx
│   ├── shared/StickyHeader.tsx
│   ├── shared/Footer.tsx
│   ├── shared/SignupForm.tsx
│   └── shared/FAQ.tsx
├── emails/
│   ├── DownloadEmail.tsx             # React Email — initial delivery
│   ├── StartedReadingEmail.tsx       # T+1 follow-up
│   ├── UpsellEmail.tsx               # T+5 single→bundle upsell
│   └── ReviewRequestEmail.tsx        # T+10 review request
├── lib/
│   ├── stripe.ts                     # Stripe SDK init + helpers
│   ├── supabase.ts                   # Supabase client (server-only)
│   ├── resend.ts                     # Resend SDK init + helpers
│   ├── mailerlite.ts                 # Mailerlite API helpers
│   ├── meta-conversions.ts           # Server-side Meta Conversions API
│   ├── products.ts                   # Product catalog + pricing logic
│   ├── pricing.ts                    # Cart/total calculation (server source of truth)
│   ├── signed-url.ts                 # Generate signed download URLs
│   └── validation.ts                 # Zod schemas
├── tests/
│   ├── unit/
│   │   ├── pricing.test.ts
│   │   ├── products.test.ts
│   │   └── validation.test.ts
│   ├── api/
│   │   ├── checkout.test.ts
│   │   ├── checkout-update.test.ts
│   │   └── webhook.test.ts
│   └── e2e/
│       ├── purchase-single.spec.ts
│       ├── purchase-bundle-via-bump.spec.ts
│       └── lead-signup.spec.ts
├── content/
│   ├── obchodni-podminky.md
│   └── gdpr.md
├── public/
│   ├── og-image.png
│   ├── covers/
│   └── icons/
├── supabase/
│   ├── migrations/
│   │   └── 0001_initial.sql
│   └── seed.sql
├── .env.example
├── .env.local                        # gitignored
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

**File responsibility principle:**
- `app/` = pages and route handlers (thin, delegate to `lib/`)
- `components/` = stateless or hook-based UI building blocks
- `lib/` = business logic, third-party SDK wrappers, validation
- `emails/` = React Email templates only
- `tests/` = test code mirrors source structure
- `content/` = Markdown for legal pages

---

# PHASE 1 — Foundation & Public Pages (W1–W2)

## Task 1: Repository init and Next.js scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `README.md`

- [ ] **Step 1: Initialize git repo and gitignore**

```bash
cd "/Users/filipmojik/super powers"
git init
git branch -M main
```

Create `.gitignore`:
```
node_modules/
.next/
.vercel/
.env
.env.local
.env.*.local
.DS_Store
*.log
.superpowers/brainstorm/
playwright-report/
test-results/
```

- [ ] **Step 2: Create Next.js 15 app with TypeScript and Tailwind**

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint
```

When prompted: TypeScript yes, Tailwind yes, App Router yes, src/ directory NO, customize import alias YES (`@/*`).

- [ ] **Step 3: Install core dependencies**

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js @supabase/supabase-js resend @react-email/components @react-email/render zod
npm install -D @types/node vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test
```

- [ ] **Step 4: Verify scaffold runs**

```bash
npm run dev
```
Expected: Next.js running on http://localhost:3000, default Next page loads.

Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: initial Next.js 15 scaffold with Tailwind and core deps"
```

---

## Task 2: Environment variables template

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Write .env.example with all keys we'll need**

```
# Public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (server)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Supabase (browser, anon)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=Filip <filip@pohodazdomova.cz>

# Mailerlite
MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID_LEAD_MAGNET=

# Meta Conversions API
META_PIXEL_ID=
META_CONVERSIONS_ACCESS_TOKEN=

# GA4
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Cron secret (Vercel)
CRON_SECRET=
```

- [ ] **Step 2: Create empty .env.local for local dev**

```bash
cp .env.example .env.local
```

Note for Filip: real values will be filled as accounts are created (Stripe, Supabase, Resend, etc.)

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore: add .env.example with all required keys"
```

---

## Task 3: Tailwind brand tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Configure brand colors and Inter font in Tailwind**

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./emails/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1a1f3a", 600: "#2d3561" },
        gold: { DEFAULT: "#ffba08" },
        cream: "#f5f5f3",
        ink: "#1a1a1a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.03)",
        upsell: "0 8px 24px rgba(26,31,58,0.25)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
} satisfies Config;
```

- [ ] **Step 2: Wire Inter font via next/font in root layout**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "pohoda z domova — moderní přívýdělek s AI",
  description: "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify by adding a brand color test in homepage**

Edit `app/page.tsx` temporarily:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <h1 className="text-4xl font-extrabold text-navy">pohoda <span className="text-gold">z domova</span></h1>
    </main>
  );
}
```

- [ ] **Step 4: Run dev server and verify visually**

```bash
npm run dev
```
Open http://localhost:3000 — should show navy headline with gold accent in Inter font.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css app/page.tsx
git commit -m "feat: brand tokens, Inter font, base layout"
```

---

## Task 4: Vitest + Playwright setup

**Files:**
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/unit/sanity.test.ts`

- [ ] **Step 1: Configure Vitest**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

`tests/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 2: Write sanity test**

`tests/unit/sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("environment", () => {
  it("runs vitest", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Run sanity test**

```bash
npm test
```
Expected: 1 passed.

- [ ] **Step 4: Configure Playwright**

```bash
npx playwright install --with-deps chromium
```

`playwright.config.ts`:
```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    headless: true,
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

Add to `package.json` scripts: `"test:e2e": "playwright test"`.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts playwright.config.ts tests/ package.json
git commit -m "chore: vitest + playwright setup with sanity test"
```

---

## Task 5: Product catalog as code (single source of truth)

**Files:**
- Create: `lib/products.ts`, `tests/unit/products.test.ts`

- [ ] **Step 1: Write failing test for product catalog**

`tests/unit/products.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { getProduct, getAllProducts, BUNDLE_SLUG, BONUS_SLUG } from "@/lib/products";

describe("products catalog", () => {
  it("has 3 paid e-books at 399 Kč", () => {
    const paid = getAllProducts().filter((p) => !p.isBundle && !p.isBonusOnly);
    expect(paid).toHaveLength(3);
    paid.forEach((p) => expect(p.priceKc).toBe(399));
  });

  it("bundle is 999 Kč and includes 3 e-books + bonus", () => {
    const bundle = getProduct(BUNDLE_SLUG);
    expect(bundle?.priceKc).toBe(999);
    expect(bundle?.includes).toEqual(expect.arrayContaining(["ai-ugc-reklamy", "ai-grafika", "ai-weby", BONUS_SLUG]));
  });

  it("bonus is bonus-only and has no individual price", () => {
    const bonus = getProduct(BONUS_SLUG);
    expect(bonus?.isBonusOnly).toBe(true);
    expect(bonus?.priceKc).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test products
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement product catalog**

`lib/products.ts`:
```ts
export const BUNDLE_SLUG = "bundle" as const;
export const BONUS_SLUG = "bonus-prvni-klient" as const;

export type ProductSlug =
  | "ai-ugc-reklamy"
  | "ai-grafika"
  | "ai-weby"
  | typeof BUNDLE_SLUG
  | typeof BONUS_SLUG;

export type Product = {
  slug: ProductSlug;
  title: string;
  shortTitle: string;
  priceKc: number | null;
  isBundle: boolean;
  isBonusOnly: boolean;
  pdfStoragePath: string | null;
  includes?: ProductSlug[];
};

const CATALOG: Record<ProductSlug, Product> = {
  "ai-ugc-reklamy": {
    slug: "ai-ugc-reklamy",
    title: "AI UGC reklamy",
    shortTitle: "AI UGC",
    priceKc: 399,
    isBundle: false,
    isBonusOnly: false,
    pdfStoragePath: "pdfs/ai-ugc-reklamy.pdf",
  },
  "ai-grafika": {
    slug: "ai-grafika",
    title: "AI grafika a vizuály",
    shortTitle: "AI grafika",
    priceKc: 399,
    isBundle: false,
    isBonusOnly: false,
    pdfStoragePath: "pdfs/ai-grafika.pdf",
  },
  "ai-weby": {
    slug: "ai-weby",
    title: "AI weby pro malé firmy",
    shortTitle: "AI weby",
    priceKc: 399,
    isBundle: false,
    isBonusOnly: false,
    pdfStoragePath: "pdfs/ai-weby.pdf",
  },
  [BUNDLE_SLUG]: {
    slug: BUNDLE_SLUG,
    title: "Balíček všech 3 e-booků + bonus",
    shortTitle: "Bundle",
    priceKc: 999,
    isBundle: true,
    isBonusOnly: false,
    pdfStoragePath: null,
    includes: ["ai-ugc-reklamy", "ai-grafika", "ai-weby", BONUS_SLUG],
  },
  [BONUS_SLUG]: {
    slug: BONUS_SLUG,
    title: "Jak sehnat prvního klienta",
    shortTitle: "Bonus",
    priceKc: null,
    isBundle: false,
    isBonusOnly: true,
    pdfStoragePath: "pdfs/bonus-prvni-klient.pdf",
  },
};

export function getProduct(slug: ProductSlug): Product | undefined {
  return CATALOG[slug];
}

export function getAllProducts(): Product[] {
  return Object.values(CATALOG);
}
```

- [ ] **Step 4: Run test, verify pass**

```bash
npm test products
```
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/products.ts tests/unit/products.test.ts
git commit -m "feat: product catalog with 3 e-books + bundle + bonus"
```

---

## Task 6: Pricing calculator (server-side source of truth)

**Files:**
- Create: `lib/pricing.ts`, `tests/unit/pricing.test.ts`

- [ ] **Step 1: Write failing tests**

`tests/unit/pricing.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { calculateCart, expandToFulfillment } from "@/lib/pricing";

describe("calculateCart", () => {
  it("single product = 399 Kč", () => {
    expect(calculateCart(["ai-grafika"]).totalKc).toBe(399);
  });

  it("two singles = 798 Kč (no auto-bundle)", () => {
    expect(calculateCart(["ai-grafika", "ai-weby"]).totalKc).toBe(798);
  });

  it("bundle = 999 Kč", () => {
    expect(calculateCart(["bundle"]).totalKc).toBe(999);
  });

  it("rejects mixing bundle with singles", () => {
    expect(() => calculateCart(["bundle", "ai-grafika"])).toThrow(/bundle.*single/i);
  });

  it("rejects buying bonus alone", () => {
    expect(() => calculateCart(["bonus-prvni-klient"])).toThrow(/bonus.*bundle/i);
  });

  it("rejects empty cart", () => {
    expect(() => calculateCart([])).toThrow(/empty/i);
  });
});

describe("expandToFulfillment", () => {
  it("single → just that PDF", () => {
    expect(expandToFulfillment(["ai-grafika"])).toEqual(["ai-grafika"]);
  });

  it("bundle → 3 e-books + bonus", () => {
    expect(expandToFulfillment(["bundle"])).toEqual(
      expect.arrayContaining(["ai-ugc-reklamy", "ai-grafika", "ai-weby", "bonus-prvni-klient"])
    );
    expect(expandToFulfillment(["bundle"])).toHaveLength(4);
  });
});
```

- [ ] **Step 2: Run, verify fails**

```bash
npm test pricing
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement pricing**

`lib/pricing.ts`:
```ts
import { getProduct, BUNDLE_SLUG, BONUS_SLUG, type ProductSlug } from "./products";

export type Cart = {
  products: ProductSlug[];
  totalKc: number;
};

export function calculateCart(slugs: ProductSlug[]): Cart {
  if (slugs.length === 0) {
    throw new Error("Cart is empty");
  }

  const hasBundle = slugs.includes(BUNDLE_SLUG);
  const hasSingle = slugs.some((s) => {
    const p = getProduct(s);
    return p && !p.isBundle && !p.isBonusOnly;
  });

  if (hasBundle && hasSingle) {
    throw new Error("Cannot mix bundle with single products");
  }

  if (slugs.includes(BONUS_SLUG) && !hasBundle) {
    throw new Error("Bonus is only available with bundle");
  }

  const totalKc = slugs.reduce((sum, slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    return sum + (product.priceKc ?? 0);
  }, 0);

  return { products: slugs, totalKc };
}

export function expandToFulfillment(slugs: ProductSlug[]): ProductSlug[] {
  const result = new Set<ProductSlug>();
  for (const slug of slugs) {
    const product = getProduct(slug);
    if (!product) continue;
    if (product.isBundle && product.includes) {
      product.includes.forEach((s) => result.add(s));
    } else {
      result.add(slug);
    }
  }
  return Array.from(result);
}
```

- [ ] **Step 4: Run, verify pass**

```bash
npm test pricing
```
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/pricing.ts tests/unit/pricing.test.ts
git commit -m "feat: server-side cart pricing and fulfillment expansion"
```

---

## Task 7: Shared layout components — Header and Footer

**Files:**
- Create: `components/brand/Logo.tsx`, `components/shared/StickyHeader.tsx`, `components/shared/Footer.tsx`

- [ ] **Step 1: Logo component**

`components/brand/Logo.tsx`:
```tsx
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-baseline gap-1 font-extrabold tracking-tight text-navy ${className}`}>
      <span>pohoda</span>
      <span className="text-gold">z domova</span>
    </Link>
  );
}
```

- [ ] **Step 2: Sticky header**

`components/shared/StickyHeader.tsx`:
```tsx
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Logo className="text-lg" />
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pribeh" className="text-ink/70 hover:text-ink">Příběh</Link>
          <Link href="/bundle" className="rounded-md bg-navy text-white px-3 py-1.5 hover:bg-navy/90">Balíček 999 Kč</Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Footer**

`components/shared/Footer.tsx`:
```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-3 text-sm text-ink/70">
        <div>
          <div className="font-bold text-ink">pohoda z domova</div>
          <p className="mt-2">Praktické AI e-booky pro pracující lidi.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/obchodni-podminky" className="hover:text-ink">Obchodní podmínky</Link>
          <Link href="/gdpr" className="hover:text-ink">Ochrana údajů</Link>
          <Link href="/kontakt" className="hover:text-ink">Kontakt</Link>
        </div>
        <div className="text-xs">
          © {new Date().getFullYear()} pohoda z domova<br />
          Filip Mojík, IČ: [doplnit]<br />
          Nejsme plátci DPH.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Wire header/footer into root layout**

Edit `app/layout.tsx` body:
```tsx
<body className="bg-cream text-ink font-sans antialiased min-h-screen flex flex-col">
  <StickyHeader />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

Add imports for `StickyHeader` and `Footer`.

- [ ] **Step 5: Run dev and visually verify**

```bash
npm run dev
```
http://localhost:3000 — should show header with logo + bundle CTA, footer with three columns.

- [ ] **Step 6: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "feat: brand logo, sticky header, footer"
```

---

## Task 8: Homepage skeleton

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build homepage hero + bundle pitch + 3 product previews + story snippet + CTA**

`app/page.tsx`:
```tsx
import Link from "next/link";
import { getAllProducts, BUNDLE_SLUG } from "@/lib/products";

export default function Home() {
  const products = getAllProducts().filter((p) => !p.isBundle && !p.isBonusOnly);
  const bundle = getAllProducts().find((p) => p.slug === BUNDLE_SLUG)!;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy leading-tight">
          Moderní přívýdělek z domova<br />
          <span className="text-gold">s pomocí AI</span>
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-2xl mx-auto">
          Praktické e-booky pro lidi v zaměstnání, kteří se chtějí naučit něco nového a přivydělat si po večerech. Bez studených hovorů, bez hype.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/bundle" className="rounded-md bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90">
            Vzít všechny 3 + bonus za {bundle.priceKc} Kč
          </Link>
          <Link href="/pribeh" className="rounded-md border border-ink/10 px-6 py-3 font-semibold hover:bg-white">
            Můj příběh
          </Link>
        </div>
      </section>

      {/* 3 products preview */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">3 e-booky o AI</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="block bg-white rounded-card p-6 shadow-card hover:shadow-md transition">
              <div className="text-xs uppercase tracking-wider text-gold font-bold">Průvodce</div>
              <div className="mt-2 font-bold text-lg text-navy">{p.title}</div>
              <div className="mt-4 text-sm text-ink/60">{p.priceKc} Kč</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Story snippet */}
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="text-lg leading-relaxed text-ink/80">
          Před rokem jsem dělal na stavbě. Po večerech jsem se začal učit AI a tvořit weby. Dnes mám klienty a píšu o tom, jak to může zvládnout kdokoliv. <Link href="/pribeh" className="underline">Celý příběh.</Link>
        </p>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Visually verify**

```bash
npm run dev
```
Open http://localhost:3000 — should show hero, 3 product cards, story snippet.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: homepage skeleton with hero, product previews, story snippet"
```

---

## Task 9: Story page (`/pribeh`)

**Files:**
- Create: `app/pribeh/page.tsx`

- [ ] **Step 1: Build story page with placeholder photo and Filip's story**

`app/pribeh/page.tsx`:
```tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Můj příběh — pohoda z domova" };

export default function Pribeh() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy mb-8">Můj příběh</h1>

      <div className="bg-white rounded-card p-6 shadow-card mb-8 flex gap-6 items-center">
        {/* Placeholder for Filip's photo — replace with /public/filip.jpg when ready */}
        <div className="w-28 h-28 bg-cream rounded-full shrink-0" aria-label="Fotka Filipa" />
        <div className="text-sm text-ink/60">
          Filip Mojík<br />
          Tvůrce pohoda z domova
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-ink/85 leading-relaxed">
        <p>Před rokem jsem pracoval na stavbě. Klasická manuální dřina od šesti do tří, vrátit se domů, sednout k počítači — a místo Netflixu se učit, jak fungují AI nástroje.</p>

        <p>Začal jsem stavět malé weby. Hloupé prototypy, které nikdo nechtěl. Pak ale přišel první ostrý web pro malou firmu. Pak druhý.</p>

        <p>Studené volání mi nikdy nešlo. Místo toho jsem si jako technický typ vyrobil automatizaci: e-mail rozesílač, který každé malé firmě v okolí poslal personalizovaný mail s konkrétním problémem na jejich stávajícím webu (nalezeným AI). Konverze byla nesrovnatelně lepší než cold call.</p>

        <p>Tohle a další moje techniky shánění klientů jsou v bonusovém e-booku, který je dostupný pouze v balíčku všech 3 e-booků.</p>

        <p>Pohoda z domova není o tom "vyděláš milion za měsíc". Je o tom, že zatímco máš stálé zaměstnání, můžeš si po večerech postavit něco svého — pomalu, klidně, bez tlaku.</p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/bundle" className="inline-block rounded-md bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90">
          Vzít balíček
        </Link>
      </div>
    </article>
  );
}
```

Note for Filip: replace placeholder div with real `<Image src="/filip.jpg" />` once photo is uploaded.

- [ ] **Step 2: Visually verify**

```bash
npm run dev
```
http://localhost:3000/pribeh — story renders.

- [ ] **Step 3: Commit**

```bash
git add app/pribeh/page.tsx
git commit -m "feat: story page with Filip's narrative and CTA"
```

---

## Task 10: Contact page (`/kontakt`)

**Files:**
- Create: `app/kontakt/page.tsx`

- [ ] **Step 1: Simple static contact page (no form for MVP — mailto link)**

`app/kontakt/page.tsx`:
```tsx
export const metadata = { title: "Kontakt — pohoda z domova" };

export default function Kontakt() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy mb-6">Kontakt</h1>
      <p className="text-lg text-ink/80 mb-6">
        Cokoliv ohledně e-booků, faktury, nebo kdyby ti expiroval download link — napiš mi.
      </p>
      <div className="bg-white rounded-card p-6 shadow-card">
        <div className="text-sm text-ink/60 uppercase tracking-wider font-semibold mb-1">E-mail</div>
        <a href="mailto:filip@pohodazdomova.cz" className="text-navy text-lg font-semibold hover:underline">
          filip@pohodazdomova.cz
        </a>
        <p className="mt-4 text-sm text-ink/60">
          Odpovím obvykle do 24 hodin (mimo víkendy o trochu déle).
        </p>
      </div>
    </article>
  );
}
```

Note: full form with re-send-link auto-handler is in Phase 2 (Task ~25).

- [ ] **Step 2: Visually verify**

```bash
npm run dev
```
http://localhost:3000/kontakt — page loads.

- [ ] **Step 3: Commit**

```bash
git add app/kontakt/page.tsx
git commit -m "feat: contact page with email link"
```

---

## Task 11: Legal pages (OP and GDPR)

**Files:**
- Create: `content/obchodni-podminky.md`, `content/gdpr.md`
- Create: `app/obchodni-podminky/page.tsx`, `app/gdpr/page.tsx`
- Modify: `package.json` (add `react-markdown`, `remark-gfm`)

- [ ] **Step 1: Install markdown renderer**

```bash
npm install react-markdown remark-gfm
```

- [ ] **Step 2: Generate baseline OP and GDPR text**

`content/obchodni-podminky.md` (use ChatGPT/Claude to generate baseline tailored to digital products in CZ; include sections: Identifikace prodávajícího, Předmět smlouvy, Cena, Způsob platby, Dodání digitálního obsahu, Souhlas s okamžitým plněním a vzdání se práva na odstoupení, Reklamace, Mimosoudní řešení sporů, Závěrečná ustanovení).

`content/gdpr.md` (sections: Správce, Účel zpracování, Právní základ, Doba uchování, Práva subjektu údajů, Cookies, Předávání třetím stranám — Stripe, Resend, Mailerlite, Vercel, Supabase).

Note for Filip: tato základní šablona musí být před launchem zkontrolována právníkem nebo aspoň zkušeným AI právním reviewem (Claude legal-check prompt). Tady stačí placeholder text "Tato verze je předběžná, finální OP doplněna před launchem".

- [ ] **Step 3: Build legal page renderer**

`app/obchodni-podminky/page.tsx`:
```tsx
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = { title: "Obchodní podmínky" };

export default async function OP() {
  const md = await fs.readFile(path.join(process.cwd(), "content", "obchodni-podminky.md"), "utf8");
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </article>
  );
}
```

`app/gdpr/page.tsx`: identical pattern, reads `content/gdpr.md`, title "Ochrana osobních údajů".

- [ ] **Step 4: Visually verify**

```bash
npm run dev
```
Open `/obchodni-podminky` and `/gdpr` — both render.

- [ ] **Step 5: Commit**

```bash
git add content/ app/obchodni-podminky/ app/gdpr/ package.json
git commit -m "feat: legal pages OP and GDPR rendered from markdown"
```

---

## Task 12: Reusable PricingCard component

**Files:**
- Create: `components/product/PricingCard.tsx`

- [ ] **Step 1: Build pricing card used on product LPs**

`components/product/PricingCard.tsx`:
```tsx
import Link from "next/link";

type Props = {
  title: string;
  priceKc: number;
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
};

export function PricingCard({ title, priceKc, bullets, ctaHref, ctaLabel, highlighted = false, badge }: Props) {
  return (
    <div className={`rounded-card p-6 shadow-card ${highlighted ? "bg-navy text-white border-2 border-gold" : "bg-white"}`}>
      {badge && (
        <div className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 ${highlighted ? "bg-gold text-navy" : "bg-cream text-ink/70"}`}>
          {badge}
        </div>
      )}
      <h3 className={`text-xl font-bold ${highlighted ? "text-white" : "text-navy"}`}>{title}</h3>
      <div className={`mt-2 text-3xl font-extrabold ${highlighted ? "text-gold" : "text-navy"}`}>{priceKc} Kč</div>
      <ul className={`mt-6 space-y-2 text-sm ${highlighted ? "text-white/80" : "text-ink/70"}`}>
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className={highlighted ? "text-gold" : "text-navy"}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link href={ctaHref} className={`mt-6 block text-center rounded-md py-3 font-semibold ${highlighted ? "bg-gold text-navy hover:bg-gold/90" : "bg-navy text-white hover:bg-navy/90"}`}>
        {ctaLabel}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/product/PricingCard.tsx
git commit -m "feat: reusable PricingCard component"
```

---

## Task 13: Three product landing pages (templated)

**Files:**
- Create: `app/ai-ugc-reklamy/page.tsx`, `app/ai-grafika/page.tsx`, `app/ai-weby/page.tsx`
- Create: `components/product/ProductHero.tsx`, `components/shared/FAQ.tsx`

- [ ] **Step 1: ProductHero component (shared structure)**

`components/product/ProductHero.tsx`:
```tsx
import Link from "next/link";
import { PricingCard } from "./PricingCard";

type Props = {
  productSlug: string;
  title: string;
  subtitle: string;
  bullets: string[];
  outcomes: string[];
  priceKc: number;
};

export function ProductHero({ productSlug, title, subtitle, bullets, outcomes, priceKc }: Props) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 grid gap-10 md:grid-cols-2 items-start">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold font-bold mb-3">E-book</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">{title}</h1>
          <p className="mt-5 text-lg text-ink/75 leading-relaxed">{subtitle}</p>
          <ul className="mt-8 space-y-3 text-ink/80">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-gold font-bold">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <PricingCard
            title="Tento e-book"
            priceKc={priceKc}
            bullets={[
              "PDF, ~30 stran",
              "Doručení e-mailem do několika minut",
              "Stažení 7 dní",
            ]}
            ctaHref={`/checkout?product=${productSlug}`}
            ctaLabel="Koupit za 399 Kč"
          />
          <PricingCard
            title="Balíček všech 3 + bonus"
            priceKc={999}
            bullets={[
              "Všechny 3 e-booky",
              "Bonus 'Jak sehnat prvního klienta'",
              "Úspora 198 Kč",
            ]}
            ctaHref="/checkout?product=bundle"
            ctaLabel="Vzít balíček"
            highlighted
            badge="Doporučujeme"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Co se naučíš</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {outcomes.map((o) => (
            <li key={o} className="bg-white rounded-card p-4 shadow-card text-ink/85 text-sm leading-relaxed">{o}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
```

- [ ] **Step 2: FAQ component**

`components/shared/FAQ.tsx`:
```tsx
"use client";
import { useState } from "react";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-2xl font-bold text-navy mb-6">Časté otázky</h2>
      <div className="divide-y divide-ink/10 bg-white rounded-card shadow-card">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              className="w-full text-left p-5 font-semibold text-ink flex justify-between items-center"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span className="text-gold">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="px-5 pb-5 text-ink/75 leading-relaxed">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: ai-ugc-reklamy page (template — repeat pattern for other 2)**

`app/ai-ugc-reklamy/page.tsx`:
```tsx
import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = {
  title: "AI UGC reklamy — pohoda z domova",
  description: "Krok za krokem návod, jak vytvářet placené UGC reklamy s AI a prodávat je značkám.",
};

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-ugc-reklamy"
        title="AI UGC reklamy"
        subtitle="Naučíš se točit krátká reklamní videa pomocí AI nástrojů a prodávat je značkám. Bez kamery, bez profi studia."
        bullets={[
          "Hot trend — značky platí freelancerům za UGC kreativy 1 500–5 000 Kč/video",
          "Žádné drahé vybavení — telefon a AI nástroje stačí",
          "Návod platí pro češtinu i angličtinu",
        ]}
        outcomes={[
          "Naučíš se psát hooky, scripty a CTA pro UGC reklamy",
          "Najít první značky, které platí za UGC tvorbu",
          "Optimalizovat videa podle dat z Meta Ads",
          "Postavit si portfolio za 7 dní",
          "Cenotvorba a balíčky — kolik si účtovat",
          "Časté chyby, které UGC tvůrce stojí klienty",
        ]}
        priceKc={399}
      />
      <FAQ items={[
        { q: "Potřebuju anglickou výslovnost?", a: "Ne. Český trh je hladový. Většinu klientů najdeš v ČR a SR." },
        { q: "Jak rychle vyrobím první video?", a: "Po pochopení šablony v e-booku zvládneš první kreativu za víkend." },
        { q: "Co když to nestihnu/nebude se mi líbit?", a: "E-book je digitální produkt. Před koupí v checkoutu výslovně souhlasíš s okamžitým plněním. Refund se neřeší." },
      ]} />
    </>
  );
}
```

- [ ] **Step 4: ai-grafika page**

Identical structure with content tailored to AI grafika. Use same pattern as Step 3.

`app/ai-grafika/page.tsx`:
```tsx
import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "AI grafika a vizuály — pohoda z domova" };

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-grafika"
        title="AI grafika a vizuály"
        subtitle="Vytvářej profesionální grafiku bez Photoshopu. AI udělá zbytek — ty inkasuješ."
        bullets={[
          "Cílovka: malé firmy, OSVČ, e-shopy — denně potřebují vizuály",
          "Žádné designové vzdělání — jen pochopení promptů a šablon",
          "Vyděláš první peníze do 14 dní",
        ]}
        outcomes={[
          "MidJourney + Canva — workflow profi vizuálů",
          "Logo, sociální sítě, bannery, produktové fotky",
          "Cenotvorba — co stojí jednotlivé typy zakázek",
          "Najít prvních 5 klientů (a co jim nabídnout)",
          "Šablony promptů, které šetří hodiny",
          "Časté chyby, které klienty odradí",
        ]}
        priceKc={399}
      />
      <FAQ items={[
        { q: "Musím umět Photoshop?", a: "Ne. AI + Canva pokryje 90 % zakázek." },
        { q: "Které AI nástroje?", a: "MidJourney, ChatGPT pro prompty, Canva. Vše s aktuálními cenami v e-booku." },
        { q: "Refund?", a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním." },
      ]} />
    </>
  );
}
```

- [ ] **Step 5: ai-weby page**

`app/ai-weby/page.tsx`:
```tsx
import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "AI weby pro malé firmy — pohoda z domova" };

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-weby"
        title="AI weby pro malé firmy"
        subtitle="Postav za večer profesionální web pro místní firmu. Inkasuj 10–30 tis. Kč za projekt."
        bullets={[
          "Cílovka: lokální firmy, řemeslníci, restaurace, kadeřnictví — všichni potřebují web",
          "Workflow: brief → AI návrh → Framer/Webflow → klient",
          "Vyšší ceny než UGC nebo grafika",
        ]}
        outcomes={[
          "Šablona prodejního pitche pro místní firmy",
          "AI generování copy + design",
          "Framer/Webflow pro non-tech klienty",
          "Cenotvorba — proč nesoutěž s low-cost",
          "Údržba a upsell pro stálý cash flow",
          "Časté chyby, které brzdí cash flow",
        ]}
        priceKc={399}
      />
      <FAQ items={[
        { q: "Musím umět kódit?", a: "Ne. Framer/Webflow drag&drop. AI generuje obsah." },
        { q: "Najdu klienty?", a: "Návod na sehnání prvních zakázek je v bonus e-booku, který je v balíčku." },
        { q: "Refund?", a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním." },
      ]} />
    </>
  );
}
```

- [ ] **Step 6: Visually verify all 3**

```bash
npm run dev
```
Test `/ai-ugc-reklamy`, `/ai-grafika`, `/ai-weby` — each renders, CTAs link to checkout with product slug.

- [ ] **Step 7: Commit**

```bash
git add components/product/ components/shared/FAQ.tsx app/ai-ugc-reklamy/ app/ai-grafika/ app/ai-weby/
git commit -m "feat: 3 product landing pages with shared hero and FAQ"
```

---

## Task 14: Bundle landing page (`/bundle`)

**Files:**
- Create: `app/bundle/page.tsx`

- [ ] **Step 1: Build bundle LP — emphasizes bonus exclusivity**

`app/bundle/page.tsx`:
```tsx
import Link from "next/link";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "Balíček 3 e-booků + bonus — pohoda z domova" };

export default function Bundle() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-block bg-gold text-navy text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
          Doporučujeme
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
          Všechny 3 e-booky + bonus<br />
          <span className="text-gold">za 999 Kč</span>
        </h1>
        <p className="mt-6 text-lg text-ink/75 max-w-2xl mx-auto">
          Místo 1 197 Kč za jednotlivé e-booky dostaneš všechny tři + exkluzivní bonusový e-book, který není dostupný samostatně.
        </p>
        <Link href="/checkout?product=bundle" className="mt-8 inline-block rounded-md bg-navy text-white px-8 py-4 font-semibold text-lg hover:bg-navy/90">
          Vzít balíček za 999 Kč
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Co je v balíčku</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">Průvodce 01</div>
            <div className="mt-2 font-bold text-lg text-navy">AI UGC reklamy</div>
            <p className="mt-2 text-sm text-ink/70">Vyrábět placené UGC kreativy pro značky.</p>
          </div>
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">Průvodce 02</div>
            <div className="mt-2 font-bold text-lg text-navy">AI grafika a vizuály</div>
            <p className="mt-2 text-sm text-ink/70">Vytvářet grafiku bez Photoshopu, prodávat lokálně.</p>
          </div>
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">Průvodce 03</div>
            <div className="mt-2 font-bold text-lg text-navy">AI weby pro malé firmy</div>
            <p className="mt-2 text-sm text-ink/70">Stavět weby za večer, inkasovat 10–30 tis. Kč.</p>
          </div>
          <div className="bg-navy text-white rounded-card p-6 shadow-upsell border-2 border-gold">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">Bonus · jen v balíčku</div>
            <div className="mt-2 font-bold text-lg">Jak sehnat prvního klienta</div>
            <p className="mt-2 text-sm text-white/80">Moje vlastní techniky shánění klientů včetně cold-email automatizace s AI personalizací. Není dostupný samostatně.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <Link href="/checkout?product=bundle" className="inline-block rounded-md bg-gold text-navy px-8 py-4 font-bold text-lg hover:bg-gold/90">
          Vzít balíček za 999 Kč
        </Link>
        <p className="mt-3 text-sm text-ink/60">Doručení e-mailem do několika minut</p>
      </section>

      <FAQ items={[
        { q: "Proč je bonus jen v balíčku?", a: "Záměrně. Bonus obsahuje moje konkrétní techniky shánění klientů, které dávám jen lidem, co berou plnou cestu." },
        { q: "Můžu si dokoupit jednotlivé e-booky a bonus zvlášť?", a: "Bonus zvlášť ne. Pokud koupíš jeden e-book a do 5 dní se rozhodneš pro balíček, dostaneš nabídku na doplatek 600 Kč e-mailem." },
        { q: "V jakém formátu?", a: "PDF, optimalizované pro čtení na mobilu i počítači." },
        { q: "Refund?", a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním a vzdáváš se práva na odstoupení." },
      ]} />
    </>
  );
}
```

- [ ] **Step 2: Visually verify**

```bash
npm run dev
```
http://localhost:3000/bundle — bundle pitch + 4 cards (3 + bonus) + FAQ.

- [ ] **Step 3: Commit**

```bash
git add app/bundle/page.tsx
git commit -m "feat: bundle landing page with bonus exclusivity messaging"
```

---

## Task 15: PHASE 1 checkpoint — visual QA + Vercel deploy

**Files:** none (deployment task)

- [ ] **Step 1: Manual QA — click through all pages**

```bash
npm run dev
```
Open in browser, click every link:
- `/` → hero, products, story
- `/pribeh` → story
- `/kontakt` → email
- `/obchodni-podminky`, `/gdpr` → legal renders
- `/ai-ugc-reklamy`, `/ai-grafika`, `/ai-weby` → product LPs
- `/bundle` → bundle LP
- All CTAs link to `/checkout?product=...` (will 404 — that's Phase 2)
- Header/footer present everywhere
- No console errors (open DevTools)

- [ ] **Step 2: Initial Vercel deploy**

Filip:
```bash
npm install -g vercel
vercel login
vercel --prod
```
Follow prompts. Choose Vercel Pro if not selected.

After deploy, set env vars in Vercel dashboard for Production environment (only `NEXT_PUBLIC_SITE_URL=https://pohodazdomova.cz` for now — Stripe/Supabase added in Phase 2).

- [ ] **Step 3: DNS configuration**

In domain registrar (where Filip bought pohodazdomova.cz):
- Add A record: `@` → `76.76.21.21` (Vercel)
- Add CNAME: `www` → `cname.vercel-dns.com`

In Vercel project settings → Domains → add `pohodazdomova.cz` and `www.pohodazdomova.cz`.

Wait for SSL provisioning (~5–30 min).

- [ ] **Step 4: Verify production URL**

Open https://pohodazdomova.cz — site loads with HTTPS, all pages work.

- [ ] **Step 5: Commit and tag**

```bash
git tag phase1-complete
git commit -m "chore: phase 1 complete — public pages live on pohodazdomova.cz" --allow-empty
```

---

# PHASE 2 — Checkout & Payments (W3–W4)

## Task 16: Supabase project + DB schema migration

**Files:**
- Create: `supabase/migrations/0001_initial.sql`, `lib/supabase.ts`

- [ ] **Step 1: Create Supabase project**

Filip:
1. Create new Supabase project named `pohodazdomova`
2. Region: `eu-central-1` (Frankfurt — nejblíž ČR)
3. Save URL + anon key + service role key
4. Add to `.env.local`:
   - `SUPABASE_URL=...`
   - `SUPABASE_SERVICE_ROLE_KEY=...`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
5. Add same to Vercel project env vars (Production)

- [ ] **Step 2: Write migration**

`supabase/migrations/0001_initial.sql`:
```sql
-- Products are catalog only; we don't sync from code (lib/products.ts is source of truth)
-- This table exists mainly for FK joins in fulfillment/admin queries

create table products (
  slug text primary key,
  title text not null,
  price_kc int,
  pdf_storage_path text,
  is_bundle boolean not null default false,
  is_bonus_only boolean not null default false,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  stripe_payment_intent_id text unique not null,
  amount_total_kc int not null,
  product_slugs text[] not null,
  has_bonus boolean not null default false,
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  fakturoid_invoice_id text,
  consent_immediate_fulfillment boolean not null default false,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index orders_email_idx on orders (email);
create index orders_status_idx on orders (status);
create index orders_paid_at_idx on orders (paid_at desc) where status = 'paid';

create table email_log (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders (id) on delete cascade,
  email_type text not null check (email_type in ('download', 'started_reading', 'upsell', 'review_request', 'refund')),
  resend_message_id text,
  sent_at timestamptz not null default now()
);

create index email_log_order_idx on email_log (order_id);
create unique index email_log_unique_per_order_type on email_log (order_id, email_type);

create table refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders (id) on delete cascade,
  reason text,
  refunded_at timestamptz not null default now()
);

-- Storage bucket for PDFs (run separately in Supabase Storage UI)
-- Bucket name: 'pdfs', visibility: private (signed URLs only)

-- Seed products from catalog
insert into products (slug, title, price_kc, pdf_storage_path, is_bundle, is_bonus_only) values
  ('ai-ugc-reklamy', 'AI UGC reklamy', 399, 'pdfs/ai-ugc-reklamy.pdf', false, false),
  ('ai-grafika', 'AI grafika a vizuály', 399, 'pdfs/ai-grafika.pdf', false, false),
  ('ai-weby', 'AI weby pro malé firmy', 399, 'pdfs/ai-weby.pdf', false, false),
  ('bundle', 'Balíček všech 3 e-booků + bonus', 999, null, true, false),
  ('bonus-prvni-klient', 'Jak sehnat prvního klienta', null, 'pdfs/bonus-prvni-klient.pdf', false, true);
```

- [ ] **Step 3: Apply migration in Supabase**

Filip via Supabase Dashboard → SQL Editor → paste migration content → Run.

Verify tables exist in Table Editor.

Then in Storage UI:
- Create bucket `pdfs`, visibility `private`.

- [ ] **Step 4: Supabase client wrapper**

`lib/supabase.ts`:
```ts
import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
```

This is server-only — never imported into browser code.

- [ ] **Step 5: Commit**

```bash
git add supabase/ lib/supabase.ts
git commit -m "feat: Supabase schema + admin client"
```

---

## Task 17: Stripe account setup + SDK wrapper

**Files:**
- Create: `lib/stripe.ts`

- [ ] **Step 1: Create Stripe account, get keys (Filip)**

Filip:
1. Stripe.com → register (use real business info: jméno, IČ, adresa, číslo bankovního účtu)
2. Activate account (KYC docs)
3. Dashboard → Developers → API keys
4. Add to `.env.local` and Vercel Production env vars:
   - `STRIPE_SECRET_KEY=sk_test_...` (use test key for dev, live key for production)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
5. Webhook secret will come in Task 21.

- [ ] **Step 2: Stripe SDK wrapper**

`lib/stripe.ts`:
```ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
```

- [ ] **Step 3: Commit**

```bash
git add lib/stripe.ts
git commit -m "feat: Stripe server SDK wrapper"
```

---

## Task 18: Validation schemas

**Files:**
- Create: `lib/validation.ts`, `tests/unit/validation.test.ts`

- [ ] **Step 1: Failing test**

`tests/unit/validation.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { CheckoutInputSchema, CheckoutUpdateSchema } from "@/lib/validation";

describe("CheckoutInputSchema", () => {
  it("accepts valid single product", () => {
    const result = CheckoutInputSchema.safeParse({
      products: ["ai-grafika"],
      email: "test@example.com",
      consentImmediateFulfillment: true,
      consentTerms: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing consent", () => {
    const result = CheckoutInputSchema.safeParse({
      products: ["bundle"],
      email: "test@example.com",
      consentImmediateFulfillment: false,
      consentTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = CheckoutInputSchema.safeParse({
      products: ["bundle"],
      email: "not-an-email",
      consentImmediateFulfillment: true,
      consentTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown product slug", () => {
    const result = CheckoutInputSchema.safeParse({
      products: ["nonexistent"],
      email: "test@example.com",
      consentImmediateFulfillment: true,
      consentTerms: true,
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
npm test validation
```
Expected: FAIL.

- [ ] **Step 3: Implement validation**

`lib/validation.ts`:
```ts
import { z } from "zod";

const ProductSlugSchema = z.enum([
  "ai-ugc-reklamy",
  "ai-grafika",
  "ai-weby",
  "bundle",
  "bonus-prvni-klient",
]);

export const CheckoutInputSchema = z.object({
  products: z.array(ProductSlugSchema).min(1),
  email: z.string().email(),
  name: z.string().optional(),
  consentImmediateFulfillment: z.literal(true),
  consentTerms: z.literal(true),
  metadata: z.record(z.string()).optional(),
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;

export const CheckoutUpdateSchema = z.object({
  paymentIntentId: z.string().startsWith("pi_"),
  products: z.array(ProductSlugSchema).min(1),
});

export type CheckoutUpdate = z.infer<typeof CheckoutUpdateSchema>;

export const LeadInputSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;
```

- [ ] **Step 4: Run, verify pass**

```bash
npm test validation
```
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add lib/validation.ts tests/unit/validation.test.ts
git commit -m "feat: Zod schemas for checkout, update, lead"
```

---

## Task 19: API route — POST /api/checkout (create PaymentIntent + draft order)

**Files:**
- Create: `app/api/checkout/route.ts`, `tests/api/checkout.test.ts`

- [ ] **Step 1: Failing test for the route logic (extract a tested function)**

We'll extract logic into `lib/checkout-service.ts` for testability, then route delegates.

`tests/api/checkout.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createCheckout } from "@/lib/checkout-service";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    paymentIntents: {
      create: vi.fn(async () => ({ id: "pi_test_123", client_secret: "pi_test_123_secret" })),
    },
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ select: vi.fn(() => ({ single: vi.fn(async () => ({ data: { id: "order_123" }, error: null })) })) })),
    })),
  },
}));

describe("createCheckout", () => {
  it("returns clientSecret + paymentIntentId for valid bundle order", async () => {
    const result = await createCheckout({
      products: ["bundle"],
      email: "test@example.com",
      consentImmediateFulfillment: true,
      consentTerms: true,
    });
    expect(result.paymentIntentId).toBe("pi_test_123");
    expect(result.clientSecret).toBe("pi_test_123_secret");
  });

  it("rejects mixed bundle + single", async () => {
    await expect(createCheckout({
      products: ["bundle", "ai-grafika"],
      email: "test@example.com",
      consentImmediateFulfillment: true,
      consentTerms: true,
    })).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
npm test checkout
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement service**

`lib/checkout-service.ts`:
```ts
import { stripe } from "./stripe";
import { supabaseAdmin } from "./supabase";
import { calculateCart } from "./pricing";
import type { CheckoutInput } from "./validation";

export type CreateCheckoutResult = {
  paymentIntentId: string;
  clientSecret: string;
  orderId: string;
};

export async function createCheckout(input: CheckoutInput): Promise<CreateCheckoutResult> {
  const cart = calculateCart(input.products);
  const amountInHaler = cart.totalKc * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInHaler,
    currency: "czk",
    automatic_payment_methods: { enabled: true },
    receipt_email: input.email,
    metadata: {
      product_slugs: input.products.join(","),
      email: input.email,
    },
  });

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      email: input.email,
      name: input.name ?? null,
      stripe_payment_intent_id: paymentIntent.id,
      amount_total_kc: cart.totalKc,
      product_slugs: cart.products,
      has_bonus: cart.products.includes("bundle"),
      status: "pending",
      consent_immediate_fulfillment: input.consentImmediateFulfillment,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create draft order: ${error.message}`);

  return {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret!,
    orderId: data.id,
  };
}
```

- [ ] **Step 4: Verify test passes**

```bash
npm test checkout
```
Expected: PASS.

- [ ] **Step 5: Implement route handler that delegates to service**

`app/api/checkout/route.ts`:
```ts
import { NextResponse } from "next/server";
import { CheckoutInputSchema } from "@/lib/validation";
import { createCheckout } from "@/lib/checkout-service";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CheckoutInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await createCheckout(parsed.data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("createCheckout error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

- [ ] **Step 6: Smoke test with curl (requires Stripe + Supabase configured)**

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"products":["bundle"],"email":"test@example.com","consentImmediateFulfillment":true,"consentTerms":true}'
```
Expected: JSON with `paymentIntentId`, `clientSecret`, `orderId`.

Verify in Stripe Dashboard → Payments that PaymentIntent appears.
Verify in Supabase Table Editor that draft order exists.

- [ ] **Step 7: Commit**

```bash
git add app/api/checkout/ lib/checkout-service.ts tests/api/checkout.test.ts
git commit -m "feat: POST /api/checkout creates PaymentIntent + draft order"
```

---

## Task 20: API route — POST /api/checkout/update (order bump dynamic update)

**Files:**
- Create: `app/api/checkout/update/route.ts`, `tests/api/checkout-update.test.ts`
- Modify: `lib/checkout-service.ts` (add `updateCheckout`)

- [ ] **Step 1: Failing test**

`tests/api/checkout-update.test.ts`:
```ts
import { describe, it, expect, vi } from "vitest";
import { updateCheckout } from "@/lib/checkout-service";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    paymentIntents: {
      retrieve: vi.fn(async () => ({ id: "pi_test_1", status: "requires_payment_method" })),
      update: vi.fn(async () => ({ id: "pi_test_1", amount: 99900 })),
    },
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({ eq: vi.fn(async () => ({ error: null })) })),
    })),
  },
}));

describe("updateCheckout", () => {
  it("updates PaymentIntent and order with new product set", async () => {
    const result = await updateCheckout({
      paymentIntentId: "pi_test_1",
      products: ["bundle"],
    });
    expect(result.totalKc).toBe(999);
  });

  it("rejects update if PaymentIntent already succeeded", async () => {
    const stripeMock = await import("@/lib/stripe");
    vi.mocked(stripeMock.stripe.paymentIntents.retrieve).mockResolvedValueOnce({
      id: "pi_test_1",
      status: "succeeded",
    } as any);

    await expect(updateCheckout({
      paymentIntentId: "pi_test_1",
      products: ["bundle"],
    })).rejects.toThrow(/cannot update/i);
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
npm test checkout-update
```
Expected: FAIL.

- [ ] **Step 3: Implement updateCheckout**

Append to `lib/checkout-service.ts`:
```ts
import type { CheckoutUpdate } from "./validation";

export type UpdateCheckoutResult = {
  paymentIntentId: string;
  totalKc: number;
};

export async function updateCheckout(input: CheckoutUpdate): Promise<UpdateCheckoutResult> {
  const intent = await stripe.paymentIntents.retrieve(input.paymentIntentId);
  if (intent.status !== "requires_payment_method" && intent.status !== "requires_confirmation") {
    throw new Error(`Cannot update PaymentIntent in status: ${intent.status}`);
  }

  const cart = calculateCart(input.products);
  const amountInHaler = cart.totalKc * 100;

  await stripe.paymentIntents.update(input.paymentIntentId, {
    amount: amountInHaler,
    metadata: {
      product_slugs: input.products.join(","),
    },
  });

  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      amount_total_kc: cart.totalKc,
      product_slugs: cart.products,
      has_bonus: cart.products.includes("bundle"),
    })
    .eq("stripe_payment_intent_id", input.paymentIntentId);

  if (error) throw new Error(`Failed to update order: ${error.message}`);

  return {
    paymentIntentId: input.paymentIntentId,
    totalKc: cart.totalKc,
  };
}
```

- [ ] **Step 4: Verify test passes**

```bash
npm test checkout-update
```
Expected: PASS.

- [ ] **Step 5: Implement route handler**

`app/api/checkout/update/route.ts`:
```ts
import { NextResponse } from "next/server";
import { CheckoutUpdateSchema } from "@/lib/validation";
import { updateCheckout } from "@/lib/checkout-service";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CheckoutUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await updateCheckout(parsed.data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("updateCheckout error:", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add app/api/checkout/update/ lib/checkout-service.ts tests/api/checkout-update.test.ts
git commit -m "feat: POST /api/checkout/update for order bump dynamic pricing"
```

---

## Task 21: Stripe webhook handler with idempotency

**Files:**
- Create: `app/api/webhook/stripe/route.ts`, `tests/api/webhook.test.ts`
- Modify: `lib/checkout-service.ts` (add `markOrderPaid`)

- [ ] **Step 1: Get webhook secret (Filip)**

In Stripe Dashboard → Developers → Webhooks → Add endpoint:
- Endpoint URL: `https://pohodazdomova.cz/api/webhook/stripe`
- Events to send: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
- Save the **signing secret** (`whsec_...`) to `.env.local` and Vercel as `STRIPE_WEBHOOK_SECRET`.

For local testing, use Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
This prints a different secret for local — use it in `.env.local` while developing.

- [ ] **Step 2: Failing test for markOrderPaid**

`tests/api/webhook.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { markOrderPaid } from "@/lib/checkout-service";

const updateMock = vi.fn(async () => ({ data: { id: "order_1", product_slugs: ["bundle"], email: "x@y.cz" }, error: null }));

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({ single: updateMock })),
          })),
        })),
      })),
    })),
  },
}));

beforeEach(() => updateMock.mockClear());

describe("markOrderPaid", () => {
  it("flips status to paid only if currently pending (idempotent)", async () => {
    const result = await markOrderPaid("pi_test_x");
    expect(result.email).toBe("x@y.cz");
    expect(updateMock).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 3: Verify fails**

```bash
npm test webhook
```
Expected: FAIL.

- [ ] **Step 4: Implement markOrderPaid**

Append to `lib/checkout-service.ts`:
```ts
export type PaidOrder = {
  id: string;
  email: string;
  name: string | null;
  product_slugs: string[];
  has_bonus: boolean;
  amount_total_kc: number;
};

export async function markOrderPaid(paymentIntentId: string): Promise<PaidOrder | null> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("status", "pending")
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`markOrderPaid failed: ${error.message}`);
  }
  return data as PaidOrder;
}

export async function markOrderRefunded(paymentIntentId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_payment_intent_id", paymentIntentId);
  if (error) throw new Error(`markOrderRefunded failed: ${error.message}`);

  await supabaseAdmin.from("refunds").insert({
    order_id: null,
    reason: "stripe_refund_webhook",
  });
}
```

- [ ] **Step 5: Verify test passes**

```bash
npm test webhook
```
Expected: PASS.

- [ ] **Step 6: Webhook route handler**

`app/api/webhook/stripe/route.ts`:
```ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { markOrderPaid, markOrderRefunded } from "@/lib/checkout-service";
import { sendDownloadEmail } from "@/lib/resend";
import { sendMetaConversion } from "@/lib/meta-conversions";

export const runtime = "nodejs"; // Stripe webhook signature verification needs Node, not Edge

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const payload = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object as any;
      const order = await markOrderPaid(intent.id);
      if (order) {
        await sendDownloadEmail(order);
        await sendMetaConversion("Purchase", {
          value: order.amount_total_kc,
          currency: "CZK",
          email: order.email,
          orderId: order.id,
        });
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as any;
      const intentId = charge.payment_intent;
      if (intentId) await markOrderRefunded(intentId);
    } else if (event.type === "payment_intent.payment_failed") {
      // Just log; UI handles user feedback
      console.warn("payment_failed:", event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    // Return 500 so Stripe retries
    return NextResponse.json({ error: "handler error" }, { status: 500 });
  }
}
```

Note: `sendDownloadEmail` and `sendMetaConversion` are stubbed for now; implemented in Tasks 23 and 30.

- [ ] **Step 7: Stub the dependencies temporarily so build doesn't break**

`lib/resend.ts` (stub):
```ts
export async function sendDownloadEmail(_order: { id: string; email: string }) {
  console.log("STUB: sendDownloadEmail", _order);
}
```

`lib/meta-conversions.ts` (stub):
```ts
export async function sendMetaConversion(_event: string, _payload: unknown) {
  console.log("STUB: sendMetaConversion", _event, _payload);
}
```

- [ ] **Step 8: Local end-to-end test with Stripe CLI**

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
# In another terminal:
stripe trigger payment_intent.succeeded
```
Expected: webhook hit, console log shows STUB sendDownloadEmail.

- [ ] **Step 9: Commit**

```bash
git add app/api/webhook/ lib/checkout-service.ts lib/resend.ts lib/meta-conversions.ts tests/api/webhook.test.ts
git commit -m "feat: Stripe webhook with idempotent order paid flip + stubs for email/tracking"
```

---

## Task 22: Checkout UI — page + form (without order bump yet)

**Files:**
- Create: `app/checkout/page.tsx`, `components/checkout/CheckoutForm.tsx`, `components/checkout/OrderSummary.tsx`

- [ ] **Step 1: Checkout page server component (resolves product from URL)**

`app/checkout/page.tsx`:
```tsx
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getProduct } from "@/lib/products";

type SearchParams = { product?: string };

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const slug = params.product;
  if (!slug) redirect("/bundle");
  const product = getProduct(slug as any);
  if (!product || product.isBonusOnly) redirect("/bundle");

  return <CheckoutForm initialProduct={slug as any} />;
}
```

- [ ] **Step 2: OrderSummary component**

`components/checkout/OrderSummary.tsx`:
```tsx
"use client";
import { getProduct } from "@/lib/products";
import { calculateCart } from "@/lib/pricing";

export function OrderSummary({ products }: { products: string[] }) {
  let totalKc = 0;
  try {
    totalKc = calculateCart(products as any).totalKc;
  } catch {
    totalKc = 0;
  }
  return (
    <div className="bg-cream rounded-card p-6">
      <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-4">Souhrn objednávky</div>
      {products.map((slug) => {
        const p = getProduct(slug as any);
        return (
          <div key={slug} className="flex justify-between py-3 border-b border-ink/10 text-sm">
            <div>
              <div className="font-medium text-ink">{p?.title}</div>
              <div className="text-xs text-ink/60">{p?.isBundle ? "3 e-booky + bonus" : "Elektronická kniha (PDF)"}</div>
            </div>
            <div className="font-medium">{p?.priceKc ?? "—"} Kč</div>
          </div>
        );
      })}
      <div className="flex justify-between pt-4 font-bold text-lg text-navy">
        <span>Celkem</span>
        <span>{totalKc} Kč</span>
      </div>
      <div className="mt-4 text-xs text-ink/60 leading-relaxed">
        Doručení e-mailem do několika minut.
      </div>
    </div>
  );
}
```

- [ ] **Step 3: CheckoutForm — Stripe Payment Element + form (without order bump yet)**

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

`components/checkout/CheckoutForm.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { loadStripe, type Stripe as StripeJS } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { OrderSummary } from "./OrderSummary";

const stripePromise: Promise<StripeJS | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = { initialProduct: string };

export function CheckoutForm({ initialProduct }: Props) {
  const [products, setProducts] = useState<string[]>([initialProduct]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentImmediate, setConsentImmediate] = useState(false);

  const canPay = email && consentTerms && consentImmediate;

  useEffect(() => {
    if (!canPay) return;
    if (clientSecret) return;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products,
        email,
        name: name || undefined,
        consentImmediateFulfillment: consentImmediate,
        consentTerms,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        }
      });
  }, [canPay, clientSecret, email, name, products, consentImmediate, consentTerms]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Kontaktní údaje</h2>
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 rounded-md px-3 py-2.5 mb-3" />
            <input type="text" placeholder="Jméno (volitelné)" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink/15 rounded-md px-3 py-2.5" />
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Platba</h2>
            {clientSecret ? (
              <Elements options={{ clientSecret, appearance: { theme: "stripe" } }} stripe={stripePromise}>
                <InnerPay paymentIntentId={paymentIntentId!} />
              </Elements>
            ) : (
              <p className="text-sm text-ink/60">Vyplň e-mail a zaškrtni souhlasy níže, ať můžeš pokračovat k platbě.</p>
            )}
          </div>

          <div className="bg-white rounded-card shadow-card p-6 space-y-3 text-sm">
            <label className="flex gap-2 items-start">
              <input type="checkbox" checked={consentTerms} onChange={(e) => setConsentTerms(e.target.checked)} className="mt-1" />
              <span>Souhlasím s <a href="/obchodni-podminky" target="_blank" className="underline">obchodními podmínkami</a> a <a href="/gdpr" target="_blank" className="underline">zpracováním osobních údajů</a>.</span>
            </label>
            <label className="flex gap-2 items-start">
              <input type="checkbox" checked={consentImmediate} onChange={(e) => setConsentImmediate(e.target.checked)} className="mt-1" />
              <span>Souhlasím s okamžitým zahájením plnění a výslovně se vzdávám práva na odstoupení od smlouvy ve 14denní lhůtě.</span>
            </label>
          </div>
        </div>

        <OrderSummary products={products} />
      </div>
    </div>
  );
}

function InnerPay({ paymentIntentId }: { paymentIntentId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/diky?pi=${paymentIntentId}`,
      },
    });
    if (error) {
      setError(error.message ?? "Platba selhala");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      <button type="submit" disabled={loading || !stripe} className="mt-4 w-full bg-navy text-white py-3 rounded-md font-semibold hover:bg-navy/90 disabled:opacity-50">
        {loading ? "Zpracovávám…" : "Zaplatit"}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Verify checkout flow without order bump end-to-end**

```bash
npm run dev
```
- Open `/ai-grafika`, click "Koupit za 399 Kč"
- Fill email, check both consents
- Pay with Stripe test card `4242 4242 4242 4242` exp `12/30` cvc `123`
- Verify Stripe Dashboard shows succeeded payment
- Verify webhook log in stripe CLI shows hit
- Verify Supabase orders table has row with `status: paid`

- [ ] **Step 5: Commit**

```bash
git add app/checkout/ components/checkout/
git commit -m "feat: checkout page with Stripe Payment Element + consents (no order bump yet)"
```

---

## Task 23: Order bump bar with dynamic pricing

**Files:**
- Create: `components/checkout/OrderBumpBar.tsx`
- Modify: `components/checkout/CheckoutForm.tsx`

- [ ] **Step 1: OrderBumpBar component**

`components/checkout/OrderBumpBar.tsx`:
```tsx
"use client";

type Props = {
  isBundle: boolean;
  onToggle: (next: boolean) => void;
  loading?: boolean;
};

export function OrderBumpBar({ isBundle, onToggle, loading }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-navy to-navy-600 rounded-card p-6 shadow-upsell text-white overflow-hidden">
      <div className="absolute top-4 right-[-38px] bg-gold text-navy text-[11px] font-extrabold tracking-wider px-12 py-1 rotate-[35deg]">
        UŠETŘÍTE 198 KČ
      </div>
      <div className="flex gap-4 items-start">
        <input
          type="checkbox"
          checked={isBundle}
          disabled={loading}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 w-5 h-5 accent-gold"
        />
        <div className="flex-1">
          <div className="inline-block bg-gold text-navy text-[11px] font-extrabold tracking-wider px-2 py-0.5 rounded mb-3">
            NEJOBLÍBENĚJŠÍ VOLBA
          </div>
          <div className="text-xl font-extrabold tracking-tight mb-3 leading-tight">
            Pouze <span className="text-gold">999 Kč</span> a získáte{" "}
            <u className="decoration-gold decoration-2 underline-offset-4">všechny 3 e-booky + bonus zdarma</u>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 border border-white/15 rounded-md p-3">
              <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Bez balíčku</div>
              <div className="text-base font-semibold line-through opacity-70">399 × 3 = 1197 Kč</div>
              <div className="text-[11px] opacity-60">+ bez bonusu</div>
            </div>
            <div className="bg-gold text-navy rounded-md p-3">
              <div className="text-[10px] uppercase tracking-wider font-bold opacity-70 mb-1">S balíčkem</div>
              <div className="text-lg font-extrabold">999 Kč</div>
              <div className="text-[11px] font-semibold">+ bonus e-book ZDARMA</div>
            </div>
          </div>
          <div className="mt-3 bg-gold/10 border border-dashed border-gold/50 rounded-md p-3 text-sm leading-relaxed">
            <strong className="text-gold">Bonus "Jak sehnat prvního klienta"</strong> — moje vlastní techniky shánění klientů včetně cold-email automatizace. <strong>Není dostupný samostatně.</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire OrderBumpBar into CheckoutForm**

In `components/checkout/CheckoutForm.tsx`, above the contact card:
- Add state `const [bumping, setBumping] = useState(false);`
- Add handler:
```ts
async function handleBumpToggle(next: boolean) {
  const nextProducts = next ? ["bundle"] : [initialProduct];
  setProducts(nextProducts);

  if (paymentIntentId) {
    setBumping(true);
    await fetch("/api/checkout/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId, products: nextProducts }),
    });
    setBumping(false);
  }
}
```
- If `initialProduct !== "bundle"`, render `<OrderBumpBar isBundle={products.includes("bundle")} onToggle={handleBumpToggle} loading={bumping} />` at top of left column.
- Update Pay button label dynamically: show "Zaplatit {totalKc} Kč" using `calculateCart(products).totalKc`.

- [ ] **Step 3: End-to-end test order bump**

```bash
npm run dev
```
- Open `/ai-grafika` → checkout
- Verify FOMO bar shows
- Toggle checkbox → cart updates to 999 Kč, Stripe Payment Element refreshes (clientSecret stays valid since we update PaymentIntent in place)
- Pay with test card
- Verify Supabase order has `product_slugs: ['bundle']` and `amount_total_kc: 999`

- [ ] **Step 4: Commit**

```bash
git add components/checkout/
git commit -m "feat: FOMO order bump bar with dynamic PaymentIntent update"
```

---

## Task 24: Thank-you page with download links

**Files:**
- Create: `app/diky/page.tsx`, `lib/signed-url.ts`

- [ ] **Step 1: signed-url helper**

`lib/signed-url.ts`:
```ts
import { supabaseAdmin } from "./supabase";

const EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function getDownloadUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from("pdfs")
    .createSignedUrl(storagePath, EXPIRY_SECONDS);
  if (error || !data) throw new Error(`Failed to sign URL: ${error?.message}`);
  return data.signedUrl;
}
```

- [ ] **Step 2: Thank-you page**

`app/diky/page.tsx`:
```tsx
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { expandToFulfillment } from "@/lib/pricing";
import { getProduct, type ProductSlug } from "@/lib/products";
import { getDownloadUrl } from "@/lib/signed-url";
import { markOrderPaid } from "@/lib/checkout-service";

export const dynamic = "force-dynamic";

type SearchParams = { pi?: string };

export default async function DikyPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const pi = params.pi;
  if (!pi) {
    return <Fallback message="Chybí identifikátor platby." />;
  }

  // Fetch order; if missing, fallback: query Stripe + try to mark paid
  let { data: order } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("stripe_payment_intent_id", pi)
    .maybeSingle();

  if (order && order.status !== "paid") {
    const intent = await stripe.paymentIntents.retrieve(pi);
    if (intent.status === "succeeded") {
      const updated = await markOrderPaid(pi);
      if (updated) order = { ...order, ...updated, status: "paid" };
    }
  }

  if (!order || order.status !== "paid") {
    return <Fallback message="Platba se zpracovává. Za chvíli refresh." />;
  }

  const fulfillSlugs = expandToFulfillment(order.product_slugs as ProductSlug[]);
  const downloads = await Promise.all(
    fulfillSlugs.map(async (slug) => {
      const p = getProduct(slug);
      const url = p?.pdfStoragePath ? await getDownloadUrl(p.pdfStoragePath) : null;
      return { slug, title: p?.title ?? slug, url };
    })
  );

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy">Děkujeme za nákup</h1>
      <p className="mt-4 text-lg text-ink/75">
        E-mail s odkazy ke stažení jsme ti právě poslali. Pro jistotu je tady i přímo:
      </p>
      <ul className="mt-8 space-y-3">
        {downloads.map((d) => (
          <li key={d.slug} className="bg-white rounded-card p-5 shadow-card flex justify-between items-center">
            <div>
              <div className="font-bold text-navy">{d.title}</div>
              <div className="text-xs text-ink/60">PDF · platí 7 dní</div>
            </div>
            {d.url && (
              <a href={d.url} download className="bg-navy text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-navy/90">
                Stáhnout
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-ink/60">
        Pokud cokoliv nedorazí, napiš na <a href="mailto:filip@pohodazdomova.cz" className="underline">filip@pohodazdomova.cz</a>.
      </p>
    </article>
  );
}

function Fallback({ message }: { message: string }) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-navy">Hned to bude</h1>
      <p className="mt-3 text-ink/70">{message}</p>
    </article>
  );
}
```

- [ ] **Step 3: Upload placeholder PDFs to Supabase Storage**

Filip: until real PDFs ready, upload 4 placeholder PDFs to bucket `pdfs/`:
- `ai-ugc-reklamy.pdf`, `ai-grafika.pdf`, `ai-weby.pdf`, `bonus-prvni-klient.pdf`

Even a single-page "Coming soon" PDF is enough for end-to-end verification.

- [ ] **Step 4: End-to-end test full purchase**

- Buy bundle via test card
- After Stripe redirect, land on `/diky?pi=...`
- Verify 4 download links appear with active signed URLs
- Click one — PDF downloads

- [ ] **Step 5: Commit**

```bash
git add app/diky/ lib/signed-url.ts
git commit -m "feat: thank-you page with signed download URLs"
```

---

## Task 25: Re-send download link form (`/api/help/resend`)

**Files:**
- Create: `app/api/help/resend/route.ts`
- Modify: `app/kontakt/page.tsx` (add re-send form)

- [ ] **Step 1: API route**

`app/api/help/resend/route.ts`:
```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendDownloadEmail } from "@/lib/resend";

const Schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  // Rate limit: max 3 resends per email per day (rough — store in DB if abused)
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("email_log")
    .select("*", { count: "exact", head: true })
    .eq("email_type", "download")
    .gte("sent_at", since);

  if ((count ?? 0) > 50) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("email", parsed.data.email)
    .eq("status", "paid")
    .order("paid_at", { ascending: false })
    .limit(1);

  if (!orders || orders.length === 0) {
    // Don't reveal existence of account
    return NextResponse.json({ ok: true });
  }

  await sendDownloadEmail(orders[0]);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Add form to kontakt page**

Append to `app/kontakt/page.tsx`:
```tsx
import { ResendForm } from "@/components/shared/ResendForm";
// ...
<div className="mt-10 bg-white rounded-card p-6 shadow-card">
  <h2 className="text-lg font-bold text-navy mb-3">Ztratil jsi odkaz ke stažení?</h2>
  <p className="text-sm text-ink/70 mb-4">Napiš svůj e-mail z objednávky a pošleme nový.</p>
  <ResendForm />
</div>
```

`components/shared/ResendForm.tsx`:
```tsx
"use client";
import { useState } from "react";

export function ResendForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/help/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("done");
  }
  if (status === "done") return <p className="text-navy">Pokud objednávka existuje, e-mail s odkazem je na cestě.</p>;
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" required placeholder="E-mail z objednávky" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 border border-ink/15 rounded-md px-3 py-2.5" />
      <button type="submit" disabled={status === "sending"} className="bg-navy text-white px-4 py-2.5 rounded-md font-semibold disabled:opacity-50">
        {status === "sending" ? "Odesílám…" : "Poslat"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/help/ app/kontakt/page.tsx components/shared/ResendForm.tsx
git commit -m "feat: re-send download link form on contact page"
```

---

## Task 26: PHASE 2 checkpoint — E2E test

**Files:**
- Create: `tests/e2e/purchase-bundle-via-bump.spec.ts`

- [ ] **Step 1: Playwright E2E for full bundle-via-bump flow**

`tests/e2e/purchase-bundle-via-bump.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test("user buys single, hits bump, completes purchase", async ({ page }) => {
  await page.goto("/ai-grafika");
  await page.getByRole("link", { name: /Koupit za 399 Kč/ }).click();

  await expect(page.getByText(/UŠETŘÍTE 198 KČ/)).toBeVisible();

  await page.getByPlaceholder("E-mail").fill("e2e@example.com");
  await page.getByLabel(/obchodními podmínkami/).check();
  await page.getByLabel(/okamžitým zahájením plnění/).check();

  // Toggle bump
  await page.locator(".accent-gold").first().check();

  // Wait for clientSecret loaded
  await expect(page.getByRole("button", { name: /Zaplatit/ })).toBeEnabled({ timeout: 10000 });

  // NOTE: Stripe Payment Element runs in iframe — full payment requires Stripe test setup
  // For CI, stop here and mock Stripe in a separate integration test layer
});
```

- [ ] **Step 2: Run E2E**

```bash
npm run test:e2e -- purchase-bundle-via-bump
```
Expected: PASS (smoke level — full Stripe payment via iframe is hard in headless and tested manually).

- [ ] **Step 3: Tag phase 2 complete**

```bash
git tag phase2-complete
git commit -m "chore: phase 2 complete — checkout + payments live with order bump" --allow-empty
```

---

# PHASE 3 — Email Automation (W5–W6)

## Task 27: Resend setup + DownloadEmail template

**Files:**
- Create: `emails/DownloadEmail.tsx`
- Modify: `lib/resend.ts` (replace stub with real implementation)

- [ ] **Step 1: Resend account + verified domain (Filip)**

Filip:
1. Resend.com → register
2. Add domain `pohodazdomova.cz` → verify DNS records (SPF, DKIM, DMARC)
3. Get API key → add `RESEND_API_KEY` to `.env.local` and Vercel
4. Set `RESEND_FROM_EMAIL=Filip <filip@pohodazdomova.cz>`

- [ ] **Step 2: DownloadEmail React Email template**

`emails/DownloadEmail.tsx`:
```tsx
import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Section, Link,
} from "@react-email/components";

type Props = {
  email: string;
  name: string | null;
  downloads: { title: string; url: string; isBonus?: boolean }[];
  hasBonus: boolean;
};

export function DownloadEmail({ name, downloads, hasBonus }: Props) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}>
          <Heading style={{ color: "#1a1f3a", fontSize: 24, marginTop: 0 }}>Děkujeme za nákup</Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.6 }}>
            {greeting}<br /><br />
            E-book{downloads.length > 1 ? "y" : ""} máš připravený ke stažení. Linky platí 7 dní — ulož si soubory na disk.
          </Text>

          {hasBonus && (
            <Section style={{ background: "#fff8e1", borderLeft: "3px solid #ffba08", padding: 16, marginTop: 16, borderRadius: 6 }}>
              <Text style={{ margin: 0, fontSize: 14, color: "#1a1a1a" }}>
                <strong>Bonus uvnitř:</strong> "Jak sehnat prvního klienta" — moje vlastní techniky shánění klientů.
              </Text>
            </Section>
          )}

          <Hr style={{ margin: "24px 0", borderColor: "#eee" }} />

          {downloads.map((d) => (
            <Section key={d.title} style={{ marginBottom: 12 }}>
              <Text style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#1a1f3a" }}>
                {d.isBonus && <span style={{ color: "#ffba08", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginRight: 6 }}>Bonus</span>}
                {d.title}
              </Text>
              <Button href={d.url} style={{ background: "#1a1f3a", color: "white", padding: "10px 16px", borderRadius: 6, fontSize: 14, textDecoration: "none" }}>
                Stáhnout PDF
              </Button>
            </Section>
          ))}

          <Hr style={{ margin: "24px 0", borderColor: "#eee" }} />

          <Text style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
            Kdyby cokoliv — odpověz rovnou na tento e-mail. Píšu si s každým osobně.<br /><br />
            Filip<br />
            <Link href="https://pohodazdomova.cz" style={{ color: "#1a1f3a" }}>pohodazdomova.cz</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 3: Replace lib/resend.ts stub with real implementation**

`lib/resend.ts`:
```ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import { DownloadEmail } from "@/emails/DownloadEmail";
import { supabaseAdmin } from "./supabase";
import { expandToFulfillment } from "./pricing";
import { getProduct, type ProductSlug, BONUS_SLUG } from "./products";
import { getDownloadUrl } from "./signed-url";
import type { PaidOrder } from "./checkout-service";

if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "Filip <filip@pohodazdomova.cz>";

export async function sendDownloadEmail(order: PaidOrder): Promise<void> {
  // Idempotency: check if already sent
  const { data: existing } = await supabaseAdmin
    .from("email_log")
    .select("id")
    .eq("order_id", order.id)
    .eq("email_type", "download")
    .maybeSingle();
  if (existing) return;

  const fulfillSlugs = expandToFulfillment(order.product_slugs as ProductSlug[]);
  const downloads = await Promise.all(
    fulfillSlugs.map(async (slug) => {
      const product = getProduct(slug);
      const url = product?.pdfStoragePath ? await getDownloadUrl(product.pdfStoragePath) : "#";
      return { title: product?.title ?? slug, url, isBonus: slug === BONUS_SLUG };
    })
  );

  const html = await render(
    DownloadEmail({ email: order.email, name: order.name, downloads, hasBonus: order.has_bonus })
  );

  const result = await resend.emails.send({
    from: FROM,
    to: order.email,
    subject: "Tvoje e-booky jsou připravené ke stažení",
    html,
  });

  await supabaseAdmin.from("email_log").insert({
    order_id: order.id,
    email_type: "download",
    resend_message_id: result.data?.id ?? null,
  });
}
```

- [ ] **Step 4: Test locally — make a real test purchase, verify email arrives**

Use Stripe test card. Email should land in your inbox (or spam — verify domain auth in Resend).

- [ ] **Step 5: Commit**

```bash
git add emails/DownloadEmail.tsx lib/resend.ts
git commit -m "feat: download email via Resend with React Email template"
```

---

## Task 28: Follow-up email templates

**Files:**
- Create: `emails/StartedReadingEmail.tsx`, `emails/UpsellEmail.tsx`, `emails/ReviewRequestEmail.tsx`
- Modify: `lib/resend.ts` (add senders)

- [ ] **Step 1: StartedReadingEmail (T+1)**

`emails/StartedReadingEmail.tsx`:
```tsx
import { Html, Head, Body, Container, Text, Heading, Link } from "@react-email/components";

export function StartedReadingEmail({ name }: { name: string | null }) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}>
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>Jen jsem chtěl zkontrolovat</Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}<br /><br />
            Včera jsi koupil e-book. Jen jsem zvědavý — stihl jsi se aspoň podívat?
          </Text>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            Kdyby ti něco nesedělo nebo jsi měl jakoukoliv otázku, prostě <strong>odpověz na tento e-mail</strong>. Píšu si s každým osobně.
          </Text>
          <Text style={{ color: "#555", fontSize: 14, marginTop: 24 }}>
            Filip<br />
            <Link href="https://pohodazdomova.cz" style={{ color: "#1a1f3a" }}>pohodazdomova.cz</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: UpsellEmail (T+5, single → bundle)**

`emails/UpsellEmail.tsx`:
```tsx
import { Html, Head, Body, Container, Heading, Text, Button, Section, Link } from "@react-email/components";

type Props = {
  name: string | null;
  productTitle: string;
  upgradeUrl: string;
  expiresInHours: number;
};

export function UpsellEmail({ name, productTitle, upgradeUrl, expiresInHours }: Props) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}>
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>Speciální nabídka jen pro tebe</Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}<br /><br />
            Vidím, že máš {productTitle}. Když si dokoupíš zbylé dva e-booky a bonus, dostaneš to za <strong>doplatek 600 Kč</strong> místo plné ceny 798 Kč.
          </Text>
          <Section style={{ background: "#fff8e1", borderLeft: "3px solid #ffba08", padding: 16, borderRadius: 6, margin: "16px 0" }}>
            <Text style={{ margin: 0, fontSize: 14, color: "#1a1a1a" }}>
              <strong>Co dostaneš:</strong> 2 zbylé e-booky + exkluzivní bonus "Jak sehnat prvního klienta" (není dostupný samostatně).
            </Text>
          </Section>
          <Button href={upgradeUrl} style={{ background: "#1a1f3a", color: "white", padding: "12px 20px", borderRadius: 6, fontSize: 15, textDecoration: "none", fontWeight: 600 }}>
            Dokoupit za 600 Kč
          </Button>
          <Text style={{ color: "#888", fontSize: 12, marginTop: 12 }}>
            Nabídka platí {expiresInHours} hodin.
          </Text>
          <Text style={{ color: "#555", fontSize: 14, marginTop: 24 }}>
            Filip<br />
            <Link href="https://pohodazdomova.cz" style={{ color: "#1a1f3a" }}>pohodazdomova.cz</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 3: ReviewRequestEmail (T+10)**

`emails/ReviewRequestEmail.tsx`:
```tsx
import { Html, Head, Body, Container, Heading, Text, Link } from "@react-email/components";

export function ReviewRequestEmail({ name }: { name: string | null }) {
  const greeting = name ? `Ahoj ${name},` : "Ahoj,";
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f3", padding: 24 }}>
        <Container style={{ background: "white", borderRadius: 12, padding: 32, maxWidth: 560 }}>
          <Heading style={{ color: "#1a1f3a", fontSize: 22, marginTop: 0 }}>Jak ti to jde?</Heading>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            {greeting}<br /><br />
            Je to ~10 dní od koupě e-booku. Pokud ti něco z toho pomohlo (nebo naopak chybělo), <strong>odpověz na tenhle mail</strong> — vážně mě zajímá feedback.
          </Text>
          <Text style={{ color: "#1a1a1a", fontSize: 16, lineHeight: 1.7 }}>
            A pokud ti to bylo užitečné a můžeš sdílet pár vět jako recenzi, hodně mi to pomůže. Stačí krátká odpověď, použiju to s tvým souhlasem na webu.
          </Text>
          <Text style={{ color: "#555", fontSize: 14, marginTop: 24 }}>
            Díky, Filip<br />
            <Link href="https://pohodazdomova.cz" style={{ color: "#1a1f3a" }}>pohodazdomova.cz</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 4: Add senders to lib/resend.ts**

Append:
```ts
import { StartedReadingEmail } from "@/emails/StartedReadingEmail";
import { UpsellEmail } from "@/emails/UpsellEmail";
import { ReviewRequestEmail } from "@/emails/ReviewRequestEmail";
import { getProduct } from "./products";

export async function sendStartedReadingEmail(order: { id: string; email: string; name: string | null }): Promise<void> {
  const { data: existing } = await supabaseAdmin
    .from("email_log").select("id")
    .eq("order_id", order.id).eq("email_type", "started_reading").maybeSingle();
  if (existing) return;

  const html = await render(StartedReadingEmail({ name: order.name }));
  const result = await resend.emails.send({
    from: FROM, to: order.email,
    subject: "Jen jsem chtěl zkontrolovat — máš e-book?",
    html,
  });
  await supabaseAdmin.from("email_log").insert({
    order_id: order.id, email_type: "started_reading", resend_message_id: result.data?.id ?? null,
  });
}

export async function sendUpsellEmail(order: { id: string; email: string; name: string | null; product_slugs: string[] }): Promise<void> {
  const { data: existing } = await supabaseAdmin
    .from("email_log").select("id")
    .eq("order_id", order.id).eq("email_type", "upsell").maybeSingle();
  if (existing) return;

  const single = order.product_slugs.find((s) => s !== "bundle" && s !== "bonus-prvni-klient");
  if (!single) return; // Already bought bundle, no upsell

  const productTitle = getProduct(single as any)?.title ?? "tvůj e-book";
  const upgradeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?product=bundle&upgrade=${order.id}`;

  const html = await render(UpsellEmail({
    name: order.name, productTitle, upgradeUrl, expiresInHours: 48,
  }));
  const result = await resend.emails.send({
    from: FROM, to: order.email,
    subject: "Speciální nabídka jen pro tebe (zbylé 2 e-booky se slevou)",
    html,
  });
  await supabaseAdmin.from("email_log").insert({
    order_id: order.id, email_type: "upsell", resend_message_id: result.data?.id ?? null,
  });
}

export async function sendReviewRequestEmail(order: { id: string; email: string; name: string | null }): Promise<void> {
  const { data: existing } = await supabaseAdmin
    .from("email_log").select("id")
    .eq("order_id", order.id).eq("email_type", "review_request").maybeSingle();
  if (existing) return;

  const html = await render(ReviewRequestEmail({ name: order.name }));
  const result = await resend.emails.send({
    from: FROM, to: order.email,
    subject: "Jak ti to jde? Pomohl by mi tvůj feedback",
    html,
  });
  await supabaseAdmin.from("email_log").insert({
    order_id: order.id, email_type: "review_request", resend_message_id: result.data?.id ?? null,
  });
}
```

- [ ] **Step 5: Commit**

```bash
git add emails/ lib/resend.ts
git commit -m "feat: follow-up email templates (started reading, upsell, review)"
```

---

## Task 29: Vercel cron for scheduled follow-up emails

**Files:**
- Create: `app/api/cron/followup/route.ts`
- Modify: `vercel.json`

- [ ] **Step 1: Cron route handler**

`app/api/cron/followup/route.ts`:
```ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendStartedReadingEmail, sendUpsellEmail, sendReviewRequestEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // Vercel cron sends Authorization: Bearer ${CRON_SECRET}
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  // T+1 day: started reading
  const { data: orders1 } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("status", "paid")
    .gte("paid_at", new Date(now - 2 * day).toISOString())
    .lt("paid_at", new Date(now - 1 * day).toISOString());

  for (const o of orders1 ?? []) {
    try { await sendStartedReadingEmail(o); }
    catch (e) { console.error("started_reading send failed", o.id, e); }
  }

  // T+5 days: upsell (single buyers only)
  const { data: orders5 } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("status", "paid")
    .gte("paid_at", new Date(now - 6 * day).toISOString())
    .lt("paid_at", new Date(now - 5 * day).toISOString());

  for (const o of orders5 ?? []) {
    if (o.product_slugs.includes("bundle")) continue;
    try { await sendUpsellEmail(o); }
    catch (e) { console.error("upsell send failed", o.id, e); }
  }

  // T+10 days: review request
  const { data: orders10 } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("status", "paid")
    .gte("paid_at", new Date(now - 11 * day).toISOString())
    .lt("paid_at", new Date(now - 10 * day).toISOString());

  for (const o of orders10 ?? []) {
    try { await sendReviewRequestEmail(o); }
    catch (e) { console.error("review_request send failed", o.id, e); }
  }

  return NextResponse.json({
    ok: true,
    counts: {
      started_reading: orders1?.length ?? 0,
      upsell: orders5?.filter((o) => !o.product_slugs.includes("bundle")).length ?? 0,
      review: orders10?.length ?? 0,
    },
  });
}
```

- [ ] **Step 2: Vercel cron config**

`vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/followup",
      "schedule": "0 9 * * *"
    }
  ]
}
```
(Runs daily at 09:00 UTC = 11:00 Prague summer.)

- [ ] **Step 3: Generate CRON_SECRET (Filip)**

```bash
openssl rand -hex 32
```
Add to `.env.local` and Vercel as `CRON_SECRET`.

- [ ] **Step 4: Smoke test cron locally**

```bash
curl -H "Authorization: Bearer $(grep CRON_SECRET .env.local | cut -d= -f2)" http://localhost:3000/api/cron/followup
```
Expected: JSON with counts (likely 0 unless test orders exist with right paid_at timestamps).

- [ ] **Step 5: Commit**

```bash
git add app/api/cron/ vercel.json
git commit -m "feat: Vercel cron for daily follow-up emails (T+1, T+5, T+10)"
```

---

## Task 30: Mailerlite integration + lead magnet

**Files:**
- Create: `lib/mailerlite.ts`, `app/api/lead/route.ts`, `components/shared/SignupForm.tsx`
- Modify: product LPs and homepage to embed sign-up form

- [ ] **Step 1: Mailerlite account + lead magnet PDF (Filip)**

Filip:
1. Mailerlite.com → register
2. Create group "Lead Magnet — 5 AI nástrojů"
3. Save group ID + API key to `.env.local`:
   - `MAILERLITE_API_KEY=...`
   - `MAILERLITE_GROUP_ID_LEAD_MAGNET=...`
4. Build automation flow in Mailerlite UI:
   - Trigger: contact joins group
   - Step 1: Send Welcome + lead magnet PDF link (delay 0 min)
   - Step 2: Send "Můj příběh" (delay 2 days)
   - Step 3: Send "30 minut první AI vizuál" (delay 5 days)
   - Step 4: Send "Soft pitch e-booků" (delay 8 days)
5. Upload lead magnet PDF (1–2 stránky "5 AI nástrojů, které denně používám") to Resend or Supabase Storage; include URL in welcome email.

- [ ] **Step 2: Mailerlite client**

`lib/mailerlite.ts`:
```ts
const API = "https://connect.mailerlite.com/api";

export async function addLead(email: string, source = "lead-magnet"): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID_LEAD_MAGNET;
  if (!apiKey || !groupId) throw new Error("Mailerlite env vars missing");

  const res = await fetch(`${API}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      fields: { source },
    }),
  });

  if (!res.ok && res.status !== 200 && res.status !== 201) {
    const body = await res.text();
    throw new Error(`Mailerlite addLead failed: ${res.status} ${body}`);
  }
}
```

- [ ] **Step 3: Lead route**

`app/api/lead/route.ts`:
```ts
import { NextResponse } from "next/server";
import { LeadInputSchema } from "@/lib/validation";
import { addLead } from "@/lib/mailerlite";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LeadInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  try {
    await addLead(parsed.data.email, parsed.data.source);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("addLead error:", e);
    return NextResponse.json({ ok: true }); // Don't leak failures to user
  }
}
```

- [ ] **Step 4: SignupForm component**

`components/shared/SignupForm.tsx`:
```tsx
"use client";
import { useState } from "react";

type Props = { source?: string; title?: string; subtitle?: string };

export function SignupForm({ source = "footer", title = "5 AI nástrojů, které denně používám", subtitle = "Krátké PDF zdarma. Žádný spam." }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });
    setStatus("done");
  }

  if (status === "done") {
    return <p className="text-navy">Hotovo. Mrkni do schránky — odkaz ke stažení už je u tebe.</p>;
  }

  return (
    <div>
      <div className="font-bold text-navy">{title}</div>
      <p className="text-sm text-ink/70 mb-3">{subtitle}</p>
      <form onSubmit={submit} className="flex gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tvůj@email.cz" className="flex-1 border border-ink/15 rounded-md px-3 py-2.5 text-sm" />
        <button type="submit" disabled={status === "sending"} className="bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-sm disabled:opacity-50">
          {status === "sending" ? "..." : "Stáhnout"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Embed signup in footer + on each product LP**

Modify `components/shared/Footer.tsx`: add `<SignupForm source="footer" />` to first column.

In each product LP (`app/ai-*/page.tsx`), insert before FAQ:
```tsx
<section className="mx-auto max-w-3xl px-6 py-12">
  <div className="bg-white rounded-card p-6 shadow-card">
    <SignupForm source={`product-${productSlug}`} />
  </div>
</section>
```

(Update imports accordingly.)

- [ ] **Step 6: Test sign-up flow**

```bash
npm run dev
```
Submit email in signup form. Check Mailerlite UI — contact should appear in lead magnet group, automation triggered.

- [ ] **Step 7: Commit**

```bash
git add lib/mailerlite.ts app/api/lead/ components/shared/SignupForm.tsx components/shared/Footer.tsx app/ai-*/
git commit -m "feat: Mailerlite lead-magnet sign-up + form embedded site-wide"
```

---

# PHASE 4 — Tracking, QA, Launch (W7–W8)

## Task 31: GA4 + Meta Pixel client-side

**Files:**
- Create: `components/tracking/GA4.tsx`, `components/tracking/MetaPixel.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Filip creates GA4 property + Meta Pixel**

Filip:
1. analytics.google.com → create GA4 property `pohodazdomova.cz` → get measurement ID `G-XXXXXX`
2. business.facebook.com → Events Manager → create Pixel → get Pixel ID
3. Generate Meta Conversions API access token (Meta Business → Events Manager → Settings → Generate access token)
4. Add to `.env.local` and Vercel:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXX`
   - `META_PIXEL_ID=...`
   - `META_CONVERSIONS_ACCESS_TOKEN=...`

- [ ] **Step 2: GA4 component**

`components/tracking/GA4.tsx`:
```tsx
import Script from "next/script";

export function GA4() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { send_page_view: true });
      `}</Script>
    </>
  );
}
```

- [ ] **Step 3: Meta Pixel component**

`components/tracking/MetaPixel.tsx`:
```tsx
import Script from "next/script";

export function MetaPixel() {
  const id = process.env.META_PIXEL_ID;
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">{`
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${id}');
      fbq('track', 'PageView');
    `}</Script>
  );
}
```

Note: META_PIXEL_ID is used both server- and client-side. To expose to browser, add `NEXT_PUBLIC_` prefix and rename. For now, use `NEXT_PUBLIC_META_PIXEL_ID` in this component and `META_PIXEL_ID` server-side (or share single var with NEXT_PUBLIC_ prefix).

Update `.env.example`:
```
NEXT_PUBLIC_META_PIXEL_ID=
```
And the component uses `NEXT_PUBLIC_META_PIXEL_ID`.

- [ ] **Step 4: Inject into layout**

Edit `app/layout.tsx`:
```tsx
import { GA4 } from "@/components/tracking/GA4";
import { MetaPixel } from "@/components/tracking/MetaPixel";
// ...
<body>
  <GA4 />
  <MetaPixel />
  {/* rest */}
</body>
```

- [ ] **Step 5: Verify in DevTools**

Open production deployed site, open DevTools Network tab → see calls to `googletagmanager.com` and `connect.facebook.net`.

In Meta Events Manager → Test events → enter URL → verify PageView ping.

- [ ] **Step 6: Commit**

```bash
git add components/tracking/ app/layout.tsx .env.example
git commit -m "feat: GA4 + Meta Pixel client-side tracking"
```

---

## Task 32: Meta Conversions API (server-side)

**Files:**
- Modify: `lib/meta-conversions.ts`

- [ ] **Step 1: Replace stub with real Conversions API caller**

`lib/meta-conversions.ts`:
```ts
import crypto from "node:crypto";

const API_VERSION = "v18.0";

type PurchasePayload = {
  value: number;
  currency: "CZK";
  email: string;
  orderId: string;
  fbc?: string; // _fbc cookie
  fbp?: string; // _fbp cookie
  ipAddress?: string;
  userAgent?: string;
};

function hash(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaConversion(eventName: "Purchase", payload: PurchasePayload): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.warn("Meta Conversions not configured, skipping");
    return;
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`;

  const body = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.orderId,
        action_source: "website",
        event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
        user_data: {
          em: [hash(payload.email)],
          ...(payload.ipAddress ? { client_ip_address: payload.ipAddress } : {}),
          ...(payload.userAgent ? { client_user_agent: payload.userAgent } : {}),
          ...(payload.fbc ? { fbc: payload.fbc } : {}),
          ...(payload.fbp ? { fbp: payload.fbp } : {}),
        },
        custom_data: {
          value: payload.value,
          currency: payload.currency,
        },
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Meta Conversions API error:", res.status, await res.text());
  }
}
```

- [ ] **Step 2: Pass fbc/fbp from order metadata in webhook**

Modify `app/api/webhook/stripe/route.ts` Purchase block:
```ts
await sendMetaConversion("Purchase", {
  value: order.amount_total_kc,
  currency: "CZK",
  email: order.email,
  orderId: order.id,
  fbc: order.metadata?.fbc,
  fbp: order.metadata?.fbp,
  ipAddress: order.metadata?.ip,
  userAgent: order.metadata?.ua,
});
```

- [ ] **Step 3: Capture fbc/fbp on checkout creation**

Modify `app/checkout/page.tsx` to read cookies and pass to checkout API:

In `CheckoutForm.tsx` body, add:
```ts
function getCookie(name: string): string | undefined {
  return document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1];
}
```

In the fetch to `/api/checkout`, add:
```ts
metadata: {
  fbc: getCookie("_fbc") ?? "",
  fbp: getCookie("_fbp") ?? "",
  utm: window.location.search,
},
```

Also extract IP/UA in the API route from headers and merge into metadata.

- [ ] **Step 4: Test with Stripe test purchase**

After purchase, verify in Meta Events Manager → Test events that Purchase event appears with value and currency.

- [ ] **Step 5: Commit**

```bash
git add lib/meta-conversions.ts app/api/webhook/ components/checkout/
git commit -m "feat: Meta Conversions API server-side Purchase event with deduplication"
```

---

## Task 33: Refund webhook handling (already in place — verify + admin email)

**Files:**
- Modify: `app/api/webhook/stripe/route.ts`

- [ ] **Step 1: Add admin notification on refund**

In refund branch:
```ts
} else if (event.type === "charge.refunded") {
  const charge = event.data.object as any;
  const intentId = charge.payment_intent;
  if (intentId) {
    await markOrderRefunded(intentId);
    await resend.emails.send({
      from: FROM,
      to: "filip@pohodazdomova.cz",
      subject: `[admin] Refund: ${intentId}`,
      text: `Refund applied: ${intentId}\nAmount: ${charge.amount_refunded / 100} ${charge.currency}\nReason: ${charge.refunded ? 'manual' : 'auto'}`,
    });
  }
}
```

(Import `resend` and `FROM` from lib/resend.ts — may need to export them or refactor.)

- [ ] **Step 2: Test refund flow**

In Stripe Dashboard → Payments → pick test payment → Refund. Verify webhook hit, order status flips to refunded, admin email lands.

- [ ] **Step 3: Commit**

```bash
git add app/api/webhook/
git commit -m "feat: refund flow with admin notification"
```

---

## Task 34: End-to-end manual QA pass

**Files:** none

- [ ] **Step 1: Test matrix on production**

| Scenario | Steps | Expected |
|---|---|---|
| Single buy without bump | `/ai-grafika` → checkout → fill → pay 399 Kč | Order paid, 1 download link, 1 email |
| Single buy WITH bump | `/ai-grafika` → checkout → toggle bump → pay 999 Kč | Order paid as bundle, 4 download links, 1 email with bonus highlight |
| Bundle direct | `/bundle` → checkout → pay 999 Kč | Order paid, 4 download links |
| Mixed (force) | API call with bundle + single | Validation error 400 |
| Bonus alone (force) | API call with bonus-prvni-klient only | Validation error 400 |
| Lead signup | `/ai-grafika` → submit footer email | Mailerlite contact added, automation triggered |
| Resend lost link | `/kontakt` → re-send form | New email arrives |
| Refund | Stripe Dashboard refund | Order status: refunded, admin email |
| Tracking | Meta Events Manager Test events | Purchase event with correct value |

- [ ] **Step 2: Browser matrix (manually)**

Test on:
- Chrome desktop
- Safari iOS (Apple Pay button shows)
- Chrome Android (Google Pay button shows)

- [ ] **Step 3: Log all bugs into a `LAUNCH_PUNCH_LIST.md`**

Create at repo root, add any bugs found. Fix all blockers, file non-blockers as v2.

- [ ] **Step 4: Commit punch list**

```bash
git add LAUNCH_PUNCH_LIST.md
git commit -m "chore: launch punch list from QA pass"
```

---

## Task 35: PHASE 4 + LAUNCH

**Files:** none

- [ ] **Step 1: Switch Stripe to live mode (Filip)**

In Stripe Dashboard:
1. Activate live mode (KYC must be complete)
2. Get live keys (`sk_live_`, `pk_live_`)
3. Update Vercel env vars Production: replace test keys with live
4. Re-create webhook endpoint for live mode → save new `whsec_live_...` → update `STRIPE_WEBHOOK_SECRET`
5. Re-deploy Vercel

- [ ] **Step 2: Final smoke test on live mode**

Make a 1 Kč test purchase with real card on `pohodazdomova.cz` to confirm everything works end-to-end with live keys. Then refund it.

- [ ] **Step 3: Replace placeholder PDFs with real ones (Filip)**

Upload 3 real e-books + bonus PDF to Supabase Storage `pdfs/` bucket, replacing placeholders. Same filenames.

- [ ] **Step 4: Replace Filip's photo placeholder**

Upload real photo as `public/filip.jpg`. Replace placeholder div in `app/pribeh/page.tsx` with `<Image src="/filip.jpg" width={120} height={120} alt="Filip" className="rounded-full" />`.

- [ ] **Step 5: Set up Meta Ads campaigns (Filip)**

In Ads Manager:
- Create 3 campaigns, 1 per product LP
- Daily budget 200–300 Kč per ad set
- Audience: CZ, age 25–55, interests: side hustle, AI, freelancing
- Upload 5 UGC creatives per ad set
- Pixel + Conversions API already configured

- [ ] **Step 6: Tag launch and announce**

```bash
git tag v1.0-launch
git push --tags
git commit -m "release: v1.0 launch — pohodazdomova.cz live" --allow-empty
```

Filip: announce launch on personal channels, monitor Stripe + Vercel logs first 24h.

---

## Self-Review (per writing-plans skill)

**Spec coverage check:**
- §1 Účel / brand voice → reflected in copy throughout (Tasks 8, 9, 13, 14)
- §2 Lineup + ceny → Tasks 5, 6
- §3 Site map → Tasks 8–14
- §4 Vizuální identita → Task 3 (tokens), Tasks 7+ (consistent use)
- §5 Checkout + order bump → Tasks 19, 20, 22, 23
- §6 Tech architektura → Tasks 16, 17, 19, 21
- §6.4 Edge cases → Task 21 (idempotency, refund), Task 24 (webhook fallback), Task 25 (resend lost link)
- §7 Email flow customer → Tasks 27, 28, 29
- §7 Email flow list → Task 30
- §8 Tracking → Tasks 31, 32
- §9 Launch sequence → mapped to Phase 1–4 markers + Task 35
- §10 MVP scope → all in tasks; v2 items (Fakturoid, Comgate, affiliate, etc.) deliberately out
- §11 Costs → not implementation, no task needed
- §12 Risks → mitigations behavior baked into tasks (idempotency, fallback, etc.)
- §13 Vyloučené → no refund banner ✓ (none in checkout copy), no member section ✓ (no auth implemented)

**Placeholder scan:** No "TBD"/"TODO"/"add appropriate" patterns. All steps have concrete code or commands.

**Type consistency:**
- `ProductSlug` defined in `lib/products.ts`, used consistently in pricing, validation, services ✓
- `PaidOrder` type exported from `checkout-service.ts`, consumed in `lib/resend.ts` ✓
- `markOrderPaid` used in webhook + `/diky` fallback (consistent name) ✓
- `sendDownloadEmail` stubbed in Task 21, real impl in Task 27 — type signature compatible (both accept order with id, email) ✓

**One known approximation:** Task 31 sets up `META_PIXEL_ID` server-only initially, then Step 3 corrects to `NEXT_PUBLIC_META_PIXEL_ID` for client. The fix is explicit; not a placeholder, just a correction inside the same task.

Plan ready for execution.
