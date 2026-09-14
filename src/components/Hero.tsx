import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, GraduationCap } from 'lucide-react'
import { profile, quotes } from '../data/content'
import { downloadResume } from '../utils/downloadResume'
import TiltCard from './TiltCard'

const reveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.15 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative pt-40 pb-32 sm:pt-56 sm:pb-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-20 right-0 w-[28rem] h-[28rem] rounded-full bg-[#a78bfa]/10 blur-[110px] pointer-events-none"
        animate={{ x: [0, -30, 15, 0], y: [0, -15, 25, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-5 sm:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="font-mono text-xs uppercase tracking-[0.15em] text-muted mb-8 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
          {profile.status}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="text-6xl sm:text-8xl lg:text-[8rem] font-bold tracking-tight gradient-text leading-[0.95] max-w-4xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-lg sm:text-xl"
        >
          <span className="text-accent-2">{profile.role}</span>
          <span className="text-muted text-base">· {profile.tagline}</span>
        </motion.div>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-3 font-mono text-sm text-muted flex items-center gap-2"
        >
          <GraduationCap size={15} className="text-accent" /> {profile.eduLine}
        </motion.p>

        <motion.p
          custom={4}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed"
        >
          {profile.pitch}
        </motion.p>

        <motion.div custom={5} initial="hidden" animate="show" variants={reveal} className="mt-12 flex flex-wrap gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-md bg-accent text-black font-mono text-sm font-semibold px-5 py-3 hover:brightness-110 transition-[filter]"
          >
            View Projects <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              downloadResume(profile.resumeUrl, profile.resumeFileName)
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border text-ink font-mono text-sm px-5 py-3 hover:border-accent hover:text-accent transition-colors"
          >
            <Download size={16} /> Download Resume
          </motion.a>
        </motion.div>

        <motion.div custom={6} initial="hidden" animate="show" variants={reveal} className="mt-20 max-w-xl">
          <TiltCard className="glass glass-hover rounded-xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-muted">whoami.py</span>
            </div>
            <pre className="font-mono text-xs sm:text-sm leading-relaxed p-5 overflow-x-auto">
              <code>
                <span className="text-muted"># five APIs. one engineer.</span>{'\n'}
                <span className="text-accent-2">class</span> <span className="text-ink">Engineer</span>:{'\n'}
                {'    '}<span className="text-accent-2">def</span> <span className="text-ink">__init__</span>(self):{'\n'}
                {'        '}self.stack = [<span className="text-accent">"Flask"</span>, <span className="text-accent">"PostgreSQL"</span>, <span className="text-accent">"Redis"</span>, <span className="text-accent">"JWT"</span>]{'\n'}
                {'        '}self.ships = <span className="text-accent-2">True</span>{'\n'}
                {'        '}self.location = <span className="text-accent">"Baltimore, MD"</span>
              </code>
            </pre>
          </TiltCard>
        </motion.div>

        <motion.p
          custom={7}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-4 font-mono text-xs text-muted/70 max-w-xl"
        >
          — {quotes.heroCaption}
        </motion.p>
      </motion.div>
    </section>
  )
}
