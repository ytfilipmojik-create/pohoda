"use client";
import { useState, type FormEvent } from "react";

const VISIBLE_TOOLS = [
  {
    letter: "C",
    name: "Claude",
    use: "Psaní kódu, copy a brainstorm. Můj denní driver pro všechno textové.",
    bg: "#cc785c",
  },
  {
    letter: "S",
    name: "Supabase",
    use: "Databáze + storage pro každý projekt. Free tier stačí dlouho.",
    bg: "#3ecf8e",
  },
  {
    letter: "V",
    name: "Vercel",
    use: "Hosting Next.js webů a API. Deploy jedním pushnutím do gitu.",
    bg: "#000000",
  },
];

const HIDDEN_HINTS = [
  { letter: "?", hint: "AI IDE, který kód píše rychleji než ty" },
  { letter: "?", hint: "Vizuály a obálky pro klienty" },
  { letter: "?", hint: "AI voiceover pro UGC kreativy" },
  { letter: "?", hint: "Task management — minimal a rychlý" },
  { letter: "?", hint: "Drag & drop weby pro non-tech klienty" },
];

export function AiToolsReveal() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "ai-tools-reveal" }),
    });
    setStatus("done");
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            05 — Bonus zdarma
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight mb-4">
            AI nástroje, které denně používám.
          </h2>
          <p className="text-lg text-ink/70 leading-relaxed">
            Tady jsou tři, bez kterých si denní práci neumím představit. Pošlu ti zdarma
            kompletní seznam včetně cen a use-casů, jak je používám pro klienty i side projekty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {VISIBLE_TOOLS.map((t, i) => (
            <article
              key={t.name}
              className="bg-cream rounded-2xl p-6 border border-ink/5 flex flex-col gap-4 hover:shadow-[0_15px_40px_rgba(26,31,58,0.08)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0"
                  style={{ background: t.bg }}
                >
                  {t.letter}
                </div>
                <div className="text-xs uppercase tracking-wider text-ink/40 font-extrabold">
                  {String(i + 1).padStart(2, "0")} / 08
                </div>
              </div>
              <div>
                <div className="font-extrabold text-navy text-lg">{t.name}</div>
                <p className="text-sm text-ink/70 leading-relaxed mt-1">{t.use}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-navy via-navy to-navy-600 rounded-3xl p-8 md:p-10 lg:p-12 text-white overflow-hidden shadow-[0_30px_80px_rgba(26,31,58,0.3)]">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 10%, #ffba08 0, transparent 45%)",
            }}
          />

          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                + dalších 5 nástrojů zdarma
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                Odemkni <span className="text-gold glow-gold">celý seznam</span>.
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Konkrétní ceny, alternativy, kde co dává smysl použít. Žádný spam, kdykoli
                odhlášení.
              </p>

              <div className="space-y-2">
                {HIDDEN_HINTS.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/40 font-extrabold">
                      {h.letter}
                    </div>
                    <div className="text-sm text-white/60 italic">{h.hint}</div>
                    <svg
                      className="ml-auto text-gold/60"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {status === "done" ? (
              <div className="bg-white/5 border border-gold/30 rounded-2xl p-7 text-center">
                <div className="text-4xl mb-3">✉️</div>
                <h4 className="text-xl font-extrabold mb-2">Hotovo. Mrkni do schránky.</h4>
                <p className="text-white/70 text-sm">Seznam ti přistál na e-mailu.</p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="bg-white text-ink rounded-2xl p-7 shadow-2xl space-y-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold font-extrabold mb-2">
                    Pošli mi seznam
                  </div>
                  <h4 className="text-xl font-extrabold text-navy leading-tight">
                    8 nástrojů + ceny + use-casy.
                  </h4>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvuj@email.cz"
                  className="w-full border border-ink/15 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-navy/90 transition disabled:opacity-50"
                >
                  {status === "sending" ? "Odesílám…" : "Stáhnout seznam zdarma"}
                </button>
                <p className="text-xs text-ink/50 text-center">
                  Žádný spam. Občasný update, kdykoli odhlášení.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
