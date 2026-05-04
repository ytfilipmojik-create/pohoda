import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline gap-1 font-extrabold tracking-tight text-navy ${className}`}
    >
      <span>pohoda</span>
      <span className="text-gold">z domova</span>
    </Link>
  );
}
