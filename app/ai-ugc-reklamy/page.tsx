import { ProductDetail } from "@/components/product/ProductDetail";

export const metadata = {
  title: "AI UGC reklamy",
  description:
    "Krok za krokem návod, jak vytvářet placené UGC reklamy s AI a prodávat je značkám.",
};

export default function Page() {
  return (
    <ProductDetail
      number="01"
      slug="ai-ugc-reklamy"
      title="AI UGC reklamy"
      subtitle="Toč krátká reklamní videa pomocí AI nástrojů a prodávej je značkám. Bez kamery, bez profi studia, jen s telefonem."
      outcomes={[
        "Naučíš se psát hooky, scripty a CTA pro UGC reklamy",
        "Najít první značky, které platí za UGC tvorbu",
        "Optimalizovat videa podle dat z Meta Ads",
        "Postavit si portfolio za víkend",
        "Cenotvorba a balíčky — kolik si účtovat",
        "Časté chyby, které UGC tvůrce stojí klienty",
      ]}
      review={{
        name: "Tomáš K.",
        role: "Pracuje v IT, začíná s UGC",
        text: "Druhý víkend jsem už točil první UGC pro místní pekárnu. Brutálně přímočaré, zero waffle.",
      }}
      faq={[
        {
          q: "Potřebuju anglickou výslovnost?",
          a: "Ne. Český trh je hladový. Většinu klientů najdeš v ČR a SR.",
        },
        {
          q: "Jak rychle vyrobím první video?",
          a: "Po pochopení šablony v e-booku zvládneš první kreativu za víkend.",
        },
        {
          q: "Refund?",
          a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním.",
        },
      ]}
    />
  );
}
