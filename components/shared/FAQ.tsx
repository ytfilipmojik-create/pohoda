"use client";
import { useState } from "react";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-2xl font-bold text-navy mb-6">Časté otázky</h2>
      <div className="divide-y divide-ink/10 bg-white rounded-card shadow-card">
        {items.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              className="w-full text-left p-5 font-semibold text-ink flex justify-between items-center"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span className="text-gold">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-ink/75 leading-relaxed">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
