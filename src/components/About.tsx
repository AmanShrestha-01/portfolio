import { motion } from 'framer-motion'
import { profile, education, quotes, focus, stats } from '../data/content'
import SectionHeading from './SectionHeading'
import ScrollWords from './ScrollWords'
import TiltCard from './TiltCard'
import OffTheClock from './OffTheClock'

const ease = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" title="About" statement="Backend first. Machine learning next." />

        <div className="grid md:grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-3" />
          <ScrollWords
            text={profile.manifesto}
            className="md:col-span-9 display !tracking-[-0.035em] !leading-[1.08] text-3xl sm:text-4xl lg:text-5xl text-ink"
          />
        </div>

        {/* stats strip */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.07]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="border-r border-b border-white/[0.07] p-6 sm:p-8"
            >
              <p className="display text-5xl sm:text-6xl text-sheen">{s.value}</p>
              <p className="eyebrow text-muted mt-4">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-4 space-y-5 md:sticky md:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <TiltCard className="glass glass-hover rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent-2/15 blur-3xl" />
                <p className="eyebrow text-accent-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-2 animate-pulse" /> Current focus
                </p>
                <p className="display text-4xl text-ink mt-4">{focus.title}</p>
                <dl className="mt-6 divide-y divide-white/[0.07]">
                  {focus.points.map((p) => (
                    <div key={p.k} className="py-3 grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                      <dt className="font-mono text-xs text-muted pt-0.5">{p.k}</dt>
                      <dd className="text-ink/90">{p.v}</dd>
                    </div>
                  ))}
                </dl>
              </TiltCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <TiltCard className="glass glass-hover rounded-2xl p-7">
                <p className="eyebrow text-muted">Education</p>
                <p className="text-ink text-lg mt-3">{education.school}</p>
                <p className="text-sm text-muted">{education.degree}</p>
                <p className="text-sm text-muted">
                  Graduating {education.graduation} · {profile.location}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {education.coursework.map((c) => (
                    <span key={c} className="text-[0.7rem] font-mono px-2 py-1 rounded-full border border-white/10 text-muted">
                      {c}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 space-y-6">
            {profile.bio.slice(0, -1).map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
                className="text-muted leading-relaxed text-base sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
              className="display text-3xl sm:text-4xl text-ink pt-6"
            >
              “{quotes.drive}”
            </motion.p>

          </div>
        </div>

        <OffTheClock />
      </div>
    </section>
  )
}
