export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="inline-flex gap-0.5" aria-label={`${count} z 5 hvězd`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#ffba08">
          <path d="M12 2l2.6 7.4L22 10l-6 4.5L18 22l-6-4-6 4 2-7.5L2 10l7.4-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}
