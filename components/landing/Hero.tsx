import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";

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
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.05]">
            Pohoda z domova.
            <br />
            <span className="text-gold">Po práci.</span>
            <br />
            <span className="text-ink/40">S AI.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl">
            Tři praktické e-booky pro lidi v zaměstnání, kteří se chtějí naučit AI a klidně po
            večerech rozjet něco svého. Bez kurzů za desítky tisíc, bez hype, bez tlaku.
          </p>

          <div className="mt-9">
            <Link
              href="#co-dostanes"
              className="inline-flex items-center gap-2 text-navy font-semibold border-b-2 border-gold pb-1 hover:gap-3 transition-all text-base"
            >
              Mrkni, co je uvnitř <span className="text-gold">↓</span>
            </Link>
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
