import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-extrabold text-white text-lg mb-2">
            pohoda <span className="text-gold">z domova</span>
          </div>
          <p className="text-sm leading-relaxed">
            Praktické AI e-booky pro pracující lidi, kteří se chtějí naučit přivydělat z domova.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/40 font-bold mb-4">
            Web
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/#co-dostanes" className="hover:text-white transition">
              E-booky
            </Link>
            <Link href="/#pribehy" className="hover:text-white transition">
              Příběhy čtenářů
            </Link>
            <Link href="/pribeh" className="hover:text-white transition">
              Můj příběh
            </Link>
            <Link href="/sdilet-pribeh" className="hover:text-white transition">
              Sdílet příběh
            </Link>
            <Link href="/#kontakt" className="hover:text-white transition">
              Kontakt
            </Link>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/40 font-bold mb-4">
            Právní
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/obchodni-podminky" className="hover:text-white transition">
              Obchodní podmínky
            </Link>
            <Link href="/gdpr" className="hover:text-white transition">
              Ochrana údajů
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} pohoda z domova · Filip Mojík, IČ: [doplnit] · Nejsme
            plátci DPH.
          </div>
          <div>Made with care.</div>
        </div>
      </div>
    </footer>
  );
}
