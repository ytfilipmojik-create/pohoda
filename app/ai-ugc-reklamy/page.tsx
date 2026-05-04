import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = {
  title: "AI UGC reklamy — pohoda z domova",
  description:
    "Krok za krokem návod, jak vytvářet placené UGC reklamy s AI a prodávat je značkám.",
};

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-ugc-reklamy"
        title="AI UGC reklamy"
        subtitle="Naučíš se točit krátká reklamní videa pomocí AI nástrojů a prodávat je značkám. Bez kamery, bez profi studia."
        bullets={[
          "Aktuální poptávka — značky platí freelancerům za UGC kreativy v rozsahu 1 500–5 000 Kč/video",
          "Žádné drahé vybavení — telefon a AI nástroje stačí",
          "Návod platí pro češtinu i angličtinu",
        ]}
        outcomes={[
          "Naučíš se psát hooky, scripty a CTA pro UGC reklamy",
          "Najít první značky, které platí za UGC tvorbu",
          "Optimalizovat videa podle dat z Meta Ads",
          "Postavit si portfolio za 7 dní",
          "Cenotvorba a balíčky — kolik si účtovat",
          "Časté chyby, které UGC tvůrce stojí klienty",
        ]}
        priceKc={399}
      />
      <FAQ
        items={[
          {
            q: "Potřebuju anglickou výslovnost?",
            a: "Ne. Český trh je hladový. Většinu klientů najdeš v ČR a SR.",
          },
          {
            q: "Jak rychle vyrobím první video?",
            a: "Po pochopení šablony v e-booku zvládneš první kreativu za víkend.",
          },
          {
            q: "Co když to nestihnu nebo se mi nebude líbit?",
            a: "E-book je digitální produkt. Před koupí v checkoutu výslovně souhlasíš s okamžitým plněním. Refund se neřeší.",
          },
        ]}
      />
    </>
  );
}
