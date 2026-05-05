import { ProductDetail } from "@/components/product/ProductDetail";

export const metadata = {
  title: "AI grafika a vizuály",
  description:
    "Vytvářej profesionální grafiku bez Photoshopu, jen s AI a Canvou. Prodávej lokálním firmám.",
};

export default function Page() {
  return (
    <ProductDetail
      number="02"
      slug="ai-grafika"
      title="AI grafika a vizuály"
      subtitle="Profesionální grafika bez Photoshopu. AI udělá zbytek. Cílovka: malé firmy, OSVČ, e-shopy — denně potřebují vizuály."
      outcomes={[
        "MidJourney + Canva — workflow profi vizuálů",
        "Logo, sociální sítě, bannery, produktové fotky",
        "Cenotvorba — co stojí jednotlivé typy zakázek",
        "Najít prvních 5 klientů (a co jim nabídnout)",
        "Šablony promptů, které šetří hodiny",
        "Časté chyby, které klienty odradí",
      ]}
      review={{
        name: "Veronika H.",
        role: "Mateřská, doplňuje příjem",
        text: "Za týden jsem rozjela první zakázku přes AI. Jasný návod, žádná voda.",
      }}
      faq={[
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
  );
}
