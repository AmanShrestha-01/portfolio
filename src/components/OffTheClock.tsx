import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { profile, quotes, offClock } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const
// each column drifts at its own speed, so the row breathes as it scrolls past
const drift = [70, -30, 40, -60, 24]
const offset = ['md:mt-0', 'md:mt-24', 'md:mt-10', 'md:mt-32', 'md:mt-16']

export default function OffTheClock() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div className="mt-32 sm:mt-40">
      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="md:col-span-3 self-start eyebrow text-muted pt-3 flex items-center gap-3"
        >
          <span className="h-px w-6 bg-white/20" />
          Off the clock
        </motion.p>
        <div className="md:col-span-9">
          <motion.h3
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="display text-sheen text-4xl sm:text-5xl lg:text-6xl pb-1"
          >
            Same discipline,
            <br />
            different arenas.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 max-w-2xl text-muted text-base sm:text-lg leading-relaxed"
          >
            {profile.bio[profile.bio.length - 1]}
          </motion.p>
        </div>
      </div>

      <div ref={ref} className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-5 md:items-start">
        {offClock.map((item, i) => (
          <Frame key={item.label} item={item} index={i} progress={scrollYProgress} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        className="mt-16 md:mt-24 pt-6 border-t border-white/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span key={interest} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-muted">
              {interest}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted italic shrink-0">{quotes.memento}</p>
      </motion.div>
    </div>
  )
}

function Frame({
  item,
  index,
  progress,
}: {
  item: (typeof offClock)[number]
  index: number
  progress: MotionValue<number>
}) {
  const y = useTransform(progress, [0, 1], [drift[index], -drift[index]])
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: index * 0.1, ease }}
      className={`group ${offset[index]} ${index === offClock.length - 1 ? "max-md:col-span-2" : ""}`}
    >
      <motion.div style={{ y }} className="md:will-change-transform">
        <div className={`relative overflow-hidden ${index === offClock.length - 1 ? "aspect-[4/5] max-md:aspect-[16/10]" : "aspect-[4/5]"} rounded-2xl ring-1 ring-white/[0.08] bg-surface`}>
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.08] brightness-[0.85] scale-[1.08] transition-[filter,transform] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-100"
          />
          {/* bottom scrim + label, so every frame reads as part of one set */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="text-ink text-sm sm:text-base font-medium tracking-tight">{item.label}</p>
          </div>
        </div>
        <figcaption className="mt-3 text-xs sm:text-sm text-muted">{item.caption}</figcaption>
      </motion.div>
    </motion.figure>
  )
}
