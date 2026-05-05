import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";

const PRODUCTS = [
  {
    slug: "ai-ugc-reklamy",
    number: "01",
    title: "AI UGC reklamy",
    pitch: "Točit krátká reklamní videa pro značky a inkasovat za kus.",
    bullets: [
      "Hooky, scripty, CTA pro UGC",
      "Najít první značky, které platí",
      "Optimalizace podle Meta Ads dat",
    ],
  },
  {
    slug: "ai-grafika",
    number: "02",
    title: "AI grafika a vizuály",
    pitch: "Logo, sociální sítě, bannery — vše bez Photoshopu, jen s AI a Canvou.",
    bullets: [
      "MidJourney workflow + Canva šablony",
      "Cenotvorba pro malé firmy",
      "Šablony promptů, které šetří hodiny",
    ],
  },
  {
    slug: "ai-weby",
    number: "03",
    title: "AI weby pro malé firmy",
    pitch: "Postavit za večer profi web pro lokální firmu. Vyšší marže než UGC.",
    bullets: [
      "Brief → AI návrh → Framer/Webflow",
      "Cenotvorba — proč nesoutěžit s low-cost",
      "Údržba a upsell pro stálý cash flow",
    ],
  },
];

export function WhatYouGet() {
  return (
    <section id="co-dostanes" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            02 — Co dostaneš
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Tři e-booky, každý jedna konkrétní cesta.
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            Krátké, praktické, přímo k věci. Žádná voda, žádné motivační kapitoly. Cca 30 stran
            na e-book.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="group">
              <div className="aspect-[3/4] mb-6 px-4 group-hover:-translate-y-1 transition-transform">
                <EbookMockup number={p.number} title={p.title} rotate={0} />
              </div>
              <div className="text-xs uppercase tracking-wider text-gold font-bold mb-2">
                {p.number} · průvodce
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-2">{p.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed mb-4">{p.pitch}</p>
              <ul className="space-y-1.5 text-sm text-ink/70">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-gold font-bold">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:gap-3 transition-all">
                Podrobnosti <span className="text-gold">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
