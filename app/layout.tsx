import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "pohoda z domova — moderní přívýdělek s AI",
  description: "Praktické e-booky pro pracující lidi, kteří chtějí přivydělat z domova s pomocí AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
