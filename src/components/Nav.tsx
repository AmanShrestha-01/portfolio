import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/content'
import { downloadResume } from '../utils/downloadResume'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
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
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/85 backdrop-blur border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm text-ink flex items-center gap-2 group">
          <span className="text-accent">$</span>
          <span className="group-hover:text-accent transition-colors">Aman Shrestha</span>
          <span className="animate-pulse text-accent">_</span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent transition-colors"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-muted hover:text-accent transition-colors"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            onClick={(e) => {
              e.preventDefault()
              downloadResume(profile.resumeUrl, profile.resumeFileName)
            }}
            className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-md border border-border text-ink hover:border-accent hover:text-accent transition-colors"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-bg border-b border-border px-5 pb-6 pt-2 flex flex-col gap-4 font-mono text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <FaGithub size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <FaLinkedin size={18} />
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <FaInstagram size={18} />
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              onClick={(e) => {
                e.preventDefault()
                downloadResume(profile.resumeUrl, profile.resumeFileName)
              }}
              className="text-muted hover:text-accent flex items-center gap-1"
            >
              <Download size={14} /> Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
