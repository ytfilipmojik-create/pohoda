import { NextResponse } from "next/server";
import { CheckoutUpdateSchema } from "@/lib/validation";
import { updateCheckout } from "@/lib/checkout-service";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CheckoutUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await updateCheckout(parsed.data);
    return NextResponse.json(result);
  } catch (e) {
    console.error("updateCheckout error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 },
    );
  }
}
