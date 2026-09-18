import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'

// Intro curtain: a quick counter, then the panel wipes up to reveal the hero.
export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (done) return
    const start = performance.now()
    const duration = 1100
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-bg flex flex-col justify-between p-5 sm:p-8"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="eyebrow text-muted">{profile.name} — Portfolio</p>
          <div className="flex items-end justify-between">
            <div className="h-px flex-1 mr-6 mb-4 bg-white/10 relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${count}%` }} />
            </div>
            <span className="display text-7xl sm:text-9xl text-ink tabular-nums">
              {count.toString().padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
