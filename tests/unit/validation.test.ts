import { describe, it, expect } from "vitest";
import { CheckoutInputSchema, CheckoutUpdateSchema, LeadInputSchema } from "@/lib/validation";

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

describe("CheckoutUpdateSchema", () => {
  it("requires pi_ prefix on paymentIntentId", () => {
    const ok = CheckoutUpdateSchema.safeParse({
      paymentIntentId: "pi_abc",
      products: ["bundle"],
    });
    expect(ok.success).toBe(true);

    const bad = CheckoutUpdateSchema.safeParse({
      paymentIntentId: "abc",
      products: ["bundle"],
    });
    expect(bad.success).toBe(false);
  });
});

describe("LeadInputSchema", () => {
  it("accepts valid email + optional source", () => {
    const result = LeadInputSchema.safeParse({
      email: "lead@example.com",
      source: "homepage-magnet",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = LeadInputSchema.safeParse({ email: "x" });
    expect(result.success).toBe(false);
  });
});
