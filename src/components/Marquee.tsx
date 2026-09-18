import { skills, learning } from '../data/content'

// Infinite stack ticker between the hero and About.
export default function Marquee() {
  const items = [...skills.flatMap((s) => s.items), ...learning]
  const row = [...items, ...items]
  return (
    <div className="relative border-y border-white/[0.06] py-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee flex w-max gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm text-muted whitespace-nowrap">
            {item}
            <span className="w-1 h-1 rotate-45 bg-white/25" />
          </span>
        ))}
      </div>
    </div>
  )
}
