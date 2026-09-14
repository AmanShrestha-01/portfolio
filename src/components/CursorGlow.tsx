import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  const background = useTransform([x, y], ([xv, yv]: number[]) =>
    `radial-gradient(700px circle at ${xv}px ${yv}px, var(--color-accent-soft), rgba(34,211,238,0.08) 35%, rgba(167,139,250,0.06) 55%, transparent 70%)`
  )

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ background }}
    />
  )
}
