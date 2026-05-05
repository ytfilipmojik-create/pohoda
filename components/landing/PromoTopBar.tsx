import Link from "next/link";

const ITEMS = [
  "Akční cena balíčku 999 Kč místo 1 397 Kč",
  'BONUS „Jak sehnat prvního klienta" zdarma uvnitř balíčku',
  "Doručení e-mailem do několika minut",
  "Platba kartou · zabezpečeno přes Stripe",
];

export function PromoTopBar() {
  const looped = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="bg-navy text-white text-[12px] py-2 overflow-hidden border-b border-gold/30">
      <div className="flex w-max promo-scroll gap-12 px-6">
        {looped.map((t, i) => (
          <Link
            key={i}
            href="/checkout?product=bundle"
            className="flex items-center gap-3 whitespace-nowrap hover:text-gold transition"
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span className="font-medium">
              {t.includes("999") ? (
                <>
                  <strong className="text-gold glow-gold">Akční cena balíčku 999 Kč</strong>
                  <span className="text-white/60"> místo 1 197 Kč</span>
                </>
              ) : (
                t
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
