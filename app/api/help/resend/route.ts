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

  await sendDownloadEmail(orders[0], { allowDuplicate: true });
  return NextResponse.json({ ok: true });
}
