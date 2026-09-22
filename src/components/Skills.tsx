import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { skills, learning } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

const ease = [0.16, 1, 0.3, 1] as const

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  // the grid tips up from a steep 3D angle as it scrolls into view
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'start 0.35'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Skills"
          statement="The toolkit."
          subtitle="What I reach for when building and shipping software — and what I'm learning next."
        />

        <div className="[perspective:1400px]">
          <motion.div
            ref={gridRef}
            style={{ rotateX, scale, y, transformOrigin: '50% 0%' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
                className={i === skills.length - 1 ? 'lg:col-span-2' : ''}
              >
                <TiltCard className="glass glass-hover rounded-2xl p-6 h-full">
                  <p className="eyebrow text-ink mb-6">{group.label}</p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-muted flex items-center gap-3">
                        <span className="w-3 h-px bg-white/25" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: skills.length * 0.06, ease }}
            >
              <TiltCard className="glass glass-hover rounded-2xl p-6 h-full relative overflow-hidden !border-accent-2/20">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent-2/15 blur-3xl" />
                <div className="flex items-center justify-between mb-6">
                  <p className="eyebrow text-accent-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" /> Currently learning
                  </p>
                  <span className="font-mono text-[0.65rem] text-muted">ML</span>
                </div>
                <ul className="space-y-2">
                  {learning.map((l) => (
                    <li key={l} className="text-sm text-accent-2/90 flex items-center gap-3">
                      <span className="w-3 h-px bg-accent-2/40" />
                      {l}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
