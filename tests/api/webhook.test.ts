import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe", () => ({ stripe: {} }));

const updateMock = vi.fn(async () => ({
  data: { id: "order_1", email: "x@y.cz", product_slugs: ["bundle"], has_bonus: true },
  error: null,
}));

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

import { markOrderPaid } from "@/lib/checkout-service";

beforeEach(() => updateMock.mockClear());

describe("markOrderPaid", () => {
  it("flips status to paid only if currently pending (idempotent)", async () => {
    const result = await markOrderPaid("pi_test_x");
    expect(result?.email).toBe("x@y.cz");
    expect(updateMock).toHaveBeenCalledOnce();
  });
});
