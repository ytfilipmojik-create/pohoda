import { getProduct, BUNDLE_SLUG, BONUS_SLUG, type ProductSlug } from "./products";

export type Cart = {
  products: ProductSlug[];
  totalKc: number;
};

export function calculateCart(slugs: ProductSlug[]): Cart {
  if (slugs.length === 0) {
    throw new Error("Cart is empty");
  }

  const hasBundle = slugs.includes(BUNDLE_SLUG);
  const hasSingle = slugs.some((s) => {
    const p = getProduct(s);
    return p && !p.isBundle && !p.isBonusOnly;
  });

  if (hasBundle && hasSingle) {
    throw new Error("Cannot mix bundle with single products");
  }

  if (slugs.includes(BONUS_SLUG) && !hasBundle) {
    throw new Error("Bonus is only available with bundle");
  }

  const totalKc = slugs.reduce((sum, slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    return sum + (product.priceKc ?? 0);
  }, 0);

  return { products: slugs, totalKc };
}

export function expandToFulfillment(slugs: ProductSlug[]): ProductSlug[] {
  const result = new Set<ProductSlug>();
  for (const slug of slugs) {
    const product = getProduct(slug);
    if (!product) continue;
    if (product.isBundle && product.includes) {
      product.includes.forEach((s) => result.add(s));
    } else {
      result.add(slug);
    }
  }
  return Array.from(result);
}
