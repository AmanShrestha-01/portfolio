import { motion } from 'framer-motion'
import { experience, quotes } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" title="Experience" />

        <div className="relative border-l border-white/10 ml-2 space-y-8">
          {experience.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pl-8 relative"
            >
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
              <div className="glass glass-hover rounded-lg p-5">
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
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pl-10 font-mono text-lg sm:text-xl text-accent"
        >
          {quotes.noPlanB}
        </motion.p>
      </div>
    </section>
  )
}
