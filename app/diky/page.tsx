import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { expandToFulfillment } from "@/lib/pricing";
import { getProduct, type ProductSlug } from "@/lib/products";
import { getDownloadUrl } from "@/lib/signed-url";
import { markOrderPaid } from "@/lib/checkout-service";

export const dynamic = "force-dynamic";

type SearchParams = { pi?: string };

export default async function DikyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const pi = params.pi;
  if (!pi) {
    return <Fallback message="Chybí identifikátor platby." />;
  }

  let { data: order } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("stripe_payment_intent_id", pi)
    .maybeSingle();

  if (order && order.status !== "paid") {
    const intent = await stripe.paymentIntents.retrieve(pi);
    if (intent.status === "succeeded") {
      const updated = await markOrderPaid(pi);
      if (updated) order = { ...order, ...updated, status: "paid" };
    }
  }

  if (!order || order.status !== "paid") {
    return <Fallback message="Platba se zpracovává. Za chvíli stránku obnov." />;
  }

  const fulfillSlugs = expandToFulfillment(order.product_slugs as ProductSlug[]);
  const downloads = await Promise.all(
    fulfillSlugs.map(async (slug) => {
      const p = getProduct(slug);
      const url = p?.pdfStoragePath ? await getDownloadUrl(p.pdfStoragePath) : null;
      return { slug, title: p?.title ?? slug, url };
    }),
  );

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy">Děkujeme za nákup</h1>
      <p className="mt-4 text-lg text-ink/75">
        E-mail s odkazy ke stažení jsme ti právě poslali. Pro jistotu jsou tady i přímo:
      </p>
      <ul className="mt-8 space-y-3">
        {downloads.map((d) => (
          <li
            key={d.slug}
            className="bg-white rounded-card p-5 shadow-card flex justify-between items-center gap-4"
          >
            <div>
              <div className="font-bold text-navy">{d.title}</div>
              <div className="text-xs text-ink/60">PDF · platí 7 dní</div>
            </div>
            {d.url && (
              <a
                href={d.url}
                download
                className="bg-navy text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-navy/90 shrink-0"
              >
                Stáhnout
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-ink/60">
        Pokud cokoliv nedorazí, napiš na{" "}
        <a href="mailto:filip@pohodazdomova.cz" className="underline">
          filip@pohodazdomova.cz
        </a>
        .
      </p>
    </article>
  );
}

function Fallback({ message }: { message: string }) {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-navy">Hned to bude</h1>
      <p className="mt-3 text-ink/70">{message}</p>
    </article>
  );
}
