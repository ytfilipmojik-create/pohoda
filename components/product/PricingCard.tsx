import Link from "next/link";

type Props = {
  title: string;
  priceKc: number;
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
};

export function PricingCard({
  title,
  priceKc,
  bullets,
  ctaHref,
  ctaLabel,
  highlighted = false,
  badge,
}: Props) {
  return (
    <div
      className={`rounded-card p-6 shadow-card ${
        highlighted ? "bg-navy text-white border-2 border-gold" : "bg-white"
      }`}
    >
      {badge && (
        <div
          className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 ${
            highlighted ? "bg-gold text-navy" : "bg-cream text-ink/70"
          }`}
        >
          {badge}
        </div>
      )}
      <h3 className={`text-xl font-bold ${highlighted ? "text-white" : "text-navy"}`}>{title}</h3>
      <div
        className={`mt-2 text-3xl font-extrabold ${highlighted ? "text-gold" : "text-navy"}`}
      >
        {priceKc} Kč
      </div>
      <ul
        className={`mt-6 space-y-2 text-sm ${highlighted ? "text-white/80" : "text-ink/70"}`}
      >
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className={highlighted ? "text-gold" : "text-navy"}>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-6 block text-center rounded-md py-3 font-semibold ${
          highlighted ? "bg-gold text-navy hover:bg-gold/90" : "bg-navy text-white hover:bg-navy/90"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
