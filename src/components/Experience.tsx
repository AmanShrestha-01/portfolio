import { motion } from 'framer-motion'
import { experience } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" title="Experience" />

        <div className="relative border-l border-border ml-2 space-y-10">
          {experience.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="pl-8 relative"
            >
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <h3 className="text-lg font-semibold text-ink mt-1">{e.title}</h3>
              <p className="text-accent-2 font-mono text-sm">
                {e.org} <span className="text-muted">· {e.location}</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.bullets.map((b, bi) => (
                  <li key={bi} className="text-sm text-muted flex gap-2 max-w-2xl">
                    <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
