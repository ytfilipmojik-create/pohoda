import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-navy text-white py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, #ffba08 0, transparent 40%), radial-gradient(circle at 80% 70%, #2d3561 0, transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
          Začni dnes večer.
          <br />
          <span className="text-gold">Bez tlaku.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl mx-auto">
          Tři e-booky, jeden bonus, jeden malý krok ven ze zoufalého scrollování.
        </p>
        <Link
          href="/checkout?product=bundle"
          className="mt-10 inline-flex items-center justify-center gap-3 rounded-xl bg-gold text-navy px-8 py-5 font-extrabold text-lg hover:bg-gold/90 transition shadow-[0_20px_50px_rgba(255,186,8,0.35)]"
        >
          Vzít balíček za 999 Kč
          <span>→</span>
        </Link>
        <p className="mt-4 text-sm text-white/50">
          Doručení e-mailem do několika minut · platba kartou
        </p>
      </div>
    </section>
  );
}
