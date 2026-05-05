import { NextResponse } from "next/server";
import { LeadInputSchema } from "@/lib/validation";
import { addLead } from "@/lib/mailerlite";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LeadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await addLead(parsed.data.email, parsed.data.source);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("addLead error:", e);
    return NextResponse.json({ ok: true });
  }
}
