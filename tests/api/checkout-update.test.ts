import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    paymentIntents: {
      retrieve: vi.fn(async () => ({
        id: "pi_test_1",
        status: "requires_payment_method",
      })),
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

import { updateCheckout } from "@/lib/checkout-service";
import { stripe } from "@/lib/stripe";

describe("updateCheckout", () => {
  it("updates PaymentIntent and order with new product set", async () => {
    const result = await updateCheckout({
      paymentIntentId: "pi_test_1",
      products: ["bundle"],
    });
    expect(result.totalKc).toBe(999);
  });

  it("rejects update if PaymentIntent already succeeded", async () => {
    vi.mocked(stripe.paymentIntents.retrieve).mockResolvedValueOnce({
      id: "pi_test_1",
      status: "succeeded",
    } as never);

    await expect(
      updateCheckout({
        paymentIntentId: "pi_test_1",
        products: ["bundle"],
      }),
    ).rejects.toThrow(/cannot update/i);
  });
});
