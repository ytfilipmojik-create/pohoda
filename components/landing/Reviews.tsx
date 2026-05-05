import { Stars } from "@/components/svg/Stars";

const REVIEWS = [
  {
    name: "Tomáš K.",
    role: "Pracuje v IT, začíná s UGC",
    text: "Konečně někdo, kdo nehrouží jako z kurzu za 50 tisíc. Druhý víkend jsem už točil první UGC pro místní pekárnu.",
  },
  {
    name: "Veronika H.",
    role: "Mateřská, doplňuje příjem",
    text: "Jasný návod, žádná voda. Za týden jsem rozjela první zakázku na Canva grafiku přes AI.",
  },
  {
    name: "Martin Š.",
    role: "OSVČ, hledá další nohu",
    text: "Bonusový e-book o sehnání klientů stojí sám za balíček. Jeho cold-email funnel jsem rozjel do dvou dnů.",
  },
];

export function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="bg-cream rounded-2xl p-6 flex flex-col gap-4 border border-ink/5"
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
        <p className="mt-8 text-center text-xs text-ink/50">
          Recenze pochází od prvních beta čtenářů. Po launchi se sem doplní reálné nákupy.
        </p>
      </div>
    </section>
  );
}
