import { motion, useScroll, useSpring } from 'framer-motion'

// Hairline at the very top of the page that fills as the page is read.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-white/40 via-ink to-accent-2 pointer-events-none"
    />
  )
}
