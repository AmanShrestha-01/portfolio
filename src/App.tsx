import Nav from './components/Nav'
import CursorGlow from './components/CursorGlow'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <Preloader />
      <CursorGlow />
      <div aria-hidden className="grain fixed inset-0 z-[45] pointer-events-none" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
