import { ResendForm } from "@/components/shared/ResendForm";

export const metadata = { title: "Kontakt — pohoda z domova" };

export default function Kontakt() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-extrabold text-navy mb-6">Kontakt</h1>
      <p className="text-lg text-ink/80 mb-6">
        Cokoliv ohledně e-booků, faktury, nebo kdyby ti expiroval download link — napiš mi.
      </p>
      <div className="bg-white rounded-card p-6 shadow-card">
        <div className="text-sm text-ink/60 uppercase tracking-wider font-semibold mb-1">
          E-mail
        </div>
        <a
          href="mailto:filip@pohodazdomova.cz"
          className="text-navy text-lg font-semibold hover:underline"
        >
          filip@pohodazdomova.cz
        </a>
        <p className="mt-4 text-sm text-ink/60">
          Odpovím obvykle do 24 hodin (mimo víkendy o trochu déle).
        </p>
      </div>

      <div className="mt-10 bg-white rounded-card p-6 shadow-card">
        <h2 className="text-lg font-bold text-navy mb-3">Ztratil jsi odkaz ke stažení?</h2>
        <p className="text-sm text-ink/70 mb-4">
          Napiš svůj e-mail z objednávky a pošleme nový.
        </p>
        <ResendForm />
      </div>
    </article>
  );
}
