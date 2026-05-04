import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function StickyHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Logo className="text-lg" />
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pribeh" className="text-ink/70 hover:text-ink">
            Příběh
          </Link>
          <Link
            href="/bundle"
            className="rounded-md bg-navy text-white px-3 py-1.5 hover:bg-navy/90"
          >
            Balíček 999 Kč
          </Link>
        </nav>
      </div>
    </header>
  );
}
