import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. Built from scratch, shipped like the rest.</p>
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          status: available
        </p>
      </div>
    </footer>
  )
}
