"use client";

import { useEffect, useState, type FormEvent } from "react";
import { loadStripe, type Stripe as StripeJS } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { OrderSummary } from "./OrderSummary";
import { OrderBumpBar } from "./OrderBumpBar";
import { calculateCart } from "@/lib/pricing";
import { BUNDLE_SLUG, type ProductSlug } from "@/lib/products";

const stripePromise: Promise<StripeJS | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Props = { initialProduct: ProductSlug };

export function CheckoutForm({ initialProduct }: Props) {
  const [products, setProducts] = useState<ProductSlug[]>([initialProduct]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentImmediate, setConsentImmediate] = useState(false);
  const [bumping, setBumping] = useState(false);

  const showBump = initialProduct !== BUNDLE_SLUG;
  const isBundle = products.includes(BUNDLE_SLUG);
  const canPay = email && consentTerms && consentImmediate;

  const totalKc = (() => {
    try {
      return calculateCart(products).totalKc;
    } catch {
      return 0;
    }
  })();

  useEffect(() => {
    if (!canPay || clientSecret) return;
    const metadata: Record<string, string> = {};
    const fbc = readCookie("_fbc");
    const fbp = readCookie("_fbp");
    if (fbc) metadata.fbc = fbc;
    if (fbp) metadata.fbp = fbp;
    if (typeof window !== "undefined" && window.location.search) {
      metadata.utm = window.location.search;
    }

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products,
        email,
        name: name || undefined,
        consentImmediateFulfillment: consentImmediate,
        consentTerms,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        }
      });
  }, [canPay, clientSecret, email, name, products, consentImmediate, consentTerms]);

  async function handleBumpToggle(next: boolean) {
    const nextProducts: ProductSlug[] = next ? [BUNDLE_SLUG] : [initialProduct];
    setProducts(nextProducts);

    if (paymentIntentId) {
      setBumping(true);
      await fetch("/api/checkout/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId, products: nextProducts }),
      });
      setBumping(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {showBump && (
            <OrderBumpBar
              isBundle={isBundle}
              onToggle={handleBumpToggle}
              loading={bumping}
            />
          )}

          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Kontaktní údaje</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 rounded-md px-3 py-2.5 mb-3"
            />
            <input
              type="text"
              placeholder="Jméno (volitelné)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink/15 rounded-md px-3 py-2.5"
            />
          </div>

          <div className="bg-white rounded-card shadow-card p-6 space-y-3 text-sm">
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                className="mt-1"
              />
              <span>
                Souhlasím s{" "}
                <a href="/obchodni-podminky" target="_blank" className="underline">
                  obchodními podmínkami
                </a>{" "}
                a{" "}
                <a href="/gdpr" target="_blank" className="underline">
                  zpracováním osobních údajů
                </a>
                .
              </span>
            </label>
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                checked={consentImmediate}
                onChange={(e) => setConsentImmediate(e.target.checked)}
                className="mt-1"
              />
              <span>
                Souhlasím s okamžitým zahájením plnění a výslovně se vzdávám práva na
                odstoupení od smlouvy ve 14denní lhůtě.
              </span>
            </label>
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Platba</h2>
            {clientSecret ? (
              <Elements
                key={clientSecret}
                options={{ clientSecret, appearance: { theme: "stripe" } }}
                stripe={stripePromise}
              >
                <InnerPay paymentIntentId={paymentIntentId!} totalKc={totalKc} />
              </Elements>
            ) : (
              <p className="text-sm text-ink/60">
                Vyplň e-mail a zaškrtni souhlasy níže, ať můžeš pokračovat k platbě.
              </p>
            )}
          </div>
        </div>

        <OrderSummary products={products} />
      </div>
    </div>
  );
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}

function InnerPay({ paymentIntentId, totalKc }: { paymentIntentId: string; totalKc: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/diky?pi=${paymentIntentId}`,
      },
    });
    if (result.error) {
      setError(result.error.message ?? "Platba selhala");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="mt-4 w-full bg-navy text-white py-3 rounded-md font-semibold hover:bg-navy/90 disabled:opacity-50"
      >
        {loading ? "Zpracovávám…" : `Zaplatit ${totalKc} Kč`}
      </button>
    </form>
  );
}
