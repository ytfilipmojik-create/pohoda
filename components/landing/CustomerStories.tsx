import Link from "next/link";
import { PersonPlaceholder } from "@/components/svg/PersonPlaceholder";

const FEATURED = {
  name: "Marek",
  age: 34,
  role: "Tesař + freelance webař",
  product: "AI weby pro malé firmy",
  paragraphs: [
    "Dělám tesaře. Klasická manuální dřina — pět dní v týdnu na stavbě, ráno brzy nahoru, odpoledne domů.",
    "Před rokem jsem chtěl pustit si vlastní stránky pro tesařství, abych chytal víc zakázek od soukromníků. Obvolal jsem pár webdesignérů — buď nezvedali, nebo chtěli 30, 40 tisíc. Tolik peněz za něco, čemu nerozumím, jsem dát nechtěl.",
    "Pak mi kolega ukázal e-book AI weby pro malé firmy. Stálo to 399 Kč. Říkal jsem si: za jednu výplatu si zkusím něco udělat sám. A vyšlo to. Za dva víkendy jsem měl funkční web přesně podle své představy. Žádný designér mi nemusel říkat, co se kde má hodit, protože já vím, jak svoji práci prodat.",
    "Tady to začalo zajímavě. Na stavbách potkávám denně chlapy z různých řemesel — střechaře, zedníky, elektrikáře, instalatéry. Většina z nich nemá web, nebo má něco z roku 2015. Zeptal jsem se jednoho: „Hele, kdybych ti udělal stránky podle tvojí branže, vzal bys to?\" Vzal. Pak druhý. Třetí.",
    "Dneska po práci sednu k notebooku a tahám zakázky. „Tesař od stavby\" funguje líp než kdybych byl jen další freelance designér z LinkedInu — chlapi vědí, že rozumím, o čem mluvíme. Cenu dělám férovou, ne jako agentury.",
    "Plus z toho mám druhý zdroj příjmu, který za měsíc dělá víc než zedníčina mimo sezónu. A pořád chodím na stavbu, protože mě to baví. Pohoda.",
  ],
};

const SHORT_STORIES = [
  {
    name: "Petra K.",
    age: 32,
    role: "Mateřská + UGC kreativy",
    product: "AI UGC reklamy",
    text: "Po mateřské jsem hledala něco při dětech. Cold call ne, klasický marketing taky ne. Vzala jsem si AI UGC reklamy a za měsíc jsem měla portfolio pěti video kreativ. Dnes mám čtyři značky, kterým točím obsah — kosmetika a doplňky. Telefon a kruhové světlo za 800 Kč mi stačí.",
  },
  {
    name: "Tomáš P.",
    age: 29,
    role: "IT support + grafika po večerech",
    product: "AI grafika a vizuály",
    text: "Pracuju v IT supportu, dvanáctky. V lichém týdnu si přivydělávám grafikou pro lokální e-shopy a kavárny. Místo prokrastinace na YouTube dělám vizuály a peníze přijdou. Cenotvorba v e-booku byla pro mě klíčová — sám bych se podcenil.",
  },
];

export function CustomerStories() {
  return (
    <section id="pribehy" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
            03 — Příběhy čtenářů
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            Lidi, co z toho udělali něco svého.
          </h2>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed">
            Žádné motivační videa, žádné garantované „milion za měsíc". Jen lidi, co po práci
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
                Tesař, co rozjel weby pro celou stavbu.
              </h3>
              <div className="text-sm text-ink/60 mb-6">
                {FEATURED.name}, {FEATURED.age} · {FEATURED.role}
              </div>
              <div className="space-y-4 text-ink/85 leading-relaxed text-[17px]">
                {FEATURED.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
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
                Pokud tě e-book někam posunul, podělej se. Pomáhá to ostatním překonat „není to
                pro mě" moment.
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
