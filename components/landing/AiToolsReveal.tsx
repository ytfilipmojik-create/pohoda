"use client";
import { useState, type FormEvent } from "react";

const VISIBLE_TOOLS = [
  {
    letter: "C",
    name: "Claude",
    use: "Psaní kódu, copy a brainstorm — denní driver.",
    bg: "#cc785c",
  },
  {
    letter: "S",
    name: "Supabase",
    use: "Databáze + storage pro každý projekt. Zdarma stačí dlouho.",
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
  { letter: "R", name: "Resend", use: "Transakční e-maily s React Email.", bg: "#000000" },
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
            Pošlu ti kompletní seznam včetně cen a use-casů, jak je používám pro klienty i side
            projekty. Zdarma, bez spamu. Můžeš se kdykoli odhlásit.
          </p>
        </div>

        <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISIBLE_TOOLS.map((t) => (
              <ToolCard key={t.name} tool={t} />
            ))}
            {HIDDEN_TOOLS.map((t) => (
              <ToolCard key={t.name} tool={t} blurred />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[60%] flex items-end justify-center pb-8 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent" />
            <div className="relative pointer-events-auto bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(26,31,58,0.15)] max-w-xl w-full mx-4">
              {status === "done" ? (
                <div className="text-center py-4">
                  <div className="text-2xl font-extrabold text-navy mb-2">
                    Hotovo. Mrkni do schránky.
                  </div>
                  <p className="text-ink/70">Seznam ti přistál na e-mailu.</p>
                </div>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-wider text-gold font-extrabold mb-2">
                    Odemkni celý seznam
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-navy leading-tight mb-2">
                    Pošlu ti kompletní výběr 8+ nástrojů.
                  </h3>
                  <p className="text-sm text-ink/70 mb-5">
                    Konkrétní ceny, alternativy, kde co dává smysl použít.
                  </p>
                  <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tvuj@email.cz"
                      className="flex-1 border border-ink/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-navy text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy/90 transition disabled:opacity-50"
                    >
                      {status === "sending" ? "Odesílám…" : "Poslat seznam"}
                    </button>
                  </form>
                  <p className="text-xs text-ink/50 mt-3">
                    Žádný spam. Občasný update, kdykoli odhlášení.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({
  tool,
  blurred = false,
}: {
  tool: { letter: string; name: string; use: string; bg: string };
  blurred?: boolean;
}) {
  return (
    <div
      className={`bg-cream rounded-2xl p-5 flex gap-4 items-start border border-ink/5 transition ${
        blurred ? "blur-md select-none" : ""
      }`}
      aria-hidden={blurred}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0"
        style={{ background: tool.bg }}
      >
        {tool.letter}
      </div>
      <div>
        <div className="font-bold text-navy">{tool.name}</div>
        <p className="text-sm text-ink/70 leading-snug mt-0.5">{tool.use}</p>
      </div>
    </div>
  );
}
