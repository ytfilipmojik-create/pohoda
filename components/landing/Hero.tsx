import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";
import { Stars } from "@/components/svg/Stars";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #1a1f3a 0, transparent 40%), radial-gradient(circle at 85% 70%, #ffba08 0, transparent 35%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Nový balíček 2026
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.05]">
            Pohoda z domova.
            <br />
            <span className="text-gold">Po práci.</span>
            <br />
            <span className="text-ink/40">S AI.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl">
            Tři praktické e-booky pro lidi v zaměstnání, kteří se chtějí naučit AI a pomalu si
            postavit přívýdělek po večerech. Bez studených hovorů, bez hype, bez kurzů za 50 tisíc.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/checkout?product=bundle"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white px-7 py-4 font-semibold text-base hover:bg-navy/90 transition shadow-[0_10px_30px_rgba(26,31,58,0.25)]"
            >
              Vzít balíček za 999 Kč
              <span className="text-gold">→</span>
            </Link>
            <Link
              href="#co-dostanes"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 px-7 py-4 font-semibold text-base hover:bg-white transition"
            >
              Co dostaneš
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-cream"
                  style={{
                    background: `hsl(${(i * 60) % 360}, 30%, 80%)`,
                  }}
                />
              ))}
            </div>
            <div>
              <Stars />
              <div className="text-xs text-ink/60 mt-0.5">
                <strong className="text-ink/80">120+</strong> spokojených čtenářů
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[480px] hidden md:block">
          <div className="absolute right-[8%] top-[8%] w-[55%]">
            <EbookMockup number="01" title="AI UGC reklamy" rotate={-8} />
          </div>
          <div className="absolute left-[10%] top-[18%] w-[55%]">
            <EbookMockup number="02" title="AI grafika a vizuály" rotate={6} />
          </div>
          <div className="absolute right-[18%] bottom-[2%] w-[55%]">
            <EbookMockup number="03" title="AI weby pro malé firmy" rotate={-3} />
          </div>
          <div className="absolute left-[2%] bottom-[8%] w-[40%] z-10">
            <div
              className="rounded-2xl bg-gradient-to-br from-gold to-amber-400 text-navy p-4 shadow-[0_20px_40px_rgba(255,186,8,0.3)] -rotate-6"
              style={{ transform: "rotate(-6deg)" }}
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-70">
                Bonus jen v balíčku
              </div>
              <div className="font-extrabold text-base leading-tight mt-1">
                Jak sehnat<br />prvního klienta
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden grid grid-cols-3 gap-3">
          <EbookMockup number="01" title="UGC" rotate={-4} />
          <EbookMockup number="02" title="Grafika" rotate={4} />
          <EbookMockup number="03" title="Weby" rotate={-2} />
        </div>
      </div>
    </section>
  );
}
