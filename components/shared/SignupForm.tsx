"use client";
import { useState, type FormEvent } from "react";

type Props = { source?: string; title?: string; subtitle?: string };

export function SignupForm({
  source = "footer",
  title = "5 AI nástrojů, které denně používám",
  subtitle = "Krátké PDF zdarma. Žádný spam.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="text-navy">Hotovo. Mrkni do schránky — odkaz ke stažení už je u tebe.</p>
    );
  }

  return (
    <div>
      <div className="font-bold text-navy">{title}</div>
      <p className="text-sm text-ink/70 mb-3">{subtitle}</p>
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tvuj@email.cz"
          className="flex-1 border border-ink/15 rounded-md px-3 py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-navy text-white px-4 py-2.5 rounded-md font-semibold text-sm disabled:opacity-50"
        >
          {status === "sending" ? "..." : "Stáhnout"}
        </button>
      </form>
    </div>
  );
}
