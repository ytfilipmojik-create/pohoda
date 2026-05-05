type Color = "gold" | "navy" | "white";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "w-20 h-20 text-[10px]",
  md: "w-28 h-28 text-[11px]",
  lg: "w-36 h-36 text-sm",
};

const COLORS: Record<Color, string> = {
  gold: "bg-gradient-to-br from-gold to-amber-400 text-navy",
  navy: "bg-navy text-gold border-2 border-gold/40",
  white: "bg-white text-navy border-2 border-gold",
};

type Props = {
  children: React.ReactNode;
  color?: Color;
  size?: Size;
  rotate?: number;
  className?: string;
  wobble?: boolean;
};

export function Sticker({
  children,
  color = "gold",
  size = "md",
  rotate = -8,
  className = "",
  wobble = false,
}: Props) {
  return (
    <div
      className={`${SIZES[size]} ${COLORS[color]} ${className} rounded-full flex items-center justify-center font-extrabold uppercase tracking-wider text-center leading-[1.1] shadow-[0_15px_40px_rgba(255,186,8,0.4)] px-2 ${
        wobble ? "sticker-wobble" : ""
      }`}
      style={
        wobble
          ? ({ ["--rot" as string]: `${rotate}deg`, transform: `rotate(${rotate}deg)` } as React.CSSProperties)
          : { transform: `rotate(${rotate}deg)` }
      }
    >
      {children}
    </div>
  );
}
