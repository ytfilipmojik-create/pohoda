import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";
import { Stars } from "@/components/svg/Stars";

type Props = {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  outcomes: string[];
  review: { name: string; role: string; text: string };
  faq: { q: string; a: string }[];
};

export function ProductDetail({
  number,
  slug,
  title,
  subtitle,
  outcomes,
  review,
  faq,
}: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-16 lg:py-24">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, #1a1f3a 0, transparent 40%), radial-gradient(circle at 80% 80%, #ffba08 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-navy mb-6"
            >
              <span>←</span> Zpět na hlavní
            </Link>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
              {number} · průvodce
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-navy leading-[1.05] tracking-tight">
              {title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink/75 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/checkout?product=${slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white px-7 py-4 font-semibold hover:bg-navy/90 transition shadow-[0_10px_30px_rgba(26,31,58,0.25)]"
              >
                Koupit za 399 Kč <span className="text-gold">→</span>
              </Link>
              <Link
                href="/checkout?product=bundle"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-7 py-4 font-semibold hover:bg-white transition"
              >
                Vzít balíček 999 Kč
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-[280px] md:w-[340px]">
              <EbookMockup number={number} title={title} rotate={-4} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-3">
            Obsah
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-10 max-w-2xl leading-tight">
            Co se naučíš.
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {outcomes.map((o, i) => (
              <li
                key={o}
                className="bg-cream rounded-xl p-5 flex gap-4 items-start border border-ink/5"
              >
                <div className="w-8 h-8 rounded-lg bg-navy text-gold font-extrabold text-sm flex items-center justify-center shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-ink/85 leading-snug">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6">
          <figure className="bg-white rounded-2xl p-8 md:p-10 border border-ink/5 shadow-sm">
            <Stars />
            <blockquote className="mt-4 text-xl md:text-2xl font-bold text-navy leading-snug">
              „{review.text}"
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-bold text-navy">{review.name}</div>
              <div className="text-ink/60">{review.role}</div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-cream rounded-2xl p-7 border border-ink/8">
            <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
              Tento e-book
            </div>
            <div className="text-4xl font-extrabold text-navy mb-2">399 Kč</div>
            <ul className="space-y-2 text-sm text-ink/70 mt-4 mb-6">
              <li className="flex gap-2">
                <span className="text-gold">✓</span> PDF, ~30 stran
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> Doručení e-mailem do několika minut
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> Stažení 7 dní
              </li>
            </ul>
            <Link
              href={`/checkout?product=${slug}`}
              className="block text-center rounded-xl bg-white border border-navy text-navy py-3.5 font-semibold hover:bg-navy hover:text-white transition"
            >
              Koupit za 399 Kč
            </Link>
          </div>

          <div className="relative bg-navy text-white rounded-2xl p-7 shadow-[0_20px_50px_rgba(26,31,58,0.25)]">
            <div className="absolute -top-3 left-7 bg-gold text-navy text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
              Doporučujeme
            </div>
            <div className="text-xs uppercase tracking-wider text-white/60 font-bold mb-2">
              Balíček 3 + bonus
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-4xl font-extrabold text-gold">999 Kč</div>
              <div className="text-sm text-white/40 line-through">1 197 Kč</div>
            </div>
            <ul className="space-y-2 text-sm text-white/85 mt-4 mb-6">
              <li className="flex gap-2">
                <span className="text-gold">✓</span> Všechny 3 e-booky
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> Bonus „Jak sehnat prvního klienta"
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✓</span> Úspora 198 Kč
              </li>
            </ul>
            <Link
              href="/checkout?product=bundle"
              className="block text-center rounded-xl bg-gold text-navy py-3.5 font-extrabold hover:bg-gold/90 transition"
            >
              Vzít balíček
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-8">Časté otázky</h2>
          <div className="bg-white rounded-2xl divide-y divide-ink/8 border border-ink/5">
            {faq.map((item) => (
              <details key={item.q} className="group p-6">
                <summary className="font-bold text-navy flex justify-between items-center cursor-pointer list-none">
                  {item.q}
                  <span className="text-gold text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink/75 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
