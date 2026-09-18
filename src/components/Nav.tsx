import { useEffect, useState } from 'react'
import { Menu, X, ArrowDown } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/content'
import { downloadResume } from '../utils/downloadResume'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-bg/70 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 grid grid-cols-[1fr_auto] md:grid-cols-3 items-center">
        <a href="#top" className="flex items-center gap-2.5 group w-fit">
          <span className="relative w-3.5 h-3.5 rounded-full border-[1.5px] border-ink grid place-items-center">
            <span className="w-1 h-1 rounded-full bg-ink group-hover:scale-150 transition-transform" />
          </span>
          <span className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-ink">
            Aman Shrestha
          </span>
        </a>

        <div className="hidden md:flex items-center justify-center gap-7 text-[0.8rem] text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-ink transition-colors"
          >
            <FaGithub size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-ink transition-colors"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-muted hover:text-ink transition-colors"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            onClick={(e) => {
              e.preventDefault()
              downloadResume(profile.resumeUrl, profile.resumeFileName)
            }}
            className="inline-flex items-center gap-1.5 text-[0.75rem] px-3.5 py-1.5 rounded-full border border-white/15 text-ink hover:bg-ink hover:text-bg transition-colors"
          >
            Resume <ArrowDown size={12} />
          </a>
        </div>

        <button
          className="md:hidden text-ink justify-self-end"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-5 pb-8 pt-4 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display text-4xl text-ink hover:text-muted transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted hover:text-ink">
              <FaGithub size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-ink">
              <FaLinkedin size={18} />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-muted hover:text-ink">
              <FaInstagram size={18} />
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              onClick={(e) => {
                e.preventDefault()
                downloadResume(profile.resumeUrl, profile.resumeFileName)
              }}
              className="ml-auto inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-ink text-bg"
            >
              Resume <ArrowDown size={13} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
