import { motion } from 'framer-motion'

export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14"
    >
      <p className="font-mono text-sm text-accent mb-2">// {index}</p>
      <h2 className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted max-w-2xl text-lg">{subtitle}</p>}
    </motion.div>
  )
}
