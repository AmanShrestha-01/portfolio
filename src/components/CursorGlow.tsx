import { useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const SIZE = 1200

// The spotlight is a fixed-size disc moved with a transform, so following the
// cursor is compositor-only work instead of repainting a full-viewport gradient.
export default function CursorGlow() {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  return (
    <div aria-hidden className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <motion.div
        style={{ x, y, width: SIZE, height: SIZE }}
        className="absolute top-0 left-0 rounded-full will-change-transform bg-[radial-gradient(circle,var(--color-accent-soft),transparent_70%)]"
      />
    </div>
  )
}
