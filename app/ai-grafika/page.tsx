import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "AI grafika a vizuály — pohoda z domova" };

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-grafika"
        title="AI grafika a vizuály"
        subtitle="Vytvářej profesionální grafiku bez Photoshopu. AI udělá zbytek — ty inkasuješ."
        bullets={[
          "Cílovka: malé firmy, OSVČ, e-shopy — denně potřebují vizuály",
          "Žádné designové vzdělání — jen pochopení promptů a šablon",
          "Realistický nástup k prvním zakázkám během několika týdnů",
        ]}
        outcomes={[
          "MidJourney + Canva — workflow profi vizuálů",
          "Logo, sociální sítě, bannery, produktové fotky",
          "Cenotvorba — co stojí jednotlivé typy zakázek",
          "Najít prvních 5 klientů (a co jim nabídnout)",
          "Šablony promptů, které šetří hodiny",
          "Časté chyby, které klienty odradí",
        ]}
        priceKc={399}
      />
      <FAQ
        items={[
          { q: "Musím umět Photoshop?", a: "Ne. AI + Canva pokryje 90 % zakázek." },
          {
            q: "Které AI nástroje?",
            a: "MidJourney, ChatGPT pro prompty, Canva. Vše s aktuálními cenami v e-booku.",
          },
          {
            q: "Refund?",
            a: "E-book je digitální produkt. Před koupí výslovně souhlasíš s okamžitým plněním.",
          },
        ]}
      />
    </>
  );
}
