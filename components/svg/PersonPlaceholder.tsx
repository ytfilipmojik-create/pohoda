type Props = {
  imageSrc?: string;
  size?: number;
  alt?: string;
  className?: string;
};

/**
 * Kruhový placeholder pro fotku osoby. Dokud chybí `imageSrc`, vykreslí
 * SVG siluetu (cream pozadí, navy obrys). Po dodání obrázku se SVG zaměni.
 */
export function PersonPlaceholder({
  imageSrc,
  size = 160,
  alt = "Filip",
  className = "",
}: Props) {
  if (imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={alt}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 20px 40px rgba(26,31,58,0.2)",
        }}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: "50%", filter: "drop-shadow(0 20px 40px rgba(26,31,58,0.2))" }}
      role="img"
      aria-label={`${alt} (placeholder)`}
    >
      <defs>
        <linearGradient id="person-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f5f5f3" />
          <stop offset="1" stopColor="#e8e8e3" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#person-bg)" />
      <circle cx="80" cy="65" r="24" fill="#1a1f3a" opacity="0.85" />
      <path
        d="M 30 145 Q 30 100 80 100 Q 130 100 130 145 Z"
        fill="#1a1f3a"
        opacity="0.85"
      />
      <circle cx="80" cy="80" r="78" fill="none" stroke="#ffba08" strokeWidth="2" />
    </svg>
  );
}
