import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StickyHeader } from "@/components/shared/StickyHeader";
import { Footer } from "@/components/shared/Footer";
import { GA4 } from "@/components/tracking/GA4";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "pohoda z domova — moderní přívýdělek s AI",
  description: "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-cream text-ink font-sans antialiased min-h-screen flex flex-col">
        <GA4 />
        <MetaPixel />
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
