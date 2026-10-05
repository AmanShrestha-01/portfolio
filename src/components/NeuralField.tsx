import { useEffect, useRef, type RefObject } from 'react'
import { sphere, neuralNet, lossLandscape, torusKnot } from '../utils/shapes'

// Hero centerpiece: a particle sculpture that cycles through ML-flavoured shapes
// (sphere → neural net → loss landscape → torus knot), shattering and reforming
// between each one. Plain 2D canvas with a hand-rolled perspective projection.

const rand = (a: number, b: number) => a + Math.random() * (b - a)

const HOLD = 5.2 // seconds a shape stays formed
const MORPH = 2.8 // seconds for shatter + reform

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function NeuralField({
  className = '',
  anchorRef,
  spread = 1.35,
}: {
  className?: string
  // when given, the sculpture centres on this element and sizes itself around it
  anchorRef?: RefObject<HTMLElement | null>
  spread?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 640
    const N = small ? 1600 : 3400
    const shapes = [sphere(N), neuralNet(N), lossLandscape(N), torusKnot(N)]

    // per-particle random scatter direction + stagger, fixed for the session
    const scatter = new Float32Array(N * 3)
    const delay = new Float32Array(N)
    const tint = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const u = rand(0, Math.PI * 2)
      const v = Math.acos(rand(-1, 1))
      const m = rand(0.4, 1.3)
      scatter[i * 3] = Math.sin(v) * Math.cos(u) * m
      scatter[i * 3 + 1] = Math.sin(v) * Math.sin(u) * m
      scatter[i * 3 + 2] = Math.cos(v) * m
      delay[i] = Math.random() * 0.3
      tint[i] = Math.random()
    }

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      // 1.5 is indistinguishable from 2 for 1–2px particles and nearly halves the pixels composited per frame
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0 }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.nx = (mouse.x / w - 0.5) * 2
      mouse.ny = (mouse.y / h - 0.5) * 2
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
      mouse.nx = mouse.ny = 0
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)

    let raf = 0
    let tiltX = 0
    let tiltY = 0
    const start = performance.now()

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      // rAF timestamps can predate `start` on the first frame
      const time = reduced ? 1.5 : Math.max(now - start, 0) / 1000

      const cycle = HOLD + MORPH
      const idx = Math.floor(time / cycle) % shapes.length
      const local = time % cycle
      const from = shapes[idx]
      const to = shapes[(idx + 1) % shapes.length]
      const morphing = local > HOLD
      const mt = morphing ? (local - HOLD) / MORPH : 0

      tiltX += (mouse.ny * 0.35 - tiltX) * 0.04
      tiltY += (mouse.nx * 0.6 - tiltY) * 0.04
      // sway rather than spin, so flat shapes (net, landscape) never go edge-on
      const yaw = Math.sin(time * 0.22) * 0.7 + time * 0.02 + tiltY
      const pitch = -0.32 + Math.sin(time * 0.13) * 0.08 + tiltX
      const cy = Math.cos(yaw)
      const sy = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)

      let scale = Math.min(w, h) * (small ? 0.3 : 0.24)
      let ox = w / 2
      let oy = h * (small ? 0.3 : 0.33)
      const anchor = anchorRef?.current
      if (anchor) {
        const a = anchor.getBoundingClientRect()
        const c = canvas.getBoundingClientRect()
        ox = a.left - c.left + a.width / 2
        oy = a.top - c.top + a.height / 2
        scale = (a.width / 2) * spread
      }
      const camera = 3.2

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < N; i++) {
        const k = i * 3
        let x: number
        let y: number
        let z: number
        if (!morphing) {
          x = from[k]
          y = from[k + 1]
          z = from[k + 2]
        } else {
          // stagger each particle, then split the window: fracture outward, then reform
          const t = Math.min(Math.max((mt - delay[i]) / 0.7, 0), 1)
          if (t < 0.4) {
            const e = easeOut(t / 0.4)
            x = from[k] + (from[k] * 0.55 + scatter[k]) * e
            y = from[k + 1] + (from[k + 1] * 0.55 + scatter[k + 1]) * e
            z = from[k + 2] + (from[k + 2] * 0.55 + scatter[k + 2]) * e
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

        // gentle breathing so a held shape never looks frozen
        const b = 1 + Math.sin(time * 1.3 + tint[i] * 6.28) * 0.008
        x *= b
        y *= b
        z *= b

        // rotate: yaw around Y, then pitch around X
        const rx = x * cy - z * sy
        const rz = x * sy + z * cy
        const ry = y * cp - rz * sp
        const rz2 = y * sp + rz * cp

        const persp = camera / (camera + rz2)
        let px = ox + rx * scale * persp
        let py = oy + ry * scale * persp

        // cursor pushes nearby particles aside
        const dx = px - mouse.x
        const dy = py - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 14400) {
          const d = Math.sqrt(d2) || 1
          const f = (1 - d / 120) * 26
          px += (dx / d) * f
          py += (dy / d) * f
        }

        const depth = (1 - rz2) * 0.5 // ~0 back … ~1 front
        const alpha = Math.max(0.05, Math.min(1, 0.08 + depth * 0.95))
        const size = (0.5 + depth * 1.7) * persp
        const icy = tint[i] > 0.82
        ctx.fillStyle = icy
          ? `rgba(170,205,235,${alpha})`
          : `rgba(236,238,242,${alpha * 0.85})`
        ctx.fillRect(px - size / 2, py - size / 2, size, size)
      }
      ctx.globalCompositeOperation = 'source-over'
      if (reduced) cancelAnimationFrame(raf)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [anchorRef, spread])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
