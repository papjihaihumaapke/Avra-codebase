/**
 * Neutral, lightweight placeholder imagery (inline SVG, zero network cost).
 * Abstract architectural planes in brand neutrals. Replace with real project images.
 */
export function PlaceholderArt({ variant, label = 'Placeholder image', className = '' }: { variant: number; label?: string; className?: string }) {
  const v = ((variant - 1) % 4) + 1
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={`block h-full w-full ${className}`}
    >
      <rect width="800" height="600" fill="var(--color-shadow)" />
      {v === 1 && (
        <>
          <rect x="0" y="380" width="800" height="220" fill="var(--color-paper)" />
          <rect x="120" y="120" width="300" height="260" fill="var(--color-bone)" />
          <polygon points="420,120 520,180 520,440 420,380" fill="var(--color-paper)" />
          <polygon points="120,380 420,380 640,600 340,600" fill="var(--color-graphite)" opacity="0.08" />
        </>
      )}
      {v === 2 && (
        <>
          <rect x="0" y="0" width="800" height="600" fill="var(--color-paper)" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={140 + i * 90} y={460 - i * 70} width="120" height="18" fill="var(--color-bone)" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <polygon
              key={i}
              points={`${150 + i * 90},${478 - i * 70} ${260 + i * 90},${478 - i * 70} ${330 + i * 90},${560 - i * 70} ${220 + i * 90},${560 - i * 70}`}
              fill="var(--color-graphite)"
              opacity="0.07"
            />
          ))}
        </>
      )}
      {v === 3 && (
        <>
          <rect x="0" y="0" width="800" height="600" fill="var(--color-bone)" />
          <polygon points="0,0 260,0 620,600 360,600" fill="var(--color-graphite)" opacity="0.06" />
          <polygon points="360,0 440,0 800,600 720,600" fill="var(--color-graphite)" opacity="0.06" />
          <circle cx="560" cy="220" r="90" fill="var(--color-paper)" />
        </>
      )}
      {v === 4 && (
        <>
          <rect x="0" y="0" width="800" height="600" fill="var(--color-paper)" />
          <rect x="460" y="0" width="80" height="600" fill="var(--color-bone)" />
          <polygon points="540,0 600,0 800,340 800,440" fill="var(--color-graphite)" opacity="0.07" />
          <rect x="0" y="470" width="800" height="1" fill="var(--color-graphite)" opacity="0.2" />
          <rect x="120" y="300" width="220" height="170" fill="var(--color-bone)" />
          <polygon points="340,300 400,330 400,470 340,470" fill="var(--color-shadow)" />
        </>
      )}
      <text
        x="24"
        y="572"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="16"
        letterSpacing="2"
        fill="var(--color-stone-ink)"
      >
        [IMAGE]
      </text>
    </svg>
  )
}
