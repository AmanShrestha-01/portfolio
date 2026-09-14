import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border relative overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent mb-3"
        >
          // 05. Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-5xl font-bold text-ink tracking-tight"
        >
          Let's build something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-muted text-lg"
        >
          Open to backend engineering internships for Summer / Fall 2026 — reach out any time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent text-black font-mono text-sm font-semibold px-6 py-3 hover:brightness-110 transition"
          >
            <Mail size={16} /> {profile.email}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-mono text-sm"
          >
            <FaGithub size={18} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-mono text-sm"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-mono text-sm"
          >
            <FaInstagram size={18} /> Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
