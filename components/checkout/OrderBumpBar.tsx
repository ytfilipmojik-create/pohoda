"use client";

type Props = {
  isBundle: boolean;
  onToggle: (next: boolean) => void;
  loading?: boolean;
};

export function OrderBumpBar({ isBundle, onToggle, loading }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-navy to-navy-600 rounded-card p-6 shadow-upsell text-white overflow-hidden">
      <div className="absolute top-4 right-[-38px] bg-gold text-navy text-[11px] font-extrabold tracking-wider px-12 py-1 rotate-[35deg]">
        UŠETŘÍTE 198 KČ
      </div>
      <label className="flex gap-4 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={isBundle}
          disabled={loading}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 w-5 h-5 accent-gold"
        />
        <div className="flex-1">
          <div className="inline-block bg-gold text-navy text-[11px] font-extrabold tracking-wider px-2 py-0.5 rounded mb-3">
            NEJOBLÍBENĚJŠÍ VOLBA
          </div>
          <div className="text-xl font-extrabold tracking-tight mb-3 leading-tight">
            Pouze <span className="text-gold">999 Kč</span> a získáte{" "}
            <u className="decoration-gold decoration-2 underline-offset-4">
              všechny 3 e-booky + bonus zdarma
            </u>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 border border-white/15 rounded-md p-3">
              <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">
                Bez balíčku
              </div>
              <div className="text-base font-semibold line-through opacity-70">
                399 × 3 = 1197 Kč
              </div>
              <div className="text-[11px] opacity-60">+ bez bonusu</div>
            </div>
            <div className="bg-gold text-navy rounded-md p-3">
              <div className="text-[10px] uppercase tracking-wider font-bold opacity-70 mb-1">
                S balíčkem
              </div>
              <div className="text-lg font-extrabold">999 Kč</div>
              <div className="text-[11px] font-semibold">+ bonus e-book ZDARMA</div>
            </div>
          </div>
          <div className="mt-3 bg-gold/10 border border-dashed border-gold/50 rounded-md p-3 text-sm leading-relaxed">
            <strong className="text-gold">Bonus „Jak sehnat prvního klienta“</strong> —
            moje vlastní techniky shánění klientů včetně cold-email automatizace.{" "}
            <strong>Není dostupný samostatně.</strong>
          </div>
        </div>
      </label>
    </div>
  );
}
