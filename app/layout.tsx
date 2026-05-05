import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PromoTopBar } from "@/components/landing/PromoTopBar";
import { StickyHeader } from "@/components/shared/StickyHeader";
import { Footer } from "@/components/shared/Footer";
import { GA4 } from "@/components/tracking/GA4";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pohodazdomova.cz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "pohoda z domova — moderní přívýdělek s AI",
    template: "%s — pohoda z domova",
  },
  description:
    "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "pohoda z domova",
    title: "pohoda z domova — moderní přívýdělek s AI",
    description:
      "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "pohoda z domova — moderní přívýdělek s AI",
    description:
      "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-cream text-ink font-sans antialiased min-h-screen flex flex-col">
        <GA4 />
        <MetaPixel />
        <PromoTopBar />
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
