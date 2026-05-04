"use client";
import { useState, type FormEvent } from "react";

export function ResendForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/help/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("done");
  }

  if (status === "done") {
    return <p className="text-navy">Pokud objednávka existuje, e-mail s odkazem je na cestě.</p>;
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="E-mail z objednávky"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-ink/15 rounded-md px-3 py-2.5"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-navy text-white px-4 py-2.5 rounded-md font-semibold disabled:opacity-50"
      >
        {status === "sending" ? "Odesílám…" : "Poslat"}
      </button>
    </form>
  );
}
