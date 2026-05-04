import { stripe } from "./stripe";
import { supabaseAdmin } from "./supabase";
import { calculateCart } from "./pricing";
import { BUNDLE_SLUG } from "./products";
import type { CheckoutInput, CheckoutUpdate } from "./validation";

export type CreateCheckoutResult = {
  paymentIntentId: string;
  clientSecret: string;
  orderId: string;
};

export async function createCheckout(input: CheckoutInput): Promise<CreateCheckoutResult> {
  const cart = calculateCart(input.products);
  const amountInHaler = cart.totalKc * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInHaler,
    currency: "czk",
    automatic_payment_methods: { enabled: true },
    receipt_email: input.email,
    metadata: {
      product_slugs: input.products.join(","),
      email: input.email,
    },
  });

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      email: input.email,
      name: input.name ?? null,
      stripe_payment_intent_id: paymentIntent.id,
      amount_total_kc: cart.totalKc,
      product_slugs: cart.products,
      has_bonus: cart.products.includes(BUNDLE_SLUG),
      status: "pending",
      consent_immediate_fulfillment: input.consentImmediateFulfillment,
      metadata: input.metadata ?? {},
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create draft order: ${error.message}`);

  return {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret!,
    orderId: data.id,
  };
}

export type UpdateCheckoutResult = {
  paymentIntentId: string;
  totalKc: number;
};

export async function updateCheckout(input: CheckoutUpdate): Promise<UpdateCheckoutResult> {
  const intent = await stripe.paymentIntents.retrieve(input.paymentIntentId);
  if (
    intent.status !== "requires_payment_method" &&
    intent.status !== "requires_confirmation"
  ) {
    throw new Error(`Cannot update PaymentIntent in status: ${intent.status}`);
  }

  const cart = calculateCart(input.products);
  const amountInHaler = cart.totalKc * 100;

  await stripe.paymentIntents.update(input.paymentIntentId, {
    amount: amountInHaler,
    metadata: {
      product_slugs: input.products.join(","),
    },
  });

  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      amount_total_kc: cart.totalKc,
      product_slugs: cart.products,
      has_bonus: cart.products.includes(BUNDLE_SLUG),
    })
    .eq("stripe_payment_intent_id", input.paymentIntentId);

  if (error) throw new Error(`Failed to update order: ${error.message}`);

  return {
    paymentIntentId: input.paymentIntentId,
    totalKc: cart.totalKc,
  };
}

export type PaidOrder = {
  id: string;
  email: string;
  name: string | null;
  product_slugs: string[];
  has_bonus: boolean;
  amount_total_kc: number;
};

export async function markOrderPaid(paymentIntentId: string): Promise<PaidOrder | null> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("status", "pending")
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`markOrderPaid failed: ${error.message}`);
  }
  return data as PaidOrder;
}

export async function markOrderRefunded(paymentIntentId: string): Promise<void> {
  const { data: order, error: lookupErr } = await supabaseAdmin
    .from("orders")
    .select("id")
    .eq("stripe_payment_intent_id", paymentIntentId)
    .single();

  if (lookupErr) throw new Error(`markOrderRefunded lookup failed: ${lookupErr.message}`);

  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_payment_intent_id", paymentIntentId);
  if (error) throw new Error(`markOrderRefunded update failed: ${error.message}`);

  await supabaseAdmin.from("refunds").insert({
    order_id: order.id,
    reason: "stripe_refund_webhook",
  });
}
