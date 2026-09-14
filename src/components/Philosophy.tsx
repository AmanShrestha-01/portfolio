import { motion } from 'framer-motion'
import { mottos } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Philosophy"
          subtitle="A few things I actually believe, applied about as often to a codebase as to myself."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mottos.map((motto, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="rounded-lg border border-border bg-surface p-6 hover:border-accent/50 transition-colors"
            >
              <p className="font-mono text-xs text-accent mb-3">// {String(i + 1).padStart(2, '0')}</p>
              <p className="text-xl sm:text-2xl font-medium text-ink leading-snug">{motto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
