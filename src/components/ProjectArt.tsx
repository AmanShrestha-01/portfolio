import type { ProjectArtKind } from '../data/content'

// Line art for each project card header — a quiet visual cue for what the project
// is, in place of a big index number. Deterministic: no randomness at render.
export default function ProjectArt({ kind }: { kind: ProjectArtKind }) {
  const common = {
    viewBox: '0 0 240 120',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1,
    strokeLinecap: 'round' as const,
    className:
      'absolute right-0 bottom-0 h-full w-[68%] text-white/25 transition-[transform,color] duration-700 ease-out group-hover:text-white/40 group-hover:-translate-y-1',
  }

  if (kind === 'agents') {
    // negotiating agents: two columns of nodes, every pair connected
    const left = [26, 52, 78, 104]
    const right = [34, 66, 98]
    return (
      <svg aria-hidden {...common}>
        {left.map((y) =>
          right.map((ry) => <line key={`${y}-${ry}`} x1={62} y1={y} x2={178} y2={ry} opacity={0.35} />)
        )}
        {left.map((y) => (
          <circle key={`l${y}`} cx={62} cy={y} r={4.5} fill="currentColor" stroke="none" opacity={0.8} />
        ))}
        {right.map((y) => (
          <circle key={`r${y}`} cx={178} cy={y} r={5.5} fill="none" />
        ))}
      </svg>
    )
  }

  if (kind === 'model') {
    // scatter with a fitted line: a model separating two classes
    const pts = [
      [56, 92], [72, 84], [88, 88], [96, 70], [112, 74], [126, 62],
      [140, 58], [152, 46], [168, 50], [182, 36], [196, 40], [206, 28],
      [70, 60], [92, 46], [116, 40], [148, 30],
    ]
    return (
      <svg aria-hidden {...common}>
        <path d="M48 100 C 96 88, 150 56, 214 24" opacity={0.9} />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.6} fill={i % 3 ? 'currentColor' : 'none'} stroke="currentColor" opacity={0.75} />
        ))}
      </svg>
    )
  }

  if (kind === 'realtime') {
    // live message traffic
    return (
      <svg aria-hidden {...common}>
        <path
          d="M40 60 h22 l8 -26 l10 52 l9 -38 l11 26 l8 -14 h18 l9 -30 l10 46 l9 -22 l8 10 h24 l9 -18 l9 28 h20"
          opacity={0.9}
        />
        <line x1={40} y1={96} x2={214} y2={96} opacity={0.25} />
      </svg>
    )
  }

  if (kind === 'board') {
    // an 8×8 board, part-filled
    const cells = []
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++)
        if ((r + c) % 2 === 0)
          cells.push(<rect key={`${r}-${c}`} x={72 + c * 13} y={8 + r * 13} width={13} height={13} fill="currentColor" stroke="none" opacity={0.28} />)
    return (
      <svg aria-hidden {...common}>
        {cells}
        <rect x={72} y={8} width={104} height={104} opacity={0.5} />
      </svg>
    )
  }

  if (kind === 'llm') {
    // a document being read, and a reply
    return (
      <svg aria-hidden {...common}>
        <rect x={52} y={18} width={72} height={88} rx={4} opacity={0.6} />
        {[34, 48, 62, 76, 90].map((y, i) => (
          <line key={y} x1={64} y1={y} x2={i % 2 ? 100 : 112} y2={y} opacity={0.5} />
        ))}
        <path d="M138 44 h58 a4 4 0 0 1 4 4 v34 a4 4 0 0 1 -4 4 h-42 l-14 12 v-12 a4 4 0 0 1 -4 -4 v-34 a4 4 0 0 1 2 -4 z" opacity={0.75} />
        <circle cx={160} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={172} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={184} cy={66} r={2.5} fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (kind === 'web') {
    // a page and its layout
    return (
      <svg aria-hidden {...common}>
        <rect x={48} y={16} width={160} height={92} rx={6} opacity={0.7} />
        <line x1={48} y1={36} x2={208} y2={36} opacity={0.5} />
        <circle cx={60} cy={26} r={2.4} fill="currentColor" stroke="none" opacity={0.7} />
        <circle cx={70} cy={26} r={2.4} fill="currentColor" stroke="none" opacity={0.7} />
        <rect x={60} y={48} width={60} height={48} rx={3} opacity={0.45} />
        <line x1={132} y1={54} x2={196} y2={54} opacity={0.45} />
        <line x1={132} y1={68} x2={180} y2={68} opacity={0.45} />
        <line x1={132} y1={82} x2={190} y2={82} opacity={0.45} />
      </svg>
    )
  }

  // 'api' — a request meeting an endpoint, and the stack behind it
  return (
    <svg aria-hidden {...common}>
      <path d="M40 60 h56" opacity={0.8} />
      <path d="M88 53 l9 7 l-9 7" opacity={0.8} />
      <rect x={104} y={26} width={64} height={68} rx={6} opacity={0.7} />
      {[44, 60, 76].map((y) => (
        <line key={y} x1={118} y1={y} x2={154} y2={y} opacity={0.45} />
      ))}
      <ellipse cx={200} cy={40} rx={18} ry={7} opacity={0.6} />
      <path d="M182 40 v34 c0 4 8 7 18 7 s18 -3 18 -7 v-34" opacity={0.6} />
      <path d="M182 58 c0 4 8 7 18 7 s18 -3 18 -7" opacity={0.4} />
    </svg>
  )
}
