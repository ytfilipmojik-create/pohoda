import { Resend } from "resend";
import { render } from "@react-email/render";
import { DownloadEmail } from "@/emails/DownloadEmail";
import { StartedReadingEmail } from "@/emails/StartedReadingEmail";
import { UpsellEmail } from "@/emails/UpsellEmail";
import { ReviewRequestEmail } from "@/emails/ReviewRequestEmail";
import { supabaseAdmin } from "./supabase";
import { expandToFulfillment } from "./pricing";
import { getProduct, type ProductSlug, BONUS_SLUG } from "./products";
import { getDownloadUrl } from "./signed-url";
import type { PaidOrder } from "./checkout-service";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  _resend = new Resend(key);
  return _resend;
}

const FROM = () => process.env.RESEND_FROM_EMAIL ?? "Filip <filip@pohodazdomova.cz>";
const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://pohodazdomova.cz";

async function alreadySent(orderId: string, type: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("email_log")
    .select("id")
    .eq("order_id", orderId)
    .eq("email_type", type)
    .maybeSingle();
  return !!data;
}

async function logSent(orderId: string, type: string, messageId: string | null) {
  await supabaseAdmin.from("email_log").insert({
    order_id: orderId,
    email_type: type,
    resend_message_id: messageId,
  });
}

export async function sendDownloadEmail(order: PaidOrder): Promise<void> {
  if (await alreadySent(order.id, "download")) return;

  const fulfillSlugs = expandToFulfillment(order.product_slugs as ProductSlug[]);
  const downloads = await Promise.all(
    fulfillSlugs.map(async (slug) => {
      const product = getProduct(slug);
      const url = product?.pdfStoragePath
        ? await getDownloadUrl(product.pdfStoragePath)
        : "#";
      return { title: product?.title ?? slug, url, isBonus: slug === BONUS_SLUG };
    }),
  );

  const html = await render(
    DownloadEmail({
      email: order.email,
      name: order.name,
      downloads,
      hasBonus: order.has_bonus,
    }),
  );

  const result = await getResend().emails.send({
    from: FROM(),
    to: order.email,
    subject: "Tvoje e-booky jsou připravené ke stažení",
    html,
  });

  await logSent(order.id, "download", result.data?.id ?? null);
}

export async function sendStartedReadingEmail(order: {
  id: string;
  email: string;
  name: string | null;
}): Promise<void> {
  if (await alreadySent(order.id, "started_reading")) return;

  const html = await render(StartedReadingEmail({ name: order.name }));
  const result = await getResend().emails.send({
    from: FROM(),
    to: order.email,
    subject: "Jen jsem chtěl zkontrolovat — máš e-book?",
    html,
  });

  await logSent(order.id, "started_reading", result.data?.id ?? null);
}

export async function sendUpsellEmail(order: {
  id: string;
  email: string;
  name: string | null;
  product_slugs: string[];
}): Promise<void> {
  if (await alreadySent(order.id, "upsell")) return;

  const single = order.product_slugs.find(
    (s) => s !== "bundle" && s !== BONUS_SLUG,
  ) as ProductSlug | undefined;
  if (!single) return;

  const productTitle = getProduct(single)?.title ?? "tvůj e-book";
  const upgradeUrl = `${SITE_URL()}/checkout?product=bundle&upgrade=${order.id}`;

  const html = await render(
    UpsellEmail({
      name: order.name,
      productTitle,
      upgradeUrl,
      expiresInHours: 48,
    }),
  );
  const result = await getResend().emails.send({
    from: FROM(),
    to: order.email,
    subject: "Speciální nabídka jen pro tebe (zbylé 2 e-booky se slevou)",
    html,
  });

  await logSent(order.id, "upsell", result.data?.id ?? null);
}

export async function sendReviewRequestEmail(order: {
  id: string;
  email: string;
  name: string | null;
}): Promise<void> {
  if (await alreadySent(order.id, "review_request")) return;

  const html = await render(ReviewRequestEmail({ name: order.name }));
  const result = await getResend().emails.send({
    from: FROM(),
    to: order.email,
    subject: "Jak ti to jde? Pomohl by mi tvůj feedback",
    html,
  });

  await logSent(order.id, "review_request", result.data?.id ?? null);
}
