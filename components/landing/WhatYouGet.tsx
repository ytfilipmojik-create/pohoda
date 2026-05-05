import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";

const PRODUCTS = [
  {
    slug: "ai-ugc-reklamy",
    number: "01",
    title: "AI UGC reklamy",
    pitch: "Točit krátká reklamní videa pro značky a inkasovat za kus.",
    badge: "Bestseller",
    badgeColor: "bg-gold text-navy",
  },
  {
    slug: "ai-grafika",
    number: "02",
    title: "AI grafika a vizuály",
    pitch: "Logo, sociální sítě, bannery — bez Photoshopu, jen s AI a Canvou.",
    badge: "Pro začátečníky",
    badgeColor: "bg-navy text-gold",
  },
  {
    slug: "ai-weby",
    number: "03",
    title: "AI weby pro malé firmy",
    pitch: "Postavit za večer profesionální web pro lokální firmu.",
    badge: "Vyšší marže",
    badgeColor: "bg-cream text-navy border border-navy/20",
  },
];

export function WhatYouGet() {
  return (
    <section id="co-dostanes" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            02 — Vyber e-book
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Tři e-booky, každý jedna konkrétní cesta.
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            Cca <span className="font-semibold text-navy">30 stran</span> na e-book, doručení
            e-mailem do několika minut. Nebo si vezmi rovnou{" "}
            <a href="#balicek" className="text-navy font-bold underline decoration-gold decoration-2 underline-offset-4">
              balíček všech 3 + bonus zdarma
            </a>
            .
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p) => (
            <article
              key={p.slug}
              className="relative bg-cream rounded-2xl p-6 border border-ink/5 flex flex-col hover:shadow-[0_20px_50px_rgba(26,31,58,0.12)] transition-shadow"
            >
              <div
                className={`absolute -top-3 left-6 text-[10px] font-extrabold uppercase tracking-[0.15em] px-3 py-1 rounded-full shadow-md ${p.badgeColor}`}
              >
                {p.badge}
              </div>

              <div className="aspect-[3/4] mb-6 px-2">
                <EbookMockup number={p.number} title={p.title} rotate={0} />
              </div>
              <div className="text-xs uppercase tracking-wider text-gold font-extrabold mb-2">
                {p.number} · průvodce
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-2 leading-tight">{p.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed mb-4 flex-1">{p.pitch}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-navy glow-gold">399 Kč</span>
                <span className="text-xs text-ink/50">/ PDF</span>
              </div>
              <Link
                href={`/checkout?product=${p.slug}`}
                className="block text-center rounded-xl bg-navy text-white py-3.5 font-bold hover:bg-navy/90 transition shadow-md"
              >
                Koupit za 399 Kč
              </Link>
              <Link
                href={`/${p.slug}`}
                className="mt-3 text-center text-sm text-ink/60 hover:text-navy transition"
              >
                Co se naučíš →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
