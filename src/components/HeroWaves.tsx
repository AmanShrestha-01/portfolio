import { useEffect, useRef } from 'react'

// A slow field of hairlines rolling toward the viewer along the hero's floor —
// reads as a loss surface seen from low down. The cursor lifts a ripple in it.
export default function HeroWaves({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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

    const mouse = { x: -9999, y: -9999 }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)

    const ROWS = w < 640 ? 22 : 34
    const STEP = 14
    let raf = 0
    const start = performance.now()

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const t = reduced ? 2 : Math.max(now - start, 0) / 1000
      ctx.clearRect(0, 0, w, h)

      for (let r = 0; r < ROWS; r++) {
        const z = r / (ROWS - 1) // 0 far … 1 near
        const base = h * (0.12 + 0.9 * Math.pow(z, 1.9))
        const amp = 5 + 44 * z
        const icy = r % 5 === 2
        ctx.beginPath()
        for (let x = -STEP; x <= w + STEP; x += STEP) {
          const u = x / (0.55 + z * 0.9) // far rows compress, giving the lines perspective
          let y =
            base +
            amp *
              (Math.sin(u * 0.0042 + t * 0.45 + r * 0.33) * 0.6 +
                Math.sin(u * 0.0019 - t * 0.28 + r * 0.81) * 0.4)
          const dx = x - mouse.x
          const dy = base - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 48400) y -= Math.exp(-d2 / 9000) * 34 * (0.4 + z)
          if (x === -STEP) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const alpha = 0.04 + 0.3 * z
        ctx.strokeStyle = icy ? `rgba(169,196,220,${alpha * 1.5})` : `rgba(237,237,239,${alpha})`
        ctx.lineWidth = 0.6 + z * 0.7
        ctx.stroke()
      }
      if (reduced) cancelAnimationFrame(raf)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
