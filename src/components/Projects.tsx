import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/content'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-36 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Projects"
          subtitle="Six shipped projects — five backend APIs and one full-stack web app — covering auth, payments, real-time messaging, AI integration, and frontend development."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              role="link"
              tabIndex={0}
              onClick={() => window.open(p.githubUrl, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') window.open(p.githubUrl, '_blank', 'noopener,noreferrer')
              }}
              className="group cursor-pointer outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-accent"
            >
              <TiltCard className="glass glass-hover rounded-lg overflow-hidden flex flex-col h-full">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
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
                        className="text-xs font-mono px-2 py-0.5 rounded border border-white/10 text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-mono text-muted group-hover:text-accent transition-colors">
                      <FaGithub size={15} /> View Repository
                    </span>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm font-mono text-ink hover:text-accent transition-colors"
                      >
                        <ExternalLink size={15} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
