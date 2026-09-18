import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile, education } from '../data/content'
import { downloadResume } from '../utils/downloadResume'
import NeuralField from './NeuralField'

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 1.5 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[640px] overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_55%_45%_at_50%_40%,black,transparent)]" />
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] max-w-[120vw] rounded-full bg-accent-2/[0.06] blur-[140px] pointer-events-none" />

      <motion.div className="absolute inset-0" style={{ scale: fieldScale, opacity: fieldOpacity }}>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <NeuralField className="w-full h-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex-1 flex flex-col justify-end items-center text-center px-5 pb-24 sm:pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="eyebrow !tracking-[0.1em] sm:!tracking-[0.18em] whitespace-nowrap text-muted mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-bg/70 backdrop-blur-xl px-3.5 py-1.5"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-live animate-ping opacity-60" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-live" />
          </span>
          {profile.status.split(' — ')[0]}
          <span className="hidden sm:inline">— {profile.status.split(' — ')[1]}</span>
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="display text-sheen text-[17vw] sm:text-[11vw] lg:text-[9.5rem] max-w-6xl"
        >
          {profile.headline[0]}
          <br />
          {profile.headline[1]}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-7 max-w-md text-[0.95rem] sm:text-base text-muted leading-relaxed"
        >
          {profile.heroLine}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full bg-ink text-bg text-sm font-medium pl-5 pr-4 py-2.5 shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)]"
          >
            See the work
            <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
          </motion.a>
          <motion.a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault()
              downloadResume(profile.resumeUrl, profile.resumeFileName)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md text-ink text-sm pl-5 pr-4 py-2.5 hover:border-white/35 transition-colors"
          >
            Resume <ArrowDown size={14} />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 pb-6 grid grid-cols-3 items-end eyebrow text-muted/70 !text-[0.6rem]"
      >
        <span className="hidden sm:block">
          {profile.coords}
          <br />
          {profile.location}
        </span>
        <a href="#about" className="col-start-2 justify-self-center flex flex-col items-center gap-2 hover:text-ink transition-colors">
          Scroll
          <motion.span
            className="block w-px h-6 bg-gradient-to-b from-muted to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </a>
        <span className="hidden sm:block justify-self-end text-right">
          B.S. Computer Science
          <br />
          {education.school} · &rsquo;{education.graduation.slice(-2)}
        </span>
      </motion.div>
    </section>
  )
}
