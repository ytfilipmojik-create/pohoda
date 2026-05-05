import Link from "next/link";
import { PersonPlaceholder } from "@/components/svg/PersonPlaceholder";

export function AuthorSection() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-[200px_1fr] gap-10 items-start">
        <div className="flex md:block justify-center">
          <PersonPlaceholder size={180} alt="Filip Mojík" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            03 — Kdo to píše?
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight mb-5">
            Filip. Před rokem na stavbě, dnes z toho žije.
          </h2>
          <div className="space-y-4 text-ink/80 leading-relaxed text-[17px]">
            <p>
              Klasická manuální dřina od šesti do tří. Po večerech jsem se začal učit AI nástroje
              a stavět malé weby. Pak přišel první klient. Pak druhý.
            </p>
            <p>
              Studené volání mi nikdy nešlo. Místo toho jsem si jako technický typ vyrobil
              automatizaci s AI personalizací. Konverze nesrovnatelně lepší než cold call. Ten
              postup je v bonusovém e-booku.
            </p>
            <p>
              Pohoda z domova není o „vyděláš milion za měsíc". Je o tom, že zatímco máš stálé
              zaměstnání, můžeš si pomalu, klidně a bez tlaku po večerech postavit něco svého.
            </p>
          </div>
          <Link
            href="/pribeh"
            className="inline-flex items-center gap-2 mt-6 text-navy font-semibold hover:gap-3 transition-all"
          >
            Celý příběh <span className="text-gold">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
