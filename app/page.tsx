import { Hero } from "@/components/landing/Hero";
import { Reviews } from "@/components/landing/Reviews";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { CustomerStories } from "@/components/landing/CustomerStories";
import { AuthorSection } from "@/components/landing/AuthorSection";
import { AiToolsReveal } from "@/components/landing/AiToolsReveal";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactInline } from "@/components/landing/ContactInline";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Reviews />
      <ProblemSection />
      <WhatYouGet />
      <CustomerStories />
      <AuthorSection />
      <AiToolsReveal />
      <FAQSection />
      <ContactInline />
      <FinalCTA />
    </>
  );
}
