import { ProductDetail } from "@/components/product/ProductDetail";

export const metadata = {
  title: "AI weby pro malé firmy",
  description:
    "Postav za večer profesionální web pro místní firmu. Workflow: brief → AI návrh → Framer/Webflow → klient.",
};

export default function Page() {
  return (
    <ProductDetail
      number="03"
      slug="ai-weby"
      title="AI weby pro malé firmy"
      subtitle="Postav za večer profesionální web pro místní firmu. Lokální firmy, řemeslníci, restaurace, kadeřnictví — všichni potřebují web."
      outcomes={[
        "Šablona prodejního pitche pro místní firmy",
        "AI generování copy + design",
        "Framer/Webflow pro non-tech klienty",
        "Cenotvorba — proč nesoutěžit s low-cost",
        "Údržba a upsell pro stálý cash flow",
        "Časté chyby, které brzdí cash flow",
      ]}
      review={{
        name: "Martin Š.",
        role: "OSVČ, hledá další nohu",
        text: "Bonus o sehnání klientů stojí sám za balíček. Cold-email funnel jsem rozjel do dvou dnů.",
      }}
      faq={[
        { q: "Musím umět kódit?", a: "Ne. Framer/Webflow drag & drop. AI generuje obsah." },
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
  );
}
