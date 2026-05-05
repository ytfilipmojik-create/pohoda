import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  sendStartedReadingEmail,
  sendUpsellEmail,
  sendReviewRequestEmail,
} from "@/lib/resend";

export const runtime = "nodejs";

type OrderRow = {
  id: string;
  email: string;
  name: string | null;
  product_slugs: string[];
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const fetchPaidBetween = async (daysAgoLow: number, daysAgoHigh: number) => {
    const { data } = await supabaseAdmin
      .from("orders")
      .select("id, email, name, product_slugs")
      .eq("status", "paid")
      .gte("paid_at", new Date(now - daysAgoHigh * day).toISOString())
      .lt("paid_at", new Date(now - daysAgoLow * day).toISOString());
    return (data ?? []) as OrderRow[];
  };

  const orders1 = await fetchPaidBetween(1, 2);
  for (const o of orders1) {
    try {
      await sendStartedReadingEmail(o);
    } catch (e) {
      console.error("started_reading send failed", o.id, e);
    }
  }

  const orders5 = await fetchPaidBetween(5, 6);
  let upsellSent = 0;
  for (const o of orders5) {
    if (o.product_slugs.includes("bundle")) continue;
    try {
      await sendUpsellEmail(o);
      upsellSent++;
    } catch (e) {
      console.error("upsell send failed", o.id, e);
    }
  }

  const orders10 = await fetchPaidBetween(10, 11);
  for (const o of orders10) {
    try {
      await sendReviewRequestEmail(o);
    } catch (e) {
      console.error("review_request send failed", o.id, e);
    }
  }

  return NextResponse.json({
    ok: true,
    counts: {
      started_reading: orders1.length,
      upsell: upsellSent,
      review: orders10.length,
    },
  });
}
