import Link from "next/link";
import { EbookMockup } from "@/components/svg/EbookMockup";
import { Sticker } from "@/components/svg/Sticker";
import { Stars } from "@/components/svg/Stars";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #1a1f3a 0, transparent 40%), radial-gradient(circle at 85% 70%, #ffba08 0, transparent 35%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 text-navy text-[11px] font-extrabold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Akce: balíček 999 Kč místo 1 197 Kč
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.05]">
            Pohoda z domova.
            <br />
            <span className="text-gold glow-gold">Po práci.</span>
            <br />
            <span className="text-ink/40">S AI.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/75 leading-relaxed max-w-xl">
            Tři praktické e-booky pro lidi v zaměstnání, kteří se chtějí naučit AI a klidně po
            večerech rozjet něco svého.
          </p>

          <ul className="mt-6 space-y-2 text-[15px] text-ink/70 max-w-xl">
            <li className="flex gap-3">
              <span className="text-gold font-bold mt-0.5">01</span>
              <span>
                <strong className="text-navy">AI UGC reklamy</strong> — krátká reklamní videa pro
                značky.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-bold mt-0.5">02</span>
              <span>
                <strong className="text-navy">AI grafika a vizuály</strong> — bez Photoshopu, jen
                AI a Canva.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-bold mt-0.5">03</span>
              <span>
                <strong className="text-navy">AI weby pro malé firmy</strong> — postavit za večer
                profi web.
              </span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#balicek"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white px-6 py-4 font-bold hover:bg-navy/90 transition shadow-[0_15px_40px_rgba(26,31,58,0.3)] pulse-glow"
            >
              Chci výhodný balíček <span className="text-gold">→</span>
            </Link>
            <Link
              href="#co-dostanes"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-6 py-4 font-semibold text-navy hover:bg-cream transition"
            >
              Co je uvnitř
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink/60">
            <div className="flex items-center gap-2">
              <Stars />
              <span>
                <strong className="text-ink/80">120+</strong> čtenářů
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Doručení do 5 minut
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-navy rounded-full" />
              Platba kartou (Stripe)
            </div>
          </div>
        </div>

        <div className="relative h-[440px] md:h-[500px] hidden md:block">
          <div className="absolute right-[8%] top-[8%] w-[55%]">
            <EbookMockup number="01" title="AI UGC reklamy" rotate={-8} />
          </div>
          <div className="absolute left-[10%] top-[18%] w-[55%]">
            <EbookMockup number="02" title="AI grafika a vizuály" rotate={6} />
          </div>
          <div className="absolute right-[18%] bottom-[2%] w-[55%]">
            <EbookMockup number="03" title="AI weby pro malé firmy" rotate={-3} />
          </div>
          <div className="absolute -top-2 -right-2 z-10">
            <Sticker color="gold" size="md" rotate={12} wobble>
              Ušetříš
              <br />
              198 Kč
            </Sticker>
          </div>
          <div className="absolute -bottom-4 -left-2 z-10">
            <Sticker color="navy" size="sm" rotate={-12}>
              Bonus
              <br />
              zdarma
            </Sticker>
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
