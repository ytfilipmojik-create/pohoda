"use client";
import { useState, type FormEvent } from "react";

export function ShareStoryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [story, setStory] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/share-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, profession, story, consentPublish: consent }),
    });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-ink/5">
        <div className="text-3xl mb-3">🌱</div>
        <h2 className="text-2xl font-extrabold text-navy mb-2">Díky moc.</h2>
        <p className="text-ink/70 leading-relaxed max-w-md mx-auto">
          Příběh ke mně dorazil. Pokud ho chceme publikovat, ozveme se ti pro doladění.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl p-7 md:p-9 border border-ink/5 space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
            Jméno
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marek"
            required
            className="w-full border border-ink/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tvuj@email.cz"
            className="w-full border border-ink/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
          Co děláš (nepovinné)
        </label>
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="např. Tesař + freelance webař"
          className="w-full border border-ink/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-ink/60 font-bold mb-2">
          Tvůj příběh nebo recenze
        </label>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          required
          rows={8}
          placeholder="Co tě k e-booku přivedlo, co se ti povedlo, co bys vzkázal ostatním…"
          className="w-full border border-ink/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-y leading-relaxed"
        />
      </div>

      <label className="flex gap-3 items-start text-sm text-ink/75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 accent-gold"
        />
        <span>
          Souhlasím, že může být můj příběh (po předchozí domluvě) publikován na
          pohodazdomova.cz a v marketingových materiálech.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">Něco se rozbilo. Zkus to znovu nebo napiš na filip@pohodazdomova.cz.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-navy/90 transition disabled:opacity-50"
      >
        {status === "sending" ? "Odesílám…" : "Poslat příběh"}
      </button>
    </form>
  );
}
