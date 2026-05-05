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
    priceKc: 499,
    isBundle: false,
    isBonusOnly: false,
    pdfStoragePath: "pdfs/ai-ugc-reklamy.pdf",
  },
  "ai-grafika": {
    slug: "ai-grafika",
    title: "AI grafika a vizuály",
    shortTitle: "AI grafika",
    priceKc: 299,
    isBundle: false,
    isBonusOnly: false,
    pdfStoragePath: "pdfs/ai-grafika.pdf",
  },
  "ai-weby": {
    slug: "ai-weby",
    title: "AI weby pro malé firmy",
    shortTitle: "AI weby",
    priceKc: 599,
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
