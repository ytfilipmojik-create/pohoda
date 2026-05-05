import { describe, it, expect } from "vitest";
import { calculateCart, expandToFulfillment } from "@/lib/pricing";

describe("calculateCart", () => {
  it("single product (ai-grafika) = 299 Kč", () => {
    expect(calculateCart(["ai-grafika"]).totalKc).toBe(299);
  });

  it("two singles ai-grafika + ai-weby = 898 Kč (no auto-bundle)", () => {
    expect(calculateCart(["ai-grafika", "ai-weby"]).totalKc).toBe(898);
  });

  it("all 3 singles = 1 397 Kč", () => {
    expect(
      calculateCart(["ai-ugc-reklamy", "ai-grafika", "ai-weby"]).totalKc,
    ).toBe(1397);
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
      expect.arrayContaining(["ai-ugc-reklamy", "ai-grafika", "ai-weby", "bonus-prvni-klient"]),
    );
    expect(expandToFulfillment(["bundle"])).toHaveLength(4);
  });
});
