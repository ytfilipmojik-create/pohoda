import { PricingCard } from "./PricingCard";

type Props = {
  productSlug: string;
  title: string;
  subtitle: string;
  bullets: string[];
  outcomes: string[];
  priceKc: number;
};

export function ProductHero({
  productSlug,
  title,
  subtitle,
  bullets,
  outcomes,
  priceKc,
}: Props) {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 grid gap-10 md:grid-cols-2 items-start">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold font-bold mb-3">E-book</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">{title}</h1>
          <p className="mt-5 text-lg text-ink/75 leading-relaxed">{subtitle}</p>
          <ul className="mt-8 space-y-3 text-ink/80">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="text-gold font-bold">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <PricingCard
            title="Tento e-book"
            priceKc={priceKc}
            bullets={[
              "PDF, ~30 stran",
              "Doručení e-mailem do několika minut",
              "Stažení 7 dní",
            ]}
            ctaHref={`/checkout?product=${productSlug}`}
            ctaLabel={`Koupit za ${priceKc} Kč`}
          />
          <PricingCard
            title="Balíček všech 3 + bonus"
            priceKc={999}
            bullets={[
              "Všechny 3 e-booky",
              "Bonus „Jak sehnat prvního klienta“",
              "Úspora 198 Kč",
            ]}
            ctaHref="/checkout?product=bundle"
            ctaLabel="Vzít balíček"
            highlighted
            badge="Doporučujeme"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Co se naučíš</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {outcomes.map((o) => (
            <li
              key={o}
              className="bg-white rounded-card p-4 shadow-card text-ink/85 text-sm leading-relaxed"
            >
              {o}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
