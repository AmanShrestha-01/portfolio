import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { profile, education } from '../data/content'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" title="About" />

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-5">
            {profile.bio.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-muted leading-relaxed text-base sm:text-lg"
              >
                {p}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: profile.bio.length * 0.08 }}
              className="pt-2"
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-border bg-surface p-6 space-y-5 h-fit"
          >
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
                    className="text-xs font-mono px-2 py-1 rounded border border-border text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
