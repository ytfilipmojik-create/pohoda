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
      expect.arrayContaining(["ai-ugc-reklamy", "ai-grafika", "ai-weby", "bonus-prvni-klient"]),
    );
    expect(expandToFulfillment(["bundle"])).toHaveLength(4);
  });
});
