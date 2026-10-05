import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects, type Project } from '../data/content'
import SectionHeading from './SectionHeading'
import ProjectArt from './ProjectArt'
import { scrollToY } from '../utils/smoothScroll'

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

export default function Projects() {
  const desktop = useIsDesktop()
  return (
    <section id="projects" className="relative pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Work"
          statement="Systems I've designed, built and shipped."
          subtitle="Nine projects, most substantial first — a multi-agent AI system built at HopHacks 2026, production backends serving real traffic, and models trained end to end."
        />
      </div>
      {desktop ? <PinnedCarousel /> : <SwipeCarousel />}
    </section>
  )
}

/* Desktop: the section pins and vertical scroll drives a horizontal 3D track. */
function PinnedCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(track.scrollWidth - window.innerWidth, 0))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setActive(Math.min(projects.length - 1, Math.round(v * (projects.length - 1))))
  )

  const step = (dir: 1 | -1) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const scrollable = wrap.offsetHeight - window.innerHeight
    const target = Math.min(Math.max(active + dir, 0), projects.length - 1)
    const top = wrap.getBoundingClientRect().top + window.scrollY
    scrollToY(top + (target / (projects.length - 1)) * scrollable)
  }

  return (
    <div ref={wrapRef} style={{ height: `${projects.length * 70 + 60}vh` }} className="relative">
      <div className="sticky top-0 h-screen pt-16 flex flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-8 flex items-center justify-between mb-5">
          <p className="eyebrow text-ink w-56 truncate">{projects[active].name}</p>
          <div className="flex-1 mx-8 h-px bg-white/10 relative overflow-hidden">
            <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-ink" />
          </div>
          <div className="flex gap-2">
            <CarouselButton onClick={() => step(-1)} label="Previous project" disabled={active === 0}>
              <ArrowLeft size={15} />
            </CarouselButton>
            <CarouselButton onClick={() => step(1)} label="Next project" disabled={active === projects.length - 1}>
              <ArrowRight size={15} />
            </CarouselButton>
          </div>
        </div>

        {/* the focused project's name, huge and outlined, behind the cards */}
        <div aria-hidden className="absolute inset-x-0 -bottom-[1vh] overflow-hidden pointer-events-none">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="display ghost-type whitespace-nowrap pl-8 text-[11vw] leading-none"
            >
              {projects[active].name}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="[perspective:1600px]">
          <motion.div
            ref={trackRef}
            // cards recede to negative z, behind this plane — let clicks pass through to them
            style={{ x, transformStyle: 'preserve-3d' }}
            className="pointer-events-none flex items-center gap-8 w-max pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[30vw]"
          >
            {projects.map((p, i) => (
              <Card3D key={p.slug} project={p} x={x} focused={i === active} near={Math.abs(i - active) <= 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* Each card turns and recedes the further it drifts from the viewport's focal point. */
function Card3D({
  project,
  x,
  focused,
  near,
}: {
  project: Project
  x: MotionValue<number>
  focused: boolean
  near: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => (offset.current = el.offsetLeft + el.offsetWidth / 2)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const dist = useTransform(x, (v) => {
    const focal = window.innerWidth * 0.38
    return Math.max(-1.5, Math.min(1.5, (offset.current + v - focal) / window.innerWidth))
  })
  const rotateY = useTransform(dist, [-1.5, 0, 1.5], [38, 0, -38])
  const z = useTransform(dist, (d) => -Math.abs(d) * 260)
  const opacity = useTransform(dist, (d) => 1 - Math.min(Math.abs(d), 1) * 0.55)

  return (
    <motion.div
      ref={ref}
      style={{ rotateY, z, opacity }}
      className="pointer-events-auto w-[34rem] lg:w-[38rem] shrink-0 will-change-transform"
    >
      <ProjectCard project={project} focused={focused} playing={near} />
    </motion.div>
  )
}

/* Mobile: native swipe with snap points. */
function SwipeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const onScroll = () => {
    const t = trackRef.current
    if (!t) return
    const card = t.firstElementChild as HTMLElement | null
    if (!card) return
    setActive(Math.round(t.scrollLeft / (card.offsetWidth + 16)))
  }
  const step = (dir: 1 | -1) => {
    const t = trackRef.current
    const card = t?.firstElementChild as HTMLElement | null
    if (t && card) t.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }
  return (
    <div className="pb-8">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: Math.min(i, 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="snap-center shrink-0 w-[86vw]"
          >
            <ProjectCard project={p} playing={Math.abs(i - active) <= 1} />
          </motion.div>
        ))}
      </div>
      <div className="px-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <span
              key={p.slug}
              className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-ink' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <CarouselButton onClick={() => step(-1)} label="Previous project" disabled={active === 0}>
            <ArrowLeft size={15} />
          </CarouselButton>
          <CarouselButton onClick={() => step(1)} label="Next project" disabled={active >= projects.length - 1}>
            <ArrowRight size={15} />
          </CarouselButton>
        </div>
      </div>
    </div>
  )
}

function CarouselButton({
  children,
  onClick,
  label,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-ink hover:bg-ink hover:text-bg transition-colors disabled:opacity-30 disabled:pointer-events-none"
    >
      {children}
    </button>
  )
}

/* `playing` gates the header animation so only cards near the focus do any work. */
const ProjectCard = memo(function ProjectCard({
  project: p,
  focused = false,
  playing = true,
}: {
  project: Project
  focused?: boolean
  playing?: boolean
}) {
  const artRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const svg = artRef.current?.querySelector('svg')
    if (!svg) return
    if (playing) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [playing])

  return (
    <div className={`group ${focused ? 'beam' : ''} relative card-solid glass-hover rounded-3xl overflow-hidden h-full flex flex-col has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ink`}
    >
      {/* the whole card is a real link to the repo; the Live link sits above it */}
      <a
        href={p.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${p.name} — view repository on GitHub`}
        className="absolute inset-0 z-10 rounded-3xl outline-none"
      />
      {/* visual header: a looping diagram of what the project does, over a masked grid */}
      <div className="relative h-52 md:h-40 xl:h-44 border-b border-white/[0.07] overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_80%_at_70%_100%,black,transparent)]" />
        <div
          className={`absolute -bottom-24 -right-10 w-72 h-72 rounded-full blur-3xl transition-opacity duration-700 opacity-60 group-hover:opacity-100 ${
            p.tag ? 'bg-accent-2/30' : 'bg-white/10'
          }`}
        />
        <div ref={artRef} className={playing ? '' : 'viz-paused'}>
          <ProjectArt kind={p.art} />
        </div>
        <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-live animate-pulse' : 'bg-white/60'}`} />
            <span className="font-mono text-[0.7rem] text-muted">
              {p.status} · {p.year}
            </span>
          </div>
          {p.tag && (
            <span className="eyebrow !text-[0.6rem] px-2.5 py-1 rounded-full border border-accent-2/30 text-accent-2 bg-accent-2/[0.06]">
              {{ AI: 'LLM · AI', ML: 'Machine Learning', Agents: 'AI Agents' }[p.tag]}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display !leading-[1] text-3xl sm:text-4xl text-ink">{p.name}</h3>
          <span className="w-10 h-10 shrink-0 grid place-items-center rounded-full border border-white/15 text-ink group-hover:bg-ink group-hover:text-bg transition-colors">
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
        <p className="mt-4 text-base sm:text-lg text-ink/90 leading-snug max-w-[32rem]">{p.summary}</p>
        <dl className="mt-5 border-t border-white/[0.07]">
          {p.details.map((d) => (
            <div key={d.k} className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[5.5rem_1fr] gap-4 py-3 md:py-2.5 border-b border-white/[0.07]">
              <dt className="eyebrow !text-[0.6rem] text-muted pt-1">{d.k}</dt>
              <dd className="text-sm text-muted leading-relaxed">{d.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span key={t} className="font-mono text-[0.65rem] text-muted px-2 py-1 rounded-full border border-white/[0.09]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <span className="inline-flex items-center gap-2 text-xs text-muted group-hover:text-ink transition-colors">
            <FaGithub size={14} /> Repository
          </span>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 inline-flex items-center gap-2 text-xs text-ink hover:text-accent-2 transition-colors"
            >
              <ExternalLink size={14} /> {p.liveLabel ?? 'Live'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
})
