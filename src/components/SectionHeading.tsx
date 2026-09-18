import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

export default function SectionHeading({
  index,
  title,
  statement,
  subtitle,
}: {
  index: string
  title: string
  statement: string
  subtitle?: string
}) {
  const words = statement.split(' ')
  return (
    <div className="mb-16 sm:mb-20 grid md:grid-cols-12 gap-6 md:gap-8">
      <motion.p
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="md:col-span-3 self-start eyebrow text-muted pt-3 flex items-center gap-3"
      >
        <span className="text-ink">({index})</span>
        <span className="h-px w-6 bg-white/20" />
        {title}
      </motion.p>
      <div className="md:col-span-9">
        {/* each word rises out of its own mask */}
        <motion.h2
          className="display text-5xl sm:text-6xl lg:text-7xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="sr-only">{statement}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="inline-block text-ink"
                variants={{
                  hidden: { y: '110%', rotateX: -60, opacity: 0 },
                  show: { y: '0%', rotateX: 0, opacity: 1, transition: { duration: 1, delay: i * 0.06, ease } },
                }}
                style={{ transformOrigin: '50% 100%' }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 text-muted max-w-2xl text-base sm:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
