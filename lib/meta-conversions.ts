import crypto from "node:crypto";

const API_VERSION = "v18.0";

export type PurchasePayload = {
  value: number;
  currency: "CZK";
  email: string;
  orderId: string;
  fbc?: string;
  fbp?: string;
  ipAddress?: string;
  userAgent?: string;
};

function hash(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaConversion(
  eventName: "Purchase",
  payload: PurchasePayload,
): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.warn("Meta Conversions not configured, skipping");
    return;
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${token}`;

  const body = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.orderId,
        action_source: "website",
        event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
        user_data: {
          em: [hash(payload.email)],
          ...(payload.ipAddress ? { client_ip_address: payload.ipAddress } : {}),
          ...(payload.userAgent ? { client_user_agent: payload.userAgent } : {}),
          ...(payload.fbc ? { fbc: payload.fbc } : {}),
          ...(payload.fbp ? { fbp: payload.fbp } : {}),
        },
        custom_data: {
          value: payload.value,
          currency: payload.currency,
        },
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Meta Conversions API error:", res.status, await res.text());
  }
}
