import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/content'

const ease = [0.16, 1, 0.3, 1] as const

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  // headline swings up out of the floor as the section arrives
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [55, 0])
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  const socials = [
    { href: profile.github, label: 'GitHub', icon: FaGithub },
    { href: profile.linkedin, label: 'LinkedIn', icon: FaLinkedin },
    { href: profile.instagram, label: 'Instagram', icon: FaInstagram },
  ]

  return (
    <section ref={ref} id="contact" className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_100%,black,transparent)]" />
      <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] max-w-[150vw] rounded-full bg-accent-2/[0.09] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow text-muted mb-8"
        >
          <span className="text-ink">(05)</span> — Contact
        </motion.p>

        <div className="[perspective:1200px]">
          <motion.h2
            style={{ rotateX, y, opacity, transformOrigin: '50% 100%' }}
            className="display text-ink text-[14vw] sm:text-[10vw] lg:text-[9rem]"
          >
            Let's build
            <br />
            what's next.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-8 text-muted text-base sm:text-lg max-w-lg mx-auto"
        >
          Open to software engineering, ML and backend internships for Summer / Fall — reach out any time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 rounded-full bg-ink text-bg text-sm sm:text-base font-medium pl-6 pr-2 py-2 shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)]"
          >
            <span className="truncate max-w-[60vw]">{profile.email}</span>
            <span className="w-9 h-9 rounded-full bg-bg text-ink grid place-items-center shrink-0">
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-10 flex items-center justify-center gap-7"
        >
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm"
            >
              <Icon size={16} /> {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
