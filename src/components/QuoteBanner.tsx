import { motion } from 'framer-motion'
import { quotes } from '../data/content'

export default function QuoteBanner() {
  return (
    <section className="border-y border-border bg-surface/40 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
          {quotes.map((q, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="font-mono text-ink/90 text-sm sm:text-base"
            >
              "{q}"
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
