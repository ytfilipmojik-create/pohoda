import { ProductHero } from "@/components/product/ProductHero";
import { FAQ } from "@/components/shared/FAQ";

export const metadata = { title: "AI weby pro malé firmy — pohoda z domova" };

export default function Page() {
  return (
    <>
      <ProductHero
        productSlug="ai-weby"
        title="AI weby pro malé firmy"
        subtitle="Postav za večer profesionální web pro místní firmu. Cenovka projektu se obvykle pohybuje v desítkách tisíc Kč."
        bullets={[
          "Cílovka: lokální firmy, řemeslníci, restaurace, kadeřnictví — všichni potřebují web",
          "Workflow: brief → AI návrh → Framer/Webflow → klient",
          "Vyšší marže než UGC nebo grafika",
        ]}
        outcomes={[
          "Šablona prodejního pitche pro místní firmy",
          "AI generování copy + design",
          "Framer/Webflow pro non-tech klienty",
          "Cenotvorba — proč nesoutěžit s low-cost",
          "Údržba a upsell pro stálý cash flow",
          "Časté chyby, které brzdí cash flow",
        ]}
        priceKc={399}
      />
      <FAQ
        items={[
          { q: "Musím umět kódit?", a: "Ne. Framer/Webflow drag&drop. AI generuje obsah." },
          {
            q: "Najdu klienty?",
            a: "Návod na sehnání prvních zakázek je v bonus e-booku, který je v balíčku.",
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
