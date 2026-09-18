import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience, quotes } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

const ease = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  // timeline line draws itself as the list scrolls past
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="04" title="Experience" statement="Where I've done the work." />

        <div className="grid md:grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-3" />
          <div ref={listRef} className="md:col-span-9 relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.08]" />
            <motion.span
              style={{ scaleY: draw }}
              className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-ink via-accent-2 to-transparent"
            />

            <div className="space-y-6">
              {experience.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                  className="relative"
                >
                  <span className="absolute -left-8 sm:-left-10 top-8 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-bg border border-ink" />
                  <TiltCard className="glass glass-hover rounded-2xl p-6 sm:p-8">
                    <div className="grid sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 items-baseline">
                      <h3 className="display !tracking-[-0.03em] text-2xl sm:text-3xl text-ink">{e.title}</h3>
                      <p className="font-mono text-xs text-muted sm:text-right order-first sm:order-none">{e.period}</p>
                      <p className="text-sm text-muted">
                        <span className="text-accent-2">{e.org}</span> · {e.location}
                      </p>
                    </div>
                    <ul className="mt-5 space-y-2">
                      {e.bullets.map((b, bi) => (
                        <li key={bi} className="text-sm text-muted flex gap-3 max-w-2xl">
                          <span className="w-3 h-px bg-white/25 mt-2.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-14 display !tracking-[-0.03em] text-2xl sm:text-3xl text-ink"
            >
              “{quotes.noPlanB}”
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
