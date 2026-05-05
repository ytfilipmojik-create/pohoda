"use client";
import Link from "next/link";
import { useState } from "react";
import { PersonPlaceholder } from "@/components/svg/PersonPlaceholder";

const FEATURED = {
  name: "Marek",
  age: 34,
  role: "Tesař + freelance webař",
  product: "AI weby pro malé firmy",
  preview: [
    "Jsem tesař. Pět dní v týdnu na stavbě, ráno brzy nahoru, odpoledne domů. Pracuju rukama a baví mě to.",
    "Před rokem jsem chtěl mít vlastní web pro tesařství — zachytit víc soukromníků, kteří hledají řemeslníka přes Google. Obvolal jsem několik webdesignérů, ale ceny se pohybovaly mezi 30 a 40 tisíci. Tolik peněz za něco, čemu nerozumím, jsem investovat nechtěl.",
  ],
  rest: [
    "Kolega mi pak ukázal e-book AI weby pro malé firmy. Stál pár stovek. Říkal jsem si, že za jednu výplatu zkusím něco postavit sám. Vyšlo to — za dva víkendy jsem měl funkční web přesně podle své představy.",
    "Tady to začalo být zajímavé. Na stavbách denně potkávám další řemeslníky — střechaře, zedníky, elektrikáře, instalatéry. Většina z nich nemá web vůbec, nebo má něco z roku 2015. Zeptal jsem se jednoho: „Kdybych ti udělal stránky podle tvojí branže, vzal bys to?\" Vzal. Pak druhý. Třetí.",
    "Dneska po práci sednu k notebooku a pracuju na zakázkách. „Tesař, který staví weby\" funguje líp, než kdybych byl jen další freelance designér z LinkedInu — kolegové vědí, že rozumím jejich byznysu. Ceny dělám férové, nepřeháním je jako agentury.",
    "Mám druhý zdroj příjmu, který v některých měsících přesahuje výplatu z hlavní práce. A pořád chodím na stavbu, protože mě to baví. Pohoda.",
  ],
};

const SHORT_STORIES = [
  {
    name: "Petra K.",
    age: 32,
    role: "Mateřská + UGC kreativy",
    product: "AI UGC reklamy",
    text: "Po mateřské jsem hledala přivýdělek, který bych mohla zvládnout při dětech. Cold call mi nesedí, klasický marketing taky ne. Vzala jsem si e-book AI UGC reklamy a za měsíc jsem měla portfolio pěti videí. Dnes natáčím obsah pro čtyři značky — převážně kosmetiku a doplňky stravy. Stačí mi telefon a kruhové světlo za 800 Kč.",
  },
  {
    name: "Tomáš P.",
    age: 29,
    role: "IT support + grafika po večerech",
    product: "AI grafika a vizuály",
    text: "Pracuju v IT supportu na dvanáctihodinové směny. V lichém týdnu si přivydělávám tvorbou grafiky pro lokální e-shopy a kavárny. Místo prokrastinace na YouTube tvořím vizuály — a navíc z toho mám peníze. Cenotvorba popsaná v e-booku byla pro mě klíčová, sám bych se totiž podcenil.",
  },
];

export function CustomerStories() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="pribehy" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            03 — Příběhy čtenářů
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Lidé, kteří z toho udělali něco svého.
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            Žádné motivační videa, žádné garantované „milion za měsíc". Jen lidé, kteří po práci
            sedli k notebooku a krok po kroku si postavili druhou nohu.
          </p>
        </div>

        <article className="bg-cream rounded-3xl p-8 md:p-12 border border-ink/5 mb-10">
          <div className="grid lg:grid-cols-[180px_1fr] gap-8 lg:gap-12 items-start">
            <div className="flex lg:block justify-center">
              <PersonPlaceholder size={160} alt={FEATURED.name} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-gold font-extrabold mb-3">
                Featured · {FEATURED.product}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight mb-2">
                Tesař, který rozjel weby pro celou stavbu.
              </h3>
              <div className="text-sm text-ink/60 mb-6">
                {FEATURED.name}, {FEATURED.age} · {FEATURED.role}
              </div>
              <div className="space-y-4 text-ink/85 leading-relaxed text-[17px]">
                {FEATURED.preview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {expanded &&
                  FEATURED.rest.map((p, i) => (
                    <p key={i} className="animate-[fadeIn_300ms_ease]">
                      {p}
                    </p>
                  ))}
              </div>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-6 inline-flex items-center gap-2 text-navy font-semibold border-b-2 border-gold pb-1 hover:gap-3 transition-all"
              >
                {expanded ? (
                  <>
                    Sbalit <span className="text-gold">↑</span>
                  </>
                ) : (
                  <>
                    Číst celý Markův příběh <span className="text-gold">↓</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {SHORT_STORIES.map((s) => (
            <article
              key={s.name}
              className="bg-cream rounded-2xl p-7 border border-ink/5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <PersonPlaceholder size={56} alt={s.name} />
                <div>
                  <div className="font-bold text-navy">
                    {s.name} <span className="text-ink/50 font-normal">· {s.age}</span>
                  </div>
                  <div className="text-xs text-ink/60">{s.role}</div>
                </div>
              </div>
              <div className="text-xs uppercase tracking-wider text-gold font-extrabold mb-3">
                {s.product}
              </div>
              <p className="text-ink/85 leading-relaxed text-[15px]">„{s.text}"</p>
            </article>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-navy to-navy-600 text-white rounded-3xl p-8 md:p-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 30%, #ffba08 0, transparent 45%)",
            }}
          />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                Tvůj příběh tu může být další.
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-xl">
                Pokud tě e-book někam posunul, podělej se. Pomůže to dalším lidem překonat „není
                to pro mě" moment.
              </p>
            </div>
            <Link
              href="/sdilet-pribeh"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-navy px-7 py-4 font-extrabold hover:bg-gold/90 transition shadow-[0_15px_40px_rgba(255,186,8,0.35)] whitespace-nowrap"
            >
              Sdílet svůj příběh <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
