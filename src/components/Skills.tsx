import { motion } from 'framer-motion'
import { skills } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function Skills() {
  return (
    <section id="skills" className="py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" title="Skills" subtitle="The stack I reach for when building and shipping backend systems." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass glass-hover rounded-lg p-5 h-full">
                <p className="font-mono text-xs text-accent mb-3 uppercase tracking-wider">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-2.5 py-1 rounded-md bg-white/[0.03] text-ink border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
