import Link from "next/link";
import { getAllProducts, BUNDLE_SLUG } from "@/lib/products";

export default function Home() {
  const products = getAllProducts().filter((p) => !p.isBundle && !p.isBonusOnly);
  const bundle = getAllProducts().find((p) => p.slug === BUNDLE_SLUG)!;

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy leading-tight">
          Moderní přívýdělek z domova
          <br />
          <span className="text-gold">s pomocí AI</span>
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-2xl mx-auto">
          Praktické e-booky pro lidi v zaměstnání, kteří se chtějí naučit něco nového a přivydělat
          si po večerech. Bez studených hovorů, bez hype.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/bundle"
            className="rounded-md bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90"
          >
            Vzít všechny 3 + bonus za {bundle.priceKc} Kč
          </Link>
          <Link
            href="/pribeh"
            className="rounded-md border border-ink/10 px-6 py-3 font-semibold hover:bg-white"
          >
            Můj příběh
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">3 e-booky o AI</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="block bg-white rounded-card p-6 shadow-card hover:shadow-md transition"
            >
              <div className="text-xs uppercase tracking-wider text-gold font-bold">Průvodce</div>
              <div className="mt-2 font-bold text-lg text-navy">{p.title}</div>
              <div className="mt-4 text-sm text-ink/60">{p.priceKc} Kč</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="text-lg leading-relaxed text-ink/80">
          Před rokem jsem dělal na stavbě. Po večerech jsem se začal učit AI a tvořit weby. Dnes
          mám klienty a píšu o tom, jak to může zvládnout kdokoliv.{" "}
          <Link href="/pribeh" className="underline">
            Celý příběh.
          </Link>
        </p>
      </section>
    </>
  );
}
