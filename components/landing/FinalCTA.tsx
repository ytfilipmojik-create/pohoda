import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-navy text-white py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, #ffba08 0, transparent 40%), radial-gradient(circle at 80% 70%, #2d3561 0, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
          Tři cesty k AI přívýdělku.
          <br />
          <span className="text-gold">Vyber tu svoji.</span>
        </h2>
        <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
          Můžeš si vzít jeden e-book za 399 Kč, nebo všechny tři + bonus za 999 Kč. Žádný
          spěch, žádný hype.
        </p>
        <Link
          href="#co-dostanes"
          className="mt-10 inline-flex items-center gap-2 text-white font-semibold border-b-2 border-gold pb-1 hover:gap-3 transition-all"
        >
          Mrknout na e-booky <span className="text-gold">↑</span>
        </Link>
      </div>
    </section>
  );
}
