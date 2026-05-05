"use client";
import { useState, type FormEvent } from "react";

const VISIBLE_TOOLS = [
  {
    letter: "C",
    name: "Claude",
    use: "Psaní kódu, copy a brainstorm — denní driver pro všechno textové.",
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
    use: "Hosting Next.js webů a API. Deploy jedním pushnutím.",
    bg: "#000000",
  },
];

const HIDDEN_TOOLS = [
  { letter: "C", name: "Cursor", use: "AI IDE — kód píše rychleji než ty.", bg: "#1e1e1e" },
  { letter: "M", name: "MidJourney", use: "Vizuály a obálky pro klienty.", bg: "#000000" },
  {
    letter: "E",
    name: "ElevenLabs",
    use: "AI voiceover pro UGC kreativy v češtině.",
    bg: "#0c0c0e",
  },
  { letter: "L", name: "Linear", use: "Task management — minimal a rychlý.", bg: "#5e6ad2" },
  { letter: "F", name: "Framer", use: "Drag & drop weby pro non-tech klienty.", bg: "#0099ff" },
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
    <section id="nastroje" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            05 — Bonus zdarma
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight mb-4">
            AI nástroje, které <span className="text-gold glow-gold">denně používám</span>.
          </h2>
          <p className="text-lg text-ink/70 leading-relaxed">
            Tady jsou 3 z 8, bez kterých si denní práci neumím představit. Pošlu ti zdarma
            kompletní seznam včetně cen a use-casů, jak je používám pro klienty i side projekty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {VISIBLE_TOOLS.map((t, i) => (
            <article
              key={t.name}
              className="bg-cream rounded-2xl p-6 border border-ink/5 flex flex-col gap-4 hover:shadow-[0_15px_40px_rgba(26,31,58,0.1)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-md"
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

        <div className="relative">
          <div className="grid md:grid-cols-5 gap-3 select-none" aria-hidden="true">
            {HIDDEN_TOOLS.map((t, i) => (
              <article
                key={t.name}
                className="bg-cream rounded-2xl p-5 border border-ink/5 flex flex-col gap-3 blur-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0"
                    style={{ background: t.bg }}
                  >
                    {t.letter}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-ink/40 font-extrabold">
                    0{i + 4} / 08
                  </div>
                </div>
                <div>
                  <div className="font-extrabold text-navy text-sm">{t.name}</div>
                  <p className="text-xs text-ink/70 leading-relaxed mt-1 line-clamp-2">
                    {t.use}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            {status === "done" ? (
              <div className="bg-white border border-gold/40 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_30px_80px_rgba(26,31,58,0.2)]">
                <div className="text-3xl mb-3">✉️</div>
                <h3 className="text-2xl font-extrabold text-navy mb-2">
                  Hotovo. Mrkni do schránky.
                </h3>
                <p className="text-ink/70 text-sm">Seznam ti přistál na e-mailu.</p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="relative bg-gradient-to-br from-navy via-navy to-navy-600 rounded-2xl p-7 md:p-9 max-w-2xl w-full text-white shadow-[0_30px_80px_rgba(26,31,58,0.4)] overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, #ffba08 0, transparent 50%)",
                  }}
                />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 text-gold text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    Odemkni dalších 5 nástrojů
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                    Pošlu ti{" "}
                    <span className="text-gold glow-gold">8 nejlepších AI nástrojů</span>,
                    které používám každý den.
                  </h3>
                  <p className="text-white/70 text-sm mb-5 max-w-md">
                    Konkrétní ceny, alternativy, use-casy. Žádný spam, kdykoli odhlášení.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tvuj@email.cz"
                      className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-gold text-navy px-6 py-3.5 rounded-xl font-extrabold hover:bg-gold/90 transition disabled:opacity-50 shadow-[0_10px_30px_rgba(255,186,8,0.4)] whitespace-nowrap"
                    >
                      {status === "sending" ? "Odesílám…" : "Stáhnout zdarma"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
