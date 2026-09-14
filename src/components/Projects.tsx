import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Projects"
          subtitle="Five production APIs, each covering a different piece of real-world backend engineering — auth, payments, real-time messaging, and AI integration."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group rounded-lg border border-border bg-surface overflow-hidden flex flex-col glow-border transition-shadow duration-300"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.status === 'Live' ? 'bg-accent animate-pulse' : 'bg-accent-2'
                    }`}
                  />
                  <span className="font-mono text-xs text-muted">{p.status}</span>
                </div>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b, bi) => (
                    <li key={bi} className="text-sm text-muted flex gap-2">
                      <span className="text-accent mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border flex items-center gap-4">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-mono text-ink hover:text-accent transition-colors"
                  >
                    <FaGithub size={15} /> Code
                  </a>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-ink hover:text-accent transition-colors"
                    >
                      <ExternalLink size={15} /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
