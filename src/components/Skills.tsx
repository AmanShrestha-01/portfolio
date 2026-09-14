import { motion } from 'framer-motion'
import { skills } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" title="Skills" subtitle="The stack I reach for when building and shipping backend systems." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-lg border border-border bg-surface p-5 hover:border-accent/50 transition-colors"
            >
              <p className="font-mono text-xs text-accent mb-3 uppercase tracking-wider">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-2.5 py-1 rounded-md bg-surface-2 text-ink border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
