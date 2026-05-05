"use client";
import { useState } from "react";

const ITEMS = [
  {
    q: "Pro koho to je?",
    a: "Pro lidi v plném zaměstnání nebo na rodičovské, kteří chtějí pomalu a klidně po večerech rozjet AI přívýdělek. Není to pro hledače get-rich-quick.",
  },
  {
    q: "Musím umět programovat?",
    a: "Ne. Žádný z e-booků nevyžaduje kódování. AI weby se staví v Frameru / Webflow drag & drop, vizuály v Canva, UGC v telefonu.",
  },
  {
    q: "Jak rychle uvidím výsledky?",
    a: "Realistické: první konkrétní výstup (UGC video / vizuál / web pro fiktivního klienta) za víkend. První placená zakázka individuálně, většina lidí v rámci 2–4 týdnů.",
  },
  {
    q: "Můžu si koupit jen jeden e-book?",
    a: "Ano, každý je samostatně za 399 Kč. Bonus „Jak sehnat prvního klienta\" je ale jen v balíčku za 999 Kč.",
  },
  {
    q: "Refund?",
    a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním a vzdáváš se práva na odstoupení od smlouvy ve 14denní lhůtě.",
  },
  {
    q: "V jakém formátu?",
    a: "PDF, optimalizováno pro mobil i desktop. ~30 stran každý. Žádný DRM, ulož si to lokálně.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
          06 — Časté otázky
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight mb-10">
          Nejčastěji se ptáte.
        </h2>
        <div className="bg-white rounded-2xl divide-y divide-ink/8 border border-ink/5 shadow-sm">
          {ITEMS.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 group"
              >
                <span className="font-bold text-navy text-[17px]">{item.q}</span>
                <span
                  className={`text-gold text-2xl transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-ink/75 leading-relaxed -mt-2">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
