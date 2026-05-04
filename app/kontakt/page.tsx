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
    </article>
  );
}
