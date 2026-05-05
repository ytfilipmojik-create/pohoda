import Link from "next/link";

export function BundleBanner() {
  return (
    <section id="balicek" className="bg-white pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative bg-gradient-to-br from-navy via-navy to-navy-600 rounded-3xl p-8 md:p-12 lg:p-14 shadow-[0_40px_100px_rgba(26,31,58,0.4)] text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #ffba08 0, transparent 45%), radial-gradient(circle at 10% 90%, #2d3561 0, transparent 50%)",
            }}
          />
          <div className="absolute top-7 right-[-58px] bg-gold text-navy text-[12px] font-extrabold tracking-[0.18em] px-16 py-1.5 rotate-[35deg] shadow-md">
            NEJVÝHODNĚJŠÍ
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Doporučujeme
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              Vezmi rovnou{" "}
              <span className="text-gold">balíček všech 3 e-booků</span>
              <br className="hidden md:block" /> a získáš bonus navíc.
            </h2>

            <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-8">
              Hlavní lákadlo je bonusový e-book{" "}
              <strong className="text-white">„Jak sehnat prvního klienta"</strong> — moje vlastní
              techniky shánění klientů včetně cold-email automatizace s AI personalizací. Tenhle
              e-book{" "}
              <strong className="text-white underline decoration-gold decoration-2 underline-offset-4">
                není dostupný samostatně
              </strong>
              , dostaneš ho jen v balíčku.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-1">
                  Cena samostatně
                </div>
                <div className="text-2xl font-bold text-white/50 line-through">1 197 Kč</div>
                <div className="text-[11px] text-white/40 mt-1">3 × 399 Kč, bez bonusu</div>
              </div>

              <div className="bg-gradient-to-br from-gold to-amber-300 text-navy rounded-xl p-5 shadow-[0_15px_40px_rgba(255,186,8,0.45)] savings-pulse">
                <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-70 mb-1">
                  S balíčkem
                </div>
                <div className="text-4xl font-extrabold leading-none">999 Kč</div>
                <div className="text-[11px] font-bold mt-2">+ bonus zdarma</div>
              </div>

              <div className="bg-white/5 border border-gold/30 rounded-xl p-5 flex flex-col justify-center">
                <div className="text-[10px] uppercase tracking-wider text-gold font-extrabold mb-1">
                  Tvoje úspora
                </div>
                <div className="text-3xl font-extrabold text-gold">198 Kč</div>
                <div className="text-[11px] text-white/60 mt-1">+ bonus, který nelze koupit</div>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-2 mb-8 text-white/85 text-[15px]">
              {[
                "Všechny 3 e-booky (UGC, grafika, weby)",
                'Bonus „Jak sehnat prvního klienta"',
                "Doručení e-mailem do několika minut",
                "PDF — mobil i desktop",
              ].map((b) => (
                <li key={b} className="flex gap-2 items-start">
                  <span className="text-gold mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/checkout?product=bundle"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gold text-navy px-8 py-5 font-extrabold text-lg hover:bg-gold/90 transition shadow-[0_20px_50px_rgba(255,186,8,0.5)]"
            >
              Vzít balíček za 999 Kč
              <span>→</span>
            </Link>
            <p className="mt-3 text-sm text-white/50">
              Platba kartou. Doručení do několika minut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
