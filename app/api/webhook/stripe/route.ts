import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { markOrderPaid, markOrderRefunded } from "@/lib/checkout-service";
import { sendDownloadEmail } from "@/lib/resend";
import { sendMetaConversion } from "@/lib/meta-conversions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const order = await markOrderPaid(intent.id);
      if (order) {
        await sendDownloadEmail(order);
        await sendMetaConversion("Purchase", {
          value: order.amount_total_kc,
          currency: "CZK",
          email: order.email,
          orderId: order.id,
        });
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const intentId =
        typeof charge.payment_intent === "string"
          ? charge.payment_intent
          : charge.payment_intent?.id;
      if (intentId) await markOrderRefunded(intentId);
    } else if (event.type === "payment_intent.payment_failed") {
      console.warn("payment_failed:", event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "handler error" }, { status: 500 });
  }
}
