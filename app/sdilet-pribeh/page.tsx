import Link from "next/link";
import { ShareStoryForm } from "@/components/share/ShareStoryForm";

export const metadata = {
  title: "Sdílej svůj příběh",
  description:
    "Pokud ti e-book pomohl posunout se, podělej se o svou cestu. Pomůže to dalším lidem rozhodnout se.",
};

export default function SdiletPribeh() {
  return (
    <article className="bg-cream py-20">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-navy mb-8"
        >
          <span>←</span> Zpět na hlavní
        </Link>

        <div className="text-xs uppercase tracking-[0.2em] text-gold font-extrabold mb-4">
          Sdílej svůj příběh
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight mb-5">
          Jsi spokojený?
          <br />
          Podělej se.
        </h1>
        <p className="text-lg text-ink/75 leading-relaxed mb-10">
          Pomůže to dalším lidem překonat „není to pro mě" moment. Krátká recenze stačí, ale
          pokud máš celý příběh, ještě lepší. Píšu ti zpátky osobně.
        </p>

        <ShareStoryForm />
      </div>
    </article>
  );
}
