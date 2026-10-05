import type { CSSProperties, ReactNode } from 'react'
import type { ProjectArtKind } from '../data/content'

// Animated header visualisation for each project card: a small looping diagram of
// what the system actually does. Pure SVG — motion comes from the .viz-* keyframes
// in index.css plus SMIL packets, so nine of these cost almost nothing.

const ICE = '#a9c4dc'
const LINE = 'rgba(255,255,255,0.2)'
const SOFT = 'rgba(255,255,255,0.1)'
const INK = 'rgba(237,237,239,0.85)'

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 560 230"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="viz absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    >
      {children}
    </svg>
  )
}

/* a dot that rides a path forever */
function Packet({ d, dur = 2.4, begin = 0, r = 2.6, fill = ICE }: { d: string; dur?: number; begin?: number; r?: number; fill?: string }) {
  return (
    <circle r={r} fill={fill} className="viz-packet">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
    </circle>
  )
}

function Label({ x, y, children, anchor = 'middle' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill="rgba(255,255,255,0.38)" stroke="none" fontSize="8" letterSpacing="1.6" fontFamily="'Geist Mono', monospace">
      {children}
    </text>
  )
}

function Agents() {
  const patients = [72, 104, 136, 168]
  const agents = [58, 89, 120, 151, 182]
  const beds = [82, 120, 158]
  const a = (y1: number, y2: number) => `M92 ${y1} L268 ${y2}`
  const b = (y1: number, y2: number) => `M292 ${y1} L466 ${y2}`
  return (
    <Frame>
      {patients.flatMap((p) => agents.map((g) => <path key={`${p}-${g}`} d={a(p, g)} stroke={SOFT} />))}
      {agents.flatMap((g) => beds.map((h) => <path key={`${g}-${h}`} d={b(g, h)} stroke={SOFT} />))}
      {patients.map((y, i) => (
        <circle key={y} cx={82} cy={y} r={5} fill={INK} className="viz-pulse" style={delay(i * 0.4)} />
      ))}
      {agents.map((y, i) => (
        <g key={y}>
          <circle cx={280} cy={y} r={10} stroke={ICE} strokeOpacity={0.55} />
          <circle cx={280} cy={y} r={4} fill={ICE} className="viz-pulse" style={delay(i * 0.3)} />
        </g>
      ))}
      {beds.map((y) => (
        <g key={y}>
          <rect x={466} y={y - 11} width={22} height={22} rx={5} stroke={LINE} fill="rgba(255,255,255,0.04)" />
          <path d={`M477 ${y - 5}V${y + 5}M472 ${y}H482`} stroke={INK} strokeWidth={1.4} />
        </g>
      ))}
      <Packet d={a(72, 89)} begin={0} />
      <Packet d={a(104, 151)} begin={0.5} />
      <Packet d={a(136, 58)} begin={1.0} />
      <Packet d={a(168, 120)} begin={1.5} />
      <Packet d={a(104, 182)} begin={2.0} />
      <Packet d={b(89, 82)} begin={0.9} fill="#fff" />
      <Packet d={b(151, 158)} begin={1.4} fill="#fff" />
      <Packet d={b(58, 120)} begin={1.9} fill="#fff" />
      <Packet d={b(120, 82)} begin={2.4} fill="#fff" />
      <Label x={82} y={216}>PATIENTS</Label>
      <Label x={280} y={216}>AGENTS NEGOTIATE</Label>
      <Label x={477} y={216}>BEDS</Label>
    </Frame>
  )
}

function Commerce() {
  const xs = [52, 180, 308, 436]
  const names = ['CART', 'ORDER', 'STRIPE', 'PAID']
  return (
    <Frame>
      {xs.slice(0, -1).map((x, i) => (
        <g key={x}>
          <path d={`M${x + 72} 122H${x + 128}`} stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
          <Packet d={`M${x + 72} 122H${x + 128}`} dur={1.2} begin={i * 1.2} />
        </g>
      ))}
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y={88} width={72} height={68} rx={12} stroke={LINE} fill="rgba(255,255,255,0.035)" />
          <rect x={x} y={88} width={72} height={68} rx={12} stroke={ICE} className="viz-seq" style={delay(i * 1.2)} />
          <Label x={x + 36} y={178}>{names[i]}</Label>
        </g>
      ))}
      {/* cart */}
      <path d="M72 110h6l5 20h18l4-14H80" stroke={INK} strokeWidth={1.4} />
      <circle cx={85} cy={137} r={2} fill={INK} />
      <circle cx={99} cy={137} r={2} fill={INK} />
      {/* order */}
      <path d="M202 108h28M202 120h28M202 132h18" stroke={INK} strokeWidth={1.4} />
      {/* card */}
      <rect x={326} y={108} width={36} height={26} rx={4} stroke={INK} strokeWidth={1.4} />
      <path d="M326 117h36" stroke={INK} strokeWidth={1.4} />
      {/* paid */}
      <circle cx={472} cy={122} r={15} stroke={ICE} strokeOpacity={0.6} />
      <path d="M464 122l6 6 11-12" stroke={ICE} strokeWidth={2} pathLength={1} className="viz-draw" />
    </Frame>
  )
}

function Realtime() {
  const left = [84, 122, 160]
  const right = [84, 122, 160]
  return (
    <Frame>
      {left.map((y) => (
        <path key={y} d={`M70 ${y}L176 122`} stroke={SOFT} />
      ))}
      {right.map((y) => (
        <path key={y} d={`M384 122L490 ${y}`} stroke={SOFT} />
      ))}
      <path d="M208 122H352" stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
      {left.map((y, i) => (
        <circle key={y} cx={64} cy={y} r={6} fill={INK} className="viz-pulse" style={delay(i * 0.5)} />
      ))}
      {right.map((y, i) => (
        <circle key={y} cx={496} cy={y} r={6} fill={INK} className="viz-pulse" style={delay(0.8 + i * 0.5)} />
      ))}
      {[176, 352].map((x) => (
        <rect key={x} x={x} y={102} width={32} height={40} rx={7} stroke={LINE} fill="rgba(255,255,255,0.04)" />
      ))}
      <path d="M184 114h16M184 122h16M184 130h16M360 114h16M360 122h16M360 130h16" stroke={INK} strokeWidth={1.2} />
      <rect x={266} y={108} width={28} height={28} rx={5} transform="rotate(45 280 122)" stroke={ICE} fill="rgba(169,196,220,0.1)" />
      <circle cx={280} cy={122} r={4} fill={ICE} className="viz-pulse" />
      <Packet d="M64 84L176 122H384L496 84" dur={2.6} />
      <Packet d="M64 84L176 122H384L496 122" dur={2.6} />
      <Packet d="M64 84L176 122H384L496 160" dur={2.6} />
      <Packet d="M496 160L384 122H176L64 122" dur={2.6} begin={1.3} fill="#fff" />
      <Packet d="M496 160L384 122H176L64 160" dur={2.6} begin={1.3} fill="#fff" />
      <Label x={64} y={190}>CLIENTS</Label>
      <Label x={192} y={162}>SERVER A</Label>
      <Label x={280} y={162}>REDIS</Label>
      <Label x={368} y={162}>SERVER B</Label>
      <Label x={496} y={190}>CLIENTS</Label>
    </Frame>
  )
}

function Model() {
  const cols = 30
  const rows = 6
  const fraud = new Set([37, 81, 112, 154, 169])
  const SWEEP = 5
  return (
    <Frame>
      {Array.from({ length: cols * rows }, (_, i) => {
        const x = 32 + (i % cols) * 17.1
        const y = 76 + Math.floor(i / cols) * 19
        const hit = fraud.has(i)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={hit ? 3.4 : 2.4}
            fill={hit ? ICE : '#ededef'}
            className={hit ? 'viz-flag' : 'viz-tick'}
            style={delay((x / 560) * SWEEP)}
          />
        )
      })}
      <g className="viz-scan">
        <rect x={-40} y={62} width={40} height={124} fill="url(#scan)" />
        <path d="M0 58V190" stroke="#fff" strokeWidth={1.2} />
      </g>
      <defs>
        <linearGradient id="scan" x1="0" x2="1">
          <stop offset="0" stopColor={ICE} stopOpacity="0" />
          <stop offset="1" stopColor={ICE} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <Label x={32} y={214} anchor="start">SCORING TRANSACTIONS</Label>
      <circle cx={434} cy={211} r={3} fill={ICE} stroke="none" />
      <Label x={528} y={214} anchor="end">FLAGGED FRAUD</Label>
    </Frame>
  )
}

function Board() {
  const S = 17
  const bx = 212
  const by = 56
  const pieces: [string, number, number][] = [
    ['♚', 4, 0], ['♜', 0, 0], ['♛', 3, 1], ['♟', 5, 1], ['♟', 6, 2],
    ['♙', 2, 5], ['♙', 5, 6], ['♖', 7, 7], ['♔', 6, 7], ['♕', 3, 6],
  ]
  const features = ['RATING GAP', 'TIME CONTROL', 'WHITE ELO']
  const outcomes: [string, string, string][] = [['WHITE', '0.3', '0.8'], ['DRAW', '0.12', '0.2'], ['BLACK', '0.6', '0.25']]
  return (
    <Frame>
      {features.map((f, i) => (
        <g key={f}>
          <rect x={30} y={78 + i * 34} width={104} height={22} rx={11} stroke={LINE} fill="rgba(255,255,255,0.035)" />
          <Label x={82} y={92 + i * 34}>{f}</Label>
          <path d={`M134 ${89 + i * 34}C170 ${89 + i * 34} 170 124 206 124`} stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
          <Packet d={`M134 ${89 + i * 34}C170 ${89 + i * 34} 170 124 206 124`} dur={1.8} begin={i * 0.6} />
        </g>
      ))}
      {Array.from({ length: 64 }, (_, i) => {
        const c = i % 8
        const r = Math.floor(i / 8)
        return (c + r) % 2 ? <rect key={i} x={bx + c * S} y={by + r * S} width={S} height={S} fill="rgba(255,255,255,0.09)" /> : null
      })}
      <rect x={bx} y={by} width={S * 8} height={S * 8} rx={2} stroke={LINE} />
      {pieces.map(([g, c, r]) => (
        <text key={`${g}${c}${r}`} x={bx + c * S + S / 2} y={by + r * S + 13.5} textAnchor="middle" fontSize="14" fill={INK} stroke="none">
          {g}
        </text>
      ))}
      <text x={bx + 1 * S + S / 2} y={by + 7 * S + 13.5} textAnchor="middle" fontSize="14" fill={ICE} stroke="none" className="viz-knight">
        ♘
      </text>
      {outcomes.map(([name, from, to], i) => (
        <g key={name}>
          <Label x={372} y={92 + i * 34} anchor="start">{name}</Label>
          <rect x={372} y={98 + i * 34} width={156} height={5} rx={2.5} fill="rgba(255,255,255,0.08)" />
          <rect
            x={372}
            y={98 + i * 34}
            width={156}
            height={5}
            rx={2.5}
            fill={i === 0 ? ICE : INK}
            className="viz-bar"
            style={{ '--from': from, '--to': to } as CSSProperties}
          />
        </g>
      ))}
      <Label x={82} y={216}>BEFORE MOVE ONE</Label>
      <Label x={450} y={216}>PREDICTED RESULT</Label>
    </Frame>
  )
}

function Llm() {
  const out = [150, 132, 144, 96, 0, 138, 120]
  return (
    <Frame>
      <rect x={52} y={62} width={120} height={136} rx={10} stroke={LINE} fill="rgba(255,255,255,0.035)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M68 ${84 + i * 16}h${[88, 72, 84, 60, 88, 76, 48][i]}`} stroke="rgba(255,255,255,0.3)" strokeWidth={1.6} />
      ))}
      <path d="M172 130H268" stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
      <Packet d="M172 130H268" dur={1.4} />
      <Packet d="M172 130H268" dur={1.4} begin={0.7} />
      <circle cx={220} cy={130} r={13} stroke={ICE} strokeOpacity={0.6} fill="#0a0a0c" />
      <path d="M220 123v14M213 130h14M215 125l10 10M225 125l-10 10" stroke={ICE} strokeWidth={1.2} className="viz-pulse" />
      <rect x={268} y={62} width={240} height={136} rx={10} stroke={ICE} strokeOpacity={0.35} fill="rgba(169,196,220,0.05)" />
      {out.map((w, i) =>
        w ? (
          <rect key={i} x={286} y={80 + i * 15} width={w} height={4} rx={2} fill={i === 0 || i === 5 ? ICE : INK} className="viz-type" style={delay(i * 0.5)} />
        ) : null,
      )}
      <rect x={286} y={184} width={5} height={8} fill={ICE} className="viz-blink" />
      <Label x={112} y={216}>LECTURE NOTES</Label>
      <Label x={388} y={216}>SUMMARY · QUIZ · GUIDE</Label>
    </Frame>
  )
}

function Macros() {
  const rings: [number, string, number][] = [[52, ICE, 0], [38, '#ededef', 0.4], [24, 'rgba(255,255,255,0.5)', 0.8]]
  return (
    <Frame>
      {rings.map(([r, color, d]) => (
        <g key={r} transform="rotate(-90 150 126)">
          <circle cx={150} cy={126} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={7} />
          <circle cx={150} cy={126} r={r} stroke={color} strokeWidth={7} pathLength={1} className="viz-ring" style={delay(d)} />
        </g>
      ))}
      <path d="M214 126H276" stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
      <Packet d="M214 126H276" dur={1.3} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="viz-pop" style={delay(i * 0.7)}>
          <rect x={282} y={66 + i * 42} width={226} height={34} rx={9} stroke={LINE} fill="rgba(255,255,255,0.04)" />
          <rect x={292} y={75 + i * 42} width={16} height={16} rx={4} fill={i === 0 ? ICE : 'rgba(255,255,255,0.3)'} />
          <path d={`M320 ${79 + i * 42}h${[110, 84, 124][i]}M320 ${88 + i * 42}h${[64, 96, 52][i]}`} stroke={INK} strokeWidth={1.5} strokeOpacity={0.7} />
        </g>
      ))}
      <Label x={150} y={216}>MACRO GOALS</Label>
      <Label x={395} y={216}>GENERATED MEAL PLAN</Label>
    </Frame>
  )
}

function Web() {
  return (
    <Frame>
      <rect x={110} y={54} width={340} height={150} rx={12} stroke={LINE} fill="rgba(255,255,255,0.03)" />
      <path d="M110 78H450" stroke={LINE} />
      {[126, 138, 150].map((x) => (
        <circle key={x} cx={x} cy={66} r={2.6} fill="rgba(255,255,255,0.35)" />
      ))}
      <rect x={200} y={61} width={160} height={10} rx={5} fill="rgba(255,255,255,0.07)" />
      <rect x={126} y={90} width={150} height={98} rx={7} fill="rgba(169,196,220,0.16)" className="viz-shimmer" />
      <path d="M126 168l40-34 34 26 26-18 50 40" stroke={ICE} strokeOpacity={0.6} />
      <circle cx={248} cy={110} r={7} stroke={ICE} strokeOpacity={0.6} />
      <rect x={292} y={92} width={110} height={7} rx={3.5} fill={INK} className="viz-type" />
      <rect x={292} y={106} width={78} height={5} rx={2.5} fill="rgba(255,255,255,0.35)" className="viz-type" style={delay(0.4)} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="viz-pop" style={delay(0.8 + i * 0.5)}>
          <rect x={292 + i * 48} y={124} width={40} height={46} rx={6} stroke={LINE} fill="rgba(255,255,255,0.05)" />
          <rect x={298 + i * 48} y={130} width={28} height={18} rx={3} fill="rgba(255,255,255,0.16)" />
          <path d={`M298 ${156}h20`} transform={`translate(${i * 48} 0)`} stroke={INK} strokeWidth={1.4} />
        </g>
      ))}
      <rect x={292} y={178} width={56} height={12} rx={6} fill={ICE} className="viz-pulse-soft" />
      <path d="M0 0l0 15 4-4 3 7 3-1-3-7 6 0z" fill="#fff" stroke="#060607" strokeWidth={0.8} className="viz-cursor" />
    </Frame>
  )
}

function Api() {
  const routes: [string, string][] = [['GET', '/bookmarks'], ['POST', '/bookmarks'], ['PUT', '/bookmarks/:id'], ['DELETE', '/bookmarks/:id']]
  return (
    <Frame>
      {routes.map(([method, path], i) => (
        <g key={method}>
          <rect x={36} y={62 + i * 33} width={176} height={25} rx={7} stroke={LINE} fill="rgba(255,255,255,0.035)" />
          <rect x={36} y={62 + i * 33} width={176} height={25} rx={7} stroke={ICE} fill="rgba(169,196,220,0.1)" className="viz-seq" style={delay(i * 1.2)} />
          <text x={48} y={78.5 + i * 33} fill={ICE} stroke="none" fontSize="9" fontFamily="'Geist Mono', monospace" fontWeight="600">
            {method}
          </text>
          <text x={92} y={78.5 + i * 33} fill="rgba(255,255,255,0.6)" stroke="none" fontSize="9" fontFamily="'Geist Mono', monospace">
            {path}
          </text>
        </g>
      ))}
      <path d="M212 124H292" stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
      <path d="M348 124H428" stroke={LINE} strokeDasharray="3 6" className="viz-flow" />
      <Packet d="M212 124H292" dur={1.2} />
      <Packet d="M348 124H428" dur={1.2} begin={0.6} fill="#fff" />
      {/* JWT gate */}
      <circle cx={320} cy={124} r={28} stroke={ICE} strokeOpacity={0.45} fill="rgba(169,196,220,0.06)" />
      <rect x={309} y={122} width={22} height={17} rx={3.5} stroke={INK} strokeWidth={1.4} />
      <path d="M313 122v-6a7 7 0 0114 0v6" stroke={INK} strokeWidth={1.4} />
      <circle cx={320} cy={130.5} r={2} fill={ICE} className="viz-pulse" />
      {/* database */}
      <ellipse cx={468} cy={98} rx={38} ry={11} stroke={INK} strokeOpacity={0.7} />
      <path d="M430 98v52c0 6 17 11 38 11s38-5 38-11V98" stroke={INK} strokeOpacity={0.7} />
      <path d="M430 124c0 6 17 11 38 11s38-5 38-11" stroke={LINE} />
      <Label x={124} y={216}>REST ENDPOINTS</Label>
      <Label x={320} y={216}>JWT AUTH</Label>
      <Label x={468} y={216}>PER-USER ROWS</Label>
    </Frame>
  )
}

export default function ProjectArt({ kind }: { kind: ProjectArtKind }) {
  switch (kind) {
    case 'agents':
      return <Agents />
    case 'commerce':
      return <Commerce />
    case 'realtime':
      return <Realtime />
    case 'model':
      return <Model />
    case 'board':
      return <Board />
    case 'llm':
      return <Llm />
    case 'macros':
      return <Macros />
    case 'web':
      return <Web />
    default:
      return <Api />
  }
}
