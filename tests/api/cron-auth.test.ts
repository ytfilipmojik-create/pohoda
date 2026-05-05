import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          gte: vi.fn(() => ({
            lt: vi.fn(async () => ({ data: [] })),
          })),
        })),
      })),
    })),
  },
}));

vi.mock("@/lib/resend", () => ({
  sendStartedReadingEmail: vi.fn(),
  sendUpsellEmail: vi.fn(),
  sendReviewRequestEmail: vi.fn(),
}));

import { GET } from "@/app/api/cron/followup/route";

beforeEach(() => {
  process.env.CRON_SECRET = "topsecret";
});

describe("/api/cron/followup auth", () => {
  it("rejects requests without Bearer token", async () => {
    const res = await GET(new Request("http://localhost/api/cron/followup"));
    expect(res.status).toBe(401);
  });

  it("rejects requests with wrong token", async () => {
    const res = await GET(
      new Request("http://localhost/api/cron/followup", {
        headers: { authorization: "Bearer wrong" },
      }),
    );
    expect(res.status).toBe(401);
  });

  it("accepts requests with correct token", async () => {
    const res = await GET(
      new Request("http://localhost/api/cron/followup", {
        headers: { authorization: "Bearer topsecret" },
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.counts).toBeDefined();
  });
});
