import Link from "next/link";
import { SignupForm } from "./SignupForm";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-3 text-sm text-ink/70">
        <div>
          <div className="font-bold text-ink mb-2">pohoda z domova</div>
          <p className="mb-4">Praktické AI e-booky pro pracující lidi.</p>
          <SignupForm source="footer" />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/obchodni-podminky" className="hover:text-ink">
            Obchodní podmínky
          </Link>
          <Link href="/gdpr" className="hover:text-ink">
            Ochrana údajů
          </Link>
          <Link href="/kontakt" className="hover:text-ink">
            Kontakt
          </Link>
        </div>
        <div className="text-xs">
          © {new Date().getFullYear()} pohoda z domova
          <br />
          Filip Mojík, IČ: [doplnit]
          <br />
          Nejsme plátci DPH.
        </div>
      </div>
    </footer>
  );
}
