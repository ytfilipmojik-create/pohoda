import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendDownloadEmail } from "@/lib/resend";

const Schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("email_log")
    .select("*", { count: "exact", head: true })
    .eq("email_type", "download")
    .gte("sent_at", since);

  if ((count ?? 0) > 50) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("email", parsed.data.email)
    .eq("status", "paid")
    .order("paid_at", { ascending: false })
    .limit(1);

  if (!orders || orders.length === 0) {
    return NextResponse.json({ ok: true });
  }

  await sendDownloadEmail(orders[0]);
  return NextResponse.json({ ok: true });
}
