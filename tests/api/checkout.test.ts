import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    paymentIntents: {
      create: vi.fn(async () => ({
        id: "pi_test_123",
        client_secret: "pi_test_123_secret",
      })),
    },
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(async () => ({ data: { id: "order_123" }, error: null })),
        })),
      })),
    })),
  },
}));

import { createCheckout } from "@/lib/checkout-service";

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
    expect(result.orderId).toBe("order_123");
  });

  it("rejects mixed bundle + single", async () => {
    await expect(
      createCheckout({
        products: ["bundle", "ai-grafika"],
        email: "test@example.com",
        consentImmediateFulfillment: true,
        consentTerms: true,
      }),
    ).rejects.toThrow();
  });
});
