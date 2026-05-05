import Link from "next/link";

export function BundleOffer() {
  return (
    <section className="bg-gradient-to-b from-white to-cream py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative bg-navy text-white rounded-3xl p-8 md:p-14 overflow-hidden shadow-[0_30px_80px_rgba(26,31,58,0.3)]">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #ffba08 0, transparent 40%)",
            }}
          />
          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold text-navy text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                Doporučujeme
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
                Vezmi <span className="text-gold">balíček.</span>
                <br />
                Ušetři 198 Kč a získej bonus.
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-7">
                Místo 1 197 Kč za jednotlivé e-booky dostaneš všechny tři + bonusový e-book{" "}
                <strong className="text-white">„Jak sehnat prvního klienta"</strong>, který
                není dostupný samostatně.
              </p>
              <ul className="space-y-2.5 text-white/85 text-[15px] mb-8">
                {[
                  "Všechny 3 e-booky (AI UGC, grafika, weby)",
                  "Exkluzivní bonus o akvizici klientů",
                  "Doručení e-mailem do několika minut",
                  "PDF formát, optimalizováno pro mobil i desktop",
                ].map((b) => (
                  <li key={b} className="flex gap-3 items-start">
                    <span className="text-gold mt-1">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white text-ink rounded-2xl p-7 shadow-2xl">
              <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
                Balíček 3 + bonus
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <div className="text-5xl font-extrabold text-navy">999 Kč</div>
                <div className="text-lg text-ink/40 line-through">1 197 Kč</div>
              </div>
              <div className="text-xs text-gold font-bold uppercase tracking-wider mb-6">
                Ušetříš 198 Kč
              </div>

              <Link
                href="/checkout?product=bundle"
                className="block text-center rounded-xl bg-navy text-white py-4 font-semibold hover:bg-navy/90 transition mb-3"
              >
                Vzít balíček
              </Link>
              <p className="text-center text-xs text-ink/50">
                Platba kartou. Doručení do několika minut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
