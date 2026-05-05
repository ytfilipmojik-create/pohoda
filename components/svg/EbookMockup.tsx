type Props = {
  number: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  className?: string;
  rotate?: number;
};

/**
 * SVG placeholder pro 3D obálku e-booku. Dokud `imageSrc` není dodán,
 * vykreslí se plnobarevný design (navy + zlatý prouh) s číslem a názvem.
 * Po předání `imageSrc` se SVG vrstva nahradí reálnou obálkou (image fill).
 */
export function EbookMockup({
  number,
  title,
  subtitle = "pohoda z domova",
  imageSrc,
  className = "",
  rotate = -6,
}: Props) {
  const id = `book-${number}`;
  return (
    <div
      className={className}
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: "transform 300ms ease",
        filter: "drop-shadow(0 30px 40px rgba(26,31,58,0.35))",
      }}
    >
      <svg
        viewBox="0 0 240 320"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={`${id}-spine`} x1="0" x2="1">
            <stop offset="0" stopColor="#0d1226" />
            <stop offset="1" stopColor="#1a1f3a" />
          </linearGradient>
          <linearGradient id={`${id}-cover`} x1="0" x2="1">
            <stop offset="0" stopColor="#1a1f3a" />
            <stop offset="1" stopColor="#2d3561" />
          </linearGradient>
          <clipPath id={`${id}-clip`}>
            <rect x="20" y="0" width="220" height="320" rx="2" />
          </clipPath>
        </defs>

        <rect x="12" y="0" width="14" height="320" fill={`url(#${id}-spine)`} />
        <rect x="20" y="0" width="220" height="320" rx="2" fill={`url(#${id}-cover)`} />

        {imageSrc ? (
          <image
            href={imageSrc}
            x="20"
            y="0"
            width="220"
            height="320"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${id}-clip)`}
          />
        ) : (
          <g clipPath={`url(#${id}-clip)`}>
            <rect x="20" y="36" width="220" height="3" fill="#ffba08" />
            <text
              x="35"
              y="80"
              fill="#ffba08"
              fontFamily="Inter, system-ui"
              fontSize="13"
              fontWeight="700"
              letterSpacing="2"
            >
              {number} · PRŮVODCE
            </text>
            <foreignObject x="35" y="98" width="190" height="160">
              <div
                style={{
                  fontFamily: "Inter, system-ui",
                  color: "white",
                  fontSize: 26,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </div>
            </foreignObject>
            <rect x="35" y="270" width="40" height="2" fill="#ffba08" opacity="0.6" />
            <text
              x="35"
              y="294"
              fill="white"
              opacity="0.7"
              fontFamily="Inter, system-ui"
              fontSize="11"
              letterSpacing="1"
            >
              {subtitle}
            </text>
          </g>
        )}

        <rect
          x="20"
          y="0"
          width="220"
          height="320"
          rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
