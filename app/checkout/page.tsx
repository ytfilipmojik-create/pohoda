import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getProduct, type ProductSlug } from "@/lib/products";

const VALID_SLUGS = new Set<ProductSlug>([
  "ai-ugc-reklamy",
  "ai-grafika",
  "ai-weby",
  "bundle",
]);

type SearchParams = { product?: string };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const slug = params.product;
  if (!slug || !VALID_SLUGS.has(slug as ProductSlug)) {
    redirect("/bundle");
  }
  const product = getProduct(slug as ProductSlug);
  if (!product || product.isBonusOnly) {
    redirect("/bundle");
  }

  return <CheckoutForm initialProduct={slug as ProductSlug} />;
}
