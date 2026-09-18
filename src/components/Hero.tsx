import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile, education } from '../data/content'
import { downloadResume } from '../utils/downloadResume'
import NeuralField from './NeuralField'

const ease = [0.16, 1, 0.3, 1] as const

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 1.5 + i * 0.1, duration: 0.9, ease },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[720px] overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_65%_45%,black,transparent)]" />

      {/* particle sculpture, centred on the portrait so it shatters and reforms around it */}
      <motion.div className="absolute inset-0" style={{ opacity: fieldOpacity }}>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 2, ease }}
        >
          <NeuralField anchorRef={portraitRef} spread={1.35} className="w-full h-full" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative flex-1 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-24 pb-10 grid lg:grid-cols-12 items-center gap-10 lg:gap-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="eyebrow !tracking-[0.1em] sm:!tracking-[0.18em] whitespace-nowrap text-muted mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-bg/70 backdrop-blur-xl px-3.5 py-1.5"
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-live animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-live" />
            </span>
            {profile.status.split(' — ')[0]}
            <span className="hidden sm:inline">— {profile.status.split(' — ')[1]}</span>
          </motion.p>

          <motion.h1
            custom={2}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="display text-sheen text-[17vw] sm:text-[12vw] lg:text-[8.2rem] xl:text-[9rem]"
          >
            {profile.headline[0]}
            <br />
            {profile.headline[1]}
          </motion.h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="mt-7 max-w-md text-[0.95rem] sm:text-base text-muted leading-relaxed"
          >
            {profile.heroLine}
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={reveal}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
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
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end lg:self-start lg:pt-16 lg:pr-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1.35, duration: 1.4, ease }}
            className="relative"
          >
            <div
              ref={portraitRef}
              className="group relative w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_30px_80px_-30px_rgba(169,196,220,0.3)]"
            >
              <img
                src="/images/portrait.webp"
                alt={`Portrait of ${profile.name}`}
                width={900}
                height={900}
                fetchPriority="high"
                className="w-full h-full object-cover grayscale contrast-[1.05] brightness-95 scale-105 transition-[filter,transform] duration-[1200ms] ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-100"
              />
              {/* edge falloff so the photo sinks into the page instead of sitting on it */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(6,6,7,0.55)_100%)] pointer-events-none" />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
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
