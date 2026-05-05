import { Hero } from "@/components/landing/Hero";
import { Reviews } from "@/components/landing/Reviews";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { BundleOffer } from "@/components/landing/BundleOffer";
import { AuthorSection } from "@/components/landing/AuthorSection";
import { AiToolsReveal } from "@/components/landing/AiToolsReveal";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { StickyBuyBar } from "@/components/landing/StickyBuyBar";

export default function Home() {
  return (
    <>
      <Hero />
      <Reviews />
      <ProblemSection />
      <WhatYouGet />
      <BundleOffer />
      <AuthorSection />
      <AiToolsReveal />
      <FAQSection />
      <FinalCTA />
      <StickyBuyBar />
    </>
  );
}
