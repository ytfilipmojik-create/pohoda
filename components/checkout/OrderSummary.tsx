"use client";
import { getProduct, type ProductSlug } from "@/lib/products";
import { calculateCart } from "@/lib/pricing";

export function OrderSummary({ products }: { products: ProductSlug[] }) {
  let totalKc = 0;
  try {
    totalKc = calculateCart(products).totalKc;
  } catch {
    totalKc = 0;
  }
  return (
    <div className="bg-cream rounded-card p-6">
      <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-4">
        Souhrn objednávky
      </div>
      {products.map((slug) => {
        const p = getProduct(slug);
        return (
          <div
            key={slug}
            className="flex justify-between py-3 border-b border-ink/10 text-sm"
          >
            <div>
              <div className="font-medium text-ink">{p?.title}</div>
              <div className="text-xs text-ink/60">
                {p?.isBundle ? "3 e-booky + bonus" : "Elektronická kniha (PDF)"}
              </div>
            </div>
            <div className="font-medium">{p?.priceKc ?? "—"} Kč</div>
          </div>
        );
      })}
      <div className="flex justify-between pt-4 font-bold text-lg text-navy">
        <span>Celkem</span>
        <span>{totalKc} Kč</span>
      </div>
      <div className="mt-4 text-xs text-ink/60 leading-relaxed">
        Doručení e-mailem do několika minut.
      </div>
    </div>
  );
}
