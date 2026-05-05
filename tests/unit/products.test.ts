import { describe, it, expect } from "vitest";
import { getProduct, getAllProducts, BUNDLE_SLUG, BONUS_SLUG } from "@/lib/products";

describe("products catalog", () => {
  it("has 3 paid e-books with individual prices", () => {
    const paid = getAllProducts().filter((p) => !p.isBundle && !p.isBonusOnly);
    expect(paid).toHaveLength(3);
    const bySlug = Object.fromEntries(paid.map((p) => [p.slug, p.priceKc]));
    expect(bySlug["ai-ugc-reklamy"]).toBe(499);
    expect(bySlug["ai-grafika"]).toBe(299);
    expect(bySlug["ai-weby"]).toBe(599);
  });

  it("bundle is 999 Kč and includes 3 e-books + bonus", () => {
    const bundle = getProduct(BUNDLE_SLUG);
    expect(bundle?.priceKc).toBe(999);
    expect(bundle?.includes).toEqual(
      expect.arrayContaining(["ai-ugc-reklamy", "ai-grafika", "ai-weby", BONUS_SLUG]),
    );
  });

  it("bonus is bonus-only and has no individual price", () => {
    const bonus = getProduct(BONUS_SLUG);
    expect(bonus?.isBonusOnly).toBe(true);
    expect(bonus?.priceKc).toBeNull();
  });
});
