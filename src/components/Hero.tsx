import { motion } from 'framer-motion'
import { ArrowRight, Download, GraduationCap } from 'lucide-react'
import { profile } from '../data/content'
import { downloadResume } from '../utils/downloadResume'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-mono text-sm text-accent mb-5 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          {profile.status}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink max-w-3xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-4 font-mono text-lg sm:text-xl text-accent-2"
        >
          {profile.role} <span className="text-muted">· {profile.tagline}</span>
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-3 font-mono text-sm text-muted flex items-center gap-2"
        >
          <GraduationCap size={15} className="text-accent" /> {profile.eduLine}
        </motion.p>

        <motion.p
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed"
        >
          {profile.pitch}
        </motion.p>

        <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent text-black font-mono text-sm font-semibold px-5 py-3 hover:brightness-110 transition"
          >
            View Projects <ArrowRight size={16} />
          </a>
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            onClick={(e) => {
              e.preventDefault()
              downloadResume(profile.resumeUrl, profile.resumeFileName)
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border text-ink font-mono text-sm px-5 py-3 hover:border-accent hover:text-accent transition"
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div
          custom={6}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-16 rounded-lg border border-border bg-surface/70 backdrop-blur max-w-xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-2">
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
        </motion.div>
      </div>
    </section>
  )
}
