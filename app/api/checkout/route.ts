import { NextResponse } from "next/server";
import { CheckoutInputSchema } from "@/lib/validation";
import { createCheckout } from "@/lib/checkout-service";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CheckoutInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await createCheckout(parsed.data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("createCheckout error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
