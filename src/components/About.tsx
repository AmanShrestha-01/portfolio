import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { profile, education, quotes } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function About() {
  return (
    <section id="about" className="py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" title="About" />

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-5">
            {profile.bio.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-muted leading-relaxed text-base sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: profile.bio.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent font-mono text-lg sm:text-xl pt-2"
            >
              {quotes.drive}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: profile.bio.length * 0.1 + 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <p className="text-sm text-muted font-mono mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs font-mono px-2 py-1 rounded border border-border text-muted"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted italic">{quotes.memento}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-fit"
          >
            <TiltCard className="glass glass-hover rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted font-mono">Location</p>
                  <p className="text-ink">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-muted font-mono">Education</p>
                  <p className="text-ink">{education.school}</p>
                  <p className="text-sm text-muted">{education.degree}</p>
                  <p className="text-sm text-muted">Graduating {education.graduation}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted font-mono mb-2">Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-mono px-2 py-1 rounded border border-white/10 text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
