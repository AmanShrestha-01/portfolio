import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Inertial page scrolling. One instance for the page; everything that scrolls
// programmatically goes through scrollToY so it eases the same way the wheel does.
let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: true, autoRaf: true })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToY(top: number) {
  if (lenis) lenis.scrollTo(top, { duration: 1.1 })
  else window.scrollTo({ top, behavior: 'smooth' })
}
