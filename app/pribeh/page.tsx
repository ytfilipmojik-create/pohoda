import Link from "next/link";

export const metadata = { title: "Můj příběh — pohoda z domova" };

export default function Pribeh() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy mb-8">Můj příběh</h1>

      <div className="bg-white rounded-card p-6 shadow-card mb-8 flex gap-6 items-center">
        <div className="w-28 h-28 bg-cream rounded-full shrink-0" aria-label="Fotka Filipa" />
        <div className="text-sm text-ink/60">
          Filip Mojík
          <br />
          Tvůrce pohoda z domova
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-ink/85 leading-relaxed space-y-4">
        <p>
          Před rokem jsem pracoval na stavbě. Klasická manuální dřina od šesti do tří, vrátit se
          domů, sednout k počítači — a místo Netflixu se učit, jak fungují AI nástroje.
        </p>

        <p>
          Začal jsem stavět malé weby. Hloupé prototypy, které nikdo nechtěl. Pak ale přišel první
          ostrý web pro malou firmu. Pak druhý.
        </p>

        <p>
          Studené volání mi nikdy nešlo. Místo toho jsem si jako technický typ vyrobil
          automatizaci: e-mail rozesílač, který každé malé firmě v okolí poslal personalizovaný
          mail s konkrétním problémem na jejich stávajícím webu (nalezeným AI). Konverze byla
          nesrovnatelně lepší než cold call.
        </p>

        <p>
          Tohle a další moje techniky shánění klientů jsou v bonusovém e-booku, který je dostupný
          pouze v balíčku všech 3 e-booků.
        </p>

        <p>
          Pohoda z domova není o tom „vyděláš milion za měsíc“. Je o tom, že zatímco máš stálé
          zaměstnání, můžeš si po večerech postavit něco svého — pomalu, klidně, bez tlaku.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/bundle"
          className="inline-block rounded-md bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90"
        >
          Vzít balíček
        </Link>
      </div>
    </article>
  );
}
