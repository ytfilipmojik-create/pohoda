"use client";

type Props = {
  isBundle: boolean;
  onToggle: (next: boolean) => void;
  loading?: boolean;
};

export function OrderBumpBar({ isBundle, onToggle, loading }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-navy via-navy to-navy-600 rounded-2xl p-7 md:p-9 shadow-[0_30px_80px_rgba(26,31,58,0.35)] text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #ffba08 0, transparent 45%), radial-gradient(circle at 10% 90%, #2d3561 0, transparent 50%)",
        }}
      />
      <div className="absolute top-5 right-[-46px] bg-gold text-navy text-[11px] font-extrabold tracking-[0.15em] px-14 py-1.5 rotate-[35deg] shadow-md">
        AKČNÍ NABÍDKA
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          Doporučujeme
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-2">
          Vezmi rovnou{" "}
          <span className="text-gold">balíček všech 3 e-booků</span>
          <br className="hidden sm:block" /> a získáš bonus navíc.
        </h3>

        <p className="text-white/70 mb-6 text-[15px]">
          Bonusový e-book{" "}
          <strong className="text-white">„Jak sehnat prvního klienta"</strong> není dostupný
          samostatně.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-1">
              Cena samostatně
            </div>
            <div className="text-xl font-bold text-white/50 line-through">1 197 Kč</div>
            <div className="text-[11px] text-white/40 mt-1">3 × 399 Kč, bez bonusu</div>
          </div>

          <div className="bg-gradient-to-br from-gold to-amber-300 text-navy rounded-xl p-4 shadow-[0_15px_40px_rgba(255,186,8,0.4)] sm:col-span-1 savings-pulse">
            <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-70 mb-1">
              S balíčkem
            </div>
            <div className="text-3xl font-extrabold">999 Kč</div>
            <div className="text-[11px] font-bold mt-1">+ bonus zdarma</div>
          </div>

          <div className="bg-white/5 border border-gold/30 rounded-xl p-4 sm:col-span-1 flex flex-col justify-center">
            <div className="text-[10px] uppercase tracking-wider text-gold font-extrabold mb-1">
              Tvoje úspora
            </div>
            <div className="text-2xl font-extrabold text-gold">198 Kč</div>
            <div className="text-[11px] text-white/60 mt-1">+ bonus, který nelze koupit zvlášť</div>
          </div>
        </div>

        {isBundle ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-gold/10 border border-gold/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gold font-bold">
              <span className="w-6 h-6 rounded-full bg-gold text-navy flex items-center justify-center text-sm font-extrabold">
                ✓
              </span>
              Balíček je v košíku
            </div>
            <button
              type="button"
              onClick={() => onToggle(false)}
              disabled={loading}
              className="ml-auto text-sm text-white/60 hover:text-white underline disabled:opacity-50"
            >
              Odebrat
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onToggle(true)}
            disabled={loading}
            className="w-full bg-gold text-navy font-extrabold text-base md:text-lg py-4 rounded-xl hover:bg-gold/90 transition shadow-[0_15px_40px_rgba(255,186,8,0.45)] disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? "Aktualizuji…" : "Přidat balíček a ušetřit 198 Kč"}
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}
