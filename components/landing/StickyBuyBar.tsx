"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 800);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 bg-white border-t border-ink/10 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <div className="font-bold text-navy text-sm">Balíček 3 e-booků + bonus</div>
          <div className="text-xs text-ink/60">
            <span className="text-gold font-bold">999 Kč</span> místo 1 197 Kč
          </div>
        </div>
        <Link
          href="/checkout?product=bundle"
          className="flex-1 sm:flex-none rounded-xl bg-navy text-white px-5 py-3 font-semibold text-center hover:bg-navy/90 transition"
        >
          Vzít balíček
        </Link>
      </div>
    </div>
  );
}
