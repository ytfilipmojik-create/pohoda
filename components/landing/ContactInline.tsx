import { ResendForm } from "@/components/shared/ResendForm";

export function ContactInline() {
  return (
    <section id="kontakt" className="bg-cream py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            07 — Kontakt
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Cokoliv potřebuješ — napiš.
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            Píšu si s každým osobně. Faktura, ztracený download link, dotaz k obsahu — odpovím
            obvykle do 24 hodin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-ink/5">
            <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
              E-mail
            </div>
            <a
              href="mailto:filip@pohodazdomova.cz"
              className="text-navy text-xl font-bold hover:underline break-all"
            >
              filip@pohodazdomova.cz
            </a>
            <p className="mt-4 text-sm text-ink/60 leading-relaxed">
              Odpovím obvykle do 24 hodin (mimo víkendy o trochu déle).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-ink/5">
            <div className="text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
              Ztratil jsi odkaz ke stažení?
            </div>
            <p className="text-sm text-ink/70 mb-4">
              Napiš e-mail z objednávky a pošleme nový.
            </p>
            <ResendForm />
          </div>
        </div>
      </div>
    </section>
  );
}
