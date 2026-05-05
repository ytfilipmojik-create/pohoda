import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Logo className="text-xl" />
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/#co-dostanes" className="text-ink/70 hover:text-navy transition">
            E-booky
          </Link>
          <Link href="/#nastroje" className="text-ink/70 hover:text-navy transition">
            AI nástroje
          </Link>
          <Link href="/#pribehy" className="text-ink/70 hover:text-navy transition">
            Příběhy
          </Link>
          <Link href="/#kontakt" className="text-ink/70 hover:text-navy transition">
            Kontakt
          </Link>
        </nav>
        <Link
          href="/#balicek"
          className="rounded-xl bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-navy/90 transition shadow-sm"
        >
          Balíček 999 Kč
        </Link>
      </div>
    </header>
  );
}
