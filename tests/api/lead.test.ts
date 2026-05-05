import { describe, it, expect, vi, beforeEach } from "vitest";

const fetchMock: ReturnType<typeof vi.fn> = vi.fn(
  async () => new Response(JSON.stringify({ ok: true }), { status: 201 }),
);
vi.stubGlobal("fetch", fetchMock);

import { addLead } from "@/lib/mailerlite";

beforeEach(() => {
  fetchMock.mockClear();
  process.env.MAILERLITE_API_KEY = "test_key";
  process.env.MAILERLITE_GROUP_ID_LEAD_MAGNET = "group_123";
});

describe("addLead", () => {
  it("posts subscriber to Mailerlite with group + source", async () => {
    await addLead("lead@example.com", "homepage");
    expect(fetchMock).toHaveBeenCalledOnce();
    const call = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(call[0]).toContain("/subscribers");
    const body = JSON.parse(call[1].body as string);
    expect(body.email).toBe("lead@example.com");
    expect(body.groups).toEqual(["group_123"]);
    expect(body.fields.source).toBe("homepage");
  });

  it("throws if env vars missing", async () => {
    delete process.env.MAILERLITE_API_KEY;
    await expect(addLead("x@y.cz")).rejects.toThrow(/Mailerlite/);
  });

  it("throws if Mailerlite returns non-2xx", async () => {
    process.env.MAILERLITE_API_KEY = "test_key";
    fetchMock.mockResolvedValueOnce(new Response("bad", { status: 422 }));
    await expect(addLead("x@y.cz")).rejects.toThrow(/422/);
  });
});
