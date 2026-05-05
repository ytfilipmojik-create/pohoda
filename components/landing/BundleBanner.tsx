import Link from "next/link";
import { Sticker } from "@/components/svg/Sticker";

export function BundleBanner() {
  return (
    <section id="balicek" className="bg-white pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative bg-gradient-to-br from-navy via-navy to-navy-600 rounded-3xl px-7 py-9 md:px-12 md:py-10 text-white shadow-[0_30px_80px_rgba(26,31,58,0.4)] overflow-visible">
          <div
            className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, #ffba08 0, transparent 45%)",
            }}
          />

          <div className="absolute -top-7 -right-4 md:-right-6 z-10">
            <Sticker color="gold" size="md" rotate={14} wobble>
              Úspora
              <br />
              398 Kč
            </Sticker>
          </div>

          <div className="absolute top-5 -left-3 hidden sm:block">
            <div className="bg-gold text-navy text-[11px] font-extrabold uppercase tracking-[0.15em] px-4 py-1.5 rounded-r-full shadow-md">
              Nejvýhodnější
            </div>
          </div>

          <div className="relative grid md:grid-cols-[1.2fr_auto] gap-8 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-2">
                Balíček
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-[1.1] tracking-tight mb-3">
                Všechny <span className="text-gold glow-gold">3 e-booky</span> + bonus
              </h2>
              <p className="text-white/75 text-sm md:text-[15px] leading-relaxed mb-4">
                Bonus{" "}
                <strong className="text-white underline decoration-gold decoration-2 underline-offset-4">
                  „Jak sehnat prvního klienta"
                </strong>{" "}
                — moje techniky včetně cold-email automatizace. Není v prodeji samostatně.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-white/85">
                <li className="flex gap-2">
                  <span className="text-gold">✓</span> AI UGC reklamy
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">✓</span> AI grafika
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">✓</span> AI weby
                </li>
                <li className="flex gap-2 text-gold font-semibold">
                  <span>★</span> BONUS — Jak sehnat klienta
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right md:border-l md:border-white/10 md:pl-8">
              <div className="text-sm text-white/40 line-through font-semibold">1 397 Kč</div>
              <div className="text-5xl md:text-6xl font-extrabold text-gold glow-gold leading-none my-1">
                999 Kč
              </div>
              <div className="text-[11px] text-gold/80 font-bold uppercase tracking-wider mb-5">
                + bonus zdarma
              </div>
              <Link
                href="/checkout?product=bundle"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-gold text-navy px-7 py-4 font-extrabold text-base hover:bg-gold/90 transition shadow-[0_15px_45px_rgba(255,186,8,0.55)] pulse-glow whitespace-nowrap"
              >
                Vzít balíček <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
