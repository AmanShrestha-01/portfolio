import { useEffect, useRef } from 'react'
import { sphere, neuralNet, lossLandscape, torusKnot, type Shape } from '../utils/shapes'

// The hero sculpture's quieter twin: a fixed backdrop that follows the page, drifting
// from side to side and shattering into a new shape as each section arrives.
// Scroll position drives the morph, so it holds still when the reader does.

function helix(n: number): Shape {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const t = i / n
    const strand = i % 2 ? Math.PI : 0
    const a = t * Math.PI * 7 + strand
    const jitter = () => (Math.random() - 0.5) * 0.07
    out[i * 3] = Math.cos(a) * 0.42 + jitter()
    out[i * 3 + 1] = (t - 0.5) * 2.3 + jitter()
    out[i * 3 + 2] = Math.sin(a) * 0.42 + jitter()
  }
  return out
}

// one stop per section, in page order: where the sculpture sits (fractions of the viewport) and how big,
// chosen so it lands in each layout's empty space rather than behind body text
const stops: { id: string; make: (n: number) => Shape; x: number; y: number; size: number; dim?: number }[] = [
  { id: 'about', make: sphere, x: 0.95, y: 0.74, size: 0.28 },
  { id: 'skills', make: neuralNet, x: 0.87, y: 0.25, size: 0.17 },
  { id: 'projects', make: torusKnot, x: 0.5, y: 0.5, size: 0.62, dim: 0 },
  { id: 'lab', make: lossLandscape, x: 0.91, y: 0.38, size: 0.2 },
  { id: 'experience', make: helix, x: 0.1, y: 0.52, size: 0.34 },
  { id: 'contact', make: sphere, x: 0.5, y: 0.5, size: 0.46 },
]

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function ScrollField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const small = window.innerWidth < 640
    const N = small ? 900 : 1900
    const shapes = stops.map((s) => s.make(N))
    const sections = stops.map((s) => document.getElementById(s.id))

    const scatter = new Float32Array(N * 3)
    const delay = new Float32Array(N)
    const tint = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.acos(Math.random() * 2 - 1)
      const m = 0.4 + Math.random() * 0.9
      scatter[i * 3] = Math.sin(v) * Math.cos(u) * m
      scatter[i * 3 + 1] = Math.sin(v) * Math.sin(u) * m
      scatter[i * 3 + 2] = Math.cos(v) * m
      delay[i] = Math.random() * 0.3
      tint[i] = Math.random()
    }

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let progress = 0 // 0 = first stop fully formed, 1 = second, … eased toward the scroll target
    let fade = 0
    const start = performance.now()

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const time = Math.max(now - start, 0) / 1000

      // each section boundary crossing the viewport advances the morph by one stop
      let target = 0
      for (let i = 1; i < sections.length; i++) {
        const top = sections[i]?.getBoundingClientRect().top ?? Infinity
        target += clamp01((h * 0.9 - top) / (h * 0.75))
      }
      const firstTop = sections[0]?.getBoundingClientRect().top ?? Infinity
      const fadeTarget = clamp01((h * 0.7 - firstTop) / (h * 0.6))
      progress += (target - progress) * 0.09
      fade += (fadeTarget - fade) * 0.1

      ctx.clearRect(0, 0, w, h)
      if (fade < 0.01) return

      const idx = Math.min(Math.floor(progress), stops.length - 1)
      const next = Math.min(idx + 1, stops.length - 1)
      const mt = idx === next ? 0 : progress - idx
      const from = shapes[idx]
      const to = shapes[next]
      const glide = easeInOut(mt)
      const ox = w * (small ? 0.5 : stops[idx].x + (stops[next].x - stops[idx].x) * glide)
      const oy = h * (small ? 0.5 : stops[idx].y + (stops[next].y - stops[idx].y) * glide)
      const scale = Math.min(w, h) * (stops[idx].size + (stops[next].size - stops[idx].size) * glide) * (small ? 1.2 : 1)

      // sway only — a full turn would put the flat shapes edge-on
      const yaw = Math.sin(time * 0.2) * 0.45 + Math.sin(progress * Math.PI) * 0.25
      const pitch = -0.3 + Math.sin(time * 0.13) * 0.08
      const cy = Math.cos(yaw)
      const sy = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)
      const camera = 3.2
      // stays a backdrop: never bright enough to compete with the text over it
      const dim = (stops[idx].dim ?? 1) + ((stops[next].dim ?? 1) - (stops[idx].dim ?? 1)) * glide
      const gain = fade * dim * (small ? 0.18 : 0.52)

      // nothing to draw behind the project carousel — leave the frame budget to the cards
      if (gain < 0.01) return

      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < N; i++) {
        const k = i * 3
        let x = from[k]
        let y = from[k + 1]
        let z = from[k + 2]
        if (mt > 0) {
          const t = clamp01((mt - delay[i]) / 0.7)
          if (t < 0.4) {
            const e = easeOut(t / 0.4)
            x += (from[k] * 0.55 + scatter[k]) * e
            y += (from[k + 1] * 0.55 + scatter[k + 1]) * e
            z += (from[k + 2] * 0.55 + scatter[k + 2]) * e
          } else {
            const e = easeInOut((t - 0.4) / 0.6)
            const sx = from[k] * 1.55 + scatter[k]
            const sy2 = from[k + 1] * 1.55 + scatter[k + 1]
            const sz = from[k + 2] * 1.55 + scatter[k + 2]
            x = sx + (to[k] - sx) * e
            y = sy2 + (to[k + 1] - sy2) * e
            z = sz + (to[k + 2] - sz) * e
          }
        }

        const rx = x * cy - z * sy
        const rz = x * sy + z * cy
        const ry = y * cp - rz * sp
        const rz2 = y * sp + rz * cp
        const persp = camera / (camera + rz2)
        const depth = (1 - rz2) * 0.5
        const alpha = clamp01(0.08 + depth * 0.9) * gain
        const size = (0.5 + depth * 1.6) * persp
        ctx.fillStyle = tint[i] > 0.8 ? `rgba(170,205,235,${alpha})` : `rgba(236,238,242,${alpha * 0.85})`
        ctx.fillRect(ox + rx * scale * persp - size / 2, oy + ry * scale * persp - size / 2, size, size)
      }
      ctx.globalCompositeOperation = 'source-over'
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-0 w-full h-full pointer-events-none" />
}
