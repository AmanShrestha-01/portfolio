import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fraudByScore, legitByScore, fraudModel } from '../data/fraudScores'
import SectionHeading from './SectionHeading'

const ease = [0.16, 1, 0.3, 1] as const

const totalFraud = fraudByScore.reduce((a, b) => a + b, 0)
const totalLegit = legitByScore.reduce((a, b) => a + b, 0)
const total = totalFraud + totalLegit
const fmt = (n: number) => n.toLocaleString('en-US')
const pct = (n: number, digits = 0) => `${(n * 100).toFixed(digits)}%`

// a transaction is flagged when its score is strictly above t/100, as model.predict() does at 50
function evaluate(t: number) {
  let tp = 0
  let fp = 0
  for (let k = t + 1; k <= 100; k++) {
    tp += fraudByScore[k]
    fp += legitByScore[k]
  }
  const fn = totalFraud - tp
  const tn = totalLegit - fp
  const precision = tp + fp > 0 ? tp / (tp + fp) : null
  const recall = tp / totalFraud
  const f1 = precision && recall ? (2 * precision * recall) / (precision + recall) : null
  return { tp, fp, fn, tn, precision, recall, f1, accuracy: (tp + tn) / total }
}

const curve = Array.from({ length: 100 }, (_, t) => evaluate(t))
const baseline = totalLegit / total

const presets = [
  { label: 'Catch more fraud', t: 10 },
  { label: 'Default', t: 50 },
  { label: 'Fewer false alarms', t: 80 },
]

// chart geometry (SVG user units): 101 score bins, fraud dots above the axis, legit bars below
const BIN = 10
const W = 101 * BIN
const AXIS = 150
const H = 330
const STEP = 14
const maxLog = Math.log10(Math.max(...legitByScore) + 1)

export default function ModelLab() {
  const [t, setT] = useState(50)
  const m = curve[t]
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const setFromPointer = (e: ReactPointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * W
    setT(Math.max(0, Math.min(99, Math.round(x / BIN) - 1)))
  }

  const prPath = useMemo(
    () =>
      curve
        .filter((c) => c.precision !== null)
        .map((c, i) => `${i ? 'L' : 'M'}${(c.recall * 100).toFixed(1)} ${(100 - (c.precision ?? 0) * 100).toFixed(1)}`)
        .join(' '),
    [],
  )

  const lineX = (t + 1) * BIN

  return (
    <section id="lab" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          title="Lab"
          statement="Move the threshold. Watch the trade-off."
          subtitle={`My fraud model's real scores on ${fmt(total)} transactions it never trained on — ${totalFraud} of them fraud. Nothing is simulated: drag the line and every number is recomputed from the model's actual predictions.`}
        />

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative glass rounded-3xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-12">
            {/* score distribution + threshold */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:border-r border-white/[0.06]">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                  <p className="eyebrow text-muted mb-2">Flag a transaction when score &gt;</p>
                  <p className="display text-ink text-6xl sm:text-7xl tabular-nums">{(t / 100).toFixed(2)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setT(p.t)}
                      aria-pressed={t === p.t}
                      className={`eyebrow !tracking-[0.12em] rounded-full border px-3 py-2 transition-colors ${
                        t === p.t
                          ? 'bg-accent text-bg border-accent'
                          : 'border-white/10 text-muted hover:text-ink hover:border-white/30'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label={`Score distribution. At threshold ${(t / 100).toFixed(2)} the model catches ${m.tp} of ${totalFraud} frauds and flags ${m.fp} legitimate transactions.`}
                className="w-full h-auto touch-none cursor-ew-resize select-none"
                onPointerDown={(e) => {
                  dragging.current = true
                  e.currentTarget.setPointerCapture(e.pointerId)
                  setFromPointer(e)
                }}
                onPointerMove={(e) => dragging.current && setFromPointer(e)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
              >
                {/* flagged region */}
                <rect x={lineX} y={0} width={W - lineX} height={H} fill="url(#flagged)" />
                <defs>
                  <linearGradient id="flagged" x1="0" x2="1">
                    <stop offset="0" stopColor="#a9c4dc" stopOpacity="0.1" />
                    <stop offset="1" stopColor="#a9c4dc" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* fraud: one dot per transaction, stacked by score */}
                {fraudByScore.flatMap((count, k) =>
                  Array.from({ length: count }, (_, j) => {
                    const caught = k > t
                    return (
                      <circle
                        key={`${k}-${j}`}
                        cx={k * BIN + BIN / 2}
                        cy={AXIS - 11 - j * STEP}
                        r={4.2}
                        fill={caught ? '#a9c4dc' : 'transparent'}
                        stroke={caught ? '#a9c4dc' : 'rgba(255,255,255,0.4)'}
                        strokeWidth={1}
                        style={{ transition: 'fill 0.25s, stroke 0.25s' }}
                      />
                    )
                  }),
                )}

                {/* legitimate: log-scaled bars hanging below the axis */}
                {legitByScore.map((count, k) =>
                  count ? (
                    <rect
                      key={k}
                      x={k * BIN + 2}
                      y={AXIS + 6}
                      width={BIN - 4}
                      height={Math.max(4, (Math.log10(count + 1) / maxLog) * (H - AXIS - 12))}
                      rx={1.5}
                      fill={k > t ? '#ededef' : 'rgba(255,255,255,0.14)'}
                      style={{ transition: 'fill 0.25s' }}
                    />
                  ) : null,
                )}

                <line x1={0} x2={W} y1={AXIS} y2={AXIS} stroke="rgba(255,255,255,0.12)" />
                <line x1={lineX} x2={lineX} y1={0} y2={H} stroke="#ededef" strokeWidth={1.5} />
                <circle cx={lineX} cy={AXIS} r={7} fill="#060607" stroke="#ededef" strokeWidth={1.5} />
              </svg>

              <input
                type="range"
                min={0}
                max={99}
                value={t}
                onChange={(e) => setT(Number(e.target.value))}
                aria-label="Decision threshold"
                aria-valuetext={`${(t / 100).toFixed(2)}: catches ${m.tp} of ${totalFraud} frauds, ${m.fp} false alarms`}
                className="lab-range w-full mt-3"
              />
              <div className="flex justify-between font-mono text-[0.65rem] text-muted mt-1">
                <span>0.00 · looks legitimate</span>
                <span>looks like fraud · 1.00</span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-2" /> Fraud caught
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full border border-white/40" /> Fraud missed
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-ink" /> Legitimate, wrongly flagged
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm bg-white/15" /> Legitimate, passed (log scale)
                </span>
              </div>
            </div>

            {/* what that threshold costs */}
            <div className="lg:col-span-5 p-5 sm:p-8 border-t lg:border-t-0 border-white/[0.06]">
              <p aria-live="polite" className="text-lg sm:text-xl text-ink leading-snug mb-7">
                Catches <span className="text-accent-2 tabular-nums">{m.tp}</span> of {totalFraud} frauds and misses{' '}
                <span className="tabular-nums">{m.fn}</span>, while blocking{' '}
                <span className="tabular-nums">{fmt(m.fp)}</span> legitimate{' '}
                {m.fp === 1 ? 'customer' : 'customers'} out of {fmt(totalLegit)}.
              </p>

              <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-center">
                <span />
                <span className="eyebrow text-muted pb-1">Flagged</span>
                <span className="eyebrow text-muted pb-1">Passed</span>
                <span className="eyebrow text-muted [writing-mode:vertical-rl] rotate-180 self-center">Fraud</span>
                <Cell value={m.tp} label="Caught" strength={m.tp / totalFraud} good />
                <Cell value={m.fn} label="Missed" strength={m.fn / totalFraud} />
                <span className="eyebrow text-muted [writing-mode:vertical-rl] rotate-180 self-center">Legit</span>
                <Cell value={m.fp} label="False alarms" strength={Math.min(1, m.fp / 200)} />
                <Cell value={m.tn} label="Cleared" strength={m.tn / totalLegit} good />
              </div>

              <div className="mt-7 grid grid-cols-[1fr_auto] gap-6 items-end">
                <div className="space-y-3">
                  <Meter label="Precision" value={m.precision} />
                  <Meter label="Recall" value={m.recall} />
                  <Meter label="F1" value={m.f1} />
                </div>
                <figure className="w-24 sm:w-28">
                  <svg viewBox="-4 -4 108 108" className="w-full h-auto overflow-visible" aria-hidden>
                    <path d="M0 0V100H100" fill="none" stroke="rgba(255,255,255,0.14)" />
                    <path d={prPath} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
                    {m.precision !== null && (
                      <circle cx={m.recall * 100} cy={100 - m.precision * 100} r={4.5} fill="#a9c4dc" />
                    )}
                  </svg>
                  <figcaption className="font-mono text-[0.6rem] text-muted mt-1.5 text-center">
                    precision vs recall
                  </figcaption>
                </figure>
              </div>

              <p className="mt-7 pt-5 border-t border-white/[0.06] text-sm text-muted leading-relaxed">
                Accuracy here is <span className="text-ink tabular-nums">{pct(m.accuracy, 2)}</span> — but flagging
                nothing at all scores <span className="text-ink tabular-nums">{pct(baseline, 2)}</span>. With fraud at{' '}
                {pct(totalFraud / total, 2)} of transactions, accuracy can't tell a good model from a useless one, so I
                report precision and recall.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-t border-white/[0.06] font-mono text-[0.7rem] text-muted">
            <span>
              {fraudModel.name} · PR-AUC {fraudModel.prAuc} · ROC-AUC {fraudModel.rocAuc}
            </span>
            <a
              href={fraudModel.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ink hover:text-accent-2 transition-colors"
            >
              View the code <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Cell({ value, label, strength, good }: { value: number; label: string; strength: number; good?: boolean }) {
  return (
    <div
      className="rounded-xl border border-white/[0.07] px-3 py-4 transition-colors duration-300"
      style={{
        backgroundColor: good
          ? `rgba(169,196,220,${0.03 + strength * 0.16})`
          : `rgba(255,255,255,${0.02 + strength * 0.14})`,
      }}
    >
      <p className={`text-2xl sm:text-3xl tabular-nums tracking-tight ${good ? 'text-accent-2' : 'text-ink'}`}>
        {fmt(value)}
      </p>
      <p className="font-mono text-[0.65rem] text-muted mt-1">{label}</p>
    </div>
  )
}

function Meter({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted">{label}</span>
        <span className="text-ink tabular-nums font-mono">{value === null ? '—' : value.toFixed(2)}</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-2 transition-[width] duration-300 ease-out"
          style={{ width: `${(value ?? 0) * 100}%` }}
        />
      </div>
    </div>
  )
}
