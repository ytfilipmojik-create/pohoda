import Link from "next/link";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "Balíček 3 e-booků + bonus — pohoda z domova" };

export default function Bundle() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <div className="inline-block bg-gold text-navy text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
          Doporučujeme
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
          Všechny 3 e-booky + bonus
          <br />
          <span className="text-gold">za 999 Kč</span>
        </h1>
        <p className="mt-6 text-lg text-ink/75 max-w-2xl mx-auto">
          Místo 1 197 Kč za jednotlivé e-booky dostaneš všechny tři + exkluzivní bonusový e-book,
          který není dostupný samostatně.
        </p>
        <Link
          href="/checkout?product=bundle"
          className="mt-8 inline-block rounded-md bg-navy text-white px-8 py-4 font-semibold text-lg hover:bg-navy/90"
        >
          Vzít balíček za 999 Kč
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Co je v balíčku</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">
              Průvodce 01
            </div>
            <div className="mt-2 font-bold text-lg text-navy">AI UGC reklamy</div>
            <p className="mt-2 text-sm text-ink/70">
              Vyrábět placené UGC kreativy pro značky.
            </p>
          </div>
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">
              Průvodce 02
            </div>
            <div className="mt-2 font-bold text-lg text-navy">AI grafika a vizuály</div>
            <p className="mt-2 text-sm text-ink/70">
              Vytvářet grafiku bez Photoshopu, prodávat lokálně.
            </p>
          </div>
          <div className="bg-white rounded-card p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">
              Průvodce 03
            </div>
            <div className="mt-2 font-bold text-lg text-navy">AI weby pro malé firmy</div>
            <p className="mt-2 text-sm text-ink/70">
              Stavět weby za večer pro místní firmy.
            </p>
          </div>
          <div className="bg-navy text-white rounded-card p-6 shadow-upsell border-2 border-gold">
            <div className="text-xs uppercase tracking-wider text-gold font-bold">
              Bonus · jen v balíčku
            </div>
            <div className="mt-2 font-bold text-lg">Jak sehnat prvního klienta</div>
            <p className="mt-2 text-sm text-white/80">
              Moje vlastní techniky shánění klientů včetně cold-email automatizace s AI
              personalizací. Není dostupný samostatně.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <Link
          href="/checkout?product=bundle"
          className="inline-block rounded-md bg-gold text-navy px-8 py-4 font-bold text-lg hover:bg-gold/90"
        >
          Vzít balíček za 999 Kč
        </Link>
        <p className="mt-3 text-sm text-ink/60">Doručení e-mailem do několika minut</p>
      </section>

      <FAQ
        items={[
          {
            q: "Proč je bonus jen v balíčku?",
            a: "Záměrně. Bonus obsahuje moje konkrétní techniky shánění klientů, které dávám jen lidem, co berou plnou cestu.",
          },
          {
            q: "Můžu si dokoupit jednotlivé e-booky a bonus zvlášť?",
            a: "Bonus zvlášť ne. Pokud koupíš jeden e-book a do 5 dní se rozhodneš pro balíček, dostaneš nabídku na doplatek 600 Kč e-mailem.",
          },
          { q: "V jakém formátu?", a: "PDF, optimalizované pro čtení na mobilu i počítači." },
          {
            q: "Refund?",
            a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním a vzdáváš se práva na odstoupení.",
          },
        ]}
      />
    </>
  );
}
