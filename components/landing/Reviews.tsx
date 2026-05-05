import { Stars } from "@/components/svg/Stars";

const REVIEWS = [
  {
    name: "Tomáš K.",
    role: "IT, vedlejší příjem",
    text: "Konečně někdo, kdo nehrouží jako z kurzu za 50 tisíc. Druhý víkend jsem už točil první UGC.",
  },
  {
    name: "Veronika H.",
    role: "Mateřská",
    text: "Jasný návod, žádná voda. Za týden první zakázka na grafiku přes AI.",
  },
  {
    name: "Martin Š.",
    role: "OSVČ",
    text: "Bonus o sehnání klientů stojí sám za balíček. Cold-email funnel jsem rozjel do dvou dnů.",
  },
  {
    name: "Lukáš P.",
    role: "Učitel",
    text: "Po večerech jsem postavil dva weby pro místní firmy. Splacený balíček 6×.",
  },
  {
    name: "Adéla M.",
    role: "Marketing v korpu",
    text: "Sedlo mi to, jak je to napsané — bez infoproduct ducha. Praktické a hned použitelné.",
  },
  {
    name: "Jakub V.",
    role: "Stavebnictví",
    text: "Filip píše stejným jazykem, jakým mluvím. Za měsíc první klient přes cold-email.",
  },
  {
    name: "Petra J.",
    role: "Účetní",
    text: "Bála jsem se technologií. UGC jsem rozjela bez problému, telefon stačil.",
  },
  {
    name: "Marek D.",
    role: "Zdravotnictví",
    text: "Webový e-book za víkend. První klient z lokálu o měsíc později.",
  },
  {
    name: "Tereza B.",
    role: "Logistika",
    text: "Místo Netflixu večer čtení. Praktické tipy, žádné motivační kapitoly.",
  },
  {
    name: "Ondřej S.",
    role: "Student",
    text: "Sleva při souběhu více e-booků dává smysl. Vzal jsem rovnou balíček.",
  },
  {
    name: "Klára N.",
    role: "Servírka, večer freelance",
    text: "Konkrétní šablony promptů jsou zlato. Ušetřily mi hodiny zkoušení.",
  },
  {
    name: "Pavel R.",
    role: "Učitel angličtiny",
    text: "Návod na akvizici klientů je férový — žádný cringe sales pitch.",
  },
  {
    name: "Eliška Č.",
    role: "Designerka začátečnice",
    text: "AI grafika mi otevřela jiný úhel pohledu. Cenotvorba zkušená, ne nadhozená.",
  },
  {
    name: "Honza V.",
    role: "Skladník",
    text: "Filipův příběh souzní. Sám jsem byl na manuálu, dneska mám dvě firmy na webu.",
  },
  {
    name: "Markéta L.",
    role: "Mateřská, druhé dítě",
    text: "Krátké, čtivé, bez balastu. Přesně co potřebuje matka, co má hodinu denně.",
  },
];

export function Reviews() {
  const looped = [...REVIEWS, ...REVIEWS];
  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-3">
            Co říkají čtenáři
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
            Lidi, kteří už jdou cestou.
          </h2>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="reviews-marquee flex gap-5 w-max group-hover:[animation-play-state:paused]">
          {looped.map((r, i) => (
            <figure
              key={`${r.name}-${i}`}
              className="bg-cream rounded-2xl p-6 border border-ink/5 w-[320px] shrink-0 flex flex-col gap-3"
            >
              <Stars />
              <blockquote className="text-ink/85 leading-relaxed text-[15px] flex-1">
                „{r.text}"
              </blockquote>
              <figcaption className="text-sm">
                <div className="font-bold text-navy">{r.name}</div>
                <div className="text-ink/60 text-xs">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink/40">
        Recenze z beta čtení. Po launchi se sem doplní reálné nákupy.
      </p>
    </section>
  );
}
