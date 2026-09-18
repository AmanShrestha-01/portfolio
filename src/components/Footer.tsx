import { profile, quotes } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 eyebrow !text-[0.6rem] text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="hidden md:block normal-case tracking-normal font-sans text-xs text-muted/70">{quotes.heroCaption}</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-live inline-block" />
          Available · {profile.location}
        </p>
      </div>
    </footer>
  )
}
